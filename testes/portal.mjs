// Teste do painel contra o portal real da UFSM (www.ufsm.br).
//
//   1. leitura normal: o painel precisa achar as notícias na página principal
//      (sem precisar do plano B), todas com título e foto;
//   2. plano B: simulando que o portal mudou de layout, o painel precisa
//      continuar mostrando notícias, buscadas direto pela API do WordPress.
//
// Uso:  node testes/portal.mjs        (sai com erro se algo falhar)
// No GitHub Actions roda todo dia (.github/workflows/portal.yml); se falhar, o GitHub
// avisa por e-mail — sinal de que o portal mudou e o painel precisa de ajuste.
import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pagina = pathToFileURL(path.join(raiz, 'navegador', 'destaques-ufsm.html')).href + '?intervalo=600&utm=0';
const MINIMO = 5;

const proxy = process.env.DESTAQUES_PROXY;   // só para rodar atrás de um proxy corporativo
const navegador = await chromium.launch(proxy ? { proxy: { server: proxy } } : {});

async function roda(nome, quebraPagina){
  const ctx = await navegador.newContext({ viewport: { width: 1920, height: 1080 }, ignoreHTTPSErrors: !!proxy });
  const pg = await ctx.newPage();
  const erros = [];
  pg.on('pageerror', e => erros.push(String(e)));
  if (quebraPagina){
    // a página principal "muda de layout": nenhuma notícia no formato conhecido
    await pg.route(/\/wp-json\/wp\/v2\/pages\//, async route => {
      const u = new URL(route.request().url());
      const corpo = JSON.stringify({ link: 'https://www.ufsm.br/', content: { rendered: '<div class="layout-novo"><p>Portal com layout novo</p></div>' } });
      const cb = u.searchParams.get('_jsonp');
      await route.fulfill(cb ? { body: `${cb}(${corpo})`, contentType: 'application/javascript' }
                             : { body: corpo, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' } });
    });
  }
  await pg.goto(pagina);
  let r;
  try{
    await pg.waitForFunction(() => typeof itens !== 'undefined' && itens.length > 0, null, { timeout: 120000 });
    await pg.waitForTimeout(8000);   // fotos e títulos que chegam depois
    r = await pg.evaluate(() => ({
      fonte: fonteNoticias,
      n: itens.length,
      semTitulo: itens.filter(i => !i.titulo || i.titulo.length > 300).length,
      semFoto: itens.filter(i => !i.imagem).length,
      semOrigem: itens.filter(i => !i.origem).length,
      fotosCarregadas: [...document.querySelectorAll('.card .midia img')].filter(i => i.complete && i.naturalWidth > 0).length,
      lista: itens.map(i => [i.secao, i.titulo.slice(0, 70), (i.origem || '—').slice(0, 40), i.link.replace('https://www.ufsm.br', '')]),
    }));
  }catch(e){
    r = { fonte: '—', n: 0, semTitulo: 0, semFoto: 0, semOrigem: 0, fotosCarregadas: 0, lista: [], falha: e.message };
  }
  await ctx.close();

  const problemas = [];
  if (r.falha) problemas.push('o painel não mostrou nenhuma notícia: ' + r.falha.split('\n')[0]);
  if (r.n < MINIMO) problemas.push(`só ${r.n} notícias (mínimo ${MINIMO})`);
  if (!quebraPagina && r.fonte !== 'pagina') problemas.push(`a leitura da página principal não bastou (fonte: ${r.fonte}) — o portal pode ter mudado de layout`);
  if (quebraPagina && r.n && r.fonte !== 'api') problemas.push(`o plano B não foi usado (fonte: ${r.fonte})`);
  if (r.semTitulo) problemas.push(`${r.semTitulo} notícias sem título`);
  if (r.semFoto) problemas.push(`${r.semFoto} notícias sem foto`);
  if (r.semOrigem) problemas.push(`${r.semOrigem} notícias sem o site de origem`);
  if (erros.length) problemas.push('erros de JavaScript: ' + erros.slice(0, 3).join(' | '));
  return { nome, r, problemas };
}

const resultados = [await roda('Leitura normal da página principal', false), await roda('Plano B (portal com layout novo)', true)];
await navegador.close();

let md = `## Teste do painel contra www.ufsm.br — ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}\n\n`;
for (const { nome, r, problemas } of resultados){
  md += `### ${problemas.length ? '❌' : '✅'} ${nome}\n\n`;
  md += `Notícias: **${r.n}** · fonte: \`${r.fonte}\` · fotos carregadas nos cards: ${r.fotosCarregadas}\n\n`;
  if (problemas.length) md += problemas.map(p => `- **${p}**`).join('\n') + '\n\n';
  if (r.lista.length) md += '| Área | Título | Site | Endereço |\n|---|---|---|---|\n' + r.lista.map(l => `| ${l.map(x => String(x).replace(/\|/g, '/')).join(' | ')} |`).join('\n') + '\n\n';
}
console.log(md);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);
process.exit(resultados.some(x => x.problemas.length) ? 1 : 0);

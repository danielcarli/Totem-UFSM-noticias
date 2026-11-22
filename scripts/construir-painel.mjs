// Gera o painel a partir de painel/template.html:
//   app/index.html                 → usado pelo aplicativo (fontes e QR code locais, funciona sem CDN)
//   navegador/destaques-ufsm.html  → versão para abrir em qualquer navegador (arquivo único)
// As marcas (painel/marcas/*.png e painel/marcas/origens/*.png) entram no HTML como imagens embutidas.
//
//   npm run painel             gera os dois arquivos
//   npm run painel -- --conferir   só confere se os dois estão em dia com o template
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// quebras de linha do Windows (CRLF) viram LF, para o resultado ser o mesmo em qualquer sistema
const ler = p => fs.readFileSync(path.join(raiz, p), 'utf8').replace(/\r\n/g, '\n');
const marca = arq => 'data:image/png;base64,' + fs.readFileSync(path.join(raiz, 'painel/marcas', arq)).toString('base64');

const MARCAS = {
  __UFSM__: 'ufsm.png',                           // topo
  __LOGO_H__: 'coordenadoria.png',                // rodapé
  __AGENCIA_H__: 'agencia.png',                   // rodapé
  __SIMBOLO__: 'coordenadoria-simbolo.png',       // card de notícia sem foto
};
// marcas ao lado do site de origem (painel/marcas/origens/<id>.png, branco sobre transparente):
// viram máscaras CSS pintadas na cor do texto. Tamanho: 1,5em de altura, no máximo 2,4em de largura.
const PASTA_ORIGENS = path.join(raiz, 'painel/marcas/origens');
const origens = fs.readdirSync(PASTA_ORIGENS).filter(a => a.endsWith('.png')).sort().map(arq => {
  const png = fs.readFileSync(path.join(PASTA_ORIGENS, arq));
  const larg = png.readUInt32BE(16), alt = png.readUInt32BE(20);      // cabeçalho IHDR do PNG
  const prop = larg / alt;
  let h = 1.5, w = h * prop;
  if (w > 2.4){ w = 2.4; h = w / prop; }
  return { id: arq.slice(0, -4), w: +w.toFixed(3), h: +h.toFixed(3), url: 'data:image/png;base64,' + png.toString('base64') };
});
const CSS_ORIGENS = origens.map(o => `.marca-origem[data-m="${o.id}"]{--m:url(${o.url});--w:${o.w};--h:${o.h}}`).join('\n');
const IDS_ORIGENS = JSON.stringify(origens.map(o => o.id));

const comMarcas = html => Object.entries(MARCAS)
  .reduce((h, [k, arq]) => h.split(k).join(marca(arq)), html)
  .split('/*__MARCAS_ORIGEM_CSS__*/').join(CSS_ORIGENS)
  .split('__MARCAS_ORIGEM_IDS__').join(IDS_ORIGENS);

// versão do package.json, mostrada discretamente no rodapé do painel
const VERSAO = JSON.parse(ler('package.json')).version;
const template = ler('painel/template.html').split('__VERSAO__').join(VERSAO);
const navegador = comMarcas(template);
let app = template
  .replace('<link rel="preconnect" href="https://fonts.googleapis.com">\n', '')
  .replace('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n', '')
  .replace('<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&display=swap" rel="stylesheet">', '<link href="fontes/barlow.css" rel="stylesheet">')
  .replace('<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js" defer></script>', '<script src="vendor/qrcode.js" defer></script>');
app = comMarcas(app);
if (/googleapis|cdnjs/.test(app)) throw new Error('app/index.html ainda aponta para CDN');
if (/__[A-Z_]+__/.test(navegador)) throw new Error('marca sem arquivo: ' + navegador.match(/__[A-Z_]+__/)[0]);

const saidas = { 'app/index.html': app, 'navegador/destaques-ufsm.html': navegador };
if (process.argv.includes('--conferir')){
  let ok = true;
  for (const [p, novo] of Object.entries(saidas)){
    const igual = fs.existsSync(path.join(raiz, p)) && ler(p) === novo;
    console.log(igual ? 'em dia     ' : 'DESATUALIZADO', p);
    ok &&= igual;
  }
  process.exit(ok ? 0 : 1);
}
for (const [p, novo] of Object.entries(saidas)){
  fs.mkdirSync(path.dirname(path.join(raiz, p)), { recursive: true });
  fs.writeFileSync(path.join(raiz, p), novo);
  console.log('gerado', p);
}

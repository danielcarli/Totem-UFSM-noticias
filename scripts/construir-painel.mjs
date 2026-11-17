// Gera o painel a partir de painel/template.html:
//   app/index.html                 → usado pelo aplicativo (fontes e QR code locais, funciona sem CDN)
//   navegador/destaques-ufsm.html  → versão para abrir em qualquer navegador (arquivo único)
// As marcas (painel/marcas/*.png) entram no HTML como imagens embutidas.
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
const comMarcas = html => Object.entries(MARCAS).reduce((h, [k, arq]) => h.split(k).join(marca(arq)), html);

const template = ler('painel/template.html');
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

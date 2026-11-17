// Gera a versão portátil para Windows x64: dist/Destaques UFSM-win32-x64/ + .zip
// Uso:  npm run empacotar
// Funciona em Windows, macOS ou Linux (não precisa de Wine: o ícone é gravado com resedit).
import { packager } from '@electron/packager';
import * as ResEdit from 'resedit';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(fs.readFileSync(path.join(raiz, 'package.json'), 'utf8'));
const NOME = pkg.productName;

console.log('> empacotando', NOME, pkg.version, 'para win32-x64…');
const [pasta] = await packager({
  dir: raiz,
  name: NOME,
  executableName: 'DestaquesUFSM',
  platform: 'win32',
  arch: 'x64',
  out: path.join(raiz, 'dist'),
  overwrite: true,
  asar: true,
  prune: false,          // o app não tem dependências em tempo de execução
  appVersion: pkg.version,
  appCopyright: 'UFSM — Coordenadoria de Comunicação',
  ignore: [/^\/dist($|\/)/, /^\/build($|\/)/, /^\/scripts($|\/)/, /^\/\.git/, /^\/node_modules($|\/)/, /^\/package-lock\.json$/, /^\/test($|\/)/, /^\/\.electron-zips($|\/)/, /\.md$/i, /LEIA-ME\.txt$/],
  // se o download automático do Electron falhar (proxy/firewall), coloque o zip
  // oficial electron-vX.Y.Z-win32-x64.zip na pasta .electron-zips
  ...(fs.existsSync(path.join(raiz, '.electron-zips')) ? { electronZipDir: path.join(raiz, '.electron-zips') } : {}),
});

// ícone e informações do .exe
const exe = path.join(pasta, 'DestaquesUFSM.exe');
const bin = ResEdit.NtExecutable.from(fs.readFileSync(exe), { ignoreCert: true });
const res = ResEdit.NtExecutableResource.from(bin);
const ico = ResEdit.Data.IconFile.from(fs.readFileSync(path.join(raiz, 'build', 'icone.ico')));
const grupos = ResEdit.Resource.IconGroupEntry.fromEntries(res.entries);
const idGrupo = grupos.length ? grupos[0].id : 1;
const lang = grupos.length ? grupos[0].lang : 1033;
ResEdit.Resource.IconGroupEntry.replaceIconsForResource(res.entries, idGrupo, lang, ico.icons.map(i => i.data));

const versoes = ResEdit.Resource.VersionInfo.fromEntries(res.entries);
const v = versoes[0];
const [a, b, c] = pkg.version.split('.').map(Number);
v.setFileVersion(a, b, c, 0, 1033);
v.setProductVersion(a, b, c, 0, 1033);
v.setStringValues({ lang: 1033, codepage: 1200 }, {
  FileDescription: NOME,
  ProductName: NOME,
  CompanyName: 'Universidade Federal de Santa Maria',
  LegalCopyright: 'UFSM — Coordenadoria de Comunicação',
  OriginalFilename: 'DestaquesUFSM.exe',
  InternalName: 'DestaquesUFSM',
});
v.outputToResourceEntries(res.entries);
res.outputResource(bin);
fs.writeFileSync(exe, Buffer.from(bin.generate()));
console.log('> ícone e versão gravados no .exe');

// mantém só os idiomas usados (deixa o pacote menor)
const locales = path.join(pasta, 'locales');
for (const f of fs.readdirSync(locales)) if (!/^(pt-BR|en-US)\.pak$/.test(f)) fs.rmSync(path.join(locales, f));

// leia-me na pasta do app
fs.copyFileSync(path.join(raiz, 'LEIA-ME.txt'), path.join(pasta, 'LEIA-ME.txt'));

// zip
const zip = path.join(raiz, 'dist', `${NOME.replace(/\s+/g, '-')}-${pkg.version}-windows-x64.zip`);
fs.rmSync(zip, { force: true });
try{
  execFileSync('zip', ['-qr9', zip, path.basename(pasta)], { cwd: path.dirname(pasta) });
}catch{
  execFileSync('powershell', ['-NoProfile', '-Command', `Compress-Archive -Path '${pasta}' -DestinationPath '${zip}'`]);
}
console.log('> pronto:', zip);

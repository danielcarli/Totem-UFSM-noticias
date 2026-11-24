// Publica o Destaques UFSM no GitHub: envia o código e cria a tag da versão.
// A tag (v1.2.3) dispara o GitHub Actions, que gera os instaladores de Windows e Linux
// e os publica na página de Releases — e os painéis instalados se atualizam sozinhos.
//
//   npm run publicar                  publica a versão que está no package.json
//   npm run publicar -- 1.5.1         muda a versão para 1.5.1 e publica
//   npm run publicar -- patch         1.8.0 → 1.8.1   (minor: 1.9.0 · major: 2.0.0)
//
// Opções:
//   --mensagem "texto"   mensagem do commit (padrão: "Destaques UFSM <versão>")
//   --sem-tag            só envia o código, sem gerar instaladores
//   --teste              mostra o que seria feito, sem mudar nada
//   --sim                não pergunta antes de publicar
//
// No Windows também dá para dar dois cliques em publicar.cmd, na pasta do projeto.
// Precisa do Git instalado (https://git-scm.com). Na primeira vez, o Git pede o login do GitHub.
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(raiz);

// ---------- argumentos ----------
const args = process.argv.slice(2);
const opcao = nome => args.includes(nome);
const valorDe = nome => { const i = args.indexOf(nome); return i >= 0 ? args[i + 1] : undefined; };
const TESTE = opcao('--teste'), SIM = opcao('--sim'), SEM_TAG = opcao('--sem-tag');
const mensagemPedida = valorDe('--mensagem');
const pedidoDeVersao = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--mensagem');

// ---------- utilitários ----------
const cor = (c, t) => process.stdout.isTTY ? `\x1b[${c}m${t}\x1b[0m` : t;
const titulo = t => console.log('\n' + cor('1;36', '▸ ' + t));
const ok = t => console.log(cor('32', '  ✓ ') + t);
const alerta = t => console.log(cor('33', '  ! ') + t);
function erro(t, ...dicas){
  console.error('\n' + cor('1;31', '✗ ' + t));
  for (const d of dicas) console.error('  ' + d);
  console.error('');
  process.exit(1);
}
// roda o git; 'mostrar' deixa a saída aparecer na tela (o pedido de login do Git continua
// funcionando). Comandos que usam a internet tentam de novo se a rede falhar por um instante.
const ERRO_DE_REDE = /could not resolve host|failed to connect|timed out|connection (reset|refused|was reset)|unable to access|early eof|network is unreachable|temporary failure/i;
const espera = ms => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
function git(lista, { mostrar = false, falhaOk = false } = {}){
  const usaRede = ['fetch', 'push', 'ls-remote', 'pull'].includes(lista[0]);
  let r;
  for (let tentativa = 1; ; tentativa++){
    r = spawnSync('git', lista, { encoding: 'utf8', stdio: ['inherit', mostrar ? 'inherit' : 'pipe', 'pipe'] });
    if (r.error) erro('O Git não foi encontrado.', 'Instale em https://git-scm.com e abra o terminal de novo.');
    if (r.status === 0 || !usaRede || !ERRO_DE_REDE.test(r.stderr || '') || tentativa === 3) break;
    alerta(`sem resposta do GitHub (${(r.stderr.match(ERRO_DE_REDE) || [''])[0]}); tentando de novo em ${tentativa * 5} s…`);
    espera(tentativa * 5000);
  }
  if (mostrar && r.stderr) process.stderr.write(r.stderr);
  if (r.status !== 0 && usaRede && ERRO_DE_REDE.test(r.stderr || '')){
    erro('Não foi possível falar com o GitHub (github.com).',
         'Confira se este computador está com internet e se abre https://github.com no navegador.',
         'Se a rede usa proxy, configure no Git:  git config --global http.proxy http://endereco:porta',
         'Depois é só rodar o comando de novo.',
         '', 'Mensagem do Git: ' + (r.stderr || '').trim().split('\n').filter(Boolean).pop());
  }
  if (r.status !== 0 && !falhaOk){
    erro(`Falhou: git ${lista.join(' ')}`, ...(r.stderr || '').trim().split('\n').filter(Boolean));
  }
  return { ok: r.status === 0, saida: (r.stdout || '').trimEnd() };
}
const lerJson = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const gravarJson = (p, o) => fs.writeFileSync(p, JSON.stringify(o, null, 2) + '\n');

// ---------- projeto ----------
const pacote = lerJson('package.json');
const REMOTO = process.env.DESTAQUES_REMOTO ||                               // (para testes)
  String(pacote.repository?.url || pacote.repository || '').replace(/^git\+/, '');
if (!REMOTO) erro('Endereço do repositório não encontrado no package.json ("repository").');
const paginaDoRepo = REMOTO.replace(/\.git$/, '');

const atual = pacote.version;
function proximaVersao(pedido){
  if (!pedido) return atual;
  const [ma, mi, pa] = atual.split('.').map(Number);
  if (pedido === 'patch') return `${ma}.${mi}.${pa + 1}`;
  if (pedido === 'minor') return `${ma}.${mi + 1}.0`;
  if (pedido === 'major') return `${ma + 1}.0.0`;
  const v = pedido.replace(/^v/, '');
  if (!/^\d+\.\d+\.\d+$/.test(v)) erro(`Versão inválida: ${pedido}`, 'Use o formato 1.5.1, ou patch, minor ou major.');
  return v;
}
const versao = proximaVersao(pedidoDeVersao);
const tag = 'v' + versao;
const mensagem = mensagemPedida || `Destaques UFSM ${versao}`;

console.log(cor('1', `Destaques UFSM — publicar no GitHub`) + cor('2', `  (${paginaDoRepo})`));
if (TESTE) alerta('modo de teste: nada será alterado nem enviado');

// ---------- 1. Git e repositório ----------
titulo('Conferindo o Git');
ok(git(['--version']).saida);
const nome = git(['config', 'user.name'], { falhaOk: true }).saida;
const email = git(['config', 'user.email'], { falhaOk: true }).saida;
if (!nome || !email){
  erro('O Git ainda não sabe quem é você (nome e e-mail do commit).',
       'Rode uma vez, com os seus dados:',
       '  git config --global user.name "Seu Nome"',
       '  git config --global user.email "seu-email@exemplo.com"');
}
ok(`autor dos commits: ${nome} <${email}>`);

const ehRepo = fs.existsSync(path.join(raiz, '.git'));
const ALVO = (ehRepo || !TESTE) ? 'origin' : REMOTO;    // no teste, a pasta pode ainda não ter "origin"
let ramo;
// ramo principal do GitHub (main ou master); vazio se o repositório ainda não tem nada
function ramoDoRemoto(){
  const r = git(['ls-remote', '--symref', 'origin', 'HEAD'], { falhaOk: true });
  if (!r.ok) erro('Não foi possível acessar o repositório no GitHub.', `Endereço: ${REMOTO}`, 'Confira a internet e se você tem acesso ao repositório.');
  return (r.saida.match(/ref:\s+refs\/heads\/(\S+)\s+HEAD/) || [])[1] || '';
}

if (!ehRepo){
  // pasta vinda do .zip: liga ao repositório do GitHub sem perder os arquivos daqui
  alerta('esta pasta ainda não está ligada ao GitHub — vou ligar ao repositório do projeto');
  if (!TESTE){
    git(['init', '-q']);
    git(['remote', 'add', 'origin', REMOTO]);
  }
}
if (TESTE && !ehRepo){
  const r = spawnSync('git', ['ls-remote', '--symref', REMOTO, 'HEAD'], { encoding: 'utf8' });
  ramo = ((r.stdout || '').match(/ref:\s+refs\/heads\/(\S+)\s+HEAD/) || [])[1] || 'main';
} else {
  const origem = git(['remote', 'get-url', 'origin'], { falhaOk: true });
  if (!origem.ok){ if (!TESTE) git(['remote', 'add', 'origin', REMOTO]); }
  else if (origem.saida.replace(/\.git$/, '') !== REMOTO.replace(/\.git$/, '')) alerta(`o "origin" desta pasta aponta para ${origem.saida}`);
  ramo = ramoDoRemoto();
  const temHistoricoNoRemoto = !!ramo;
  ramo ||= 'main';
  git(['fetch', '-q', '--tags', 'origin'], { mostrar: false });
  const temCommitAqui = git(['rev-parse', '--verify', '-q', 'HEAD'], { falhaOk: true }).ok;
  if (!temCommitAqui && temHistoricoNoRemoto && !TESTE){
    // aponta para o último commit do GitHub mantendo os arquivos da pasta como estão:
    // o commit novo terá só as diferenças
    git(['symbolic-ref', 'HEAD', `refs/heads/${ramo}`]);
    git(['update-ref', `refs/heads/${ramo}`, `origin/${ramo}`]);
    git(['reset', '-q']);
    ok(`pasta ligada ao ramo ${ramo} do GitHub`);
  } else if (temCommitAqui){
    const aqui = git(['rev-parse', '--abbrev-ref', 'HEAD']).saida;
    if (aqui !== ramo) alerta(`você está no ramo "${aqui}"; o principal do GitHub é "${ramo}" — vou enviar "${aqui}"`);
    ramo = aqui;
    const atras = git(['rev-list', '--count', `HEAD..origin/${ramo}`], { falhaOk: true });
    if (atras.ok && Number(atras.saida) > 0){
      erro(`O GitHub tem ${atras.saida} commit(s) que não estão nesta pasta.`,
           'Traga as mudanças primeiro e rode de novo:',
           `  git pull origin ${ramo}`);
    }
  }
  ok(`repositório: ${REMOTO} (ramo ${ramo})`);
}

// ---------- 2. Versão ----------
titulo('Versão');
if (versao !== atual) ok(`${atual} → ${versao}`); else ok(versao);
if (!SEM_TAG){
  const local = git(['tag', '-l', tag], { falhaOk: true }).saida;
  const remota = git(['ls-remote', '--tags', ALVO, `refs/tags/${tag}`], { falhaOk: true }).saida;
  if (remota) erro(`A versão ${versao} já foi publicada (a tag ${tag} já existe no GitHub).`,
                   'Publique uma versão nova, por exemplo:', '  npm run publicar -- patch');
  if (local && !TESTE) git(['tag', '-d', tag]);    // tag local de uma tentativa anterior que não foi enviada
}
const readme = fs.readFileSync('README.md', 'utf8');
if (!readme.includes(`**${versao}**`)) alerta(`a tabela "Versões" do README ainda não tem a ${versao} — vale descrever as novidades`);

// ---------- 3. Confirmação ----------
titulo('Resumo');
console.log(`  Mensagem do commit: "${mensagem}"`);
console.log(SEM_TAG ? '  Só o código (sem instaladores).'
                    : `  Tag ${tag}: o GitHub gera os instaladores e publica em Releases;\n  os painéis instalados recebem a atualização sozinhos.`);
// o que muda em relação ao GitHub (arquivos apagados aqui também são apagados lá)
if (ehRepo || !TESTE){
  const linhas = git(['status', '--porcelain', '-uall'], { falhaOk: true }).saida.split('\n').filter(Boolean);
  const apagados = linhas.filter(l => /D/.test(l.slice(0, 2)));
  console.log(linhas.length ? `  Arquivos diferentes do GitHub: ${linhas.length}` : '  Nenhum arquivo diferente do GitHub (fora a versão e o painel gerado).');
  const tipo = l => /D/.test(l.slice(0, 2)) ? 'apagado ' : /\?|A/.test(l.slice(0, 2)) ? 'novo    ' : 'alterado';
  for (const l of linhas.slice(0, 20)) console.log(`    ${tipo(l)}  ${l.slice(3)}`);
  if (linhas.length > 20) console.log(`    … e mais ${linhas.length - 20}`);
  if (apagados.length) alerta(`${apagados.length} arquivo(s) existem no GitHub mas não nesta pasta e serão apagados lá`);
}
if (TESTE){ console.log('\n' + cor('33', 'Modo de teste: parei aqui.')); process.exit(0); }
if (!SIM){
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const r = (await rl.question(cor('1', `\nPublicar ${SEM_TAG ? 'o código' : 'a versão ' + versao} no GitHub? (s/N) `))).trim().toLowerCase();
  rl.close();
  if (!['s', 'sim', 'y', 'yes'].includes(r)){ console.log('Nada foi publicado.'); process.exit(0); }
}

// ---------- 4. Arquivos da versão e painel ----------
titulo('Preparando os arquivos');
if (versao !== atual){
  pacote.version = versao; gravarJson('package.json', pacote);
  if (fs.existsSync('package-lock.json')){
    const trava = lerJson('package-lock.json');
    trava.version = versao;
    if (trava.packages?.['']) trava.packages[''].version = versao;
    gravarJson('package-lock.json', trava);
  }
  ok('versão atualizada no package.json');
}
// selo da versão no README
const novoReadme = readme
  .replace(/(img\.shields\.io\/badge\/vers%C3%A3o-)[\d.]+(-)/, `$1${versao}$2`);
if (novoReadme !== readme){ fs.writeFileSync('README.md', novoReadme); ok('versão atualizada no README'); }

const painel = spawnSync(process.execPath, ['scripts/construir-painel.mjs'], { stdio: 'inherit' });
if (painel.status !== 0) erro('A geração do painel falhou (veja a mensagem acima).');
ok('painel gerado a partir de painel/template.html');

// ---------- 5. Commit e envio ----------
titulo('Enviando para o GitHub');
git(['add', '-A']);
const mudancas = git(['status', '--porcelain']).saida.split('\n').filter(Boolean);
if (mudancas.length){
  git(['commit', '-q', '-m', mensagem]);
  ok(`commit criado (${mudancas.length} arquivo(s))`);
} else {
  ok('nenhuma mudança no código desde o último envio');
}
const envio = git(['push', '-u', 'origin', ramo], { mostrar: true, falhaOk: true });
if (!envio.ok) erro('Não foi possível enviar para o GitHub.',
  'Confira se você entrou com a conta que tem acesso ao repositório (o Git pede o login na primeira vez).',
  'Depois é só rodar o comando de novo.');
ok(`código enviado (ramo ${ramo})`);

if (!SEM_TAG){
  git(['tag', '-a', tag, '-m', `Destaques UFSM ${versao}`]);
  const t = git(['push', 'origin', tag], { mostrar: true, falhaOk: true });
  if (!t.ok) erro(`O código foi enviado, mas a tag ${tag} não.`, `Tente: git push origin ${tag}`);
  ok(`tag ${tag} enviada`);
}

console.log('\n' + cor('1;32', SEM_TAG ? 'Código publicado.' : `Versão ${versao} publicada.`));
if (!SEM_TAG){
  console.log(`  Os instaladores ficam prontos em uns 10 a 15 minutos. Acompanhe em:`);
  console.log(`    ${paginaDoRepo}/actions`);
  console.log(`  e depois baixe em:`);
  console.log(`    ${paginaDoRepo}/releases/tag/${tag}`);
}

/* ==================================================================
   Destaques UFSM — aplicativo de painel (Electron)
   Agência de Notícias / Coordenadoria de Comunicação UFSM
   Idealizado por Daniel Michelon De Carli. Licença GNU GPL v3 ou posterior.

   Abre o painel de destaques já em tela cheia.

   Atalhos
     F11 ........ entra / sai da tela cheia
     Esc ........ sai da tela cheia
     Ctrl+R ..... recarrega o painel
     Ctrl+Q ..... fecha o aplicativo
     1 / 2 / 3 .. leva o painel para o monitor 1, 2 ou 3 (da esquerda para a direita)
                  e lembra a escolha nas próximas aberturas
     (as setas, espaço, R e F do próprio painel continuam valendo)

   Opções de linha de comando (no atalho do Windows ou no terminal do Linux)
     --monitor=2            abre no segundo monitor só desta vez (as teclas 1, 2, 3 guardam a escolha)
     --intervalo=10         segundos por notícia (padrão 7)
     --atualizacao=15       minutos entre as leituras do portal (padrão 15)
     --quantidade=30        notícias no carrossel: se a página principal tiver menos, completa
                            com as últimas matérias com foto do portal (padrão 30)
     --max=30               número máximo de notícias
     --secoes=Destaques,JAI só estas áreas da página principal
     --ignorar="Em destaque"  tira áreas (ex.: os banners do topo)
     --orientacao=vertical  força o layout de totem em pé (normalmente é automático)
     --leve=1               sem efeitos de desfoque (computadores fracos)
     --noite=23-6           tela preta das 23h às 6h
     --local=ct             nome do local do painel, para medir as leituras do QR code
                            no Google Analytics do portal (utm_campaign)
     --sem-atualizacao      não procura versões novas (veja "Atualização automática")
     --iniciar-com-sistema  passa a abrir sozinho ao entrar no computador
                            (Windows e Linux; guarda as outras opções usadas junto)
     --nao-iniciar-com-sistema  desfaz a opção acima
     (--iniciar-com-windows / --nao-iniciar-com-windows continuam funcionando)

   Atualização automática
     O aplicativo procura versões novas nas Releases do GitHub 1 minuto depois de abrir e
     a cada 6 horas. No Windows e no AppImage, baixa sozinho e instala às 4h30 da manhã
     (ou ao fechar o programa), e volta a abrir com as mesmas opções. Nos pacotes .deb e
     .rpm, só avisa na tela que há versão nova. Registro: atualizacao.log na pasta de dados.
   ================================================================== */
const { app, BrowserWindow, Menu, session, screen, powerSaveBlocker } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

// uma única instância (um segundo clique só traz a janela para frente)
if (!app.requestSingleInstanceLock()){
  app.quit();
  return;
}

// opções da linha de comando (depois de uma atualização, as que estavam em uso — veja abaixo)
let argv = process.argv;
const arg = nome => {
  const a = argv.find(x => x === `--${nome}` || x.startsWith(`--${nome}=`));
  if (!a) return null;
  return a.includes('=') ? a.slice(a.indexOf('=') + 1) : true;
};

const RECARREGA_A_CADA_HORAS = 24;   // recarga preventiva para longos períodos ligado
let janela = null;

/* --- a página lê www.ufsm.br sem bloqueio de CORS ---------------- */
function liberaPortalUFSM(){
  const filtro = { urls: ['https://www.ufsm.br/*', 'https://ufsm.br/*'] };
  session.defaultSession.webRequest.onHeadersReceived(filtro, (det, responder) => {
    const h = det.responseHeaders || {};
    for (const k of Object.keys(h)) if (k.toLowerCase().startsWith('access-control-allow-')) delete h[k];
    h['Access-Control-Allow-Origin'] = ['*'];
    responder({ responseHeaders: h });
  });
}

/* --- monitores ---------------------------------------------------------
   Numerados da esquerda para a direita (e de cima para baixo): 1, 2, 3…
   As teclas 1, 2 e 3 levam o painel para esse monitor, e a escolha fica
   guardada para as próximas vezes que o aplicativo abrir. */
const arquivoConfig = () => path.join(app.getPath('userData'), 'configuracao.json');
function lerConfig(){
  try { return JSON.parse(fs.readFileSync(arquivoConfig(), 'utf8')) || {}; } catch { return {}; }
}
function gravarConfig(mudancas){
  try {
    const c = { ...lerConfig(), ...mudancas };
    fs.mkdirSync(path.dirname(arquivoConfig()), { recursive: true });
    fs.writeFileSync(arquivoConfig(), JSON.stringify(c, null, 2));
  } catch (e) { console.error('não foi possível gravar a configuração:', e.message); }
}
function telasEmOrdem(){
  return screen.getAllDisplays().slice().sort((a, b) => (a.bounds.x - b.bounds.x) || (a.bounds.y - b.bounds.y));
}
function escolheTela(){
  const telas = telasEmOrdem();
  const n = parseInt(arg('monitor'), 10);              // --monitor=N vale só para esta abertura
  if (n && telas[n - 1]) return telas[n - 1];
  const salvo = lerConfig().monitor;                   // o último escolhido com as teclas 1, 2, 3
  if (salvo){
    const porId = telas.find(t => t.id === salvo.id);
    if (porId) return porId;
    if (salvo.numero && telas[salvo.numero - 1] && telas.length === salvo.total) return telas[salvo.numero - 1];
  }
  return screen.getPrimaryDisplay();
}

// mostra por um instante um aviso sobre o painel: no centro (monitor) ou discreto, no canto (versão nova)
function avisoNaTela(texto, ms = 1600, canto = false){
  if (!janela) return;
  const id = canto ? 'aviso-canto' : 'aviso-monitor';
  const lugar = canto ? 'right:1.4vw;bottom:1.4vw;' : 'left:50%;top:50%;transform:translate(-50%,-50%);';
  const fonte = canto ? '500 clamp(13px,1vw,22px)' : '600 clamp(20px,2.4vw,44px)';
  const js = `(() => {
    let a = document.getElementById(${JSON.stringify(id)});
    if (!a){
      a = document.createElement('div'); a.id = ${JSON.stringify(id)};
      a.style.cssText = 'position:fixed;${lugar}z-index:99999;' +
        'padding:.7em 1.4em;border-radius:14px;background:rgba(6,23,42,.86);color:#fff;' +
        'font:${fonte}/1.2 Barlow,system-ui,sans-serif;box-shadow:0 10px 40px rgba(0,0,0,.45);' +
        'pointer-events:none;transition:opacity .4s';
      document.body.appendChild(a);
    }
    a.textContent = ${JSON.stringify(texto)}; a.style.opacity = '1';
    clearTimeout(a.__t);
    a.__t = setTimeout(() => { a.style.opacity = '0'; }, ${Number(ms) || 1600});
  })()`;
  janela.webContents.executeJavaScript(js).catch(() => {});
}

function levaParaTela(tela){
  if (!janela || !tela) return;
  const mover = () => {
    janela.setBounds(tela.bounds);
    janela.setFullScreen(true);
  };
  // sai da tela cheia, troca de monitor e volta para a tela cheia
  if (janela.isFullScreen()){
    let feito = false;
    const uma = () => { if (!feito){ feito = true; setTimeout(mover, 150); } };
    janela.once('leave-full-screen', uma);
    setTimeout(uma, 800);              // alguns gerenciadores de janela não avisam a saída da tela cheia
    janela.setFullScreen(false);
  } else mover();
}

function trocaMonitor(numero){
  const telas = telasEmOrdem();
  if (telas.length < 2){ avisoNaTela('Só há um monitor ligado'); return; }
  const tela = telas[numero - 1];
  if (!tela){ avisoNaTela(`Não há monitor ${numero} — há ${telas.length} monitores`); return; }
  gravarConfig({ monitor: { id: tela.id, numero, total: telas.length } });
  const atual = screen.getDisplayMatching(janela.getBounds());
  if (atual.id !== tela.id) levaParaTela(tela);
  setTimeout(() => avisoNaTela(`Monitor ${numero} de ${telas.length}`), atual.id !== tela.id ? 900 : 0);
}

function parametrosDoPainel(){
  const q = {};
  for (const nome of ['intervalo', 'atualizacao', 'max', 'quantidade', 'secoes', 'ignorar', 'orientacao', 'leve', 'noite', 'recarga', 'local', 'utm']){
    const v = arg(nome);
    if (v && v !== true) q[nome] = String(v);
  }
  return q;
}

function criaJanela(){
  const tela = escolheTela();
  janela = new BrowserWindow({
    x: tela.bounds.x, y: tela.bounds.y,
    width: tela.bounds.width, height: tela.bounds.height,
    fullscreen: true,
    autoHideMenuBar: true,
    backgroundColor: '#06172A',
    show: false,
    title: 'Destaques UFSM',
    icon: path.join(__dirname, 'app', 'icone.png'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      backgroundThrottling: false,   // não desacelera o carrossel se a janela perder o foco
    },
  });

  janela.loadFile(path.join(__dirname, 'app', 'index.html'), { query: parametrosDoPainel() });
  janela.once('ready-to-show', () => { janela.show(); janela.focus(); });

  // atalhos
  janela.webContents.on('before-input-event', (ev, input) => {
    if (input.type !== 'keyDown') return;
    const ctrl = input.control || input.meta;
    if (input.key === 'F11'){ ev.preventDefault(); janela.setFullScreen(!janela.isFullScreen()); }
    else if (input.key === 'Escape' && janela.isFullScreen()){ ev.preventDefault(); janela.setFullScreen(false); }
    else if (ctrl && input.key.toLowerCase() === 'q'){ ev.preventDefault(); app.quit(); }
    else if (ctrl && input.key.toLowerCase() === 'r'){ ev.preventDefault(); janela.webContents.reloadIgnoringCache(); }
    else if (ctrl && input.shift && input.key.toLowerCase() === 'i'){ ev.preventDefault(); janela.webContents.toggleDevTools(); }
    else if (!ctrl && !input.alt && /^(Digit|Numpad)[123]$/.test(input.code)){ ev.preventDefault(); trocaMonitor(Number(input.code.slice(-1))); }
  });

  // o painel nunca sai da própria página nem abre janelas
  janela.webContents.on('will-navigate', ev => ev.preventDefault());
  janela.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));

  // recuperação automática
  janela.webContents.on('render-process-gone', () => setTimeout(() => janela && janela.reload(), 3000));
  janela.on('unresponsive', () => setTimeout(() => janela && janela.reload(), 10000));

  janela.on('closed', () => { janela = null; });
}

app.on('second-instance', () => {
  if (!janela) return;
  if (janela.isMinimized()) janela.restore();
  janela.focus();
});

/* --- abrir sozinho ao entrar no computador (Windows e Linux) ------- */
function iniciarComSistema(ligar){
  const FLAGS = /^--(nao-)?iniciar-com-(sistema|windows)$/;
  const opcoes = (app.isPackaged ? process.argv.slice(1) : process.argv.slice(2)).filter(a => a.startsWith('--') && !FLAGS.test(a));
  if (process.platform === 'linux'){
    const pasta = path.join(process.env.XDG_CONFIG_HOME || path.join(os.homedir(), '.config'), 'autostart');
    const arquivo = path.join(pasta, 'destaques-ufsm.desktop');
    if (!ligar){ fs.rmSync(arquivo, { force: true }); return; }
    const exe = process.env.APPIMAGE || (fs.existsSync('/usr/bin/destaques-ufsm') ? '/usr/bin/destaques-ufsm' : process.execPath);
    const aspas = s => /[\s"]/.test(s) ? '"' + s.replace(/(["\\])/g, '\\$1') + '"' : s;
    fs.mkdirSync(pasta, { recursive: true });
    fs.writeFileSync(arquivo, [
      '[Desktop Entry]', 'Type=Application', 'Name=Destaques UFSM',
      'Comment=Painel de notícias da UFSM em tela cheia',
      'Exec=' + [exe, ...opcoes].map(aspas).join(' '),
      'Icon=destaques-ufsm', 'X-GNOME-Autostart-enabled=true', 'X-GNOME-Autostart-Delay=10', '',
    ].join('\n'));
  } else {
    // mesmo nome que o instalador usa na opção "Abrir sozinho sempre que entrar no Windows"
    app.setLoginItemSettings({ openAtLogin: ligar, name: 'DestaquesUFSM', args: ligar ? opcoes : [] });
  }
}

/* --- atualização automática (Releases do GitHub) -------------------- */
const OPCOES_INTERNAS = /^--(updated|no-sandbox|password-store|iniciar-com|nao-iniciar-com)/;
const opcoesEmUso = () => argv.slice(app.isPackaged ? 1 : 2).filter(a => a.startsWith('--') && !OPCOES_INTERNAS.test(a));

// o instalador reabre o programa sem as opções do atalho: elas ficam guardadas antes da
// atualização e voltam aqui
function recuperaOpcoesDaAtualizacao(){
  const c = lerConfig();
  if (!Array.isArray(c.reabrirCom)) return;
  if (!opcoesEmUso().length){
    argv = [...process.argv, ...c.reabrirCom];
    registra('reaberto depois da atualização, com as opções:', c.reabrirCom.join(' ') || '(nenhuma)');
  }
  gravarConfig({ reabrirCom: null });
}

function registra(...partes){
  try{
    const arq = path.join(app.getPath('userData'), 'atualizacao.log');
    if (fs.existsSync(arq) && fs.statSync(arq).size > 200 * 1024) fs.renameSync(arq, arq + '.1');
    fs.appendFileSync(arq, `${new Date().toISOString()} ${partes.map(p => p instanceof Error ? p.message : String(p)).join(' ')}\n`);
  }catch(e){}
}

function configuraAtualizacao(){
  if (!app.isPackaged || arg('sem-atualizacao')) return;
  let autoUpdater;
  try{ ({ autoUpdater } = require('electron-updater')); }
  catch(e){ registra('electron-updater indisponível:', e); return; }

  // .deb e .rpm precisam de senha de administrador para atualizar: nesses, só avisa
  const soAvisa = process.platform === 'linux' && !process.env.APPIMAGE;
  autoUpdater.autoDownload = !soAvisa;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.logger = { info: m => registra('info', m), warn: m => registra('aviso', m), error: m => registra('erro', m), debug: () => {} };

  let agendada = null;
  autoUpdater.on('update-available', info => {
    registra('versão nova disponível:', info.version);
    if (soAvisa) avisoNaTela(`Versão ${info.version} disponível — github.com/danielcarli/Totem-UFSM-noticias`, 15000, true);
  });
  autoUpdater.on('update-not-available', () => registra('sem versão nova'));
  autoUpdater.on('error', e => registra('falha:', e));
  autoUpdater.on('update-downloaded', info => {
    registra('baixada a versão', info.version);
    if (agendada) return;
    // instala de madrugada, quando ninguém está olhando a TV
    const agora = new Date(), quando = new Date(agora);
    quando.setHours(4, 30, 0, 0);
    if (quando <= agora) quando.setDate(quando.getDate() + 1);
    // (para testes: DESTAQUES_INSTALAR_EM_SEG=30 instala 30 s depois de baixar)
    const teste = parseInt(process.env.DESTAQUES_INSTALAR_EM_SEG, 10);
    if (teste > 0) quando.setTime(agora.getTime() + teste * 1000);
    registra('instalação agendada para', quando.toLocaleString('pt-BR'), `(versão ${app.getVersion()} → ${info.version})`);
    agendada = setTimeout(() => {
      gravarConfig({ reabrirCom: opcoesEmUso() });
      registra('instalando', info.version);
      autoUpdater.quitAndInstall(true, true);     // sem janelas, e reabre o programa
    }, quando - agora);
  });

  const verifica = () => autoUpdater.checkForUpdates().catch(e => registra('falha ao verificar:', e));
  setTimeout(verifica, 60 * 1000);
  setInterval(verifica, 6 * 60 * 60 * 1000);
}

app.whenReady().then(() => {
  recuperaOpcoesDaAtualizacao();
  if (arg('iniciar-com-sistema') || arg('iniciar-com-windows'))         iniciarComSistema(true);
  if (arg('nao-iniciar-com-sistema') || arg('nao-iniciar-com-windows')) iniciarComSistema(false);

  Menu.setApplicationMenu(null);
  liberaPortalUFSM();
  powerSaveBlocker.start('prevent-display-sleep');   // a tela não apaga nem entra em descanso
  criaJanela();

  // o monitor escolhido foi desligado e ligado de novo: o painel volta para ele
  screen.on('display-added', (_, tela) => {
    const salvo = lerConfig().monitor;
    if (janela && salvo && salvo.id === tela.id && !arg('monitor')) setTimeout(() => levaParaTela(tela), 1500);
  });

  setInterval(() => { if (janela) janela.webContents.reloadIgnoringCache(); },
              RECARREGA_A_CADA_HORAS * 60 * 60 * 1000);

  configuraAtualizacao();
});

app.on('window-all-closed', () => app.quit());

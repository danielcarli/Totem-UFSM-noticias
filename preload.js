// Ponte mínima entre o painel (página) e o aplicativo, usada pela tela de configurações.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('destaquesApp', {
  // enquanto a tela de configurações está aberta, as teclas 1/2/3 e Esc ficam para ela
  configurando: aberta => ipcRenderer.send('configurando', !!aberta),
  monitores: () => ipcRenderer.invoke('monitores'),
  usarMonitor: numero => ipcRenderer.invoke('usar-monitor', numero),
  // Destaques UFSM – Sistema: rede, Wi-Fi, Bluetooth, som, horário… ({ok:false} fora dele)
  sistema: (acao, args) => ipcRenderer.invoke('sistema', acao, args),
  aoMudarEnergia: fn => { ipcRenderer.removeAllListeners('energia'); ipcRenderer.on('energia', (_, e) => fn(e)); },
  // atualização do aplicativo (tela de configurações)
  atualizacao: {
    estado: () => ipcRenderer.invoke('atualizacao:estado'),
    buscar: () => ipcRenderer.invoke('atualizacao:buscar'),
    instalar: () => ipcRenderer.invoke('atualizacao:instalar'),
    aoMudar: fn => { ipcRenderer.removeAllListeners('atualizacao'); ipcRenderer.on('atualizacao', (_, a) => fn(a)); },
  },
});

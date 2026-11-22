// Ponte mínima entre o painel (página) e o aplicativo, usada pela tela de configurações.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('destaquesApp', {
  // enquanto a tela de configurações está aberta, as teclas 1/2/3 e Esc ficam para ela
  configurando: aberta => ipcRenderer.send('configurando', !!aberta),
  monitores: () => ipcRenderer.invoke('monitores'),
  usarMonitor: numero => ipcRenderer.invoke('usar-monitor', numero),
});

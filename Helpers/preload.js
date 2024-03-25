const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("getDatabase", {
  membros: () => ipcRenderer.invoke("getMembros"),
  pontos: () => ipcRenderer.invoke("getPontos"),
  openModal: (modal) => ipcRenderer.invoke("openModal"),
});

contextBridge.exposeInMainWorld("sendDatabase", {
  newMembro: (obj) => ipcRenderer.invoke("newMembro", obj),
  baterPonto: (obj) => ipcRenderer.invoke("baterPonto", obj),
});

contextBridge.exposeInMainWorld("env", {
  version: ipcRenderer.invoke("version"),
  ambiente: process.env.ambiente,
  debug: process.env.debug,
});

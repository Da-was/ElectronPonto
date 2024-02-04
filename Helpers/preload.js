const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("getDatabase", {
  membros: () => ipcRenderer.invoke("getMembros"),
  pontos: () => ipcRenderer.invoke("getPontos"),
});

contextBridge.exposeInMainWorld("env", {
  version: ipcRenderer.invoke("version"),
  ambiente: process.env.ambiente,
});

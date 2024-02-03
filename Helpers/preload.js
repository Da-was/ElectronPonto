const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("getDatabase", {
  membros: () => ipcRenderer.invoke("getMembros"),
});

contextBridge.exposeInMainWorld("env", {
  version: ipcRenderer.invoke("version"),
  ambiente: process.env.ambiente,
});

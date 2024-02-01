const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  ping: () => ipcRenderer.invoke("ping"),
});

contextBridge.exposeInMainWorld("env", {
  version: process.env.version,
  ambiente: process.env.ambiente,
});

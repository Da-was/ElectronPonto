require("dotenv").config();

const dataBaseConnection = require("./Helpers/dataBaseConnection.js");
const path = require("node:path");
const { app, BrowserWindow, ipcMain } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "/render/javascript/preload.js"),
    },
  });

  win.loadFile("./render/html/index.html");

  if (process.env.debug === "true") {
    win.webContents.openDevTools();
  }
};

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong");

  createWindow();
  dataBaseConnection();

  //documentação
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

//macOs == gay
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

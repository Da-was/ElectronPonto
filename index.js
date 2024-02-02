require("dotenv").config();

const dataBaseConnection = require("./Helpers/dataBaseConnection.js");
const Membro = require("./models/Membro.js");
const path = require("node:path");
const { app, BrowserWindow, ipcMain } = require("electron");

const { version } = require("./package.json");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "/render/javascript/preload.js"),
    },
  });
  win.loadFile("./render/html/index.html");
};

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong");
  ipcMain.handle("version", () => version);
  ipcMain.handle("getMembros", () => {
    return Membro.find({});
  });

  createWindow();
  dataBaseConnection();

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

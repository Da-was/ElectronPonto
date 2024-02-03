require("dotenv").config();

const dataBaseConnection = require("./Helpers/dataBaseConnection.js");

const path = require("node:path");
const { app, BrowserWindow } = require("electron");
const ipcHandle = require("./Helpers/ipcHandler.js");
const checkIntegration = require("./Helpers/checkIntegration.js");

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "Helpers/preload.js"),
    },
  });
  win.loadFile("./render/html/index.html");
}

function initializeAll() {
  checkIntegration();
  dataBaseConnection();
  createWindow();
  ipcHandle();
}

app.whenReady().then(initializeAll);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

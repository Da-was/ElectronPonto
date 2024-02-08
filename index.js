require("dotenv").config();

const dataBaseConnection = require("./Helpers/dataBaseConnection.js");

const path = require("node:path");
const { app, BrowserWindow, dialog } = require("electron");
const ipcHandle = require("./Helpers/ipcHandler.js");
const checkIntegration = require("./Helpers/checkIntegration.js");
const discordSupport = require("./Integrations/discord-support.js");

function createWindow() {
  const win = new BrowserWindow({
    width: 700,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "Helpers/preload.js"),
    },
  });
  win.loadFile("./render/html/index.html");
}

async function handleEror(error) {
  const messageBoxOptions = {
    type: "error",
    title: "Falha no processo principal",
    message: "Uma mensagem foi enviada ao suporte",
  };

  if (process.env.debug === "true") {
    messageBoxOptions.message = error.toString();
  } else {
    if (checkIntegration.integrations.discord) {
      await discordSupport.sendMessage(error.toString());
    }
  }

  dialog.showMessageBoxSync(messageBoxOptions);
  app.exit(1);
}

function initializeAll() {
  try {
    checkIntegration.checkAvaible();
    dataBaseConnection();
    createWindow();
    ipcHandle();
  } catch (error) {
    handleEror(error);
  }
}

app.whenReady().then(initializeAll);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

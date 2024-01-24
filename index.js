require("dotenv").config();
const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("./render/html/index.html");
};

app.whenReady().then(() => {
  createWindow();

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

const { ipcMain } = require("electron");
const Membro = require("../models/Membro.js");
const { version } = require("../package.json");

module.exports = function handleIpc() {
  ipcMain.handle("ping", () => "pong");
  ipcMain.handle("version", () => version);
  ipcMain.handle("getMembros", async () => {
    let memberList = [];
    await Membro.find({}).then(function (users) {
      memberList = users;
    });
    return memberList;
  });
};

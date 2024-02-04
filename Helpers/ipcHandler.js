const { ipcMain } = require("electron");
const Membro = require("../models/Membro.js");
const Ponto = require("../models/Ponto.js");
const { version } = require("../package.json");

module.exports = function handleIpc() {
  ipcMain.handle("ping", () => "pong");
  ipcMain.handle("version", () => version);
  ipcMain.handle("getMembros", async () => {
    let memberList = [];
    await Membro.find({}).then(function (membros) {
      membros.forEach((membro) => {
        membro = membro.toObject();
        membro._id = membro._id.toString();
        memberList.push(membro);
      });
    });
    return memberList;
  });

  ipcMain.handle("getPontos", async () => {
    let pontoList = [];

    const pontos = await Ponto.find({}).populate("membro").exec();
    pontos.forEach((ponto) => {
      ponto = ponto.toObject();
      ponto._id = ponto._id.toString();
      ponto.membro._id = ponto.membro._id.toString();
      pontoList.push(ponto);
    });

    return pontoList;
  });
};

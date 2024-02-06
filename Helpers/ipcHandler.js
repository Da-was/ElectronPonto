const { ipcMain, BrowserWindow } = require("electron");
const imageDataUri = require("image-data-uri");

const path = require("node:path");
const Membro = require("../models/Membro.js");
const Ponto = require("../models/Ponto.js");
const { version } = require("../package.json");

module.exports = function handleIpc() {
  ipcMain.handle("version", () => version);
  ipcMain.handle("getMembros", getMembros);
  ipcMain.handle("getPontos", getPontos);
  ipcMain.handle("openModal", openModal);
  ipcMain.handle("newMembro", newMembro);
  ipcMain.handle("baterPonto", baterPonto);
};

async function baterPonto(event, obj) {
  const membroObj = await Membro.findById(obj.membroId).exec();
  const ponto = await Ponto.create({
    membro: membroObj.id,
  });

  const dataAtual = new Date().toLocaleDateString().replaceAll("/", "-");
  const horaAtual = new Date().toLocaleTimeString().replaceAll(":", "_");

  let path = `./Storage/Pontos/${membroObj.id}/${dataAtual}/${horaAtual}.png`;

  await imageDataUri
    .outputFile(obj.imgData, path)
    /* .then((succ) => console.log(succ)) colocar log aqui */
    .catch((error) => console.error(error));

  return {
    sucess: `Ponto de ${membroObj.nome}  batido com sucesso! `,
  };
}

async function getMembros() {
  let memberList = [];
  await Membro.find({}).then(function (membros) {
    membros.forEach((membro) => {
      membro = membro.toObject();
      membro._id = membro._id.toString();
      memberList.push(membro);
    });
  });
  return memberList;
}

async function getPontos() {
  let pontoList = [];

  const pontos = await Ponto.find({}).populate("membro").exec();
  pontos.forEach((ponto) => {
    ponto = ponto.toObject();
    ponto._id = ponto._id.toString();
    ponto.membro._id = ponto.membro._id.toString();
    pontoList.push(ponto);
  });

  return pontoList;
}

function openModal(url) {
  const modal = new BrowserWindow({
    height: 600,
    width: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  modal.loadFile("./render/html/Cadastro.html");
}

async function newMembro(event, obj) {
  const nwMembro = await Membro.create({
    nome: obj.nome,
    equipe: obj.equipe,
  }).catch((error) => {
    console.log(error);
    return false;
  });

  return true;
}

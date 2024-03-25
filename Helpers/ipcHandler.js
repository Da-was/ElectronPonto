//Refazer o arquivo para separar o que é banco de dados e o que não é

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
  const retObject = {
    message: `DefaultMessage (Something probaly went wrong)`,
  };

  const membroObj = await Membro.findById(obj.membroId).exec();
  await Ponto.create({
    membro: membroObj.id,
  })
    .then(() => {
      retObject.message = `Ponto de ${membroObj.nome}  batido com sucesso! `;
    })
    .catch((error) => {
      retObject.message = `Algo deu errado ao tentar bater o ponto.`;
      retObject.error = error;
      return retObject;
    });

  const dataAtual = new Date().toLocaleDateString().replaceAll("/", "-");
  const horaAtual = new Date().toLocaleTimeString().replaceAll(":", "_");

  let path = `./Storage/Pontos/${membroObj.id}/${dataAtual}/${horaAtual}.png`;

  if (obj.imgData !== "") {
    await imageDataUri.outputFile(obj.imgData, path).catch((error) => {
      retObject.message = retObject.concat("|", "Erro ao salvar a foto.");
      retObject.error = error;
    });
  }

  return retObject;
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

  //Muito texto, tem como melhorar
  let todayMidnight = new Date();
  todayMidnight.setUTCHours(0);
  todayMidnight.setUTCMinutes(0);
  todayMidnight.setUTCSeconds(0);
  todayMidnight.setUTCMilliseconds(0);

  let nextMidnight = new Date();
  nextMidnight.setUTCHours(24);
  nextMidnight.setUTCMinutes(0);
  nextMidnight.setUTCSeconds(0);
  nextMidnight.setUTCMilliseconds(0);

  const pontos = await Ponto.find({
    data: {
      $gte: todayMidnight,
      $lte: nextMidnight,
    },
  })
    .populate("membro")
    .exec();

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
  await Membro.create({
    nome: obj.nome,
    equipe: obj.equipe,
  }).catch((error) => {
    console.log(error);
    return false;
  });

  return true;
}

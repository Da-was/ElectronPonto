async function render() {
  //Odeio javascript
  preencherVersoes();
  preencherSelect();
  preencherPontos();
}

async function preencherSelect() {
  const membrosSelect = document.getElementById("membroSelect");
  const membros = await getDatabase.membros();

  membros.forEach((element) => {
    console.log(element);
    const optionNode = document.createElement("option");
    optionNode.value = element._id;
    optionNode.innerText = element.nome;
    membrosSelect.appendChild(optionNode);
  });
}

async function preencherPontos() {
  const pontoList = document.getElementById("pontoList");
  const pontos = await getDatabase.pontos();

  pontos.forEach((element) => {
    console.log(element);

    const pontoElement = document.createElement("div");
    const nomeConteiner = document.createElement("span");
    const dataConteiner = document.createElement("span");
    const horaConteiner = document.createElement("span");
    const dataDoPonto = new Date(element.data);

    pontoElement.classList.add("ponto");
    nomeConteiner.classList.add("nome");
    dataConteiner.classList.add("data");
    horaConteiner.classList.add("hora");

    nomeConteiner.innerText = element.membro.nome;

    dataConteiner.innerText =
      dataDoPonto.getDate().toString().padStart(2, "0") +
      "/" +
      (dataDoPonto.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      dataDoPonto.getFullYear();

    horaConteiner.innerText =
      dataDoPonto.getHours() +
      ":" +
      dataDoPonto.getMinutes().toString().padStart(2, "0");

    pontoElement.appendChild(nomeConteiner);
    pontoElement.appendChild(dataConteiner);
    pontoElement.appendChild(horaConteiner);
    pontoList.appendChild(pontoElement);
  });
}

async function preencherVersoes() {
  const v = await env.version;
  document.getElementById("versions").innerText = `Versão do app (V${v})`;
  document.title = `CPR ${v}`;
}
render();

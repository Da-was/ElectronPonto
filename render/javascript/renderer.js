const horaInput = document.getElementById("horaAtualInput");

async function render() {
  let blurred = false;
  window.onblur = () => (blurred = true);
  window.onfocus = () => blurred && preencherPontos() && preencherSelect();

  preencherSelect();
  preencherPontos();

  document.getElementById("newMember").addEventListener("click", async () => {
    await getDatabase.openModal("teste");
  });

  setInterval(updateTime, 1000);
}

function updateTime() {
  const now = new Date(); // data e hora atual

  // horario do relogio digital
  const timeHours = document.getElementById("hours");
  const timeSeconds = document.getElementById("seconds");

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const timeHoursString = `${hours}:${minutes}`;
  timeHours.textContent = timeHoursString; // atualiza as horas e minutos
  timeSeconds.textContent = seconds; // atualiza os segundos

  // horario do input
  horaInput.value =
    now.getDate().toString().padStart(2, "0") +
    "/" +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    now.getFullYear() +
    " -- " +
    hours +
    ":" +
    minutes;
}

async function preencherSelect() {
  const membrosSelect = document.getElementById("membroSelect");
  membrosSelect.replaceChildren(); //limpa o select
  const membros = await getDatabase.membros();

  membros.forEach((element) => {
    const optionNode = document.createElement("option");
    optionNode.value = element._id;
    optionNode.innerText = element.nome;
    membrosSelect.appendChild(optionNode);
  });
}

async function preencherPontos() {
  const pontoList = document.getElementById("pontoList");
  pontoList.replaceChildren(); //limpa a div, podemos melhorar pra ele não flicar na hora que atualizar
  const pontos = await getDatabase.pontos();

  pontos.forEach((element) => {
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
render();

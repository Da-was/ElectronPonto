async function render() {
  //Odeio javascript
  preencherVersoes();
  preencherSelect();
}

async function preencherSelect() {
  const membrosSelect = document.getElementById("membroSelect");
  const membros = await getDatabase.membros();

  membros.forEach((element) => {
    const optionNode = document.createElement("option");
    optionNode.value = element._doc._id;
    optionNode.innerText = element._doc.nome;
    membrosSelect.appendChild(optionNode);
  });
}

async function preencherVersoes() {
  const v = await env.version;
  document.getElementById("versions").innerText = `Versão do app (V${v})`;
  document.title = `CPR ${v}`;
}
render();

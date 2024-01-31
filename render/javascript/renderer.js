const information = document.getElementById("versions");
information.innerText = `this app is using Chrome(V${versions.chrome()}), node.js(V${versions.node()})`;

if (env.ambiente === "testes") {
  document.getElementById("ambiente").innerText = `Ambiente de testes`;
}

const buttom = document.getElementById("but");
const pingHere = document.getElementById("pingHere");
buttom.addEventListener("click", async () => {
  pingHere.innerText = await versions.ping();
});

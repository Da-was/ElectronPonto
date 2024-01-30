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

//Esperar a webcam nova para testar
/* navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    document.getElementById("cameraOutput").srcObject = stream;
  })
  .catch((error) => {
    if (error) {
      alert(error);
    } else {
      alert("erro na hora de pegar imagem");
    }
  }); */

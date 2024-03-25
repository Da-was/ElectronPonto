const canvas = document.getElementById("imagePreview");
const ctx = canvas.getContext("2d");
const videoOutuput = document.createElement("video");

let cameraEnabled = false;

document.getElementById("sendIcon").addEventListener("click", snapshot);

function startVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      document.getElementById("loadingGif").remove();
      videoOutuput.setAttribute("autoplay", "true");
      videoOutuput.setAttribute("id", "cameraOutput");
      document.getElementById("cameraBackground").appendChild(videoOutuput);
      videoOutuput.srcObject = stream;
      cameraEnabled = true;
    })
    .catch((error) => {
      cameraEnabled = false;
      alert(error);
    });
}

async function snapshot() {
  ctx.drawImage(videoOutuput, 0, 0, canvas.width, canvas.height);

  await sendDatabase
    .baterPonto({
      membroId: document.getElementById("membroSelect").value,
      imgData: cameraEnabled == true ? canvas.toDataURL() : "",
    })
    .then((response) => {
      alert(response.message);
      if (response.error) {
        console.log(response.error);
      }

      preencherPontos(); //Melhorar a estrutura de funções e arquivos
    })
    .catch((error) => console.log(error));
}

startVideo();

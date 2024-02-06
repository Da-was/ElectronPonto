const canvas = document.getElementById("imagePreview");
const ctx = canvas.getContext("2d");
const videoOutuput = document.createElement("video");
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
    })
    .catch((error) => alert(error));
}

async function snapshot() {
  ctx.drawImage(videoOutuput, 0, 0, canvas.width, canvas.height);

  await sendDatabase
    .baterPonto({
      membroId: document.getElementById("membroSelect").value,
      imgData: canvas.toDataURL(),
    })
    .then((response) => {
      if (response.sucess) {
        alert(response.sucess);
      } else {
        //ainda não implementado
        alert(response.fail);
      }
    })
    .catch((error) => console.log(error));
}

startVideo();

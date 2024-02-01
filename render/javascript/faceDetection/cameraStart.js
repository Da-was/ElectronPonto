function startVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      document.getElementById("loadingGif").remove();

      const videoOutuput = document.createElement("video");

      videoOutuput.setAttribute("autoplay", "true");
      videoOutuput.setAttribute("id", "cameraOutput");
      document.getElementById("cameraBackground").appendChild(videoOutuput);
      videoOutuput.srcObject = stream;
    })
    .catch((error) => alert(error));
}

startVideo();

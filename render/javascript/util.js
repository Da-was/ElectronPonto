setInterval(myTimer, 1000);
const horaInput = document.getElementById("horaAtualInput");

function myTimer() {
  const currentdate = new Date();
  horaInput.value =
    currentdate.getDate().toString().padStart(2, "0") +
    "/" +
    (currentdate.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    currentdate.getFullYear() +
    " -- " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes().toString().padStart(2, "0");
}

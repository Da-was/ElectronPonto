setInterval(myTimer, 1000);

function myTimer() {
  const currentdate = new Date();
  document.getElementById("horaAtualInput").value =
    currentdate.getDate().toString().padStart(2, "0") +
    "/" +
    (currentdate.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    currentdate.getFullYear() +
    " -- " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes();
}

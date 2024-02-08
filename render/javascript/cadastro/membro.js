document.getElementById("sendData").addEventListener("click", async () => {
  const fields = document.getElementById("formInfo").elements;

  await sendDatabase
    .newMembro({
      nome: fields.membroNome.value,
      equipe: fields.equipe.value,
    })
    .then((result) => {
      if (result) {
        alert("Membro criado com sucesso.");
      } else {
        alert("Um erro ocorreu.");
      }
    })
    .then(() => window.close());
});

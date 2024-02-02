async function render() {
  //Odeio javascript
  const v = await env.version;
  const information = (document.getElementById(
    "versions"
  ).innerText = `Versão do app (V${v})`);

  document.title = `CPR ${v}`;
  //console.log(await getDatabase.membros());
}
render();

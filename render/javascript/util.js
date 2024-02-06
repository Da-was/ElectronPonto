async function preencherVersoes() {
  const v = await env.version;
  document.getElementById("versions").innerText = `Versão do app (V${v})`;
  document.title = `CPR ${v}`;
}

preencherVersoes();

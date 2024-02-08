module.exports = {
  sendMessage: async (message) => {
    await fetch(process.env.discordHook, {
      method: "POST",
      body: JSON.stringify({
        content: `Erro vindo do CPR: ${message}`,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).catch((error) => console.log(error));
  },
};

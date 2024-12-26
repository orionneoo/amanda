const { PREFIX, SPIDER_API_TOKEN, SPIDER_API_BASE_URL } = require("../../config");
const axios = require("axios");

module.exports = {
  name: "piadas",
  description: "Solicita uma piada ao GPT-4.",
  commands: ["piadas"],
  usage: `${PREFIX}piadas`,

  handle: async ({ fullArgs, sendReply, socket, remoteJid, sendReact }) => {
    // Envia uma reação de carregamento
    await sendReact("⌛");

    try {
      // Consulta a API do GPT-4 para gerar uma piada
      const response = await axios.post(
        `${SPIDER_API_BASE_URL}/ai/gpt-4?api_key=${SPIDER_API_TOKEN}`,
        {
          text: "Me conte uma piada engraçada.",
        }
      );

      const piada = response.data.response;

      if (!piada) {
        return await sendReply("⚠️ Não consegui gerar uma piada no momento. Tente novamente.");
      }

      // Envia a piada gerada
      await sendReply(piada);
    } catch (error) {
      // Caso haja algum erro na requisição, envia uma mensagem de erro
      await sendReply("⚠️ Algo deu errado ao buscar a piada. Tente novamente mais tarde.");
      console.error("Erro ao gerar piada:", error);
    }
  },
};

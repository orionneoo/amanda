const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");

module.exports = {
  name: "dividir",
  description: "Divide uma conta entre os membros.",
  commands: [`${PREFIX}dividir`],
  usage: `${PREFIX}dividir`,
  handle: async ({
    sendReply,
    sendMessage,
    socket,
    remoteJid,
    userJid,
    message
  }) => {
    // Etapa 1: Perguntar o valor
    await sendReply("💸 Qual o valor da conta?");

    // Esperar a resposta do usuário (supondo que estamos coletando respostas de forma assíncrona)
    const valorResposta = await waitForUserResponse(socket, userJid, remoteJid);
    const valorTotal = parseFloat(valorResposta);

    if (isNaN(valorTotal) || valorTotal <= 0) {
      return await sendReply("⚠️ O valor fornecido não é válido. Tente novamente.");
    }

    // Etapa 2: Perguntar o número de pessoas
    await sendReply("Quantas pessoas vão dividir a conta?");

    const pessoasResposta = await waitForUserResponse(socket, userJid, remoteJid);
    const numeroPessoas = parseInt(pessoasResposta, 10);

    if (isNaN(numeroPessoas) || numeroPessoas <= 0) {
      return await sendReply("⚠️ O número de pessoas não é válido. Tente novamente.");
    }

    // Etapa 3: Calcular o valor por pessoa
    const valorPorPessoa = valorTotal / numeroPessoas;

    // Resposta final
    await sendReply(`💸 **Divisão de Conta** 💸\n\nTotal da conta: R$ ${valorTotal.toFixed(2)}\nNúmero de pessoas: ${numeroPessoas}\nValor por pessoa: R$ ${valorPorPessoa.toFixed(2)}`);
  },
};

// Função para esperar pela resposta do usuário
async function waitForUserResponse(socket, userJid, remoteJid) {
  return new Promise((resolve) => {
    socket.on("message", (message) => {
      if (message.remoteJid === remoteJid && message.sender === userJid) {
        resolve(message.body);
      }
    });
  });
}

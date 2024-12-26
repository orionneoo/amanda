const { PREFIX } = require("../../config");

module.exports = {
  name: "cornos",
  description: "Marca todos os membros do grupo com um motivo opcional.",
  commands: ["cornos"],
  usage: `${PREFIX}cornos motivo`,

  handle: async ({ fullArgs, sendText, socket, remoteJid, sendReact }) => {
    // Obtém os participantes do grupo
    const { participants } = await socket.groupMetadata(remoteJid);

    // Cria a lista de membros a serem mencionados
    const mentions = participants.map(({ id }) => id);

    // Envia a reação "📢" para indicar que a mensagem está sendo enviada
    await sendReact("📢");

    // Se não houver motivo, usa uma mensagem padrão
    const motivo = fullArgs.length > 0 ? fullArgs : "Mensagem sem motivo.";

    // Envia a mensagem com a formatação desejada
    await sendText(`💁🏾‍♂️🙅🏻‍♂️ 📢 Marcando todos os cornos do grupo! Motivo: *${motivo}*`, mentions);
  },
};

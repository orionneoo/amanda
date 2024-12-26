const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const { toUserJid, onlyNumbers } = require("../../utils");
const { BOT_NUMBER } = require("../../config");

const usersToBanCache = new Set();

const roletaRussa = async (mentionedJid, sendReply, socket, remoteJid, userJid) => {
  // Sorteio aleatório de 1 a 6
  const chance = Math.floor(Math.random() * 6) + 1;

  // Emojis numerados
  const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣"];
  const chosenEmoji = emojis[chance - 1];

  // Resultado da brincadeira
  const isBanned = chance <= 2; // 2 em 6 de chance de "perder"
  const resultMessage = isBanned
    ? `💣 Você perdeu! Que azar... 🚪`
    : `✅ Você escapou dessa vez!`;

  // Enviar o resultado primeiro
  await sendReply(resultMessage); // Apenas o texto sem marcação

  // Se "perder", removendo o usuário do grupo (banindo)
  if (isBanned) {
    try {
      const memberToRemoveJid = mentionedJid;
      const memberToRemoveNumber = onlyNumbers(memberToRemoveJid);

      if (memberToRemoveNumber.length < 7 || memberToRemoveNumber.length > 15) {
        throw new InvalidParameterError("Número inválido!");
      }

      // Evita que o bot ou o próprio usuário seja removido
      const botJid = toUserJid(BOT_NUMBER);
      if (memberToRemoveJid === botJid) {
        console.log("Você não pode me remover!");
        return;
      }

      if (memberToRemoveJid === userJid) {
        console.log("Você não pode se remover!");
        return;
      }

      // Espera um tempo antes de remover o participante para dar tempo de enviar a mensagem
      setTimeout(async () => {
        await socket.groupParticipantsUpdate(
          remoteJid,
          [memberToRemoveJid],
          "remove"
        );
        console.log(`Usuário ${mentionedJid} removido do grupo.`);
      }, 2000); // Aguarda 2 segundos antes de banir o participante
    } catch (error) {
      console.error("Erro ao tentar remover o participante:", error);
    }
  }
};

module.exports = {
  name: "roleta-russa",
  description: "Brincadeira de sorteio aleatório com 2 chances em 6 de perder.",
  commands: [`${PREFIX}roletarussa`], // Usando o PREFIX configurado para o comando
  usage: `${PREFIX}roletarussa @marcação_membro`,
  handle: async ({
    args,
    isReply,
    socket,
    remoteJid,
    replyJid,
    sendReply,
    userJid,
    sendSuccessReact,
    message,
  }) => {
    // Verificação de parâmetros
    if (!args.length && !isReply) {
      throw new InvalidParameterError("Você precisa mencionar ou marcar um membro!");
    }

    // Se a mensagem for uma resposta, pegamos o JID do usuário marcado
    const mentionedJid = isReply ? replyJid : toUserJid(args[0]);

    // Verificação se o JID mencionado é válido
    if (!mentionedJid || mentionedJid === userJid) {
      throw new InvalidParameterError("Você precisa mencionar um membro válido!");
    }

    // Executa a lógica da roleta russa
    await roletaRussa(mentionedJid, sendReply, socket, remoteJid, userJid);
  },
};

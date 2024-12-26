const { onlyNumbers } = require("../utils");
const { isActiveWelcomeGroup } = require("../utils/database");
const { warningLog } = require("../utils/logger");
const fs = require("fs");

exports.onGroupParticipantsUpdate = async ({
  groupParticipantsUpdate,
  socket,
}) => {
  const remoteJid = groupParticipantsUpdate.id;
  const userJid = groupParticipantsUpdate.participants[0];

  if (!isActiveWelcomeGroup(remoteJid)) {
    return;
  }

  if (groupParticipantsUpdate.action === "add") {
    try {
      // Mensagem inicial de boas-vindas
      await socket.sendMessage(remoteJid, {
        text: `🎉 Seja bem-vinde, @${onlyNumbers(userJid)}! 🎉`,
        mentions: [userJid], // Marca o participante com o ID completo
      });

      // Espera 1 segundo e envia a segunda mensagem
      setTimeout(async () => {
        await socket.sendMessage(remoteJid, {
          text: `Você recebeu o modelo de apresentação que usamos aqui no grupo! 🚀`,
          mentions: [userJid], // Marca o participante com o ID completo
        });

        // Envia a dica após mais 1 segundo
        setTimeout(async () => {
          await socket.sendMessage(remoteJid, {
            text: `📝 Dica: É só copiar a mensagem de apresentação, preencher com suas informações e enviar junto com a foto! Ah, e não apague o .bio, ok? 😉`,
            mentions: [userJid], // Marca o participante com o ID completo
          });

          // Envia o áudio de boas-vindas
          const audioPath = "C:/Users/Well/Desktop/meu-bot-whatsapp/takeshi-bot-main/assets/images/bemvindajeff.mp3";
          await socket.sendMessage(remoteJid, {
            audio: fs.createReadStream(audioPath),
            mimetype: "audio/mp4",
            ptt: true, // Indica que é um áudio de voz
          });
        }, 1000); // Delay de 1 segundo para a dica
      }, 1000); // Delay de 1 segundo para a segunda mensagem
    } catch (error) {
      warningLog(
        "Alguém entrou no grupo e eu não consegui enviar a mensagem de boas-vindas!"
      );
    }
  }
};

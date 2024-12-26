const fs = require("fs");
const { onlyNumbers } = require("../utils");

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
      // Envia a primeira mensagem de boas-vindas
      await socket.sendMessage(remoteJid, {
        text: `🎉 Seja bem-vinde, @${onlyNumbers(userJid)}! 🎉`,
        mentions: [userJid],
      });

      // Espera 1 segundo antes de enviar a próxima mensagem
      setTimeout(async () => {
        await socket.sendMessage(remoteJid, {
          text: `Você recebeu o modelo de apresentação que usamos aqui no grupo! 🚀`,
          mentions: [userJid],
        });

        // Envia a dica após mais 1 segundo
        setTimeout(async () => {
          await socket.sendMessage(remoteJid, {
            text: `📝 Dica: É só copiar a mensagem de apresentação, preencher com suas informações e enviar junto com a foto! Ah, e não apague o .bio, ok? 😉`,
            mentions: [userJid],
          });

          // Envia o áudio de boas-vindas
          const audioPath = "C:/Users/Well/Desktop/meu-bot-whatsapp/takeshi-bot-main/assets/images/bemvindajeff.mp3"; // Ajuste o caminho do arquivo
          
          // Verifica se o arquivo de áudio existe
          if (fs.existsSync(audioPath)) {
            try {
              const audioBuffer = fs.createReadStream(audioPath);

              // Envia o áudio
              await socket.sendMessage(remoteJid, {
                audio: audioBuffer,
                mimetype: "audio/mp3", // Tipo MIME para áudio MP3
                ptt: true, // Indica que é um áudio de voz
              });
            } catch (audioError) {
              // Se ocorrer erro ao enviar o áudio, apenas loga o erro e segue com o restante do código
              console.error("Erro ao enviar o áudio:", audioError);
            }
          } else {
            console.error("O arquivo de áudio não foi encontrado no caminho especificado.");
          }
        }, 1000); // Delay de 1 segundo para a dica
      }, 1000); // Delay de 1 segundo para a segunda mensagem
    } catch (error) {
      console.error("Erro ao enviar mensagens de boas-vindas:", error);
      
      // Não desliga o bot, apenas loga o erro
      // O bot continuará funcionando normalmente
    }
  }
};

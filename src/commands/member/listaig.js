const fs = require("fs");
const path = require("path");
const { PREFIX } = require("../../config"); // Certifique-se de que o PREFIX está importado corretamente

// Função para garantir que o diretório do grupo exista
const ensureGroupDirectoryExists = (groupJid) => {
  const groupDirPath = path.join(__dirname, "..", "..", "..", "groups");
  const groupFilePath = path.join(groupDirPath, `${groupJid}_users.json`);

  // Verifica se o diretório do grupo existe, caso contrário, cria
  if (!fs.existsSync(groupDirPath)) {
    fs.mkdirSync(groupDirPath, { recursive: true });
  }

  // Se o arquivo do grupo não existir, cria o arquivo com um array vazio
  if (!fs.existsSync(groupFilePath)) {
    fs.writeFileSync(groupFilePath, JSON.stringify([], null, 2));
  }

  return groupFilePath;
};

// Função para enviar todos os Instagrams de todos os participantes do grupo
const sendAllInstagramLinks = async (groupJid, sendReply) => {
  const groupFilePath = path.join(__dirname, "..", "..", "..", "groups", `${groupJid}_users.json`);

  if (!fs.existsSync(groupFilePath)) {
    await sendReply("⚠️ Nenhum Instagram foi salvo neste grupo ainda.");
    return;
  }

  const groupData = JSON.parse(fs.readFileSync(groupFilePath, "utf8"));
  
  let instagramList = "📷 Instagram dos Participantes - ⛓️ Calabouço ⛓️\n\n";
  
  groupData.forEach((user, index) => {
    instagramList += `${index + 1}. @${user.displayName} \n${user.instagram}\n\n`;
  });

  await sendReply(instagramList);
};

module.exports = {
  name: "ig",  // Nome do comando
  description: "Lista todos os Instagrams salvos dos participantes do grupo.",
  commands: [`${PREFIX}ig`],  // Comando para listar os Instagrams
  usage: `${PREFIX}ig`,  // Como usar o comando
  handle: async ({ args, remoteJid, sendReply }) => {
    // Chama a função para enviar a lista de Instagrams
    await sendAllInstagramLinks(remoteJid, sendReply);
  },
};

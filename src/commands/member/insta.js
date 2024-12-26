const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const fs = require("fs");
const path = require("path");

// Função para garantir que o diretório do grupo exista e criar o arquivo caso não exista
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

// Função para salvar o Instagram de um usuário no arquivo
const saveInstagramLink = (groupJid, userJid, instagramHandle) => {
  const groupFilePath = ensureGroupDirectoryExists(groupJid);

  // Lê os dados do arquivo
  let groupData = JSON.parse(fs.readFileSync(groupFilePath, "utf8"));

  // Evita duplicação de Instagram para o mesmo usuário
  if (groupData.some(user => user.jid === userJid)) {
    return;
  }

  // Extrair o número do JID para criar a marcação
  const userPhoneNumber = userJid.split('@')[0]; // Aqui extrai o número do telefone (antes do '@')

  // Adiciona o Instagram do novo usuário
  groupData.push({
    jid: userJid,  // Salvando o JID do usuário
    instagram: `https://www.instagram.com/${instagramHandle}`,
    displayName: userPhoneNumber // Usando o número como o nome exibido
  });

  // Salva os dados no arquivo do grupo
  fs.writeFileSync(groupFilePath, JSON.stringify(groupData, null, 2));
};

module.exports = {
  name: "insta",
  description: "Salva o Instagram de um usuário.",
  commands: [`${PREFIX}insta`],  // Comando apenas para capturar
  usage: `${PREFIX}insta instagram_handle`, // Exemplo: /insta weelrib
  handle: async ({
    args,
    remoteJid,
    userJid,
    sendReply,
  }) => {
    // Verifica se o comando tem os parâmetros corretos
    if (args.length < 1) {
      throw new InvalidParameterError("Você precisa fornecer o nome de usuário do Instagram!");
    }

    // Extrai o nome do Instagram após o "@" no comando
    const instagramHandle = args[0].replace('@', '');

    if (!instagramHandle) {
      throw new InvalidParameterError("Você precisa fornecer o nome de usuário do Instagram!");
    }

    // Salva o Instagram no arquivo correspondente ao grupo
    saveInstagramLink(remoteJid, userJid, instagramHandle);

    // Resposta de confirmação
    await sendReply(`✅ Instagram de @${instagramHandle} salvo com sucesso!`);
  },
};

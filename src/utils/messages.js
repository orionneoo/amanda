const { BOT_NAME, PREFIX } = require("../config");

exports.waitMessage = "Carregando dados...";

exports.menuMessage = () => {
  const date = new Date();

  return `╭━━⪩ BEM VINDO! ⪨━━
▢
▢ • ${BOT_NAME}
▢ • Data: ${date.toLocaleDateString("pt-br")}
▢ • Hora: ${date.toLocaleTimeString("pt-br")}
▢ • Prefixo: ${PREFIX}
▢
╰━━─「🪐」─━━

╭━━⪩ DONO ⪨━━
▢
▢ • ${PREFIX}off  (Desliga o bot)
▢ • ${PREFIX}on   (Liga o bot)
▢
╰━━─「🌌」─━━

╭━━⪩ ADMINS ⪨━━
▢
▢ • ${PREFIX}anti-link (1/0)  (Ativa ou desativa o bloqueio de links)
▢ • ${PREFIX}auto-responder (1/0)  (Ativa ou desativa as respostas automáticas)
▢ • ${PREFIX}ban  (Bane um usuário do grupo)
▢ • ${PREFIX}hidetag  (Remove a tag de todos os membros do grupo)
▢ • ${PREFIX}welcome (1/0)  (Ativa ou desativa a mensagem de boas-vindas)
▢ • ${PREFIX}roletarussa (1/0)  (Inicia o jogo da roleta russa com 1/6 de chance de perder)
▢
╰━━─「⭐」─━━

╭━━⪩ MENU ⪨━━
▢
▢ • ${PREFIX}attp  (Cria uma imagem de texto animada)
▢ • ${PREFIX}cep  (Busca informações sobre um CEP)
▢ • ${PREFIX}gpt-4  (Acessa o modelo GPT-4 para gerar respostas)
▢ • ${PREFIX}image  (Cria uma imagem a partir de uma descrição)
▢ • ${PREFIX}ping  (Verifica a latência do bot)
▢ • ${PREFIX}play-audio  (Toca um áudio em um grupo)
▢ • ${PREFIX}play-video  (Toca um vídeo em um grupo)
▢ • ${PREFIX}sticker  (Cria um sticker a partir de uma imagem)
▢ • ${PREFIX}to-image  (Converte um sticker em imagem)
▢ • ${PREFIX}insta  (Salva o Instagram de um usuário)
▢ • ${PREFIX}ig  (Lista todos os Instagrams salvos)
▢ • ${PREFIX}dividir  (Divide um valor pelos membros selecionados)
▢ • ${PREFIX}chance  (Calcula uma chance aleatória para um questionamento)
╰━━─「🚀」─━━`;
};

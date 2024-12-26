const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");

module.exports = {
  name: "dividir",
  description: "Divide uma conta entre os membros.",
  commands: [`${PREFIX}dividir`],
  usage: `${PREFIX}dividir <valor> <membros>`,

  handle: async ({ args, sendReply }) => {
    try {
      // Verificar se o número correto de argumentos foi fornecido
      if (args.length < 2) {
        return await sendReply("⚠️ Você precisa informar o valor e os membros para dividir a conta!");
      }

      // Primeiro argumento: valor total da conta
      const valorTotal = parseFloat(args[0]);

      // Verificar se o valor total é válido
      if (isNaN(valorTotal) || valorTotal <= 0) {
        return await sendReply("⚠️ O valor fornecido não é válido. Tente novamente.");
      }

      // Os membros são os argumentos restantes (separados por vírgula)
      const membros = args.slice(1).join(" ").split(",").map(membro => membro.trim());

      // Verificar se há pelo menos 1 membro
      if (membros.length < 1) {
        return await sendReply("⚠️ Você precisa mencionar pelo menos 1 membro.");
      }

      // Calcular o valor por membro
      const valorPorPessoa = valorTotal / membros.length;

      // Gerar a resposta
      const resposta = `
💸 **Divisão de Conta** 💸
Total da conta: R$ ${valorTotal.toFixed(2)}
Número de membros: ${membros.length}
Valor por membro: R$ ${valorPorPessoa.toFixed(2)}
Membros: ${membros.join(", ")}
`;

      // Enviar resposta para o usuário
      await sendReply(resposta);

    } catch (error) {
      // Se ocorrer um erro inesperado, enviar uma mensagem genérica
      console.error(error); // Para depuração no console
      await sendReply("⚠️ Algo deu errado ao processar o comando. Tente novamente.");
    }
  },
};

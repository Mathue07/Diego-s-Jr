// tarefa 1
Uma Promise é um objeto que representa o sucesso ou a falha futura de uma operação assíncrona que ainda não foi concluída.

// tarefa 2 
  Os três estados possíveis
• Pending (Pendente): Estado inicial, a operação ainda está executando.
• Fulfilled (Resolvida): A operação foi concluída com sucesso.
• Rejected (Rejeitada): A operação falhou com um erro.

// tarefa 3
  try {
  const produto = await buscarProduto(3);
  console.log(produto);
} catch (erro) {
  console.log(erro);
}

// tarefa 4
O await pausa apenas a execução da função assíncrona onde ele foi inserido, permitindo que o restante do programa continue rodando normalmente.

// tarefa 5
A palavra-chave await precisa da infraestrutura de uma função async para saber como pausar e retomar a execução sem travar a linha principal do JavaScript.

// tarefa 6
  async function buscarProduto(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, nome: "Produto " + id }), 1000);
  });
}

// tarefa 7
A função carregarDados utiliza a palavra-chave await em seu corpo, mas não foi declarada com a palavra-chave async em sua assinatura.

// tarefa 8 
  const dados = await resposta.json();

// tarefa 9
• alha de rede: Ocorre quando a conexão física falha ou o servidor não é encontrado. O fetch rejeita a Promise imediatamente.
• Resposta 404: O servidor foi alcançado e respondeu com sucesso (uma resposta HTTP válida), por isso o fetch resolve a Promise normalmente. O desenvolvedor deve verificar a propriedade resposta.ok para validar o status.

// tarefa 10
 O método .map() executa as iterações de forma síncrona e imediata. Ao passar uma função async, o map apenas dispara as requisições e retorna uma lista de Promises pendentes, sem esperar que elas terminem de responder.

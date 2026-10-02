 // tarefa 1 
const resultado1 = nums.map(n => n * 2);

//  tarefa 2
const resultado2 = nums.filter(n => n % 2 === 0);

//  tarefa 3
O map transforma cada elemento de uma lista gerando uma nova lista do mesmo tamanho, enquanto o filter seleciona apenas os elementos que atendem a uma condição, gerando uma lista que pode ser menor

//  tarefa 4
const { titulo, preco } = p;

//  tarefa 5 
const ehCaro = preco => preco > 100;

//  tarefa 6 
const cores2 = [...cores, "vermelho"];

//  tarefa 7
const pEmPromocao = { ...p, preco: 20 };

//  tarefa 8
const emEstoque = produtos.filter(p => p.estoque > 0).map(p => p.nome);

//  tarefa 9
Falta a palavra-chave return dentro das chaves, ou as chaves devem ser removidas para o retorno ser implícito. O correto seria const total = precos.map((p) => p * 2);

//  tarefa 10
O primeiro importa o elemento exportado como padrão (export default), enquanto o segundo, com chaves, importa um elemento específico nomeado (export const Botao)

//  tarefa 11
O método push modifica o array original diretamente (mutação de estado), o que impede o React de detectar a mudança e não dispara a renderização da tela

//  tarefa 12
const maisDeCinco = produtos.filter(p => p.estoque > 5).map(p => p.nome);

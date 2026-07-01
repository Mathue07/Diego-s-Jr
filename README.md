# 🕯️ Lost Memories
### *Memórias Perdidas*

**Horror Psicológico / Exploração Narrativa** — Game Design Document (GDD) resumido para o repositório.

> Versão do GDD: **2.0.1** (2026) · Motor: **Godot 3.6.2** · Plataforma: **PC (Windows)**

---

## 📋 Sumário

- [Visão Geral](#-visão-geral)
- [Sinopse](#-sinopse)
- [História](#-história)
- [Personagens](#-personagens)
- [Core Loop](#-core-loop)
- [Mecânicas](#-mecânicas)
- [Interface (HUD)](#-interface-hud)
- [Ambientes](#-ambientes)
- [Identidade Visual e Sonora](#-identidade-visual-e-sonora)
- [Backend e Sistema Online](#-backend-e-sistema-online)
- [Equipe](#-equipe)
- [Cronograma](#-cronograma)
- [Referências e Inspirações](#-referências-e-inspirações)
- [A Fazer](#-a-fazer)

---

## 🎮 Visão Geral

| Campo | Descrição |
|---|---|
| **Título** | Lost Memories (Memórias Perdidas) |
| **Gênero** | Horror Psicológico / Exploração Narrativa |
| **Motor** | Godot 3.6.2 stable |
| **Plataforma** | PC (Windows) |
| **Perspectiva** | Primeira Pessoa |
| **Estética Visual** | Low-poly estilo PS1 |
| **Duração estimada** | 30 a 60 minutos por partida |
| **Número de endings** | 2 (bom e ruim) |
| **Classificação indicativa** | 16+ (temas de morte, drogas, saúde mental) |

## 📖 Sinopse

*A fazer.*

## 📜 História

### Protagonista

| Atributo | Descrição |
|---|---|
| **Nome** | Laura |
| **Condição** | Morta — presa no limbo na forma de sua casa de infância |
| **Memória** | Completamente apagada no início do jogo |
| **Personalidade** (revelada via coletáveis) | Sensível, culpada, isolada, mas com momentos de leveza na infância |
| **Dublagem** | Mariane |

### Linha do Tempo

1. Infância de Laura na casa — memórias felizes (reveladas via cartas antigas)
2. Pai de Laura adoece gravemente
3. Aniversário de 18 anos de Laura: o pai morre nesse dia
4. A mãe culpa Laura por não ter usado o dinheiro da festa nos medicamentos do pai
5. Laura sai de casa e corta contato com a mãe
6. Laura começa a usar drogas como escapismo
7. Num surto depressivo intenso, Laura induz uma overdose propositalmente
8. Laura morre e acorda no limbo — a casa de infância — sem memória alguma

### Estrutura Narrativa

A história é contada de forma não-linear, reconstruída pelo jogador através dos coletáveis. As fitas cassete revelam momentos emocionais e íntimos (a voz do pai, mensagens deixadas por Laura para si mesma). As cartas revelam os eventos objetivos da história.

O jogador monta o quebra-cabeça da vida de Laura progressivamente, chegando ao final com a imagem completa de quem ela foi.

## 👥 Personagens

| Nome | Papel | Dublagem | Observações |
|---|---|---|---|
| **Laura** | Protagonista | Mariane | Narradora interna; reage aos ambientes |
| **Pai de Laura** | Personagem ausente | Tadeu | Presente apenas nas fitas cassete |
| **A Sombra** | Ameaça / Antagonista | Sem fala | Manifestação da culpa de Laura |
| **Mãe de Laura** | Personagem ausente | Heloísa Harue (participação especial) | Mencionada nas cartas; nunca aparece fisicamente; voz presente nas fitas cassete |
| **Hannah** | Amiga da protagonista | Eduarda Ayumi (participação especial) | Protetora e maternal com Laura; vínculo de irmã; presente nas fitas cassete |
| **Ryan** | Amigo da protagonista | Luiz A | Descontraído e brincalhão, mas com momentos de profundidade inesperada; presente nas fitas cassete |

## 🔄 Core Loop

```
EXPLORAR → ENCONTRAR COLETÁVEL → RECEBER MEMÓRIA → PROCESSAR NARRATIVA → EXPLORAR NOVAMENTE
```

O jogador:

- Explora os cômodos da casa em primeira pessoa
- Encontra fitas cassete escondidas em locais difíceis de achar
- Encontra cartas e bilhetes espalhados
- Ao coletar, recebe um fragmento da memória de Laura (áudio ou texto)
- A sombra aparece ocasionalmente, criando tensão e urgência
- O jogo salva automaticamente a cada 1 minuto; as fitas cassete são apenas narrativas
- Com memórias suficientes, desbloqueia o ending correspondente

## ⚙️ Mecânicas

### Movimentação

| Mecânica | Detalhe |
|---|---|
| Andar | WASD — velocidade padrão de caminhada |
| Correr | Shift — consome stamina; barra de stamina visível no HUD |
| Câmera | Mouse — FPS com head bob, tilt e sway suaves |

### Interação

- Raycast em primeira pessoa detecta objetos no grupo `interagivel`
- Crosshair muda de aparência ao mirar em objeto interagível
- Tecla `E` (ou clique) para interagir
- Objetos coletados desaparecem da cena imediatamente

### Coletáveis

| Tipo | Quantidade prevista | Função |
|---|---|---|
| Fitas Cassete | ~8 a 12 | Checkpoint de save + fragmento de memória em áudio |
| Cartas / Bilhetes | ~10 a 15 | Fragmentos de memória em texto; revelam eventos da história |
| Fotos | ~5 | Memórias visuais; complementam a narrativa sem texto |

### Sistema de Save — Slots e Autosave

Ao clicar em "Novo Jogo" na tela inicial, o jogador é apresentado a uma tela de seleção de slots (ex: Slot 1, Slot 2, Slot 3). Após escolher um slot, o jogo inicia e salva automaticamente naquele slot a cada 1 minuto. Não existe um slot separado de autosave — o progresso é gravado diretamente no slot escolhido pelo jogador. Ao clicar em "Carregar", a mesma tela de slots é exibida, mostrando os slots existentes com informações como tempo de jogo e data do último save. Uma notificação discreta aparece no canto superior direito com a mensagem "salvando automaticamente..." sempre que o autosave ocorre.

As fitas cassete não funcionam mais como pontos de save. Sua função é exclusivamente narrativa: ao coletar uma fita, o jogador ouve um fragmento de memória em áudio com efeito de fita degradada. O progresso é gerenciado inteiramente pelo autosave automático.

### Lanterna

A lanterna é encontrada como item no início do jogo. Sem ela, o jogador não consegue ver nos ambientes mais escuros. Ela é adicionada dinamicamente à câmera do jogador via `SpotLight` ao ser coletada.

### A Sombra

| Situação | Comportamento da Sombra |
|---|---|
| Aparição aleatória | Surge em corredores e cômodos à distância, observando |
| Ao detectar o jogador | Apaga todas as luzes da casa |
| Efeito sonoro | Som de passos e respiração pesada que desorientam |
| Contato direto | Apaga todas as luzes da casa |
| Significado narrativo | Representa a culpa e o peso emocional que Laura carregou |

### Endings

| Ending | Condição | Descrição |
|---|---|---|
| **Bom — Paz** | Coletar todas as fitas e cartas | Laura reconstrói sua memória completa, aceita sua história sem culpa e parte em paz. Cena final: o quarto vazio se preenche com luz e desaparece. |
| **Ruim — Loop Eterno** | Zerar sem coletar todos os coletáveis | Laura não consegue aceitar o que viveu. A casa se reinicia do zero — ela está presa repetindo o mesmo ciclo para sempre, sem paz e sem saída. |

## 🖥️ Interface (HUD)

- Barra de stamina: aparece ao correr, some após alguns segundos parada
- Crosshair central: muda de aparência próximo a objetos interagíveis
- Sem minimapa — o jogador deve explorar organicamente
- **Inventário (Tab):** ao pressionar Tab, um painel desliza da direita para o centro da tela, listando os itens coletados pelo jogador (ex: Lanterna, Fita Cassete). Cada item aparece com nome e ícone. Ao manter Shift com o inventário aberto, uma breve descrição aparece abaixo dos itens mais importantes. O inventário é apenas visual — não é possível gerenciar ou combinar itens.

### Gravador (Item Fixo)

O gravador é um objeto fixo posicionado em um local central e narrativamente justificado da casa. Ele não é carregado no inventário — o jogador precisa se deslocar até ele para usar as fitas cassete encontradas durante a exploração. Ao interagir com o gravador carregando uma fita, uma animação de inserção é exibida e o áudio da memória é reproduzido com efeito de fita degradada. Essa mecânica cria um "ritual" intencional: o jogador encontra a fita, precisa voltar ao gravador, gerando tensão e movimento proposital pelo cenário.

## 🏠 Ambientes

| Cômodo | Descrição | Coletáveis esperados |
|---|---|---|
| Quarto da Laura | Primeiro ambiente; escuro, porta fechada, completamente vazio | 1 carta |
| Sala de estar | Sala grande, estática | 1 fita, 1 carta |
| Cozinha | Cozinha muito mal iluminada | 1 carta, 1 foto |
| Quarto do pai | Um quarto médio, com uma cama, mesinha com um computador, violão e outras coisas. Remédios jogados em cima da mesa | 2 fitas, 3 cartas |
| Lavanderia | Uma lavanderia pequena, mal iluminada | 1 carta |
| Banheiro | Banheiro pequeno, apertado, mal iluminado | 1 fita, 1 carta |

## 🎨 Identidade Visual e Sonora

**Visual**
- Estética low-poly com paleta de cores dessaturada (cinzas, verdes escuros, marrons)
- Texturas com filtro Nearest e Mipmaps desativados — efeito PS1
- Shaders pós-processamento: filtro VHS + câmera anos 90/2000 ativo
- Iluminação ambiente levemente fraca

**Sonoro**
- As fitas cassete reproduzem áudio com efeito de fita degradada
- A sombra tem tema sonoro próprio: frequências graves e respiração
- Dublagem de Laura: reações ao ambiente, leitura de cartas em voz alta (Mariane)
- Voz do pai nas fitas cassete (Tadeu — a confirmar)

## 🌐 Backend e Sistema Online

### Arquitetura

O jogo utiliza um backend em Node.js com banco de dados para armazenar dados de conta do jogador e ranking global. O Godot se comunica com o backend via `HTTPRequest` ao final da partida ou em pontos-chave do jogo.

| Componente | Tecnologia | Responsável |
|---|---|---|
| Game Client | Godot 3.6.2 | Tadeu |
| Backend / API | Node.js + Express | Tadeu |
| Banco de Dados | A definir (ex: PostgreSQL ou MongoDB) | Tadeu |
| Hospedagem | A definir | Tadeu |

### Funcionalidades Online

| Funcionalidade | Descrição |
|---|---|
| Login / Cadastro | O jogador cria uma conta com nome de usuário e senha |
| Perfil do jogador | Armazena dados da partida mais recente e do melhor resultado |
| Ranking Global | Lista os jogadores com melhor desempenho |
| Dados enviados ao servidor | Nome do jogador, tempo total de jogo, coletáveis encontrados, ending obtido |

### Fluxo de Dados

- O save local (fitas cassete) funciona independentemente do backend
- Ao zerar o jogo, o Godot envia os dados via `HTTPRequest POST` para a API
- A API valida e salva no banco de dados
- O ranking pode ser consultado no menu principal do jogo (tela separada)

## 🧑‍💻 Equipe

| Membro | Função Principal | Tarefas |
|---|---|---|
| **Tadeu** | Programação + Direção | Todo o código em Godot (movimentação, interação, shaders, saves, HTTPRequest); dublagem do pai |
| **Tadeu** | Modelagem 3D | Todos os modelos dos ambientes, props, coletáveis e a sombra |
| **Mariane** | Dublagem, Game Design / ideias | Voz da protagonista Laura. Contribuição com ideias de design, puzzles e narrativa |
| **Pedro C** | Documentação | Responsável por manter o GDD atualizado e redigir a documentação técnica do TCC |
| **Pedro G** | Game Design / Ideias | Contribuição com ideias de design, puzzles e narrativa |
| **Luiz A** | Game Design / Ideias | Contribuição com ideias de design, puzzles e narrativa; dublagem do Ryan |

## 🗓️ Cronograma

| Fase | Atividades | Status |
|---|---|---|
| **1 — Pré-produção** | GDD finalizado, divisão de tarefas, definição do backend | ✅ Pronto |
| **2 — Prototipagem** | Level layout da casa, mecânicas básicas funcionando, primeiro coletável | ✅ Pronto |
| **3 — Produção** | Todos os ambientes, coletáveis, sombra, dublagem, backend integrado | 🔄 Em andamento |
| **4 — Polimento** | Shaders, sons, ajuste de dificuldade dos esconderijos das fitas | 🔄 Em andamento |
| **5 — Entrega** | Build final, documentação TCC, apresentação | ⏳ A iniciar |

## 📚 Referências e Inspirações

| Referência | O que inspira no projeto |
|---|---|
| **Grim Fandango** (LucasArts) | Estrutura de GDD fornecida pelo professor como modelo |
| **Silent Hill 2** | Horror psicológico com antagonista como manifestação de culpa/trauma |
| **What Remains of Edith Finch** | Narrativa fragmentada contada por objetos e ambientes |
| **Amnesia: The Dark Descent** | Mecânica de sanidade e sombra como ameaça sem combate |
| **Hellblade: Senua's Sacrifice** | Representação respeitosa de saúde mental como tema central |
| **A Arte de Game Design** (Jesse Schell) | Referência bibliográfica fornecida pelo professor |
| **Blasfêmia** | Jogo brasileiro, o inventário não pode ser manipulado, somente visto |

## ✅ A Fazer

Lista de pendências identificadas durante o desenvolvimento. Atualizar conforme o progresso.

<details>
<summary><strong>Programação</strong></summary>

- [ ] Corrigir sistema de carregamento: restaurar posição, escala e estado completo do jogador
- [ ] Corrigir carregamento: itens coletados não devem reaparecer no mundo após carregar
- [ ] Melhorar sistema de IA da Sombra: patrulha, detecção do jogador e persistência
- [ ] Ajustar iluminação dos ambientes: migrar de SpotLight para OmniLight e configurar cull mask por cômodo
- [ ] Integrar sistema de backend (ranking global, login, envio de dados após zerar)
- [ ] Implementar sistema de coletáveis completo (fitas, cartas, fotos) com estado persistente
- [ ] Implementar lógica dos dois endings (bom e ruim) com verificação de coletáveis

</details>

<details>
<summary><strong>Dublagem e Áudio</strong></summary>

- [ ] Gravar roteiro completo de Laura (Mariane) — sessão anterior foi parcial
- [ ] Concluir gravações de Hannah (Eduarda Ayumi) — participação especial, gravação iniciada
- [ ] Gravar linhas de Ryan (Luiz A)
- [ ] Gravar linhas da mãe Karen (Heloísa Harue)
- [ ] Gravar voz do pai (Tadeu) e integrar nas fitas cassete
- [ ] Aplicar efeito de fita degradada em todos os áudios das fitas cassete

</details>

<details>
<summary><strong>Modelagem e Visual</strong></summary>

- [ ] Modelar props dos cômodos restantes (móveis, objetos interagíveis, coletáveis)
- [ ] Modelar e animar A Sombra
- [ ] Aplicar shader VHS e filtro PS1 em todos os ambientes finalizados
- [ ] Adicionar cômodos faltantes na tabela de ambientes (seção "Ambientes") conforme a casa for detalhada

</details>

<details>
<summary><strong>Narrativa e Conteúdo</strong></summary>

- [ ] Escrever roteiro completo de todas as fitas cassete e cartas
- [ ] Definir conteúdo do conselho inesperado dado pelo Ryan a Laura
- [ ] Definir posicionamento de todos os coletáveis nos ambientes da casa
- [ ] Completar tabela de ambientes com todos os cômodos da casa

</details>

<details>
<summary><strong>Infraestrutura e Entrega</strong></summary>

- [ ] Contratar hospedagem VPS para o backend Node.js (Hostinger VPS KVM 1 identificado como opção adequada)
- [ ] Definir banco de dados (PostgreSQL ou MongoDB) e configurar ambiente de produção
- [ ] Publicar jogo na Steam (cadastrar no Steamworks, pagar taxa de U$ 100, aguardar aprovação)
- [ ] Gerar build final para PC (Windows) e realizar testes completos antes da entrega do TCC

</details>

---

*Lost Memories — GDD v2.0.1*
*Documento sujeito a alterações conforme o desenvolvimento do projeto.*

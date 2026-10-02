# 🎮 Lost Memories — *Memórias Perdidas*

> **Game Design Document (GDD) — Versão 1.0 — 2026**

Motor: **Godot 3.6.2** | Plataforma: **PC (Windows)**

**Equipe:** Tadeu • Matheus • Mariane • Pedro C • Pedro G • Luiz A

---

## 📋 Visão Geral do Projeto

| Campo | Descrição |
|---|---|
| Título | Lost Memories *(Memórias Perdidas)* |
| Gênero | Horror Psicológico / Exploração Narrativa |
| Motor | Godot 3.6.2 stable |
| Plataforma | PC (Windows) |
| Perspectiva | Primeira Pessoa (FPS) |
| Estética Visual | Low-poly estilo PS1 |
| Duração estimada | 30 a 60 minutos por partida |
| Número de endings | 2 (bom e ruim) |
| Classificação indicativa | 16+ *(temas de morte, drogas, saúde mental)* |

---

## 📖 Sinopse

Laura está morta.

Ela acorda na casa de sua infância sem nenhuma memória de quem foi ou como chegou ali — apenas se lembrando da casa em que está. O quarto que deveria ser o dela está completamente vazio; ela saiu de casa anos atrás e nunca mais voltou.

Espalhadas pela casa há fitas cassete e cartas que contam, aos poucos, a história de sua vida: a morte do pai no seu aniversário de 18 anos, a culpa imposta pela mãe, a fuga, as drogas e, por fim, a overdose que induziu conscientemente num surto depressivo.

Enquanto coleta essas memórias, uma sombra a persegue pelos cômodos — uma manifestação da culpa e do peso que carregou em vida. O destino de Laura depende de como ela enfrenta — ou foge de — sua própria história.

---

## 📚 Sumário

- [História Detalhada](#-história-detalhada)
- [Personagens](#-personagens)
- [Core Loop](#-core-loop)
- [Mecânicas de Jogo](#️-mecânicas-de-jogo)
- [Interface (HUD)](#️-interface-hud)
- [Ambientes](#-ambientes)
- [Identidade Visual e Sonora](#-identidade-visual-e-sonora)
- [Backend e Sistema Online](#-backend-e-sistema-online)
- [Divisão de Tarefas](#-divisão-de-tarefas)
- [Cronograma](#-cronograma)
- [Referências e Inspirações](#-referências-e-inspirações)
---

## 🕯️ História Detalhada

### Protagonista

| Atributo | Descrição |
|---|---|
| Nome | Laura |
| Condição | Morta — presa no limbo na forma de sua casa de infância |
| Memória | Completamente apagada no início do jogo |
| Personalidade | Sensível, culpada, isolada, mas com momentos de leveza na infância *(revelada via coletáveis)* |
| Dublagem | Mariane |

### Linha do Tempo da História

1. Infância de Laura na casa — memórias felizes *(reveladas via cartas antigas)*
2. Pai de Laura adoece gravemente
3. Aniversário de 18 anos de Laura: o pai morre nesse dia
4. A mãe culpa Laura por não ter usado o dinheiro da festa nos medicamentos do pai
5. Laura sai de casa e corta contato com a mãe
6. Laura começa a usar drogas como escapismo
7. Num surto depressivo intenso, Laura induz uma overdose propositalmente
8. Laura morre e acorda no limbo — a casa de infância — sem memória alguma

### Estrutura Narrativa

A história é contada de forma **não-linear**, reconstruída pelo jogador através dos coletáveis. As fitas cassete revelam momentos emocionais e íntimos (a voz do pai, mensagens deixadas por Laura para si mesma). As cartas revelam os eventos objetivos da história.

O jogador monta o quebra-cabeça da vida de Laura progressivamente, chegando ao final com a imagem completa de quem ela foi.

---

## 👥 Personagens

| Nome | Papel | Dublagem | Observações |
|---|---|---|---|
| Laura | Protagonista | Mariane | Narradora interna; reage aos ambientes |
| Pai de Laura | Personagem ausente | Tadeu *(a confirmar)* | Presente apenas nas fitas cassete |
| A Sombra | Ameaça / Antagonista | Sem fala | Manifestação da culpa de Laura |
| Mãe de Laura | Personagem ausente | Sem dublagem | Mencionada nas cartas; nunca aparece fisicamente |

---

## 🔄 Core Loop

```
EXPLORAR → ENCONTRAR COLETÁVEL → RECEBER MEMÓRIA → EXPLORAR NOVAMENTE
```

O jogador:
- Explora os cômodos da casa em primeira pessoa
- Encontra fitas cassete escondidas em locais difíceis de achar
- Encontra cartas e bilhetes espalhados
- Ao coletar, recebe um fragmento da memória de Laura (áudio ou texto)
- A sombra aparece ocasionalmente, criando tensão e urgência
- Ao encontrar a fita cassete, pode salvar o progresso
- Com memórias suficientes, desbloqueia o ending correspondente

---

## 🎮 Mecânicas de Jogo

### 6.1 Movimentação

| Mecânica | Detalhe |
|---|---|
| Andar | WASD — velocidade padrão de caminhada |
| Correr | Shift — consome stamina; barra de stamina visível no HUD |
| Câmera | Mouse — FPS com head bob, tilt e sway suaves |

### 6.2 Interação

- Raycast em primeira pessoa detecta objetos no grupo `interagivel`
- Crosshair muda de aparência ao mirar em objeto interagível
- Tecla `E` (ou clique) para interagir
- Objetos coletados desaparecem da cena imediatamente

### 6.3 Coletáveis

| Tipo | Quantidade prevista | Função |
|---|---|---|
| Fitas Cassete | ~8 a 12 | Checkpoint de save + fragmento de memória em áudio |
| Cartas / Bilhetes | ~10 a 15 | Fragmentos de memória em texto; revelam eventos da história |
| Fotos | ~5 | Memórias visuais; complementam a narrativa sem texto |

### 6.4 Sistema de Save — Fitas Cassete

O jogo é salvo automaticamente quando o jogador coleta uma fita cassete. Uma notificação na tela exibe *"Nova fita encontrada"* com fade in/out. As fitas são intencionalmente difíceis de localizar para estender o tempo de exploração e aumentar a tensão.

O jogo também é salvo automaticamente a cada 5 minutos, exibindo no canto superior direito a mensagem *"salvando automaticamente…"*. O intervalo de autosave ainda pode ser ajustado futuramente.

### 6.5 Lanterna

A lanterna é encontrada como item no início do jogo. Sem ela, o jogador não consegue ver nos ambientes mais escuros. Ela é adicionada dinamicamente à câmera do jogador via `SpotLight` ao ser coletada.

### 6.6 A Sombra

| Situação | Comportamento |
|---|---|
| Aparição aleatória | Surge em corredores e cômodos à distância, observando |
| Ao detectar o jogador | Apaga a lanterna temporariamente |
| Efeito sonoro | Som de passos e respiração pesada que desorientam |
| Contato direto | Teleporta o jogador para o último ponto de save (fita cassete) |
| Significado narrativo | Representa a culpa e o peso emocional que Laura carregou |

### 6.7 Endings

| Ending | Condição | Descrição |
|---|---|---|
| ✅ **Paz** *(Ending Bom)* | Coletar todas as fitas e cartas | Laura reconstrói sua memória completa, aceita sua história sem culpa e parte em paz. Cena final: o quarto vazio se preenche com luz e desaparece. |
| 🔁 **Loop Eterno** *(Ending Ruim)* | Zerar sem coletar todos os coletáveis | Laura não consegue aceitar o que viveu. A casa se reinicia do zero — ela está presa repetindo o mesmo ciclo para sempre, sem paz e sem saída. |

---

## 🖥️ Interface (HUD)

- **Barra de stamina:** aparece ao correr, some após alguns segundos parada
- **Crosshair central:** muda de aparência próximo a objetos interagíveis
- **Sem minimapa** — o jogador deve explorar organicamente
- **Sem inventário manipulável** — os coletáveis são experienciados, não gerenciados *(inventário visível apenas para consulta)*

---

## 🏠 Ambientes

| Cômodo | Descrição | Coletáveis esperados |
|---|---|---|
| Hall de entrada | Primeiro ambiente; escuro, porta trancada | 1 carta |
| Sala de estar | Móveis velhos cobertos de pó; TV estática | 1 fita, 1 carta |
| Cozinha | Louça suja, calendário parado numa data | 1 carta, 1 foto |
| Quarto do pai | Cama desfeita, remédios na mesa de cabeceira | 2 fitas, 2 cartas |
| Quarto de Laura (vazio) | Completamente vazio; piso marcado onde havia móveis | 1 carta *(escondida no assoalho)* |

---

## 🎨 Identidade Visual e Sonora

### Visual

- Estética **low-poly** com paleta de cores dessaturada *(cinzas, verdes escuros, marrons)*
- Texturas com filtro **Nearest** e Mipmaps desativados — efeito PS1
- Shaders pós-processamento: **filtro VHS** + câmera anos 90/2000 ativo
- Iluminação ambiente levemente fraca

### Sonoro

- Fitas cassete reproduzem áudio com **efeito de fita degradada**
- A Sombra tem tema sonoro próprio: frequências graves e respiração
- **Dublagem de Laura** (Mariane): reações ao ambiente, leitura de cartas em voz alta
- **Voz do pai** nas fitas cassete (Tadeu — a confirmar)

---

## 🌐 Backend e Sistema Online

### Arquitetura

| Componente | Tecnologia | Responsável |
|---|---|---|
| Game Client | Godot 3.6.2 | Tadeu |
| Backend / API | Node.js + Express | Tadeu |
| Banco de Dados | A definir *(PostgreSQL ou MongoDB)* | Tadeu |
| Hospedagem | A definir | Tadeu |

### Funcionalidades Online

| Funcionalidade | Descrição |
|---|---|
| Login / Cadastro | O jogador cria uma conta com nome de usuário e senha |
| Perfil do jogador | Armazena dados da partida mais recente e do melhor resultado |
| Ranking Global | Lista os jogadores com melhor desempenho |
| Dados enviados | Nome, tempo total de jogo, coletáveis encontrados, ending obtido |

### Fluxo de Dados

- O save local (fitas cassete) funciona **independentemente** do backend
- Ao zerar o jogo, o Godot envia os dados via `HTTPRequest POST` para a API
- A API valida e salva no banco de dados
- O ranking pode ser consultado no menu principal do jogo

---

## 🧑‍💻 Divisão de Tarefas

| Membro | Função Principal | Tarefas |
|---|---|---|
| Tadeu | Programação + Direção | Todo o código em Godot (movimentação, interação, shaders, saves, HTTPRequest); possível dublagem do pai |
| Matheus | Modelagem 3D | Todos os modelos dos ambientes, props, coletáveis e a sombra |
| Mariane | Dublagem | Voz da protagonista Laura — reações e leitura de cartas |
| Pedro C | Documentação | GDD atualizado e documentação técnica do TCC |
| Pedro G | Game Design / Ideias | Contribuição com ideias de design, puzzles e narrativa |
| Luiz A | Game Design / Ideias | Contribuição com ideias de design, puzzles e narrativa |

---

## 📅 Cronograma

| Fase | Atividades | Status |
|---|---|---|
| Fase 1 — Pré-produção | GDD finalizado, divisão de tarefas, definição do backend | 🟡 Em andamento |
| Fase 2 — Prototipagem | Level layout da casa, mecânicas básicas, primeiro coletável | 🟡 Parcialmente pronto |
| Fase 3 — Produção | Todos os ambientes, coletáveis, sombra, dublagem, backend integrado | ⚪ A iniciar |
| Fase 4 — Polimento | Shaders, sons, ajuste de dificuldade dos esconderijos das fitas | ⚪ A iniciar |
| Fase 5 — Entrega | Build final, documentação TCC, apresentação | ⚪ A iniciar |

---

## 🎯 Referências e Inspirações

| Referência | O que inspira no projeto |
|---|---|
| Grim Fandango *(LucasArts)* | Estrutura de GDD fornecida pelo professor como modelo |
| Silent Hill 2 | Horror psicológico com antagonista como manifestação de culpa/trauma |
| What Remains of Edith Finch | Narrativa fragmentada contada por objetos e ambientes |
| Amnesia: The Dark Descent | Mecânica de sombra como ameaça sem combate |
| Hellblade: Senua's Sacrifice | Representação respeitosa de saúde mental como tema central |
| A Arte de Game Design — Jesse Schell | Referência bibliográfica fornecida pelo professor |
| Blasfêmia | Jogo brasileiro; inventário não manipulável, somente visível |
# Limbo of Memories

Jogo de terror psicológico em primeira pessoa, com estética PS1/low-poly, desenvolvido em **Godot Engine 3.6** como Trabalho de Conclusão de Curso.

> Anteriormente *Lost Memories* / *Lost Memories: Laura*.

**Estúdio:** Lunar Black Cat Studios
**Equipe de desenvolvimento:** Team Static Noise

A casa da protagonista representa suas memórias de infância. O foco temático do jogo está em culpa, luto, aceitação e traumas.

- **Gênero:** terror psicológico, exploração em primeira pessoa
- **Motor:** Godot Engine 3.6 (scripts em português)
- **Restrição de escopo:** não haverá modelos de personagens complexos, por questão de orçamento

---

## Índice

1. [Enredo e Narrativa](#enredo-e-narrativa)
2. [Gameplay](#gameplay)
3. [Sistema da Sombra](#sistema-da-sombra-a-sombra)
4. [Estados Emocionais da Laura](#estados-emocionais-da-laura)
5. [Fitas Cassete e Sr. Gravatinha](#fitas-cassete-e-sr-gravatinha)
6. [Sistema de Memórias](#sistema-de-memórias)
7. [Puzzles](#puzzles)
8. [Interface](#interface)
9. [Áudio](#áudio)
10. [Arte e Estética](#arte-e-estética)
11. [Tecnologia (Godot)](#tecnologia-godot)
12. [Estúdio e Equipe](#estúdio-e-equipe)
13. [Histórico de Versões](#histórico-de-versões)

---

## Enredo e Narrativa

### Premissa

Laura revive, em uma versão em limbo de sua casa de infância, memórias marcantes de sua vida — acessadas através de fitas cassete espalhadas pela casa.

### Espinha dorsal da história

- A doença terminal do pai, Jeff, é descoberta quando Laura tem entre 15 e 16 anos.
- O luto da mãe, Karen, se transforma em abuso psicológico após a morte de Jeff, ocorrida no aniversário de 18 anos de Laura.
- Karen culpa Laura pelas economias de aniversário não usadas no tratamento médico do pai.
- Laura sai de casa; há um episódio de overdose em um motel, com mensagens de despedida às amigas.
- **Final:** Laura sobrevive e acorda no hospital após enfrentar suas memórias (final único, sem final ruim).

### Personagens de apoio

| Personagem | Papel |
|---|---|
| Hannah | Vínculo protetor, quase de irmã mais velha |
| Ethan | Alívio cômico, personalidade caótica |
| Ryan | Descontraído, com momentos de profundidade |

> **Camada narrativa em avaliação** (ainda não confirmada): gravações de Jeff falando sobre o próprio pai, explorando ciclos geracionais e linguagens do amor.

---

## Gameplay

- Exploração em primeira pessoa
- Resolução de puzzles para avançar
- Coleta de fitas cassete que contam a história
- Leitura de cartas e bilhetes espalhados pela casa
- A casa muda conforme o jogador progride
- Inventário desliza pela direita (`Tab`); `Shift+Tab` mostra descrições dos itens

---

## Sistema da Sombra (A Sombra)

A Sombra representa a culpa de Laura. É praticamente estática, sem animações, e sua agressividade aumenta quanto menos fitas o jogador encontrou.

- Aparece perto do jogador, olhando para ele
- Se observada por cerca de 2 segundos, desaparece
- Se não observada, anda lentamente em direção ao jogador
- Pode aparecer muito rapidamente (cerca de 1,8 segundo)
- Nunca repete a mesma ação várias vezes seguidas

### Ações da Sombra

- Bater nas portas
- Apagar luzes
- Fazer a lanterna piscar
- Prender portas por cerca de 60 segundos
- Sussurrar
- Aumentar a tensão do jogador

---

## Estados Emocionais da Laura

Substituem a tradicional barra de vida.

| Estado | Emoji |
|---|---|
| Calma | 😐 |
| Insegura | 😟 |
| Assustada | 😨 |
| Em crise | 😭 |

Quando a tensão aumenta: mais estática na câmera, imagem mais escura e Sombra mais agressiva. Permanecer tempo demais em **"Em crise"** resulta em game over.

---

## Fitas Cassete e Sr. Gravatinha

### Fitas cassete

Principal forma de contar a história. O jogador usa um reprodutor de fita cassete. Está planejado um efeito de fita antiga sobre a voz das gravações. O pai de Laura (Jeff) tem várias falas gravadas.

### Sr. Gravatinha

Ursinho de pelúcia de Laura. Se teletransporta pela casa, conversa com ela e traz lembranças da infância. Vários diálogos dele já foram escritos. Funciona como contraponto temático à Sombra.

---

## Sistema de Memórias

O quarto de Laura começa praticamente vazio. Conforme itens importantes são encontrados, ele vai sendo preenchido, transmitindo a sensação de recuperação das lembranças.

---

## Puzzles

- Cartas
- Documentos
- Objetos escondidos
- Cifra de César, cadeados numéricos, desenhos de infância como chave de cifra

Puzzles simples, para não quebrar o ritmo da história.

---

## Interface

- Crosshair dinâmica
- Estados emocionais substituindo a barra de vida
- Menu em português
- Tela de loading com um ursinho

---

## Áudio

- Violão representando o pai
- Piano lento para momentos emocionais
- Respiração aumentando conforme a tensão
- Sons de estática quando Laura está assustada

Boa parte dos efeitos sonoros é controlada pela Godot.

---

## Arte e Estética

- Estética PS1/low-poly, com shader de pós-processamento (`overlay_ps1.shader`)
- Ícone do jogo: fita cassete, estética de quadrinho estilo Scott Pilgrim, contornos fortes, flat shading; logo monograma (LM)
- Menu principal com cenário de um cômodo da casa e animações de hover
- Tela de pickup de itens em 3D, estilo Resident Evil

---

## Tecnologia (Godot)

- Godot Engine 3.6; scripts em português
- Save automático só é ativado ao entrar em `casa_ofc.tscn`; autosave a cada minuto no slot escolhido pelo jogador
- Barra de loading tenta acompanhar o carregamento da cena
- Sistema de inspeção de objetos com pivot/rotação (`Camera.gd`)
- Migração para Godot 4 adiada, por conta do prazo do TCC

---

## Equipe

### Elenco de vozes

| Personagem | Dublador(a) |
|---|---|
| Jeff | Tadeu |
| Karen | Bruna |
| Laura criança | Emilly |
| Laura (depois dos 13 anos) | Mariane |
| Ethan | Matheus |
| Ryan | Luiz |
| Hannah | Eduarda |
| Sr. Gravatinha (ursinho) | Gabriel |

### Demais funções

| Nome | Função |
|---|---|
| Matheus | Game design, Trilha sonora e voz de Ethan |
| Luiz | Game design, API e voz de Ryan |
| Pedro G. | Game design e tarefas diego (kanban, trello...) |
| Pedro C. | Documentação e Atualização de telas (Figma) |
| Tadeu | Programação, direção, roteiro, API, modelagem 3D... |

---

## Histórico de Versões

- **v2.0** — versão anterior do documento
- **v3.0 (atual)** — inclusão do sistema da Sombra detalhado, estados emocionais, Sr. Gravatinha (nome e diálogos), sistema de memórias do quarto, puzzles, interface, áudio, detalhes técnicos da Godot, ajuste do desfecho da narrativa (Laura sobrevive) e elenco de vozes completo

---

## Kanban e indicadores
![ Print do Trello ]( img/kanban.png )

| Indicador | Valor |

| - - - - - - - - - - -| - - - - - - -|

| WIP ( limite ) | 5 cartões |

| Lead Time médio | 5,2 dias |

| Cycle Time médio | 3,4 dias |

## Metricas de validaçao
- **  Formuylario:** [ https://docs.google.com/forms/d/e/1FAIpQLSc2rx4NmC-VJyu3bjFEimku545Zvks5ccH1jGs1xIrx_KxeXA/viewform?usp=dialog ]
- ** Total de respostas : 6 
- ** Taxa de interesse : 100% disseram que usariam
- ** NPS Médio : 9,5
- ** Principais feedbacks : 
- Adicionaria mais história, mais itens, cartas, deixaria o game design melhor, colocaria mais tutoriais pro jogador saber o que precisa ser feito, adicionaria algo que desse vontade de jogar
- As IAs, tem muitos bugs, porta não abre depois de fechada, ursinho não aparece quando deve, a sombra fica te encarando e não some

## Roteiro do pitch
### Contexto
" Somos alunos do curso de Desenvolvimento de Sistemas e percebemos que neste cenário somos Laura, uma mulher que acorda perdida uma casa que parece familiar como se tivesse passado sua infância ali"
### Conflito
" O principal problema que queremos resolver ou tentar ajudar a lidar com isso é a ansiedade e depressão de pessoas que se encontram na situação da protagonista, tendo uma experiência onde ele descobre a história junto da protagonista e lida com suas emoções"
### Solução
" Para isso , criamos o jogo Lost Memories, que funciona da seguinte forma: uma mulher que descobre ao decorrer do jogo que teve muitos problemas com sua família, a enfermidade de seu pai e sua relação conturbada com sua mãe. E com isso lida de diferentes formas, tendo um final bom para esta situação"
### Prova
" Testamos com 6 jogadores e obtivemos uma média de nota de 9,5 e uma taxa de interesse de 100% entre os jogadores "
### Chamada para a ação 
Queremos que os jogadores sintam a história e entendam como Laura lidou com a situação

## Screenshots da aplicação
* Tela inicial do MVP *

![ Tela inicial ]( img/tela1.jpeg )

* Tela de confirmaçãodo pedido *

![ Confirmação1 ]( img/sala.jpeg )

![ Confirmação2 ]( img/sala2.jpeg )

![ Confirmação3 ]( img/pato.jpeg )

https://github.com/user-attachments/assets/333666da-f511-48ba-9b61-aa1af3ba92c4



*Lost Memories — GDD v1.0 | Documento sujeito a alterações conforme o desenvolvimento do projeto.*

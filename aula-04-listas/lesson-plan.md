# Plano de Aula 4 — `Pressable` e renderização de listas (`FlatList` e `SectionList`)

- **Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School
- **Público-alvo:** Graduação. Alunos que já montam e estilizam uma tela com Core Components, `StyleSheet` e Flexbox (Aula 3). Confortáveis com TypeScript e `useState`.
- **Duração:** 3h (180 min), presencial
- **Formato:** Expositivo + verificação conceitual + hands-on guiado
- **Data prevista:** 28 de agosto de 2026
- **Dados de versões e ferramentas:** conferidos em **1º de setembro de 2026** (fontes no final deste arquivo e em `student-notes.md`)

---

## Objetivos de aprendizagem

Ao final da aula, o aluno deve ser capaz de:

1. **Construir** um controle tocável com aparência própria usando `Pressable`, dando feedback visual pela forma funcional de `style` (`({ pressed }) => ...`).
2. **Descrever** o ciclo de vida de um toque — `onPressIn` → `onPressOut` → `onPress`, com `onLongPress` no caminho alternativo — e dizer qual callback usar em cada situação.
3. **Ajustar** a área e o tempo de resposta do toque com `hitSlop`, `pressRetentionOffset`, `unstable_pressDelay` e `delayLongPress`, sabendo o que cada default já faz.
4. **Explicar** por que uma lista longa não pode ser montada com `.map()` dentro de `ScrollView`, usando o vocabulário de virtualização (viewport, janela, áreas em branco).
5. **Renderizar** uma lista com `FlatList`, escolhendo corretamente `data`, `renderItem`, `keyExtractor` e os componentes de moldura (`ListHeaderComponent`, `ListFooterComponent`, `ListEmptyComponent`, `ItemSeparatorComponent`).
6. **Diagnosticar** os três defeitos clássicos de lista: a lista que não atualiza (`extraData` / `PureComponent`), a lista aninhada em `ScrollView`, e o `renderItem` recriado a cada render.
7. **Escolher** entre `FlatList` e `SectionList` a partir do formato do dado, e montar o array `sections` a partir de dados planos.
8. **Prever** a diferença de comportamento do cabeçalho fixo entre iOS e Android (`stickySectionHeadersEnabled`) e corrigi-la explicitamente.

> ⚠️ **Escopo desta aula — ler antes de preparar:** os assuntos desta aula são exatamente
> **`Pressable`**, **`FlatList`** e **`SectionList`**, com as props documentadas de cada um.
>
> São **pré-requisito** (podem e devem ser usados, mas **não** são reensinados): `View`, `Text`,
> `Image`, `TextInput`, `ScrollView`, `Button`, `Switch`, `StyleSheet`, Flexbox e `useState` —
> tudo isso veio das Aulas 1 a 3.
>
> **Ficam de fora, e não devem ser introduzidos:**
> - **`TouchableOpacity`, `TouchableHighlight`, `TouchableWithoutFeedback`, `TouchableNativeFeedback`**
>   — aparecem **uma vez**, por nome, como "o que você vai encontrar nos tutoriais", porque a própria
>   documentação do React Native aponta o `Pressable` como o caminho. **Sem código, sem slide próprio,
>   sem exercício.** Ensinar a API deles seria trocar o tópico do escopo por outro.
> - **Bibliotecas de lista de terceiros** (`@shopify/flash-list` e afins) — uma frase de contexto no
>   Passo 4.6, nada além disso. A disciplina ensina o que vem no framework.
> - **`useCallback`, `useMemo`, `React.memo`** — memoização é a resposta "de manual" para estabilizar
>   `renderItem`, mas são **nomes novos** que pertencem à Aula 6 (Hooks). Hoje o problema é resolvido
>   **movendo a função para fora do componente**, que é JavaScript comum. Ver a nota "Limitação
>   assumida" logo abaixo.
> - **`useEffect` e busca de dados em rede** — `onEndReached` é ensinado com um array local. Rede é
>   assunto das Aulas 10 a 12.
> - **Navegação / `expo-router`** — o `onPress` do item de lista chama uma função local, não navega.
>   Rotas são a Aula 7.
> - **Animação** (`Animated`, Reanimated, `LayoutAnimation`) e **gestos** além do toque
>   (`react-native-gesture-handler`, swipe-to-delete).
> - **`VirtualizedList` cru** — citado uma vez como "o que está por baixo", sem API.
>
> Se a turma puxar para qualquer um desses assuntos, estacionar com *"ótima pergunta — não é o
> assunto de hoje"* e voltar ao roteiro. Vale especialmente no Passo 3.7 (alguém vai perguntar por
> animação de toque) e no Passo 4.9 (alguém vai perguntar por FlashList).

> 🧩 **Limitação assumida, e comunicada de propósito:** a orientação oficial para não recriar o
> `renderItem` a cada render é envolvê-lo em `useCallback`, e a de não re-renderizar item à toa é
> `React.memo`. **Nenhum dos dois está no programa até a Aula 6.** A aula resolve o mesmo problema
> com a ferramenta que já temos — declarar a função **fora** do componente, no escopo do módulo, onde
> ela é criada uma única vez — e **diz isso ao aluno com todas as letras**, em vez de fingir que a
> questão não existe. Quando a Aula 6 chegar, este é um gancho pronto: *"lembram do `renderItem` que
> a gente teve que empurrar para fora do componente? Hoje eu mostro a ferramenta que deixa ele ficar
> dentro."*

---

## Agenda

| # | Bloco | Tempo | Acumulado |
|---|---|---|---|
| 0 | Abertura: o remendo da Aula 3 e o problema do dia | 10 min | 0:10 |
| 1 | `Pressable`: o toque que você desenha | 35 min | 0:45 |
| — | **Intervalo** | 10 min | 0:55 |
| 2 | Checkpoint 1 — toque | 8 min | 1:03 |
| 3 | `FlatList`: a lista que só renderiza o que se vê | 42 min | 1:45 |
| 4 | `SectionList`: quando o dado já vem agrupado | 20 min | 2:05 |
| 5 | Checkpoint 2 — listas | 7 min | 2:12 |
| 6 | Hands-on guiado | 38 min | 2:50 |
| 7 | Atividade aplicada + fechamento | 10 min | 3:00 |

---

## Passo 0 — Abertura e contexto (10 min)

- **Gancho de abertura (1 frase):** "Na Aula 3 vocês descobriram que o `Button` não aceita `style`, e eu mandei vocês usarem `<Text onPress>` como remendo. Hoje eu devolvo o componente de verdade. E, de quebra, resolvo o outro problema que ficou aberto: a tela que mostra **três** hábitos funciona; a que mostra **três mil** trava o telefone."
- Retomar em 2 minutos, sem reensinar: `Button` é o botão do sistema; `<Text onPress>` funciona mas não é um alvo de toque de verdade; `ScrollView` monta **todos** os filhos de uma vez (Aula 3, §2.6).
- **Enunciar o problema do dia, em duas partes:**
  1. **Toque:** como fazer *qualquer* coisa reagir ao dedo, com aparência própria e feedback visual.
  2. **Lista:** como mostrar N itens sem que N seja o custo.
- **Setup de sala (checar em voz alta):** todo mundo com o projeto do grupo rodando via `npx expo start`, na branch da aula. Quem estiver travado resolve **agora**, não no Passo 6.
- **Grupos com o projeto Pet:** seguem o **`practice.md`** — mesma estrutura, mesmos tempos, mesmos scaffolds, no domínio `Pet` (`pet-routine-expo`, branch `feature/pratica_04`). Quem está no Rastreador de Micro-hábitos segue o `exercises.md` (`habit-tracker-expo`, branch `feature/aula_04`). Dizer isso no começo, para ninguém traduzir domínio no meio do hands-on.

> ⚠️ **Nota para o professor:** a versão do SDK não mudou desde a Aula 3 — **Expo SDK 57 = React Native 0.86 + React 19.2**. Mas o **React Native 0.87 saiu em 11/08/2026**, e ele torna a *Strict TypeScript API* o default e transforma *deep imports* (`react-native/Libraries/...`) em erro. Vocês **ainda não estão nele**, porque o Expo SDK 57 empacota a 0.86. Vale uma frase: é o mesmo padrão de "versão mais nova ≠ versão que você usa" que já apareceu na Aula 1 (TypeScript 7) e na Aula 3 (NativeWind v5). Não abrir o assunto além disso.

---

## Passo 1 — `Pressable`: o toque que você desenha (35 min)

### 1.1 Por que ele existe (4 min)

Retomar a limitação da Aula 3 e apresentar a resposta:

| O que você tinha | O limite |
|---|---|
| `Button` | aparência do sistema; **não aceita `style`** |
| `<Text onPress>` | funciona, mas o alvo de toque é só o texto e não há feedback visual |
| `Pressable` | **envolve qualquer coisa** e reporta o toque; você desenha o interior |

- **A frase-chave:** `Pressable` **não desenha nada**. Ele é uma casca que detecta o toque no que estiver dentro dele. Toda a aparência continua sendo sua, com `StyleSheet` e Flexbox — exatamente o que vocês aprenderam na aula passada.
- **Analogia recomendada — o tapete sensor da porta automática:** o tapete não tem aparência própria e não abre porta nenhuma; ele só avisa "alguém pisou aqui". O que acontece depois é decisão sua. `Pressable` é o tapete; o `<View>` estilizado por dentro é o que a pessoa vê.

### 1.2 O ciclo de vida do toque (8 min)

Desenhar na lousa **antes** de mostrar código. É o conteúdo que mais rende no semestre inteiro, porque explica bugs que a turma vai encontrar sozinha depois.

- `onPressIn` — o dedo **encostou**. Dispara na hora.
- A partir daí, dois caminhos:
  1. O dedo sai antes de 500 ms → `onPressOut`, e então **`onPress`**.
  2. O dedo fica mais de 500 ms → **`onLongPress`**. (`onPressOut` ainda dispara quando o dedo sair.)
- `onPressMove` — o dedo se moveu enquanto pressionava.

**O ponto a martelar:** `onPress` dispara quando o dedo **solta**, não quando encosta. Todo mundo escreve `onPressIn` achando que é "o clique" e depois não entende por que a ação acontece cedo demais e cancelar deixou de funcionar. **Ação vai em `onPress`. Feedback vai no `pressed`.**

### 1.3 `style` como função — a prop que muda tudo (8 min)

Este é o único ponto verdadeiramente novo de sintaxe na aula. Fazer devagar.

- Nas Aulas 3, `style` recebia objeto ou array. No `Pressable`, ele também aceita **uma função** que recebe `{ pressed }` e devolve o estilo.
- Escrever as duas formas lado a lado na lousa:
  - `style={styles.botao}` — estático, funciona, sem feedback.
  - `style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}` — o array da Aula 3, agora dentro de uma função.
- **Amarrar com a Aula 3:** é a **mesma** regra de precedência de array — o último vence, e `false` é descartado. O que mudou não é o estilo; é **quem decide** quando aplicar o segundo objeto.
- **Amarrar com o que não existe:** na web isso seria `:active`. Não há pseudo-classe aqui, e não há `:hover` (não há mouse). O estado vem por parâmetro, não por seletor.
- `children` também aceita função com `{ pressed }` — mencionar em uma frase, mostrar em uma linha, seguir. Serve quando o **conteúdo** muda, não só o estilo.

### 1.4 Área e tempo: as props que ninguém usa e deveria (7 min)

Apresentar com o problema antes da prop:

| Sintoma | Prop | Default |
|---|---|---|
| Alvo pequeno demais, o usuário erra o toque | `hitSlop` | nenhum |
| O toque "cancela" se o dedo escorrega um pouco | `pressRetentionOffset` | `{top:20, left:20, right:20, bottom:30}` |
| Item de lista pisca ao rolar | `unstable_pressDelay` | nenhum |
| 500 ms de long press é muito/pouco | `delayLongPress` | `500` |

- **`hitSlop` é o mais útil e o menos usado.** Aumenta a área sensível **sem** mudar o layout — o botão continua do mesmo tamanho na tela. É a solução certa para o ícone de 16 px.
- **`unstable_pressDelay` é a prop do Passo 3.** Guardar o nome: quando o `Pressable` estiver **dentro de uma lista**, um pequeno atraso evita que o item acenda enquanto o dedo está só rolando. O prefixo `unstable_` é aviso de que o nome pode mudar; a função, não.
- **`pressRetentionOffset` já vem generoso** — mostrar o default e explicar que é por isso que "arrastar um pouquinho" não cancela o toque.

### 1.5 Android: `android_ripple` (4 min)

- `android_ripple={{ color: '...', borderless: false }}` liga a ondinha nativa do Android. No iOS não faz nada — e isso é o esperado, não um bug.
- Aceita `PlatformColor`, então dá para referenciar o tema do sistema e a ondinha acompanha claro/escuro sozinha. **Citar, não desenvolver.**
- `android_disableSound` desliga o som do toque.
- **A lição de fundo, que vale para a disciplina inteira:** props com prefixo de plataforma são um contrato honesto — o framework está dizendo "isto só existe de um lado". Melhor do que uma prop que silenciosamente não faz nada.

### 1.6 Acessibilidade em 2 minutos (2 min)

- `accessibilityRole="button"` (ou `role="button"`, que tem precedência) e `accessibilityLabel` — sem isso, o leitor de tela anuncia um agrupamento sem propósito.
- `disabled` desliga o toque **e** informa o estado à tecnologia assistiva.
- Não transformar em aula de acessibilidade. Duas props, uma frase cada, seguir.

### 1.7 O que você vai encontrar por aí (2 min)

- Praticamente todo tutorial de React Native na internet usa **`TouchableOpacity`**. A documentação oficial do próprio `TouchableOpacity` traz um aviso no topo: *"If you're looking for a more extensive and future-proof way to handle touch-based input, check out the Pressable API."*
- Dizer isso, mostrar de onde vem, e **parar aí**. Não abrir a API dos `Touchable*` — não é o assunto de hoje, e o que a turma precisa saber é **qual usar**, não como usar o antigo.
- **A pergunta que vai aparecer:** *"e como eu faço aquela animação de encolher quando aperta?"* → **"ótima pergunta, e não é o assunto de hoje."** Animação é assunto de outra aula; hoje o feedback é o `pressed` mudando estilo.

---

## Passo 2 — Checkpoint 1: toque (8 min)

Formato: pergunta lançada, 60 s em duplas, 2–3 respostas em voz alta. Não avançar sem isso.

1. "Qual a diferença entre `onPressIn` e `onPress`? Em qual dos dois vai a ação de salvar, e por quê?"
2. "Meu ícone tem 16×16 e o usuário reclama que não consegue acertar. Eu aumento o `padding` ou uso outra coisa?"
3. "Escreva no papel a assinatura do `style` do `Pressable` que deixa o card mais escuro enquanto está pressionado."
4. "`android_ripple` no iPhone: o que acontece?"

**Se travar:** voltar à analogia do **tapete sensor** (Passo 1.1) em vez de inventar imagem nova. Se a confusão for sobre `style` como função, escrever na lousa a versão da Aula 3 (`style={[a, b && c]}`) e a de hoje (`style={({pressed}) => [a, pressed && c]}`) uma embaixo da outra — a maioria vê na hora que é o mesmo array.

---

## Passo 3 — `FlatList`: a lista que só renderiza o que se vê (42 min)

### 3.1 O problema, demonstrado (5 min)

**Fazer ao vivo, não contar.** Ter dois arquivos prontos.

- Arquivo A: `ScrollView` + `.map()` sobre um array de **5 000** itens. Mostrar o tempo até a tela aparecer, e o app engasgando.
- Arquivo B: o **mesmo** array em `FlatList`. Abre na hora.
- **A pergunta a fazer antes de explicar:** "os dois mostram a mesma coisa. Por que um trava?"
- Amarrar com a Aula 3: `ScrollView` monta **todos** os filhos de uma vez. Isso não é defeito — é o contrato dele, e é o certo para um formulário de 8 campos. O erro é usá-lo para conteúdo que cresce sem limite.

### 3.2 Virtualização, com o vocabulário certo (6 min)

Ensinar os quatro termos da documentação. Eles fazem a turma conseguir **descrever** o bug em vez de dizer "está lento".

- **Viewport** — o que está visível na tela.
- **Janela (window)** — a área em que os itens ficam montados. Bem maior que a viewport.
- **Área em branco** — o que aparece quando você rola mais rápido do que a lista consegue renderizar.
- **`VirtualizedList`** — o componente que está por baixo do `FlatList` e do `SectionList`. Citar o nome porque **ele aparece na mensagem de erro** do Passo 3.8. Não abrir a API.

- **Analogia recomendada — a janela do trem:** a paisagem tem 300 km, mas a janela tem 1 metro. O trem não carrega a paisagem inteira; ele mostra o pedaço que está passando e um pouco antes e depois. Se você acelerar demais, vê borrão — a área em branco.

### 3.3 As duas props obrigatórias (5 min)

- `data` — o array.
- `renderItem` — recebe `{ item, index, separators }` e devolve o elemento. Na prática, quase sempre só `{ item }`.
- Mostrar o mínimo funcional em 5 linhas e rodar.
- **Comparar explicitamente com o `.map()`:** o corpo do `renderItem` é *o mesmo* que ia dentro do `map`. O que mudou é **quem chama** e **quando**.

### 3.4 `keyExtractor` — e o mito de que é obrigatório (5 min)

- 🔴 **Fato zumbi:** "sempre defina `keyExtractor`". A documentação diz o contrário: o extractor padrão checa **`item.key`**, depois **`item.id`**, e só então cai no índice.
- Consequência prática: se o seu objeto tem `id`, **você não precisa escrever nada** — e escrever `keyExtractor={(item) => item.id}` é ruído. Escreva quando o identificador tiver outro nome (`codigo`, `uuid`, `slug`).
- **O que é de fato errado:** cair no índice numa lista que reordena, filtra ou remove. Aí o React associa o estado do item errado à posição, e você vê o card marcado como concluído "pular" de linha.
- Amarrar com a web: é a mesma discussão de `key` em `.map()` que eles já viram em React.

### 3.5 As molduras: cabeçalho, rodapé, vazio e separador (7 min)

| Prop | Para quê |
|---|---|
| `ListHeaderComponent` | título da tela, busca, filtros — **rola junto** |
| `ListFooterComponent` | "carregando mais", total, aviso de fim |
| `ListEmptyComponent` | **estado vazio** — o que mais é esquecido |
| `ItemSeparatorComponent` | a linha entre itens, **sem** borda no topo e no fim |
| `contentContainerStyle` | `padding` e `gap` do conteúdo que rola |

- **`ListEmptyComponent` é o ponto didático deste bloco.** Lista vazia é um estado de produto, não um caso de borda: primeiro acesso, filtro sem resultado, busca sem match. Uma tela em branco parece bug para o usuário. **Isso entra nos critérios de avaliação da atividade aplicada.**
- 🔴 **Fato zumbi:** separar itens com `marginBottom` em cada item. Gera margem sobrando no último e não é o que a documentação oferece. Use `ItemSeparatorComponent`, que renderiza **entre** os itens e não nas pontas. Para espaço uniforme simples, `gap` no `contentContainerStyle` também resolve — o contêiner é uma `View` flex, exatamente como na Aula 3.
- 🔴 **Armadilha da moldura:** `ListHeaderComponent={() => <Cabecalho />}` com uma arrow **anônima** cria um tipo de componente novo a cada render; o React desmonta e remonta o cabeçalho. Sintoma clássico: o `TextInput` de busca no cabeçalho **perde o foco a cada tecla digitada**. Passe o **elemento** (`ListHeaderComponent={<Cabecalho />}`) ou uma referência estável definida fora do componente.

### 3.6 A lista que não atualiza: `extraData` (5 min)

- `FlatList` é um `PureComponent`: **não re-renderiza se as props continuarem shallow-equal**.
- O bug: você guarda o conjunto de itens selecionados em `useState`, muda o estado, e a lista não muda de aparência — porque `data` é o mesmo array de sempre.
- Duas saídas, ambas dentro do escopo:
  1. `extraData={selecionados}` — o marcador que a documentação oferece para isso.
  2. **Tratar os dados como imutáveis:** ao mudar um item, criar um array novo (`data.map(...)`) em vez de mutar o objeto. Aí `data` muda de identidade e a lista re-renderiza sozinha.
- **Dizer qual preferir:** a segunda. `extraData` conserta o sintoma; imutabilidade conserta a causa. A documentação, aliás, usa a palavra "immutably" na descrição da própria prop.
- Mencionar o outro lado do mesmo contrato: o estado **interno** de um item não sobrevive à saída da janela de renderização. Todo dado do item precisa estar no dado, não dentro do componente.

### 3.7 Colunas, horizontal e recarregar (4 min)

- `numColumns` + `columnWrapperStyle`. Aviso da documentação: só funciona com `horizontal={false}`, e **os itens precisam ter a mesma altura** — layout tipo masonry não é suportado.
- `horizontal` — carrossel.
- `onRefresh` + `refreshing` — o "puxar para atualizar" sai de graça, sem componente extra.
- `onEndReached` + `onEndReachedThreshold` — rolagem infinita. **Hoje, acrescentando itens de um array local**; buscar de uma API é assunto das Aulas 10 a 12.

### 3.8 Os três erros que vocês vão cometer (5 min)

1. 🔴 **`FlatList` dentro de `ScrollView`** na mesma orientação. O warning é literal: *"VirtualizedLists should never be nested inside plain ScrollViews with the same orientation…"*. Motivo: a `ScrollView` dá altura infinita à lista, a janela deixa de fazer sentido e **tudo** é montado — você reintroduziu exatamente o problema que veio resolver. **Solução:** não aninhar; use `ListHeaderComponent` para o que vinha antes da lista.
2. 🔴 **`renderItem` como arrow anônima dentro do JSX.** Função nova a cada render. **Solução dentro do escopo de hoje:** declarar a função **fora do componente**, no escopo do módulo. Dizer com todas as letras que existe uma ferramenta padrão para manter a função dentro do componente sem recriá-la, e que ela **não é assunto de hoje** — é gancho para a Aula 6.
3. 🔴 **Lista sem altura.** `flex: 1` no contêiner. É a mesma regra da Aula 3: *Flexbox distribui espaço que existe.*

### 3.9 Os botões de ajuste — e quando mexer neles (5 min)

Apresentar como **catálogo**, não como receita.

| Prop | Default | Efeito |
|---|---|---|
| `initialNumToRender` | `10` | quantos itens no primeiro lote |
| `windowSize` | `21` | tamanho da janela, em múltiplos da viewport |
| `maxToRenderPerBatch` | `10` | itens por lote a cada rolagem |
| `updateCellsBatchingPeriod` | `50` ms | intervalo entre lotes |
| `removeClippedSubviews` | `true` no Android, `false` fora | desanexa views fora da viewport |
| `getItemLayout` | — | dispensa a medição, quando a altura é fixa e conhecida |

- **A regra:** não mexa antes de medir. Todo ajuste aqui é uma **troca** — menos área em branco custa mais trabalho de JavaScript, e vice-versa.
- Ser honesto sobre `removeClippedSubviews`: a própria documentação avisa que a implementação **pode ter bugs** (conteúdo sumindo, sobretudo no iOS, com transform e posicionamento absoluto) e que **não economiza memória significativa** — as views são desanexadas, não desalocadas.
- `getItemLayout` é o único que é quase sempre ganho puro — **quando** a altura é fixa. Se o item tem altura variável, a documentação sugere reconsiderar o design do item.

---

## Passo 4 — `SectionList`: quando o dado já vem agrupado (20 min)

### 4.1 O critério de escolha (3 min)

- **A pergunta única:** *os meus dados têm grupos com título?* Se sim, `SectionList`. Se não, `FlatList`.
- Casos típicos: hábitos por período do dia, contatos por letra inicial, tarefas por status, mensagens por data.
- **O que não justifica** trocar de componente: querer só um título no topo (isso é `ListHeaderComponent`).

### 4.2 O formato de `sections` (5 min)

- `sections` é um array de objetos. A documentação define **`data`** como o campo obrigatório; `key`, `renderItem`, `ItemSeparatorComponent` e `keyExtractor` são opcionais **por seção**.
- 🔴 **Fato zumbi:** "a seção precisa ter `title`". **Não precisa.** `title` é um campo **seu**, que você inventa e lê dentro do `renderSectionHeader`. Podia se chamar `periodo`, `letra` ou `rotulo`. Isso costuma cair a ficha quando você renomeia o campo ao vivo e mostra que continua funcionando.
- `renderItem` do `SectionList` recebe também **`section`** — dá para renderizar o mesmo item de forma diferente dependendo do grupo.

### 4.3 Cabeçalhos de seção (5 min)

- `renderSectionHeader({ section })` e `renderSectionFooter({ section })`.
- `SectionSeparatorComponent` renderiza **no topo e no fim de cada seção** — diferente do `ItemSeparatorComponent`, que só vai **entre** itens. É a distinção que sempre confunde; vale desenhar na lousa.
- 🔴 **A diferença de plataforma que gera o bug "funciona no meu celular":** `stickySectionHeadersEnabled` é **`true` no iOS** e **`false` no Android**. O aluno com iPhone vê o cabeçalho grudar no topo; o com Android, não. Nenhum dos dois está errado. **Declare a prop explicitamente** e o app fica igual nos dois lados.
- **A lição de fundo:** *default de plataforma é decisão de produto disfarçada de omissão.* Vale além desta prop.

### 4.4 De dados planos para seções (5 min)

- O caso real: a API (ou o mock) devolve uma lista plana, e o agrupamento é seu.
- Fazer ao vivo, com JavaScript comum — sem biblioteca, sem hook: percorrer o array, acumular num objeto por chave, e transformar em array de `{ title, data }`.
- **O ponto didático:** o componente de lista não agrupa nada. Agrupar é **transformação de dado**, e acontece antes de chegar no JSX. Confundir isso é a origem de metade da confusão com `SectionList`.

### 4.5 `FlatList` × `SectionList` — resumo (1 min)

Uma tabela, 30 segundos, seguir. Está em `student-notes.md` §4.5.

### 4.6 Contexto, e só contexto (1 min)

Uma frase, sem código e sem slide próprio: existem bibliotecas de lista de terceiros com foco em desempenho — a mais conhecida é o `@shopify/flash-list`. **A disciplina ensina o que vem no framework**, porque é o que você encontra em qualquer projeto e é a base para entender qualquer substituto. Se alguém insistir: *"ótima pergunta — não é o assunto de hoje."*

---

## Passo 5 — Checkpoint 2: listas (7 min)

1. "Tenho 12 itens fixos num formulário. `ScrollView` ou `FlatList`? Justifique pelo **contrato** de cada um, não pelo número."
2. "Mudei o estado, e a lista não atualizou. Cite **duas** causas possíveis e a correção de cada uma."
3. "Meu `keyExtractor` devolve o índice. Em que situação isso quebra?"
4. "O cabeçalho da seção gruda no topo no iPhone da minha dupla e não gruda no meu Android. Quem está errado?"

**Se travar:** retomar a **janela do trem** (Passo 3.2). Para o caso de `extraData`, escrever na lousa `arrayAntigo === arrayNovo` e perguntar o que o `===` responde depois de um `push` — a ficha cai na hora.

---

## Passo 6 — Hands-on guiado (38 min)

Exercícios 1 a 6, no projeto do grupo. Domínio **Hábito**: `exercises.md`. Domínio **Pet**: `practice.md`. Os dois arquivos têm a mesma estrutura, os mesmos tempos e os mesmos scaffolds; muda só o domínio.

1. Exercícios 1 e 2 (associação + caça ao erro) — **8 min**, sem computador.
2. Exercício 3 (`BotaoAcao` com `Pressable`, `pressed`, `hitSlop` e `android_ripple`) — 8 min.
3. Exercício 4 (previsão do ciclo de vida do toque, no papel) — 5 min, **prever antes de rodar**.
4. Exercício 5 (`FlatList` completa: `keyExtractor`, separador, vazio, cabeçalho) — 10 min.
5. Exercício 6 (`SectionList` a partir de dados planos + sticky header nas duas plataformas) — 7 min.

O **Exercício 7** (caça ao bug da lista que não atualiza) fica como sobra: quem terminar antes faz em sala, os demais levam para casa.

**Circular pela sala.** Erros previsíveis e resposta pronta:

- Ação em `onPressIn` em vez de `onPress`.
- `style={[...]}` no `Pressable` esperando `pressed` — esqueceram de transformar em função.
- `Pressable` sem nada visível dentro (ele não desenha nada por conta própria).
- `FlatList` dentro de `ScrollView` → mostrar o warning e mandar usar `ListHeaderComponent`.
- `renderItem` devolvendo texto solto sem `<Text>` (o erro nº 1 da Aula 3, que volta aqui).
- Lista sem `flex: 1` no contêiner → nada aparece.
- `renderItem` como arrow anônima no JSX → mover para fora do componente.
- Lista que não atualiza após mutar o objeto do item → criar array novo.
- Seção sem o campo que o `renderSectionHeader` lê (`section.title` indefinido).
- Cabeçalho de seção que não gruda no Android → declarar `stickySectionHeadersEnabled`.
- `keyExtractor` escrito quando o objeto já tem `id` — não é erro, mas vale comentar que é ruído.

---

## Passo 7 — Atividade aplicada e fechamento (10 min)

- Apresentar a **Atividade Aplicada 1** de `exercises.md`: transformar a tela estilizada da Aula 3 numa **tela de lista de verdade** — `SectionList` agrupando por status, itens tocáveis com `Pressable`, estado vazio, separadores e pull-to-refresh.
- **Fechar o arco da aula:** retomar a abertura — "vocês entraram com uma tela bonita que só sabia mostrar três itens e com um remendo no lugar do botão. Saem com um controle de toque de verdade e com uma lista cujo custo não depende do tamanho dos dados."
- **Gancho para a Aula 5:** sensores do dispositivo — e o dado que vai aparecer na lista deixa de ser um mock.
- Leitura para a próxima aula (ver `student-notes.md`).

---

## Notas para o professor

### Pontos-chave a não deixar passar

- **`onPress` dispara ao soltar, não ao encostar.** Ação em `onPress`, feedback no `pressed`.
- **`style` do `Pressable` aceita função.** É o mesmo array da Aula 3, com quem decide diferente.
- **`Pressable` não desenha nada.** A aparência continua sendo sua.
- **`hitSlop` aumenta a área sem mudar o layout.**
- **`ScrollView` monta tudo; `FlatList` monta a janela.** O critério é o contrato, não o número de itens.
- **`keyExtractor` não é obrigatório** — o default já tenta `key` e `id`.
- **`FlatList` é `PureComponent`.** Dados imutáveis primeiro, `extraData` depois.
- **`FlatList` dentro de `ScrollView` anula a virtualização.**
- **`title` na seção é campo seu, não da API do `SectionList`.**
- **`stickySectionHeadersEnabled` difere entre iOS e Android.** Declare.
- **`ListEmptyComponent` é estado de produto, não caso de borda.**
- **`renderItem` fora do componente** — e dizer honestamente que a ferramenta "certa" chega na Aula 6.

### Erros comuns esperados

| Erro do aluno | Correção |
|---|---|
| Ação em `onPressIn` | Vai em `onPress`, que dispara ao soltar |
| `style={[a, b]}` no `Pressable` esperando `pressed` | `style={({ pressed }) => [a, pressed && b]}` |
| `Pressable` vazio, nada aparece | Ele não desenha; ponha uma `View`/`Text` estilizada dentro |
| Aumentar `padding` para o toque pegar | `hitSlop` aumenta a área sem mexer no layout |
| Achar que `android_ripple` está quebrado no iPhone | Prop de plataforma; não faz nada no iOS por projeto |
| `.map()` dentro de `ScrollView` para lista longa | `FlatList` |
| `FlatList` dentro de `ScrollView` | Não aninhar; usar `ListHeaderComponent` |
| Lista não aparece | Falta `flex: 1` no contêiner (Aula 3) |
| Lista não atualiza após mudar o estado | Criar array novo (imutabilidade) ou `extraData` |
| `keyExtractor` devolvendo `index` numa lista que reordena | Usar o identificador estável do dado |
| `marginBottom` em cada item para separar | `ItemSeparatorComponent` ou `gap` no `contentContainerStyle` |
| `ListHeaderComponent={() => <X/>}` e o `TextInput` perde foco | Passar o elemento `<X/>` ou referência estável |
| `renderItem` arrow anônima no JSX | Declarar fora do componente |
| Tela em branco quando não há dados | `ListEmptyComponent` |
| `section.title` indefinido | O campo é seu; incluir na construção do array |
| Cabeçalho não gruda no Android | `stickySectionHeadersEnabled` explícito |
| Texto solto dentro do `renderItem` | Envolver em `<Text>` (Aula 3) |

### Ajustes de tempo se atrasar

- **Cortar primeiro:** Passo 3.9 (botões de ajuste — está inteiro em `student-notes.md`) e o Passo 1.6 (acessibilidade).
- **Cortar depois:** Passo 3.7 (colunas / horizontal / `onEndReached`) e o Passo 4.4 (agrupamento ao vivo — vira exercício).
- **Nunca cortar:** o ciclo de vida do toque (1.2), o `style` como função (1.3), a demonstração do `ScrollView` travando (3.1) e o hands-on. Se o tempo apertar de verdade, encurtar o Passo 3.9, não o Passo 6.

### A apresentação

Use **`presentation.html`** para projetar (reveal.js). Basta dar duplo clique — ela roda **offline**, com reveal.js e Mermaid vendorizados em `vendor/`. Nada é baixado da internet, então o Wi-Fi da sala não derruba a aula.

| Tecla | Ação |
|---|---|
| `→` / espaço · `←` | avançar · voltar |
| **`S`** | **modo apresentador** — notas, cronômetro e próximo slide numa segunda janela |
| `F` | tela cheia |
| `O` ou `Esc` | visão geral de todos os slides (útil para pular blocos se atrasar) |
| `B` ou `.` | tela preta — para trazer a atenção de volta para você |
| `?` | lista completa de atalhos |

As **notas do apresentador** trazem o que perguntar, onde pausar e o que enfatizar. Só aparecem no modo `S`.

Para gerar PDF, use o script da disciplina (o `?print-pdf` do navegador quebra o tema):

```bash
node tools/slides-to-pdf.mjs "aulas/aula-04-pressable-listas/presentation.html"
```

O `presentation.md` é a mesma sequência em Markdown/Marp — bom para revisar no editor, mas o Marp **não renderiza os diagramas Mermaid**. Para projetar, use o HTML.

**Os arquivos da aula, e para que serve cada um:**

| Arquivo | Para quê |
|---|---|
| `presentation.html` | projetar em sala (reveal.js, offline, modo apresentador) |
| `presentation.md` | mesma sequência em Marp, para revisar no editor |
| `student-notes.md` | notas de estudo do aluno, com fontes |
| `exercises.md` | exercícios, atividades e gabaritos — domínio **Hábito** |
| `practice.md` | as mesmas práticas, com os mesmos scaffolds — domínio **Pet** |
| `lesson-plan.md` | este arquivo |

### Preparação prévia (fazer antes da aula)

- [ ] Abrir `presentation.html` e testar o modo apresentador (`S`) **no projetor da sala**.
- [ ] Preparar os **dois arquivos da demo do Passo 3.1** (`ScrollView` + `.map()` com 5 000 itens, e a mesma coisa em `FlatList`), já prontos para trocar num alt-tab. Rodar antes, no aparelho que você vai usar — em simulador o contraste é menor.
- [ ] Preparar as quebras propositais do Passo 3.8: `FlatList` aninhada (para ver o warning) e lista sem `flex: 1`.
- [ ] Ter um **Android e um iOS** disponíveis (ou dois simuladores) para o Passo 4.3 — a diferença de sticky header só convence quando se vê lado a lado.
- [ ] Conferir se a build do Expo Go para o SDK 57 já saiu na App Store (seguia aguardando aprovação em 01/09/2026). Se saiu, avisar a turma.
- [ ] Confirmar que todos os grupos têm o projeto da Aula 3 rodando na branch da aula — o hands-on parte dele.
- [ ] Confirmar que cada grupo sabe qual arquivo seguir: `exercises.md` (Hábito) ou `practice.md` (Pet).

---

## Fatos zumbis corrigidos nesta versão

O que você vai encontrar por aí **versus** o que vale hoje. Vale ler em voz alta para a turma; eles vão bater nesse material velho na internet.

| O material antigo ensina | O que vale hoje (01/09/2026) |
|---|---|
| `TouchableOpacity` como o jeito padrão de fazer um botão | A própria documentação do `TouchableOpacity` aponta o **`Pressable`** como *"more extensive and future-proof"* |
| Feedback visual com estado manual (`useState` + `onPressIn`/`onPressOut`) | `style` como **função** com `{ pressed }` — o framework já entrega o estado |
| Aumentar `padding` para o alvo de toque ficar maior | **`hitSlop`** aumenta a área sensível sem mexer no layout |
| Listas com `.map()` dentro de `ScrollView` | `FlatList`/`SectionList` — virtualização; `ScrollView` é para conteúdo **limitado e conhecido** |
| "`keyExtractor` é sempre obrigatório" | O default checa **`item.key`**, depois **`item.id`**, e só então o índice |
| `key={index}` (ou `keyExtractor` devolvendo índice) | Identificador estável do dado, sempre que a lista reordena/filtra/remove |
| Separar itens com `marginBottom` em cada um | **`ItemSeparatorComponent`** (ou `gap` no `contentContainerStyle`) |
| `ListHeaderComponent={() => <X/>}` | Passar o **elemento** ou uma referência estável — a arrow anônima remonta o cabeçalho a cada render |
| `FlatList` dentro de `ScrollView` "para poder rolar a tela toda" | Warning de `VirtualizedList`; a virtualização é anulada. Use `ListHeaderComponent` |
| Mutar o item e esperar a lista atualizar | `FlatList` é `PureComponent`: dados **imutáveis**, ou `extraData` |
| "`SectionList` exige `title` na seção" | O campo documentado é **`data`**; `title` é campo **seu** |
| Cabeçalho de seção "grudento por padrão" | `stickySectionHeadersEnabled`: **`true` no iOS**, **`false` no Android** |
| `removeClippedSubviews` como "otimização grátis" | A documentação avisa: **pode ter bugs** (conteúdo sumindo no iOS) e **não economiza memória** relevante |
| "Ajuste `windowSize` para deixar rápido" | Todo ajuste é **troca**; a orientação é medir antes de mexer |

---

## Fontes dos dados citados

Verificadas em **1º de setembro de 2026**.

**React Native — componentes desta aula**
- [Pressable](https://reactnative.dev/docs/pressable) — ciclo de vida do toque, `style` como função, `hitSlop`, `pressRetentionOffset` (default `{bottom:30,left:20,right:20,top:20}`), `delayLongPress` (default `500`), `unstable_pressDelay`, `android_ripple`, `android_disableSound`, `onPressMove`
- [FlatList](https://reactnative.dev/docs/flatlist) — `data`, `renderItem`, `keyExtractor` (default `key` → `id` → índice), `ItemSeparatorComponent`, `ListHeaderComponent`, `ListFooterComponent`, `ListEmptyComponent`, `numColumns`, `columnWrapperStyle`, `extraData` / `PureComponent`, `getItemLayout`, `initialNumToRender` (default `10`)
- [SectionList](https://reactnative.dev/docs/sectionlist) — formato de `sections` (`data` obrigatório), `renderSectionHeader`, `renderSectionFooter`, `SectionSeparatorComponent`, `stickySectionHeadersEnabled` (iOS `true` / Android `false`), `inverted`
- [Optimizing FlatList configuration](https://reactnative.dev/docs/optimizing-flatlist-configuration) — glossário (viewport, janela, áreas em branco), `windowSize` (default `21`), `maxToRenderPerBatch` (`10`), `updateCellsBatchingPeriod` (`50` ms), `removeClippedSubviews` (default `true` no Android) e suas ressalvas
- [VirtualizedList](https://reactnative.dev/docs/virtualizedlist) — o componente por baixo (citado, fora do escopo)
- [TouchableOpacity](https://reactnative.dev/docs/touchableopacity) — o aviso no topo apontando para o `Pressable`
- [Accessibility](https://reactnative.dev/docs/accessibility) — `accessibilityRole`, `accessibilityLabel`, e a precedência de `role`

**Versões e ecossistema**
- [Expo SDK 57 — changelog](https://expo.dev/changelog/sdk-57) — SDK 57 (30/06/2026) = React Native 0.86 + React 19.2; situação do Expo Go na App Store
- [React Native 0.87](https://reactnative.dev/blog/2026/08/11/react-native-0.87) — 11/08/2026; Strict TypeScript API vira default e deep imports viram erro. **Não** é a versão do SDK 57

**Contexto, fora do escopo**
- [`@shopify/flash-list`](https://github.com/Shopify/flash-list) — citado uma vez, sem API

**Bibliografia da disciplina**
- Capítulo 7 — Listas e rolagem, em *React Native: Desenvolvimento de aplicativos mobile com React*
- [Introduction · React Native](https://reactnative.dev/docs/getting-started)

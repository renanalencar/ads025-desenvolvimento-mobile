# Plano de Aula 3 — Core Components, StyleSheet e Flexbox

- **Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School
- **Público-alvo:** Graduação. Alunos que já criaram e rodaram um projeto Expo (Aulas 1 e 2). Confortáveis com TypeScript.
- **Duração:** 3h (180 min), presencial
- **Formato:** Expositivo + verificação conceitual + hands-on guiado
- **Data prevista:** 18 de agosto de 2026
- **Dados de versões e ferramentas:** conferidos em **18 de agosto de 2026** (fontes no final deste arquivo e em `student-notes.md`)

---

## Objetivos de aprendizagem

Ao final da aula, o aluno deve ser capaz de:

1. **Escolher** o Core Component correto para cada necessidade de interface — `View`, `Text`, `Image`, `TextInput`, `ScrollView`, `Button`, `Switch` — justificando a escolha.
2. **Aplicar** estilos com `StyleSheet.create`, incluindo estilo condicional via array de estilos, sabendo explicar a ordem de precedência.
3. **Explicar** por que não existe cascata nem herança de estilo em React Native, e qual é a única exceção.
4. **Ligar estado a interface** com `useState`, usando os componentes controlados da aula (`TextInput`, `Switch`) e `onPress` em `Text` e `Button`.
5. **Construir** um layout com Flexbox usando `flexDirection`, `justifyContent`, `alignItems`, `flex`, `flexGrow`, `flexBasis` e `gap`, prevendo o resultado antes de rodar.
6. **Decidir** onde os estilos de um projeto devem morar — no componente, em arquivo irmão, ou em um módulo de tokens globais — e justificar o critério.
7. **Reconhecer e corrigir** os padrões desatualizados que a maioria dos tutoriais de React Native ainda ensina.

> ⚠️ **Escopo desta aula — ler antes de preparar:** os Core Components desta aula são exatamente
> **`View`, `ScrollView`, `Text`, `TextInput`, `Image`, `Button`, `Switch`** e o **`StyleSheet`**, mais
> **Flexbox**.
>
> **Ficam de fora, e não devem ser introduzidos:**
> - **`Pressable`**, **`TouchableOpacity`**, **`TouchableHighlight`** e afins — componentes de toque
>   estilizáveis não são assunto desta aula. A interação aqui se resolve com `onPress` em `Text` e
>   `Button`, e com `onValueChange`/`onChangeText`.
> - **`FlatList`**, **`SectionList`** e renderização de listas.
> - Animação (`Animated`, Reanimated), gestos, navegação.
> - `SafeAreaView`/insets além de uma menção de uma linha.
> - Bibliotecas de UI e Tailwind (`NativeWind`, `Uniwind`) além de um slide de contexto.
>
> Se a turma puxar para qualquer um desses assuntos, estacionar com *"ótima pergunta — não é o
> assunto de hoje"* e voltar ao roteiro. Vale especialmente no Passo 1.3, onde a limitação do
> `Button` provoca naturalmente a pergunta "e como eu faço um botão bonito?".

---

## Agenda

| # | Bloco | Tempo | Acumulado |
|---|---|---|---|
| 0 | Abertura: retomada e o problema do dia | 10 min | 0:10 |
| 1 | O catálogo mínimo: Core Components | 35 min | 0:45 |
| — | **Intervalo** | 10 min | 0:55 |
| 2 | StyleSheet: o estilo que não é CSS | 30 min | 1:25 |
| 3 | Verificação conceitual (checkpoint) | 10 min | 1:35 |
| 4 | Flexbox: como o espaço é negociado | 35 min | 2:10 |
| 5 | Onde os estilos devem morar | 20 min | 2:30 |
| 6 | Hands-on guiado | 25 min | 2:55 |
| 7 | Atividade aplicada + fechamento | 5 min | 3:00 |

---

## Passo 0 — Abertura e contexto (10 min)

- **Gancho de abertura (1 frase):** "Na Aula 1 vocês descobriram que `<View>` não é `<div>`. Hoje vem a consequência disso: **todo** o vocabulário mudou, o CSS não existe, e a cascata — a ideia mais central da estilização web — simplesmente não foi implementada. A boa notícia: o dicionário novo tem menos de dez palavras."
- Retomar em 2 minutos: `<View>` → `ViewGroup`/`UIView`, não há DOM, não há WebView.
- **Enunciar o problema do dia:** a turma tem uma tela funcionando (Aula 2), mas ela está feia e o código de estilo está espalhado. Hoje a tela vira algo apresentável **e** o estilo vira algo sustentável.
- **Setup de sala (checar em voz alta):** todo mundo com o projeto do grupo (`habit-tracker-expo` ou `pet-routine-expo`) rodando via `npx expo start`. Quem estiver travado resolve **agora**, não no Passo 6.

> ⚠️ **Nota para o professor:** o material antigo desta aula (`aula-3-core-components.md`) fixava o projeto em `--template default@sdk-54` e mandava instalar `react-dom@19.2.0` na mão. Ambas as instruções estão corrigidas nesta versão — ver Passo 1.0 e a seção "Fatos zumbis" adiante. Se algum aluno tiver o material antigo em mãos, vale corrigir explicitamente.

---

## Passo 1 — O catálogo mínimo: Core Components (35 min)

### 1.0 Antes de tudo: o ambiente, corrigido (5 min)

Aproveitar o começo para desfazer instruções velhas que circulam na turma:

- **Criar projeto hoje:** `npx create-expo-app@latest` (SDK atual: **57**, = React Native 0.86.2 + React 19.2).
- **A questão do Expo Go no iPhone** — explicar direito, porque é fonte de confusão real:
  - Android (aparelho ou emulador) e **simulador** iOS: pegar o build do SDK certo em `expo.dev/go`.
  - iPhone **físico**, SDK 55+: usar `sign.expo.dev`, que instala com o provisionamento gratuito da Apple ID. **Certificado vale ~7 dias** — reinstalar depois disso.
  - iPhone físico, SDK 54: aí sim serve o Expo Go da App Store.
  - A versão da App Store está travada no SDK 54 porque a Expo **ainda aguarda aprovação** da build de SDK 57.
- **Limpar o boilerplate:** `npm run reset-project` move o exemplo para `app-example/` e deixa `app/` limpa com `index.tsx`. Pode apagar `app-example/` depois.
- 🔴 **Corrigir em voz alta:** para rodar no navegador, **`npx expo install react-dom react-native-web @expo/metro-runtime`** — e **não** `npm install react-dom@19.2.0 ...`. Princípio a ensinar: `npx expo install` resolve a versão **compatível com o seu SDK**; `npm install` instala a mais recente e quebra.

### 1.1 O dicionário (12 min)

Apresentar como **tradução**, aproveitando o que eles já sabem de web. Tabela completa em `student-notes.md` §2.1.

| Precisa de… | Componente | O que lembrar |
|---|---|---|
| Contêiner / caixa | `View` | não rola, não tem scroll implícito |
| Qualquer texto | `Text` | **todo** texto vive aqui dentro; é o único que herda estilo; aceita `onPress` |
| Imagem | `Image` | precisa de dimensão; `source={{uri}}` ou `require()` |
| Entrada de texto | `TextInput` | controlado por `value` + `onChangeText` |
| Conteúdo que passa da tela | `ScrollView` | renderiza **tudo** de uma vez; duas props de estilo |
| Botão | `Button` | `title`/`onPress`/`color`/`disabled` — **sem `style`**, ver 1.3 |
| Liga/desliga | `Switch` | booleano + `onValueChange` |

São **sete**. Dizer isso em voz alta: o dicionário inteiro da aula cabe numa mão e meia.

- **Analogia recomendada — o dicionário de viagem:** você já fala a língua (React); recebeu um dicionário menor, com palavras diferentes para as mesmas ideias. `<div>` virou `<View>`, e não existe tradução para `<h1>` — existe `<Text>` com um estilo.

### 1.2 Os três que têm pegadinha (10 min)

Fazer **ao vivo**, quebrando de propósito:

1. **`Text`** — mostrar o erro `Text strings must be rendered within a <Text> component` colocando texto solto na `View`. É o erro nº 1 do semestre. Depois mostrar que `<Text>` **dentro** de `<Text>` herda estilo — a única herança que existe.
2. **`Image`** — mostrar imagem remota **sem** `width`/`height` e ela não aparecer. Explicar: com `require()` o bundler sabe a dimensão; com `uri` remoto, não sabe até baixar, então **você** informa. Mencionar `expo-image` (cache, placeholder, transição) como o passo seguinte, sem trocar o foco.
3. **`ScrollView`** — mostrar conteúdo cortado numa `View` e resolvido com `ScrollView`. Dois pontos: (a) as **duas props de estilo** — `style` é a janela de rolagem, `contentContainerStyle` é o conteúdo que rola, e `padding` vai no segundo; (b) `ScrollView` **monta todos os filhos de uma vez**, então serve para conteúdo **limitado e conhecido** — um formulário é o caso típico. Conteúdo longo e dinâmico pede componente especializado, que **não é assunto desta aula**.

### 1.3 Interação com o que temos: `Button`, `Switch` e `Text onPress` (8 min)

Toda a interação da aula sai de três lugares. Nenhum deles é um componente de toque estilizável — isso está fora do escopo (ver o aviso de escopo acima).

1. **`Button`** — deliberadamente mínimo: `title`, `onPress`, `disabled` e `color`. **Não aceita `style`.**
   - Mostrar que `color` se comporta **diferente** nas plataformas: no iOS tinge o **texto**; no Android, o **fundo**. É um bom exemplo de "componente do sistema entrega a aparência do sistema".
   - Serve para: protótipo, caixa de diálogo, tela de configuração, ação de formulário.
2. **`Switch`** — `value` + `onValueChange`. O par ideal com `useState`: `onValueChange={setLembrete}` funciona **direto**, sem função intermediária, porque o componente entrega o booleano novo.
3. **`Text` com `onPress`** — o jeito de fazer um trecho de texto reagir ao toque sem sair do catálogo da aula. É o que sustenta os exercícios de **estilo condicional**: tocar o texto muda o estado, o estado muda o array de estilos.

- **A pergunta que vai aparecer, e a resposta:** *"e se eu quiser um botão com fundo laranja e canto arredondado?"* → **"ótima pergunta, e não é o assunto de hoje."** Hoje o objetivo é dominar `StyleSheet` e Flexbox; componentes de toque estilizáveis vêm depois. Não abrir esse tópico — a turma tem 3h e o orçamento está no estilo, não no toque.
- **O ponto didático a extrair:** a escolha do componente vem **antes** da estilização. `Button` não é "difícil de estilizar" — ele é, por projeto, **não estilizável**. Reconhecer isso cedo poupa meia hora de tentativa e erro.

---

## Passo 2 — StyleSheet: o estilo que não é CSS (30 min)

### 2.1 A ideia central: não existe cascata (10 min)

- **Analogia recomendada — o código de vestimenta:** no CSS, você anuncia a regra no prédio inteiro e todo mundo lá dentro herda ("todo texto deste site é Arial"). No React Native **não existe esse anúncio**: cada componente **se veste sozinho**. `fontSize` numa `View` não faz nada para o `<Text>` que está dentro dela.
- **A única exceção:** `<Text>` dentro de `<Text>`. Aí sim há herança.
- Consequência prática: repetição de estilo de texto é normal e esperada — e é exatamente por isso que o Passo 5 (tokens globais) existe.
- Demais diferenças de fundo: números **sem unidade** (dp, não px), percentual como string (`'100%'`), sem seletores, sem `:hover` (não há mouse; há `pressed`), subconjunto do CSS.

### 2.2 As três formas de passar `style` (10 min)

Mostrar as três e nomear a **precedência**, que é a fonte de bug silencioso:

1. **Objeto único:** `style={styles.card}`
2. **Array:** `style={[styles.card, styles.destaque]}` — **o último vence** no conflito de propriedade.
3. **Array com condicional:** `style={[styles.texto, ativo && styles.textoAtivo]}` — `false` e `undefined` são simplesmente ignorados.
4. **Ligado ao estado:** `style={[styles.card, concluido && styles.cardConcluido]}` com `concluido` vindo de `useState` — é a forma que a turma vai usar nos exercícios.

- **Perguntar à turma antes de responder:** "em `[{color:'blue'}, {color:'red'}]`, qual cor sai?" → vermelho. É "o último a falar ganha", como `Object.assign`.

### 2.3 O que `StyleSheet.create` faz — e o que não faz (10 min)

- Ele **valida em tempo de tipo** e dá autocomplete. Nomes errados de propriedade viram erro de compilação, o que um objeto solto não garante.
- 🔴 **Fato zumbi a corrigir explicitamente:** material antigo (inclusive a versão anterior deste material) escreve `justifyContent: "center" as const` dentro de `StyleSheet.create`. **O `as const` é desnecessário** — a assinatura de `StyleSheet.create` já preserva os tipos literais. Fora de `create`, em objeto solto, aí `as const` pode ser necessário. Ensinar a distinção, não a receita.
- Sobre "performance": não prometer mágica. O ganho real hoje é **validação e organização**, não otimização de runtime. Objetos inline funcionam; o problema deles é criar objeto novo a cada render e espalhar valores mágicos pelo JSX.

---

## Passo 3 — Verificação conceitual / checkpoint (10 min)

Não avançar para Flexbox sem isso. Formato: pergunta lançada, 60s em duplas, 2–3 respostas em voz alta.

1. "Coloquei `fontSize: 24` na `View` e o texto dentro não mudou. Por quê? Onde eu deveria ter colocado?"
2. "Onde vai o `padding` de um `ScrollView`, e por que não no `style`?"
3. "Quais são as quatro props do `<Button>`? Por que não dá para deixá-lo com canto arredondado?"
4. "Em `style={[a, b]}`, `a` diz `color: 'blue'` e `b` diz `color: 'red'`. Qual vence? E se `b` for `false`?"

**Se travar:** retomar a analogia do **código de vestimenta** (Passo 2.1) em vez de introduzir imagem nova. Se a confusão for sobre precedência, escrever `Object.assign({}, a, b)` na lousa — a maioria reconhece na hora.

---

## Passo 4 — Flexbox: como o espaço é negociado (35 min)

### 4.1 A analogia da fila (5 min)

**Apresentar antes de qualquer propriedade:**

- `flexDirection` decide **em que direção a fila anda**.
- `justifyContent` distribui as pessoas **ao longo** da fila (eixo principal).
- `alignItems` decide a posição delas **na largura** da fila (eixo cruzado).

Toda dúvida de Flexbox se resolve com uma pergunta: **"qual é o eixo principal aqui?"**

### 4.2 A diferença que mais custa tempo (5 min)

- 🔴 **`flexDirection` default é `column`**, não `row`. Na web é `row`. Escrever na lousa e deixar lá a aula toda.
- Corolário: `justifyContent: 'space-between'` sem `flexDirection: 'row'` distribui **na vertical**. É o bug mais comum de layout da turma.
- Default de `alignItems` é `stretch` — o filho ocupa toda a largura se não tiver largura própria. Isso explica muitos "por que minha caixa está esticada?".

### 4.3 As propriedades, na ordem em que se usam (17 min)

1. `flexDirection: 'row' | 'column'` (+ `-reverse`)
2. `justifyContent`: `flex-start` · `center` · `flex-end` · `space-between` · `space-around` · `space-evenly`
3. `alignItems`: `stretch` · `flex-start` · `center` · `flex-end` · `baseline`
4. `flex: 1` — o atalho que resolve 80% dos casos ("ocupe o que sobrar"). Explicar que `flex: 1` é `flexGrow:1 + flexShrink:1 + flexBasis:0`.
5. `flexGrow` — proporção de distribuição da **sobra** (2 contra 1 contra 1).
6. `flexBasis` — tamanho **inicial** no eixo principal, antes de crescer/encolher.
7. `flexWrap: 'wrap'` + largura percentual → grade.
8. `gap` / `rowGap` / `columnGap` — espaçamento **entre** filhos.

- 🔴 **Fato zumbi:** tutoriais antigos espaçam itens com `margin: 5` em cada filho, o que gera margem também nas bordas e dobra entre vizinhos. **`gap` existe e está documentado** — use `gap`. Reservar `margin` para o espaço **externo** ao grupo.
- Fazer **um** exercício de previsão em voz alta: mostrar código, a turma prevê, depois rodar. Previsão errada coletiva é o melhor momento de aprendizado da aula.

### 4.4 Dica de estudo (3 min)

Indicar o [Flexbox Froggy](https://flexboxfroggy.com/) para casa (~20 min). Avisar da diferença: é CSS, então lá o default é `row`. Serve para intuição de eixo, não como referência de default.

### 4.5 Onde Flexbox no RN difere do CSS (5 min)

- `flexDirection` default `column`; `alignContent` default `flex-start`; `flexShrink` default `0` (na web é `1`).
- Sem `float`, sem `grid`, sem `position: fixed`. `position` aceita `relative` (default), `absolute` e `static`.
- Percentual funciona; unidades CSS (`px`, `rem`, `vh`) não.

---

## Passo 5 — Onde os estilos devem morar (20 min)

Apresentar como **decisão de engenharia**, com critério, não como quatro receitas soltas. Tabela e árvore de decisão em `student-notes.md` §5.

| Estratégia | Quando | Custo |
|---|---|---|
| `StyleSheet.create` no rodapé do componente | **default** — estilo só daquele componente | nenhum; é o padrão da comunidade |
| Arquivo irmão (`cardStyles.ts`) | o bloco de estilo ficou grande demais e atrapalha a leitura | mais um arquivo para abrir a cada leitura |
| Módulo de tokens (`theme.ts`) | **cores, espaçamentos, tipografia** — o que precisa ser igual em todo o app | exige disciplina para não virar depósito |
| Objeto inline | protótipo descartável, valor calculado em runtime | recria objeto a cada render; valor mágico solto |

- **O critério, em uma frase:** *estilo específico fica junto do componente; **decisão de design** vira token compartilhado.*
- 🔴 **Erro comum a antecipar:** criar `globalStyles.ts` com `container`, `text` e `button` prontos e usar em tudo. Isso não é design system, é uma folha de estilo global com outro nome — e amarra componentes diferentes ao mesmo layout. Tokens compartilhados devem ser **valores** (`cores.primaria`, `espaco.md`), não **componentes montados**.
- Mencionar em um slide, sem desviar: `NativeWind` (v4 estável, exige Tailwind v3; v5 em preview para Tailwind v4) e `Uniwind` (novo, feito para Tailwind v4). **A disciplina usa `StyleSheet`** — é o que a documentação oficial ensina e o que aparece em qualquer código base. Lição de fundo: "versão mais nova ≠ versão recomendada"; a mesma lição do TypeScript 7 na Aula 1.

---

## Passo 6 — Hands-on guiado (25 min)

Exercícios 1 a 6 de `exercises.md`, no projeto do grupo. Sequência sugerida:

1. Exercícios 1 e 2 (associação + caça ao erro) — 6 min, sem computador.
2. Exercício 3 (`Card` com `boxShadow` e `gap`) — 7 min.
3. Exercício 4 (previsão de Flexbox) — 5 min, **prever antes de rodar**.
4. Exercício 5 (estilo condicional com `useState`, `Text onPress` e `Switch`) — 7 min.

**Circular pela sala.** Erros previsíveis e resposta pronta:

- Texto solto fora de `<Text>`.
- `justifyContent` sem `flexDirection: 'row'`.
- Imagem remota sem `width`/`height`.
- Esperar herança de `fontSize` da `View` para o `<Text>`.
- Tentar `style` no `<Button>` (não existe) — mandar usar `color`, ou mover o estilo para a `View` em volta.
- Copiar `JSX.Element` de material antigo → erro de tipo. Mandar **remover a anotação** (o TS infere) ou usar `React.JSX.Element`.
- `padding: '16px'` com unidade.
- `flex: 1` no filho sem que o pai tenha altura definida.

---

## Passo 7 — Atividade aplicada e fechamento (5 min)

- Apresentar a **Atividade Aplicada 1** de `exercises.md`: estilizar de verdade a tela do projeto do grupo, com um `theme.ts` de tokens, um `Card` reutilizável e um formulário com `TextInput` + `Switch` dentro de `ScrollView`.
- **Fechar o arco da aula:** retomar a abertura — "vocês entraram com uma tela que funcionava e um estilo espalhado. Saem com uma tela apresentável e um lugar definido para cada decisão de design. E sem cascata — porque ela nunca existiu aqui."
- Leitura para a próxima aula (ver `student-notes.md`).

---

## Notas para o professor

### Pontos-chave a não deixar passar

- **Não existe cascata nem herança de estilo** (exceto `Text` em `Text`). Se a turma sair com uma única ideia, que seja esta.
- **`flexDirection` default é `column`.** Escrever na lousa e não apagar.
- **`Button` não aceita `style`.** A escolha do componente precede a estilização.
- **Em array de estilos, o último vence.** É `Object.assign`.
- **`as const` dentro de `StyleSheet.create` é desnecessário.** Ensinar a distinção, não a receita.
- **`JSX.Element` não existe mais como tipo global** com React 19. Isso vai aparecer em código copiado.
- **`gap` existe.** Parar de espaçar com `margin` em cada filho.
- **`npx expo install`, não `npm install`,** para dependências que acompanham o SDK.
- **Tokens são valores, não componentes prontos.**

### Erros comuns esperados

| Erro do aluno | Correção |
|---|---|
| Texto solto dentro de `<View>` | Envolver em `<Text>` |
| `fontSize` na `View` "não funciona" | Não há herança; estilo vai no `<Text>` |
| `justifyContent` sem `flexDirection: 'row'` | Default é `column`; declarar `row` |
| `<Button style={...}>` | `Button` não aceita `style`; só `color` — ou estilizar a `View` em volta |
| Imagem remota invisível | Definir `width`/`height` explícitos |
| `padding: '16px'` | Número sem unidade: `padding: 16` |
| `JSX.Element` dá erro de tipo | Remover a anotação, ou `React.JSX.Element` |
| `as const` em tudo dentro de `create` | Desnecessário; `create` já preserva literais |
| `padding` no `style` do `ScrollView` não aparece | Vai em `contentContainerStyle` |
| `margin: 5` em cada filho para espaçar | `gap` no contêiner |
| `flex: 1` "não faz nada" | O pai precisa ter altura definida |
| `globalStyles.container` usado em tudo | Tokens são valores, não layouts prontos |

### Ajustes de tempo se atrasar

- **Cortar primeiro:** Passo 5 sobre NativeWind/Uniwind (é contexto, não conteúdo) e o Passo 4.5 (diferenças finas com CSS — está em `student-notes.md`).
- **Cortar depois:** `flexBasis` e `flexWrap` — deixar como exercício de casa (Exercícios 8 e 9).
- **Nunca cortar:** o Passo 2.1 (ausência de cascata), o `flexDirection: column` do Passo 4.2, e o hands-on. Se o tempo apertar de verdade, encurtar o Passo 1, não o Passo 6.

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

Para gerar PDF: abra o arquivo com `?print-pdf` no fim da URL e mande imprimir pelo navegador.

O `presentation.md` é a mesma sequência em Markdown/Marp — bom para revisar no editor, mas o Marp **não renderiza os diagramas Mermaid**. Para projetar, use o HTML.

### Preparação prévia (fazer antes da aula)

- [ ] Abrir `presentation.html` e testar o modo apresentador (`S`) **no projetor da sala**.
- [ ] Deixar um projeto Expo **já rodando** no notebook, com `app/index.tsx` aberto, para as demos ao vivo dos Passos 1.2, 2.2 e 4.3.
- [ ] Preparar as três quebras propositais (texto solto, imagem sem dimensão, `space-between` sem `row`) em arquivos separados, para não perder tempo digitando.
- [ ] Conferir se a build do Expo Go para o SDK 57 já saiu na App Store (estava aguardando aprovação em 18/08/2026). Se saiu, atualizar o Passo 1.0.
- [ ] Ter uma imagem remota de URL curta à mão para a demo de `Image` (URL longa é impossível de ditar).
- [ ] Confirmar que todos os grupos têm o projeto da Aula 2 rodando — o hands-on parte dele.

---

## Fatos zumbis corrigidos nesta versão

O que você vai encontrar por aí **versus** o que vale hoje. Vale ler em voz alta para a turma; eles vão bater nesse material velho na internet.

| O material antigo ensina | O que vale hoje (18/08/2026) |
|---|---|
| `JSX.Element` como tipo de retorno | React 19 **removeu o namespace global `JSX`**. Use `React.JSX.Element` ou (melhor) omita — o TS infere |
| `as const` dentro de `StyleSheet.create` | Desnecessário: `create` já preserva os tipos literais |
| `--template default@sdk-54` fixo "porque o Expo Go só vai até 54" | SDK atual é **57**. No iPhone físico com SDK 55+, use `sign.expo.dev` (grátis, cert de ~7 dias); a App Store está em 54 só porque a build de 57 aguarda aprovação |
| `npm install react-dom@19.2.0 react-native-web@^0.21.0` | `npx expo install react-dom react-native-web @expo/metro-runtime` — resolve a versão compatível com o SDK |
| Sombra com `shadowColor` + `shadowOffset` + `shadowOpacity` + `shadowRadius` + `elevation` | **`boxShadow`** está documentado e funciona nas duas plataformas (New Architecture, que é a única desde a 0.82) |
| Espaçar filhos com `margin: 5` em cada um | **`gap`** / `rowGap` / `columnGap` estão documentados em Layout Props |
| "Use `<Button>` e estilize" | `Button` **não aceita `style`** — só `title`, `onPress`, `disabled`, `color` |
| `Button` com `color` "funciona igual nas duas plataformas" | No iOS `color` tinge o **texto**; no Android, o **fundo** |
| `flexDirection` default `row` (hábito de CSS) | Em React Native o default é **`column`** |
| `StyleSheet.create` "otimiza performance" | O ganho real é **validação de tipos e organização**; não prometa otimização de runtime |

---

## Fontes dos dados citados

Verificadas em **18 de agosto de 2026**.

**Expo**
- [Expo SDK 57 — changelog](https://expo.dev/changelog/sdk-57) — RN 0.86, React 19.2, `eas go`, situação da App Store
- [Expo — Create a project](https://docs.expo.dev/get-started/create-a-project/) — comando e templates
- [Expo — create-expo-app](https://docs.expo.dev/more/create-expo/) — valores de `--template`
- [Expo — "Project is incompatible with this version of Expo Go"](https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/) — `sign.expo.dev`, SDK 54 vs 55+, `eas go`
- [Expo — Set up your environment](https://docs.expo.dev/get-started/set-up-your-environment/)
- [Expo — `expo-image`](https://docs.expo.dev/versions/latest/sdk/image/)
- [Expo — Tutorial: create your first app](https://docs.expo.dev/tutorial/create-your-first-app/) — `reset-project`

**React Native**
- [View Style Props](https://reactnative.dev/docs/view-style-props) — `boxShadow`, `filter`, `elevation`
- [Layout Props](https://reactnative.dev/docs/layout-props) — `gap`, defaults de `flexDirection` e `alignItems`
- [Flexbox](https://reactnative.dev/docs/flexbox)
- [StyleSheet](https://reactnative.dev/docs/stylesheet)
- [Button](https://reactnative.dev/docs/button) · [Switch](https://reactnative.dev/docs/switch) · [Text](https://reactnative.dev/docs/text) · [TextInput](https://reactnative.dev/docs/textinput) · [ScrollView](https://reactnative.dev/docs/scrollview)
- [Core Components and APIs](https://reactnative.dev/docs/components-and-apis)

**React**
- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide) — remoção do namespace global `JSX`

**Tailwind para React Native (contexto, fora do escopo)**
- [NativeWind](https://www.nativewind.dev/) · [Uniwind](https://uniwind.dev/) · [Expo — Tailwind guide](https://docs.expo.dev/guides/tailwind/)

**Bibliografia da disciplina**
- Capítulo 4 — Criando os primeiros componentes; Capítulo 5 — Componentes estilizados; Capítulo 6 — O básico de layout com o Flexbox, em *React Native: Desenvolvimento de aplicativos mobile com React*

# Plano de Aula 1 — Introdução ao Desenvolvimento Mobile e React Native

- **Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School
- **Público-alvo:** Graduação. Alunos já familiarizados com TypeScript no contexto web/back-end (Next.js, Node, Express). Sem experiência prévia em mobile nativo.
- **Duração:** 3h (180 min), presencial
- **Formato:** Expositivo + verificação conceitual + hands-on guiado
- **Data prevista:** 4 de agosto de 2026
- **Dados de mercado/versões:** conferidos em 7 de agosto de 2026 (ver `student-notes.md` para fontes)

---

## Objetivos de aprendizagem

Ao final da aula, o aluno deve ser capaz de:

1. **Comparar** as cinco plataformas móveis/embarcadas estudadas (Android, iOS, OpenHarmony/HarmonyOS, Tizen, webOS) quanto a modelo de governança, linguagem oficial, mercado-alvo e implicação para quem desenvolve.
2. **Justificar** a escolha entre app nativo, cross-platform e web app a partir de restrições concretas de um projeto (público, hardware, orçamento, prazo).
3. **Aplicar** TypeScript para modelar o domínio de uma aplicação móvel — tipar props de componentes, estado, união discriminada de status e respostas de API.
4. **Explicar** o que React Native é e o que ele **não** é ("não é WebView"), descrevendo o papel de JSI, Fabric, TurboModules e Hermes.
5. **Criar e rodar** um primeiro projeto React Native com Expo, alterando um componente e vendo o resultado no dispositivo/emulador.

> ⚠️ **Escopo desta aula:** a parte prática de React Native se limita a **criar e rodar** o projeto Expo e a mexer em componentes isolados (`View`/`Text`/props). **Não** entramos em listas (`FlatList`/`SectionList`) nem em navegação — isso começa na Aula 2.

---

## Agenda

| # | Bloco | Tempo | Acumulado |
|---|---|---|---|
| 0 | Abertura: disciplina, projetos, avaliação | 15 min | 0:15 |
| 1 | Panorama das plataformas móveis | 45 min | 1:00 |
| — | **Intervalo** | 10 min | 1:10 |
| 2 | Revisão de TypeScript aplicada ao mobile | 35 min | 1:45 |
| 3 | Verificação conceitual (checkpoint) | 10 min | 1:55 |
| 4 | Introdução ao React Native | 35 min | 2:30 |
| 5 | Hands-on guiado: criação do projeto | 25 min | 2:55 |
| 6 | Atividade aplicada + fechamento | 5 min | 3:00 |

---

## Passo 0 — Abertura e contexto (15 min)

- **Gancho de abertura (1 frase):** "Vocês já sabem construir uma aplicação web com TypeScript. Nesta disciplina vamos levar essa mesma habilidade para dentro do bolso de 7 bilhões de pessoas — e descobrir o que muda quando não existe mais 'a página'."
- Apresentar:
  - Ementa e cronograma da disciplina.
  - **Os dois projetos da disciplina:** cada grupo constrói, ao longo do semestre, um dos dois apps abaixo. Hoje todo mundo cria o projeto Expo que vai usar a partir da Aula 2.
    - **Rastreador de Micro-hábitos e Condicionamento Físico** — repositório `habit-tracker-expo`.
    - **App de Gestão e Rotina Pet** — repositório `pet-routine-expo`.
  - Formato de avaliação e entregáveis.
- **Ponto a enfatizar:** o repertório que eles têm (TS, componentes, estado, consumo de API) transfere quase inteiro. O que é novo é a **plataforma**, não a linguagem.

> ⚠️ **Nota para o professor:** ambos os repositórios já existem, cada um com a branch `feature/ads025_2026-2` criada a partir de um scaffold limpo do Expo (`create-expo-app`, template `blank-typescript`), `README.md` e comentários `TODO` no `App.tsx` apontando os exercícios das próximas aulas. Cada grupo trabalha na branch do projeto que lhe foi atribuído.

---

## Passo 1 — Panorama das plataformas móveis (45 min)

### 1.1 Abrir com o dado de mercado — e com a armadilha (10 min)

Mostrar os dois números **conflitantes** de propósito:

- **StatCounter, jul/2026** (mede tráfego web): Android 68,4% · iOS 31,6% — HarmonyOS não aparece.
- **Counterpoint, Q1/2026** (mede vendas): Android ~73% · **HarmonyOS ~5%** · iOS o resto.
- **Brasil, StatCounter jul/2026:** Android 77,6% · iOS 22,4%.

**Pergunta socrática para a turma:** "Os dois estão certos. Por que discordam?"
→ Conduzir até: *metodologia*. Tráfego web ≠ vendas ≠ base instalada. E dispositivos Huawei sem serviços Google aparecem como "Android" ou "outros" em medição por user-agent.

**Ponto-chave:** um desenvolvedor precisa saber **de onde vem o número** antes de decidir plataforma com base nele.

### 1.2 As cinco plataformas (30 min — ~6 min cada)

Para cada uma, seguir sempre o mesmo esqueleto de 5 campos (facilita a tabela comparativa depois):
**quem governa · linguagem/UI oficial · IDE · onde roda · por que me importa**

1. **Android** — Google/AOSP, open source. Kotlin + Jetpack Compose, Android Studio. Android 17 "Cinnamon Bun", API 37 (jun/2026). Arquitetura: mostrar as **7 camadas do AOSP atual** (kernel Linux → daemons/libs nativas → HAL → system services → ART → Framework → Apps). Dor característica: **fragmentação**.
2. **iOS** — Apple, fechado e verticalmente integrado. Swift + SwiftUI, Xcode 26.6. iOS 26.6 estável, iOS 27 em beta. Publicação exige build com Xcode 26+ desde abr/2026. Dor característica: **necessidade de macOS** e curadoria da App Store.
3. **OpenHarmony / HarmonyOS (OHOS)** — Huawei + OpenAtom Foundation. **Distinguir os três nomes explicitamente** (é o erro mais comum):
   - *OpenHarmony* = projeto open source, a base;
   - *HarmonyOS 1–4* = produto Huawei **com** core AOSP → rodava APK;
   - *HarmonyOS NEXT (= HarmonyOS 5, out/2024) e superiores* = **sem AOSP, não roda APK**.
   - Linguagem: **ArkTS — um superset de TypeScript**. UI: ArkUI. IDE: DevEco Studio.
   - **Gancho de ouro para a aula:** a plataforma que mais cresce no mundo escolheu *TypeScript* como linguagem oficial. Isso valida a aposta da turma em TS.
   - Mercado: ~19–20% na China (Q1/2026), à frente do iOS lá pelo 7º trimestre consecutivo; ~5% global.
4. **Tizen** — Samsung. **Deixar claro que morreu em smartphone e em wearable** (wearables migraram para Wear OS a partir do Galaxy Watch 4, 2021). Vive em **Smart TVs, signage, eletrodomésticos, IoT**. Tizen 10 / SDK 10 (fev/2026). Apps web (HTML/CSS/JS), tooling agora Node.js + TypeScript em VS Code.
5. **webOS** — LG. TVs, monitores, projetores, automotivo, e **webOS Hub** licenciado para 200+ marcas. webOS TV 26, engine Chromium 132. Apps web; framework oficial **Enact, construído sobre React**. Flutter para webOS agora suportado.

### 1.3 Fechar o bloco com a tabela comparativa (5 min)

Construir na lousa/slide **com a turma**, não pronta. Depois entregar a versão completa (está em `student-notes.md`).

**Moral do bloco:** três das cinco plataformas usam **JS/TS + React-like** como caminho principal de desenvolvimento. Isso não é coincidência — é a razão de existir desta disciplina.

---

## Passo 2 — Revisão de TypeScript aplicada ao mobile (35 min)

> A turma já usa TS com Node/Next/Express. **Não** revisar sintaxe básica. Focar no que muda de ênfase no mobile.

### 2.1 Por que TS importa mais no mobile (5 min)

- No web, um erro em produção se corrige com um deploy. No mobile, **a correção passa por revisão de loja** (horas a dias) e depende do usuário atualizar. O custo de um `undefined is not an object` é ordens de magnitude maior.
- Não há "console do navegador" para o usuário final. O tipo é a primeira linha de defesa.

### 2.2 Os cinco recursos que serão usados o semestre todo (25 min)

Todos exemplificados no domínio do **Rastreador de Micro-hábitos** (`Habito`) — código completo em `student-notes.md`.

1. **`type` vs `interface`** — regra prática: `interface` para formas de objeto extensíveis, `type` para uniões, tuplas e utilitários. Não é dogma, é consistência.
2. **Union types literais + união discriminada** — modelar `StatusHabito` e `EstadoTela` (`carregando | sucesso | erro`). **Este é o item mais importante da aula.**
   - **Antes de codar, apresentar a analogia do cardápio** (ver `student-notes.md` §2.3): um cardápio fechado só permite pedir pratos que existem; `string` é "peça o que quiser e reze". Deixar essa imagem assentar **antes** de mostrar o código — é o gancho que a turma vai usar para lembrar o conceito depois.
   - Só então mostrar como o `switch` com discriminante dá *exhaustiveness checking* e elimina a tríade `isLoading`/`data`/`error` desalinhada.
3. **Tipagem de props de componente** — `type Props = {...}` + desestruturação. Mostrar `children: React.ReactNode` e props opcionais com default.
4. **Generics no cotidiano** — `useState<T>`, e uma função `fetchJson<T>` tipada. Não ensinar teoria de generics; mostrar os dois lugares onde eles aparecem.
5. **Utility types** — `Pick`, `Omit`, `Partial` para derivar o tipo de um formulário a partir do tipo da entidade (`Omit<Habito, 'id' | 'criadoEm' | 'status' | 'streakDias'>`). Ensinar o princípio: **uma fonte de verdade para o tipo**.

### 2.3 O que evitar (5 min)

- `any` — e o que usar no lugar (`unknown` + narrowing).
- Type assertion (`as`) como "calar o compilador". Diferenciar de *type guard*.
- **Aviso prático de ambiente:** TypeScript 7.0 (jul/2026) reescreveu o compilador em Go — 8 a 12× mais rápido — mas **ainda não expõe API programática**, então `typescript-eslint`, `ts-jest` e afins não rodam sobre ele. **Nos laboratórios da disciplina, fixar TypeScript na linha 6.x.** Explicar o porquê: é uma lição real sobre maturidade de ecossistema.

---

## Passo 3 — Verificação conceitual / checkpoint (10 min)

Não avançar para React Native sem isso. Formato sugerido: pergunta lançada, 60s em duplas, 2–3 respostas em voz alta.

1. "Com suas palavras: qual a diferença entre OpenHarmony, HarmonyOS 4 e HarmonyOS NEXT?"
2. "Uma startup quer um app de leitura de QR code para catadores de recicláveis, com equipe de 2 devs que sabem TS e prazo de 2 meses. Nativo, cross-platform ou web? Justifique com **duas** restrições."
3. "Por que `status: 'pendente' | 'concluido' | 'pulado'` é melhor que `status: string`? Dê um bug que o primeiro previne e o segundo não."
4. "Tizen roda em celulares hoje?" *(resposta esperada: não — TVs e IoT)*

**Se travar:** retomar a analogia do **cardápio fechado**, já apresentada no Passo 2.2, em vez de introduzir uma imagem nova agora.

---

## Passo 4 — Introdução ao React Native (35 min)

### 4.1 Definição em uma frase (3 min)

> React Native é um framework que usa **React e TypeScript para descrever a interface**, mas renderiza **componentes nativos reais** da plataforma — não HTML dentro de um navegador.

### 4.2 Desmontar o mal-entendido central (7 min)

- **Cordova/Ionic clássico:** seu app é um site dentro de uma WebView. `<div>` continua sendo `<div>`.
- **React Native:** `<View>` **se torna** um `android.view.ViewGroup` no Android e um `UIView` no iOS. Não existe DOM, não existe CSS, não existe WebView.
- **Analogia recomendada — o tradutor simultâneo:** você escreve o discurso em uma língua (React/TS); um intérprete o entrega em outra, na hora, para cada plateia (Android/iOS). A plateia ouve a *língua nativa dela*, não uma legenda.
- Corolário prático imediato: `<div>` → `<View>`, `<p>`/`<span>` → `<Text>` (**todo texto precisa estar dentro de `<Text>`**), `<img>` → `<Image>`, `<button>` → `<Pressable>`. Estilo é objeto JS via `StyleSheet`, com um subconjunto de propriedades tipo CSS; **`flexDirection` default é `column`, não `row`**.
- **Não entra hoje:** `<FlatList>`/`<SectionList>` (renderização de listas) e navegação entre telas. Mencionar que existem, sem se aprofundar — chegam na Aula 2.

### 4.3 Como funciona por dentro — a Nova Arquitetura (15 min)

Ensinar **só o estado atual**. Mencionar a bridge antiga em uma frase, apenas para desarmar tutoriais desatualizados.

- **JSI (JavaScript Interface):** permite que JS e C++ chamem um ao outro **diretamente e de forma síncrona**, por referência. Substituiu a antiga "ponte" assíncrona que serializava tudo em JSON.
- **Fabric:** o renderizador novo. Cria e gerencia a árvore de views nativas.
- **TurboModules:** módulos nativos com carregamento *lazy* e interface tipada, gerada por **Codegen** a partir de especificações em TypeScript. → **Insight para a turma: o TS deles gera código nativo.**
- **Hermes:** engine JavaScript feita para mobile — bytecode pré-compilado no build, startup rápido, footprint menor. É a engine **default** desde a 0.84.
- **Estado atual, para citar com precisão:** New Architecture é default desde a 0.76, Bridgeless default desde a 0.78, **único modo** desde a 0.82, e a arquitetura legada foi **removida do código** na 0.84 (fev/2026). Versão estável hoje: **React Native 0.86.2** (jul/2026), rodando **React 19.2**.
- **Curiosidade de governança (vale 1 min):** o repositório do React Native saiu da org `facebook` para a org `react` no GitHub, sob a **React Foundation** independente.

### 4.4 Como se começa um projeto **hoje** (10 min)

- A recomendação oficial de `reactnative.dev` é **usar um framework**, e o framework recomendado é o **Expo**:
  ```bash
  npx create-expo-app@latest
  ```
- **Expo SDK 57** (jun/2026) = React Native 0.86 + React 19.2. New Architecture é obrigatória no Expo desde o SDK 55.
- Sem framework, só para restrições incomuns: `npx @react-native-community/cli@latest init`.
- 🔴 **`npx react-native init` está morto** — depreciado na 0.75, **removido na 0.77** (jan/2025). Dizer isso em voz alta: **qualquer tutorial que use esse comando está desatualizado**, e a turma vai encontrar muitos deles.
- Com Expo Go, **não é preciso instalar Android Studio nem Xcode** para começar. Isso resolve o problema de quem não tem Mac.

---

## Passo 5 — Hands-on guiado: criação do projeto (25 min)

Objetivo: todo mundo com um app rodando **no próprio celular** antes de sair da sala. **Esta aula não constrói telas de produto** — o projeto real (`habit-tracker-expo` ou `pet-routine-expo`) já foi criado antes da aula, na branch `feature/ads025_2026-2`. Aqui a turma pratica o fluxo de criação em um projeto de sandbox e mexe em componentes soltos.

1. Verificar Node.js (**mínimo 22.11+**) — 3 min.
2. `npx create-expo-app@latest sandbox-app` → `cd sandbox-app` → `npx expo start` — 7 min.
3. Abrir no celular via **Expo Go** (QR code) ou emulador — 5 min.
4. Editar `App.tsx`, ver o **Fast Refresh** — 3 min.
5. Exercícios guiados 1 a 3 de `exercises.md` (`<View>`/`<Text>`, tipar props, union de status) — 7 min.

**Circular pela sala.** Erros previsíveis e resposta pronta:
- Texto solto fora de `<Text>` → erro em runtime. É o erro nº 1.
- Celular e notebook em redes Wi-Fi diferentes → QR não conecta. Usar `npx expo start --tunnel`.
- Esperar `flexDirection: 'row'` por default.
- Tentar usar `px`, `%` ou unidades CSS em números de estilo.
- Node desatualizado.

---

## Passo 6 — Atividade aplicada e fechamento (5 min)

- Apresentar a **Atividade Aplicada 1** de `exercises.md`: modelar em TypeScript o domínio de **Hábito** (ou **Pet**, conforme o projeto do grupo) e construir a **tela do hábito do dia** com dados mockados tipados — uma única entidade, sem listas.
- **Fechar o arco da aula:** retomar o gancho da abertura — "vocês já sabiam modelar uma entidade com TS no Next; hoje o mesmo tipo passou a descrever uma tela nativa. O tipo não mudou. A plataforma mudou."
- Leitura para a próxima aula (ver `student-notes.md`).

---

## Notas para o professor

### Pontos-chave a não deixar passar

- **Metodologia de medição de mercado** — os dois números conflitantes são um recurso didático, não um problema a esconder.
- **HarmonyOS NEXT não roda APK.** É a informação mais frequentemente errada em material sobre o tema.
- **ArkTS é superset de TypeScript.** Amarra o Passo 1 ao Passo 2 e dá peso à revisão de TS.
- **React Native não é WebView.** Se a turma sair com uma única ideia, que seja esta.
- **A analogia do cardápio precede o código.** Apresentar a imagem antes da sintaxe, não como recurso de última hora se a turma travar.
- **Union discriminada > booleanos soltos.** Vai pagar dividendos em toda a disciplina.
- **`react-native init` não existe mais.** Poupa horas de frustração da turma.
- **Nada de `FlatList`/`SectionList` hoje.** Se a conversa deslizar para "como faço uma lista", estacionar com "ótima pergunta — Aula 2" e voltar ao roteiro.

### Erros comuns esperados

| Erro do aluno | Correção |
|---|---|
| "React Native gera HTML/roda num navegador" | `<View>` → `UIView`/`ViewGroup`. Não há DOM. |
| Confundir OpenHarmony / HarmonyOS / HarmonyOS NEXT | Tabela dos três nomes, com/sem AOSP |
| "Tizen é o sistema dos celulares Samsung" | Samsung usa Android; Tizen ficou em TVs/IoT |
| Achar que cross-platform substitui saber da plataforma | Build, permissões, publicação e loja continuam nativos |
| Estilizar com CSS/`className` | `StyleSheet`, objetos JS, subconjunto de propriedades |
| Texto fora de `<Text>` | Erro em runtime; mostrar ao vivo |
| Usar `string` para status | Union literal + `switch` exaustivo |
| Seguir tutorial com `react-native init` | Ensinar a checar a data do tutorial |

### Ajustes de tempo se atrasar

- **Cortar primeiro:** detalhes de Tizen e webOS (reduzir a 3 min somando os dois — basta "morreram no celular, vivem na TV, são web + React/Flutter").
- **Cortar depois:** o histórico de versões da New Architecture (manter só "hoje é a única arquitetura").
- **Nunca cortar:** o hands-on. Se o tempo apertar de verdade, encurtar o Passo 1, não o Passo 5 — sair da sala com o app rodando é o que sustenta a motivação para a próxima aula.

### A apresentação

Use **`presentation.html`** para projetar (reveal.js, 65 slides). Basta dar duplo clique — ela roda **offline**, com reveal.js e Mermaid vendorizados em `vendor/`. Nada é baixado da internet, então o Wi-Fi da sala não derruba a aula.

| Tecla | Ação |
|---|---|
| `→` / espaço · `←` | avançar · voltar |
| **`S`** | **modo apresentador** — notas, cronômetro e próximo slide numa segunda janela |
| `F` | tela cheia |
| `O` ou `Esc` | visão geral de todos os slides (útil para pular blocos se atrasar) |
| `B` ou `.` | tela preta — para trazer a atenção de volta para você |
| `?` | lista completa de atalhos |

As **notas do apresentador** estão em 22 slides, com o que perguntar, onde pausar e o que enfatizar. Elas só aparecem no modo `S`.

Para gerar PDF: abra o arquivo com `?print-pdf` no fim da URL e mande imprimir pelo navegador.

O `presentation.md` é a mesma sequência em Markdown/Marp — bom para revisar no editor, mas o Marp **não renderiza os diagramas Mermaid**. Para projetar, use o HTML.

### Preparação prévia (fazer antes da aula)

- [ ] Abrir `presentation.html` e testar o modo apresentador (`S`) **no projetor da sala**, não só no notebook — a segunda janela precisa cair na tela certa.
- [ ] Rodar `npx create-expo-app@latest` no próprio notebook na véspera (cache do npm agiliza muito a demo).
- [ ] Testar o Wi-Fi da sala com o Expo Go; se for rede corporativa isolada, já ir com `--tunnel` no plano.
- [ ] Ter um `.zip` do projeto pronto, para quem falhar na instalação não travar.
- [ ] Conferir os números de market share no dia (StatCounter atualiza mensalmente).
- [ ] Confirmar que cada grupo sabe qual dos dois projetos (`habit-tracker-expo` ou `pet-routine-expo`) lhe foi atribuído e tem acesso à branch `feature/ads025_2026-2`.

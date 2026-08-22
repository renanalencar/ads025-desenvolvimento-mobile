# Exercícios e Atividades — Aula 1

> **Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School
> **Domínio usado nos exercícios guiados:** Rastreador de Micro-hábitos e Condicionamento Físico (`Habito`).
> **Projetos da disciplina:** ao longo do semestre cada grupo constrói um dos dois apps abaixo. Os exercícios desta aula usam o domínio `Habito` — se o seu grupo ficou com o **App de Gestão e Rotina Pet**, use a tabela de equivalência no final deste arquivo para adaptar.

| Projeto | Repositório | Branch da disciplina |
|---|---|---|
| Rastreador de Micro-hábitos e Condicionamento Físico | `habit-tracker-expo` | `feature/ads025_2026-2` |
| App de Gestão e Rotina Pet | `pet-routine-expo` | `feature/ads025_2026-2` |

## Como usar este arquivo

- **Parte 1 — Exercícios guiados** (em sala, ~20 min): foco em **acurácia**. São propositalmente simples. O objetivo é usar o conceito **corretamente**, não criativamente. Chame o professor quando travar.
- **Parte 2 — Atividades aplicadas** (para casa): exigem **decisão**, não repetição.
- **Gabaritos**: no final, em seções colapsadas. Tente antes de abrir — abrir cedo é o jeito mais eficiente de não aprender.

> ⚠️ **Aula 1 = só criação do projeto.** Os exercícios 3 a 8 usam um projeto de **sandbox** (`sandbox-app`, comandos abaixo), separado do repositório oficial da disciplina. Nesta aula ainda não usamos `FlatList` nem `SectionList` — isso fica para a Aula 2. O foco aqui é: componentes básicos, tipagem de props e estado de uma **tela com uma única entidade**.

**Setup necessário para os exercícios 3 a 8:**

```bash
node --version              # precisa ser 22.11 ou superior
npx create-expo-app@latest sandbox-app
cd sandbox-app
npx expo start
```

---

# Parte 1 — Exercícios guiados

## Exercício 1 — Associação: plataformas

**Nível:** ⭐ · **Tempo:** 4 min · **Sem computador**

Associe cada plataforma da coluna A ao seu par correto nas colunas B e C.

| # | **A — Plataforma** | | **B — Linguagem/framework oficial** | | **C — Onde roda hoje** |
|---|---|---|---|---|---|
| 1 | Android | ( ) | a. Swift + SwiftUI | ( ) | I. TVs LG, automotivo, 200+ marcas via Hub |
| 2 | iOS | ( ) | b. Web (JS) + Enact *(sobre React)* | ( ) | II. Celulares e tablets Huawei, IoT |
| 3 | HarmonyOS NEXT | ( ) | c. Kotlin + Jetpack Compose | ( ) | III. Smart TVs Samsung, eletrodomésticos, IoT |
| 4 | Tizen | ( ) | d. Web (HTML/CSS/JS) + .NET | ( ) | IV. iPhone, iPad |
| 5 | webOS | ( ) | e. ArkTS + ArkUI | ( ) | V. Celulares de dezenas de fabricantes, tablets, TV, automotivo |

**Depois de responder:**
- Quais plataformas da lista **não rodam mais em celulares**?
- Quais têm **JS/TS** como caminho principal de desenvolvimento?

---

## Exercício 2 — Verdadeiro ou falso, com justificativa

**Nível:** ⭐ · **Tempo:** 5 min · **Sem computador**

Marque V ou F. **Para cada F, escreva a correção em uma frase** — a justificativa é a parte que vale.

| | Afirmação | V/F |
|---|---|---|
| a | HarmonyOS NEXT roda arquivos `.apk` do Android. | |
| b | Os smartwatches Samsung atuais rodam Tizen. | |
| c | O framework de UI oficial do webOS é construído sobre React. | |
| d | ArkTS é uma linguagem sem relação com TypeScript. | |
| e | StatCounter e Counterpoint reportam market shares diferentes porque um deles está errado. | |
| f | Para publicar um app nativo na App Store é necessário um computador com macOS. | |
| g | Em React Native, `<View>` é convertido em uma `<div>` HTML dentro de uma WebView. | |
| h | `npx react-native init` é o comando atual para criar um projeto React Native. | |
| i | A "bridge" assíncrona do React Native foi otimizada na versão 0.84. | |
| j | Em React Native, `flexDirection` tem `'row'` como valor default, igual ao CSS. | |

---

## Exercício 3 — Complete o código: componentes básicos

**Nível:** ⭐ · **Tempo:** 4 min · **No computador**

Este componente tem **três erros** que quebram em runtime ou não compilam. Encontre e corrija.

```tsx
import { View, StyleSheet } from 'react-native';

export default function Cabecalho() {
  return (
    <View style={styles.container}>
      Hábitos de hoje
      <View style={styles.linha}>
        <Text>Total: 5</Text>
        <Text>Concluídos: 2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: '16px' },
  linha: { justifyContent: 'space-between' },
});
```

**Dicas (sem entregar a resposta):**
1. Um erro é sobre **onde** o texto pode ficar.
2. Um erro é sobre **importação**.
3. Um erro é sobre **unidades de medida**.
4. E há uma **quarta** questão: `styles.linha` quer colocar os dois textos lado a lado. Ele consegue?

---

## Exercício 4 — Reproduza: tipando props

**Nível:** ⭐⭐ · **Tempo:** 5 min · **No computador**

Escreva o tipo `CardHabitoProps` para que o componente abaixo compile **sem nenhum `any`**.

```tsx
// ESCREVA O TIPO AQUI
type CardHabitoProps = /* ... */;

export function CardHabito({
  titulo,
  categoria,
  status,
  onPress,
  destacado = false,
}: CardHabitoProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, destacado && styles.destaque]}
    >
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.meta}>{categoria} · {status}</Text>
    </Pressable>
  );
}
```

**Requisitos:**
- `titulo` e `categoria` são textos obrigatórios.
- `status` deve aceitar **apenas** `'pendente'`, `'concluido'` ou `'pulado'`.
- `onPress` é uma função sem parâmetros que não retorna nada.
- `destacado` é **opcional** e booleano.

**Teste sua resposta:** as duas linhas abaixo devem dar **erro de compilação**. Se alguma passar, seu tipo está frouxo.

```tsx
<CardHabito titulo="Beber água" categoria="saude" status="PENDENTE" onPress={() => {}} />
<CardHabito titulo="Beber água" categoria="saude" status="pendente" />
```

---

## Exercício 5 — Complete: exaustividade

**Nível:** ⭐⭐ · **Tempo:** 4 min · **No computador**

```ts
type StatusHabito = 'pendente' | 'concluido' | 'pulado';

function corDoStatus(status: StatusHabito): string {
  switch (status) {
    case 'pendente':   return '#fb8c00';
    case 'concluido':  return '#43a047';
    // COMPLETE os casos restantes
  }
}
```

**Parte A:** complete a função para que ela compile com `strict` ligado.

**Parte B — a parte que importa:** agora adicione `'atrasado'` ao tipo `StatusHabito`, **sem tocar na função**.

- O que acontece?
- **Por que isso é uma coisa boa?** Escreva sua resposta em uma frase.

---

## Exercício 6 — Refatore: união discriminada

**Nível:** ⭐⭐⭐ · **Tempo:** 6 min · **No computador**

O código abaixo funciona, mas permite estados impossíveis. Note que a tela mostra **um único hábito** — o "hábito do dia" — não uma lista.

```tsx
function TelaHabitoDoDia() {
  const [carregando, setCarregando] = useState(true);
  const [habito, setHabito] = useState<Habito | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  if (carregando) return <ActivityIndicator />;
  if (erro) return <Text>{erro}</Text>;
  return <Text>{habito!.titulo}</Text>;
}
```

**Parte A:** cite **dois** estados impossíveis que este código permite representar.

**Parte B:** por que o `habito!` (non-null assertion) foi necessário na última linha? O que ele está escondendo?

**Parte C:** refatore usando um tipo `EstadoTela<T>` com união discriminada. O `!` deve desaparecer.

---

## Exercício 7 — Complete: utility types

**Nível:** ⭐⭐ · **Tempo:** 4 min · **No computador**

```ts
type StatusHabito = 'pendente' | 'concluido' | 'pulado';
type CategoriaHabito = 'saude' | 'produtividade' | 'mentalidade' | 'sono';
type FrequenciaHabito = 'diaria' | 'semanal';

interface Habito {
  id: string;
  titulo: string;
  categoria: CategoriaHabito;
  frequencia: FrequenciaHabito;
  status: StatusHabito;
  streakDias: number;
  criadoEm: string;
}
```

Derive os três tipos abaixo **usando utility types** (`Pick`, `Omit`, `Partial`). Nenhum deles pode repetir campos à mão.

```ts
// 1. Payload do formulário de criação.
//    O servidor gera id, status, streakDias e criadoEm.
type NovoHabito = /* ... */;

// 2. O que o card da tela precisa: id, titulo, status, categoria.
type ResumoHabito = /* ... */;

// 3. Edição parcial de um hábito já existente (qualquer campo editável, ou nenhum).
type AtualizacaoHabito = /* ... */;
```

**Pergunta de fechamento:** você adicionou o campo `lembreteHorario?: string` a `Habito`. Quais dos três tipos derivados precisam ser alterados manualmente? **Por quê essa resposta é o ponto do exercício?**

---

## Exercício 8 — Reproduza: card interativo com estado local

**Nível:** ⭐⭐ · **Tempo:** 8 min · **No computador**

Reproduza o card demonstrado em aula, **sem copiar e colar** — digite. Sem lista, sem `FlatList`: é **um único** hábito, com estado local.

**Requisitos:**
1. Um objeto `MOCK: Habito` com título, categoria, status inicial `'pendente'` e `streakDias: 4`.
2. Um `CardHabito` que mostra título, categoria e o **rótulo legível** do status (`'concluido'` → `"Concluído"`).
3. Tocar no card alterna o status entre `'pendente'` e `'concluido'` (guardado em estado tipado com `useState`).
4. Enquanto o status for `'concluido'`, mostrar `streakDias + 1`; caso contrário, mostrar `streakDias`.
5. Use `StyleSheet.create`. A linha com categoria e status deve ter os dois **lado a lado**.
6. **Zero `any`** no arquivo.

**Verificação final:** rode no celular e toque no card três vezes seguidas. O streak e o rótulo acompanham a alternância?

---

# Parte 2 — Atividades aplicadas

## Atividade 1 — Modelagem e tela do hábito do dia

**Nível:** ⭐⭐⭐ · **Tempo estimado:** 2 a 3 h · **Entrega:** individual ou em dupla · **Prazo:** próxima aula

### Contexto

Você está no time que constrói o **Rastreador de Micro-hábitos e Condicionamento Físico** (ou o **App de Gestão e Rotina Pet**, se for o projeto do seu grupo — troque `Habito` por `Pet` usando a tabela de equivalência no final deste arquivo). O backend ainda não existe. Sua tarefa é construir a **tela do hábito do dia** com dados mockados, mas com o domínio **modelado de verdade**, de modo que a troca do mock pela API real seja quase indolor.

Note que esta tela mostra **uma única entidade em destaque**, não uma lista — listas e `FlatList` chegam na próxima aula.

### O que entregar

**1. Modelagem do domínio** — um arquivo `src/types/habito.ts` contendo:
- `Habito` (entidade completa)
- `StatusHabito`, `CategoriaHabito` e `FrequenciaHabito` como **union types literais** (não `string`)
- `NovoHabito`, `ResumoHabito` e `AtualizacaoHabito` **derivados** com utility types
- `EstadoTela<T>` como **união discriminada**

**2. Camada de dados falsa** — `src/services/habitoService.ts`:
- Uma função `buscarHabitoDoDia(): Promise<Habito>` que devolve **um hábito** mockado, com um atraso artificial de ~1 segundo (para o loading ser visível)
- A função deve ser **assíncrona** e ter o mesmo formato que teria uma chamada HTTP real

**3. Tela do hábito do dia** — usando `EstadoTela<Habito>`:
- Estado de **carregando** → indicador visual
- Estado de **sucesso** → card com título, categoria, status legível, streak e um botão **"Marcar concluído hoje"**
- Estado de **erro** → mensagem legível e um botão "Tentar novamente"
- Ao tocar em "Marcar concluído hoje", o status muda para `'concluido'` (atualização local, sem persistir — isso também é assunto de aula futura)

**4. `README.md`** (complementando o do repositório do projeto) com:
- **Uma decisão de modelagem que você tomou e o motivo** (ex.: por que `type` e não `interface`, por que esse conjunto de status, por que `streakDias` é um número e não uma lista de datas)

### Como testar o estado de erro

Você precisa vê-lo funcionando. Sugestão: faça `buscarHabitoDoDia()` lançar um erro quando uma constante `SIMULAR_ERRO` for `true`. Deixe essa constante no código, comentada, para o professor conseguir testar também.

### Critérios de avaliação

| Critério | Peso | O que se espera |
|---|---|---|
| **Modelagem de tipos** | 30% | Unions literais em vez de `string`; utility types derivando de uma fonte única; união discriminada correta para o estado de tela |
| **Ausência de `any` e de assertions desnecessárias** | 20% | Nenhum `any`. `!` e `as` só com justificativa em comentário |
| **Os três estados funcionam** | 20% | Loading, sucesso e erro visíveis e testáveis de fato |
| **Organização** | 15% | Separação entre `types/`, `services/` e a tela; nomes coerentes |
| **Ação de marcar concluído** | 10% | Funciona e atualiza o estado local corretamente |
| **README** | 5% | A decisão de modelagem explicada |

### O que **não** é avaliado nesta atividade

Beleza visual, animações, navegação entre telas, persistência, listas. Foque na modelagem e nos três estados de uma única entidade.

---

## Atividade 2 — Relatório de decisão de plataforma

**Nível:** ⭐⭐ · **Tempo estimado:** 1 h · **Entrega:** individual · **Formato:** 1 a 2 páginas

### Contexto

Uma **rede de 40 clínicas veterinárias** contratou sua consultoria para um app que ajude tutores a acompanhar a rotina dos pets. Restrições do projeto:

- **Orçamento:** R$ 90 mil, primeira versão
- **Prazo:** 3 meses até o piloto
- **Equipe disponível:** 2 desenvolvedores — ambos com TypeScript e React, **nenhum** com Kotlin ou Swift
- **Público:** tutores de todas as faixas de renda; **65% dos aparelhos do público-alvo são Android de entrada** com menos de 4 GB de RAM
- **Requisitos funcionais que envolvem hardware:**
  - Tirar foto do pet e de documentos (carteira de vacinação)
  - Capturar a localização GPS durante passeios
  - Funcionar com conectividade instável — registrar offline e sincronizar depois
  - Notificar o tutor sobre vacinas e consultas agendadas
- Também é necessário um **painel para as clínicas**, usado em desktop na recepção

### O que entregar

1. **Recomendação de abordagem** para o app do tutor: nativo, cross-platform ou web/PWA. Escolha **uma** e defenda.
2. **Três restrições específicas do enunciado** que sustentam sua escolha. Cite-as explicitamente — não argumente em abstrato.
3. **Análise da abordagem que você rejeitou**: o que a organização perde ao não escolhê-la? Toda decisão tem custo; nomeie o seu.
4. **Recomendação para o painel da clínica.** Deve ser a mesma tecnologia do app do tutor? Justifique.
5. **Um risco técnico concreto** da sua recomendação e como você o mitigaria.
6. **Uma pergunta que você faria ao cliente** antes de fechar a decisão — algo que o enunciado não informa e que poderia mudar sua resposta.

### Critérios de avaliação

| Critério | Peso | O que se espera |
|---|---|---|
| **Argumentação ancorada nas restrições** | 35% | Cita restrições do enunciado, não generalidades sobre tecnologia |
| **Honestidade sobre o trade-off** | 25% | Reconhece o que se perde; não vende a escolha como perfeita |
| **Risco e mitigação** | 20% | Risco plausível e específico, com mitigação viável |
| **Decisão sobre o painel** | 10% | Coerente, com justificativa |
| **Qualidade da pergunta ao cliente** | 10% | Uma pergunta que **realmente** mudaria a decisão |

> **Não existe uma resposta única correta.** Cross-platform é defensável; PWA é defensável em parte; nativo é defensável com ressalvas fortes. O que é avaliado é a **qualidade do raciocínio**, não a coincidência com a opinião do professor.

---

## Atividade 3 — Caça ao material desatualizado *(opcional, bônus)*

**Nível:** ⭐ · **Tempo estimado:** 30 min

Encontre na internet **dois** tutoriais ou artigos de React Native que estejam **factualmente desatualizados**. Para cada um, entregue:

- Link e data de publicação
- **O que exatamente** está desatualizado
- Qual é a informação correta hoje, **com a fonte**

**Sinais de alerta que você aprendeu nesta aula:**
- Usa `npx react-native init`
- Explica a arquitetura em torno da "bridge" assíncrona
- Ensina a **ativar** a New Architecture como se fosse opcional
- Manda instalar Android Studio e Xcode como primeiro passo obrigatório
- Diz que os smartwatches Samsung rodam Tizen
- Trata HarmonyOS como "um Android com outra cara"

**Por que isso vale a pena:** metade da dificuldade de aprender uma tecnologia viva é **filtrar material velho**. Este exercício treina exatamente essa habilidade — e você vai usá-la o semestre inteiro.

---

# Equivalência de domínio — Pet

Se seu grupo ficou responsável pelo **App de Gestão e Rotina Pet**, use esta tabela para adaptar os exercícios 3 a 8 e a Atividade 1 sem mudar a lógica de nenhum deles.

| Habito (usado nos exercícios) | Pet (seu domínio) |
|---|---|
| `Habito` | `Pet` |
| `titulo: string` | `nome: string` |
| `categoria: CategoriaHabito` (`'saude' \| 'produtividade' \| 'mentalidade' \| 'sono'`) | `especie: EspeciePet` (`'cachorro' \| 'gato' \| 'ave' \| 'outro'`) |
| `status: StatusHabito` (`'pendente' \| 'concluido' \| 'pulado'`) | `statusPasseio: StatusPasseio` (`'pendente' \| 'concluido' \| 'cancelado'`) |
| `streakDias: number` | `idadeMeses: number` |
| `CardHabito` | `CardPet` |
| "Hábitos de hoje" | "Meus pets" |
| `buscarHabitoDoDia()` | `buscarPetDoUsuario()` |
| "Marcar concluído hoje" | "Registrar passeio" |

---

# Gabaritos

> Tente todos os exercícios antes de abrir. Sério.

<details>
<summary><b>Gabarito — Exercício 1</b></summary>

| Plataforma | Linguagem/Framework | Onde roda |
|---|---|---|
| 1. Android | **c** — Kotlin + Jetpack Compose | **V** |
| 2. iOS | **a** — Swift + SwiftUI | **IV** |
| 3. HarmonyOS NEXT | **e** — ArkTS + ArkUI | **II** |
| 4. Tizen | **d** — Web + .NET | **III** |
| 5. webOS | **b** — Web + Enact (React) | **I** |

**Não rodam mais em celulares:** Tizen e webOS. Tizen chegou a rodar em smartphones e wearables Samsung, mas foi descontinuado nos dois; webOS nunca teve presença relevante em celular depois da Palm/HP.

**Têm JS/TS como caminho principal:** HarmonyOS (ArkTS, superset de TypeScript), Tizen (apps web) e webOS (apps web + Enact). Três das cinco.

</details>

<details>
<summary><b>Gabarito — Exercício 2</b></summary>

| | V/F | Correção |
|---|---|---|
| a | **F** | HarmonyOS NEXT (= HarmonyOS 5, out/2024) removeu o core AOSP; não há ART nem camada de compatibilidade, e APKs são rejeitados. Só HarmonyOS 4 e anteriores rodavam APK. |
| b | **F** | Desde o Galaxy Watch 4 (2021) os relógios Samsung usam **Wear OS**. O suporte aos modelos Tizen foi encerrado no fim de 2025. |
| c | **V** | **Enact**, framework oficial da LG para webOS, é construído sobre React. |
| d | **F** | **ArkTS é um superset do TypeScript** — estende a linguagem com tipagem estática mais restrita e sintaxe declarativa de UI. |
| e | **F** | Nenhum está errado — eles **medem coisas diferentes**: tráfego web (page views) vs. vendas de aparelhos. StatCounter ainda não desagrega HarmonyOS, o que torna a plataforma invisível nessa metodologia. |
| f | **V** | Xcode só roda em macOS, e desde abr/2026 a App Store exige builds feitos com Xcode 26+. |
| g | **F** | Não há DOM, HTML, CSS nem WebView. `<View>` se torna um `ViewGroup` no Android e um `UIView` no iOS — **componentes nativos reais**. |
| h | **F** | Depreciado na 0.75 e **removido na 0.77** (jan/2025). Hoje: `npx create-expo-app@latest` (recomendado) ou `npx @react-native-community/cli@latest init`. |
| i | **F** | Não foi otimizada — a arquitetura legada foi **removida** na 0.84 (fev/2026). A bridge não existe mais; a comunicação é via **JSI**. |
| j | **F** | Em React Native o default é **`'column'`**. Para dispor em linha é preciso declarar `flexDirection: 'row'` explicitamente. |

</details>

<details>
<summary><b>Gabarito — Exercício 3</b></summary>

Quatro problemas:

1. **`Text` não foi importado.**
2. **Texto solto dentro de `<View>`** — `Hábitos de hoje` quebra em runtime com `Text strings must be rendered within a <Text> component`.
3. **`padding: '16px'`** — valores numéricos de estilo não levam unidade em React Native. São *density-independent pixels*.
4. **`styles.linha` não coloca os textos lado a lado** — falta `flexDirection: 'row'`, porque o default é `'column'`. Sem isso, `justifyContent: 'space-between'` distribui no eixo **vertical**, não horizontal.

```tsx
import { View, Text, StyleSheet } from 'react-native';   // (1)

export default function Cabecalho() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Hábitos de hoje</Text>  {/* (2) */}
      <View style={styles.linha}>
        <Text>Total: 5</Text>
        <Text>Concluídos: 2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },                              // (3)
  titulo: { fontSize: 20, fontWeight: 'bold' },
  linha: { flexDirection: 'row', justifyContent: 'space-between' },  // (4)
});
```

</details>

<details>
<summary><b>Gabarito — Exercício 4</b></summary>

```tsx
type StatusHabito = 'pendente' | 'concluido' | 'pulado';

type CardHabitoProps = {
  titulo: string;
  categoria: string;
  status: StatusHabito;
  onPress: () => void;
  destacado?: boolean;
};
```

**Por que os dois testes falham (como deveriam):**

- `status="PENDENTE"` → `"PENDENTE"` não pertence à união `StatusHabito`. Erro de compilação.
- Segundo caso → falta `onPress`, que é obrigatória. Erro de compilação.

**Erro comum de quem faz este exercício:** escrever `status: string`. Compila, o teste passa, e o exercício foi perdido. O objetivo era **restringir** o conjunto de valores possíveis.

**Segundo erro comum:** `onPress: Function`. Funciona, mas não diz nada sobre parâmetros ou retorno — é quase um `any` para funções. Prefira `() => void`.

</details>

<details>
<summary><b>Gabarito — Exercício 5</b></summary>

**Parte A:**

```ts
function corDoStatus(status: StatusHabito): string {
  switch (status) {
    case 'pendente':   return '#fb8c00';
    case 'concluido':  return '#43a047';
    case 'pulado':     return '#9e9e9e';
  }
}
```

Não é necessário um `default`: como todos os membros da união estão cobertos, o TypeScript entende que a função sempre retorna `string`.

**Parte B:** ao adicionar `'atrasado'` ao tipo, a função passa a dar **erro de compilação** — algo como *"Function lacks ending return statement and return type does not include 'undefined'"*. O `switch` deixou de ser exaustivo, e agora existe um caminho que retorna `undefined`.

**Por que isso é bom:** porque a mudança no tipo **encontrou automaticamente todos os lugares do código que precisam ser atualizados**. Com `status: string`, a mesma mudança compilaria em silêncio e o hábito atrasado apareceria na interface sem cor — um bug descoberto pelo usuário, não pelo compilador.

**Padrão útil para tornar isso explícito:**

```ts
function corDoStatus(status: StatusHabito): string {
  switch (status) {
    case 'pendente':   return '#fb8c00';
    case 'concluido':  return '#43a047';
    case 'pulado':     return '#9e9e9e';
    default: {
      const naoTratado: never = status;   // 🔴 erro se faltar um caso
      throw new Error(`Status não tratado: ${naoTratado}`);
    }
  }
}
```

O truque: se algum membro da união não foi tratado, `status` não é `never` no `default`, e a atribuição falha. Dá uma mensagem de erro bem mais clara.

</details>

<details>
<summary><b>Gabarito — Exercício 6</b></summary>

**Parte A — dois estados impossíveis (entre vários):**

1. `carregando = true` **e** `erro = "Falha na rede"` — está carregando e falhou ao mesmo tempo.
2. `carregando = false`, `erro = null`, `habito = null` — terminou, não deu erro, e não há dados. A tela tenta acessar `habito!.titulo` de um valor que é `null`.
3. `erro = "Falha"` **e** `habito = {...}` preenchido — deu erro mas tem dados; qual é a verdade?

O problema estrutural: **três variáveis independentes geram 2 × 3 × 2 = 12 combinações**, das quais só 3 fazem sentido. As outras 9 são bugs esperando acontecer.

**Parte B:** o `!` foi necessário porque o tipo de `habito` é `Habito | null`, e o compilador **não tem como saber** que, tendo passado pelos dois `if`, `habito` já não é `null` — essa garantia existe só na cabeça de quem escreveu. O `!` está escondendo justamente o estado impossível nº 2 da Parte A. Ele não corrige o problema; **silencia o aviso sobre ele**.

**Parte C:**

```tsx
type EstadoTela<T> =
  | { tipo: 'carregando' }
  | { tipo: 'sucesso'; dados: T }
  | { tipo: 'erro'; mensagem: string };

function TelaHabitoDoDia() {
  const [estado, setEstado] = useState<EstadoTela<Habito>>({ tipo: 'carregando' });

  useEffect(() => {
    buscarHabitoDoDia()
      .then((dados) => setEstado({ tipo: 'sucesso', dados }))
      .catch((e: unknown) => setEstado({
        tipo: 'erro',
        mensagem: e instanceof Error ? e.message : 'Erro desconhecido',
      }));
  }, []);

  switch (estado.tipo) {
    case 'carregando':
      return <ActivityIndicator />;
    case 'erro':
      return <Text>{estado.mensagem}</Text>;
    case 'sucesso':
      return <Text>{estado.dados.titulo}</Text>;   // ✅ sem `!` — o tipo garante
  }
}
```

Três estados possíveis, exatamente três. O `!` desapareceu porque dentro do `case 'sucesso'` o TypeScript **sabe** que `dados` existe e não é `null`.

Note também o `catch (e: unknown)` com `e instanceof Error`: em JavaScript é possível lançar qualquer coisa, então `unknown` + narrowing é mais honesto que assumir `Error`.

</details>

<details>
<summary><b>Gabarito — Exercício 7</b></summary>

```ts
type NovoHabito = Omit<Habito, 'id' | 'status' | 'streakDias' | 'criadoEm'>;

type ResumoHabito = Pick<Habito, 'id' | 'titulo' | 'status' | 'categoria'>;

type AtualizacaoHabito = Partial<NovoHabito>;
```

**Sobre `AtualizacaoHabito`:** derivar de `NovoHabito` (e não de `Habito`) é o mais correto, porque assim os campos gerados pelo servidor — `id`, `status`, `streakDias`, `criadoEm` — continuam fora do alcance da edição. `Partial<Habito>` permitiria tentar reescrever o `id`.

**Pergunta de fechamento:** ao adicionar `lembreteHorario?: string` a `Habito`, **nenhum** dos três tipos precisa de alteração manual:

- `NovoHabito` passa a incluir `lembreteHorario` automaticamente — que é o correto, já que o formulário pode enviar o horário do lembrete.
- `AtualizacaoHabito` acompanha, por derivar de `NovoHabito`.
- `ResumoHabito` continua com os mesmos 4 campos — também correto, o card não mostra o lembrete.

**E esse é o ponto do exercício.** Se você tivesse escrito quatro interfaces à mão, teria quatro lugares para lembrar de atualizar — e esquecer um deles é um bug que o compilador não pega, porque um tipo desatualizado ainda é um tipo válido. Com tipos derivados, existe **uma** fonte de verdade.

</details>

<details>
<summary><b>Gabarito — Exercício 8</b></summary>

Uma solução possível — `App.tsx`:

```tsx
import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type StatusHabito = 'pendente' | 'concluido' | 'pulado';
type CategoriaHabito = 'saude' | 'produtividade' | 'mentalidade' | 'sono';

interface Habito {
  id: string;
  titulo: string;
  categoria: CategoriaHabito;
  status: StatusHabito;
  streakDias: number;
}

function rotuloStatus(status: StatusHabito): string {
  switch (status) {
    case 'pendente':   return 'Pendente';
    case 'concluido':  return 'Concluído';
    case 'pulado':     return 'Pulado';
  }
}

const MOCK: Habito = {
  id: '1',
  titulo: 'Beber 2L de água',
  categoria: 'saude',
  status: 'pendente',
  streakDias: 4,
};

export default function App() {
  const [status, setStatus] = useState<StatusHabito>(MOCK.status);

  const concluido = status === 'concluido';
  const streakExibido = concluido ? MOCK.streakDias + 1 : MOCK.streakDias;

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.card}
        onPress={() => setStatus(concluido ? 'pendente' : 'concluido')}
      >
        <Text style={styles.titulo}>{MOCK.titulo}</Text>
        <View style={styles.linha}>
          <Text style={styles.meta}>{MOCK.categoria}</Text>
          <Text style={styles.meta}>{rotuloStatus(status)}</Text>
        </View>
        <Text style={styles.streak}>🔥 {streakExibido} dias seguidos</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, padding: 16, paddingTop: 48, backgroundColor: '#fff' },
  card:       { padding: 16, borderRadius: 8, backgroundColor: '#f2f2f2' },
  titulo:     { fontSize: 18, fontWeight: '600' },
  linha:      { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  meta:       { fontSize: 12, color: '#666' },
  streak:     { marginTop: 8, fontStyle: 'italic' },
});
```

**Detalhes que valem atenção:**

- `flexDirection: 'row'` em `linha` — sem isso, categoria e status ficam empilhados.
- `paddingTop: 48` evita a barra de status. Em projeto real, use `SafeAreaView` ou `useSafeAreaInsets`.
- `rotuloStatus` centraliza a tradução dos rótulos. Espalhar `if`s pelo JSX funciona, mas cada tela passa a ter sua própria versão da verdade.
- Nenhuma lista foi usada — o toque alterna o estado de **um** card, o que é suficiente para praticar `useState` tipado sem introduzir `FlatList` ainda.

</details>

---

## Resumo de tempos

| Parte | Onde | Tempo |
|---|---|---|
| Exercícios 1 e 2 | Sala, sem computador | ~9 min |
| Exercícios 3 a 8 | Sala, no computador | ~31 min |
| Atividade 1 | Casa | 2–3 h |
| Atividade 2 | Casa | ~1 h |
| Atividade 3 *(bônus)* | Casa | ~30 min |

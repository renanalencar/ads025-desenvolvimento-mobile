# Exercícios e Atividades — Aula 3 (domínio Hábito)

> **Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School
> **Domínio deste arquivo:** Rastreador de Micro-hábitos e Condicionamento Físico (`Habito`).
> **Está no outro projeto?** Se o seu app é o **App de Gestão e Rotina Pet**, use o arquivo `practice.md` — mesma estrutura, mesmos conceitos, domínio `Pet`.

| Projeto | Repositório | Branch da disciplina |
|---|---|---|
| Rastreador de Micro-hábitos e Condicionamento Físico | `habit-tracker-expo` | `feature/aula_03` |

## Como usar este arquivo

- **Parte 1 — Exercícios guiados** (em sala, ~25 min): foco em **acurácia**. São propositalmente simples. O objetivo é usar o conceito **corretamente**, não criativamente. Chame o professor quando travar.
- **Parte 2 — Atividades aplicadas** (para casa): exigem **decisão**, não repetição.
- **Todo exercício vem com um scaffold** — um esqueleto de código com marcações `// TODO`. Você completa os trechos que faltam; não precisa escrever do zero, e não deve apagar a estrutura dada.
- **Gabaritos**: no final, em seções colapsadas. Tente antes de abrir — abrir cedo é o jeito mais eficiente de não aprender.

> 🧩 **Como usar os scaffolds:** a estrutura do arquivo, os imports e os nomes dos estilos já estão lá — o que falta é o miolo, que é onde está o conceito da aula. **Apague o comentário `// TODO` quando resolver aquele ponto.** Um arquivo sem nenhum `TODO` é um exercício concluído, e é assim que o professor confere rápido quem parou onde.

> 📦 **Componentes desta aula** — use **somente** estes sete: `View`, `ScrollView`, `Text`, `TextInput`, `Image`, `Button`, `Switch`, mais `StyleSheet` e Flexbox. Componentes de toque estilizáveis e componentes de lista **não são assunto desta aula** e não devem aparecer nas entregas. Onde precisar de interação: `onPress` no `Button`, `onPress` no `Text`, `onChangeText` no `TextInput`, `onValueChange` no `Switch`.

> ⚠️ **Regras de escrita válidas para todos os exercícios** — são exatamente os pontos que material antigo ensina errado:
> 1. **Sem `JSX.Element`** como tipo de retorno. Não anote o retorno; o TypeScript infere.
> 2. **Sem `as const`** dentro de `StyleSheet.create`. Em `theme.ts`, sim.
> 3. **`gap`** para espaçar irmãos, não `margin` em cada filho.
> 4. **`boxShadow`** para sombra, não o quarteto `shadow*` + `elevation`.
> 5. **Zero `any`.**

**Setup dos exercícios 3 a 6** (projeto de sandbox, descartável — os exercícios 1 e 2 são no papel):

```bash
npx create-expo-app@latest sandbox-aula3
cd sandbox-aula3
npm run reset-project
npx expo start
```

**Setup da Atividade Aplicada 1** (seu projeto de verdade):

```bash
git clone <url-do-seu-repositorio> habit-tracker-expo
cd habit-tracker-expo
git checkout feature/aula_03
npm install
npx expo start
```

---

# Parte 1 — Exercícios guiados

## Exercício 1 — Associação: qual componente usar

**Nível:** ⭐ · **Tempo:** 3 min · **Sem computador**

Associe cada necessidade ao componente correto. Cada componente é usado **uma vez**.

| # | **Necessidade** | | **Componente** |
|---|---|---|---|
| 1 | Um formulário de 8 campos que não cabe na tela | ( ) | a. `Text` |
| 2 | Uma ação de "salvar" com a aparência do sistema | ( ) | b. `Switch` |
| 3 | Agrupar dois textos lado a lado | ( ) | c. `ScrollView` |
| 4 | Mostrar o nome do hábito | ( ) | d. `TextInput` |
| 5 | Ligar/desligar o lembrete diário | ( ) | e. `View` |
| 6 | Capturar o título digitado pelo usuário | ( ) | f. `Image` |
| 7 | Exibir a foto de perfil vinda de uma URL | ( ) | g. `Button` |

### Esqueleto da resposta

Preencha a linha abaixo (uma letra por número) e depois responda às três perguntas:

```text
1 → ___    2 → ___    3 → ___    4 → ___    5 → ___    6 → ___    7 → ___

a) Item 2 — as quatro props do componente são: ______________________________
   Se eu passar `style` para ele, acontece: _________________________________

b) Item 7 — as duas propriedades de estilo obrigatórias são: _________________
   São obrigatórias porque: _________________________________________________

c) Os dois componentes que reagem ao toque nesta aula são: ___________ e ___________
```

---

## Exercício 2 — Caça ao erro

**Nível:** ⭐ · **Tempo:** 5 min · **Sem computador**

Este componente tem **cinco** problemas: alguns quebram em runtime, alguns não compilam, e alguns compilam e rodam mas produzem o layout errado. Encontre todos.

```tsx
import { View, StyleSheet } from 'react-native';

export default function CabecalhoHabitos(): JSX.Element {
  return (
    <View style={styles.container}>
      Hábitos de hoje
      <View style={styles.linha}>
        <Text style={styles.meta}>Total: 5</Text>
        <Text style={styles.meta}>Concluídos: 2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: '16px',
    fontSize: 20,
  },
  linha: {
    justifyContent: 'space-between' as const,
  },
  meta: {
    fontSize: 12,
  },
});
```

**Dicas (sem entregar a resposta):**
1. Um problema é sobre **importação**.
2. Um é sobre **onde** o texto pode ficar.
3. Um é sobre **unidade de medida**.
4. Um é sobre um tipo que **não existe mais**.
5. Dois são sobre **estilo que não faz o que parece** — um deles envolve herança, o outro envolve eixo.

*(São 6 achados no total; um dos itens acima cobre dois problemas.)*

### Esqueleto da correção

Reescreva o componente aqui. Cada `TODO` marca um dos achados:

```tsx
// TODO 1: a lista de imports está incompleta. O que falta?
import { View, StyleSheet } from 'react-native';

// TODO 2: a anotação de retorno usa um tipo que o React 19 removeu.
//         Qual é a forma correta hoje? (dica: a mais curta é não anotar)
export default function CabecalhoHabitos() {
  return (
    <View style={styles.container}>
      {/* TODO 3: este texto está solto dentro de uma View. Onde ele precisa ficar? */}
      Hábitos de hoje

      <View style={styles.linha}>
        <Text style={styles.meta}>Total: 5</Text>
        <Text style={styles.meta}>Concluídos: 2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // TODO 4: a unidade está errada. Como se escreve 16 aqui?
    padding: '16px',
    // TODO 5: este fontSize não chega em Text nenhum. Por quê? Para onde ele deve ir?
    fontSize: 20,
  },
  linha: {
    // TODO 6: falta a propriedade que faz os dois textos ficarem lado a lado.
    //         Sem ela, o justifyContent abaixo está agindo no eixo errado.
    justifyContent: 'space-between' as const,   // TODO 7: e este `as const`, é necessário aqui?
  },
  meta: {
    fontSize: 12,
  },
});
```

**Anote também, em uma linha cada:** qual dos achados **quebra em runtime**, qual **não compila**, e quais **compilam, rodam e mesmo assim estão errados**. Os do terceiro grupo são os que custam caro.

---

## Exercício 3 — Reproduza: o `Card` com sombra e espaçamento modernos

**Nível:** ⭐⭐ · **Tempo:** 7 min · **No computador**

Crie um componente `CardHabito` que receba `titulo` e `descricao` como props.

**Requisitos:**
1. Props tipadas com `type CardHabitoProps`. Sem `any`, sem `JSX.Element`.
2. Fundo branco, `borderRadius: 12`, `padding: 16`.
3. Sombra usando **`boxShadow`** — uma linha, não cinco props.
4. Espaço entre o título e a descrição usando **`gap`**, não `margin`.
5. Título com `fontSize: 18` e `fontWeight: '600'`; descrição com `fontSize: 14` e cor `#666`.

### Esqueleto

```tsx
// components/card-habito.tsx
import { View, Text, StyleSheet } from 'react-native';

// TODO 1: declare o type das props — `titulo` e `descricao`, ambos string. Sem `any`.
type CardHabitoProps = {
  // ...
};

// TODO 2: NÃO anote o tipo de retorno. O TypeScript infere.
export function CardHabito({ /* TODO 3: desestruture as props aqui */ }: CardHabitoProps) {
  return (
    <View style={styles.card}>
      {/* TODO 4: o título, dentro de um <Text style={styles.titulo}> */}
      {/* TODO 5: a descrição, dentro de um <Text style={styles.descricao}> */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    // TODO 6: fundo branco, borderRadius 12, padding 16
    // TODO 7: sombra — UMA propriedade só (não o quarteto shadow* + elevation)
    // TODO 8: espaço entre o título e a descrição — sem usar margin
  },
  titulo: {
    // TODO 9: fontSize 18, fontWeight '600'
  },
  descricao: {
    // TODO 10: fontSize 14, cor '#666'
  },
});
```

### Teste (na tela onde você for renderizar)

```tsx
import { View, StyleSheet } from 'react-native';
import { CardHabito } from '@/components/card-habito';

export default function TelaHabitos() {
  return (
    <View style={styles.lista}>
      <CardHabito titulo="Beber 2L de água" descricao="Meta diária" />
      <CardHabito titulo="Caminhar 30 min" descricao="Depois do almoço" />
    </View>
  );
}

const styles = StyleSheet.create({
  lista: {
    padding: 16,
    // TODO 11: rode PRIMEIRO sem gap — os dois cards ficam colados.
    //          Só então acrescente o gap aqui e compare.
    //          Pergunta: por que o gap vai NESTE contêiner e não dentro do card?
  },
});
```

---

## Exercício 4 — Previsão: Flexbox no papel

**Nível:** ⭐⭐ · **Tempo:** 5 min · **Papel primeiro, computador depois**

Para cada bloco, **desenhe no papel** o que você espera ver **antes** de rodar. Depois rode e compare.

```tsx
// A
container: { flex: 1, justifyContent: 'space-between' }
// três Views de 50x50 dentro

// B
container: { flex: 1, flexDirection: 'row', justifyContent: 'space-between' }
// três Views de 50x50 dentro

// C
container: { justifyContent: 'center', alignItems: 'center' }
// uma View de 50x50 dentro   ← atenção: o container NÃO tem flex: 1

// D
container: { flex: 1, flexDirection: 'row' }
// filhos: { flexGrow: 2 }, { flexGrow: 1 }, { flexGrow: 1 }

// E
container: { flexDirection: 'row' }
// filho único: { backgroundColor: 'red', height: 40 }   ← sem width
```

### Esqueleto — o laboratório

Cole este arquivo no projeto. Para testar cada caso, troque **uma** linha: o `styles.a` da `View` externa.

```tsx
// app/flexbox-lab.tsx  — arquivo descartável, apague depois
import { View, StyleSheet } from 'react-native';

export default function FlexboxLab() {
  return (
    // TODO: troque styles.a por styles.b, styles.c, styles.d, styles.e
    <View style={styles.a}>
      <View style={styles.caixa} />
      <View style={styles.caixa} />
      <View style={styles.caixa} />
    </View>
  );
}

const styles = StyleSheet.create({
  caixa: { width: 50, height: 50, backgroundColor: '#FF6002' },

  a: { flex: 1, justifyContent: 'space-between' },
  b: { flex: 1, flexDirection: 'row', justifyContent: 'space-between' },
  c: { justifyContent: 'center', alignItems: 'center' },   // ← repare: SEM flex: 1
  d: { flex: 1, flexDirection: 'row' },                    // ← ver ajuste abaixo
  e: { flexDirection: 'row' },                             // ← ver ajuste abaixo
});
```

Dois casos exigem mudar também os filhos:

```tsx
// Para o caso D — três filhos com proporções diferentes:
<View style={styles.d}>
  <View style={[styles.caixa, { flexGrow: 2 }]} />
  <View style={[styles.caixa, { flexGrow: 1 }]} />
  <View style={[styles.caixa, { flexGrow: 1 }]} />
</View>

// Para o caso E — UM filho só, com altura mas SEM width:
<View style={styles.e}>
  <View style={{ backgroundColor: 'red', height: 40 }} />
</View>
```

### Esqueleto da previsão

Preencha **antes** de rodar. Depois rode e preencha a última coluna.

| Caso | Minha previsão (desenho + 1 frase) | O que aconteceu de fato |
|---|---|---|
| A | | |
| B | | |
| C | | |
| D | | |
| E | | |

**A parte que importa:** em **C** e em **E** o resultado surpreende a maioria. Escreva uma frase para cada:

```text
C acontece isso porque: ______________________________________________________

E acontece isso porque: ______________________________________________________

A regra que os dois casos compartilham, na minha própria formulação:
_____________________________________________________________________________
```

---

## Exercício 5 — Complete: estilo condicional ligado ao estado

**Nível:** ⭐⭐ · **Tempo:** 7 min · **No computador**

Complete o componente para que:

1. Tocar no **título** alterne entre concluído e pendente.
2. Quando concluído, o **card** ganhe fundo verde-claro **e** o título fique riscado.
3. O `Switch` de lembrete funcione de verdade (mexer nele muda o estado).
4. O `Button` mostre `"Desmarcar"` quando concluído e `"Marcar concluído"` quando pendente.

### Esqueleto

```tsx
// components/card-habito-interativo.tsx
import { useState } from 'react';
import { View, Text, Switch, Button, StyleSheet } from 'react-native';

export default function CardHabito() {
  const [concluido, setConcluido] = useState(false);
  const [lembrete, setLembrete] = useState(false);

  // TODO 1: inverta o estado. Use a forma de função — o novo valor deriva do anterior.
  const alternar = () => { /* ... */ };

  return (
    // TODO 2: array de estilos — o base SEMPRE, o `cardConcluido` só quando concluído.
    //         Cuidado: com ternário você TROCA o estilo; com array você SOMA.
    <View style={/* ... */}>
      <Text
        // TODO 3: mesma ideia — styles.titulo + styles.tituloConcluido condicional
        style={/* ... */}
        // TODO 4: o que dispara a alternância no toque?
        onPress={/* ... */}
      >
        Beber 2L de água
      </Text>

      <View style={styles.linha}>
        <Text style={styles.rotulo}>Lembrete diário</Text>
        {/* TODO 5: ligue o Switch ao estado `lembrete`.
            Lembre: sem `value`, ele volta sozinho ao valor anterior. */}
        <Switch value={/* ... */} onValueChange={/* ... */} />
      </View>

      {/* TODO 6: 'Desmarcar' quando concluído, 'Marcar concluído' quando pendente */}
      <Button title={/* ... */} onPress={alternar} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    gap: 8,
  },
  cardConcluido: { backgroundColor: '#f2f8f2' },
  titulo: { fontSize: 18, fontWeight: '600' },
  tituloConcluido: { textDecorationLine: 'line-through', color: '#6b6459' },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rotulo: { fontSize: 14 },
});
```

**Duas perguntas de fechamento:**
1. Um único estado (`concluido`) produz **dois** efeitos visuais. Como o array de estilos permite isso sem nenhum `if` no JSX?
2. Você tentou passar `style={styles.card}` para o `<Button>` e não aconteceu nada. Por quê?

---

## Exercício 6 — Corrija: a grade que não fecha

**Nível:** ⭐⭐ · **Tempo:** 5 min · **No computador**

Este layout deveria ser uma grade de 3 colunas, com espaçamento uniforme. Ele não fica uniforme. Corrija **sem usar `margin`**.

### Esqueleto — o código quebrado, pronto para rodar

```tsx
// app/grade-lab.tsx — arquivo descartável, apague depois
import { View, StyleSheet } from 'react-native';

const CELULAS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function GradeLab() {
  return (
    <View style={styles.grade}>
      {CELULAS.map((n) => (
        <View key={n} style={styles.celula} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    // TODO 1: a propriedade que espaça irmãos entra AQUI. Qual é?
  },
  celula: {
    // TODO 2: com `gap` no pai, três células de '30%' ainda cabem na linha?
    //         Faça a conta antes de mexer. Se não couberem, há duas saídas —
    //         uma ajusta a largura, a outra deixa o flex calcular. Prefira a segunda.
    width: '30%',
    height: 100,
    backgroundColor: '#F3E9DC',
    // TODO 3: remova o margin. Ele é a causa do espaçamento irregular.
    margin: 5,
  },
});
```

> 💡 O `map` acima é só para gerar nove caixas de teste sem digitar nove vezes — **não** é renderização de lista, que não é assunto desta aula.

**Duas perguntas:**
1. Por que o espaçamento com `margin: 5` **não** é uniforme entre o vão interno e a borda?
2. Depois de trocar por `gap`, quantas células cabem por linha? Se não couberem 3, ajuste a largura e explique a conta.

---

# Parte 2 — Atividades aplicadas

## Atividade 1 — Estilizar de verdade a tela do projeto

**Nível:** ⭐⭐⭐ · **Tempo estimado:** 3 a 4 h · **Entrega:** individual ou em dupla · **Prazo:** próxima aula

### Contexto

Na Aula 1 vocês modelaram o domínio; na Aula 2, fizeram a tela funcionar com lista e navegação. Ela **funciona** e está **feia** — e o código de estilo está espalhado em objetos inline. Esta atividade fecha esse ciclo: a tela fica apresentável **e** o estilo fica sustentável.

### O que entregar

**1. Sistema de tokens** — `src/theme.ts`:
- `cores` (mínimo: fundo, cartão, texto, textoFraco, primária, sucesso, erro)
- `espaco` (escala de no mínimo 4 valores: xs, sm, md, lg)
- `tipografia` (mínimo: titulo, corpo, legenda)
- Todos com `as const`, e **nenhum layout pronto** (`container`, `card`, `button` não entram aqui)

**2. Componente `Card` reutilizável** — `src/components/Card.tsx`:
- Props tipadas, `children: React.ReactNode`
- Aceita uma prop opcional `destacado?: boolean` que muda a aparência via **array de estilos**
- Sombra com `boxShadow`, espaçamento interno com `gap`
- Consome os tokens do `theme.ts` — nenhum valor de cor ou espaço escrito à mão

**3. Um formulário** — tela de criar/editar `Habito`:
- Dentro de um `ScrollView`, com o `padding` no lugar **correto**
- Ao menos dois `TextInput` controlados (`value` + `onChangeText`), com borda visível
- Ao menos um `Switch` controlado (ex.: "lembrete diário")
- Um `Button` de submissão que fica **desabilitado** enquanto o título estiver vazio (`disabled={titulo.trim() === ''}`)
- O `Button` embrulhado numa `View` estilizada com os tokens — já que ele não aceita `style`
- Ao menos um estilo condicional ligado ao estado (ex.: a borda do `TextInput` fica vermelha quando o campo está vazio, ou o card muda de fundo quando o `Switch` está ligado)

**4. Um layout Flexbox não trivial** em alguma tela:
- Uma linha com informação nas duas pontas (`justifyContent: 'space-between'`), **ou**
- Uma grade com `flexWrap` + `gap`
- Espaçamento entre irmãos **só** com `gap`

### Esqueletos para começar

Os três arquivos abaixo são o ponto de partida. **Nenhum deles está completo** — cada `TODO` é uma decisão sua.

```tsx
// theme.ts — TOKENS: valores, nunca layouts prontos
export const cores = {
  fundo: '#FEF7EE',
  cartao: '#FFFFFF',
  // TODO 1: complete com texto, textoFraco, primaria, sucesso, erro
} as const;

export const espaco = {
  // TODO 2: escala de no mínimo 4 degraus (xs, sm, md, lg).
  //         Escolha uma progressão e seja consistente — 4/8/16/24 é um bom default.
} as const;

export const tipografia = {
  // TODO 3: titulo, corpo, legenda. Cada um é um objeto de estilo de TEXTO.
  //         A legenda pode reaproveitar `cores.textoFraco`.
} as const;

// TODO 4: por que este arquivo usa `as const` e o StyleSheet.create do componente NÃO usa?
//         Responda em um comentário de uma linha aqui mesmo.
```

```tsx
// components/card.tsx — componente reutilizável
import { type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

import { cores, espaco } from '@/theme';

type CardProps = {
  children: ReactNode;
  // TODO 5: a prop opcional que muda a aparência do card
};

export function Card({ children, /* TODO 6 */ }: CardProps) {
  // TODO 7: array de estilos — base sempre, variante só quando a prop for true
  return <View style={/* ... */}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    // TODO 8: padding, borderRadius e backgroundColor — TODOS vindos dos tokens.
    //         Nenhum hex e nenhum número solto neste arquivo.
    // TODO 9: sombra com boxShadow (uma linha) e espaçamento interno com gap
  },
  cardDestacado: {
    // TODO 10: o que muda no destaque? Borda? Fundo? Escolha e justifique no README.
  },
});
```

```tsx
// app/habito-form.tsx — o formulário
import { useState } from 'react';
import { ScrollView, View, Text, TextInput, Switch, Button, StyleSheet } from 'react-native';

import { cores, espaco, tipografia } from '@/theme';

export default function HabitoForm() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [lembrete, setLembrete] = useState(false);

  // TODO 11: o formulário é válido quando o título não está vazio (sem contar espaços)
  const tituloVazio = /* ... */;

  return (
    <ScrollView
      style={styles.tela}
      // TODO 12: qual das duas props recebe o padding do conteúdo?
      contentContainerStyle={/* ... */}
    >
      <Text style={styles.rotulo}>Título</Text>
      {/* TODO 13: input controlado (value + onChangeText).
          TODO 14: array de estilos — borda vermelha quando `tituloVazio`. */}
      <TextInput style={/* ... */} value={/* ... */} onChangeText={/* ... */} />

      <Text style={styles.rotulo}>Descrição</Text>
      {/* TODO 15: o segundo input controlado */}
      <TextInput style={styles.input} />

      <View style={styles.linha}>
        <Text style={styles.rotulo}>Lembrete diário</Text>
        {/* TODO 16: o Switch controlado */}
        <Switch />
      </View>

      {/* TODO 17: o Button não aceita style — envolva-o numa View estilizada.
          TODO 18: desabilite enquanto o título estiver vazio. */}
      <View style={styles.areaBotao}>
        <Button title="Salvar" onPress={() => {}} color={cores.primaria} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    // TODO 19: flex e cor de fundo (dos tokens)
  },
  conteudo: {
    // TODO 20: padding e gap — daqui saem TODOS os espaçamentos do formulário.
    //          Se você precisar de margin em algum filho, algo está errado.
  },
  input: {
    borderWidth: 1,
    // TODO 21: borderColor, borderRadius, padding e fontSize — tudo dos tokens
  },
  inputInvalido: {
    // TODO 22: só o que MUDA em relação ao input normal. Não repita o resto.
  },
  linha: {
    // TODO 23: os dois filhos nas pontas, alinhados verticalmente
  },
  rotulo: tipografia.corpo,
  areaBotao: {
    borderRadius: 8,
    overflow: 'hidden',
    // TODO 24: margin AQUI é legítima. Por quê? (é espaço em volta do grupo)
  },
});
```

> ⚠️ **O esqueleto não é a entrega.** Ele economiza digitação e fixa a estrutura de arquivos; a nota está nas decisões que preenchem os `TODO`. Entregar o esqueleto com os `TODO` intactos vale zero.

**5. `README.md`** (complementando o do repositório) com:
- **Uma decisão de organização de estilo que você tomou e o motivo.** Ex.: por que tal estilo virou token e tal outro ficou local; por que você extraiu (ou não) um arquivo de estilos irmão.
- **Um print da tela** antes e depois.

### Restrições (é aqui que a nota se decide)

- ❌ Nenhum `JSX.Element`
- ❌ Nenhum `as const` dentro de `StyleSheet.create`
- ❌ Nenhum `margin` usado para espaçar irmãos (use `gap`)
- ❌ Nenhum quarteto `shadowColor`/`shadowOffset`/`shadowOpacity`/`shadowRadius`
- ❌ Nenhum componente fora dos sete da aula (`View`, `ScrollView`, `Text`, `TextInput`, `Image`, `Button`, `Switch`)
- ❌ Nenhum `any`
- ❌ Nenhuma cor ou espaçamento em **hex/número mágico** dentro de um componente — tudo vem do `theme.ts`

### Critérios de avaliação

| Critério | Peso | O que se espera |
|---|---|---|
| **Tokens bem desenhados** | 25% | São **valores**, não layouts; escala de espaço coerente; usados de fato em todos os componentes |
| **Uso correto de Flexbox** | 20% | Eixo correto, `flex: 1` onde necessário, `gap` no lugar de `margin` |
| **Componente `Card` reutilizável** | 20% | Props tipadas, `destacado` via array de estilos, sem valores mágicos |
| **Formulário funcional** | 20% | Inputs controlados, `Switch` funcionando, `contentContainerStyle` correto, botão desabilitado quando deve |
| **Respeito às restrições** | 10% | Cada item da lista acima que aparecer no código desconta |
| **README com a decisão explicada** | 5% | Uma decisão real, com motivo — não "usei tokens porque é melhor" |

### O que **não** é avaliado

Talento artístico. Não precisa ser bonito no sentido de design gráfico — precisa ser **coerente**: mesmos espaçamentos, mesmas cores, mesma tipografia em toda parte. Consistência é o que se está medindo.

---

## Atividade 2 — Auditoria de estilo em código alheio

**Nível:** ⭐⭐ · **Tempo estimado:** 1 h · **Entrega:** individual · **Formato:** 1 a 2 páginas

### Contexto

Você entrou num time que mantém um app React Native de dois anos atrás. Seu tech lead pede uma **auditoria da camada de estilo** antes de vocês começarem a mexer.

Abaixo está um trecho representativo do código que você encontrou.

```tsx
import React from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import globalStyles from '../styles/globalStyles';

export default function TelaResumo(props: any): JSX.Element {
  const [aberto, setAberto] = React.useState(false);

  return (
    <ScrollView style={{ padding: 20, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Text style={{ fontSize: 18, color: '#333', fontWeight: 'bold' }}>Resumo</Text>
        <Text style={{ fontSize: 18, color: '#333' }}>{props.total}</Text>
      </View>

      <View style={globalStyles.container}>
        <Text style={{ fontSize: 14, color: '#666' }}>{props.nome}</Text>
      </View>

      <View style={[globalStyles.container, styles.item]}>
        <Text style={{ fontSize: 14, color: '#666', fontSize: 16 }}>{props.detalhe}</Text>
      </View>

      <Button
        style={globalStyles.button}
        title={aberto ? 'Fechar' : 'Abrir'}
        onPress={() => setAberto(!aberto)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});
```

```tsx
// ../styles/globalStyles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, padding: 20 },
  text: { fontSize: 18, color: '#333' },
  button: { backgroundColor: 'blue', padding: 10, borderRadius: 5, alignItems: 'center' },
});
```

### O que entregar

1. **Lista de problemas encontrados**, cada um com: o que está errado, por que é um problema **concreto** (não "é feio"), e a correção. Há pelo menos **oito**.
2. **Um problema que é arquitetural, não sintático** — algo que não se resolve trocando uma linha. Explique por que a estrutura escolhida cria esse problema.
3. **O `globalStyles.ts` reescrito** como um `theme.ts` de tokens, e a explicação do que você **removeu** dele e por quê.
4. **Ordem de prioridade da refatoração.** Você tem meio dia. O que faz primeiro e o que fica para depois? Justifique pelo **risco** e pelo **retorno**, não pela facilidade.
5. **Um problema que você decidiu NÃO corrigir**, e por quê. Toda auditoria honesta tem esse item.

### Esqueleto do relatório

Entregue neste formato — ele existe para você não esquecer nenhum dos cinco itens:

```markdown
# Auditoria de estilo — TelaResumo

## 1. Problemas encontrados

| # | Onde (linha/trecho) | O que está errado | Consequência concreta | Correção |
|---|---|---|---|---|
| 1 |  |  |  |  |
| 2 |  |  |  |  |
<!-- TODO: pelo menos oito linhas. "É feio" não é consequência concreta —
     consequência concreta é: quebra em runtime / não compila / o layout sai
     errado / o valor fica impossível de mudar em um lugar só. -->

## 2. O problema arquitetural

<!-- TODO: qual problema NÃO se resolve trocando uma linha? Explique por que
     a ESTRUTURA escolhida o produz, e o que ela acopla a quê. -->

## 3. `globalStyles.ts` reescrito como `theme.ts`
```

```tsx
// theme.ts
export const cores = {
  // TODO: os valores que sobreviveram do globalStyles
} as const;

export const espaco = {
  // TODO
} as const;

// TODO: liste aqui, em comentário, o que você REMOVEU do globalStyles e por quê.
//       (dica: o que era layout, e não decisão de design, não entra)
```

```markdown
## 4. Ordem de refatoração — tenho meio dia

| Ordem | O que faço | Risco se não fizer | Retorno |
|---|---|---|---|
| 1 |  |  |  |
<!-- TODO: justifique por RISCO e RETORNO. A ordem em que os problemas
     aparecem no arquivo não é uma justificativa. -->

## 5. O que eu decidi NÃO corrigir

<!-- TODO: um item, com o motivo. Toda auditoria honesta tem esse parágrafo. -->
```

### Critérios de avaliação

| Critério | Peso | O que se espera |
|---|---|---|
| **Cobertura dos problemas** | 30% | Encontrou pelo menos 8, com correção correta para cada |
| **Identificação do problema arquitetural** | 25% | Percebeu o acoplamento via `globalStyles.container`, não só os erros de sintaxe |
| **`theme.ts` reescrito** | 20% | Tokens são valores; explicou o que saiu e por quê |
| **Priorização justificada por risco/retorno** | 15% | Não é uma lista na ordem em que apareceram no arquivo |
| **O item que ficou de fora** | 10% | Uma escolha defensável, com motivo |

> **Não existe uma resposta única.** O que se avalia é a qualidade do raciocínio de engenharia, não a coincidência com a lista do professor.

---

## Atividade 3 — Flexbox Froggy + relatório curto *(opcional, bônus)*

**Nível:** ⭐ · **Tempo estimado:** 30 min

Complete os 24 níveis do [Flexbox Froggy](https://flexboxfroggy.com/). Depois entregue **meia página**:

- **Três diferenças** que você notou entre o Flexbox do jogo (CSS) e o do React Native.
- **Um nível** que exigiria código diferente em React Native, com os dois códigos lado a lado.

**Por que vale a pena:** o jogo constrói intuição de eixo muito rápido. Mas ele é CSS — e transferir sem perceber as diferenças é como aprender espanhol e falar português achando que é o mesmo idioma.

---

# Gabaritos

> Tente todos antes de abrir. Sério.

<details>
<summary><b>Gabarito — Exercício 1</b></summary>

| # | Necessidade | Componente |
|---|---|---|
| 1 | Formulário de 8 campos que não cabe na tela | **c** — `ScrollView` |
| 2 | Ação de "salvar" com a aparência do sistema | **g** — `Button` |
| 3 | Agrupar dois textos lado a lado | **e** — `View` |
| 4 | Mostrar o nome do hábito | **a** — `Text` |
| 5 | Ligar/desligar o lembrete diário | **b** — `Switch` |
| 6 | Capturar o título digitado | **d** — `TextInput` |
| 7 | Foto de perfil vinda de URL | **f** — `Image` |

**Item 2 — as quatro props do `Button`:** `title`, `onPress`, `disabled` e `color` (mais as de acessibilidade). Se você passar `style`, **nada acontece** — a prop não existe na API do componente e é ignorada. `Button` desenha o botão do sistema; a aparência é decisão da plataforma, não sua. Detalhe que pega: `color` tinge o **texto** no iOS e o **fundo** no Android.

**Item 7 — as duas propriedades obrigatórias:** `width` e `height`. Com `source={{uri}}`, ninguém sabe a dimensão da imagem até ela baixar; sem dimensão declarada o componente fica com tamanho zero e **nada aparece**, sem erro no console. Com `require()` de arquivo local isso não acontece, porque o bundler lê as dimensões em tempo de build.

**Os dois componentes que reagem ao toque nesta aula:** `Button` (via `onPress`) e `Text` (que também aceita `onPress`). O `Switch` reage à interação, mas por `onValueChange`, não por toque genérico.

</details>

<details>
<summary><b>Gabarito — Exercício 2</b></summary>

Seis problemas:

1. **`Text` não foi importado** — só `View` e `StyleSheet` estão no import.
2. **Texto solto dentro de `<View>`** — `Hábitos de hoje` quebra em runtime: `Text strings must be rendered within a <Text> component`.
3. **`: JSX.Element`** — o React 19 removeu o namespace global `JSX`. Dá `Cannot find namespace 'JSX'`. Solução: **remover a anotação** (o TS infere) ou usar `React.JSX.Element`.
4. **`padding: '16px'`** — unidade CSS não existe. É `padding: 16` (dp).
5. **`fontSize: 20` no `container`** — compila, roda, e **não faz nada**. Não há cascata: estilo de texto numa `View` não desce para o `<Text>`. Tem que ir no próprio `Text`.
6. **`styles.linha` sem `flexDirection: 'row'`** — compila, roda, e faz a coisa errada. O default é `column`, então `justifyContent: 'space-between'` distribui os dois textos na **vertical**.

**Bônus:** o `as const` em `justifyContent: 'space-between' as const` não é erro, mas é **desnecessário** dentro de `StyleSheet.create` — a assinatura de `create` já preserva os literais.

```tsx
import { View, Text, StyleSheet } from 'react-native';           // (1)

export default function CabecalhoHabitos() {                      // (3)
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Hábitos de hoje</Text>          {/* (2) */}
      <View style={styles.linha}>
        <Text style={styles.meta}>Total: 5</Text>
        <Text style={styles.meta}>Concluídos: 2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,                                                  // (4)
    gap: 8,
  },
  titulo: {
    fontSize: 20,                                                 // (5)
    fontWeight: '600',
  },
  linha: {
    flexDirection: 'row',                                         // (6)
    justifyContent: 'space-between',
  },
  meta: {
    fontSize: 12,
  },
});
```

**Note o padrão dos problemas 5 e 6:** são os mais perigosos justamente porque **não geram erro nenhum**. O código compila, roda, e está errado. Erros de runtime você descobre em 10 segundos; esses você descobre olhando a tela e coçando a cabeça.

</details>

<details>
<summary><b>Gabarito — Exercício 3</b></summary>

```tsx
import { View, Text, StyleSheet } from 'react-native';

type CardHabitoProps = {
  titulo: string;
  descricao: string;
};

export default function CardHabito({ titulo, descricao }: CardHabitoProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.descricao}>{descricao}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    gap: 8,                                          // espaço entre título e descrição
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.10)',    // uma linha, duas plataformas
  },
  titulo: {
    fontSize: 18,
    fontWeight: '600',
  },
  descricao: {
    fontSize: 14,
    color: '#666',
  },
});
```

**Para espaçar os cards entre si**, o `gap` vai no **pai**, não no card:

```tsx
<View style={{ gap: 12 }}>
  <CardHabito titulo="Beber 2L de água" descricao="Meta diária" />
  <CardHabito titulo="Caminhar 30 min" descricao="Meta diária" />
</View>
```

**Erro comum:** resolver o espaçamento entre cards com `marginBottom` no próprio card. Funciona, mas cria margem sobrando embaixo do último card, e faz o componente decidir sobre o espaço **fora** dele — o que não é problema dele. Espaço entre irmãos é decisão do **pai**.

**Segundo erro comum:** escrever a sombra com o quarteto `shadowColor`/`shadowOffset`/`shadowOpacity`/`shadowRadius` + `elevation`. Funciona, mas são cinco props, com resultado visual **diferente** entre iOS e Android, e `elevation` só existe no Android. `boxShadow` resolve com uma linha.

</details>

<details>
<summary><b>Gabarito — Exercício 4</b></summary>

- **A** — `flex: 1` + `justifyContent: 'space-between'`, direção `column` (default): as três caixas ficam **empilhadas verticalmente**, uma no topo, uma no meio, uma na base da tela.

- **B** — mesma coisa com `flexDirection: 'row'`: as três ficam **numa linha horizontal**, uma na esquerda, uma no centro, uma na direita.

- **C** — 🎯 **A caixa aparece no canto superior esquerdo, não centralizada.** Por quê: sem `flex: 1`, a `View` contêiner tem **exatamente a altura do conteúdo** (50px). Centralizar algo dentro de uma caixa do tamanho exato do conteúdo não muda nada — não existe espaço sobrando para distribuir. `justifyContent` e `alignItems` distribuem **sobra**; se não há sobra, não há efeito.

- **D** — três caixas em linha ocupando toda a largura, na proporção **2:1:1**. A primeira fica com metade da largura, as outras duas com um quarto cada.

- **E** — 🎯 **A caixa vermelha não aparece.** Por quê: com `flexDirection: 'row'`, o eixo principal é o **horizontal**, e o tamanho do filho nesse eixo é a **largura**. O filho não tem `width`, não tem `flex` e não tem conteúdo dentro — então sua largura é **zero**. Altura 40 e largura 0 desenha nada.

  Três formas de vê-la, cada uma dizendo uma coisa diferente: `width: 100` (tamanho fixo), `flex: 1` (ocupe a sobra), ou colocar um `<Text>` dentro (tamanho pelo conteúdo). É a mesma família de bug da `<Image>` remota sem dimensão.

**A moral de C e E:** Flexbox distribui **espaço que existe**. Se o contêiner não tem tamanho, ou se o filho não tem tamanho nem instrução de crescer, não há nada para distribuir. Antes de mexer em `justifyContent`, pergunte: *este contêiner tem tamanho?*

</details>

<details>
<summary><b>Gabarito — Exercício 5</b></summary>

```tsx
import { useState } from 'react';
import { View, Text, Switch, Button, StyleSheet } from 'react-native';

export default function CardHabito() {
  const [concluido, setConcluido] = useState(false);
  const [lembrete, setLembrete] = useState(false);

  const alternar = () => setConcluido((anterior) => !anterior);

  return (
    <View style={[styles.card, concluido && styles.cardConcluido]}>
      <Text
        style={[styles.titulo, concluido && styles.tituloConcluido]}
        onPress={alternar}
      >
        Beber 2L de água
      </Text>

      <View style={styles.linha}>
        <Text style={styles.rotulo}>Lembrete diário</Text>
        <Switch value={lembrete} onValueChange={setLembrete} />
      </View>

      <Button title={concluido ? 'Desmarcar' : 'Marcar concluído'} onPress={alternar} />
    </View>
  );
}
```

**Quatro pontos que valem atenção:**

1. **Um estado, dois efeitos visuais.** `concluido` aparece em dois arrays de estilo diferentes (`card` e `titulo`). Não há `if` no JSX — o `&&` dentro do array resolve, porque `false` é simplesmente ignorado.
2. **A ordem no array importa.** `cardConcluido` vem **por último**, então seu `backgroundColor` vence o do `card`.
3. **`setConcluido((anterior) => !anterior)`** é preferível a `setConcluido(!concluido)`. Com a forma de função você não depende do valor capturado naquele render — é a forma segura quando o novo estado deriva do anterior.
4. **`onValueChange={setLembrete}` direto**, sem função intermediária: o `Switch` entrega o booleano novo e o setter aceita exatamente isso. E o `value={lembrete}` é obrigatório — sem ele o `Switch` volta sozinho ao estado anterior.

**Resposta da pergunta 2:** `Button` **não aceita `style`** — a prop simplesmente não existe na API dele. Ele desenha o botão do sistema, e as únicas coisas sob seu controle são `title`, `onPress`, `disabled` e `color`. Se você precisa de fundo, borda ou raio de canto, a saída disponível hoje é estilizar uma `View` em volta:

```tsx
<View style={styles.areaBotao}>
  <Button title="Marcar concluído" onPress={alternar} />
</View>
```

**Erro comum neste exercício:** escrever `style={concluido ? styles.cardConcluido : styles.card}` com o ternário. Funciona, mas **substitui** o estilo base em vez de somar a ele — você perde `padding`, `borderRadius` e `gap` quando o hábito está concluído. O array (`[base, condicional && extra]`) soma; o ternário troca.

</details>

<details>
<summary><b>Gabarito — Exercício 6</b></summary>

```tsx
const styles = StyleSheet.create({
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,                 // espaço só ENTRE as células
  },
  celula: {
    width: '30%',
    height: 100,
    backgroundColor: '#F3E9DC',
  },
});
```

**Pergunta 1 — por que `margin: 5` não é uniforme:**

`margin: 5` põe 5px em **todos os lados de cada célula**. Entre duas células vizinhas, as duas margens se somam: **5 + 5 = 10px**. Mas entre uma célula e a borda do contêiner há só **uma** margem: **5px** (mais o `padding: 10` do pai, o que piora a confusão). Resultado: o vão interno é o dobro do externo, e o layout fica visivelmente irregular.

`gap` resolve porque ele é definido **entre** os filhos — não em volta deles. A borda externa fica sob controle exclusivo do `padding` do pai.

**Pergunta 2 — quantas cabem por linha:**

Com `width: '30%'` e `gap: 10`, três células ocupam `90%` da largura **mais** dois vãos de 10px. Se `90% + 20px` passar da largura disponível (o que acontece em tela estreita), só **duas** cabem por linha e a terceira quebra.

Duas saídas corretas:

```tsx
// Opção A: reduzir a largura para abrir espaço aos gaps
celula: { width: '30%' }  →  celula: { width: '28%' }

// Opção B (melhor): deixar o flex fazer a conta
grade:  { flexDirection: 'row', flexWrap: 'wrap', gap: 10, padding: 10 },
celula: { flexBasis: '30%', flexGrow: 1, height: 100 },
```

Na opção B, `flexBasis: '30%'` dá o tamanho-alvo e `flexGrow: 1` faz as células **absorverem a sobra** da linha, então elas fecham a largura sem você calcular percentual na mão. É a solução que sobrevive a mudança de tamanho de tela.

</details>

---

## Resumo de tempos

| Parte | Onde | Tempo |
|---|---|---|
| Exercícios 1 e 2 | Sala, sem computador | ~8 min |
| Exercícios 3 a 6 | Sala, no computador | ~24 min |
| Atividade 1 | Casa | 3–4 h |
| Atividade 2 | Casa | ~1 h |
| Atividade 3 *(bônus)* | Casa | ~30 min |

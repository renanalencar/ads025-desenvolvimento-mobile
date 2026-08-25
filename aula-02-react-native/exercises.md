# Exercícios e Atividades — Aula 2 (domínio Hábito)

> **Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School
> **Domínio deste arquivo:** Rastreador de Micro-hábitos e Condicionamento Físico (`Habito`).
> **Está no outro projeto?** Se o seu app é o **App de Gestão e Rotina Pet**, use o arquivo `practice.md` — mesma estrutura, mesmos conceitos, domínio `Pet`.

| Projeto | Repositório | Branch da disciplina |
|---|---|---|
| Rastreador de Micro-hábitos e Condicionamento Físico | `habit-tracker-expo` | `ads025_2026-2` |

## Como usar este arquivo

- **Parte 1 — Exercícios guiados** (em sala, ~20 min): foco em **acurácia**. São propositalmente simples. O objetivo é usar o conceito **corretamente**, não criativamente. Chame o professor quando travar.
- **Parte 2 — Atividade aplicada** (para casa): exige **decisão**, não repetição.
- **Todo exercício vem com um scaffold** — um esqueleto de código com marcações `// TODO`. Você completa os trechos que faltam; não precisa escrever do zero, e não deve apagar a estrutura dada.
- **Gabaritos**: no final, em seções colapsadas. Tente antes de abrir — abrir cedo é o jeito mais eficiente de não aprender.

**Setup dos exercícios guiados 1 a 4** (projeto de sandbox, descartável):

```bash
node --version              # precisa ser 22.11 ou superior
npx create-expo-app@latest sandbox-app
cd sandbox-app
npx expo start              # --tunnel se o Wi-Fi da sala isolar os aparelhos
```

**Setup da Atividade 1** (seu projeto de verdade):

```bash
git clone <url-do-seu-repositorio> habit-tracker-expo
cd habit-tracker-expo
git checkout ads025_2026-2
npm install
npx expo start
```

---

# Parte 1 — Exercícios guiados

## Exercício 1 — Conserte o componente: componentes básicos

**Nível:** ⭐ · **Tempo:** 4 min · **No computador**

Este componente tem **quatro problemas** que quebram em runtime, não compilam ou não produzem o layout pedido. Encontre todos.

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
1. Um problema é sobre **onde** o texto pode ficar.
2. Um problema é sobre **importação**.
3. Um problema é sobre **unidades de medida**.
4. `styles.linha` quer colocar os dois textos lado a lado. Ele consegue?

### Scaffold — complete no seu editor

```tsx
// exercicio-01.tsx
import { /* TODO 2: o que mais precisa ser importado aqui? */ View, StyleSheet } from 'react-native';

export default function Cabecalho() {
  return (
    <View style={styles.container}>
      {/* TODO 1: o título "Hábitos de hoje" não pode ficar solto dentro da View.
                  Envolva-o no componente correto. */}

      <View style={styles.linha}>
        <Text>Total: 5</Text>
        <Text>Concluídos: 2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: /* TODO 3: corrija o valor — em React Native, números de estilo não levam unidade */,
  },
  linha: {
    // TODO 4: falta uma propriedade para os dois textos ficarem lado a lado.
    //         Lembre qual é o valor default de flexDirection.
    justifyContent: 'space-between',
  },
});
```

**Como saber que acertou:** o app abre sem tela vermelha e os dois textos aparecem **na mesma linha**, um em cada ponta.

---

## Exercício 2 — Escreva o tipo: props de componente

**Nível:** ⭐⭐ · **Tempo:** 5 min · **No computador**

Complete o scaffold para que o componente compile **sem nenhum `any`**.

**Requisitos:**
- `titulo` e `categoria` são textos obrigatórios.
- `status` deve aceitar **apenas** `'pendente'`, `'concluido'` ou `'pulado'`.
- `onPress` é uma função sem parâmetros que não retorna nada.
- `destacado` é **opcional** e booleano.

### Scaffold

```tsx
// exercicio-02.tsx
import { Text, StyleSheet } from 'react-native';

// TODO 1: declare o union type literal com os três status possíveis.
type StatusHabito = /* ... */;

// TODO 2: descreva as props conforme os requisitos acima.
//         Nenhum campo pode ser `any`, e `status` não pode ser `string`.
type CardHabitoProps = {
  /* ... */
};

export function CardHabito({
  titulo,
  categoria,
  status,
  onPress,
  destacado = false,
}: CardHabitoProps) {
  return (
    <Text onPress={onPress} style={[styles.card, destacado && styles.destaque]}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.meta}>{categoria} · {status}</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  card:     { padding: 16, borderRadius: 8, backgroundColor: '#f2f2f2' },
  destaque: { backgroundColor: '#ffe8d6' },
  titulo:   { fontSize: 18, fontWeight: '600' },
  meta:     { fontSize: 12, color: '#666' },
});
```

**Teste sua resposta:** as duas linhas abaixo devem dar **erro de compilação**. Se alguma passar, seu tipo está frouxo.

```tsx
<CardHabito titulo="Beber água" categoria="saude" status="PENDENTE" onPress={() => {}} />
<CardHabito titulo="Beber água" categoria="saude" status="pendente" />
```

---

## Exercício 3 — Refatore: união discriminada

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

**Parte C:** refatore usando o scaffold abaixo. O `!` deve desaparecer.

### Scaffold

```tsx
// exercicio-03.tsx
import { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

// TODO 1: complete a união discriminada.
//         São exatamente três variantes, todas com o campo discriminante `tipo`.
//         - carregando: não carrega nenhum dado
//         - sucesso:    carrega os dados, do tipo genérico T
//         - erro:       carrega uma mensagem legível
type EstadoTela<T> =
  | { tipo: 'carregando' }
  /* ... */;

function TelaHabitoDoDia() {
  // TODO 2: um único useState substitui os três anteriores.
  //         Qual é o estado inicial da tela?
  const [estado, setEstado] = useState<EstadoTela<Habito>>(/* ... */);

  // TODO 3: um switch sobre o campo discriminante, com um `case` por variante.
  //         Dentro de cada case, só os campos daquela variante existem —
  //         é isso que faz o `!` desaparecer.
  switch (estado.tipo) {
    case 'carregando':
      return <ActivityIndicator />;
    /* ... */
  }
}
```

**Como saber que acertou:** tentar ler `estado.dados` dentro do `case 'erro'` deve dar **erro de compilação**. Se compilar, a união não está discriminada de verdade.

---

## Exercício 4 — Derive os tipos: utility types

**Nível:** ⭐⭐ · **Tempo:** 4 min · **No computador**

Derive os três tipos **usando utility types** (`Pick`, `Omit`, `Partial`). Nenhum deles pode repetir campos à mão.

### Scaffold

```ts
// exercicio-04.ts
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

// TODO 1: payload do formulário de criação.
//         O servidor é quem gera id, status, streakDias e criadoEm.
type NovoHabito = /* ... */;

// TODO 2: o que o card da tela precisa — id, titulo, status e categoria.
type ResumoHabito = /* ... */;

// TODO 3: edição parcial de um hábito já existente.
//         Pense bem de qual dos tipos acima este deve derivar.
type AtualizacaoHabito = /* ... */;
```

**Pergunta de fechamento:** você adicionou o campo `lembreteHorario?: string` a `Habito`. Quais dos três tipos derivados precisam ser alterados manualmente? **Por que essa resposta é o ponto do exercício?**

---

# Parte 2 — Atividade aplicada

## Atividade 1 — Modelagem e tela do hábito do dia

**Nível:** ⭐⭐⭐ · **Tempo estimado:** 2 a 3 h · **Entrega:** individual · **Prazo:** próxima aula

### Contexto

Você está construindo o **Rastreador de Micro-hábitos e Condicionamento Físico**. O backend ainda não existe. Sua tarefa é construir a **tela do hábito do dia** com dados mockados, mas com o domínio **modelado de verdade**, de modo que a troca do mock pela API real seja quase indolor.

Esta tela mostra **uma única entidade em destaque**, não uma lista — listas e `FlatList` chegam mais adiante no semestre.

### Estrutura de arquivos a criar

```
habit-tracker-expo/
├── App.tsx                        ← a tela (scaffold 3)
└── src/
    ├── types/habito.ts            ← modelagem do domínio (scaffold 1)
    ├── services/habito-service.ts ← camada de dados falsa (scaffold 2)
    └── components/card-habito.tsx ← o card (scaffold 4)
```

### Scaffold 1 — `src/types/habito.ts`

```ts
// TODO 1: os três union types literais do domínio.
//         Nenhum deles pode ser `string`.
export type StatusHabito = /* ... */;
export type CategoriaHabito = /* ... */;
export type FrequenciaHabito = /* ... */;

// TODO 2: a entidade completa. Campos mínimos:
//         id, titulo, categoria, frequencia, status, streakDias, criadoEm.
export interface Habito {
  /* ... */
}

// TODO 3: os três tipos derivados, com utility types (sem repetir campos).
export type NovoHabito = /* ... */;
export type ResumoHabito = /* ... */;
export type AtualizacaoHabito = /* ... */;

// TODO 4: o estado de tela, como união discriminada de três variantes.
export type EstadoTela<T> = /* ... */;

// TODO 5: função que traduz o status para um rótulo legível em português.
//         Use um switch — se amanhã um status novo entrar na união,
//         o compilador precisa avisar aqui.
export function rotuloStatus(status: StatusHabito): string {
  /* ... */
}
```

### Scaffold 2 — `src/services/habito-service.ts`

```ts
import { Habito } from '../types/habito';

// Deixe esta constante no código, comentada como está,
// para o professor conseguir testar o estado de erro.
const SIMULAR_ERRO = false;

const MOCK: Habito = {
  // TODO 1: um hábito completo e coerente com o tipo.
};

export async function buscarHabitoDoDia(): Promise<Habito> {
  // TODO 2: espere ~1 segundo antes de responder, para o loading ser visível.
  //         Dica: new Promise((resolve) => setTimeout(resolve, 1000))

  // TODO 3: se SIMULAR_ERRO for true, lance um Error com mensagem legível.

  // TODO 4: devolva o MOCK.
}
```

### Scaffold 3 — `App.tsx`

```tsx
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { CardHabito } from './src/components/card-habito';
import { buscarHabitoDoDia } from './src/services/habito-service';
import { EstadoTela, Habito } from './src/types/habito';

export default function App() {
  const [estado, setEstado] = useState<EstadoTela<Habito>>({ tipo: 'carregando' });

  const carregar = useCallback(async () => {
    // TODO 1: volte para o estado 'carregando', chame o serviço e,
    //         conforme o resultado, mude para 'sucesso' ou 'erro'.
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  function marcarConcluido() {
    // TODO 2: só faz sentido se o estado atual for 'sucesso'.
    //         Atualize o status do hábito para 'concluido' (só em memória).
    //         Cuidado: não dá para acessar estado.dados sem antes checar o tipo.
  }

  // TODO 3: um `case` por variante da união.
  switch (estado.tipo) {
    case 'carregando':
      return (
        <View style={styles.centro}>
          <ActivityIndicator />
        </View>
      );

    case 'sucesso':
      return (
        <View style={styles.container}>
          {/* TODO 4: renderize o CardHabito com os dados de estado.dados
                      e passe a ação de marcar concluído. */}
        </View>
      );

    case 'erro':
      return (
        <View style={styles.centro}>
          {/* TODO 5: mensagem legível + um Text com onPress para tentar de novo. */}
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 48, backgroundColor: '#fff' },
  centro:    { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
```

### Scaffold 4 — `src/components/card-habito.tsx`

```tsx
import { StyleSheet, Text, View } from 'react-native';

import { Habito, rotuloStatus } from '../types/habito';

// TODO 1: tipe as props. O card recebe um hábito e uma ação de toque.
type CardHabitoProps = {
  /* ... */
};

export function CardHabito({ /* ... */ }: CardHabitoProps) {
  return (
    <View style={styles.card}>
      {/* TODO 2: título do hábito */}
      {/* TODO 3: uma linha com categoria e status legível, um em cada ponta */}
      {/* TODO 4: o streak em dias */}
      {/* TODO 5: um Text com onPress: "Marcar concluído hoje" */}
    </View>
  );
}

const styles = StyleSheet.create({
  card:   { padding: 16, borderRadius: 8, backgroundColor: '#f2f2f2' },
  titulo: { fontSize: 18, fontWeight: '600' },
  linha:  { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  meta:   { fontSize: 12, color: '#666' },
  botao:  { marginTop: 16, fontWeight: '600', color: '#FF6002' },
});
```

### O que entregar

1. Os quatro arquivos acima, com todos os `TODO` resolvidos e **removidos**.
2. Os três estados funcionando: carregando, sucesso e erro.
3. A ação **"Marcar concluído hoje"** alterando o estado local.
4. Um `README.md` no repositório com **uma decisão de modelagem que você tomou e o motivo** (ex.: por que `type` e não `interface`, por que esse conjunto de status, por que `streakDias` é um número e não uma lista de datas).

### Como testar o estado de erro

Você precisa vê-lo funcionando. Troque `SIMULAR_ERRO` para `true` em `habito-service.ts`, confira a tela de erro e o botão "Tentar novamente", e devolva a constante para `false` antes de entregar — mas **deixe a constante no código**.

### Critérios de avaliação

| Critério | Peso | O que se espera |
|---|---|---|
| **Modelagem de tipos** | 30% | Unions literais em vez de `string`; utility types derivando de uma fonte única; união discriminada correta para o estado de tela |
| **Ausência de `any` e de assertions desnecessárias** | 20% | Nenhum `any`. `!` e `as` só com justificativa em comentário |
| **Os três estados funcionam** | 20% | Loading, sucesso e erro visíveis e testáveis de fato |
| **Organização** | 15% | Separação entre `types/`, `services/` e `components/`; nomes coerentes |
| **Ação de marcar concluído** | 10% | Funciona e atualiza o estado local corretamente |
| **README** | 5% | A decisão de modelagem explicada |

### O que **não** é avaliado nesta atividade

Beleza visual, animações, navegação entre telas, persistência, listas. Foque na modelagem e nos três estados de uma única entidade.

---

# Gabaritos

> Tente todos os exercícios antes de abrir. Sério.

<details>
<summary><b>Gabarito — Exercício 1</b></summary>

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
<summary><b>Gabarito — Exercício 2</b></summary>

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
<summary><b>Gabarito — Exercício 3</b></summary>

**Parte A — dois estados impossíveis (entre outros):**

- `carregando = true` **e** `erro = 'falhou'` ao mesmo tempo — a tela está carregando ou deu erro?
- `carregando = false`, `erro = null` **e** `habito = null` — nada aconteceu e não há o que mostrar; a última linha explode.

**Parte B —** o `!` foi necessário porque, para o compilador, `habito` **pode** ser `null` naquela linha. O `!` não verifica nada: apenas manda o compilador calar a boca. Ele esconde exatamente o terceiro estado impossível acima.

**Parte C:**

```tsx
type EstadoTela<T> =
  | { tipo: 'carregando' }
  | { tipo: 'sucesso'; dados: T }
  | { tipo: 'erro'; mensagem: string };

function TelaHabitoDoDia() {
  const [estado, setEstado] = useState<EstadoTela<Habito>>({ tipo: 'carregando' });

  switch (estado.tipo) {
    case 'carregando':
      return <ActivityIndicator />;
    case 'sucesso':
      return <Text>{estado.dados.titulo}</Text>;   // sem `!`
    case 'erro':
      return <Text>{estado.mensagem}</Text>;
  }
}
```

O campo `tipo` é o **discriminante**: dentro de cada `case`, o TypeScript sabe exatamente quais campos existem. `estado.dados` dentro do `case 'erro'` não compila — e é justamente esse o ganho.

</details>

<details>
<summary><b>Gabarito — Exercício 4</b></summary>

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

---

## Resumo de tempos

| Parte | Onde | Tempo |
|---|---|---|
| Exercícios 1 a 3 | Sala, no computador | ~15 min |
| Exercício 4 | Sala, se sobrar tempo — senão, em casa | ~4 min |
| Atividade 1 | Casa | 2–3 h |

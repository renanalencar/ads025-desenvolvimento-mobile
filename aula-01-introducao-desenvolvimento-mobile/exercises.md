# Exercícios e Atividades — Aula 1

> **Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School
> **Domínio usado aqui:** Rastreador de Micro-hábitos e Condicionamento Físico (`Habito`) — o projeto que você constrói ao longo do semestre.

| Projeto | Repositório | Branch da disciplina |
|---|---|---|
| Rastreador de Micro-hábitos e Condicionamento Físico | `habit-tracker-expo` | `feature/aula_01_intro` |

## Como usar este arquivo

- **Parte 1 — Exercícios guiados** (em sala): foco em **acurácia**. São propositalmente simples. O objetivo é usar o conceito **corretamente**, não criativamente. Chame o professor quando travar.
  - **1 e 2:** sem computador, papel e caneta.
  - **3 a 6:** no computador, **TypeScript puro** — cada um vem com um esqueleto e marcações `TODO` para você completar.
- **Parte 2 — Atividade aplicada** (para casa): exige **decisão**, não repetição. Também vem com esqueleto.
- **Gabaritos**: no final, em seções colapsadas. Tente antes de abrir — abrir cedo é o jeito mais eficiente de não aprender.

> 📌 **Como funciona o esqueleto.** Onde você vir `/* … */` ou um comentário `TODO`, é sua vez de escrever. O que já está escrito **não deve ser apagado** — em particular, os blocos marcados como *verificação* existem para provar que sua solução está certa: alguns precisam compilar, outros precisam **falhar** na compilação.

> ⚠️ **Escopo da Aula 1.** Hoje o assunto é plataformas e **modelagem em TypeScript**. Componentes de React Native chegam na Aula 2, e a renderização de listas — `FlatList` e `SectionList` — será vista nas **próximas aulas**.

### Setup para os exercícios 3 a 6

Você **não** precisa de projeto Expo hoje. Basta TypeScript:

```bash
node --version                    # precisa ser 22.11 ou superior

mkdir aula01-ts && cd aula01-ts
npm init -y
npm add -D "typescript@^6"        # a disciplina fixa a linha 6.x — ver student-notes §2.9
npx tsc --init --strict
```

Escreva cada exercício em um arquivo `.ts` e verifique com:

```bash
npx tsc --noEmit
```

*Alternativa sem instalar nada:* [TypeScript Playground](https://www.typescriptlang.org/play) — só confira que a versão selecionada é a **6.x**.

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
| g | A documentação atual da Apple organiza o iOS nas 4 camadas Cocoa Touch / Media / Core Services / Core OS. | |
| h | O modelo de arquitetura do AOSP documentado hoje tem 5 camadas. | |
| i | Uma type assertion (`as Habito`) gera código de verificação em runtime. | |
| j | O TypeScript 7.0 deve ser adotado imediatamente nos projetos da disciplina, por ser 8 a 12× mais rápido. | |

---

## Exercício 3 — Do `string` ao cardápio fechado

**Nível:** ⭐ · **Tempo:** 6 min · **Arquivo:** `ex03.ts`

Ponto de partida: tudo é `string`, e por isso qualquer erro de digitação compila.

```ts
// ---------- ESQUELETO — complete os TODO ----------

// TODO 3.1 — declare StatusHabito como union de literais:
//            'pendente' | 'concluido' | 'pulado'
type StatusHabito = /* … */;

// TODO 3.2 — declare CategoriaHabito como union de literais:
//            'saude' | 'produtividade' | 'mentalidade' | 'sono'
type CategoriaHabito = /* … */;

interface Habito {
  id: string;
  titulo: string;
  categoria: string;   // TODO 3.3 — troque por CategoriaHabito
  status: string;      // TODO 3.3 — troque por StatusHabito
}

// TODO 3.4 — complete o switch com um case para cada status.
//            NÃO escreva um `default` — o objetivo é justamente
//            deixar o compilador cobrar os casos que faltam.
function rotuloStatus(status: StatusHabito): string {
  switch (status) {
    /* … */
  }
}

// ---------- VERIFICAÇÃO — não apague ----------
declare const h: Habito;

// Depois do TODO 3.3, estas TRÊS linhas DEVEM dar erro de compilação:
h.status = 'conclído';       // erro de digitação
h.status = 'Pendente';       // maiúscula
h.categoria = 'financas';    // categoria que ninguém combinou

// E esta DEVE continuar compilando:
h.status = 'concluido';
```

**Depois de fazer compilar:** acrescente `'atrasado'` ao `StatusHabito` **sem tocar** em `rotuloStatus`. Rode `npx tsc --noEmit` de novo. O que o compilador diz, e por que isso é uma boa notícia?

---

## Exercício 4 — União discriminada para estado de tela

**Nível:** ⭐⭐ · **Tempo:** 8 min · **Arquivo:** `ex04.ts`

O jeito frágil, que você **não** vai usar:

```ts
// let carregando = true;
// let habito: Habito | null = null;
// let erro: string | null = null;
// nada impede: carregando = true E erro = 'falhou' E habito = {...}
```

```ts
// ---------- ESQUELETO — complete os TODO ----------
import type { Habito } from './ex03';   // ou repita a interface aqui

// TODO 4.1 — declare EstadoTela<T> como união discriminada pelo campo `tipo`,
//            com exatamente três variantes:
//              'carregando'  → nenhum outro campo
//              'sucesso'     → dados: T
//              'erro'        → mensagem: string
type EstadoTela<T> = /* … */;

// TODO 4.2 — complete o switch. Dentro de cada case, use SOMENTE os campos
//            que existem naquela variante.
function descreverTela(estado: EstadoTela<Habito>): string {
  switch (estado.tipo) {
    /* … */
  }
}

// ---------- VERIFICAÇÃO — não apague ----------
declare const habitoExemplo: Habito;

// DEVEM compilar:
descreverTela({ tipo: 'carregando' });
descreverTela({ tipo: 'sucesso', dados: habitoExemplo });
descreverTela({ tipo: 'erro', mensagem: 'Sem conexão' });

// DEVEM dar erro de compilação — descomente uma de cada vez para confirmar:
// descreverTela({ tipo: 'carregando', dados: habitoExemplo });
// descreverTela({ tipo: 'erro', dados: habitoExemplo });
// descreverTela({ tipo: 'processando' });
```

**Pergunta para responder em um comentário:** por que o campo `tipo` precisa ser um **literal** em cada variante, e não `tipo: string`?

---

## Exercício 5 — Utility types: uma fonte de verdade

**Nível:** ⭐⭐ · **Tempo:** 7 min · **Arquivo:** `ex05.ts`

```ts
// ---------- ESQUELETO — complete os TODO ----------
type StatusHabito = 'pendente' | 'concluido' | 'pulado';
type CategoriaHabito = 'saude' | 'produtividade' | 'mentalidade' | 'sono';

// TODO 5.1 — declare FrequenciaHabito: 'diario' | 'semanal' | 'dias_uteis'
type FrequenciaHabito = /* … */;

interface Habito {
  id: string;
  titulo: string;
  categoria: CategoriaHabito;
  frequencia: FrequenciaHabito;
  status: StatusHabito;
  streakDias: number;
  criadoEm: string;
}

// Regra do domínio: o formulário de criação NÃO envia id, status,
// streakDias nem criadoEm — quem gera esses quatro é o servidor.
// TODO 5.2 — derive NovoHabito de Habito com UM utility type. Não redigite campos.
type NovoHabito = /* … */;

// O card da tela precisa de exatamente quatro campos.
// TODO 5.3 — derive ResumoHabito: id, titulo, status e categoria.
type ResumoHabito = /* … */;

// A edição envia só o que mudou.
// TODO 5.4 — derive AtualizacaoHabito a partir de NovoHabito.
type AtualizacaoHabito = /* … */;

// ---------- VERIFICAÇÃO — não apague ----------
// DEVE compilar exatamente assim, sem campos a mais nem a menos:
const novo: NovoHabito = {
  titulo: 'Beber 2L de água',
  categoria: 'saude',
  frequencia: 'diario',
};

const resumo: ResumoHabito = {
  id: 'h1',
  titulo: 'Beber 2L de água',
  status: 'pendente',
  categoria: 'saude',
};

const parcial: AtualizacaoHabito = { titulo: 'Beber 3L de água' };

// DEVEM dar erro — descomente uma de cada vez:
// const errado1: NovoHabito = { titulo: 'x', categoria: 'saude', frequencia: 'diario', id: 'h1' };
// const errado2: ResumoHabito = { id: 'h1', titulo: 'x', status: 'pendente' };
```

**Teste final do exercício:** acrescente o campo `lembreteHora: string` à interface `Habito`. **Quantos dos três tipos derivados você precisou editar à mão?** Guarde a resposta — é o argumento inteiro a favor de derivar.

---

## Exercício 6 — `unknown` e type guard no lugar de `as`

**Nível:** ⭐⭐ · **Tempo:** 7 min · **Arquivo:** `ex06.ts`

```ts
// ---------- ESQUELETO — complete os TODO ----------
type StatusHabito = 'pendente' | 'concluido' | 'pulado';

interface Habito {
  id: string;
  titulo: string;
  status: StatusHabito;
}

// ❌ Ponto de partida: uma mentira contada ao compilador.
//    Isto compila, não verifica nada, e explode em runtime.
function lerHabitoRuim(json: unknown): Habito {
  return json as Habito;
}

// TODO 6.1 — escreva um type guard de verdade.
//   Dica: comece por `typeof valor === 'object' && valor !== null`
//   e depois verifique 'id', 'titulo' e 'status' com o operador `in`.
function ehHabito(valor: unknown): valor is Habito {
  return /* … */;
}

// TODO 6.2 — reescreva a leitura usando o type guard.
//            Se o valor não for um Habito, lance um Error com mensagem clara.
function lerHabito(json: unknown): Habito {
  /* … */
}

// TODO 6.3 — em UMA linha de comentário aqui embaixo, explique por que
//            `as Habito` não teria pego o problema.
// R:

// ---------- VERIFICAÇÃO — não apague ----------
console.log(ehHabito({ id: 'h1', titulo: 'Água', status: 'pendente' })); // true
console.log(ehHabito({ id: 'h1' }));                                     // false
console.log(ehHabito(null));                                             // false
console.log(ehHabito('h1'));                                             // false

// DEVE lançar Error, não devolver um objeto quebrado:
// lerHabito({ nada: 'a ver' });
```

---

# Parte 2 — Atividade aplicada

## Atividade 1 — Modelagem e tela do hábito do dia

**Nível:** ⭐⭐⭐ · **Tempo estimado:** 2 a 3 h · **Entrega:** individual · **Prazo:** a combinar com o professor

> ⏳ **Leia antes de começar.** Os itens **1, 2 e 4** são TypeScript puro — dá para fazer hoje mesmo, com o que você viu nesta aula. O item **3** usa componentes de React Native (`View`, `Text`, `Pressable`, `StyleSheet`), que só chegam na **Aula 2**. Comece pelos itens 1 e 2 agora e termine o 3 depois da próxima aula.

### Contexto

Você constrói o **Rastreador de Micro-hábitos e Condicionamento Físico**. O backend ainda não existe. Sua tarefa é montar a **tela do hábito do dia** com dados mockados, mas com o domínio **modelado de verdade**, de modo que a troca do mock pela API real seja quase indolor.

Note que esta tela mostra **uma única entidade em destaque**, não uma lista.

### Setup do projeto

```bash
node --version                                  # 22.11 ou superior
npx create-expo-app@latest habit-tracker-expo
cd habit-tracker-expo
npx expo start
```

### Esqueleto — arquivo 1 de 3

`src/types/habito.ts` — **você já consegue fazer este hoje.**

```ts
// ============================================================
// TODO A1.1 — Union types literais. Nenhum destes pode ser `string`.
// ============================================================
export type StatusHabito = /* … */;
export type CategoriaHabito = /* … */;
export type FrequenciaHabito = /* … */;

// ============================================================
// TODO A1.2 — A entidade completa, como ela virá do servidor um dia.
//   Campos obrigatórios: id, titulo, categoria, frequencia, status,
//   streakDias, criadoEm. Escolha os tipos com cuidado — você vai
//   justificar pelo menos uma dessas escolhas no README.
// ============================================================
export interface Habito {
  /* … */
}

// ============================================================
// TODO A1.3 — Tipos DERIVADOS. Use utility types; não redigite campos.
//   NovoHabito         → o que o formulário de criação envia
//   ResumoHabito       → o que o card da tela precisa
//   AtualizacaoHabito  → edição parcial
// ============================================================
export type NovoHabito = /* … */;
export type ResumoHabito = /* … */;
export type AtualizacaoHabito = /* … */;

// ============================================================
// TODO A1.4 — União discriminada para o estado da tela.
//   Três variantes, discriminadas por `tipo`: carregando, sucesso, erro.
// ============================================================
export type EstadoTela<T> = /* … */;

// ============================================================
// TODO A1.5 — Rótulo legível de status, com switch exaustivo e sem `default`.
// ============================================================
export function rotuloStatus(status: StatusHabito): string {
  /* … */
}
```

### Esqueleto — arquivo 2 de 3

`src/services/habitoService.ts` — **você já consegue fazer este hoje.**

```ts
import type { Habito } from '../types/habito';

// Deixe esta constante no código, comentada ou em `false`, para o
// professor conseguir testar o caminho de erro sem editar nada.
const SIMULAR_ERRO = false;

const ATRASO_MS = 1000;   // para o estado de carregando ser visível

// TODO A1.6 — declare o hábito mockado. Ele precisa satisfazer `Habito`
//   inteiro; não use `as` para escapar de campos faltando.
const MOCK: Habito = {
  /* … */
};

/**
 * Devolve UM hábito — o do dia. Assinatura propositalmente idêntica
 * à que uma chamada HTTP real teria, para a troca ser indolor.
 */
export async function buscarHabitoDoDia(): Promise<Habito> {
  // TODO A1.7 — espere ATRASO_MS antes de responder.
  //   Dica: `await new Promise((r) => setTimeout(r, ATRASO_MS));`

  // TODO A1.8 — se SIMULAR_ERRO for true, lance um Error com mensagem legível.

  // TODO A1.9 — devolva o MOCK.
  /* … */
}
```

### Esqueleto — arquivo 3 de 3

`App.tsx` — **este depende da Aula 2.** O esqueleto fica aqui para você já saber onde vai encaixar.

```tsx
import { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import type { EstadoTela, Habito } from './src/types/habito';
import { rotuloStatus } from './src/types/habito';
import { buscarHabitoDoDia } from './src/services/habitoService';

export default function App() {
  // TODO A1.10 — um único estado, tipado com EstadoTela<Habito>,
  //   começando em { tipo: 'carregando' }.
  const [estado, setEstado] = useState/* … */;

  // TODO A1.11 — carregue o hábito ao montar a tela.
  //   Sucesso → { tipo: 'sucesso', dados }
  //   Falha   → { tipo: 'erro', mensagem }
  //   Deixe a função de carregar separada, para o botão "Tentar novamente" reusá-la.
  useEffect(() => {
    /* … */
  }, []);

  // TODO A1.12 — marque o hábito como concluído no estado local.
  //   Só faz sentido quando estado.tipo === 'sucesso'.
  function marcarConcluido() {
    /* … */
  }

  // TODO A1.13 — um switch sobre estado.tipo, com os três casos.
  //   carregando → <ActivityIndicator />
  //   sucesso    → card com titulo, categoria, rotuloStatus(...), streakDias
  //                e um botão "Marcar concluído hoje"
  //   erro       → mensagem + botão "Tentar novamente"
  switch (estado.tipo) {
    /* … */
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 48, backgroundColor: '#fff' },
  // TODO A1.14 — o resto dos estilos.
});
```

### Item 4 — `README.md`

Complementando o do repositório, escreva **uma decisão de modelagem que você tomou e o motivo**. Exemplos de decisão que contam: por que `type` e não `interface` em algum ponto, por que esse conjunto de status e não outro, por que `streakDias` é um número e não uma lista de datas.

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
| g | **F** | Esse diagrama vem do *iOS Technology Overview*, hoje **arquivado**. A documentação atual descreve o núcleo Darwin/XNU e os frameworks por domínio. É um modelo histórico, não a arquitetura vigente. |
| h | **F** | Material antigo mostra 5 camadas; o AOSP documenta **7** (kernel Linux → daemons/libs nativas → HAL → system services → ART → Framework → Apps). |
| i | **F** | `as` não gera **nenhum** código de verificação — é só uma afirmação ao compilador. Quem gera verificação é o *type guard*. |
| j | **F** | O TS 7.0 ainda **não expõe API programática**, então `typescript-eslint`, `ts-jest`, `ts-morph` e os type-checkers de Vue/Svelte/Astro não funcionam sobre ele. A disciplina fixa a linha **6.x**. |

</details>

<details>
<summary><b>Gabarito — Exercício 3</b></summary>

```ts
type StatusHabito = 'pendente' | 'concluido' | 'pulado';
type CategoriaHabito = 'saude' | 'produtividade' | 'mentalidade' | 'sono';

interface Habito {
  id: string;
  titulo: string;
  categoria: CategoriaHabito;
  status: StatusHabito;
}

function rotuloStatus(status: StatusHabito): string {
  switch (status) {
    case 'pendente':  return 'Pendente';
    case 'concluido': return 'Concluído';
    case 'pulado':    return 'Pulado';
  }
}
```

**Ao acrescentar `'atrasado'`:** `rotuloStatus` passa a dar erro — *"Function lacks ending return statement and return type does not include 'undefined'"*. Existe agora um caminho de execução que não retorna `string`.

É uma boa notícia porque o compilador virou uma **lista de tarefas**: ele encontrou, sozinho, todos os lugares do projeto que precisam tratar o status novo. Com `status: string` nada disso aconteceria — o valor novo simplesmente cairia num caso não tratado em runtime.

**Por que não usar `default`:** um `default` satisfaz o compilador e **desliga** exatamente essa verificação. O `switch` sem `default` sobre um union é o que dá *exhaustiveness checking*.

</details>

<details>
<summary><b>Gabarito — Exercício 4</b></summary>

```ts
type EstadoTela<T> =
  | { tipo: 'carregando' }
  | { tipo: 'sucesso'; dados: T }
  | { tipo: 'erro'; mensagem: string };

function descreverTela(estado: EstadoTela<Habito>): string {
  switch (estado.tipo) {
    case 'carregando':
      return 'Carregando…';
    case 'sucesso':
      return `Hábito: ${estado.dados.titulo}`;   // 'dados' só existe aqui
    case 'erro':
      return `Falhou: ${estado.mensagem}`;       // 'mensagem' só existe aqui
  }
}
```

**Por que `tipo` precisa ser literal:** o *narrowing* de união discriminada funciona porque cada variante tem um valor **único e conhecido em tempo de compilação** naquele campo. Com `tipo: string`, todas as variantes teriam o mesmo tipo naquele campo e o compilador não teria como saber, dentro de um `case`, em qual delas você está — nenhum dos campos específicos ficaria acessível.

**O ganho real:** `{ tipo: 'carregando', dados: … }` não compila. O estado impossível deixou de ser **representável** — não é uma convenção que a equipe combina de respeitar, é uma coisa que o compilador impede.

</details>

<details>
<summary><b>Gabarito — Exercício 5</b></summary>

```ts
type FrequenciaHabito = 'diario' | 'semanal' | 'dias_uteis';

type NovoHabito = Omit<Habito, 'id' | 'status' | 'streakDias' | 'criadoEm'>;
type ResumoHabito = Pick<Habito, 'id' | 'titulo' | 'status' | 'categoria'>;
type AtualizacaoHabito = Partial<NovoHabito>;
```

**Ao acrescentar `lembreteHora: string` a `Habito`:** você não precisa editar **nenhum** dos três. `NovoHabito` e `AtualizacaoHabito` ganham o campo automaticamente; `ResumoHabito` continua com os quatro campos que pediu.

É o argumento inteiro: existe **um** tipo, e os outros são derivados. Se você tivesse escrito quatro interfaces à mão, teria quatro lugares para esquecer de atualizar — e o compilador não avisaria, porque quatro interfaces independentes são, para ele, quatro coisas que não têm relação nenhuma.

</details>

<details>
<summary><b>Gabarito — Exercício 6</b></summary>

```ts
function ehHabito(valor: unknown): valor is Habito {
  return (
    typeof valor === 'object' &&
    valor !== null &&
    'id' in valor &&
    'titulo' in valor &&
    'status' in valor
  );
}

function lerHabito(json: unknown): Habito {
  if (!ehHabito(json)) {
    throw new Error('Resposta não tem o formato de Habito');
  }
  return json;
}

// R: `as` não gera nenhum código — ele só silencia o compilador,
//    e o objeto errado segue viagem até quebrar em runtime.
```

**A diferença que importa:** `as` é uma afirmação sua; o type guard é uma **verificação executada**. Compare o JavaScript gerado: o `as` desaparece por completo na compilação, o `ehHabito` continua lá rodando.

**Honestidade sobre este gabarito:** verificar a presença das chaves não garante os **tipos** delas — `{ id: 42, titulo: null, status: 'banana' }` passa neste guard. Em produção isso se resolve validando o JSON em runtime com Zod ou Valibot. Voltaremos a esse ponto na aula de integração com API.

</details>

---

## Resumo de tempos

| Parte | Onde | Tempo |
|---|---|---|
| Exercícios 1 e 2 | Sala, sem computador | ~9 min |
| Exercícios 3 a 6 | Sala, no computador | ~28 min |
| Atividade 1 | Casa | 2–3 h |
| Práticas 1 a 4 *(`practice.md`)* | Casa | ~2 h 15 |

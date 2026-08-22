# Exercícios e Atividades — Aula 2

> **Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School
> **Domínio usado nos exercícios guiados:** Rastreador de Micro-hábitos e Condicionamento Físico (`Habito`).
> **Projetos da disciplina:** ao longo do semestre cada estudante constrói um app abaixo. Os exercícios desta aula usam o domínio `Habito`.

| Projeto | Repositório | Branch da disciplina |
|---|---|---|
| Rastreador de Micro-hábitos e Condicionamento Físico | `habit-tracker-expo` | `ads025_2026-2` |

## Como usar este arquivo

- **Parte 1 — Exercícios guiados** (em sala, ~20 min): foco em **acurácia**. São propositalmente simples. O objetivo é usar o conceito **corretamente**, não criativamente. Chame o professor quando travar.
- **Parte 2 — Atividades aplicadas** (para casa): exigem **decisão**, não repetição.
- **Gabaritos**: no final, em seções colapsadas. Tente antes de abrir — abrir cedo é o jeito mais eficiente de não aprender.

**Setup necessário para os exercícios 1 a 3:**

```bash
node --version              # precisa ser 22.11 ou superior
npx create-expo-app@latest habit-tracker-expo
cd habit-tracker-app
npx expo start
```

---

# Parte 1 — Exercícios guiados

## Exercício 1 — Complete o código: componentes básicos

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

## Exercício 2 — Refatore: união discriminada

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

## Exercício 3 — Complete: utility types

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

# Parte 2 — Atividades aplicadas

## Atividade 1 — Modelagem e tela do hábito do dia

**Nível:** ⭐⭐⭐ · **Tempo estimado:** 2 a 3 h · **Entrega:** individual ou em dupla · **Prazo:** próxima aula

### Contexto

Você está no time que constrói o **Rastreador de Micro-hábitos e Condicionamento Físico**, se for o projeto do seu estudante. O backend ainda não existe. Sua tarefa é construir a **tela do hábito do dia** com dados mockados, mas com o domínio **modelado de verdade**, de modo que a troca do mock pela API real seja quase indolor.

Note que esta tela mostra **uma única entidade em destaque**, não uma lista — listas e `FlatList` chegam na próxima aula 4.

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
| Exercícios 1 a 3 | Sala, sem computador | ~9 min |
| Atividade 1 | Casa | 2–3 h |
| Atividade 2 | Casa | ~1 h |

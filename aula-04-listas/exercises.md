# Exercícios e Atividades — Aula 4 (domínio Hábito)

> **Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School
> **Domínio deste arquivo:** Rastreador de Micro-hábitos e Condicionamento Físico (`Habito`).
> **Está no outro projeto?** Se o seu app é o **App de Gestão e Rotina Pet**, use o arquivo `practice.md` — mesma estrutura, mesmos conceitos, domínio `Pet`.

| Projeto | Repositório | Branch da disciplina |
|---|---|---|
| Rastreador de Micro-hábitos e Condicionamento Físico | `habit-tracker-expo` | `feature/aula_04` |

## Como usar este arquivo

- **Parte 1 — Exercícios guiados** (em sala, ~38 min): foco em **acurácia**. São propositalmente simples. O objetivo é usar o conceito **corretamente**, não criativamente. Chame o professor quando travar.
- **Parte 2 — Atividades aplicadas** (para casa): exigem **decisão**, não repetição.
- **Todo exercício vem com um scaffold** — um esqueleto de código com marcações `// TODO`. Você completa os trechos que faltam; não precisa escrever do zero, e não deve apagar a estrutura dada.
- **Gabaritos**: no final, em seções colapsadas. Tente antes de abrir — abrir cedo é o jeito mais eficiente de não aprender.

> 🧩 **Como usar os scaffolds:** a estrutura do arquivo, os imports e os nomes dos estilos já estão lá — o que falta é o miolo, que é onde está o conceito da aula. **Apague o comentário `// TODO` quando resolver aquele ponto.** Um arquivo sem nenhum `TODO` é um exercício concluído, e é assim que o professor confere rápido quem parou onde.

> 📦 **O que esta aula acrescenta ao seu catálogo:** **`Pressable`**, **`FlatList`** e **`SectionList`**. Tudo das Aulas 1 a 3 continua valendo e deve ser usado — `View`, `Text`, `Image`, `TextInput`, `ScrollView`, `Button`, `Switch`, `StyleSheet`, Flexbox e `useState`. **Não use nas entregas:** componentes de toque que não sejam o `Pressable`, bibliotecas de lista de terceiros, animação, gestos, navegação e chamadas de rede. Todos eles ou já foram substituídos por algo melhor, ou ainda vão chegar na disciplina.

> ⚠️ **Regras de escrita válidas para todos os exercícios** — as cinco primeiras vêm da Aula 3 e continuam valendo; as três últimas são desta aula:
> 1. **Sem `JSX.Element`** como tipo de retorno. Não anote o retorno; o TypeScript infere.
> 2. **Sem `as const`** dentro de `StyleSheet.create`. Em `theme.ts`, sim.
> 3. **`gap`** (ou `ItemSeparatorComponent`) para espaçar irmãos, nunca `margin` em cada filho.
> 4. **`boxShadow`** para sombra, não o quarteto `shadow*` + `elevation`.
> 5. **Zero `any`.**
> 6. **A ação vai em `onPress`**, nunca em `onPressIn`. Feedback visual vai no `pressed`.
> 7. **`renderItem` declarado fora do componente**, sempre que não depender de estado local.
> 8. **Toda lista tem `ListEmptyComponent`.** Sem exceção — inclusive as dos exercícios.

**O domínio, retomado da Aula 3** — é a base de todos os scaffolds daqui:

```tsx
type StatusHabito = 'pendente' | 'concluido' | 'pulado';

interface Habito {
  id: string;
  titulo: string;
  categoria: string;
  status: StatusHabito;
  streakDias: number;
}
```

**Setup dos exercícios 3 a 7** (projeto de sandbox, descartável — os exercícios 1, 2 e 4 são no papel):

```bash
npx create-expo-app@latest sandbox-aula4
cd sandbox-aula4
npm run reset-project
npx expo start
```

**Setup da Atividade Aplicada 1** (seu projeto de verdade):

```bash
git clone <url-do-seu-repositorio> habit-tracker-expo
cd habit-tracker-expo
git checkout -b feature/aula_04
npm install
npx expo start
```

---

# Parte 1 — Exercícios guiados

## Exercício 1 — Associação: qual prop resolve o sintoma

**Nível:** ⭐ · **Tempo:** 3 min · **Sem computador**

Associe cada sintoma relatado por um usuário (ou por você, testando) à prop que resolve. Cada prop é usada **uma vez**.

| # | **Sintoma** | | **Prop** |
|---|---|---|---|
| 1 | "O ✕ de excluir é minúsculo, eu erro o toque" | ( ) | a. `ListEmptyComponent` |
| 2 | "A tela fica em branco quando não tenho nenhum hábito" | ( ) | b. `stickySectionHeadersEnabled` |
| 3 | "Marquei um hábito, mas a lista não mudou de aparência" | ( ) | c. `hitSlop` |
| 4 | "O item acende sozinho enquanto eu rolo a lista" | ( ) | d. `ItemSeparatorComponent` |
| 5 | "Sobra um espaço estranho depois do último item" | ( ) | e. `extraData` |
| 6 | "O título do grupo gruda no iPhone e não no Android" | ( ) | f. `keyExtractor` |
| 7 | "O 'concluído' pulou para o item errado depois que filtrei" | ( ) | g. `unstable_pressDelay` |

### Esqueleto da resposta

Preencha a linha abaixo (uma letra por número) e depois responda às três perguntas:

```
1-__  2-__  3-__  4-__  5-__  6-__  7-__
```

1. No item **3**, existe uma correção **melhor** que a prop indicada. Qual, e por quê?
2. No item **7**, em que situação exatamente o problema aparece? (Dica: não é sempre.)
3. No item **6**, qual dos dois comportamentos está "errado"?

---

## Exercício 2 — Caça ao erro

**Nível:** ⭐⭐ · **Tempo:** 5 min · **Sem computador**

O código abaixo tem **seis** erros relacionados ao conteúdo desta aula (e um da Aula 3, de brinde). Encontre e corrija todos.

```tsx
import { useState } from 'react';
import { ScrollView, FlatList, Pressable, Text, View, StyleSheet } from 'react-native';

const HABITOS: Habito[] = [ /* 200 itens */ ];

export default function TelaHabitos() {
  const [habitos, setHabitos] = useState(HABITOS);

  function concluir(id: string) {
    const alvo = habitos.find((h) => h.id === id);
    if (alvo) alvo.status = 'concluido';
    setHabitos(habitos);
  }

  return (
    <ScrollView>
      <Text style={styles.titulo}>Hábitos de hoje</Text>
      <FlatList
        data={habitos}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => (
          <Pressable
            onPressIn={() => concluir(item.id)}
            style={[styles.item, styles.itemPressionado]}
          >
            {item.titulo}
          </Pressable>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titulo: { fontSize: 20, fontWeight: '600' },
  item: { padding: 16, marginBottom: 8, backgroundColor: '#fff' },
  itemPressionado: { backgroundColor: '#eee' },
});
```

### Esqueleto da correção

Para cada erro, preencha uma linha. **Não basta dizer o que está errado — diga o que acontece na tela.**

| # | Linha / trecho | O que está errado | O que o usuário vê | Correção |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |
| 6 | | | | |
| 7 | | | | *(o da Aula 3)* |

---

## Exercício 3 — Reproduza: o botão tocável com feedback

**Nível:** ⭐ · **Tempo:** 8 min

Construa um `BotaoAcao` reutilizável usando `Pressable`. Ele deve:

- mudar de aparência **enquanto** está pressionado;
- ter área de toque maior que o desenho;
- mostrar a ondinha nativa no Android;
- anunciar-se corretamente para leitores de tela;
- ficar apagado e sem reagir quando `desabilitado` for `true`.

### Esqueleto

```tsx
// components/botao-acao.tsx
import { Pressable, Text, StyleSheet } from 'react-native';

type BotaoAcaoProps = {
  rotulo: string;
  onPressionar: () => void;
  desabilitado?: boolean;
};

export function BotaoAcao({ rotulo, onPressionar, desabilitado = false }: BotaoAcaoProps) {
  return (
    <Pressable
      // TODO 1: qual callback recebe a AÇÃO? (cuidado: não é o que dispara ao encostar)
      // TODO 2: desabilitar o toque quando `desabilitado` for true
      // TODO 3: aumentar a área sensível em 10 px SEM mudar o layout
      // TODO 4: ondinha nativa do Android com a cor '#FFB132'
      // TODO 5: as duas props de acessibilidade — papel e rótulo falado
      style={/* TODO 6: função que devolve o array de estilos.
                        base sempre; `botaoPressionado` só enquanto pressionado;
                        `botaoDesabilitado` quando a prop for true */}
    >
      <Text style={styles.rotulo}>{rotulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#FF6002',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  botaoPressionado: {
    // TODO 7: como o botão fica ENQUANTO o dedo está nele.
    //         Escolha uma mudança visível mas discreta.
  },
  botaoDesabilitado: {
    // TODO 8: aparência de desligado
  },
  rotulo: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
```

### Teste (na tela onde você for renderizar)

```tsx
const [salvo, setSalvo] = useState(false);

<View style={{ flex: 1, justifyContent: 'center', padding: 24, gap: 16 }}>
  <BotaoAcao rotulo="Salvar hábito" onPressionar={() => setSalvo(true)} />
  <BotaoAcao rotulo="Salvar hábito" onPressionar={() => setSalvo(true)} desabilitado />
  <Text>{salvo ? 'Salvo!' : 'Ainda não salvo'}</Text>
</View>
```

**Confira:** ao **arrastar o dedo para fora** do botão antes de soltar, o texto **não** pode mudar para "Salvo!". Se mudar, o TODO 1 está errado.

---

## Exercício 4 — Previsão: o ciclo de vida do toque

**Nível:** ⭐⭐ · **Tempo:** 5 min · **Preveja ANTES de rodar**

### Esqueleto — o laboratório

```tsx
import { useState } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

export default function LabToque() {
  const [log, setLog] = useState<string[]>([]);
  const registrar = (evento: string) => setLog((l) => [...l, evento]);

  return (
    <View style={styles.tela}>
      <Pressable
        style={({ pressed }) => [styles.alvo, pressed && styles.alvoPressionado]}
        onPressIn={() => registrar('onPressIn')}
        onPressOut={() => registrar('onPressOut')}
        onPress={() => registrar('onPress')}
        onLongPress={() => registrar('onLongPress')}
      >
        <Text style={styles.rotuloAlvo}>Toque aqui</Text>
      </Pressable>

      <Text style={styles.limpar} onPress={() => setLog([])}>limpar</Text>
      {log.map((e, i) => <Text key={i} style={styles.linha}>{i + 1}. {e}</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 8, justifyContent: 'center' },
  alvo: { backgroundColor: '#FF6002', padding: 32, borderRadius: 16, alignItems: 'center' },
  alvoPressionado: { backgroundColor: '#232323' },
  rotuloAlvo: { color: '#fff', fontSize: 18, fontWeight: '600' },
  limpar: { color: '#6b6459', textDecorationLine: 'underline', paddingVertical: 8 },
  linha: { fontFamily: 'monospace' },
});
```

### Esqueleto da previsão

Para cada gesto, escreva **a sequência de eventos, em ordem**, antes de testar.

| Gesto | Sua previsão | O que aconteceu |
|---|---|---|
| **A.** Toque rápido e solto | | |
| **B.** Segurar 2 segundos e soltar | | |
| **C.** Encostar, arrastar para fora do quadrado e soltar lá fora | | |
| **D.** Encostar, arrastar **5 px** para o lado e soltar ainda em cima | | |

Depois de rodar, responda:

1. No gesto **C**, `onPress` disparou? Por que isso é um recurso e não um defeito?
2. No gesto **D**, por que o resultado foi diferente do **C**? Qual prop (e qual default) explica isso?
3. No gesto **B**, `onPress` disparou depois do `onLongPress`?
4. Se a ação estivesse em `onPressIn`, qual dos quatro gestos passaria a se comportar de forma indesejada?

---

## Exercício 5 — Complete: a `FlatList` inteira

**Nível:** ⭐⭐ · **Tempo:** 10 min

Monte uma tela de hábitos com `FlatList` completa: cabeçalho, separador, estado vazio, itens tocáveis e chave correta.

### Esqueleto

```tsx
// app/index.tsx
import { useState } from 'react';
import { FlatList, Pressable, Text, View, StyleSheet } from 'react-native';

type StatusHabito = 'pendente' | 'concluido' | 'pulado';

interface Habito {
  id: string;
  titulo: string;
  categoria: string;
  status: StatusHabito;
  streakDias: number;
}

const MOCK: Habito[] = [
  { id: 'a1', titulo: 'Beber água',     categoria: 'saúde', status: 'pendente',  streakDias: 4 },
  { id: 'a2', titulo: 'Alongar 5 min',  categoria: 'corpo', status: 'concluido', streakDias: 12 },
  { id: 'a3', titulo: 'Ler 10 páginas', categoria: 'mente', status: 'pendente',  streakDias: 0 },
  { id: 'a4', titulo: 'Meditar',        categoria: 'mente', status: 'pulado',    streakDias: 2 },
];

// TODO 1: componente do separador entre itens (uma View de 10 px de altura, sem cor)

// TODO 2: componente do estado vazio — um título e uma frase de apoio.
//         Este componente É avaliado: uma tela em branco parece bug.

// TODO 3: o cabeçalho. Passe de um jeito que NÃO remonte a cada render.

type ItemProps = { habito: Habito; onAlternar: (id: string) => void };

function ItemHabito({ habito, onAlternar }: ItemProps) {
  const concluido = habito.status === 'concluido';
  return (
    <Pressable
      // TODO 4: chamar onAlternar com o id — no callback CERTO
      // TODO 5: evitar que o item pisque quando o dedo só está começando a rolar
      style={/* TODO 6: função com `pressed` */}
    >
      <View style={styles.itemTexto}>
        <Text style={[styles.titulo, concluido && styles.tituloConcluido]}>{habito.titulo}</Text>
        <Text style={styles.legenda}>{habito.categoria} · {habito.streakDias} dias</Text>
      </View>
      <Text style={styles.marcador}>{concluido ? '✓' : '○'}</Text>
    </Pressable>
  );
}

export default function TelaHabitos() {
  const [habitos, setHabitos] = useState<Habito[]>(MOCK);

  function alternar(id: string) {
    // TODO 7: alternar entre 'pendente' e 'concluido'.
    //         ATENÇÃO: se a lista não mudar de aparência, você mutou em vez de criar um array novo.
  }

  return (
    <View style={styles.tela}>
      <FlatList
        data={habitos}
        renderItem={({ item }) => <ItemHabito habito={item} onAlternar={alternar} />}
        // TODO 8: precisa de keyExtractor aqui? Responda em um comentário de uma linha,
        //         com o motivo. (Cuidado: a resposta óbvia não é a certa.)
        // TODO 9: ligar separador, estado vazio e cabeçalho
        contentContainerStyle={styles.conteudo}
      />
      <Text style={styles.limpar} onPress={() => setHabitos([])}>esvaziar a lista</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tela:            { flex: 1, backgroundColor: '#FEF7EE' },
  conteudo:        { padding: 16, paddingBottom: 32 },
  cabecalho:       { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  item:            { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                     gap: 12, backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12,
                     boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  itemPressionado: { backgroundColor: '#F3E9DC' },
  itemTexto:       { flex: 1, gap: 2 },
  titulo:          { fontSize: 16, fontWeight: '600', color: '#191919' },
  tituloConcluido: { textDecorationLine: 'line-through', color: '#6b6459' },
  legenda:         { fontSize: 13, color: '#6b6459' },
  marcador:        { fontSize: 20, color: '#FF6002' },
  separador:       { height: 10 },
  vazio:           { alignItems: 'center', gap: 6, paddingVertical: 48 },
  vazioTitulo:     { fontSize: 17, fontWeight: '600', color: '#191919' },
  limpar:          { textAlign: 'center', padding: 12, color: '#6b6459',
                     textDecorationLine: 'underline' },
});
```

**Confira, nesta ordem:**

1. A lista aparece? (Se não: `flex: 1`.)
2. Tocar num item risca o título? (Se não: você mutou o objeto.)
3. Tocar em "esvaziar a lista" mostra o estado vazio? (Se aparece só branco: TODO 2.)

---

## Exercício 6 — Complete: `SectionList` a partir de dados planos

**Nível:** ⭐⭐ · **Tempo:** 7 min

Reaproveite o mesmo `MOCK` e a mesma `ItemHabito` do Exercício 5. Agrupe por status.

### Esqueleto

```tsx
// app/secoes.tsx
import { SectionList, Text, View, StyleSheet } from 'react-native';

type Secao = { title: string; data: Habito[] };

function agruparPorStatus(habitos: Habito[]): Secao[] {
  const rotulos: Record<StatusHabito, string> = {
    // TODO 1: um rótulo legível por status
  };
  const ordem: StatusHabito[] = [/* TODO 2: a ordem em que os grupos aparecem na tela */];

  // TODO 3: montar o array de seções a partir de `ordem` e `rotulos`.
  //         Cada seção precisa do campo obrigatório da API e do campo que VOCÊ inventou.
  // TODO 4: não exibir grupo vazio. Uma linha.
}

export default function TelaSecoes({ habitos }: { habitos: Habito[] }) {
  return (
    <View style={styles.tela}>
      <SectionList
        sections={/* TODO 5 */}
        renderItem={/* TODO 6: reaproveite ItemHabito */}
        renderSectionHeader={/* TODO 7: leia o campo que você inventou no TODO 3 */}
        renderSectionFooter={/* TODO 8: "N hábito(s)" — dica: a seção conhece o próprio data */}
        // TODO 9: fazer o cabeçalho grudar no topo — nas DUAS plataformas.
        //         Não confie no default.
        // TODO 10: estado vazio (regra 8 deste arquivo)
        contentContainerStyle={styles.conteudo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela:           { flex: 1, backgroundColor: '#FEF7EE' },
  conteudo:       { padding: 16, paddingBottom: 32 },
  cabecalhoSecao: { fontSize: 13, fontWeight: '700', textTransform: 'uppercase',
                    color: '#6b6459', backgroundColor: '#FEF7EE', paddingVertical: 8 },
  rodapeSecao:    { fontSize: 12, color: '#6b6459', paddingBottom: 16 },
});
```

**Confira:** o `cabecalhoSecao` tem `backgroundColor` de propósito. Remova-o, role a lista e veja o que acontece com o cabeçalho grudado. Escreva em um comentário por que a cor é necessária.

**Pergunta final (responda em comentário no arquivo):** você precisou mudar **alguma coisa** dentro do `ItemHabito` para ele funcionar no `SectionList`? O que isso te diz sobre a diferença entre os dois componentes?

---

## Exercício 7 — Corrija: a lista que não atualiza

**Nível:** ⭐⭐⭐ · **Tempo:** 5 min · *Sobra: quem terminar antes faz em sala; os demais levam para casa*

### Esqueleto — o código quebrado, pronto para rodar

```tsx
import { useState } from 'react';
import { FlatList, Pressable, Text, View, StyleSheet } from 'react-native';

export default function TelaSelecao() {
  const [habitos] = useState<Habito[]>(MOCK);
  const [selecionados, setSelecionados] = useState<Set<string>>(new Set());

  function alternarSelecao(id: string) {
    selecionados.has(id) ? selecionados.delete(id) : selecionados.add(id);
    setSelecionados(selecionados);
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.contador}>{selecionados.size} selecionado(s)</Text>
      <FlatList
        data={habitos}
        renderItem={({ item }) => (
          <Pressable onPress={() => alternarSelecao(item.id)} style={styles.item}>
            <Text>{selecionados.has(item.id) ? '☑' : '☐'} {item.titulo}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
```

Rode. **Nada acontece ao tocar.** Há **dois** motivos independentes, e cada um exige uma correção diferente.

1. Descreva o primeiro motivo (o que impede o `useState` de perceber a mudança) e corrija.
2. Descreva o segundo motivo (o que impede a `FlatList` de perceber a mudança **mesmo depois** de corrigir o primeiro) e corrija.
3. Existem **duas** correções possíveis para o segundo motivo. Escreva as duas e diga qual você escolheria, com o motivo.
4. Falta ainda uma coisa neste arquivo que as regras deste documento exigem. Qual?

---

# Parte 2 — Atividades aplicadas

## Atividade 1 — A tela de lista de verdade

**Nível:** ⭐⭐⭐ · **Tempo:** 3–4 h · **Entrega:** branch `feature/aula_04` do repositório do grupo

### Contexto

Na Aula 3 vocês deixaram a tela do projeto **apresentável**: tokens, `Card`, Flexbox, um formulário. Mas ela só sabia mostrar os itens que vocês digitaram na mão dentro do JSX — e o botão era um remendo.

Agora ela vira uma tela de produto: uma lista de verdade, com itens que reagem ao toque e com os estados que uma lista real tem.

### O que entregar

1. **Uma tela principal** que lista os hábitos do usuário com **`SectionList`**, agrupando por um critério que faça sentido para o produto (status, período do dia ou categoria — escolham e justifiquem no README).
2. **Item tocável** com `Pressable`, reaproveitando o `Card` da Aula 3 por dentro. O toque alterna o status do hábito.
3. **Ação secundária no toque longo** (`onLongPress`) — por exemplo, remover o hábito da lista.
4. **Os quatro estados da lista**, todos implementados:
   - **com dados** — o caso normal;
   - **vazio** — `ListEmptyComponent`, com um texto que diga ao usuário **o que fazer**;
   - **atualizando** — `refreshing` + `onRefresh`;
   - **filtrado sem resultado** — um `TextInput` de busca no `ListHeaderComponent` que filtra por título; quando nada casa, o estado vazio precisa dizer isso, e **não** a mesma frase do primeiro acesso.
5. **Um `BotaoAcao`** reutilizável (o do Exercício 3), usado em pelo menos dois lugares, substituindo qualquer `<Button>` ou `<Text onPress>` que tenha sobrado da Aula 3.
6. **README.md** com uma seção "Decisões da Aula 4" respondendo, em texto corrido:
   - por que `SectionList` e não `FlatList` neste caso;
   - onde vocês agrupam os dados, e por que **não** é dentro do JSX;
   - o que acontece com o cabeçalho de seção em cada plataforma, e o que vocês decidiram.

### Esqueletos para começar

```tsx
// data/habitos.ts — o mock cresce: no mínimo 20 itens, em pelo menos 3 grupos.
// Lista pequena esconde exatamente os problemas que esta aula ensina a evitar.
export const HABITOS: Habito[] = [
  // TODO 1: 20+ itens
];
```

```tsx
// lib/agrupar.ts — transformação de dado. Sem JSX aqui dentro.
import { type Habito, type StatusHabito } from '@/types';

export type Secao = { title: string; data: Habito[] };

export function agrupar(habitos: Habito[]): Secao[] {
  // TODO 2: agrupar pelo critério que o grupo escolheu
  // TODO 3: descartar grupos vazios
  // TODO 4: a ordem dos grupos é uma DECISÃO. Escreva num comentário qual foi e por quê.
}

export function filtrarPorTitulo(habitos: Habito[], busca: string): Habito[] {
  // TODO 5: busca sem diferenciar maiúscula/minúscula. Busca vazia devolve tudo.
}
```

```tsx
// components/item-habito.tsx
type ItemHabitoProps = {
  habito: Habito;
  onAlternar: (id: string) => void;
  onRemover: (id: string) => void;
};

export function ItemHabito({ habito, onAlternar, onRemover }: ItemHabitoProps) {
  return (
    <Pressable
      // TODO 6: toque curto alterna; toque longo remove
      // TODO 7: acessibilidade — papel e rótulo
      // TODO 8: hitSlop e unstable_pressDelay. Justifique cada valor num comentário.
      style={/* TODO 9 */}
    >
      {/* TODO 10: reaproveite o Card da Aula 3 aqui dentro.
                   Se o Card não couber, explique no README por que você mudou. */}
    </Pressable>
  );
}
```

```tsx
// components/lista-vazia.tsx
type ListaVaziaProps = {
  // TODO 11: uma prop que permita distinguir "primeiro acesso" de "busca sem resultado"
};

export function ListaVazia(/* TODO 11 */) {
  // TODO 12: dois textos diferentes. O da busca menciona o termo procurado.
}
```

```tsx
// app/index.tsx
export default function TelaHabitos() {
  const [habitos, setHabitos] = useState<Habito[]>(HABITOS);
  const [busca, setBusca] = useState('');
  const [atualizando, setAtualizando] = useState(false);

  // TODO 13: alternar status — array novo, objeto novo. Nada de mutação.
  // TODO 14: remover — array novo.
  // TODO 15: recarregar — volta ao mock e limpa a busca.

  return (
    <View style={styles.tela}>
      <SectionList
        sections={/* TODO 16: filtrar E ENTÃO agrupar. A ordem importa — explique no README */}
        // TODO 17: renderItem, renderSectionHeader, separador, vazio, sticky, refresh
      />
    </View>
  );
}
```

### Restrições (é aqui que a nota se decide)

- **Nenhuma `ScrollView` envolvendo a lista.** Se você precisa de conteúdo antes ou depois, use `ListHeaderComponent` / `ListFooterComponent`.
- **Nenhuma mutação de estado.** Toda mudança cria array novo.
- **Nenhum `<Button>` nem `<Text onPress>` sobrando** onde o `Pressable` é a resposta.
- **Nenhum `margin` para espaçar itens de lista.**
- **Nenhum `any`.**
- **O agrupamento e o filtro moram fora do componente de tela**, em `lib/`.
- **Mínimo de 20 itens no mock.** Lista de 3 itens não prova nada.

### Critérios de avaliação

| Critério | Peso | O que é "bom" |
|---|---|---|
| **Correção do toque** | 20% | Ação em `onPress`; feedback via `pressed`; `onLongPress` funcionando; toque cancelável ao arrastar para fora |
| **Correção da lista** | 25% | `SectionList` bem configurada; chave estável; sem aninhamento em `ScrollView`; sem `margin` entre itens |
| **Os quatro estados** | 20% | Todos os quatro implementados e visualmente distintos; o vazio de busca **não** repete o texto do primeiro acesso |
| **Imutabilidade** | 15% | Nenhuma mutação; a lista atualiza sozinha, sem `extraData` de muleta |
| **Separação de responsabilidade** | 10% | Agrupar e filtrar são funções puras, fora do JSX |
| **Justificativa no README** | 10% | As três perguntas respondidas com critério, não com "porque é melhor" |

### O que **não** é avaliado

- Beleza da tela além do que a Aula 3 já cobrou.
- Desempenho medido. Não ajustem `windowSize` nem `maxToRenderPerBatch` — com 20 itens não há o que otimizar, e mexer sem medir é exatamente o antipadrão que a aula alertou.
- Animação de qualquer tipo.

---

## Atividade 2 — Auditoria de lista em código alheio

**Nível:** ⭐⭐ · **Tempo:** ~1 h · **Entrega:** arquivo `auditoria-lista.md` no repositório

### Contexto

Você entrou num time e pegou esta tela. Ela **funciona** — em desenvolvimento, com o mock de 8 itens. Em produção são 4 000, e o time reclama que "a tela de hábitos trava e às vezes não atualiza".

```tsx
import { useState } from 'react';
import { ScrollView, FlatList, TextInput, Text, View, StyleSheet } from 'react-native';

import { HABITOS } from '../mock';

export default function TelaHabitos() {
  const [habitos, setHabitos] = useState(HABITOS);
  const [busca, setBusca] = useState('');

  const visiveis = habitos.filter((h) => h.titulo.includes(busca));

  function marcar(id) {
    const alvo = habitos.find((h) => h.id === id);
    alvo.status = 'concluido';
    setHabitos(habitos);
  }

  return (
    <ScrollView style={styles.tela}>
      <Text style={styles.titulo}>Hábitos</Text>

      <FlatList
        data={visiveis}
        ListHeaderComponent={() => (
          <TextInput
            style={styles.busca}
            value={busca}
            onChangeText={setBusca}
            placeholder="buscar"
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitulo}>{item.titulo}</Text>
            <Text style={styles.itemAcao} onPress={() => marcar(item.id)}>
              marcar
            </Text>
          </View>
        )}
        removeClippedSubviews={true}
        windowSize={50}
        initialNumToRender={100}
      />

      <Text style={styles.rodape}>Total: {visiveis.length}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, padding: 16 },
  titulo: { fontSize: 22, fontWeight: '600' },
  busca: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  item: { padding: 14, backgroundColor: '#fff', borderRadius: 10, marginBottom: 8 },
  itemTitulo: { fontSize: 16 },
  itemAcao: { color: '#FF6002', marginTop: 4 },
  rodape: { textAlign: 'center', padding: 16, color: '#6b6459' },
});
```

### O que entregar

Um relatório em Markdown. **Não reescreva o arquivo inteiro** — o exercício é diagnosticar e priorizar, não digitar.

### Esqueleto do relatório

````markdown
# Auditoria de lista — TelaHabitos

## 1. Problemas encontrados

| # | Trecho | Problema | Sintoma para o usuário | Correção |
|---|---|---|---|---|
| 1 | | | | |
<!-- TODO: no mínimo 8 linhas. Um "problema" precisa ter sintoma — se você não
     consegue descrever o que o usuário vê, provavelmente é preferência sua. -->

## 2. O problema arquitetural

<!-- TODO: um dos problemas anula o benefício de outro componente inteiro.
     Qual é, e por que ele é mais grave que os outros sete juntos? -->

## 3. Os três ajustes de desempenho deste arquivo

<!-- TODO: `removeClippedSubviews`, `windowSize` e `initialNumToRender` foram
     mexidos. Para CADA um: qual era o default, o que a mudança causa,
     e por que ela não resolve o problema real desta tela. -->

## 4. O bug de "às vezes não atualiza"

<!-- TODO: explique a causa exata usando a palavra que a documentação usa
     para descrever o comportamento da FlatList. Dê as duas correções
     possíveis e escolha uma. -->

## 5. Ordem de refatoração — tenho meio dia

| Ordem | O que faço | Risco se não fizer | Retorno |
|---|---|---|---|
| 1 | | | |
<!-- TODO: justifique por RISCO e RETORNO. A ordem em que os problemas
     aparecem no arquivo não é uma justificativa. -->

## 6. O que eu decidi NÃO corrigir

<!-- TODO: um item, com o motivo. Toda auditoria honesta tem esse parágrafo. -->
````

### Critérios de avaliação

| Critério | Peso | O que é "bom" |
|---|---|---|
| **Cobertura** | 30% | 8+ problemas reais; sem "problemas" que são só preferência de estilo |
| **Sintoma, não jargão** | 20% | Cada item diz o que o **usuário** vê, não só o que o código faz |
| **O problema arquitetural** | 20% | Identificou o aninhamento e explicou por que ele anula a virtualização |
| **Os ajustes de desempenho** | 15% | Defaults corretos e a percepção de que foram mexidos sem medir |
| **Priorização** | 15% | Ordem justificada por risco e retorno |

---

## Atividade 3 — Refazer a lista da Aula 3 *(opcional, bônus)*

**Nível:** ⭐ · **Tempo:** ~30 min

Pegue a tela que você entregou na Atividade Aplicada da **Aula 3** e converta o que era `.map()` dentro de `ScrollView` para `FlatList`.

Entregue um `diff.md` curto respondendo:

1. Quantas linhas mudaram de fato?
2. O que **não** precisou mudar? (Dica: olhe o `StyleSheet`.)
3. Havia algum lugar em que a `ScrollView` estava **certa** e deve ficar? Qual, e por quê?

O objetivo é você ver, no seu próprio código, que a Aula 4 **acrescentou** ao que você já sabia em vez de substituir.

---

# Gabaritos

> Só abra depois de tentar. Sério.

<details>
<summary><b>Gabarito — Exercício 1</b></summary>

```
1-c   2-a   3-e   4-g   5-d   6-b   7-f
```

**1.** No item 3, a correção **melhor** que `extraData` é tratar os dados como **imutáveis**: em vez de mudar o objeto dentro do array, criar um array novo com `map` e um objeto novo com spread. `extraData` conserta o sintoma (avisa a lista de que algo mudou); a imutabilidade conserta a causa (a identidade da prop `data` realmente muda). `extraData` continua sendo a resposta certa quando o dado que mudou **não está** dentro de `data` — por exemplo, um `Set` de itens selecionados guardado à parte.

**2.** O problema do item 7 aparece quando a lista **reordena, filtra ou remove** itens. Numa lista estática, chave por índice não causa dano visível — o que faz muita gente concluir, erradamente, que "sempre funcionou". Quando a posição deixa de corresponder ao mesmo dado, o React reaproveita o componente errado para aquela posição.

**3.** Nenhum dos dois. `stickySectionHeadersEnabled` tem default `true` no iOS e `false` no Android; os dois aparelhos estão fazendo exatamente o que foi pedido. O que está errado é o **código**, que não declarou a prop e portanto deixou a decisão de produto para o sistema operacional.

</details>

<details>
<summary><b>Gabarito — Exercício 2</b></summary>

| # | Trecho | O que está errado | O que o usuário vê | Correção |
|---|---|---|---|---|
| 1 | `<ScrollView>` envolvendo a `FlatList` | `VirtualizedList` aninhada em `ScrollView` da mesma orientação | Warning no console; a lista monta os 200 itens; abre devagar e rola mal | Remover a `ScrollView`; o `<Text>` do título vira `ListHeaderComponent` |
| 2 | `keyExtractor={(item, index) => String(index)}` | Chave por posição | Ao concluir um item e a lista reordenar/filtrar, o estado "pula" para o item errado | Remover a prop — o default já usa `item.id` |
| 3 | `onPressIn={() => concluir(item.id)}` | Ação no callback de "encostou" | O hábito é concluído antes de soltar; arrastar para fora não cancela | `onPress` |
| 4 | `style={[styles.item, styles.itemPressionado]}` | Array fixo: o estilo "pressionado" está sempre aplicado | O item nasce cinza e nunca dá feedback | `style={({ pressed }) => [styles.item, pressed && styles.itemPressionado]}` |
| 5 | `alvo.status = 'concluido'; setHabitos(habitos)` | Mutação: o array continua sendo o mesmo | Nada muda na tela ao tocar | `setHabitos((a) => a.map((h) => h.id === id ? { ...h, status: 'concluido' } : h))` |
| 6 | `marginBottom: 8` em `styles.item` | Espaçamento por margem de item | Sobra um espaço depois do último item | `ItemSeparatorComponent`, ou `contentContainerStyle={{ gap: 8 }}` |
| 7 | `{item.titulo}` solto dentro do `Pressable` | Texto fora de `<Text>` (Aula 3) | Erro em runtime: *Text strings must be rendered within a `<Text>` component* | `<Text>{item.titulo}</Text>` |

**Bônus que vale comentar:** falta `ListEmptyComponent`, e não há `flex: 1` num contêiner de tela. Nenhum dos dois estava na conta dos seis, mas os dois apareceriam na revisão de código.

</details>

<details>
<summary><b>Gabarito — Exercício 3</b></summary>

```tsx
// components/botao-acao.tsx
import { Pressable, Text, StyleSheet } from 'react-native';

type BotaoAcaoProps = {
  rotulo: string;
  onPressionar: () => void;
  desabilitado?: boolean;
};

export function BotaoAcao({ rotulo, onPressionar, desabilitado = false }: BotaoAcaoProps) {
  return (
    <Pressable
      onPress={onPressionar}                       // TODO 1 — a ação vai aqui, não em onPressIn
      disabled={desabilitado}                      // TODO 2
      hitSlop={10}                                 // TODO 3 — área sensível, não layout
      android_ripple={{ color: '#FFB132' }}        // TODO 4
      accessibilityRole="button"                   // TODO 5
      accessibilityLabel={rotulo}
      style={({ pressed }) => [                    // TODO 6
        styles.botao,
        pressed && styles.botaoPressionado,
        desabilitado && styles.botaoDesabilitado,
      ]}
    >
      <Text style={styles.rotulo}>{rotulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#FF6002',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  botaoPressionado: {                              // TODO 7
    backgroundColor: '#D14E00',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  },
  botaoDesabilitado: {                             // TODO 8
    backgroundColor: '#E4D6C3',
    boxShadow: 'none',
  },
  rotulo: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
```

**Por que a ordem do array importa:** `botaoDesabilitado` vem **depois** de `botaoPressionado`, então se por algum motivo os dois fossem verdadeiros, o desabilitado venceria. É a mesma regra de precedência da Aula 3 — o último a falar ganha —, agora com um dos booleanos vindo do framework.

**Por que `hitSlop` e não `padding`:** `padding` mudaria o tamanho do botão na tela, empurrando os vizinhos e quebrando o `gap` do contêiner. `hitSlop` deixa o desenho intacto e só amplia a região que aceita o toque.

**Por que `accessibilityLabel={rotulo}` e não um texto fixo:** o botão é reutilizável; um rótulo fixo mentiria em todos os usos menos um. Em um botão com ícone e sem texto, aí sim o `accessibilityLabel` precisaria ser passado por prop.

</details>

<details>
<summary><b>Gabarito — Exercício 4</b></summary>

| Gesto | Sequência |
|---|---|
| **A.** Toque rápido | `onPressIn` → `onPressOut` → `onPress` |
| **B.** Segurar 2 s | `onPressIn` → `onLongPress` (aos 500 ms) → `onPressOut` (ao soltar) |
| **C.** Arrastar para fora e soltar | `onPressIn` → `onPressOut`. **Sem `onPress`** |
| **D.** Arrastar 5 px e soltar em cima | `onPressIn` → `onPressOut` → `onPress` (igual ao A) |

**1.** No gesto **C**, `onPress` **não** dispara. É um recurso: encostei sem querer, percebi, arrastei o dedo para fora e soltei — o gesto universal de "cancelar" em interface de toque. Se a ação estivesse em `onPressIn`, o usuário não teria essa saída.

**2.** O gesto **D** ainda conta como toque válido por causa do `pressRetentionOffset`, cujo default é `{top: 20, left: 20, right: 20, bottom: 30}`. Deslocamentos dentro dessa folga não cancelam o toque. É o que faz o botão funcionar para um dedo real, que nunca fica parado.

**3.** Não. Quando `onLongPress` dispara, ele **substitui** o `onPress` daquele gesto. `onPressOut` ainda acontece ao soltar.

**4.** O gesto **C** — que é justamente o de cancelar. Com a ação em `onPressIn`, ele deixa de existir: o app executa a ação no instante em que o dedo encosta e o usuário perde a chance de desistir.

</details>

<details>
<summary><b>Gabarito — Exercício 5</b></summary>

```tsx
function Separador() {                                            // TODO 1
  return <View style={styles.separador} />;
}

function ListaVazia() {                                           // TODO 2
  return (
    <View style={styles.vazio}>
      <Text style={styles.vazioTitulo}>Nenhum hábito por aqui</Text>
      <Text style={styles.legenda}>Toque em “Novo hábito” para começar.</Text>
    </View>
  );
}

const Cabecalho = <Text style={styles.cabecalho}>Hábitos de hoje</Text>;   // TODO 3

function ItemHabito({ habito, onAlternar }: ItemProps) {
  const concluido = habito.status === 'concluido';
  return (
    <Pressable
      onPress={() => onAlternar(habito.id)}                       // TODO 4
      unstable_pressDelay={80}                                    // TODO 5
      style={({ pressed }) => [styles.item, pressed && styles.itemPressionado]}   // TODO 6
    >
      {/* ... */}
    </Pressable>
  );
}

export default function TelaHabitos() {
  const [habitos, setHabitos] = useState<Habito[]>(MOCK);

  function alternar(id: string) {                                 // TODO 7
    setHabitos((atuais) =>
      atuais.map((h) =>
        h.id === id
          ? { ...h, status: h.status === 'concluido' ? 'pendente' : 'concluido' }
          : h,
      ),
    );
  }

  return (
    <View style={styles.tela}>
      <FlatList
        data={habitos}
        renderItem={({ item }) => <ItemHabito habito={item} onAlternar={alternar} />}
        // TODO 8: não precisa. O extractor padrão checa item.key, depois item.id — e o
        //         Habito tem id. Escrever keyExtractor aqui só repetiria o default.
        ItemSeparatorComponent={Separador}                        // TODO 9
        ListEmptyComponent={ListaVazia}
        ListHeaderComponent={Cabecalho}
        contentContainerStyle={styles.conteudo}
      />
      <Text style={styles.limpar} onPress={() => setHabitos([])}>esvaziar a lista</Text>
    </View>
  );
}
```

**Sobre o TODO 3:** `Cabecalho` é uma **constante com o elemento pronto**, definida fora do componente. Se fosse `ListHeaderComponent={() => <Text>...</Text>}`, uma arrow anônima nova nasceria a cada render, o React trataria como um tipo de componente diferente e remontaria o cabeçalho. Com um `<Text>` simples ninguém percebe; com um `TextInput` de busca lá dentro (Atividade 1), o campo perde o foco a cada tecla.

**Sobre o TODO 7:** o `map` cria array novo e o spread cria objeto novo. Se você tivesse feito `habitos.find(...).status = 'concluido'`, o array continuaria idêntico, a `FlatList` — que é `PureComponent` — não veria diferença nenhuma, e a tela não mudaria.

**Sobre o TODO 8 (a pegadinha):** a resposta "óbvia" é escrever o `keyExtractor`, porque é o que todo tutorial manda. A resposta certa é **não escrever**: o default já resolve quando o item tem `id`.

**Sobre o `renderItem` inline:** aqui ele está dentro do JSX porque precisa da função `alternar`, que vive no componente. É a exceção consciente à regra 7 deste arquivo — e a ferramenta que resolveria isso direito chega na Aula 6.

</details>

<details>
<summary><b>Gabarito — Exercício 6</b></summary>

```tsx
function agruparPorStatus(habitos: Habito[]): Secao[] {
  const rotulos: Record<StatusHabito, string> = {                 // TODO 1
    pendente:  'Pendentes',
    concluido: 'Concluídos',
    pulado:    'Pulados',
  };
  const ordem: StatusHabito[] = ['pendente', 'concluido', 'pulado'];   // TODO 2

  return ordem
    .map((status) => ({                                           // TODO 3
      title: rotulos[status],        // campo SEU — poderia se chamar qualquer coisa
      data: habitos.filter((h) => h.status === status),   // campo obrigatório da API
    }))
    .filter((secao) => secao.data.length > 0);                    // TODO 4
}

export default function TelaSecoes({ habitos }: { habitos: Habito[] }) {
  return (
    <View style={styles.tela}>
      <SectionList
        sections={agruparPorStatus(habitos)}                      // TODO 5
        renderItem={({ item }) => <ItemHabito habito={item} onAlternar={alternar} />}  // TODO 6
        renderSectionHeader={({ section }) => (                   // TODO 7
          <Text style={styles.cabecalhoSecao}>{section.title}</Text>
        )}
        renderSectionFooter={({ section }) => (                   // TODO 8
          <Text style={styles.rodapeSecao}>{section.data.length} hábito(s)</Text>
        )}
        stickySectionHeadersEnabled                               // TODO 9
        ListEmptyComponent={ListaVazia}                           // TODO 10
        contentContainerStyle={styles.conteudo}
      />
    </View>
  );
}
```

**Sobre o TODO 2 — a ordem é uma decisão:** `['pendente', 'concluido', 'pulado']` coloca o que exige ação do usuário em cima. Ordem alfabética seria "concluído, pendente, pulado", que enterra o grupo mais importante no meio. O componente não tem opinião sobre isso; você tem.

**Sobre o TODO 9:** sem declarar, o cabeçalho gruda no iOS (default `true`) e não gruda no Android (default `false`). Declarar torna o comportamento igual nos dois e deixa a decisão explícita no código.

**Sobre a cor de fundo do cabeçalho:** um cabeçalho grudado fica **por cima** do conteúdo que rola. Sem `backgroundColor`, os itens passam por baixo dele e o texto do cabeçalho se mistura com o texto dos itens — vira uma sopa ilegível. É um efeito colateral direto de `stickySectionHeadersEnabled`, e um dos poucos casos em que uma cor de fundo é obrigatória, não decorativa.

**Pergunta final:** você **não** precisou mudar nada no `ItemHabito`. Isso mostra que a diferença entre `FlatList` e `SectionList` está no **formato do dado** e no **cabeçalho por grupo** — não em como o item é renderizado. Os dois são `VirtualizedList` por baixo, e quase todas as props são as mesmas.

</details>

<details>
<summary><b>Gabarito — Exercício 7</b></summary>

**1. O primeiro motivo — mutação do `Set`.**

```tsx
// ❌ muta o Set e devolve o MESMO objeto ao useState
selecionados.has(id) ? selecionados.delete(id) : selecionados.add(id);
setSelecionados(selecionados);
```

`useState` compara por identidade. Como `selecionados` é o mesmo objeto de antes, o React conclui que nada mudou e nem sequer agenda um novo render — o contador de "N selecionado(s)" também não muda.

```tsx
// ✅ Set novo a cada mudança
function alternarSelecao(id: string) {
  setSelecionados((atuais) => {
    const novo = new Set(atuais);
    novo.has(id) ? novo.delete(id) : novo.add(id);
    return novo;
  });
}
```

**2. O segundo motivo — a `FlatList` é `PureComponent`.**

Mesmo com o `Set` novo e o componente re-renderizando (o contador no topo passa a funcionar), **os itens continuam iguais**: a prop `data` da `FlatList` é o mesmo array `habitos` de sempre, e o dado que mudou (`selecionados`) não está dentro dele. Como as props da lista continuam shallow-equal, ela não re-renderiza as linhas.

**3. As duas correções possíveis:**

```tsx
// Correção A — extraData: avisa a lista de que algo de FORA do data mudou
<FlatList data={habitos} extraData={selecionados} renderItem={...} />

// Correção B — mover a seleção para dentro do dado
const [habitos, setHabitos] = useState(MOCK.map((h) => ({ ...h, selecionado: false })));
// e alternar com map + spread, como no Exercício 5
```

**Qual escolher:** aqui, a **A**. `extraData` existe exatamente para este caso — estado de interface que é legitimamente separado do dado de domínio. "Está selecionado nesta tela" não é uma propriedade do hábito; é uma propriedade da tela. A correção B funciona, mas polui o modelo de dados com um campo que só faz sentido enquanto essa tela específica está aberta.

Compare com o Exercício 5: lá, "está concluído" **é** propriedade do hábito, e por isso a resposta certa era a imutabilidade, não `extraData`. **A pergunta que decide é sempre a mesma: isso é dado do domínio ou estado de tela?**

**4. O que falta:** `ListEmptyComponent` (regra 8). Também falta `flex: 1` garantido no contêiner e o `renderItem` está inline — este último é aceitável aqui pelo mesmo motivo do Exercício 5.

</details>

---

## Resumo de tempos

| Parte | Onde | Tempo |
|---|---|---|
| Exercícios 1, 2 e 4 | Sala, sem computador | ~13 min |
| Exercícios 3, 5 e 6 | Sala, no computador | ~25 min |
| Exercício 7 | Sobra / casa | ~5 min |
| Atividade Aplicada 1 | Casa | 3–4 h |
| Atividade Aplicada 2 | Casa | ~1 h |
| Atividade Aplicada 3 *(bônus)* | Casa | ~30 min |

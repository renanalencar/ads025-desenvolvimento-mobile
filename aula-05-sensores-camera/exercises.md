# Exercícios e Atividades — Aula 5 (domínio Hábito)

> **Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School
> **Domínio deste arquivo:** Rastreador de Micro-hábitos e Condicionamento Físico (`Habito`).
> **Está no outro projeto?** Se o seu app é o **App de Gestão e Rotina Pet**, use o arquivo `practice.md` — mesma estrutura, mesmos conceitos, domínio `Pet`.

| Projeto | Repositório | Branch da disciplina |
|---|---|---|
| Rastreador de Micro-hábitos e Condicionamento Físico | `habit-tracker-expo` | `feature/aula_05` |

## Como usar este arquivo

- **Parte 1 — Exercícios guiados** (em sala, ~25 min): foco em **acurácia**. São propositalmente simples. O objetivo é usar o conceito **corretamente**, não criativamente. Chame o professor quando travar.
- **Parte 2 — Atividades aplicadas** (para casa): exigem **decisão**, não repetição.
- **Todo exercício vem com um scaffold** — um esqueleto de código com marcações `// TODO`. Você completa os trechos que faltam; não precisa escrever do zero, e não deve apagar a estrutura dada.
- **Gabaritos**: no final, em seções colapsadas. Tente antes de abrir — abrir cedo é o jeito mais eficiente de não aprender.

> 🧩 **Como usar os scaffolds:** a estrutura do arquivo, os imports e os nomes dos estilos já estão lá — o que falta é o miolo, que é onde está o conceito da aula. **Apague o comentário `// TODO` quando resolver aquele ponto.** Um arquivo sem nenhum `TODO` é um exercício concluído, e é assim que o professor confere rápido quem parou onde.

> 🔴 **Esta aula precisa de aparelho físico.** O iOS Simulator **não tem câmera, acelerômetro nem giroscópio**. O Android Emulator tem sensores virtuais e uma câmera de cena virtual — serve para testar o fluxo, não a experiência. **Traga o celular carregado, com o Expo Go instalado e o cabo.** Se não tiver, faça em dupla.

> 📦 **O que esta aula acrescenta ao seu catálogo:** **`expo-location`**, **`expo-sensors`** (`Accelerometer` e `Gyroscope`), **`expo-camera`** (`CameraView`, `useCameraPermissions`) e **`expo-image`**. Tudo das Aulas 1 a 4 continua valendo e deve ser usado — `View`, `Text`, `TextInput`, `ScrollView`, `StyleSheet`, Flexbox, `useState`, `Pressable`, `FlatList` e `SectionList`. **Não use nas entregas:** `useEffect`, `useRef` e os outros hooks do React (chegam na Aula 6); navegação/`expo-router` (Aula 7); pacotes para salvar na galeria ou escolher foto do rolo; mapas; chamadas de rede. Todos ou ainda vão chegar na disciplina, ou não estão nela.

> ⚠️ **Regras de escrita válidas para todos os exercícios** — as oito primeiras vêm das Aulas 3 e 4 e continuam valendo; as seis últimas são desta aula:
> 1. **Sem `JSX.Element`** como tipo de retorno. Não anote o retorno; o TypeScript infere.
> 2. **Sem `as const`** dentro de `StyleSheet.create`. Em `theme.ts`, sim.
> 3. **`gap`** (ou `ItemSeparatorComponent`) para espaçar irmãos, nunca `margin` em cada filho.
> 4. **`boxShadow`** para sombra, não o quarteto `shadow*` + `elevation`.
> 5. **Zero `any`.**
> 6. **A ação vai em `onPress`**, nunca em `onPressIn`.
> 7. **`renderItem` declarado fora do componente**, sempre que não depender de estado local.
> 8. **Toda lista tem `ListEmptyComponent`.**
> 9. **Todo `addListener` / `watchPositionAsync` tem um `remove()` no mesmo arquivo.** Sem exceção.
> 10. **Estados de falha são distintos na tela.** "Permissão negada", "permissão bloqueada" e "serviço desligado" são três mensagens, não uma.
> 11. **Nenhuma `Accuracy` sem justificativa.** Se escreveu `High`, saiba dizer por quê.
> 12. **`contentFit` explícito** em toda `Image` do `expo-image`.
> 13. **Confira o import do `Image`.** `expo-image` e `react-native` têm um componente com o mesmo nome.
> 14. **`base64` só quando for realmente usado.** Para exibir, o `uri` basta.

**O domínio, retomado da Aula 4 com dois campos novos** — é a base de todos os scaffolds daqui:

```tsx
type StatusHabito = 'pendente' | 'concluido' | 'pulado';

interface Habito {
  id: string;
  titulo: string;
  categoria: string;
  status: StatusHabito;
  streakDias: number;
  // novidades da Aula 5 — opcionais de propósito:
  local?: { latitude: number; longitude: number; precisaoMetros: number };
  fotoUri?: string;
}
```

> 💡 **Por que os dois campos são opcionais:** o usuário pode negar a permissão, e o app tem que continuar funcionando. Um hábito sem foto e sem local ainda é um hábito. Se o seu tipo obriga os dois, o seu app quebra para quem disse "não".

**Setup dos exercícios 3 a 7** (projeto de sandbox, descartável — os exercícios 1 e 2 são no papel):

```bash
npx create-expo-app@latest sandbox-aula5
cd sandbox-aula5
npm run reset-project
npx expo install expo-location expo-sensors expo-camera expo-image
npx expo start
```

**Setup das Atividades Aplicadas** (seu projeto de verdade):

```bash
git clone <url-do-seu-repositorio> habit-tracker-expo
cd habit-tracker-expo
git checkout -b feature/aula_05
npm install
npx expo install expo-location expo-sensors expo-camera expo-image
npx expo start
```

---

# Parte 1 — Exercícios guiados

## Exercício 1 — Associação: qual pacote e qual função

**Dificuldade:** ⭐ · **Tempo:** 4 min · **Onde:** no papel

Para cada situação, escreva **o pacote** e **a função ou prop** que resolve. Todas as respostas estão na aula.

| # | Situação |
|---|---|
| 1 | "Quero registrar em que academia o treino aconteceu, uma vez, quando o usuário toca no botão." |
| 2 | "Quero desenhar o trajeto enquanto o usuário corre." |
| 3 | "Quero detectar que o usuário chacoalhou o telefone para marcar o hábito como feito." |
| 4 | "Quero saber se o usuário girou o telefone, e com que rapidez." |
| 5 | "O usuário negou a permissão e marcou 'não perguntar de novo'. Como eu descubro isso?" |
| 6 | "A permissão está concedida, mas ainda assim não vem localização nenhuma." |
| 7 | "Quero mostrar 'Boa Viagem, Recife' em vez de `-8.12, -34.90`." |
| 8 | "Quero mostrar algo na tela em 50 ms, mesmo que seja um dado um pouco velho." |
| 9 | "Quero que a foto preencha o card sem distorcer, cortando o excesso." |
| 10 | "As fotos da lista carregam e a lista inteira pula." |
| 11 | "Ao rolar a lista rápido, aparece por um instante a foto do item anterior." |
| 12 | "A câmera precisa começar apontando para o rosto do usuário." |
| 13 | "Meu app precisa saber se este aparelho sequer tem giroscópio." |
| 14 | "Quero receber a posição só quando o usuário andar 10 metros." |

### Esqueleto da resposta

```
1.  pacote: ______________  função/prop: ______________
2.  pacote: ______________  função/prop: ______________
...
14. pacote: ______________  função/prop: ______________
```

---

## Exercício 2 — Caça ao erro: a tela de câmera do tutorial de 2023

**Dificuldade:** ⭐⭐ · **Tempo:** 5 min · **Onde:** no papel

O código abaixo foi copiado de um tutorial bem avaliado — de 2023. Ele **não compila**, e mesmo se compilasse teria problemas.

**Encontre 7 problemas.** Para cada um: diga o que está errado e escreva a linha corrigida.

```tsx
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Image } from 'react-native';

export default function TelaFotoHabito() {
  const [permissao, setPermissao] = useState(null);
  const [tipo, setTipo] = useState(CameraType.back);
  const [fotoUri, setFotoUri] = useState(null);

  async function pedir() {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setPermissao(status === 'granted');
  }

  if (!permissao) {
    return (
      <View style={estilos.centro}>
        <Text>Sem permissão</Text>
        <TouchableOpacity onPress={pedir}>
          <Text>Permitir</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={estilos.tela}>
      <Camera style={estilos.camera} type={tipo} zoom={2} />
      <Image source={{ uri: fotoUri }} resizeMode="cover" style={estilos.previa} />
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  camera: {},
  previa: { width: 100, height: 100 },
});
```

### Esqueleto da correção

```
Problema 1: ______________________________________________
  Linha corrigida: ________________________________________

Problema 2: ______________________________________________
  Linha corrigida: ________________________________________

... (até 7)
```

---

## Exercício 3 — Complete: o botão "Onde eu estou"

**Dificuldade:** ⭐⭐ · **Tempo:** 6 min · **Onde:** no `sandbox-aula5`

Complete a tela para que ela registre a localização atual **e trate os três caminhos de falha de forma distinta**.

### Esqueleto

```tsx
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

type Local = { latitude: number; longitude: number; precisaoMetros: number };

type Falha = 'permissao-negada' | 'permissao-bloqueada' | 'servico-desligado';

const MENSAGENS: Record<Falha, string> = {
  // TODO 1: escreva as três mensagens. Elas precisam ser DIFERENTES entre si
  //         e dizer ao usuário o que ELE pode fazer.
  'permissao-negada': '',
  'permissao-bloqueada': '',
  'servico-desligado': '',
};

export default function TelaOndeEuEstou() {
  const [local, setLocal] = useState<Local | null>(null);
  const [falha, setFalha] = useState<Falha | null>(null);
  const [buscando, setBuscando] = useState(false);

  async function registrarLocal() {
    setFalha(null);
    setBuscando(true);

    // TODO 2: peça a permissão de foreground.
    //         Se não for concedida, decida entre 'permissao-negada' e
    //         'permissao-bloqueada' usando o campo certo da resposta,
    //         chame setBuscando(false) e saia.

    // TODO 3: confira se o SERVIÇO de localização está ligado.
    //         Se não estiver, é 'servico-desligado'. Não confunda com permissão.

    // TODO 4: peça a posição atual. Escolha a Accuracy sabendo justificar:
    //         o objetivo é "em que academia o treino aconteceu".

    // TODO 5: guarde latitude, longitude e o raio de precisão em `local`.
    //         Atenção: o campo de precisão pode vir null.

    setBuscando(false);
  }

  return (
    <View style={estilos.tela}>
      <Pressable
        onPress={registrarLocal}
        disabled={buscando}
        style={({ pressed }) => [estilos.botao, pressed && estilos.botaoPressionado]}
      >
        <Text style={estilos.textoBotao}>{buscando ? 'Buscando...' : 'Onde eu estou'}</Text>
      </Pressable>

      {/* TODO 6: mostre a mensagem de falha, quando houver. */}

      {local && (
        <Text style={estilos.info}>
          {local.latitude.toFixed(5)}, {local.longitude.toFixed(5)} (±
          {Math.round(local.precisaoMetros)} m)
        </Text>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 16, justifyContent: 'center' },
  botao: { backgroundColor: '#f26522', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  botaoPressionado: { opacity: 0.7 },
  textoBotao: { color: '#fff', fontWeight: '700', fontSize: 16 },
  info: { fontSize: 16 },
  erro: { fontSize: 15, color: '#b00020' },
});
```

### Teste

1. Rode com a permissão **concedida** — deve mostrar as coordenadas e o raio.
2. **Negue** a permissão — deve aparecer a mensagem de negada.
3. Negue e marque **"não perguntar de novo"** — a mensagem tem que **mudar**.
4. Conceda a permissão e **desligue o GPS do aparelho** — terceira mensagem, diferente das outras duas.

> 💡 Se as três mensagens forem iguais, o exercício não está feito. **É esse o ponto dele.**

---

## Exercício 4 — Complete: o detector de chacoalhada

**Dificuldade:** ⭐⭐ · **Tempo:** 6 min · **Onde:** no `sandbox-aula5`

Complete a tela para detectar uma chacoalhada usando o acelerômetro — com botão para ligar e para desligar.

### Esqueleto

```tsx
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import type { EventSubscription } from 'expo-modules-core';

const LIMIAR_G = 1.8;          // empírico: ajuste no seu aparelho
const INTERVALO_MS = 100;      // 10 leituras por segundo

export default function TelaChacoalhada() {
  const [assinatura, setAssinatura] = useState<EventSubscription | null>(null);
  const [chacoalhou, setChacoalhou] = useState(false);
  const [contador, setContador] = useState(0);
  const [indisponivel, setIndisponivel] = useState(false);

  async function ligar() {
    // TODO 1: confira se o acelerômetro existe neste aparelho.
    //         Se não existir, marque `indisponivel` e saia.

    // TODO 2: peça o intervalo de atualização.

    // TODO 3: assine o acelerômetro. Dentro do callback:
    //         a) calcule a MAGNITUDE do vetor (x, y, z) — não olhe um eixo só;
    //         b) compare com LIMIAR_G;
    //         c) atualize `chacoalhou`;
    //         d) some 1 em `contador` APENAS na transição de "não" para "sim"
    //            (senão você conta 10 chacoalhadas por segundo).

    // TODO 4: guarde a assinatura no estado.
  }

  function desligar() {
    // TODO 5: encerre a assinatura e limpe o estado.
    //         Use o método correto — `removeAllListeners()` está deprecado.
  }

  return (
    <View style={estilos.tela}>
      {indisponivel && <Text style={estilos.erro}>Este aparelho não tem acelerômetro.</Text>}

      <Text style={estilos.status}>{chacoalhou ? '🤝 CHACOALHOU' : '😴 parado'}</Text>
      <Text style={estilos.info}>Chacoalhadas: {contador}</Text>

      <Pressable
        onPress={assinatura ? desligar : ligar}
        style={({ pressed }) => [estilos.botao, pressed && estilos.botaoPressionado]}
      >
        <Text style={estilos.textoBotao}>{assinatura ? 'Desligar sensor' : 'Ligar sensor'}</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 16, justifyContent: 'center', alignItems: 'center' },
  status: { fontSize: 32, fontWeight: '800' },
  info: { fontSize: 16 },
  erro: { fontSize: 15, color: '#b00020' },
  botao: { backgroundColor: '#f26522', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 10 },
  botaoPressionado: { opacity: 0.7 },
  textoBotao: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
```

### Teste

1. Ligue e deixe o telefone parado — o contador **não** pode subir.
2. Chacoalhe **uma vez** — o contador sobe **1**, não 8.
3. Chacoalhe em **direções diferentes** (para os lados, para cima e para baixo) — todas devem contar. *(Se só uma direção conta, você olhou um eixo só.)*
4. Desligue e chacoalhe — nada acontece.

---

## Exercício 5 — Complete: câmera e prévia

**Dificuldade:** ⭐⭐ · **Tempo:** 4 min · **Onde:** no `sandbox-aula5`

### Esqueleto

```tsx
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';

export default function TelaFotoHabito() {
  const [permissao, pedirPermissao] = useCameraPermissions();
  const [camera, setCamera] = useState<CameraView | null>(null);
  const [lado, setLado] = useState<'back' | 'front'>('back');
  const [fotoUri, setFotoUri] = useState<string | null>(null);

  async function tirarFoto() {
    // TODO 1: proteja contra a referência ainda null.
    // TODO 2: tire a foto com qualidade 0.7 e guarde o uri.
    //         Não peça base64 — você só vai exibir.
  }

  // TODO 3: primeiro estado — a resposta da permissão ainda não chegou.
  //         Sem isto, a tela de "sem permissão" PISCA para quem já autorizou.

  // TODO 4: segundo estado — sabemos, e não temos.
  //         Devolva uma tela que EXPLIQUE por que o app precisa da câmera,
  //         com um Pressable que chama pedirPermissao.

  // TODO 5: terceiro estado — temos.
  return (
    <View style={estilos.tela}>
      {/* TODO 6: renderize o CameraView. Ele precisa de:
                  - a referência (use o callback ref com setCamera)
                  - o estilo (que precisa dar ALTURA a ele)
                  - a prop de qual câmera usar */}

      <View style={estilos.painel}>
        <Pressable onPress={tirarFoto} style={estilos.botao}>
          <Text style={estilos.textoBotao}>Tirar foto</Text>
        </Pressable>

        <Pressable
          onPress={() => setLado((atual) => (atual === 'back' ? 'front' : 'back'))}
          style={estilos.botao}
        >
          <Text style={estilos.textoBotao}>Virar câmera</Text>
        </Pressable>

        {/* TODO 7: quando houver fotoUri, exiba a prévia com o Image do expo-image.
                    contentFit explícito e uma transição de 300 ms. */}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#111' },
  camera: { flex: 1 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  aviso: { color: '#fff', textAlign: 'center', fontSize: 16 },
  painel: { padding: 16, gap: 12, backgroundColor: '#1b1b1b' },
  botao: { backgroundColor: '#f26522', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: '700' },
  previa: { width: '100%', height: 160, borderRadius: 12, backgroundColor: '#222' },
});
```

### Teste

1. Abra pela primeira vez — **não pode piscar** a tela de "sem permissão".
2. Conceda — a câmera aparece **ocupando o espaço**. Se estiver preta, confira o estilo antes da permissão.
3. Tire a foto — a prévia aparece com transição suave.
4. Vire a câmera e tire outra — a prévia troca.

---

## Exercício 6 — Complete: o giroscópio *(casa)*

**Dificuldade:** ⭐⭐ · **Tempo:** 10 min

Mesma estrutura do Exercício 4, agora com o **giroscópio** — e com uma pergunta a responder por escrito no final.

### Esqueleto

```tsx
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import type { EventSubscription } from 'expo-modules-core';

type Eixos = { x: number; y: number; z: number };

export default function TelaGiroscopio() {
  const [assinatura, setAssinatura] = useState<EventSubscription | null>(null);
  const [eixos, setEixos] = useState<Eixos>({ x: 0, y: 0, z: 0 });
  const [girandoRapido, setGirandoRapido] = useState(false);

  async function ligar() {
    // TODO 1: cheque disponibilidade, peça intervalo de 100 ms e assine.
    // TODO 2: guarde x, y e z no estado.
    // TODO 3: marque `girandoRapido` quando a magnitude passar de 3 rad/s.
    // TODO 4: guarde a assinatura.
  }

  function desligar() {
    // TODO 5: encerre.
  }

  return (
    <View style={estilos.tela}>
      <Text style={estilos.leitura}>x: {eixos.x.toFixed(2)} rad/s</Text>
      <Text style={estilos.leitura}>y: {eixos.y.toFixed(2)} rad/s</Text>
      <Text style={estilos.leitura}>z: {eixos.z.toFixed(2)} rad/s</Text>
      {girandoRapido && <Text style={estilos.alerta}>🌀 girando rápido</Text>}

      <Pressable onPress={assinatura ? desligar : ligar} style={estilos.botao}>
        <Text style={estilos.textoBotao}>{assinatura ? 'Desligar' : 'Ligar'}</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 12, justifyContent: 'center' },
  leitura: { fontSize: 20, fontVariant: ['tabular-nums'] },
  alerta: { fontSize: 20, fontWeight: '800', color: '#f26522' },
  botao: { backgroundColor: '#f26522', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
```

### A pergunta (responda em 3–5 linhas, num `README.md`)

Com o app rodando e o **giroscópio ligado**, deixe o telefone parado na mesa e anote os valores. Depois faça o **mesmo teste com o acelerômetro** (Exercício 4, mostrando a magnitude na tela em vez do booleano).

> **Explique a diferença entre os dois resultados.** Por que um zera e o outro não? E o que isso permite fazer com o acelerômetro que não dá para fazer com o giroscópio?

---

## Exercício 7 — Corrija: a galeria de hábitos que pisca *(casa)*

**Dificuldade:** ⭐⭐⭐ · **Tempo:** 15 min

O código abaixo **roda**, mas tem quatro defeitos visíveis quando a lista tem 60 itens e você rola rápido: a lista **pula** quando as imagens chegam, aparece por um instante a **foto do item anterior**, a mesma imagem é **recarregada** toda vez que volta à tela, e uma prop **não faz nada**.

**Encontre os quatro e corrija.** Depois escreva, em 2–3 linhas, qual dos quatro é o mais grave para o usuário e por quê.

### Esqueleto — o código quebrado, pronto para rodar

```tsx
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';

interface Habito {
  id: string;
  titulo: string;
  fotoUrl: string;
}

const HABITOS: Habito[] = Array.from({ length: 60 }, (_, i) => ({
  id: String(i),
  titulo: `Treino ${i + 1}`,
  fotoUrl: `https://picsum.photos/seed/habito${i}/600/400`,
}));

function ItemHabito({ item }: { item: Habito }) {
  return (
    <View style={estilos.card}>
      <Image source={{ uri: item.fotoUrl }} style={estilos.foto} resizeMode="cover" />
      <Text style={estilos.titulo}>{item.titulo}</Text>
    </View>
  );
}

export default function TelaGaleria() {
  return (
    <FlatList
      data={HABITOS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ItemHabito item={item} />}
      contentContainerStyle={estilos.lista}
      ListEmptyComponent={<Text>Nenhum hábito registrado ainda.</Text>}
    />
  );
}

const estilos = StyleSheet.create({
  lista: { padding: 16, gap: 12 },
  card: { borderRadius: 12, overflow: 'hidden', backgroundColor: '#f4f4f4' },
  foto: { width: '100%', height: 180 },
  titulo: { padding: 12, fontSize: 16, fontWeight: '600' },
});
```

> 💡 **Dica:** três dos quatro defeitos se resolvem trocando **um import** e acrescentando **três props**. O quarto é uma prop que só faz sentido depois da troca de import.

---

# Parte 2 — Atividades aplicadas

## Atividade 1 — O registro com contexto

**Dificuldade:** ⭐⭐⭐ · **Tempo:** 2 a 3 horas · **Onde:** `habit-tracker-expo`, branch `feature/aula_05`

### Contexto

Até a Aula 4, o seu app só sabia **o que o usuário digitou**. A lista funcionava, o `Pressable` funcionava, mas todo dado nascia do teclado.

Agora ele vai saber **onde o treino aconteceu** e **com o que ele se parecia** — sem que ninguém precise digitar nada.

### O que entregar

Uma tela **Registrar hábito** que:

1. Registra a **localização** do momento (`expo-location`), exibida como texto legível com o **raio de precisão**.
2. Permite tirar uma **foto** (`expo-camera`), exibida como prévia com `expo-image`.
3. Acrescenta o hábito à **lista que já existe desde a Aula 4** (`FlatList`), agora mostrando a miniatura da foto no card.
4. Trata **todos** os caminhos de falha, com mensagens **distintas**:
   - permissão de localização negada (`canAskAgain: true`),
   - permissão de localização bloqueada (`canAskAgain: false`),
   - serviço de localização desligado,
   - permissão de câmera negada,
   - sensor/hardware indisponível.
5. Funciona **mesmo quando o usuário nega tudo**. Um hábito sem foto e sem local ainda é um hábito, e a lista tem que renderizá-lo sem quebrar.

### Esqueletos para começar

**O tipo, estendido:**

```tsx
interface Habito {
  id: string;
  titulo: string;
  categoria: string;
  status: StatusHabito;
  streakDias: number;
  local?: { latitude: number; longitude: number; precisaoMetros: number };
  fotoUri?: string;
}
```

**O card da lista, com a miniatura opcional:**

```tsx
import { Image } from 'expo-image';

function CardHabito({ item }: { item: Habito }) {
  return (
    <View style={estilos.card}>
      {item.fotoUri ? (
        <Image
          source={{ uri: item.fotoUri }}
          style={estilos.miniatura}
          contentFit="cover"
          transition={200}
          recyclingKey={item.id}
        />
      ) : (
        <View style={[estilos.miniatura, estilos.miniaturaVazia]} />
      )}

      <View style={estilos.corpo}>
        <Text style={estilos.titulo}>{item.titulo}</Text>
        {/* TODO: quando houver local, mostre-o de forma legível para HUMANOS,
                  incluindo o raio de precisão. Coordenada crua com 14 casas
                  decimais não é informação para o usuário. */}
      </View>
    </View>
  );
}
```

**O contrato de três tempos, como checklist do seu próprio código:**

```tsx
// 1. PEDIR   → ______________________________
// 2. LER     → ______________________________
// 3. PARAR   → ______________________________  (ou: "não se aplica, porque ___")
```

Preencha esse comentário **em cada arquivo** que usar sensor. Ele vale nota.

### Restrições (é aqui que a nota se decide)

- **Sem `useEffect`, `useRef` ou qualquer hook do React além do `useState`.** Os hooks de permissão das bibliotecas (`useCameraPermissions`, `useForegroundPermissions`) são permitidos — são delas, não do React.
- **Sem navegação.** A tela de registro aparece por condicional com `useState`, como no Exercício 5.
- **Sem mapa.** A coordenada é **texto**.
- **Sem salvar na galeria** e **sem escolher foto do rolo**. A foto vem da câmera e vive no cache.
- **Sem rede.** Nada de enviar a foto para lugar nenhum.
- **Se você abrir uma torneira (`addListener` / `watchPositionAsync`), tem que existir um botão que a feche.** E o `README.md` tem que declarar: *"esta assinatura não é encerrada ao sair da tela, porque a ferramenta para isso é assunto da Aula 6"*. **Reconhecer a limitação vale ponto; escondê-la desconta.**

### Critérios de avaliação

| Critério | Peso | O que se espera |
|---|---|---|
| **Contrato de três tempos** | 25% | Pede, lê, para. O comentário-checklist preenchido em cada arquivo de sensor. |
| **Estados de falha distintos** | 25% | As cinco situações da lista, cada uma com sua mensagem, e cada uma dizendo ao usuário **o que fazer**. |
| **Uso correto das APIs** | 20% | `Accuracy` justificada no README; `accuracy` exibido como raio em metros; `contentFit` explícito; import do `Image` correto; sem `base64` desnecessário. |
| **Degradação graciosa** | 15% | Negando tudo, o app funciona. Um hábito sem foto e sem local renderiza sem quebrar. |
| **Honestidade técnica** | 15% | O README declara as limitações assumidas (vazamento da assinatura, foto no cache e não na galeria) em vez de escondê-las. |

### O que **não** é avaliado

- Beleza da tela. Um app feio com os cinco estados de falha corretos vale mais que um bonito que trata tudo com "erro".
- Quantidade de sensores usados. Usar bem o GPS e a câmera vale mais que usar mal os quatro.
- Precisão do limiar de chacoalhada. É empírico, e a atividade nem exige acelerômetro.

---

## Atividade 2 — Auditoria de permissões em código alheio

**Dificuldade:** ⭐⭐⭐ · **Tempo:** 1h30 · **Onde:** relatório em Markdown

### Contexto

Você entrou num time e recebeu esta tela para dar manutenção. Ela **funciona no aparelho de quem escreveu**, e é justamente por isso que ninguém percebeu os problemas.

```tsx
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import * as Location from 'expo-location';
import { Accelerometer } from 'expo-sensors';

interface Registro {
  id: string;
  titulo: string;
  fotoUrl: string;
  lat: number;
  lon: number;
}

let jaPediuPermissao = false;

export default function TelaTreino() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [passos, setPassos] = useState(0);
  const [erro, setErro] = useState('');

  async function iniciarTreino() {
    if (!jaPediuPermissao) {
      await Location.requestForegroundPermissionsAsync();
      jaPediuPermissao = true;
    }

    const posicao = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });

    await Location.watchPositionAsync({ accuracy: Location.Accuracy.Highest }, async (p) => {
      const endereco = await Location.reverseGeocodeAsync(p.coords);
      setErro('');
      setRegistros((antigos) => [
        ...antigos,
        {
          id: String(antigos.length),
          titulo: endereco[0]?.street ?? 'sem rua',
          fotoUrl: 'https://picsum.photos/seed/treino/600/400',
          lat: p.coords.latitude,
          lon: p.coords.longitude,
        },
      ]);
    });

    Accelerometer.setUpdateInterval(16);
    Accelerometer.addListener(({ x }) => {
      if (x > 1.5) setPassos((n) => n + 1);
    });

    if (!posicao) setErro('Erro ao obter localização');
  }

  return (
    <View style={estilos.tela}>
      <Pressable onPress={iniciarTreino} style={estilos.botao}>
        <Text style={estilos.textoBotao}>Iniciar treino</Text>
      </Pressable>

      <Text>Passos: {passos}</Text>
      {erro !== '' && <Text style={estilos.erro}>{erro}</Text>}

      <FlatList
        data={registros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={estilos.card}>
            <Image source={{ uri: item.fotoUrl }} style={estilos.foto} resizeMode="cover" />
            <Text>
              {item.titulo} — {item.lat}, {item.lon}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 16, gap: 12 },
  botao: { backgroundColor: '#f26522', padding: 14, borderRadius: 10, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: '700' },
  erro: { color: '#b00020' },
  card: { gap: 8, paddingVertical: 8 },
  foto: { width: '100%', height: 140 },
});
```

### O que entregar

Um relatório `auditoria-aula5.md` seguindo o esqueleto abaixo. **Não é para consertar o código** — é para diagnosticar, priorizar e justificar. A habilidade avaliada é a de **explicar um problema para outra pessoa do time**.

### Esqueleto do relatório

```markdown
# Auditoria — TelaTreino

## 1. Problemas de permissão
<!-- Pelo menos três. Para cada um: o sintoma que o usuário sente,
     a causa no código, e a correção em uma frase. -->

| # | Sintoma para o usuário | Causa no código | Correção |
|---|---|---|---|

## 2. Vazamentos
<!-- Quais torneiras ficam abertas? O que acontece com a bateria
     e com a memória? Quantas vezes elas são abertas se o usuário
     tocar em "Iniciar treino" cinco vezes? -->

## 3. Consumo de bateria
<!-- Três decisões neste arquivo que gastam bateria sem necessidade.
     Para cada uma, diga o que você usaria no lugar e por quê. -->

## 4. O uso errado de sensor
<!-- Há um sensor sendo usado para uma finalidade que ele não atende bem.
     Qual? Por que não funciona? O que o autor provavelmente queria? -->

## 5. Os defeitos de imagem
<!-- Dois problemas na exibição das fotos. -->

## 6. Ordem de correção — tenho meio dia
<!-- Liste em ordem, com uma justificativa por item. O critério é
     "impacto no usuário por hora de trabalho", não "ordem no arquivo". -->

## 7. O que eu decidi NÃO corrigir
<!-- Pelo menos um item, com justificativa. Saber o que deixar para depois
     é parte do trabalho. -->
```

### Critérios de avaliação

| Critério | Peso | O que se espera |
|---|---|---|
| **Cobertura** | 30% | Os problemas de permissão, os vazamentos, o sensor mal escolhido e os defeitos de imagem estão todos lá. |
| **Sintoma antes da causa** | 20% | Cada problema começa pelo que **o usuário sente**, não pelo nome da função. |
| **Priorização justificada** | 20% | A ordem da seção 6 tem um critério explícito e defensável. |
| **Precisão técnica** | 20% | As correções propostas estão certas e usam os nomes atuais das APIs. |
| **O que não corrigir** | 10% | A seção 7 existe e tem justificativa real. |

---

## Atividade 3 — O nível de bolha do bom hábito *(opcional, bônus)*

**Dificuldade:** ⭐⭐ · **Tempo:** 45 min

Um micro-hábito de postura: o app mostra uma bolha que só fica **verde e centralizada** quando o telefone está apoiado na mesa perfeitamente plano.

- Use o **acelerômetro**, não o giroscópio. Saiba dizer por quê.
- A bolha se move com `x` e `y`; o `StyleSheet` e o Flexbox são os da Aula 3. **Sem animação.**
- Escolha o intervalo de atualização **conscientemente** e justifique em um comentário.
- Um botão liga, outro desliga.

**Critério:** funciona, não engasga, e o comentário sobre o intervalo mostra que você entendeu a troca entre suavidade e número de renderizações.

---

# Gabaritos

> Só abra depois de tentar. Sério.

<details>
<summary><b>Gabarito — Exercício 1 (associação)</b></summary>

| # | Pacote | Função / prop |
|---|---|---|
| 1 | `expo-location` | `getCurrentPositionAsync()` — leitura pontual, o "copo" |
| 2 | `expo-location` | `watchPositionAsync()` — assinatura, a "torneira" |
| 3 | `expo-sensors` | `Accelerometer.addListener()` + magnitude do vetor |
| 4 | `expo-sensors` | `Gyroscope.addListener()` — velocidade angular em rad/s |
| 5 | qualquer um | o campo **`canAskAgain`** da resposta de permissão |
| 6 | `expo-location` | `hasServicesEnabledAsync()` — o **serviço** está desligado |
| 7 | `expo-location` | `reverseGeocodeAsync()` |
| 8 | `expo-location` | `getLastKnownPositionAsync()` |
| 9 | `expo-image` | `contentFit="cover"` |
| 10 | `expo-image` | `placeholder` (+ altura fixa no estilo) |
| 11 | `expo-image` | `recyclingKey` |
| 12 | `expo-camera` | `facing="front"` |
| 13 | `expo-sensors` | `Gyroscope.isAvailableAsync()` |
| 14 | `expo-location` | `distanceInterval: 10` nas opções do `watchPositionAsync` |

**O que este exercício testa:** se você internalizou o **contrato** (§1.2 das notas). Quem só decorou nomes erra o 5, o 6 e o 8 — que são justamente os que separam um app que trata os casos reais de um que só funciona no aparelho do desenvolvedor.

</details>

<details>
<summary><b>Gabarito — Exercício 2 (caça ao erro)</b></summary>

**Os sete problemas:**

**1. `Camera` não existe mais.**
```tsx
// ❌ import { Camera, CameraType } from 'expo-camera';
// ✅
import { CameraView, useCameraPermissions } from 'expo-camera';
```

**2. `CameraType.back` não é enum.**
```tsx
// ❌ const [tipo, setTipo] = useState(CameraType.back);
// ✅
const [lado, setLado] = useState<'back' | 'front'>('back');
```

**3. `Camera.requestCameraPermissionsAsync()` foi substituído.**
```tsx
// ❌ const { status } = await Camera.requestCameraPermissionsAsync();
// ✅
const [permissao, pedirPermissao] = useCameraPermissions();
```

**4. O gate tem dois estados, e precisa de três.** `permissao` começa `null`, e `!null` é `true` — então a tela de "sem permissão" **pisca para todo mundo**, inclusive para quem já autorizou.
```tsx
// ✅
if (!permissao) return <View />;
if (!permissao.granted) { /* tela de convencimento */ }
```

**5. `estilos.camera` está vazio.** O `CameraView` não tem tamanho próprio: **tela preta**.
```tsx
camera: { flex: 1 },
```

**6. `zoom={2}` está fora do intervalo.** `zoom` vai de **0 a 1**.
```tsx
<CameraView zoom={0.5} />
```

**7. `Image` do `react-native` com `resizeMode`.** Se a intenção é usar o `expo-image` (e é, pela aula), o import está errado e a prop é `contentFit`. Além disso, `source={{ uri: null }}` no primeiro render é um erro de tipo.
```tsx
import { Image } from 'expo-image';
// ...
{fotoUri && <Image source={{ uri: fotoUri }} contentFit="cover" style={estilos.previa} />}
```

**Problemas extras, se você achou (ponto de bônus):**
- `TouchableOpacity` no lugar de `Pressable` (Aula 4).
- Nenhum `useState` está tipado — `useState(null)` infere `null`, e o TypeScript reclama depois.
- Não há nada que **tire** a foto. O tutorial mostra a câmera e nunca captura.

</details>

<details>
<summary><b>Gabarito — Exercício 3 (o botão "Onde eu estou")</b></summary>

```tsx
const MENSAGENS: Record<Falha, string> = {
  'permissao-negada': 'Precisamos da sua localização para registrar onde o treino aconteceu. Toque de novo para autorizar.',
  'permissao-bloqueada': 'A permissão de localização está bloqueada. Abra as Configurações do sistema e autorize o acesso para este app.',
  'servico-desligado': 'A localização do aparelho está desligada. Ligue o GPS nas configurações rápidas e tente de novo.',
};

async function registrarLocal() {
  setFalha(null);
  setBuscando(true);

  // TODO 2
  const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setFalha(canAskAgain ? 'permissao-negada' : 'permissao-bloqueada');
    setBuscando(false);
    return;
  }

  // TODO 3
  const servicoLigado = await Location.hasServicesEnabledAsync();
  if (!servicoLigado) {
    setFalha('servico-desligado');
    setBuscando(false);
    return;
  }

  // TODO 4 — Balanced (~100 m) basta para saber em que academia foi.
  // High gastaria mais bateria e tempo para uma precisão que ninguém vai usar.
  const posicao = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  // TODO 5 — coords.accuracy pode vir null
  setLocal({
    latitude: posicao.coords.latitude,
    longitude: posicao.coords.longitude,
    precisaoMetros: posicao.coords.accuracy ?? 0,
  });

  setBuscando(false);
}
```

```tsx
{/* TODO 6 */}
{falha && <Text style={estilos.erro}>{MENSAGENS[falha]}</Text>}
```

**Os três pontos que valem a nota:**

1. **`canAskAgain` decide a mensagem.** Sem ele, você manda o usuário tocar num botão que nunca mais vai funcionar.
2. **`hasServicesEnabledAsync` é uma checagem separada.** Permissão concedida com GPS desligado é uma situação real e frequente, e a mensagem tem que ser outra.
3. **`?? 0` no `accuracy`.** O campo é `number | null`. Sem o `??`, o `Math.round(null)` te dá `0` por acidente e o TypeScript reclama.

**Erro comum:** escrever as três mensagens iguais, ou escrever *"Erro ao obter localização"* nas três. É exatamente o que o exercício existe para evitar. Cada mensagem tem que dizer **o que o usuário pode fazer**, e as três ações são diferentes.

</details>

<details>
<summary><b>Gabarito — Exercício 4 (detector de chacoalhada)</b></summary>

```tsx
async function ligar() {
  // TODO 1
  const disponivel = await Accelerometer.isAvailableAsync();
  if (!disponivel) {
    setIndisponivel(true);
    return;
  }

  // TODO 2
  Accelerometer.setUpdateInterval(INTERVALO_MS);

  // TODO 3
  const nova = Accelerometer.addListener(({ x, y, z }) => {
    const magnitude = Math.sqrt(x * x + y * y + z * z);
    const agora = magnitude > LIMIAR_G;

    setChacoalhou((anterior) => {
      if (anterior === agora) return anterior;      // nada mudou, não re-renderiza
      if (agora) setContador((n) => n + 1);         // só conta na SUBIDA
      return agora;
    });
  });

  // TODO 4
  setAssinatura(nova);
}

function desligar() {
  // TODO 5
  assinatura?.remove();
  setAssinatura(null);
  setChacoalhou(false);
}
```

**Os quatro pontos que valem a nota:**

1. **A magnitude, não um eixo.** `Math.sqrt(x*x + y*y + z*z)` responde "o quanto foi sacudido", **independente da orientação**. Olhando só o `x`, uma chacoalhada de cima para baixo passa batido.
2. **Contar só na transição.** Sem o `if (anterior === agora) return anterior`, você conta uma chacoalhada por leitura — dez por segundo com o intervalo de 100 ms.
3. **`assinatura?.remove()`, não `removeAllListeners()`.** O segundo está deprecado, e ainda por cima derrubaria listeners de outras partes do app.
4. **`isAvailableAsync` antes de tudo.** É o que impede a tela de ficar eternamente "parada" num aparelho sem o sensor — e é o que salva quem tentar no iOS Simulator.

**Sobre o limiar `1.8`:** ele é empírico e **não** vem da documentação. Parado, a magnitude fica em ≈ 1 g (a gravidade). `1.8` exige quase o dobro disso. Se no seu aparelho disparar ao andar, suba para `2.2`; se exigir um chacoalhão violento, desça para `1.5`.

**Nota de honestidade:** se você sair desta tela com o sensor ligado, ele **continua ligado**. Não há nada aqui que o desligue — a ferramenta que faz isso é a Aula 6. O botão "Desligar sensor" existe justamente porque essa ferramenta ainda não existe para nós.

</details>

<details>
<summary><b>Gabarito — Exercício 5 (câmera e prévia)</b></summary>

```tsx
async function tirarFoto() {
  // TODO 1
  if (!camera) return;
  // TODO 2 — sem base64: só vamos exibir
  const foto = await camera.takePictureAsync({ quality: 0.7 });
  if (foto) setFotoUri(foto.uri);
}

// TODO 3 — a resposta ainda não chegou. `null` NÃO é "negado".
if (!permissao) return <View style={estilos.tela} />;

// TODO 4
if (!permissao.granted) {
  return (
    <View style={estilos.centro}>
      <Text style={estilos.aviso}>
        Precisamos da câmera para você registrar a foto do seu progresso.
        A foto fica só no seu aparelho.
      </Text>
      <Pressable onPress={pedirPermissao} style={estilos.botao}>
        <Text style={estilos.textoBotao}>Permitir câmera</Text>
      </Pressable>
    </View>
  );
}
```

```tsx
{/* TODO 6 */}
<CameraView ref={setCamera} style={estilos.camera} facing={lado} />

{/* TODO 7 */}
{fotoUri && (
  <Image
    source={{ uri: fotoUri }}
    style={estilos.previa}
    contentFit="cover"
    transition={300}
  />
)}
```

**Os quatro pontos que valem a nota:**

1. **Três `return`s, não dois.** O `if (!permissao)` existe porque o estado começa `null` — que significa *"ainda não sei"*, não *"não tenho"*. Sem ele, a tela de convencimento pisca para quem já autorizou há semanas.
2. **`ref={setCamera}`.** A prop `ref` aceita uma função; o React a chama com o componente montado (e com `null` ao desmontar). `setCamera` é uma função. Encaixa. A forma canônica seria `useRef`, que é Aula 6.
3. **`if (!camera) return;`.** No primeiro render a referência ainda é `null`. O TypeScript vai exigir isso, e ele está certo.
4. **`estilos.camera` tem `flex: 1`.** Sem altura, o `CameraView` some — e você perde meia hora achando que é a permissão.

**Por que sem `base64`:** ele carrega a imagem inteira como texto na memória. Para exibir, o `uri` basta e é muito mais barato. `base64` só quando uma API exigir (Aulas 10–12).

</details>

<details>
<summary><b>Gabarito — Exercício 6 (giroscópio)</b></summary>

```tsx
async function ligar() {
  // TODO 1
  if (!(await Gyroscope.isAvailableAsync())) return;
  Gyroscope.setUpdateInterval(100);

  const nova = Gyroscope.addListener(({ x, y, z }) => {
    // TODO 2
    setEixos({ x, y, z });
    // TODO 3
    setGirandoRapido(Math.sqrt(x * x + y * y + z * z) > 3);
  });

  // TODO 4
  setAssinatura(nova);
}

function desligar() {
  // TODO 5
  assinatura?.remove();
  setAssinatura(null);
  setEixos({ x: 0, y: 0, z: 0 });
  setGirandoRapido(false);
}
```

**A resposta da pergunta escrita:**

> Parado na mesa, o **giroscópio** marca ≈ 0 nos três eixos: nada está girando, e ele mede **velocidade angular**. O **acelerômetro** marca magnitude ≈ **1 g**: ele mede aceleração linear **somada à gravidade**, e a gravidade não desliga. Isso não é ruído nem bug — é física.
>
> A consequência é que o acelerômetro permite descobrir **inclinação** com o aparelho parado: aquele vetor de 1 g aponta sempre para baixo, e a forma como ele se distribui entre `x`, `y` e `z` revela a orientação do aparelho. O giroscópio não consegue fazer isso — parado, ele não tem nada a informar. Em compensação, ele responde muito melhor a **rotação rápida**, que o acelerômetro só detecta indiretamente.

**Erro comum de escrita:** dizer que "o acelerômetro tem ruído". Não é ruído: é um sinal real, constante e útil. Confundir os dois é o que leva a filtrar fora justamente a informação que serve.

</details>

<details>
<summary><b>Gabarito — Exercício 7 (a galeria que pisca)</b></summary>

**Os quatro defeitos, e as correções:**

**1. Import errado — a causa de tudo.** `Image` vem do `react-native`, então não há cache em disco, nem placeholder, nem `contentFit`. Toda vez que a célula é reciclada, a imagem é buscada de novo.
```tsx
// ❌ import { Image } from 'react-native';
// ✅
import { Image } from 'expo-image';
```

**2. `resizeMode` não faz nada** depois da troca (e já era deprecado antes dela).
```tsx
// ❌ resizeMode="cover"
// ✅
contentFit="cover"
```

**3. Sem `placeholder`, a lista pula.** A `View` do card tem altura fixa (`180`), mas o espaço fica visualmente vazio até a imagem chegar, e o card "aparece" de repente.
```tsx
placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
placeholderContentFit="cover"
transition={200}
```

**4. Sem `recyclingKey`, aparece a foto do item anterior.** A `FlatList` recicla as células — é assim que ela é rápida (Aula 4). Sem essa prop, a célula reciclada exibe o conteúdo antigo até o novo carregar.
```tsx
recyclingKey={item.id}
```

**O componente corrigido:**

```tsx
import { Image } from 'expo-image';

const BLURHASH = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

function ItemHabito({ item }: { item: Habito }) {
  return (
    <View style={estilos.card}>
      <Image
        source={{ uri: item.fotoUrl }}
        style={estilos.foto}
        contentFit="cover"
        placeholder={{ blurhash: BLURHASH }}
        placeholderContentFit="cover"
        transition={200}
        recyclingKey={item.id}
      />
      <Text style={estilos.titulo}>{item.titulo}</Text>
    </View>
  );
}
```

**Qual é o mais grave, e por quê** (resposta esperada, em 2–3 linhas):

> O **`recyclingKey` ausente** é o mais grave, porque não é um problema estético: ele mostra ao usuário **a foto errada associada ao texto certo**. Numa galeria de treinos, isso é informação incorreta na tela, ainda que por meio segundo. Os outros três degradam a experiência; este **mente**.

Aceita-se também defender o **import errado** como o mais grave, com o argumento de que é a causa-raiz dos outros três — desde que o argumento esteja explícito.

**Ponto de bônus:** notar que `renderItem={({ item }) => <ItemHabito item={item} />}` é uma arrow anônima declarada no JSX — o erro nº 2 da Aula 4. Declare o `renderItem` fora do componente.

</details>

<details>
<summary><b>Gabarito parcial — Atividade 2 (auditoria)</b></summary>

Isto **não é a resposta completa** — é o mínimo que o seu relatório precisa cobrir. Um relatório que traga só isto tira nota média; a nota alta está na priorização e na seção "o que não corrigir".

**Seção 1 — Permissões (pelo menos três):**

| Sintoma | Causa | Correção |
|---|---|---|
| O app segue em frente mesmo com a permissão negada, e depois "não funciona" sem explicação | o retorno de `requestForegroundPermissionsAsync()` é **descartado** — ninguém olha o `status` | checar `status !== 'granted'` e sair, com mensagem |
| Quem negou uma vez nunca mais vê o diálogo, nem depois de reinstalar a tela | a variável de módulo `jaPediuPermissao` "lembra" para sempre e trava o pedido | remover a variável; permissão é **estado do sistema**, não do seu módulo |
| Com o GPS desligado, a tela fica em branco para sempre | não há `hasServicesEnabledAsync()` | checar o serviço separadamente, com mensagem própria |
| `canAskAgain` nunca é consultado | — | mensagem diferente quando o diálogo não vai mais aparecer |

**Seção 2 — Vazamentos:**
- `watchPositionAsync` e `Accelerometer.addListener` **nunca** são encerrados. Não há `remove()` no arquivo.
- **Pior:** `iniciarTreino` pode ser chamado quantas vezes o usuário tocar no botão. Cinco toques = **cinco** assinaturas de GPS e **cinco** de acelerômetro, todas ativas ao mesmo tempo, todas chamando `setState`. O contador de passos passa a subir de 5 em 5.
- Nada desliga o GPS ao sair da tela: a bateria continua sendo consumida com o app em outra tela.

**Seção 3 — Bateria (três decisões):**
1. `Accuracy.BestForNavigation` para uma leitura pontual — é o nível mais caro que existe. `Balanced` resolveria.
2. `Accuracy.Highest` no `watchPositionAsync`, **sem** `distanceInterval`: o app recebe atualizações no ritmo máximo do hardware. (E cuidado ao propor a correção: `timeInterval` é **Android-only** — só o `distanceInterval` resolve nas duas plataformas.)
3. `setUpdateInterval(16)` no acelerômetro = ~60 `setState` por segundo, com uma `FlatList` na mesma tela.

**Seção 4 — O sensor mal escolhido:**
- Contar passos olhando **só `x > 1.5`** não funciona: o eixo `x` depende de como o telefone está no bolso, e a passada aparece em eixos diferentes conforme a orientação. O autor provavelmente queria **magnitude do vetor** com detecção de transição — ou, se o objetivo era mesmo contar passos, existe um sensor dedicado a isso no mesmo pacote, que a disciplina não cobre.

**Seção 5 — Imagem:**
1. `Image` do `react-native` com `resizeMode`, numa lista com imagem remota: sem cache, recarrega a cada reciclagem.
2. Sem `recyclingKey` e sem `placeholder`: foto do item anterior aparecendo e lista pulando.

**Bônus, se você achou:**
- `reverseGeocodeAsync` **dentro** do callback do `watchPositionAsync` — a documentação avisa explicitamente que geocoding é caro e que muitas chamadas seguidas dão erro. Aqui ele roda a cada atualização de posição.
- `if (!posicao) setErro(...)` está **depois** de `await`s que já teriam falhado, e `getCurrentPositionAsync` não devolve `null` — a checagem não protege nada.
- `id: String(antigos.length)` gera **ids duplicados** se algum item for removido — o problema de `keyExtractor` da Aula 4.
- `setErro('')` dentro do callback apaga a mensagem de erro a cada atualização de GPS.

</details>

---

## Resumo de tempos

| Exercício | Dificuldade | Tempo | Onde |
|---|---|---|---|
| 1 — Associação | ⭐ | 4 min | sala, papel |
| 2 — Caça ao erro | ⭐⭐ | 5 min | sala, papel |
| 3 — "Onde eu estou" | ⭐⭐ | 6 min | sala, sandbox |
| 4 — Chacoalhada | ⭐⭐ | 6 min | sala, sandbox |
| 5 — Câmera e prévia | ⭐⭐ | 4 min | sala, sandbox |
| 6 — Giroscópio | ⭐⭐ | 10 min | casa |
| 7 — Galeria que pisca | ⭐⭐⭐ | 15 min | casa |
| Atividade 1 — Registro com contexto | ⭐⭐⭐ | 2–3 h | casa, projeto |
| Atividade 2 — Auditoria | ⭐⭐⭐ | 1h30 | casa, relatório |
| Atividade 3 — Nível de bolha | ⭐⭐ | 45 min | casa, bônus |

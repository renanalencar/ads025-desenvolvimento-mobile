# Exercícios e Atividades — Aula 6 (domínio Hábito)

> **Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School

| Projeto                                              | Repositório          | Branch da disciplina                    |
| ---------------------------------------------------- | -------------------- | --------------------------------------- |
| Rastreador de Micro-hábitos e Condicionamento Físico | `habit-tracker-expo` | `feature/aula_06_navigation` |


> 🧩 **Como usar os scaffolds:** a estrutura do arquivo, os imports e os nomes dos estilos já estão lá — o que falta é o miolo, que é onde está o conceito da aula. **Apague o comentário `// TODO` quando resolver aquele ponto.** Um arquivo sem nenhum `TODO` é um exercício concluído, e é assim que o professor confere rápido quem parou onde.


**Setup das Atividades Aplicadas** (seu projeto de verdade):

```bash
git clone <url-do-seu-repositorio> habit-tracker-expo
cd habit-tracker-expo
git checkout -b feature/aula_06_navigation
npm install
grep '"expo":' package.json        # confira o SDK do projeto (veja o aviso abaixo)
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
npx expo install expo-image-picker expo-image
```

> ⚠️ **Confira o SDK antes de instalar o Router.** O repositório `habit-tracker-expo` começou no **SDK 54** (`"expo": "^54..."` no `package.json`), e o Expo Go das lojas só abre projetos do **SDK 57**. Se o seu `package.json` ainda mostra 54, atualize **antes** dos `npx expo install` do Router — assim ele já instala as versões do SDK 57:
>
> ```bash
> npx expo install expo@^57.0.0
> npx expo install --fix
> npx expo install --check     # deve responder: Dependencies are up to date
> ```
>
> Faça isso num commit separado (`chore: atualiza para o Expo SDK 57`), para a migração do Router ficar fácil de revisar.

A migração do `App.tsx` para `src/app/` está descrita passo a passo na Atividade 1.

---

# Parte 1 — Exercícios guiados

## Exercício 1 — Complete: o botão "Escolher da galeria"

**Dificuldade:** ⭐⭐ · **Onde:** no `sandbox-aula6`, em `src/app/registrar-foto.tsx`

Complete a tela para que ela abra a galeria do sistema, mostre a prévia e **só deixe concluir quando houver foto**.

> 💡 **Para chegar até a tela:** crie o arquivo `src/app/registrar-foto.tsx` com o esqueleto abaixo e ponha no `src/app/index.tsx` um `<Link href="/registrar-foto">Registrar foto</Link>`. O `_layout.tsx` gerado pelo `reset-project` (`<Stack />`) já basta; você o completa no Exercício 6.

### Esqueleto

```tsx
// src/app/registrar-foto.tsx
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
// TODO 1: importe o Image CERTO (o que tem contentFit) e o expo-image-picker.
import { useRouter } from 'expo-router';

export default function TelaRegistrarFoto() {
  const router = useRouter();
  const [fotoUri, setFotoUri] = useState<string | null>(null);

  async function escolherDaGaleria() {
    // TODO 2: abra a galeria pedindo SÓ imagens, com recorte 4:3 e qualidade 0.7.
    //         Pergunta para responder num comentário: precisa pedir permissão antes?

    // TODO 3: se o usuário cancelou, saia sem mexer em nada.

    // TODO 4: guarde o uri da foto escolhida. Lembre-se: o resultado traz uma LISTA.
  }

  return (
    <View style={estilos.tela}>
      {fotoUri ? (
        // TODO 5: mostre a prévia com contentFit "cover" e transition de 300 ms.
        <View />
      ) : (
        <View style={[estilos.previa, estilos.semFoto]}>
          <Text>Nenhuma foto ainda</Text>
        </View>
      )}

      <Pressable onPress={escolherDaGaleria} style={estilos.botao}>
        <Text style={estilos.textoBotao}>Escolher da galeria</Text>
      </Pressable>

      <Pressable
        // TODO 6: ao tocar, volte para a tela anterior.
        //         O botão fica desabilitado (e apagado) enquanto não houver foto.
        style={estilos.botao}
      >
        <Text style={estilos.textoBotao}>Concluir</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 16 },
  previa: { width: '100%', aspectRatio: 4 / 3, borderRadius: 12 },
  semFoto: { backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' },
  botao: { backgroundColor: '#f26522', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  desligado: { opacity: 0.4 },
  textoBotao: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
```

### Teste

1. Escolha uma foto — a prévia aparece, recortada.
2. Abra a galeria de novo e toque em **Cancelar** — a foto anterior **continua** na tela.
3. Sem foto, o **Concluir** não faz nada. Com foto, ele volta para a tela inicial.
4. No **iPhone**, o recorte veio quadrado, mesmo com `aspect: [4, 3]`? Escreva num comentário por quê.

> 💡 Apague o `if (resultado.canceled) return;` e veja o que o TypeScript diz sobre `resultado.assets[0]`. Depois devolva a linha. **É esse o ponto do exercício.**

---

## Exercício 2 — Complete: a galeria com seleção múltipla

**Dificuldade:** ⭐⭐ · **Onde:** no `sandbox-aula6`, em `src/app/galeria.tsx`

Uma tela que deixa escolher **até 6 fotos** de uma vez e as mostra numa grade de três colunas.

### Esqueleto

```tsx
// src/app/galeria.tsx
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';

// TODO 1: declare aqui, FORA do componente, o renderItem que mostra uma miniatura.
//         O item é um asset do picker. Não esqueça do recyclingKey (Aula 5).

// TODO 2: declare aqui, também fora, o componente da lista vazia.

export default function TelaGaleria() {
  // TODO 3: estado com a lista de assets, começando vazia e TIPADA.

  async function escolherVarias() {
    // TODO 4: abra a galeria com seleção múltipla e limite de 6.
    //         Num comentário: por que não adianta pedir allowsEditing aqui?
    // TODO 5: trate o cancelamento e guarde a lista inteira.
  }

  return (
    <View style={estilos.tela}>
      <Pressable onPress={escolherVarias} style={estilos.botao}>
        <Text style={estilos.textoBotao}>Escolher até 6 fotos</Text>
      </Pressable>
      {/* TODO 6: FlatList em grade de 3 colunas, com keyExtractor pelo uri,
                  espaçamento com gap (columnWrapperStyle e contentContainerStyle)
                  e ListEmptyComponent. */}
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 16 },
  botao: { backgroundColor: '#f26522', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: '700', fontSize: 16 },
  grade: { gap: 8 },
  linha: { gap: 8 },
  miniatura: { flex: 1, aspectRatio: 1, borderRadius: 8, maxWidth: '33%' },
  vazio: { fontSize: 15, color: '#666' },
});
```

### Teste

1. Sem escolher nada, aparece a mensagem de lista vazia.
2. Escolha 4 fotos — a grade mostra uma linha cheia e uma com uma foto, **sem esticar** a última.
3. Tente escolher 8 — o sistema não deixa passar de 6.
4. Escolha de novo e cancele — a grade anterior continua.

> 💡 O `maxWidth: '33%'` da miniatura é o que impede a última foto de ocupar a linha inteira. Tire e veja.

---

## Exercício 3 — Complete: a câmera com os três estados

**Dificuldade:** ⭐⭐⭐ · **Onde:** no `sandbox-aula6`, em `src/app/foto-camera.tsx` — **aparelho físico**

Uma tela que tira a foto com a câmera do sistema, trata **os dois "não"** da permissão com mensagens diferentes e **sempre oferece a galeria como saída**.

### Esqueleto

```tsx
// src/app/foto-camera.tsx
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';

type Falha = 'camera-negada' | 'camera-bloqueada';

const MENSAGENS: Record<Falha, string> = {
  // TODO 1: duas mensagens DIFERENTES, cada uma dizendo ao usuário o que ELE pode fazer.
  //         A bloqueada precisa explicar o caminho nas Configurações do aparelho.
  //         As duas lembram que a galeria continua disponível.
  'camera-negada': '',
  'camera-bloqueada': '',
};

// TODO 2: declare UMA vez as opções (só imagens, recorte 4:3, qualidade 0.7),
//         tipadas com o tipo de opções do picker, para usar na câmera E na galeria.

export default function TelaFotoCamera() {
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [falha, setFalha] = useState<Falha | null>(null);

  async function tirarFoto() {
    setFalha(null);

    // TODO 3: peça a permissão de câmera. Se não vier, decida entre
    //         'camera-negada' e 'camera-bloqueada' usando o campo certo, e saia.

    // TODO 4: abra a câmera com as opções do TODO 2, trate o cancelamento
    //         e guarde o uri.
  }

  async function escolherDaGaleria() {
    setFalha(null);
    // TODO 5: abra a galeria com as MESMAS opções. Precisa de permissão?
  }

  return (
    <View style={estilos.tela}>
      {fotoUri ? (
        <Image source={{ uri: fotoUri }} style={estilos.previa} contentFit="cover" transition={300} />
      ) : (
        <View style={[estilos.previa, estilos.semFoto]}>
          <Text>Nenhuma foto ainda</Text>
        </View>
      )}

      <Pressable onPress={tirarFoto} style={estilos.botao}>
        <Text style={estilos.textoBotao}>Tirar foto</Text>
      </Pressable>

      <Pressable onPress={escolherDaGaleria} style={estilos.botaoSecundario}>
        <Text style={estilos.textoBotaoSecundario}>Escolher da galeria</Text>
      </Pressable>

      {/* TODO 6: mostre a mensagem de falha, quando houver. */}
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 16 },
  previa: { width: '100%', aspectRatio: 4 / 3, borderRadius: 12 },
  semFoto: { backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' },
  botao: { backgroundColor: '#f26522', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: '700', fontSize: 16 },
  botaoSecundario: { borderWidth: 2, borderColor: '#f26522', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  textoBotaoSecundario: { color: '#f26522', fontWeight: '700', fontSize: 16 },
  erro: { fontSize: 15, color: '#b00020' },
});
```

### Teste

1. Conceda a câmera — tire a foto, recorte, veja a prévia.
2. **Negue** — aparece a mensagem de negada, e a galeria continua funcionando.
3. Negue e marque **"não perguntar de novo"** (ou bloqueie nas Configurações) — a mensagem **muda**.
4. Abra a câmera e **cancele** — nada muda na tela, e nenhuma mensagem de erro aparece.

> 💡 Cancelar **não** é falha. Se o passo 4 mostrar uma mensagem de erro, o exercício não está feito.

---

## Exercício 4 — Complete: o `_layout.tsx` com três telas

**Dificuldade:** ⭐ · **Onde:** no `sandbox-aula6`

O app tem (ou vai ter) três telas: `src/app/index.tsx`, `src/app/registrar-foto.tsx` e `src/app/sobre.tsx`. O `registrar-foto.tsx` já existe desde o Exercício 1; crie o `sobre.tsx` com um `Text` qualquer e complete a moldura.

### Esqueleto

```tsx
// src/app/_layout.tsx
import { Stack } from 'expo-router';

export default function LayoutRaiz() {
  return (
    // TODO 1: faça a cor do título e da seta de voltar ser '#f26522' em TODAS as telas,
    //         com uma única prop no Stack.
    <Stack>
      {/* TODO 2: título "Meus hábitos" na tela inicial. Atenção ao `name`. */}

      {/* TODO 3: título "Foto do hábito" na tela de registrar foto.
                  No iOS, o texto ao lado da seta de voltar deve ser "Hábitos". */}

      {/* TODO 4: título "Sobre o app" na tela sobre. */}
    </Stack>
  );
}
```

### Teste

1. Abra o app — o cabeçalho diz **"Meus hábitos"**, não "index".
2. Mude a URL na barra do Expo (ou crie um `Link` provisório) e confira o título das outras duas telas.
3. Troque de propósito `name="sobre"` por `name="Sobre"`. O que aparece no terminal? O título ainda é aplicado?

> 💡 O `name` é o **nome do arquivo sem a extensão**. Se o título não muda, o primeiro suspeito é sempre ele.

---

# Parte 2 — Atividades aplicadas

## Atividade 1 — O app com mais de uma tela

**Dificuldade:** ⭐⭐⭐ · **Onde:** `habit-tracker-expo`, branch `feature/aula_06_navigation`

### Contexto

Até a Aula 5, o seu app era **um componente só**. Para mostrar a câmera, você escondia a lista com um `if` — e o botão de voltar do Android fechava o app inteiro.

Agora ele vai ter **telas de verdade**: com endereço, com título, com pilha e com um voltar que volta. E a foto do hábito vai poder vir **da câmera ou da galeria**, do jeito que o usuário preferir.

### O que entregar

1. **O projeto migrado para o Expo Router**, seguindo os seis passos abaixo. O app abre na mesma lista de hábitos de antes.
2. **Três rotas estáticas**, todas com título no `_layout.tsx`:
   - `/` — a lista de hábitos que já existe desde a Aula 4;
   - `/registrar-foto` — escolher a foto da **galeria** ou tirar com a **câmera**, com prévia em `expo-image` e um botão **Concluir** que volta;
   - `/sobre` — uma tela simples com o nome do app, a versão da aula e a limitação declarada (ver Restrições).
3. **Navegação pelos dois caminhos:** pelo menos um `Link` e pelo menos um `router.push` — cada um onde faz sentido.
4. **A tela de foto trata tudo:** cancelamento (sem mensagem de erro), câmera negada, câmera bloqueada — com mensagens **distintas** — e a galeria **sempre** disponível como saída.
5. **O config plugin do `expo-image-picker`** no `app.json`, com textos honestos e `microphonePermission: false`.
6. **Um `README.md`** atualizado (ver Restrições).

### A migração, passo a passo

Os seis passos que fizemos juntos em sala:

1. **Instalar** as dependências (ver *Setup das Atividades Aplicadas*, no topo).
2. **Trocar o ponto de entrada** no `package.json`:
   ```json
   "main": "expo-router/entry"
   ```
3. **Dar um `scheme`** ao app no `app.json` (`"scheme": "habittracker"`). Conferir que `"expo-router"` aparece **uma vez** em `plugins` — o `npx expo install` já o acrescentou.
4. **Criar** `src/app/_layout.tsx` com o `Stack`.
5. **Apontar a rota inicial** para a tela que já existe — **sem mover** a tela:
   ```tsx
   // src/app/index.tsx
   export { default } from '../screens/tela-habitos';
   ```
6. **Apagar** `App.tsx` e `index.ts`, e reiniciar com `npx expo start --clear`.

### Esqueletos para começar

**A moldura:**

```tsx
// src/app/_layout.tsx
import { Stack } from 'expo-router';

export default function LayoutRaiz() {
  return (
    <Stack screenOptions={{ headerTintColor: '#f26522' }}>
      <Stack.Screen name="index" options={{ title: 'Meus hábitos' }} />
      {/* TODO A1: títulos de /registrar-foto e /sobre */}
    </Stack>
  );
}
```

**O config plugin:**

```json
[
  "expo-image-picker",
  {
    "photosPermission": "TODO A2: por que o app quer as fotos — pensando em quem vai ler",
    "cameraPermission": "TODO A3: por que o app quer a câmera",
    "microphonePermission": false
  }
]
```

**O contrato, como checklist da tela de foto:**

```tsx
// GALERIA → PEDIR: ______________  LER: ______________  PARAR: ______________
// CÂMERA  → PEDIR: ______________  LER: ______________  PARAR: ______________
```

Preencha esse comentário no topo de `src/app/registrar-foto.tsx`. Ele vale nota.

---

## Atividade 2 — A galeria do hábito

**Dificuldade:** ⭐⭐

Acrescente ao seu projeto uma quarta rota estática, **`/galeria`**, que deixa o usuário escolher **até 6 fotos de progresso** de uma vez e as mostra em grade.

- Use a solução do Exercício 3 como base, mas **no seu projeto**: o componente da miniatura mora em `src/components/`, não em `src/app/`.
- Título no `_layout.tsx`, e um `Link` para ela na tela inicial.
- Num comentário: por que a seleção múltipla e o recorte não convivem.

**Critério:** funciona, a grade não estica a última foto, a lista vazia tem mensagem, e nada de componente dentro de `src/app/`.

---

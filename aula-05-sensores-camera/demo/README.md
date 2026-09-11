# Aula 5 — Projeto de demonstração: sensores do dispositivo

Projeto Expo que acompanha `presentation.html` / `presentation.md`. Cada tela existe
para ser **projetada ao vivo** num momento específico da aula, e nenhuma delas foi
escrita para ser bonita: foram escritas para tornar visível uma afirmação dos slides.

- **Expo SDK 57** · React Native 0.86 · React 19.2 · TypeScript estrito
- Roteamento por arquivos com `expo-router` (uma tela por rota, em `app/`)
- Pacotes da aula: `expo-location`, `expo-sensors`, `expo-camera`, `expo-image`

## Como rodar

```bash
cd demo
npm install
npx expo start
```

Abra no **Expo Go**, lendo o QR code com o aparelho.

> ⚠️ **Aparelho físico.** O iOS Simulator não tem câmera, acelerômetro nem giroscópio.
> O Android Emulator tem sensores virtuais nos *extended controls*, e serve para
> emergência. Esta é a aula que menos tolera simulador.

## O mapa: qual tela em qual slide

| Rota | Tela | Entra no slide | O que demonstrar |
|---|---|---|---|
| `/` | Índice + o contrato de três tempos | "Os três tempos" | Ler a lista em voz alta antes de abrir qualquer código |
| `/gps` | GPS | Parte 2 | Cronometrar `Accuracy` na sala; abrir e fechar a torneira |
| `/acelerometro` | Acelerômetro | Parte 3 | Telefone **parado na mesa** não marca zero |
| `/giroscopio` | Giroscópio | Parte 3 | Mesma posição, mesmo aparelho: **este** marca zero |
| `/camera` | Câmera | Parte 4 | Os três estados do gate; `zoom` de 0 a 1 |
| `/imagem` | `expo-image` | Parte 5 | Cinco `contentFit` na mesma moldura |
| `/registro` | Os quatro juntos | Parte 6 | O esqueleto da atividade aplicada |
| `/armadilhas` | Quebras propositais | qualquer momento | Quebrar ao vivo e deixar a sala diagnosticar errado |

## Roteiro de demonstração, tela por tela

### `/gps` — o copo e a torneira

1. **Cronometre.** Escolha `Low`, toque em "Onde eu estou", leia o campo *tempo até aqui*.
   Repita em `High`. O número real da sala é o melhor argumento do slide de `Accuracy`.
2. **Mostre as duas origens.** Na segunda leitura, o campo *origem* aparece primeiro como
   `cache (instantâneo)` e depois como `gps`: é `getLastKnownPositionAsync` seguido de
   `getCurrentPositionAsync`. 50 ms em vez de 6 segundos de *spinner*.
3. **`accuracy` não é nota.** Aponte o `±65 m` e desenhe o círculo na lousa.
4. **Recuse a permissão de propósito** para ver a mensagem de `permissao-recusada`. Depois
   negue duas vezes no iOS (ou marque "não perguntar" no Android) para cair em
   `canAskAgain: false` e ver o botão que leva às Configurações.
5. **Desligue o GPS do aparelho** com a permissão ainda concedida: mensagem diferente,
   lugar diferente para resolver.
6. **Abra a torneira**, ande pela sala, e mostre o aviso de que ela continua aberta.
   Feche com o botão — esse botão **é** o tempo 3.

### `/acelerometro` — a gravidade que não desliga

1. Ligue o sensor e **deixe o aparelho parado na mesa**. Magnitude ≈ 1,000 g.
2. Abra `/giroscopio` na mesma posição: zero. É a demo mais convincente do bloco.
3. Chacoalhe **de cima para baixo** e mostre que a magnitude dispara. O limiar `1.8` é
   empírico: teste no seu aparelho e diga que é empírico.
4. Troque para `16 ms` e leia o aviso vermelho.

### `/camera` — o gate de três estados

1. Entre com a permissão **ainda não decidida**: a tela fica vazia por um instante. Esse é
   o estado 1, e é a razão do primeiro `return`.
2. Recuse: aparece a tela de convencimento — **não** uma tela de erro.
3. Autorize e mexa em `facing`, `flash`, `enableTorch` e `zoom`. Mostre que `flash` só
   age no disparo e `enableTorch` acende agora.
4. Tire a foto e **leia o `uri` em voz alta**: `file:///.../Caches/...`. A foto não foi
   para a galeria.

### `/imagem` — o segundo `Image`

Esta é a única tela que precisa de **internet**: as imagens vêm do `picsum.photos`, porque
o ponto do pacote é justamente a imagem **remota**. Troque entre "Retrato" e "Paisagem"
com os cinco `contentFit` na tela: a moldura é sempre a mesma (100% × 120), e só o
recorte muda. No cartão de `placeholder`, toque em "Baixar outra imagem" e compare as
duas colunas — `cachePolicy="none"` está ali de propósito, para forçar o download.

### `/armadilhas` — quebre antes de explicar

Cada cartão é um bug que a turma vai escrever. O padrão é sempre o mesmo: **quebre,
espere o diagnóstico errado, e só então mostre a causa.**

1. **`CameraView` sem altura.** Toque em "Tirar o flex: 1". A câmera some. A sala vai
   falar de permissão. A causa é estilo.
2. **O `Image` errado.** Mesma `source`, mesmo `style`, mesmo `contentFit="contain"`.
   O da esquerda (`react-native`) corta; o da direita (`expo-image`) respeita. Nenhum
   erro de compilação — é bug silencioso.
3. **60 `setState` por segundo.** Com guarda: ~60 leituras/s e 1–2 `setState`/s. Sem
   guarda: ~60 e ~60. Troque a guarda com o medidor parado.
4. **A torneira que ninguém fechou.** Toque em "Ligar o sensor e sair da tela": o app
   volta ao índice. Entre aqui de novo e toque em "Conferir o contador" — ele subiu
   enquanto a tela não existia. O contador vive fora do componente de propósito.

## O que falta neste projeto, de propósito

**Não há `useEffect` em nenhum arquivo.** Toda torneira liga e desliga **no botão**, e a
assinatura fica guardada num `useState`. Isso é uma limitação real e declarada:

- se você sair de uma tela com o sensor ligado, ele **continua ligado**;
- a referência ao `CameraView` usa `ref={setCamera}` em vez de `useRef`, o que custa uma
  renderização a mais (a prop `ref` aceita uma função, e `setCamera` é uma função).

Ambas as coisas se consertam na **Aula 6**, e o combinado é voltar a este código para
consertá-las.

Também ficou fora do escopo, porque ficou fora da aula: mostrar a coordenada num **mapa**
(biblioteca de terceiro), localização em **segundo plano** e **geofencing** (exigem
*development build*), e **salvar a foto na galeria** (outro pacote). Hoje a coordenada é
texto e a foto vive no cache.

## O `app.json`

Os textos de permissão estão escritos nos *config plugins*, não deixados para novembro:

```json
["expo-location", { "locationWhenInUsePermission": "Precisamos da sua localização para registrar onde o hábito foi cumprido." }],
["expo-camera",   { "cameraPermission": "Precisamos da câmera para registrar a foto do seu progresso." }]
```

No **Expo Go** o app funciona mesmo sem isso, porque herda as permissões do próprio Expo
Go. Na **build de verdade** (Aula 13), não funciona. O usuário lê esse texto antes de
decidir — escreva um texto honesto.

## Estrutura

```
app/
  _layout.tsx        Stack com os títulos das telas
  index.tsx          índice das demonstrações
  gps.tsx            expo-location: permissão, copo, torneira, endereço
  acelerometro.tsx   expo-sensors: magnitude e chacoalhada
  giroscopio.tsx     expo-sensors: a mesma API, outra grandeza
  camera.tsx         expo-camera: gate de três estados e takePictureAsync
  imagem.tsx         expo-image: contentFit, placeholder, cachePolicy
  registro.tsx       os quatro pacotes na mesma tela (Parte 6)
  armadilhas.tsx     as quebras propositais
components/          Botao, Cartao, Aviso, TelaDemo (moldura comum)
constants/theme.ts   a paleta da apresentação
```

As telas de demonstração são propositalmente **planas**: toda a lógica de sensor está
visível no arquivo da própria tela, sem hook extraído e sem camada de serviço. É para
poder projetar o arquivo inteiro e apontar as três fases com o dedo.

## Verificação

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # expo lint
```

Os dois passam limpos.

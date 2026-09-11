import {
  CameraView,
  useCameraPermissions,
  type CameraCapturedPicture,
  type CameraType,
  type FlashMode,
} from 'expo-camera';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';

import { Aviso } from '@/components/aviso';
import { Botao } from '@/components/botao';
import { Cartao } from '@/components/cartao';
import { Cores, Espacos } from '@/constants/theme';

const ZOOMS = [0, 0.25, 0.5, 1] as const; // zoom vai de 0 a 1, não "2x"

export default function TelaCamera() {
  // Forma 2 de pedir permissão: a tela inteira depende dela.
  const [permissao, pedirPermissao] = useCameraPermissions();

  // Sem useRef (Aula 6): a prop ref aceita uma função, e setCamera é uma função.
  const [camera, setCamera] = useState<CameraView | null>(null);

  const [lado, setLado] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [lanterna, setLanterna] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [foto, setFoto] = useState<CameraCapturedPicture | null>(null);

  async function tirarFoto() {
    if (!camera) return; // ainda é null no primeiro render
    const capturada = await camera.takePictureAsync({ quality: 0.7 });
    if (capturada) setFoto(capturada);
  }

  // Estado 1: a resposta ainda não chegou. null NÃO é "negado".
  if (!permissao) {
    return <View style={estilos.tela} />;
  }

  // Estado 2: sabemos, e não temos. Esta tela não é de erro — é o argumento de venda.
  if (!permissao.granted) {
    return (
      <View style={[estilos.tela, estilos.centro]}>
        <Text style={estilos.convite}>
          Precisamos da câmera para registrar a foto do seu progresso.
        </Text>
        <Text style={estilos.conviteDetalhe}>
          A foto fica no seu aparelho. Nada é enviado para nenhum servidor.
        </Text>

        {permissao.canAskAgain ? (
          <Botao titulo="Permitir câmera" onPress={pedirPermissao} />
        ) : (
          <View style={estilos.grupoBloqueado}>
            <Aviso tipo="erro">
              canAskAgain: false — o sistema não vai mostrar o diálogo de novo. Insistir neste botão
              não faz nada; a única saída é levar às Configurações.
            </Aviso>
            <Botao titulo="Abrir Configurações" onPress={() => Linking.openSettings()} />
          </View>
        )}
      </View>
    );
  }

  // Estado 3: temos a permissão.
  return (
    <View style={estilos.tela}>
      <CameraView
        ref={setCamera}
        style={estilos.camera}
        facing={lado}
        flash={flash}
        enableTorch={lanterna}
        zoom={zoom}
        mode="picture"
      />

      <View style={estilos.painel}>
        <View style={estilos.linha}>
          <View style={estilos.celula}>
            <Botao
              titulo={lado === 'back' ? 'Traseira' : 'Frontal'}
              variante="secundario"
              onPress={() => setLado((atual) => (atual === 'back' ? 'front' : 'back'))}
            />
            <Text style={estilos.rotulo}>facing</Text>
          </View>
          <View style={estilos.celula}>
            <Botao
              titulo={`flash: ${flash}`}
              variante="secundario"
              onPress={() =>
                setFlash((atual) => (atual === 'off' ? 'on' : atual === 'on' ? 'auto' : 'off'))
              }
            />
            <Text style={estilos.rotulo}>só no disparo</Text>
          </View>
          <View style={estilos.celula}>
            <Botao
              titulo={lanterna ? 'Lanterna on' : 'Lanterna off'}
              variante="secundario"
              onPress={() => setLanterna((atual) => !atual)}
            />
            <Text style={estilos.rotulo}>enableTorch</Text>
          </View>
        </View>

        <View style={estilos.linha}>
          {ZOOMS.map((nivel) => (
            <View key={nivel} style={estilos.celula}>
              <Botao
                titulo={`${nivel}`}
                variante={zoom === nivel ? 'primario' : 'secundario'}
                onPress={() => setZoom(nivel)}
              />
            </View>
          ))}
        </View>
        <Text style={estilos.rotulo}>zoom: 0 a 1 — e flash ≠ enableTorch</Text>

        <Botao titulo="📸 Tirar foto" onPress={tirarFoto} />

        {foto && (
          <Cartao titulo="O que takePictureAsync devolveu">
            <Image
              source={{ uri: foto.uri }}
              style={estilos.previa}
              contentFit="cover"
              transition={300}
            />
            <Text style={estilos.meta}>
              {foto.width} × {foto.height} px
            </Text>
            <Text style={estilos.uri} numberOfLines={2}>
              {foto.uri}
            </Text>
            <Aviso tipo="erro">
              Esse caminho é o cache do aplicativo. A foto NÃO foi para a galeria — se o sistema
              limpar o cache, ela some. Salvar de verdade é outro pacote.
            </Aviso>
          </Cartao>
        )}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: Cores.fundoEscuro },
  centro: { alignItems: 'center', justifyContent: 'center', padding: Espacos.lg, gap: Espacos.md },
  convite: { color: Cores.branco, fontSize: 18, fontWeight: '700', textAlign: 'center' },
  conviteDetalhe: { color: Cores.borda, fontSize: 14, textAlign: 'center', lineHeight: 20 },
  grupoBloqueado: { gap: Espacos.sm, alignSelf: 'stretch' },
  camera: { flex: 1 }, // sem isto, tela preta — e a turma vai culpar a permissão
  painel: { padding: Espacos.md, gap: Espacos.sm, backgroundColor: Cores.fundoEscuro },
  linha: { flexDirection: 'row', gap: Espacos.sm },
  celula: { flex: 1, gap: 2, alignItems: 'center' },
  rotulo: { fontSize: 11, color: Cores.borda, textAlign: 'center' },
  previa: { width: '100%', height: 180, borderRadius: 10, backgroundColor: Cores.borda },
  meta: { fontSize: 13, color: Cores.preto, fontWeight: '600' },
  uri: { fontSize: 11, color: Cores.textoFraco, fontFamily: 'monospace' },
});

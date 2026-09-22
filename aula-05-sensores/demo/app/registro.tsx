import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

/**
 * A tela completa da Parte 6: os três pacotes de sensor mais o de exibição.
 * É o esqueleto da atividade aplicada "O registro com contexto".
 *
 * 🧩 Falta aqui, de propósito: não há assinatura contínua de sensor. Se você
 * acrescentar uma (Accelerometer.addListener), PRECISA de um botão para
 * desligá-la — não há nada nesta tela que desligue quando ela sai.
 */

type Local = { latitude: number; longitude: number; precisaoMetros: number };

export default function TelaRegistro() {
  const [permissaoCamera, pedirPermissaoCamera] = useCameraPermissions();
  const [camera, setCamera] = useState<CameraView | null>(null);
  const [local, setLocal] = useState<Local | null>(null);
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [erroLocal, setErroLocal] = useState<string | null>(null);
  const [buscando, setBuscando] = useState(false);

  async function registrarLocal() {
    setErroLocal(null);
    setBuscando(true);

    const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErroLocal(
        canAskAgain
          ? 'Sem permissão de localização. Toque de novo para autorizar.'
          : 'Permissão bloqueada. Autorize nas Configurações do sistema.',
      );
      setBuscando(false);
      return;
    }

    if (!(await Location.hasServicesEnabledAsync())) {
      setErroLocal('A localização do aparelho está desligada.');
      setBuscando(false);
      return;
    }

    // Balanced porque o registro precisa saber EM QUE LUGAR o hábito foi
    // cumprido, não desenhar um trajeto. Highest só gastaria bateria.
    const posicao = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    setLocal({
      latitude: posicao.coords.latitude,
      longitude: posicao.coords.longitude,
      precisaoMetros: posicao.coords.accuracy ?? 0,
    });
    setBuscando(false);
  }

  async function tirarFoto() {
    if (!camera) return; // ainda é null no 1º render
    const foto = await camera.takePictureAsync({ quality: 0.7 });
    if (foto) setFotoUri(foto.uri);
  }

  if (!permissaoCamera) return <View style={estilos.tela} />;

  return (
    <View style={estilos.tela}>
      {permissaoCamera.granted ? (
        <CameraView ref={setCamera} style={estilos.camera} facing="back" />
      ) : (
        <View style={estilos.aviso}>
          <Text style={estilos.textoAviso}>
            Precisamos da câmera para registrar a foto do seu progresso.
          </Text>
          <Pressable onPress={pedirPermissaoCamera} style={estilos.botao}>
            <Text style={estilos.textoBotao}>Permitir câmera</Text>
          </Pressable>
        </View>
      )}

      <View style={estilos.painel}>
        <Pressable
          onPress={tirarFoto}
          style={({ pressed }) => [estilos.botao, pressed && estilos.botaoPressionado]}
        >
          <Text style={estilos.textoBotao}>Tirar foto</Text>
        </Pressable>

        <Pressable
          onPress={registrarLocal}
          style={({ pressed }) => [estilos.botao, pressed && estilos.botaoPressionado]}
        >
          <Text style={estilos.textoBotao}>{buscando ? 'Buscando...' : 'Onde eu estou'}</Text>
        </Pressable>

        {erroLocal && <Text style={estilos.erro}>{erroLocal}</Text>}

        {local && (
          <Text style={estilos.info}>
            {local.latitude.toFixed(5)}, {local.longitude.toFixed(5)} (±
            {Math.round(local.precisaoMetros)} m)
          </Text>
        )}

        {fotoUri && (
          <Image
            source={{ uri: fotoUri }}
            style={estilos.previa}
            contentFit="cover"
            transition={300}
          />
        )}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#111' },
  camera: { flex: 1 },
  aviso: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  textoAviso: { color: '#fff', textAlign: 'center', fontSize: 16 },
  painel: { padding: 16, gap: 12, backgroundColor: '#1b1b1b' },
  botao: { backgroundColor: '#f26522', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  botaoPressionado: { opacity: 0.7 },
  textoBotao: { color: '#fff', fontWeight: '700' },
  info: { color: '#eee' },
  erro: { color: '#ff8a80' },
  previa: { width: '100%', height: 160, borderRadius: 12, backgroundColor: '#222' },
});

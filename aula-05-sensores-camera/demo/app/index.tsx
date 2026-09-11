import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Aviso } from '@/components/aviso';
import { Cartao } from '@/components/cartao';
import { Cores, Espacos } from '@/constants/theme';

type Demo = {
  rota: '/gps' | '/acelerometro' | '/giroscopio' | '/camera' | '/imagem' | '/registro' | '/armadilhas';
  numero: string;
  titulo: string;
  pacote: string;
  descricao: string;
};

const DEMOS: Demo[] = [
  {
    rota: '/gps',
    numero: '1',
    titulo: 'GPS: o copo e a torneira',
    pacote: 'expo-location',
    descricao:
      'Permissão, getCurrentPositionAsync, Accuracy, getLastKnownPositionAsync, watchPositionAsync com remove() e reverseGeocodeAsync.',
  },
  {
    rota: '/acelerometro',
    numero: '2',
    titulo: 'Acelerômetro e chacoalhada',
    pacote: 'expo-sensors',
    descricao:
      'Parado na mesa não dá zero. Magnitude em vez de x sozinho. setUpdateInterval como pedido, não garantia.',
  },
  {
    rota: '/giroscopio',
    numero: '3',
    titulo: 'Giroscópio',
    pacote: 'expo-sensors',
    descricao: 'A mesma API do acelerômetro, outra grandeza: rad/s. Parado na mesa, dá zero.',
  },
  {
    rota: '/camera',
    numero: '4',
    titulo: 'Câmera e o gate de três estados',
    pacote: 'expo-camera',
    descricao:
      'useCameraPermissions, os três returns, facing/flash/zoom/torch e takePictureAsync sem useRef.',
  },
  {
    rota: '/imagem',
    numero: '5',
    titulo: 'expo-image',
    pacote: 'expo-image',
    descricao: 'contentFit lado a lado, placeholder com blurhash, transition e cachePolicy.',
  },
  {
    rota: '/registro',
    numero: '6',
    titulo: 'O registro com contexto',
    pacote: 'os quatro juntos',
    descricao: 'Sensor → dado → tela. O esqueleto da atividade aplicada.',
  },
  {
    rota: '/armadilhas',
    numero: '7',
    titulo: 'Armadilhas, ao vivo',
    pacote: 'quebras propositais',
    descricao:
      'CameraView sem altura, o Image errado, 60 setState por segundo e a torneira que ninguém fechou.',
  },
];

export default function TelaInicial() {
  return (
    <ScrollView style={estilos.tela} contentContainerStyle={estilos.conteudo}>
      <View style={estilos.intro}>
        <Text style={estilos.titulo}>O contrato de três tempos</Text>
        <Text style={estilos.subtitulo}>
          Pedir → Ler → <Text style={estilos.enfase}>Parar</Text>. O tempo 3 é o que todo mundo
          esquece. Ele se repete nos quatro pacotes desta aula.
        </Text>
      </View>

      <Aviso tipo="alerta">
        Rode no aparelho físico. O iOS Simulator não tem câmera, acelerômetro nem giroscópio — e é
        exatamente para isso que existe o isAvailableAsync().
      </Aviso>

      <Aviso tipo="info">
        Nenhuma tela aqui usa useEffect: as torneiras ligam e desligam no botão, de propósito. Se
        você sair da tela com um sensor ligado, ele continua ligado. A ferramenta que conserta isso
        é a Aula 6.
      </Aviso>

      {DEMOS.map((demo) => (
        <Link key={demo.rota} href={demo.rota} asChild>
          <Pressable style={({ pressed }) => [pressed && estilos.pressionado]}>
            <Cartao>
              <View style={estilos.linhaTitulo}>
                <View style={estilos.numero}>
                  <Text style={estilos.numeroTexto}>{demo.numero}</Text>
                </View>
                <View style={estilos.textoTitulo}>
                  <Text style={estilos.tituloDemo}>{demo.titulo}</Text>
                  <Text style={estilos.pacoteDemo}>{demo.pacote}</Text>
                </View>
              </View>
              <Text style={estilos.descricao}>{demo.descricao}</Text>
            </Cartao>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: Cores.fundo },
  conteudo: { padding: Espacos.md, gap: Espacos.md, paddingBottom: Espacos.lg * 2 },
  intro: { gap: Espacos.sm },
  titulo: { fontSize: 24, fontWeight: '800', color: Cores.preto },
  subtitulo: { fontSize: 15, color: Cores.textoFraco, lineHeight: 22 },
  enfase: { color: Cores.destaque, fontWeight: '700' },
  linhaTitulo: { flexDirection: 'row', alignItems: 'center', gap: Espacos.sm + 4 },
  numero: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Cores.destaque,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numeroTexto: { color: Cores.branco, fontWeight: '800', fontSize: 15 },
  textoTitulo: { flex: 1 },
  tituloDemo: { fontSize: 16, fontWeight: '700', color: Cores.preto },
  pacoteDemo: { fontSize: 12, color: Cores.destaque, fontFamily: 'monospace' },
  descricao: { fontSize: 13, color: Cores.textoFraco, lineHeight: 19 },
  pressionado: { opacity: 0.7 },
});

import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image as ImagemExpo } from 'expo-image';
import { useRouter } from 'expo-router';
import { Accelerometer } from 'expo-sensors';
import { useState } from 'react';
import { Image as ImagemReactNative, StyleSheet, Text, View } from 'react-native';

import { Aviso } from '@/components/aviso';
import { Botao } from '@/components/botao';
import { Cartao } from '@/components/cartao';
import { TelaDemo } from '@/components/tela-demo';
import { Cores, Espacos } from '@/constants/theme';

type Assinatura = ReturnType<typeof Accelerometer.addListener>;

const RETRATO = 'https://picsum.photos/id/1025/400/800';

/**
 * Estado de módulo, de propósito: ele sobrevive à desmontagem da tela.
 * É como a gente prova que a torneira continua aberta depois de você sair.
 */
const vazamento = { assinatura: null as Assinatura | null, leituras: 0 };

export default function TelaArmadilhas() {
  const router = useRouter();
  const [permissao, pedirPermissao] = useCameraPermissions();

  const [cameraComAltura, setCameraComAltura] = useState(false);
  const [leiturasVazadas, setLeiturasVazadas] = useState(vazamento.leituras);
  const [medidor, setMedidor] = useState<{
    assinatura: Assinatura;
    relogio: ReturnType<typeof setInterval>;
  } | null>(null);
  const [guardado, setGuardado] = useState(true);
  const [placar, setPlacar] = useState({ leituras: 0, atualizacoes: 0 });

  // ---------- Armadilha 3: 60 setState por segundo ----------
  function ligarMedidor() {
    let leituras = 0;
    let atualizacoes = 0;
    let ultimoResultado = false;

    Accelerometer.setUpdateInterval(16); // ~60 Hz, o intervalo do erro

    const assinatura = Accelerometer.addListener(({ x, y, z }) => {
      leituras += 1;
      const chacoalhou = Math.sqrt(x * x + y * y + z * z) > 1.8;

      if (guardado) {
        // Só chama setState quando o RESULTADO muda.
        if (chacoalhou !== ultimoResultado) {
          ultimoResultado = chacoalhou;
          atualizacoes += 1;
        }
      } else {
        // Sem guarda: uma renderização por leitura do sensor.
        atualizacoes += 1;
      }
    });

    // O relógio só existe para MEDIR sem interferir na medição.
    const relogio = setInterval(() => {
      setPlacar({ leituras, atualizacoes });
      leituras = 0;
      atualizacoes = 0;
    }, 1000);

    setMedidor({ assinatura, relogio });
  }

  function desligarMedidor() {
    medidor?.assinatura.remove();
    if (medidor) clearInterval(medidor.relogio);
    setMedidor(null);
    setPlacar({ leituras: 0, atualizacoes: 0 });
  }

  // ---------- Armadilha 4: a torneira que ninguém fechou ----------
  function vazarEsair() {
    vazamento.assinatura?.remove();
    Accelerometer.setUpdateInterval(200);
    vazamento.assinatura = Accelerometer.addListener(() => {
      vazamento.leituras += 1;
    });
    setLeiturasVazadas(vazamento.leituras);
    router.push('/');
  }

  function fecharVazamento() {
    vazamento.assinatura?.remove();
    vazamento.assinatura = null;
    setLeiturasVazadas(vazamento.leituras);
  }

  return (
    <TelaDemo
      pacote="quebras propositais"
      chamada="Cada cartão aqui é um bug que a turma vai escrever. Quebre ao vivo, deixe a sala diagnosticar errado, e só então mostre a causa."
    >
      {/* ---------- Armadilha 1 ---------- */}
      <Cartao
        titulo="1. CameraView sem altura = tela preta"
        legenda="Antes de debugar permissão, confira o estilo. O componente está montado, a permissão está concedida, e não se vê nada."
      >
        {!permissao ? (
          <Text style={estilos.esperando}>Consultando a permissão...</Text>
        ) : !permissao.granted ? (
          <Botao titulo="Permitir câmera para este teste" onPress={pedirPermissao} />
        ) : (
          <>
            <View style={estilos.molduraCamera}>
              <CameraView
                style={cameraComAltura ? estilos.cameraCerta : estilos.cameraErrada}
                facing="back"
              />
            </View>
            <Botao
              titulo={cameraComAltura ? 'Tirar o flex: 1 (quebrar)' : 'Colocar flex: 1 (consertar)'}
              variante={cameraComAltura ? 'perigo' : 'primario'}
              onPress={() => setCameraComAltura((atual) => !atual)}
            />
            <Text style={estilos.codigo}>
              camera: {'{'} {cameraComAltura ? 'flex: 1' : '/* sem altura nenhuma */'} {'}'}
            </Text>
          </>
        )}
      </Cartao>

      {/* ---------- Armadilha 2 ---------- */}
      <Cartao
        titulo="2. O Image errado"
        legenda="Mesma source, mesmo style, mesmo contentFit=&quot;contain&quot;. Um respeita; o outro ignora em silêncio."
      >
        <View style={estilos.comparacao}>
          <View style={estilos.metade}>
            <Text style={estilos.rotuloErrado}>react-native</Text>
            {/* contentFit chega por spread: o TypeScript não reclama, e o componente ignora. */}
            <ImagemReactNative
              source={{ uri: RETRATO }}
              style={estilos.moldura}
              {...{ contentFit: 'contain' }}
            />
            <Text style={estilos.legendaErrada}>cortou: contentFit não existe aqui</Text>
          </View>
          <View style={estilos.metade}>
            <Text style={estilos.rotuloCerto}>expo-image</Text>
            <ImagemExpo source={{ uri: RETRATO }} style={estilos.moldura} contentFit="contain" />
            <Text style={estilos.legendaCerta}>cabe inteira, com sobra</Text>
          </View>
        </View>
        <Aviso tipo="erro">
          &quot;O contentFit não funciona&quot; → confira o import. É a causa nº 1, e nenhum erro de
          compilação aparece.
        </Aviso>
      </Cartao>

      {/* ---------- Armadilha 3 ---------- */}
      <Cartao
        titulo="3. setUpdateInterval(16) com setState em cada leitura"
        legenda="O sensor entrega ~60 leituras por segundo. A pergunta é quantas delas viram renderização."
      >
        <View style={estilos.placar}>
          <View style={estilos.numero}>
            <Text style={estilos.numeroValor}>{placar.leituras}</Text>
            <Text style={estilos.numeroRotulo}>leituras/s</Text>
          </View>
          <View style={estilos.numero}>
            <Text style={[estilos.numeroValor, !guardado && estilos.numeroRuim]}>
              {placar.atualizacoes}
            </Text>
            <Text style={estilos.numeroRotulo}>setState/s</Text>
          </View>
        </View>

        <Botao
          titulo={guardado ? 'Com guarda (só quando muda)' : 'Sem guarda (a cada leitura)'}
          variante={guardado ? 'primario' : 'perigo'}
          onPress={() => setGuardado((atual) => !atual)}
          desabilitado={medidor !== null}
        />
        {medidor ? (
          <Botao titulo="Parar o medidor" variante="perigo" onPress={desligarMedidor} />
        ) : (
          <Botao titulo="Começar a medir" variante="secundario" onPress={ligarMedidor} />
        )}
        <Text style={estilos.dica}>
          Troque a guarda com o medidor parado. Sem guarda, numa tela com FlatList, 60
          renderizações/s derrubam o app.
        </Text>
      </Cartao>

      {/* ---------- Armadilha 4 ---------- */}
      <Cartao
        titulo="4. A torneira que ninguém fechou"
        legenda="Este contador vive fora do componente, de propósito. Ligue, volte para a lista e entre aqui de novo."
      >
        <Text style={estilos.contadorVazamento}>{leiturasVazadas} leituras acumuladas</Text>
        <Text style={estilos.dica}>
          {vazamento.assinatura
            ? 'A assinatura está ATIVA — e você já saiu desta tela uma vez.'
            : 'Nenhuma assinatura ativa agora.'}
        </Text>
        <Botao titulo="Ligar o sensor e sair da tela" variante="perigo" onPress={vazarEsair} />
        <Botao
          titulo="Conferir o contador"
          variante="secundario"
          onPress={() => setLeiturasVazadas(vazamento.leituras)}
        />
        <Botao titulo="Fechar a torneira (remove)" onPress={fecharVazamento} />
        <Aviso tipo="info">
          Toda torneira aberta tem uma torneira fechada no mesmo arquivo. Hoje isso é um botão; na
          Aula 6 passa a ser automático.
        </Aviso>
      </Cartao>
    </TelaDemo>
  );
}

const estilos = StyleSheet.create({
  esperando: { fontSize: 13, color: Cores.textoFraco },
  molduraCamera: {
    height: 160,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: Cores.preto,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraCerta: { flex: 1, alignSelf: 'stretch' },
  cameraErrada: {}, // sem altura: o CameraView ocupa zero pixel
  codigo: { fontSize: 12, fontFamily: 'monospace', color: Cores.textoFraco },
  comparacao: { flexDirection: 'row', gap: Espacos.sm },
  metade: { flex: 1, gap: Espacos.xs },
  moldura: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Cores.borda,
    backgroundColor: Cores.branco,
  },
  rotuloErrado: { fontSize: 12, fontWeight: '700', color: Cores.alerta, fontFamily: 'monospace' },
  rotuloCerto: { fontSize: 12, fontWeight: '700', color: Cores.ok, fontFamily: 'monospace' },
  legendaErrada: { fontSize: 11, color: Cores.alerta },
  legendaCerta: { fontSize: 11, color: Cores.ok },
  placar: { flexDirection: 'row', gap: Espacos.sm },
  numero: {
    flex: 1,
    backgroundColor: Cores.branco,
    borderRadius: 10,
    padding: Espacos.sm,
    alignItems: 'center',
  },
  numeroValor: { fontSize: 26, fontWeight: '800', color: Cores.preto },
  numeroRuim: { color: Cores.alerta },
  numeroRotulo: { fontSize: 11, color: Cores.textoFraco },
  dica: { fontSize: 12, color: Cores.textoFraco, lineHeight: 17 },
  contadorVazamento: { fontSize: 22, fontWeight: '800', color: Cores.alerta },
});

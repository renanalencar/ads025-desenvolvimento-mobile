import { Accelerometer } from 'expo-sensors';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Aviso } from '@/components/aviso';
import { Botao } from '@/components/botao';
import { Cartao } from '@/components/cartao';
import { TelaDemo } from '@/components/tela-demo';
import { Cores, Espacos } from '@/constants/theme';

type Leitura = { x: number; y: number; z: number };

/** O tipo da assinatura sem depender de um import interno do pacote. */
type Assinatura = ReturnType<typeof Accelerometer.addListener>;

const PARADO: Leitura = { x: 0, y: 0, z: 0 };
const LIMIAR_CHACOALHADA = 1.8; // empírico: não vem da documentação, vem do aparelho
const INTERVALOS = [
  { rotulo: '16 ms', ms: 16, hz: '~60 Hz' },
  { rotulo: '100 ms', ms: 100, hz: '10 Hz' },
  { rotulo: '500 ms', ms: 500, hz: '2 Hz' },
] as const;

export default function TelaAcelerometro() {
  const [leitura, setLeitura] = useState<Leitura>(PARADO);
  const [assinatura, setAssinatura] = useState<Assinatura | null>(null);
  const [intervalo, setIntervalo] = useState(100);
  const [chacoalhou, setChacoalhou] = useState(false);
  const [chacoalhadas, setChacoalhadas] = useState(0);
  const [indisponivel, setIndisponivel] = useState(false);

  const magnitude = Math.sqrt(
    leitura.x * leitura.x + leitura.y * leitura.y + leitura.z * leitura.z,
  );

  async function ligar() {
    // O iOS Simulator não tem acelerômetro. É para isso que a função existe.
    if (!(await Accelerometer.isAvailableAsync())) {
      setIndisponivel(true);
      return;
    }

    Accelerometer.setUpdateInterval(intervalo); // é um pedido, não uma garantia

    // Guarda o último resultado num fechamento, fora do React: é o que permite
    // contar as transições sem chamar setState a cada leitura do sensor.
    let ultimoResultado = false;

    const nova = Accelerometer.addListener(({ x, y, z }) => {
      setLeitura({ x, y, z });

      const agora = Math.sqrt(x * x + y * y + z * z) > LIMIAR_CHACOALHADA;

      // setState só quando o RESULTADO muda — não a cada leitura do sensor.
      setChacoalhou((anterior) => (anterior === agora ? anterior : agora));

      if (agora !== ultimoResultado) {
        ultimoResultado = agora;
        if (agora) setChacoalhadas((total) => total + 1);
      }
    });

    setAssinatura(nova);
  }

  function desligar() {
    assinatura?.remove(); // removeAllListeners() está deprecado
    setAssinatura(null);
    setLeitura(PARADO);
    setChacoalhou(false);
  }

  return (
    <TelaDemo
      pacote="expo-sensors · Accelerometer"
      chamada="Mede translação MAIS gravidade, em g (1 g = 9,81 m/s²). Não pede permissão: não diz onde você está nem quem você é."
    >
      <Cartao
        titulo="Coloque o aparelho parado na mesa"
        legenda="O acelerômetro não vai marcar zero. Não é bug — é a gravidade, que não desliga."
      >
        <View style={estilos.eixos}>
          <Eixo nome="x" valor={leitura.x} />
          <Eixo nome="y" valor={leitura.y} />
          <Eixo nome="z" valor={leitura.z} />
        </View>

        <View style={estilos.magnitudeCaixa}>
          <Text style={estilos.magnitudeRotulo}>magnitude = √(x² + y² + z²)</Text>
          <Text style={estilos.magnitudeValor}>{magnitude.toFixed(3)} g</Text>
          <Text style={estilos.magnitudeDica}>
            {assinatura ? 'Parado, isto fica perto de 1,000 g.' : 'Ligue o sensor para ver.'}
          </Text>
        </View>
      </Cartao>

      <Cartao
        titulo={`Chacoalhada: magnitude > ${LIMIAR_CHACOALHADA}`}
        legenda="Olhando só o x, uma chacoalhada de cima para baixo passa batido. A magnitude é independente da orientação do aparelho."
      >
        <View style={[estilos.alvo, chacoalhou && estilos.alvoAtivo]}>
          <Text style={[estilos.alvoTexto, chacoalhou && estilos.alvoTextoAtivo]}>
            {chacoalhou ? '🫨 CHACOALHOU' : 'parado'}
          </Text>
        </View>
        <Text style={estilos.contador}>{chacoalhadas} chacoalhada(s) detectada(s)</Text>
      </Cartao>

      <Cartao
        titulo="setUpdateInterval"
        legenda="O olho não lê 60 números por segundo. 60 setState/s são 60 renderizações/s — numa tela com FlatList, isso derruba o app."
      >
        <View style={estilos.linhaBotoes}>
          {INTERVALOS.map((opcao) => (
            <View key={opcao.ms} style={estilos.itemIntervalo}>
              <Botao
                titulo={opcao.rotulo}
                variante={intervalo === opcao.ms ? 'primario' : 'secundario'}
                onPress={() => {
                  setIntervalo(opcao.ms);
                  if (assinatura) Accelerometer.setUpdateInterval(opcao.ms);
                }}
              />
              <Text style={estilos.hz}>{opcao.hz}</Text>
            </View>
          ))}
        </View>
        {intervalo === 16 && (
          <Aviso tipo="erro">
            16 ms com setState a cada leitura é o erro de desempenho do bloco. Android 12+ ainda
            limita a 200 Hz por padrão, como proteção de privacidade.
          </Aviso>
        )}
      </Cartao>

      {assinatura ? (
        <Botao titulo="Desligar sensor (remove)" variante="perigo" onPress={desligar} />
      ) : (
        <Botao titulo="Ligar sensor (addListener)" onPress={ligar} />
      )}

      {indisponivel && (
        <Aviso tipo="erro">
          isAvailableAsync() devolveu false. Você está num simulador — este bloco precisa de aparelho
          físico.
        </Aviso>
      )}

      {assinatura && (
        <Aviso tipo="alerta">
          Torneira aberta. Não há nada aqui que a feche quando você sair da tela: é um vazamento
          proposital, e a ferramenta que conserta isso é a Aula 6.
        </Aviso>
      )}
    </TelaDemo>
  );
}

function Eixo({ nome, valor }: { nome: string; valor: number }) {
  // A barra vai de -2 g a +2 g, com o zero no meio.
  const proporcao = Math.min(Math.abs(valor) / 2, 1);

  return (
    <View style={estilos.eixo}>
      <Text style={estilos.eixoNome}>{nome}</Text>
      <View style={estilos.trilha}>
        <View
          style={[
            estilos.barra,
            { width: `${proporcao * 50}%`, [valor < 0 ? 'right' : 'left']: '50%' },
          ]}
        />
      </View>
      <Text style={estilos.eixoValor}>{valor.toFixed(3)}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  eixos: { gap: Espacos.sm },
  eixo: { flexDirection: 'row', alignItems: 'center', gap: Espacos.sm },
  eixoNome: { width: 16, fontSize: 14, fontWeight: '700', color: Cores.destaque },
  trilha: {
    flex: 1,
    height: 14,
    backgroundColor: Cores.branco,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Cores.borda,
    overflow: 'hidden',
  },
  barra: { position: 'absolute', top: 0, bottom: 0, backgroundColor: Cores.destaque },
  eixoValor: {
    width: 62,
    textAlign: 'right',
    fontSize: 13,
    fontFamily: 'monospace',
    color: Cores.preto,
  },
  magnitudeCaixa: {
    backgroundColor: Cores.branco,
    borderRadius: 10,
    padding: Espacos.sm + 4,
    alignItems: 'center',
    gap: 2,
  },
  magnitudeRotulo: { fontSize: 12, color: Cores.textoFraco, fontFamily: 'monospace' },
  magnitudeValor: { fontSize: 30, fontWeight: '800', color: Cores.preto },
  magnitudeDica: { fontSize: 12, color: Cores.textoFraco },
  alvo: {
    backgroundColor: Cores.branco,
    borderWidth: 2,
    borderColor: Cores.borda,
    borderRadius: 10,
    paddingVertical: Espacos.lg,
    alignItems: 'center',
  },
  alvoAtivo: { backgroundColor: Cores.destaque, borderColor: Cores.destaque },
  alvoTexto: { fontSize: 18, fontWeight: '800', color: Cores.textoFraco },
  alvoTextoAtivo: { color: Cores.branco },
  contador: { fontSize: 13, color: Cores.textoFraco, textAlign: 'center' },
  linhaBotoes: { flexDirection: 'row', gap: Espacos.sm },
  itemIntervalo: { flex: 1, gap: Espacos.xs, alignItems: 'center' },
  hz: { fontSize: 11, color: Cores.textoFraco },
});

import { Gyroscope } from 'expo-sensors';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Aviso } from '@/components/aviso';
import { Botao } from '@/components/botao';
import { Cartao } from '@/components/cartao';
import { TelaDemo } from '@/components/tela-demo';
import { Cores, Espacos } from '@/constants/theme';

type Leitura = { x: number; y: number; z: number };
type Assinatura = ReturnType<typeof Gyroscope.addListener>;

const PARADO: Leitura = { x: 0, y: 0, z: 0 };

export default function TelaGiroscopio() {
  const [leitura, setLeitura] = useState<Leitura>(PARADO);
  const [assinatura, setAssinatura] = useState<Assinatura | null>(null);
  const [pico, setPico] = useState(0);
  const [indisponivel, setIndisponivel] = useState(false);

  const velocidade = Math.sqrt(
    leitura.x * leitura.x + leitura.y * leitura.y + leitura.z * leitura.z,
  );

  // A API é exatamente a mesma do acelerômetro. O que muda é a grandeza medida.
  async function ligar() {
    if (!(await Gyroscope.isAvailableAsync())) {
      setIndisponivel(true);
      return;
    }

    Gyroscope.setUpdateInterval(100);

    const nova = Gyroscope.addListener(({ x, y, z }) => {
      setLeitura({ x, y, z });
      const modulo = Math.sqrt(x * x + y * y + z * z);
      setPico((anterior) => (modulo > anterior ? modulo : anterior));
    });

    setAssinatura(nova);
  }

  function desligar() {
    assinatura?.remove();
    setAssinatura(null);
    setLeitura(PARADO);
  }

  return (
    <TelaDemo
      pacote="expo-sensors · Gyroscope"
      chamada="Mede rotação, em rad/s. O solavanco da freada é o acelerômetro; o rodopio da curva é o giroscópio."
    >
      <Cartao
        titulo="Parado na mesa, este dá zero"
        legenda="Ao contrário do acelerômetro: não há gravidade girando o aparelho. Compare as duas telas com o celular na mesma posição."
      >
        <View style={estilos.eixos}>
          <Eixo nome="x" rotacao="tombar para frente / para trás" valor={leitura.x} />
          <Eixo nome="y" rotacao="tombar para os lados" valor={leitura.y} />
          <Eixo nome="z" rotacao="girar deitado na mesa" valor={leitura.z} />
        </View>
      </Cartao>

      <Cartao titulo="Velocidade angular">
        <View style={estilos.numeros}>
          <View style={estilos.numero}>
            <Text style={estilos.numeroValor}>{velocidade.toFixed(2)}</Text>
            <Text style={estilos.numeroRotulo}>agora (rad/s)</Text>
          </View>
          <View style={estilos.numero}>
            <Text style={estilos.numeroValor}>{pico.toFixed(2)}</Text>
            <Text style={estilos.numeroRotulo}>pico da sessão</Text>
          </View>
          <View style={estilos.numero}>
            <Text style={estilos.numeroValor}>{((velocidade * 180) / Math.PI).toFixed(0)}</Text>
            <Text style={estilos.numeroRotulo}>graus/s</Text>
          </View>
        </View>
        <Botao titulo="Zerar o pico" variante="secundario" onPress={() => setPico(0)} />
      </Cartao>

      {assinatura ? (
        <Botao titulo="Desligar sensor (remove)" variante="perigo" onPress={desligar} />
      ) : (
        <Botao titulo="Ligar sensor (addListener)" onPress={ligar} />
      )}

      {indisponivel && (
        <Aviso tipo="erro">
          Sem giroscópio neste ambiente. O iOS Simulator não tem; o Android Emulator tem sensores
          virtuais nos extended controls.
        </Aviso>
      )}

      <Aviso tipo="info">
        O giroscópio mede velocidade de rotação, não ângulo. Para saber a inclinação de um aparelho
        parado, o sensor certo é o acelerômetro — parado, aquele vetor de 1 g aponta para baixo.
      </Aviso>
    </TelaDemo>
  );
}

function Eixo({ nome, rotacao, valor }: { nome: string; rotacao: string; valor: number }) {
  const proporcao = Math.min(Math.abs(valor) / 5, 1); // a barra vai de -5 a +5 rad/s

  return (
    <View style={estilos.eixo}>
      <View style={estilos.eixoCabecalho}>
        <Text style={estilos.eixoNome}>{nome}</Text>
        <Text style={estilos.eixoRotacao}>{rotacao}</Text>
        <Text style={estilos.eixoValor}>{valor.toFixed(2)}</Text>
      </View>
      <View style={estilos.trilha}>
        <View
          style={[
            estilos.barra,
            { width: `${proporcao * 50}%`, [valor < 0 ? 'right' : 'left']: '50%' },
          ]}
        />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  eixos: { gap: Espacos.md },
  eixo: { gap: Espacos.xs },
  eixoCabecalho: { flexDirection: 'row', alignItems: 'center', gap: Espacos.sm },
  eixoNome: { fontSize: 14, fontWeight: '700', color: Cores.destaque, width: 14 },
  eixoRotacao: { flex: 1, fontSize: 12, color: Cores.textoFraco },
  eixoValor: { fontSize: 13, fontFamily: 'monospace', color: Cores.preto },
  trilha: {
    height: 14,
    backgroundColor: Cores.branco,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Cores.borda,
    overflow: 'hidden',
  },
  barra: { position: 'absolute', top: 0, bottom: 0, backgroundColor: Cores.destaque },
  numeros: { flexDirection: 'row', gap: Espacos.sm },
  numero: {
    flex: 1,
    backgroundColor: Cores.branco,
    borderRadius: 10,
    padding: Espacos.sm,
    alignItems: 'center',
  },
  numeroValor: { fontSize: 22, fontWeight: '800', color: Cores.preto },
  numeroRotulo: { fontSize: 11, color: Cores.textoFraco, textAlign: 'center' },
});

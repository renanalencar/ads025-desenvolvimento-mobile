import * as Location from 'expo-location';
import { useState } from 'react';
import { Linking, Platform, StyleSheet, Text, View } from 'react-native';

import { Aviso } from '@/components/aviso';
import { Botao } from '@/components/botao';
import { Cartao } from '@/components/cartao';
import { TelaDemo } from '@/components/tela-demo';
import { Cores, Espacos } from '@/constants/theme';

type Falha =
  | { tipo: 'permissao-recusada' }
  | { tipo: 'permissao-bloqueada' }
  | { tipo: 'servico-desligado' }
  | { tipo: 'erro'; mensagem: string };

const NIVEIS = [
  { rotulo: 'Low', valor: Location.Accuracy.Low, erro: '~1 km' },
  { rotulo: 'Balanced', valor: Location.Accuracy.Balanced, erro: '~100 m' },
  { rotulo: 'High', valor: Location.Accuracy.High, erro: '~10 m' },
] as const;

export default function TelaGps() {
  const [precisao, setPrecisao] = useState<Location.Accuracy>(Location.Accuracy.Balanced);
  const [posicao, setPosicao] = useState<Location.LocationObject | null>(null);
  const [origem, setOrigem] = useState<'cache' | 'gps' | 'watch' | null>(null);
  const [buscando, setBuscando] = useState(false);
  const [milissegundos, setMilissegundos] = useState<number | null>(null);
  const [endereco, setEndereco] = useState<string | null>(null);
  const [falha, setFalha] = useState<Falha | null>(null);

  // A torneira mora num useState porque ainda não temos useEffect (Aula 6).
  const [assinatura, setAssinatura] = useState<Location.LocationSubscription | null>(null);

  /** Tempo 1: pedir. Devolve true só quando dá para seguir para a leitura. */
  async function garantirAcesso() {
    const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      // Dois problemas diferentes, duas mensagens diferentes, duas saídas diferentes.
      setFalha({ tipo: canAskAgain ? 'permissao-recusada' : 'permissao-bloqueada' });
      return false;
    }

    // Permissão concedida não significa GPS ligado.
    if (!(await Location.hasServicesEnabledAsync())) {
      setFalha({ tipo: 'servico-desligado' });
      return false;
    }

    return true;
  }

  /** Tempo 2, versão copo: um valor e acabou. */
  async function ondeEuEstou() {
    setFalha(null);
    setEndereco(null);
    setBuscando(true);
    const comeco = Date.now();

    try {
      if (!(await garantirAcesso())) return;

      // Resposta instantânea primeiro: algo na tela AGORA.
      const ultima = await Location.getLastKnownPositionAsync({ maxAge: 60_000 });
      if (ultima) {
        setPosicao(ultima);
        setOrigem('cache');
        setMilissegundos(Date.now() - comeco);
      }

      // E depois o dado bom, quando o hardware entregar.
      const atual = await Location.getCurrentPositionAsync({ accuracy: precisao });
      setPosicao(atual);
      setOrigem('gps');
      setMilissegundos(Date.now() - comeco);
    } catch (erro) {
      setFalha({ tipo: 'erro', mensagem: erro instanceof Error ? erro.message : String(erro) });
    } finally {
      setBuscando(false);
    }
  }

  /** Tempo 2, versão torneira: um fluxo que só para quando você fecha. */
  async function abrirTorneira() {
    setFalha(null);
    if (!(await garantirAcesso())) return;

    const nova = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000, // Android-only: no iOS é ignorado em silêncio
        distanceInterval: 10, // vale nos dois — e é o mais econômico
      },
      (atualizacao) => {
        setPosicao(atualizacao);
        setOrigem('watch');
      },
    );

    setAssinatura(nova);
  }

  /** Tempo 3: parar. O que todo mundo esquece. */
  function fecharTorneira() {
    assinatura?.remove();
    setAssinatura(null);
  }

  /** Caro: uma chamada por registro, nunca dentro do watch. */
  async function traduzirEmEndereco() {
    if (!posicao) return;
    const [primeiro] = await Location.reverseGeocodeAsync(posicao.coords);
    setEndereco(
      primeiro
        ? [primeiro.street, primeiro.district, primeiro.city].filter(Boolean).join(', ')
        : 'Sem endereço para essa coordenada.',
    );
  }

  return (
    <TelaDemo
      pacote="expo-location"
      chamada="Não existe const local = pegarLocalizacao(). Existe pedir, esperar e tratar o não."
    >
      <Cartao
        titulo="Accuracy: precisão é uma compra"
        legenda="Você paga em tempo de espera e em bateria. Troque o nível e cronometre a diferença."
      >
        <View style={estilos.linhaBotoes}>
          {NIVEIS.map((nivel) => (
            <View key={nivel.rotulo} style={estilos.itemNivel}>
              <Botao
                titulo={nivel.rotulo}
                variante={precisao === nivel.valor ? 'primario' : 'secundario'}
                onPress={() => setPrecisao(nivel.valor)}
              />
              <Text style={estilos.erroNivel}>{nivel.erro}</Text>
            </View>
          ))}
        </View>
      </Cartao>

      <Cartao titulo="🚰 O copo" legenda="getCurrentPositionAsync: uma leitura e pronto.">
        <Botao
          titulo={buscando ? 'Buscando...' : 'Onde eu estou'}
          onPress={ondeEuEstou}
          desabilitado={buscando}
        />
      </Cartao>

      <Cartao
        titulo="🚰 A torneira"
        legenda="watchPositionAsync: o fluxo continua até você chamar remove()."
      >
        {assinatura ? (
          <Botao titulo="Parar de acompanhar (remove)" variante="perigo" onPress={fecharTorneira} />
        ) : (
          <Botao titulo="Começar a acompanhar" variante="secundario" onPress={abrirTorneira} />
        )}
        {assinatura && <Aviso tipo="alerta">Torneira aberta. Saindo da tela, ela continua.</Aviso>}
      </Cartao>

      {falha && <MensagemDeFalha falha={falha} />}

      {posicao && (
        <Cartao titulo="O que veio dentro de coords">
          <Text style={estilos.coordenada}>
            {posicao.coords.latitude.toFixed(5)}, {posicao.coords.longitude.toFixed(5)}
          </Text>

          <Text style={estilos.raio}>
            accuracy: ±{Math.round(posicao.coords.accuracy ?? 0)} m — raio de incerteza, não nota de
            qualidade
          </Text>

          <View style={estilos.grade}>
            <Campo nome="origem" valor={origem === 'cache' ? 'cache (instantâneo)' : origem ?? '—'} />
            <Campo nome="tempo até aqui" valor={milissegundos ? `${milissegundos} ms` : '—'} />
            <Campo nome="altitude" valor={formatar(posicao.coords.altitude, 'm')} />
            <Campo nome="heading" valor={formatar(posicao.coords.heading, '°')} />
            <Campo nome="speed" valor={formatar(posicao.coords.speed, 'm/s')} />
          </View>

          <Aviso tipo="info">
            heading e speed só fazem sentido em movimento. Parado, o aparelho devolve 0 ou -1.
          </Aviso>

          <Botao titulo="Traduzir em endereço" variante="secundario" onPress={traduzirEmEndereco} />
          {endereco && <Text style={estilos.endereco}>📍 {endereco}</Text>}
        </Cartao>
      )}

      <Aviso tipo="erro">
        timeInterval é Android-only. Você está em {Platform.OS}
        {Platform.OS === 'ios' ? ' — aqui ele compila, não avisa e não faz nada.' : '.'}
      </Aviso>
    </TelaDemo>
  );
}

function MensagemDeFalha({ falha }: { falha: Falha }) {
  if (falha.tipo === 'permissao-recusada') {
    return (
      <Cartao titulo="Sem permissão de localização">
        <Text style={estilos.textoFalha}>
          Você recusou agora. O diálogo ainda pode aparecer: toque em &quot;Onde eu estou&quot; de novo.
        </Text>
      </Cartao>
    );
  }

  if (falha.tipo === 'permissao-bloqueada') {
    return (
      <Cartao titulo="Permissão bloqueada (canAskAgain: false)">
        <Text style={estilos.textoFalha}>
          O sistema não vai mostrar o diálogo de novo. Insistir no mesmo botão não resolve — a única
          saída é explicar e levar às Configurações do app.
        </Text>
        <Botao titulo="Abrir Configurações" onPress={() => Linking.openSettings()} />
      </Cartao>
    );
  }

  if (falha.tipo === 'servico-desligado') {
    return (
      <Cartao titulo="A localização do aparelho está desligada">
        <Text style={estilos.textoFalha}>
          Problema diferente, lugar diferente: isto se resolve nas Configurações do sistema, não nas
          do app. Uma mensagem genérica para os dois casos = desinstalação.
        </Text>
      </Cartao>
    );
  }

  return (
    <Cartao titulo="Falhou">
      <Text style={estilos.textoFalha}>{falha.mensagem}</Text>
    </Cartao>
  );
}

function Campo({ nome, valor }: { nome: string; valor: string }) {
  return (
    <View style={estilos.campo}>
      <Text style={estilos.campoNome}>{nome}</Text>
      <Text style={estilos.campoValor}>{valor}</Text>
    </View>
  );
}

function formatar(valor: number | null, unidade: string) {
  return valor === null ? '—' : `${valor.toFixed(1)} ${unidade}`;
}

const estilos = StyleSheet.create({
  linhaBotoes: { flexDirection: 'row', gap: Espacos.sm },
  itemNivel: { flex: 1, gap: Espacos.xs, alignItems: 'center' },
  erroNivel: { fontSize: 11, color: Cores.textoFraco },
  coordenada: { fontSize: 20, fontWeight: '700', color: Cores.preto, fontFamily: 'monospace' },
  raio: { fontSize: 13, color: Cores.destaque, fontWeight: '600', lineHeight: 18 },
  grade: { gap: Espacos.xs, marginTop: Espacos.xs },
  campo: { flexDirection: 'row', justifyContent: 'space-between' },
  campoNome: { fontSize: 13, color: Cores.textoFraco, fontFamily: 'monospace' },
  campoValor: { fontSize: 13, color: Cores.preto, fontWeight: '600' },
  endereco: { fontSize: 15, color: Cores.preto, fontWeight: '600' },
  textoFalha: { fontSize: 14, color: Cores.preto, lineHeight: 20 },
});

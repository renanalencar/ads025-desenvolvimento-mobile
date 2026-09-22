import { Image, type ImageContentFit } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Aviso } from '@/components/aviso';
import { Botao } from '@/components/botao';
import { Cartao } from '@/components/cartao';
import { TelaDemo } from '@/components/tela-demo';
import { Cores, Espacos } from '@/constants/theme';

/** Blurhash: uma string curta que representa como a imagem PARECE. */
const BLURHASH = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6j[j[j[fQayfQfQfObHayjjayfyfyfEayayj[fQa{';

/** Duas URLs remotas, com dimensões diferentes, para o contentFit ficar visível. */
const RETRATO = 'https://picsum.photos/id/1025/400/800';
const PAISAGEM = 'https://picsum.photos/id/1043/1200/400';

const AJUSTES: { valor: ImageContentFit; explicacao: string }[] = [
  { valor: 'cover', explicacao: 'preenche, cortando — default' },
  { valor: 'contain', explicacao: 'cabe inteira, com sobra' },
  { valor: 'fill', explicacao: 'estica, distorcendo' },
  { valor: 'none', explicacao: 'sem ajuste' },
  { valor: 'scale-down', explicacao: 'o menor entre none e contain' },
];

export default function TelaImagem() {
  const [fonte, setFonte] = useState(RETRATO);
  const [versao, setVersao] = useState(0); // muda a URL para forçar um download novo

  const uri = `${fonte}?v=${versao}`;

  return (
    <TelaDemo
      pacote="expo-image"
      chamada="Os três primeiros pacotes produzem dado. Este mostra. Cache, placeholder, transição e a semântica de recorte do CSS."
    >
      <Aviso tipo="erro">
        expo-image e react-native exportam ambos um Image. Importar o errado não dá erro: dá um bug
        silencioso em que contentFit não faz nada. Quando ele &quot;não funciona&quot;, confira o
        import — é a causa nº 1.
      </Aviso>

      <Cartao titulo="A mesma moldura, cinco contentFit" legenda="A moldura tem sempre 100% × 120.">
        <View style={estilos.linhaBotoes}>
          <Botao
            titulo="Retrato"
            variante={fonte === RETRATO ? 'primario' : 'secundario'}
            onPress={() => setFonte(RETRATO)}
          />
          <Botao
            titulo="Paisagem"
            variante={fonte === PAISAGEM ? 'primario' : 'secundario'}
            onPress={() => setFonte(PAISAGEM)}
          />
        </View>

        {AJUSTES.map((ajuste) => (
          <View key={ajuste.valor} style={estilos.item}>
            <Text style={estilos.itemTitulo}>
              contentFit=&quot;{ajuste.valor}&quot; — {ajuste.explicacao}
            </Text>
            <Image
              source={{ uri }}
              style={estilos.moldura}
              contentFit={ajuste.valor}
              placeholder={{ blurhash: BLURHASH }}
              placeholderContentFit="cover"
              transition={300}
              cachePolicy="memory-disk"
            />
          </View>
        ))}

        <Aviso tipo="alerta">
          resizeMode está deprecado no expo-image. Os valores de contentFit são os do CSS
          object-fit — iguais nas três plataformas.
        </Aviso>
      </Cartao>

      <Cartao
        titulo="placeholder e transition"
        legenda="O problema resolvido é de layout: sem placeholder, a lista pula quando a imagem chega. Toque para baixar uma imagem nova e ver o blurhash primeiro."
      >
        <Botao titulo="Baixar outra imagem" onPress={() => setVersao((v) => v + 1)} />
        <View style={estilos.comparacao}>
          <View style={estilos.metade}>
            <Text style={estilos.itemTitulo}>com placeholder</Text>
            <Image
              source={{ uri: `${fonte}?p=${versao}` }}
              style={estilos.quadrado}
              contentFit="cover"
              placeholder={{ blurhash: BLURHASH }}
              transition={600}
              cachePolicy="none"
            />
          </View>
          <View style={estilos.metade}>
            <Text style={estilos.itemTitulo}>sem placeholder</Text>
            <Image
              source={{ uri: `${fonte}?s=${versao}` }}
              style={estilos.quadrado}
              contentFit="cover"
              cachePolicy="none"
            />
          </View>
        </View>
      </Cartao>

      <Cartao
        titulo="🍳 cachePolicy — a cozinha"
        legenda="Memória é a bancada. Disco é o armário. Rede é o supermercado."
      >
        <Linha chave="'none'" valor="não guarda" />
        <Linha chave="'disk'" valor="default" />
        <Linha chave="'memory'" valor="some ao fechar o app" />
        <Linha chave="'memory-disk'" valor="os dois" />
      </Cartao>

      <Aviso tipo="info">
        Uma logo local com require() não precisa de nada disso — já está no bundle. Troque quando
        houver imagem remota, lista ou espera perceptível. Saber quando não usar uma ferramenta é
        parte de saber usá-la.
      </Aviso>
    </TelaDemo>
  );
}

function Linha({ chave, valor }: { chave: string; valor: string }) {
  return (
    <View style={estilos.linhaTabela}>
      <Text style={estilos.chave}>{chave}</Text>
      <Text style={estilos.valor}>{valor}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  linhaBotoes: { flexDirection: 'row', gap: Espacos.sm },
  item: { gap: Espacos.xs },
  itemTitulo: { fontSize: 12, color: Cores.textoFraco, fontFamily: 'monospace' },
  moldura: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Cores.borda,
    backgroundColor: Cores.branco,
  },
  comparacao: { flexDirection: 'row', gap: Espacos.sm },
  metade: { flex: 1, gap: Espacos.xs },
  quadrado: { width: '100%', height: 110, borderRadius: 8, backgroundColor: Cores.branco },
  linhaTabela: { flexDirection: 'row', justifyContent: 'space-between' },
  chave: { fontSize: 13, fontFamily: 'monospace', color: Cores.destaque },
  valor: { fontSize: 13, color: Cores.preto },
});

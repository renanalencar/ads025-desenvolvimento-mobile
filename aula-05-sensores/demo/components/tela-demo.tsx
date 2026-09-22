import { type PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Cores, Espacos } from '@/constants/theme';

export type TelaDemoProps = PropsWithChildren<{
  chamada: string;
  pacote: string;
}>;

/** Moldura comum das telas de demonstração: rola, respira e mostra qual pacote está em jogo. */
export function TelaDemo({ chamada, pacote, children }: TelaDemoProps) {
  return (
    <ScrollView style={estilos.tela} contentContainerStyle={estilos.conteudo}>
      <View style={estilos.cabecalho}>
        <Text style={estilos.pacote}>{pacote}</Text>
        <Text style={estilos.chamada}>{chamada}</Text>
      </View>
      {children}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: Cores.fundo },
  conteudo: { padding: Espacos.md, gap: Espacos.md, paddingBottom: Espacos.lg * 2 },
  cabecalho: { gap: Espacos.xs },
  pacote: {
    fontSize: 12,
    fontWeight: '700',
    color: Cores.destaque,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  chamada: { fontSize: 15, color: Cores.preto, lineHeight: 22 },
});

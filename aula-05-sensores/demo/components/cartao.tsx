import { type PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Cores, Espacos } from '@/constants/theme';

export type CartaoProps = PropsWithChildren<{
  titulo?: string;
  legenda?: string;
}>;

export function Cartao({ titulo, legenda, children }: CartaoProps) {
  return (
    <View style={estilos.cartao}>
      {titulo && <Text style={estilos.titulo}>{titulo}</Text>}
      {legenda && <Text style={estilos.legenda}>{legenda}</Text>}
      {children}
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    backgroundColor: Cores.fundoBloco,
    borderColor: Cores.borda,
    borderWidth: 1,
    borderRadius: 12,
    padding: Espacos.md,
    gap: Espacos.sm,
  },
  titulo: { fontSize: 16, fontWeight: '700', color: Cores.preto },
  legenda: { fontSize: 13, color: Cores.textoFraco, lineHeight: 18 },
});

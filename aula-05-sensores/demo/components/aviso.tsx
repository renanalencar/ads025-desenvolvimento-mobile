import { type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Cores, Espacos } from '@/constants/theme';

export type AvisoProps = {
  tipo: 'erro' | 'alerta' | 'ok' | 'info';
  children: ReactNode;
};

const ICONES = {
  erro: '🔴',
  alerta: '⚠️',
  ok: '✅',
  info: '🧩',
} as const;

const CORES_BORDA = {
  erro: Cores.alerta,
  alerta: Cores.amarelo,
  ok: Cores.ok,
  info: Cores.textoFraco,
} as const;

export function Aviso({ tipo, children }: AvisoProps) {
  return (
    <View style={[estilos.aviso, { borderLeftColor: CORES_BORDA[tipo] }]}>
      <Text style={estilos.texto}>
        {ICONES[tipo]} {children}
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  aviso: {
    backgroundColor: Cores.branco,
    borderLeftWidth: 4,
    borderRadius: 8,
    padding: Espacos.sm + 2,
  },
  texto: { fontSize: 13, color: Cores.preto, lineHeight: 19 },
});

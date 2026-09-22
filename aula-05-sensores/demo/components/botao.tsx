import { Pressable, StyleSheet, Text } from 'react-native';

import { Cores, Espacos } from '@/constants/theme';

export type BotaoProps = {
  titulo: string;
  onPress: () => void;
  variante?: 'primario' | 'secundario' | 'perigo';
  desabilitado?: boolean;
};

export function Botao({ titulo, onPress, variante = 'primario', desabilitado = false }: BotaoProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={desabilitado}
      style={({ pressed }) => [
        estilos.base,
        estilos[variante],
        pressed && estilos.pressionado,
        desabilitado && estilos.desabilitado,
      ]}
    >
      <Text style={[estilos.texto, variante === 'secundario' && estilos.textoSecundario]}>
        {titulo}
      </Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: Espacos.md,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
  },
  primario: { backgroundColor: Cores.destaque, borderColor: Cores.destaque },
  secundario: { backgroundColor: 'transparent', borderColor: Cores.destaque },
  perigo: { backgroundColor: Cores.alerta, borderColor: Cores.alerta },
  pressionado: { opacity: 0.7 },
  desabilitado: { opacity: 0.4 },
  texto: { color: Cores.branco, fontWeight: '700', fontSize: 15 },
  textoSecundario: { color: Cores.destaque },
});

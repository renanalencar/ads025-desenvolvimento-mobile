import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Cores } from '@/constants/theme';

export default function LayoutRaiz() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Cores.fundo },
          headerTintColor: Cores.preto,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: Cores.fundo },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Aula 5 — Sensores' }} />
        <Stack.Screen name="gps" options={{ title: '1. GPS' }} />
        <Stack.Screen name="acelerometro" options={{ title: '2. Acelerômetro' }} />
        <Stack.Screen name="giroscopio" options={{ title: '3. Giroscópio' }} />
        <Stack.Screen name="camera" options={{ title: '4. Câmera' }} />
        <Stack.Screen name="imagem" options={{ title: '5. expo-image' }} />
        <Stack.Screen name="registro" options={{ title: '6. Juntando tudo' }} />
        <Stack.Screen name="armadilhas" options={{ title: '7. Armadilhas' }} />
      </Stack>
    </>
  );
}

# Exercícios e atividades — Aula 7 (Rastreador de Hábitos)

> ⚠️ **Escopo permissível nestes exercícios:** tudo que foi ensinado em Aula 7.
> **Fora do escopo:** composição complexa de navegadores (Drawer + Stack + Tabs), push remoto via Firebase/backend, persistência de estado com Context/Redux, deeplinks avançados.

---
## Parte 1 - Exercícios Guiados

### Exercício 1 — Rota dinâmica: abrir detalhe do hábito

**Nível:** ⭐

Você tem uma lista de hábitos. Ao tocar em um, deve abrir uma tela de detalhe.

### Tarefa

Crie o arquivo `src/app/habit/[id].tsx` que:

1. Lê o parâmetro `id` com `useLocalSearchParams<{ id: string }>()`
2. Mostra `<Text>Hábito ID: {id}</Text>` (simulação de detalhe)
3. Quando voltar (botão de voltar automático), a lista de hábitos é trazida de volta pela pilha

### Código de partida (tela de detalhe)

```tsx
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function HabitDetail() {
  // 1. Ler parâmetro 'id'
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text>Detalhes do hábito</Text>
      {/* 2. Mostrar ID */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
```

### Na tela inicial, navegar para detalhe

```tsx
import { useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';

<Pressable onPress={() => 
  router.push({
    pathname: '/habit/[id]',
    params: { id: '5' }
  })
}>
  <Text>Abrir hábito 5</Text>
</Pressable>
```

---

### Exercício 2 — Tabs: telas com abas

**Nível:** ⭐⭐

Crie uma estrutura de abas com Home e Estatísticas.

### Tarefa

1. Crie a pasta `src/app/(tabs)/`
2. Dentro dela, crie `_layout.tsx` com `<Tabs>` configurado com 2 abas:
   - **Home** (`index.tsx`): ícone de casa
   - **Stats** (`stats.tsx`): ícone de gráfico
3. Use `@expo/vector-icons/Feather` para ícones
4. Defina `tabBarActiveTintColor: '#007AFF'`

### Código de partida

```tsx
// src/app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
// import { Feather } from '@expo/vector-icons'; // Descomente

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ /* ... */ }}>
      {/* Aba 1: Home */}
      {/* Aba 2: Stats */}
    </Tabs>
  );
}
```


---

### Exercício 3 — Drawer: menu lateral

**Nível:** ⭐⭐

Crie um Drawer com menu:

### Tarefa

1. **Instale as dependências** (fora do exercício, mas necessário):
   ```bash
   npx expo install react-native-reanimated react-native-worklets react-native-gesture-handler
   ```
2. Atualize `src/app/_layout.tsx` para usar `<Drawer>` em vez de `<Stack>`
3. Configure 3 itens no drawer:
   - **Tabs** (refere a `(tabs)`)
   - **Sobre** (`about.tsx`)
   - **Configurações** (`settings.tsx`)
4. Use ícones `MaterialIcons`

### Código de partida

```tsx
// src/app/_layout.tsx
// import { Drawer } from 'expo-router/drawer';

export default function RootLayout() {
  return (
    <Drawer>
      {/* 3 itens aqui */}
    </Drawer>
  );
}
```

---

### Exercício 4 — Notificações: agendar e receber

**Nível:** ⭐⭐⭐

Implemente o fluxo de notificação local:

### Tarefa

1. Pedir permissão com `requestPermissionsAsync()`
2. Configurar `setNotificationHandler()` para mostrar em foreground
3. Agendar uma notificação de teste que sai em 5 segundos
4. Registrar listeners para quando notificação chega e quando é tocada
5. Na console, imprimir `"Notificação recebida"` e `"Notificação tocada"`

### Código de partida

```tsx
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

// Configurar handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
  }),
});

export default function NotificationScreen() {
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    // 1. Pedir permissão
    async function requestPermission() {
      const { status } = await Notifications.requestPermissionsAsync();
      setPermissionGranted(status === 'granted');
    }

    requestPermission();

    // 2. Registrar listeners
    // ...
  }, []);

  const handleSchedule = async () => {
    if (!permissionGranted) {
      console.log('Permissão não concedida');
      return;
    }

    // 3. Agendar notificação
    // ...
  };

  return (
    <View>
      <Pressable onPress={handleSchedule}>
        <Text>Agendar notificação em 5s</Text>
      </Pressable>
    </View>
  );
}
```

---

## Parte 2 - Atividade aplicada
### App com Drawer, Tabs, Rotas dinâmicas e Notificações

**Nível:** ⭐⭐⭐

Integre tudo que foi aprendido num único app funcional:

### Requisitos

1. **Drawer** com menu:
   - Home (Tabs)
   - Sobre
   - Configurações

2. **Tabs** (dentro de Home):
   - Home (`index.tsx`) — lista de hábitos
   - Estatísticas (`stats.tsx`) — placeholder

3. **Rota dinâmica**:
   - `habit/[id].tsx` — detalhe do hábito (navegue da lista tocando um item)

4. **Notificações**:
   - Botão para agendar notificação de lembrete
   - Quando toca, abre o detalhe do hábito
   - Listener imprime na console

5. **Estrutura de pastas**:
   ```
   src/app/
     _layout.tsx (Drawer)
     (tabs)/
       _layout.tsx (Tabs)
       index.tsx (Home)
       stats.tsx (Estatísticas)
     habit/
       [id].tsx (Detalhe)
     about.tsx
     settings.tsx
   ```

### Checklist de entrega

- [ ] App abre na tela Home com Drawer visível
- [ ] Drawer tem 3 itens com ícones
- [ ] Home tem 2 abas (Home e Stats)
- [ ] Na aba Home, toque em um hábito abre `/habit/5` (detalhe)
- [ ] Voltar retorna à lista
- [ ] Botão "Agendar" agenda notificação para daqui a 5 segundos
- [ ] Notificação aparece na tela (Foreground)
- [ ] No console, `"Notificação recebida"` é impresso
- [ ] Tocar notificação abre o detalhe do hábito

### Dicas

- Teste no emulador/simulador. Notificação local funciona em ambos.
- Se estiver usando EAS build ou SDK recente, notificação em foreground aparece automaticamente.
- Lembre-se: parâmetro entra via `{ id: string }`, não na URL.

---

## Critério de avaliação

| Critério | 0-2 | 3-4 | 5 |
|---|---|---|---|
| Rotas dinâmicas | Não funciona | Funciona mas parâmetro errado | ✅ Correto |
| Tabs | Não implementadas | 1 aba só | ✅ 2 abas |
| Drawer | Não instalado/não funciona | Instalado mas não funciona bem | ✅ Funciona e desliza |
| Notificações | Sem permissão nem listeners | Permissão, sem notificação | ✅ Completo |
| Navegação integrada | Quebra ao clicar | Navega mas state confuso | ✅ Fluxo limpo |

---

## Para saber mais

- [Rotas Dinâmicas — Expo Docs](https://docs.expo.dev/router/reference/url-parameters/)
- [Tabs — Expo Router](https://docs.expo.dev/router/advanced/tabs/)
- [Drawer — Expo Router](https://docs.expo.dev/router/advanced/drawer/)
- [Notifications — Expo SDK](https://docs.expo.dev/versions/latest/sdk/notifications/)

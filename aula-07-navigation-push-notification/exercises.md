# Exercícios e atividades — Aula 7 (Rastreador de Hábitos)

> ⚠️ **Escopo permissível nestes exercícios:** tudo que foi ensinado em Aula 7.
> **Fora do escopo:** composição complexa de navegadores (Drawer + Stack + Tabs), push remoto via Firebase/backend, persistência de estado com Context/Redux, deeplinks avançados.

---

## Exercício 1 — Rota dinâmica: abrir detalhe do hábito

**Tempo:** 5 min | **Nível:** ⭐

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

### ✅ Gabarito

<details>
<summary>Clique para ver a solução completa</summary>

```tsx
// src/app/habit/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function HabitDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do hábito</Text>
      <Text style={styles.id}>ID: {id}</Text>
      <Text style={styles.note}>Toque o botão de voltar para retornar à lista</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  id: { fontSize: 16, color: '#666', marginBottom: 16 },
  note: { fontSize: 14, color: '#999', textAlign: 'center' },
});
```

</details>

---

## Exercício 2 — Tabs: telas com abas

**Tempo:** 7 min | **Nível:** ⭐⭐

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

### ✅ Gabarito

<details>
<summary>Clique para ver a solução completa</summary>

```tsx
// src/app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Estatísticas',
          tabBarIcon: ({ color }) => <Feather name="bar-chart-2" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
```

```tsx
// src/app/(tabs)/index.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function HomeTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Hábitos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold' },
});
```

```tsx
// src/app/(tabs)/stats.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function StatsTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estatísticas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold' },
});
```

</details>

---

## Exercício 3 — Drawer: menu lateral

**Tempo:** 6 min | **Nível:** ⭐⭐

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

### ✅ Gabarito

<details>
<summary>Clique para ver a solução completa</summary>

```tsx
// src/app/_layout.tsx
import { Drawer } from 'expo-router/drawer';
import { MaterialIcons } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: '#007AFF',
        drawerInactiveTintColor: '#666',
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          drawerLabel: 'Sobre',
          drawerIcon: ({ color }) => <MaterialIcons name="info" size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Configurações',
          drawerIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} />,
        }}
      />
    </Drawer>
  );
}
```

```tsx
// src/app/about.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre este app</Text>
      <Text style={styles.text}>Versão 1.0 — Aula 7</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  text: { fontSize: 14, color: '#666' },
});
```

```tsx
// src/app/settings.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold' },
});
```

</details>

---

## Exercício 4 — Notificações: agendar e receber

**Tempo:** 8 min | **Nível:** ⭐⭐⭐

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

### ✅ Gabarito

<details>
<summary>Clique para ver a solução completa</summary>

```tsx
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
  }),
});

export default function NotificationScreen() {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [lastNotification, setLastNotification] = useState<string>('Nenhuma notificação recebida');

  useEffect(() => {
    async function requestPermission() {
      const { status } = await Notifications.requestPermissionsAsync();
      setPermissionGranted(status === 'granted');
    }

    requestPermission();

    // Listener: notificação recebida
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('Notificação recebida:', notification);
        setLastNotification('Notificação recebida: ' + notification.request.content.title);
      }
    );

    // Listener: notificação tocada
    const responseListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('Notificação tocada:', response);
        setLastNotification('Notificação tocada: ' + response.notification.request.content.title);
      }
    );

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  const handleSchedule = async () => {
    if (!permissionGranted) {
      console.log('Permissão não concedida');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Lembrete de hábito!',
        body: 'Hora de fazer seu hábito diário.',
        data: { habitId: '5' },
      },
      trigger: { seconds: 5 },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>
      <Pressable style={styles.button} onPress={handleSchedule}>
        <Text style={styles.buttonText}>Agendar notificação em 5s</Text>
      </Pressable>
      <Text style={styles.status}>{lastNotification}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  button: { backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, marginBottom: 16 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  status: { fontSize: 14, color: '#666', textAlign: 'center' },
});
```

</details>

---

## Atividade aplicada — App com Drawer, Tabs, Rotas dinâmicas e Notificações

**Tempo:** 30 min | **Nível:** ⭐⭐⭐

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

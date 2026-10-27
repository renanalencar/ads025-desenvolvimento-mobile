# Exercícios e atividades — Aula 8 (Rastreador de Hábitos)

> ⚠️ **Escopo permissível nestes exercícios:** tudo que foi ensinado até a Aula 8 (`useState`, `useEffect`, `useContext`, `zustand`, persistência local com `AsyncStorage`, middleware `persist` do Zustand e `expo-sqlite`, Expo Router).
> **Fora do escopo:** chamadas HTTP para backend, sincronização em nuvem, autenticação com servidor remoto.

---

## Exercício 1 — `useState`: lista imutável e atualização funcional

**Nível:** ⭐

Você tem uma tela rápida para testar a adição e conclusão de micro-hábitos usando estado local antes de migrar para estado global.

### Tarefa

Complete o componente `QuickHabitsScreen` para que:

1. `handleAdd` adicione um novo hábito ao array `habits` de forma **imutável** (usando spread `...prev`), ignorando se `text` estiver vazio.
2. `handleToggle` inverta o booleano `done` do hábito clicado usando `.map()` e incremente `totalClicks` com **atualização funcional** (`prev => prev + 1`).
3. `handleRemove` remova o hábito clicado usando `.filter()`.

### Código de partida

```tsx
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type HabitItem = {
  id: string;
  title: string;
  done: boolean;
};

export default function QuickHabitsScreen() {
  const [text, setText] = useState('');
  const [totalClicks, setTotalClicks] = useState(0);
  const [habits, setHabits] = useState<HabitItem[]>([
    { id: '1', title: 'Beber água', done: false },
    { id: '2', title: 'Caminhar 20 min', done: true },
  ]);

  const handleAdd = () => {
    if (!text.trim()) return;
    // 1. Adicionar novo hábito de forma imutável e limpar 'text'
  };

  const handleToggle = (id: string) => {
    // 2. Inverter 'done' com .map() e somar +1 em 'totalClicks' com prev => prev + 1
  };

  const handleRemove = (id: string) => {
    // 3. Remover hábito com .filter()
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>Interações hoje: {totalClicks}</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Novo hábito..."
        />
        <Pressable style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>+</Text>
        </Pressable>
      </View>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Pressable style={styles.cardTitle} onPress={() => handleToggle(item.id)}>
              <Text style={styles.titleText}>
                {item.done ? '✅' : '⬜'} {item.title}
              </Text>
            </Pressable>
            <Pressable onPress={() => handleRemove(item.id)}>
              <Text style={styles.deleteText}>Excluir</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  counter: { fontSize: 14, color: '#666', marginBottom: 12 },
  row: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12 },
  addBtn: { backgroundColor: '#FF6002', paddingHorizontal: 18, justifyContent: 'center', borderRadius: 8 },
  addBtnText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  card: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  cardTitle: { flex: 1 },
  titleText: { fontSize: 16 },
  deleteText: { color: '#c62828', fontWeight: 'bold' },
});
```

---

## Exercício 2 — `useEffect`: cronômetro de foco com cleanup

**Nível:** ⭐⭐

Dentro da tela de um hábito, o usuário pode iniciar um **cronômetro de foco** (ex: ler por alguns minutos). O cronômetro deve pausar/continuar ao tocar no botão e **limpar o intervalo** se o usuário sair da tela.

### Tarefa

1. No `useEffect`, verifique se `isRunning` é `true`. Se não for, não crie o intervalo.
2. Quando `isRunning` for `true`, crie um `setInterval` de `1000` ms que incremente `seconds` usando `prev => prev + 1`.
3. Retorne a função de **cleanup** (`() => clearInterval(intervalId)`) para evitar vazamento de memória quando `isRunning` mudar ou a tela desmontar.
4. Configure o array de dependências corretamente com `[isRunning]`.

### Código de partida

```tsx
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function FocusTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // 1. Se não estiver rodando, sair cedo
    // 2. Criar setInterval de 1000ms incrementando 'seconds'
    // 3. Retornar função de cleanup com clearInterval
  }, [/* 4. Dependências */]);

  return (
    <View style={styles.box}>
      <Text style={styles.timer}>{seconds}s</Text>
      <View style={styles.actions}>
        <Pressable
          style={styles.button}
          onPress={() => setIsRunning((prev) => !prev)}
        >
          <Text style={styles.buttonText}>{isRunning ? 'Pausar' : 'Iniciar Foco'}</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.resetButton]}
          onPress={() => {
            setIsRunning(false);
            setSeconds(0);
          }}
        >
          <Text style={styles.buttonText}>Zerar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { padding: 20, alignItems: 'center', borderRadius: 12, backgroundColor: '#F3E9DC' },
  timer: { fontSize: 36, fontWeight: 'bold', marginBottom: 16 },
  actions: { flexDirection: 'row', gap: 12 },
  button: { backgroundColor: '#FF6002', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  resetButton: { backgroundColor: '#555' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
```

---

## Exercício 3 — `useContext`: Tema Claro/Escuro em todo o app

**Nível:** ⭐⭐

Crie um `ThemeContext` para fornecer modo claro/escuro a todas as telas sem precisar passar `props` manualmente.

### Tarefa

1. Crie `src/context/theme-context.tsx` com:
   - `ThemeContext` criado via `createContext`
   - `ThemeProvider` gerenciando `isDark` (`useState(false)`) e `toggleTheme`
   - Hook `useTheme()` que retorna `{ isDark, toggleTheme }` e lança erro se usado fora do Provider
2. Na tela `src/app/settings.tsx`, consuma `useTheme()` para exibir um `<Switch>` que alterna o tema e muda a cor de fundo da tela.

### Código de partida

```tsx
// src/context/theme-context.tsx
import { createContext, useContext, useState, type PropsWithChildren } from 'react';

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

// 1. Criar ThemeContext

export function ThemeProvider({ children }: PropsWithChildren) {
  // 2. Estado isDark e função toggleTheme
  // 3. Retornar ThemeContext.Provider
}

export function useTheme() {
  // 4. Ler contexto e validar se existe
}
```

---

## Exercício 4 — `zustand`: Store global de hábitos com seletores

**Nível:** ⭐⭐⭐

Agora vamos substituir o estado local isolado por uma store global usando `zustand`, permitindo que a aba Home, a aba Estatísticas e a tela de Detalhe compartilhem os mesmos hábitos.

### Tarefa

1. Instale o pacote: `npm install zustand`
2. Crie `src/store/use-habit-store.ts` com `create<HabitStore>`:
   - Estado inicial `habits` com 2 hábitos
   - Ação `addHabit(title: string)`
   - Ação `toggleHabit(id: string)`
   - Ação `removeHabit(id: string)`
3. Crie o componente `StatsScreen` (`src/app/(tabs)/stats.tsx`) consumindo `habits` via seletor `useHabitStore((state) => state.habits)` e mostrando o total de hábitos, quantos foram concluídos e a porcentagem de conclusão.

### Código de partida

```tsx
// src/store/use-habit-store.ts
import { create } from 'zustand';

export type Habit = {
  id: string;
  title: string;
  done: boolean;
};

type HabitStore = {
  habits: Habit[];
  addHabit: (title: string) => void;
  toggleHabit: (id: string) => void;
  removeHabit: (id: string) => void;
};

export const useHabitStore = create<HabitStore>((set) => ({
  habits: [
    { id: '1', title: 'Beber 2L de água', done: false },
    { id: '2', title: 'Ler 15 páginas', done: true },
  ],
  addHabit: (title) => {
    // Implementar com set((state) => ({ ... }))
  },
  toggleHabit: (id) => {
    // Implementar com set((state) => ({ ... }))
  },
  removeHabit: (id) => {
    // Implementar com set((state) => ({ ... }))
  },
}));
```

---

## Exercício 5 — Persistência local em disco: Zustand `persist` (`AsyncStorage`) e `expo-sqlite`

**Nível:** ⭐⭐⭐

Quando fechamos o app, a memória RAM é apagada. Vamos persistir a store de hábitos no disco com `AsyncStorage` + middleware `persist` do Zustand e criar um serviço SQL com `expo-sqlite` para registrar o histórico de sessões de foco.

### Tarefa

1. Instale as bibliotecas de armazenamento local:
   ```bash
   npx expo install @react-native-async-storage/async-storage expo-sqlite
   ```
2. Atualize `src/store/use-habit-store.ts` envolvendo a store com `persist(...)` e `createJSONStorage(() => AsyncStorage)` usando a chave `'@habits:store'`.
3. Complete `src/services/focus-db.ts` usando `expo-sqlite` para criar a tabela `focus_logs`, inserir uma sessão concluída (`runAsync`) e listar o histórico (`getAllAsync`).

### Código de partida

```tsx
// Parte A — src/store/use-habit-store.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Habit = {
  id: string;
  title: string;
  done: boolean;
};

type HabitStore = {
  habits: Habit[];
  addHabit: (title: string) => void;
  toggleHabit: (id: string) => void;
  removeHabit: (id: string) => void;
};

// 1. Envolver com create<HabitStore>()(persist(..., { name: '@habits:store', storage: ... }))
export const useHabitStore = create<HabitStore>()(
  // Configure o persist aqui
);
```

```tsx
// Parte B — src/services/focus-db.ts
import * as SQLite from 'expo-sqlite';

export type FocusLog = {
  id: number;
  habitId: string;
  seconds: number;
};

export async function openFocusDb() {
  const db = await SQLite.openDatabaseAsync('habits.db');
  // 2. Criar tabela focus_logs (id, habitId, seconds) com db.execAsync
  return db;
}

export async function saveFocusSession(habitId: string, seconds: number) {
  const db = await openFocusDb();
  // 3. Inserir registro com db.runAsync e placeholders (?, ?)
}

export async function listFocusSessions(): Promise<FocusLog[]> {
  const db = await openFocusDb();
  // 4. Buscar todos os registros com db.getAllAsync<FocusLog>
  return [];
}
```

---

## Atividade aplicada — Rastreador de Hábitos Sincronizado e Persistido (Hooks + Zustand + Disco)

**Nível:** ⭐⭐⭐

Conecte as telas que criamos na Aula 7 para que todas compartilhem estado real e persistam os dados no disco usando `useState`, `useEffect`, `useContext`, `zustand` e `AsyncStorage` / `expo-sqlite`.

### Requisitos

1. **Tema Global Persistido (`useContext` + `AsyncStorage`)**:
   - `src/context/theme-context.tsx` com `<ThemeProvider>` envolvendo o layout raiz (`src/app/_layout.tsx`).
   - Carrega a preferência de tema com `AsyncStorage.getItem` no `useEffect(..., [])` e salva com `AsyncStorage.setItem` ao alternar.

2. **Store Global Persistida de Hábitos (`zustand` + `persist` + `AsyncStorage`)**:
   - `src/store/use-habit-store.ts` guardando a lista de hábitos (`id`, `title`, `done`) e as ações `addHabit`, `toggleHabit` e `removeHabit`, persistida no disco com `persist` + `createJSONStorage(() => AsyncStorage)`.

3. **Aba Home (`src/app/(tabs)/index.tsx`)**:
   - `useState` local apenas para controlar o texto do `<TextInput>` de novo hábito.
   - Lista os hábitos vindos do `useHabitStore`.
   - Tocar no checkbox conclui/desmarca o hábito; tocar no título navega para `/habit/[id]`.

4. **Aba Estatísticas (`src/app/(tabs)/stats.tsx`)**:
   - Lê `habits` do `useHabitStore` e mostra total, concluídos e pendentes em tempo real.

5. **Tela de Detalhe (`src/app/habit/[id].tsx`)**:
   - Lê o `id` com `useLocalSearchParams<{ id: string }>()`.
   - Busca o hábito correspondente no `useHabitStore`.
   - Permite alternar o status (`toggleHabit`) ou excluir o hábito (`removeHabit` + `router.back()`).
   - Inclui um **cronômetro de foco** com `useEffect` + `setInterval` e limpeza automática ao desmontar (opcionalmente salvando a sessão no `expo-sqlite`).

6. **Estrutura de arquivos esperada**:
   ```
   src/
     app/
       _layout.tsx          (ThemeProvider + Stack)
       (tabs)/
         _layout.tsx        (Tabs: Home e Stats)
         index.tsx          (Lista + Input com useState + useHabitStore)
         stats.tsx          (Contadores + Switch do useTheme)
       habit/
         [id].tsx           (Detalhe + Cronômetro com useEffect + useHabitStore)
     context/
       theme-context.tsx    (createContext + ThemeProvider + AsyncStorage)
     store/
       use-habit-store.ts   (create + persist do Zustand com AsyncStorage)
   ```

### Checklist de entrega

- [ ] Adicionar um hábito na aba Home faz o contador da aba Estatísticas subir imediatamente
- [ ] Marcar um hábito como concluído na tela `/habit/[id]` e voltar atualiza o ícone na aba Home
- [ ] Excluir um hábito na tela `/habit/[id]` remove o item da lista e volta para a tela anterior (`router.back()`)
- [ ] Fechar e reabrir o aplicativo mantém os hábitos cadastrados e os status de conclusão salvos no disco
- [ ] O cronômetro de foco na tela de detalhe inicia, pausa e limpa o `setInterval` no `return` do `useEffect`
- [ ] Alternar o tema escuro (`useTheme`) muda as cores de fundo e texto nas telas
- [ ] Nenhum estado de lista é mutado com `.push()` ou `.splice()`

### Dicas

- Declare todos os hooks (`useLocalSearchParams`, `useRouter`, `useTheme`, `useHabitStore`, `useState`, `useEffect`) **antes** do `if (!habit) return ...` na tela de detalhe para não violar as Regras dos Hooks!
- Lembre-se dos parênteses duplos no TypeScript ao usar middleware no Zustand: `create<HabitStore>()(persist(...))`.
- Use seletores no Zustand: `const habit = useHabitStore((s) => s.habits.find((h) => h.id === id))`.

---

## Critério de avaliação

| Critério | 0-2 | 3-4 | 5 |
|---|---|---|---|
| `useState` e imutabilidade | Mutação direta ou tela não atualiza | Funciona, mas sem atualização funcional onde necessário | ✅ Código limpo e imutável |
| `useEffect` e cleanup | Sem `useEffect` ou timer vaza memória | Timer funciona mas sem função de limpeza no `return` | ✅ Efeito e cleanup corretos |
| `useContext` (Tema) | Contexto não criado ou sem Provider | Criado, mas aplicado em uma única tela | ✅ Provider no `_layout` + custom hook `useTheme` |
| `zustand` (Store global) | Telas ainda usam `useState` isolado | Store criada, mas sem seletores ou falta ação | ✅ Store tipada, seletores e ações completas |
| Persistência em disco | Estado some ao recarregar o app | Salva parcialmente ou sem `createJSONStorage` | ✅ `persist` + `AsyncStorage` (e/ou `expo-sqlite`) funcionando |

---

## Para saber mais

- [React Docs — Regras dos Hooks](https://pt-br.react.dev/reference/rules/rules-of-hooks)
- [React Docs — Atualizando Arrays no Estado](https://pt-br.react.dev/learn/updating-arrays-in-state)
- [Zustand — Guia de TypeScript](https://zustand.docs.pmnd.rs/guides/typescript)
- [Zustand — Persist Middleware](https://zustand.docs.pmnd.rs/integrations/persisting-store-data)
- [Expo Docs — AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/)
- [Expo Docs — SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)

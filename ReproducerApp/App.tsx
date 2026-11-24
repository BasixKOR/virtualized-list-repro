/**
 * Reproducer: FlatList keeps firing onContentSizeChange forever after its
 * width changes while scrolled deep. See ../README.md.
 *
 * @format
 */

import { FlatList, StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

const WORDS =
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'.split(
    ' ',
  );

const DATA = Array.from({ length: 2000 }, (_, i) => ({
  id: String(i),
  // Row height depends on list width: an aspect-ratio box plus wrapped text.
  ratio: [16 / 9, 4 / 3, 2, 3 / 1][i % 4],
  text: Array.from(
    { length: 8 + ((i * 37) % 60) },
    (_, j) => WORDS[(i + j) % WORDS.length],
  ).join(' '),
}));

let sizeChanges = 0;

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>600dp ListHeaderComponent</Text>
    </View>
  );
}

function Row({ item }: { item: (typeof DATA)[number] }) {
  return (
    <View style={styles.row}>
      <View style={[styles.box, { aspectRatio: item.ratio }]}>
        <Text>#{item.id}</Text>
      </View>
      <Text>{item.text}</Text>
    </View>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          ListHeaderComponent={Header}
          renderItem={({ item }) => <Row item={item} />}
          onLayout={e =>
            console.log(
              `VLREPRO layout width=${e.nativeEvent.layout.width.toFixed(0)}`,
            )
          }
          onContentSizeChange={(w, h) => {
            sizeChanges++;
            console.log(
              `VLREPRO contentSize #${sizeChanges} w=${w.toFixed(
                0,
              )} h=${h.toFixed(1)}`,
            );
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: 'white' },
  header: {
    height: 600,
    backgroundColor: '#88c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: { fontSize: 24, color: 'white' },
  row: { padding: 8, borderBottomWidth: 1, borderColor: '#ccc' },
  box: { backgroundColor: '#ddd', marginBottom: 4 },
});

export default App;

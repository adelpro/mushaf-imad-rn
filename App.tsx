import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MushafScreen } from './src/screens/MushafScreen';
import { registerRootComponent } from 'expo';

export default function App() {
  return (
    <View style={styles.container}>
      <MushafScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

registerRootComponent(App);

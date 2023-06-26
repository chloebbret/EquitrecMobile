import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Accueil from "./component/Accueil.js";
import Menu from "./component/Menu.js";

export default function App() {
  return (
    <View style={styles.container}>
      <Accueil></Accueil>
      <Menu></Menu>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

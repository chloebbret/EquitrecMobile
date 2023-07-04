import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Accueil from "./component/Accueil.js";
import Menu from "./component/Menu.js";
import InfosCompet from "./component/InfosCompet.js";

export default function App() {
  return (
      <View style={styles.container}>
        {/*<Accueil></Accueil>*/}
        {/*  <InfosCompet></InfosCompet>*/}
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

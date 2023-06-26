import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Accueil() {
  return (
    <View style={styles.page}>
      <Text style={styles.texte}>Bienvenue sur le site d'Equitrec !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  texte: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'blue',
    marginTop: 100
  },
  page: {

  }
});

import {Button, StyleSheet, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();

const Obstacles = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.content}>
      <View style={styles.bouton}>
         <Button
         title={"Barrières"}
         color={"#fff"}
         onPress={() => navigation.navigate('Barriere')}
         />
      </View>

      <View style={styles.bouton}>
         <Button
         title={"Haie Vive"}
         color={"#fff"}
         onPress={() => navigation.navigate('Haie')}
         />
      </View>

      <View style={styles.bouton}>
        <Button
          title={"Montoir"}
          color={"#fff"}
          onPress={() => navigation.navigate('Montoir')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bouton: {
    width: 250,
    height: 40,
    backgroundColor: "powderblue",
    borderRadius: 10,
    marginBottom: 10,
  },

  content: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 280
  }
});
export default Obstacles;
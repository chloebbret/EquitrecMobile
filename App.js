import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {NavigationContainer} from "@react-navigation/native";
import Accueil from "./components/views/Accueil";
import Obstacles from "./components/views/Obstacles";
import Barriere from "./components/views/Barriere";
import Haie from "./components/views/Haie";
import Montoir from "./components/views/Montoir";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Accueil" component={Accueil} />
        <Drawer.Screen name="Obstacles" component={Obstacles} />
        <Drawer.Screen name="Barriere" component={Barriere} options={{drawerItemStyle: { height: 0 } }} />
        <Drawer.Screen name="Montoir" component={Montoir} options={{drawerItemStyle: { height: 0 } }} />
        <Drawer.Screen name="Haie" component={Haie} options={{drawerItemStyle: { height: 0 } }} />
      </Drawer.Navigator>
    </NavigationContainer>
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

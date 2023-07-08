import {createDrawerNavigator} from "@react-navigation/drawer";
import {NavigationContainer} from "@react-navigation/native";
import Connexion from "./components/views/Connexion";
import {navigationRef} from './helpers/RootNavigation';
import {useFonts} from "expo-font";
import QRCode from "./components/views/QRCode";

const Drawer = createDrawerNavigator();

export default function App() {

  const [loaded] = useFonts({
    'Gluten-Medium': require('./assets/fonts/Gluten-Medium.ttf'),
    'Gluten-Regular': require('./assets/fonts/Gluten-Regular.ttf'),
    'Gluten-SemiBold': require('./assets/fonts/Gluten-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator screenOptions={{
        headerShown: false,
        swipeEnabled: false /* Permet de cacher la barre de titre et de désactiver le fait que le menu se montre si on swipe vers la droite ! */
      }}>
        <Drawer.Screen name="Connexion" component={Connexion}/>
        <Drawer.Screen name="QRCode" component={QRCode}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

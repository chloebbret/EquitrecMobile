import {createDrawerNavigator} from "@react-navigation/drawer";
import {NavigationContainer} from "@react-navigation/native";
import Connexion from "./components/views/Connexion";
import {navigationRef} from './global/nvaigation/RootNavigation';
import {useFonts} from "expo-font";
import QRCode from "./components/views/QRCode";
import {useEffect, useState} from "react";
import CDatabase from "./global/storage/CDatabase";
import Accueil from "./components/views/Accueil";
import SelectionCavalier from "./components/views/SelectionCavalier";

const Drawer = createDrawerNavigator();

/* Initialisation de la base de données ! */
const initDatabase = () => {
  return new Promise((resolve) => {
    CDatabase.createTables()
      .then(() => {
        resolve(true);
      })
      .catch(error => {
        resolve(false);
      });
  });
};

export default function App() {

  const [isDatabaseLoaded, setIsDatabaseLoaded] = useState(false);

  const [loaded] = useFonts({
    'Gluten-Medium': require('./assets/fonts/Gluten-Medium.ttf'),
    'Gluten-Regular': require('./assets/fonts/Gluten-Regular.ttf'),
    'Gluten-SemiBold': require('./assets/fonts/Gluten-SemiBold.ttf'),
  });

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const databaseInitialized = await initDatabase();
        setIsDatabaseLoaded(databaseInitialized);
      } catch (error) {
        console.error("App initialization error:", error);
      }
    };

    initializeApp()
      .catch(err => console.log(err));
  }, []);

  if (!loaded || !isDatabaseLoaded) {
    return;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator screenOptions={{
        headerShown: false,
        swipeEnabled: false /* Permet de cacher la barre de titre et de désactiver le fait que le menu se montre si on swipe vers la droite ! */
      }}>
        <Drawer.Screen name="Connexion" component={Connexion}/>
        <Drawer.Screen name="QRCode" component={QRCode}/>
        <Drawer.Screen name="Accueil" component={Accueil}/>
        <Drawer.Screen name="SelectionCavalier" component={SelectionCavalier}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

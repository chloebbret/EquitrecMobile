import {createDrawerNavigator} from "@react-navigation/drawer";
import {NavigationContainer} from "@react-navigation/native";
import Connexion from "./components/views/Connexion";
import {navigationRef} from './global/nvaigation/RootNavigation';
import {useFonts} from "expo-font";
import QRCode from "./components/views/QRCode";
import {useEffect, useState} from "react";
import CDatabase from "./global/storage/CDatabase";
import {Text, View} from "react-native";

const Drawer = createDrawerNavigator();

/* Initialisation de la base de données ! */
const initDatabase = () => {
  return new Promise((resolve, reject) => {
    CDatabase.createTables()
      .then(() => CDatabase.emptyDatabase())
      .then(() => {
        console.log("Initialization phase done !");
        resolve(true); // Resolve with true to indicate successful initialization
      })
      .catch(error => {
        console.error("Database initialization error:", error);
        resolve(false); // Resolve with false to indicate initialization failure
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
        console.log("LOADING DB ...");
        const databaseInitialized = await initDatabase();
        setIsDatabaseLoaded(databaseInitialized);
      } catch (error) {
        console.error("App initialization error:", error);
        setIsDatabaseLoaded(false);
      }
    };

    initializeApp();
  }, []);

  if (!loaded || !isDatabaseLoaded) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text>Chargement ...</Text>
      </View>
    );
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

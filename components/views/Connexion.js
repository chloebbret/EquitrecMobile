import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {equitrecStyle} from "../../global/style/Equitrec";
import Logo from "../../assets/svg/logo.svg";
import CButton from "../elements/CButton";
import * as RootNavigation from "../../global/nvaigation/RootNavigation";
import CDatabase from "../../global/storage/CDatabase";
import {useFocusEffect, useIsFocused} from "@react-navigation/native";

const checkDatabaseData = () => {
  return new Promise((resolve) => {
    CDatabase.isDatabaseEmpty()
      .then(res => {
        resolve(res);
      })
      .catch(() => {
        resolve(false);
      });
  });
};

export default function Connexion() {
  const [isDatabaseEmpty, setDatabaseEmpty] = useState(true);
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      const initializeConnexion = async () => {
        try {
          const databaseInitialized = await checkDatabaseData();
          setDatabaseEmpty(databaseInitialized);
        } catch (error) {
          console.error("App initialization error:", error);
        }
      };

      initializeConnexion()
        .catch(err => console.log(err));
    }, []));

  useEffect(() => {
    if (!isDatabaseEmpty && isFocused) {
      RootNavigation.navigate('Accueil');
    }
  }, [isDatabaseEmpty, isFocused]);

  if (!isDatabaseEmpty || !isFocused) {
    return null;
  }

  return (
    <View style={[equitrecStyle.container, {gap: 86}]}>
      <View style={equitrecStyle.alignItemsCenter}>
        <Text style={[equitrecStyle.title, equitrecStyle.defaultTopMargin]}>EQUITREC</Text>
        <View style={{width: 150}}>
          <Text style={equitrecStyle.subTitle}>Application de notation des cavaliers</Text>
        </View>
      </View>
      <View>
        <Logo width={128} height={128}/>
      </View>
      <View style={equitrecStyle.alignItemsCenter}>
        <CButton text="Connexion via QR Code"
                 onPress={() => RootNavigation.navigate('QRCode', {text: "Connexion via QR Code"})} imageSrc={
          require("../../assets/img/qr-code.png")
        }/>
        <Text style={[equitrecStyle.subTitle, {width: 250, marginTop: 15}]}>Merci de bien vouloir vous authentifier pour
          continuer ...</Text>
      </View>
      <StatusBar/>
    </View>
  )
}
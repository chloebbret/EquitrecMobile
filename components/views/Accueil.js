import React from 'react';
import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {equitrecStyle} from "../../styles/Equitrec";
import Logo from "../../assets/svg/logo.svg";
import CButton from "../elements/CButton";

export default function Accueil() {
  return (
    <View style={[equitrecStyle.container, {gap: 86}]}>
      <View>
        <Text style={[equitrecStyle.title, equitrecStyle.defaultTopMargin]}>EQUITREC</Text>
        <View style={{width: 150}}>
          <Text style={equitrecStyle.subTitle}>Application de notation des cavaliers</Text>
        </View>
      </View>
      <View>
        <Logo width={128} height={128}/>
      </View>
      <View style={{alignItems: 'center'}}>
        <CButton text="Connexion via QR Code" imageSrc={
          require("../../assets/img/qr-code.png")
        }/>
        <Text style={[equitrecStyle.subTitle, {width: 250, marginTop: 15}]}>Merci de bien vouloir vous authentifier pour
          continuer ...</Text>
      </View>
      <StatusBar/>
    </View>
  )
}
import {Image, StyleSheet, Text, View} from "react-native";
import {equitrecStyle, primaryColor} from "../../styles/Equitrec";
import React, {useEffect} from "react";
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as RootNavigation from "../../helpers/RootNavigation";
import {useIsFocused} from "@react-navigation/native";

export default function QRCode({route}) {

  const [hasPermission, setPermission] = React.useState(false);
  const [scanned, setScanned] = React.useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setPermission(status === 'granted');
    })();
  }, []);

  if (!hasPermission) {
    return (
      <View style={[equitrecStyle.container, {justifyContent: "center"}]}>
        <Text style={[equitrecStyle.subTitle, {width: 200}]}>Veuillez accorder la permission pour la caméra ...</Text>
      </View>
    );
  }

  const handleScan = ({data}) => {
    console.log(data);
    RootNavigation.navigate('Connexion');
    setScanned(true);
  };

  const {text} = route.params;

  if (scanned) {
    setScanned(false);
    return null;
  }

  return (
    <View style={[equitrecStyle.container, {gap: 125}]}>
      <View style={equitrecStyle.alignItemsCenter}>
        <Text style={[equitrecStyle.title, equitrecStyle.defaultTopMargin]}>EQUITREC</Text>
        <View style={{width: 150}}>
          <Text style={equitrecStyle.subTitle}>Application de notation des cavaliers</Text>
        </View>
      </View>
      <View style={{alignItems: "center"}}>
        <View style={styles.qrCode}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.image}
              source={require("../../assets/img/qr-code.png")}
            />
            <Text style={styles.qrCodeText}>{text}</Text>
          </View>
          {
            !scanned && isFocused &&
            <BarCodeScanner
              style={styles.camera}
              onBarCodeScanned={handleScan}
            />
          }
        </View>
        <Text style={[equitrecStyle.subTitle, {width: 250, marginTop: 15}]}>Veuillez scanner le code QR pour continuer
          ...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
    marginRight: 10
  },
  qrCode: {
    backgroundColor: primaryColor,
    justifyContent: "center",
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 20,
    gap: 10
  },
  qrCodeText: {
    fontFamily: 'Gluten-SemiBold',
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 3
  },
  camera: {
    width: 255,
    height: 255,
    borderRadius: 20
  }
});
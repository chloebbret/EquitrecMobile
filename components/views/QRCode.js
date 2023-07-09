import {Image, StyleSheet, Text, View} from "react-native";
import {equitrecStyle, primaryColor} from "../../global/style/Equitrec";
import React, {useEffect} from "react";
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as RootNavigation from "../../global/nvaigation/RootNavigation";
import {useIsFocused} from "@react-navigation/native";
import CDatabase from "../../global/storage/CDatabase";

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

  const handleScan = async ({data}) => {

    if (!isLikelyJSON(data)) {
      console.log("Pas de JSON détecté !");
      RootNavigation.navigate('Connexion');
      return;
    }

    if (scanned)
      return;

    setScanned(true);

    const json = JSON.parse(data);

    try {
      // Insert judges
      for (const judge of json.judges) {
        await CDatabase.insertJudge(judge.id, judge.name, judge.surname);
      }

      // Insert riders
      for (const rider of json.riders) {
        await CDatabase.insertRider(rider.id, rider.name, rider.surname, rider.level_id, rider.bib_number);
      }

      // Insert levels
      for (const level of json.levels) {
        await CDatabase.insertLevel(level.id, level.label);
      }

      // Insert obstacles
      for (const obstacle of json.obstacles) {
        await CDatabase.insertObstacle(obstacle.id, obstacle.label);
      }

      // Insert competitions
      for (const competition of json.competitions) {
        await CDatabase.insertCompetition(competition.id, competition.participant_id, competition.judge_id);
      }

      // Insert competition_obstacles
      for (const competitionObstacle of json.competition_obstacles) {
        await CDatabase.insertCompetitionObstacle(
          competitionObstacle.competition_id,
          competitionObstacle.obstacle_id
        );
      }

      console.log("Successfully imported all data !");

      let judge = await CDatabase.getJudgeFullName(0);
      let competitionCount = await CDatabase.getJudgeCompetitionCount(0);
      let ridersForJudge = await CDatabase.getRidersForJudge(0);

      const riderNames = ridersForJudge.map(rider => `${rider.name} ${rider.surname}`);

      console.log(`Le juge ${judge} doit faire passer ${competitionCount} épreuves aujourd'hui avec les cavaliers : ${riderNames.join(', ')}`);

    } catch (error) {
      console.log(error);
    } finally {
      RootNavigation.navigate('Connexion');
    }
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

function isLikelyJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}
import {Text, View} from "react-native";
import CDatabase from "../../global/storage/CDatabase";
import {equitrecStyle} from "../../global/style/Equitrec";
import {useEffect, useState} from "react";
import Logo from "../../assets/svg/logo.svg";
import CButton from "../elements/CButton";
import * as RootNavigation from "../../global/nvaigation/RootNavigation";

export default function Accueil() {

  const [judgeFullName, setJudgeFullName] = useState('');
  const [competitionCount, setCompetitionCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const judgeName = await CDatabase.getJudgeFullName(0);
        const count = await CDatabase.getJudgeCompetitionCount(0);
        setJudgeFullName(judgeName);
        setCompetitionCount(count);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData()
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={[equitrecStyle.container, {gap: 125}]}>
      <View style={equitrecStyle.alignItemsCenter}>
        <Text style={[equitrecStyle.title, equitrecStyle.defaultTopMargin]}>EQUITREC</Text>
        <View style={{width: 150}}>
          <Text style={equitrecStyle.subTitle}>Application de notation des cavaliers</Text>
        </View>
      </View>
      <View style={{gap: 50}}>
        <View style={equitrecStyle.alignItemsCenter}>
          <Logo width={128} height={128}/>
        </View>
        <Text style={[equitrecStyle.subTitle, {width: 250, marginTop: 15}]}>Bienvenue {judgeFullName}, vous
          avez {competitionCount} compétiteur(s) à évaluer aujourd’hui !</Text>
        <CButton text="Commencer l'évaluation"
                 onPress={() => RootNavigation.navigate('SelectionCavalier')} imageSrc={
          require("../../assets/img/play-button.png")
        }/>
        <CButton secondary text="[DEBUG] Reset Database"
                 onPress={() => CDatabase.emptyDatabase().then(() => RootNavigation.navigate('Connexion'))}/>
      </View>
    </View>
  )
}
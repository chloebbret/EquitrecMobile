import {Text, View} from "react-native";
import {equitrecStyle} from "../../global/style/Equitrec";
import Boots from "../../assets/svg/boots.svg";
import CButton from "../elements/CButton";
import * as RootNavigation from "../../global/nvaigation/RootNavigation";
import CFlatList from "../elements/CFlatList";
import CDatabase from "../../global/storage/CDatabase";
import {useEffect, useState} from "react";
import CListItem from "../elements/CListItem";

export default function SelectionCavalier() {

  const [riders, setRiders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const riders = await CDatabase.getRidersForJudge(0);
        setRiders(riders.map((rider) => CDatabase.getRiderFullNameString(rider)));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData()
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={[equitrecStyle.container, {gap: 90}]}>
      <View style={equitrecStyle.alignItemsCenter}>
        <Text style={[equitrecStyle.title, equitrecStyle.defaultTopMargin]}>CAVALIERS</Text>
        <View style={{width: 150}}>
          <Text style={equitrecStyle.subTitle}>Veuillez sélectionner un cavalier ...</Text>
        </View>
      </View>
      <View>
        <Boots width={128} height={128}/>
      </View>
      <View style={{width: "100%", gap: 40}}>
        <CFlatList data={riders}
                   renderItem={({item}) => <CListItem text={item} imageSrc={require("../../assets/img/helmet.png")}/>}/>
        <View style={{flexDirection: "row", width: "100%"}}>
          <View style={{alignItems: "flex-start", marginLeft: 40}}>
            <CButton imageSrc={require("../../assets/img/arrow-left.png")} onPress={
              () => RootNavigation.navigate('Accueil')
            }/>
          </View>
        </View>
      </View>
    </View>
  )
}
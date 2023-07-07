import {Button, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import Checkbox from "expo-checkbox";


const Montoir = () => {

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate('Obstacles');
  };
  const [isChecked, setChecked] = useState(false);
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);

  const [isExpandedCategory, setIsExpandedCategory] = useState(false);
  const [isExpandedContrat, setIsExpandedContrat] = useState(false);
  const [isExpandedStyle, setIsExpandedStyle] = useState(false);
  const [isExpandedPenalites, setIsExpandedPenalites] = useState(false);
  const [isExpandedPenalitesPTV, setIsExpandedPenalitesPTV] = useState(false);

  const toggleCategory = () => {
    setIsExpandedCategory(!isExpandedCategory);
  };

  const toggleStyle = () => {
    setIsExpandedStyle(!isExpandedStyle);
  };

  const togglePenalite = () => {
    setIsExpandedPenalites(!isExpandedPenalites);
  };

  const togglePenalitePTV = () => {
    setIsExpandedPenalitesPTV(!isExpandedPenalitesPTV);
  };

  const save = () => {
    alert("Les notes de l'obstacle ont bien étés enregistrées");
  }

  return (
    <View style={styles.content}>
      <View style={styles.goback}>
        <Button title="Retour" onPress={handleGoBack} color={"#fff"}/>
      </View>

      <ScrollView>
        <View style={styles.categorieContrat}>
          <TouchableOpacity onPress={toggleCategory}>
            <Text style={styles.texteCat}>
              {isExpandedCategory ? 'Contrat' : 'Contrat'}
            </Text>
          </TouchableOpacity>

          {isExpandedCategory && (
            <View>
              <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? '#B0E0E6' : undefined}
              />
              <Text>Réalisé</Text>

              <Checkbox
                value={isChecked1}
                onValueChange={setChecked1}
                color={isChecked ? '#B0E0E6' : undefined}
              />
              <Text>1 faute</Text>

              <Checkbox
                value={isChecked2}
                onValueChange={setChecked2}
                color={isChecked ? '#B0E0E6' : undefined}
              />
              <Text>2 fautes</Text>

              <Checkbox
                value={isChecked3}
                onValueChange={setChecked3}
                color={isChecked ? '#B0E0E6' : undefined}
              />
              <Text>3 fautes </Text>
            </View>
          )}
        </View>

        <View style={styles.categorieStyle}>
          <TouchableOpacity onPress={toggleStyle}>
            <Text style={styles.texteCat}>
              {isExpandedStyle ? 'Style' : 'Style'}
            </Text>
          </TouchableOpacity>

          {isExpandedStyle && (
            <View>
              <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? '#B0E0E6' : undefined}
              />
              <Text>Bon</Text>

              <Checkbox
                value={isChecked1}
                onValueChange={setChecked1}
                color={isChecked ? '#B0E0E6' : undefined}
              />
              <Text>Moyen</Text>

              <Checkbox
                value={isChecked2}
                onValueChange={setChecked2}
                color={isChecked ? '#B0E0E6' : undefined}
              />
              <Text>Passable</Text>

              <Checkbox
                value={isChecked3}
                onValueChange={setChecked3}
                color={isChecked ? '#B0E0E6' : undefined}
              />
              <Text>Médiocre</Text>
            </View>
          )}
        </View>

        <View style={styles.categoriePenalites}>
          <TouchableOpacity onPress={togglePenalite}>
            <Text style={styles.texteCat}>
              {isExpandedPenalites ? 'Pénalités' : 'Pénalités'}
            </Text>
          </TouchableOpacity>

          {isExpandedPenalites && (
            <View>
              <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? '#B0E0E6' : undefined}
              />
              <Text>Brutalité</Text>

              <Checkbox
                value={isChecked1}
                onValueChange={setChecked1}
                color={isChecked ? '#B0E0E6' : undefined}
              />
              <Text>Franchissement dangereux </Text>
            </View>
          )}
        </View>

        <View style={styles.categoriePenalitesPTV}>
          <TouchableOpacity onPress={togglePenalitePTV}>
            <Text style={styles.texteCat}>
              {isExpandedPenalitesPTV ? 'Pénalités PTV' : 'Pénalités PTV'}
            </Text>
          </TouchableOpacity>

          {isExpandedPenalitesPTV && (
            <View>
              <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? '#B0E0E6' : undefined}
              />
              <Text>Chute</Text>

              <Checkbox
                value={isChecked1}
                onValueChange={setChecked1}
                color={isChecked ? '#B0E0E6' : undefined}
              />
              <Text>Erreur de parcours non rectifiée </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.sauver}>
        <Button
          title={"Enregistrer"}
          color={"#fff"}
          onPress={save}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bouton: {
    width: 250,
    height: 40,
    backgroundColor: "powderblue",
    borderRadius: 10,
    marginBottom: 10,
  },

  content: {
    alignItems: "center",
    justifyContent: "center",
  },

  goback: {
    width: 80,
    height: 40,
    backgroundColor: "powderblue",
    borderRadius: 10,
    marginRight: 290,
    marginTop: 10
  },

  categorieContrat: {
    marginTop: 25,
    backgroundColor: "lightyellow",
    width: 350,
    alignItems: "center"
  },

  texteCat: {
    fontSize: 20,
    marginBottom: 15
  },

  categorieStyle: {
    marginTop: 25,
    backgroundColor: "lightgreen",
    width: 350,
    alignItems: "center"
  },

  categoriePenalites: {
    marginTop: 25,
    backgroundColor: "lightpink",
    width: 350,
    alignItems: "center"
  },

  categoriePenalitesPTV: {
    marginTop: 25,
    backgroundColor: "lightblue",
    width: 350,
    alignItems: "center"
  },

  sauver: {
    backgroundColor: "green",
    width: 120,
    borderRadius: 4,
    marginTop: 30
  }
});
export default Montoir;
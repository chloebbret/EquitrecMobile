import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import * as Equitrec from "../../global/style/Equitrec";

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
    marginHorizontal: 10
  },
  buttonText: {
    fontFamily: 'Gluten-SemiBold',
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'center',
    color: '#FFFFFF'
  },
});

const CListItem = ({text, imageSrc}) => {
  return (
    <View style={{
      width: "90%",
      backgroundColor: Equitrec.primaryColor,
      borderRadius: 10,
      padding: 15,
      marginLeft: "5%",
      marginBottom: 5
    }}>
      <View style={{flexDirection: "row"}}>
        {imageSrc &&
          <Image
            source={imageSrc}
            style={styles.image}
          />
        }
        {text &&
          <View style={{justifyContent: "center"}}>
            <Text style={styles.buttonText}>{text}</Text>
          </View>
        }
      </View>
    </View>
  );
};

export default CListItem;
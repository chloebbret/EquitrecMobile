import React from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';
import * as Equitrec from "../../global/style/Equitrec";

let secondary;

const CButton = ({text, imageSrc, onPress, secondary}) => {

  this.secondary = secondary;

  return (
    <Pressable
      style={[styles.button, {backgroundColor: this.secondary !== undefined ? Equitrec.secondaryColor : Equitrec.primaryColor}]}
      onPress={onPress}>
      {imageSrc &&
        <Image
          source={imageSrc}
          style={styles.image}
        />
      }
      {text &&
        <Text style={styles.buttonText}>{text}</Text>
      }
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: Equitrec.primaryColor,
    borderRadius: 100,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Gluten-SemiBold',
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 3,
    marginLeft: 10
  },
  image: {
    width: 24,
    height: 24
  }
});

export default CButton;

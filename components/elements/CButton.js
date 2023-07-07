import React from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';

const CButton = ({text, imageSrc, onPress}) => {

  return (
    <Pressable style={styles.button} onPress={onPress}>
      {imageSrc &&
        <Image
          source={imageSrc}
          style={styles.image}
        />
      }
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: 'rgb(116, 197, 255)',
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
    marginBottom: 3
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 10
  }
});

export default CButton;

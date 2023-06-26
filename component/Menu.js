import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Menu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigation = useNavigation();

  const handleMenuPress = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const navigateToPage = (pageName) => {
    navigation.navigate(pageName);
    handleMenuClose();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMenuPress} style={styles.menuIcon}>
        <Ionicons name="menu-outline" size={30} color="#000" />
      </TouchableOpacity>

      {isMenuOpen && (
        <View style={styles.menuItems}>
          <TouchableOpacity onPress={() => navigateToPage('Accueil')}>
            <Text style={styles.menuItem}>Accueil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToPage('Classement')}>
            <Text style={styles.menuItem}>Classement</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToPage('Infos classement')}>
            <Text style={styles.menuItem}>Infos classement</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToPage('Notes')}>
            <Text style={styles.menuItem}>Notes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 999,
  },
  menuIcon: {
    padding: 10,
    alignSelf: 'flex-start',
  },
  menuItems: {
    backgroundColor: 'blue',
    width: 350,
    height: 740,
    color: "#fff",
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#fff'
  },
});

export default Menu;

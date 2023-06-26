import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text, Alert, Linking, SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

const Accueil = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [cameraVisible, setCameraVisible] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setCameraVisible(false);
        // Traiter les données du code QR scanné
        Alert.alert('Code QR scanné');/*`Type: ${type}, Data: ${data}`); */

        // Ouvrir le lien dans Safari
        Linking.openURL(data);
    };

    const scanQRCode = () => {
        setScanned(false);
        setCameraVisible(true);
    };

    const handleCameraClose = () => {
        setCameraVisible(false);
    };

    const handleLogoPress = () => {
        navigation.navigate('Accueil');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.logoContainer} onPress={handleLogoPress}>
                    <Image source={require('../assets/logo-equi.png')} style={styles.logo} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={scanQRCode}>
                    <Text style={styles.buttonText}>Scanner le code QR</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.infoContainer}>
                    <View style={styles.info}>
                        <Text style={styles.infoTitle}>Compétition 1</Text>
                        <Text style={styles.infoDate}>Début: 1er juillet 2023</Text>
                        <Text style={styles.infoDate}>Fin: 15 juillet 2023</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.infoTitle}>Compétition 2</Text>
                        <Text style={styles.infoDate}>Début: 15 août 2023</Text>
                        <Text style={styles.infoDate}>Fin: 30 août 2023</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.infoTitle}>Compétition 3</Text>
                        <Text style={styles.infoDate}>Début: 1er septembre 2023</Text>
                        <Text style={styles.infoDate}>Fin: 15 septembre 2023</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.infoTitle}>Compétition 4</Text>
                        <Text style={styles.infoDate}>Début: 15 octobre 2023</Text>
                        <Text style={styles.infoDate}>Fin: 30 octobre 2023</Text>
                    </View>
                </View>
            </View>
            {cameraVisible && (
                <View style={styles.scannerContainer}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={handleCameraClose}>
                        <Image source={require('../assets/close.png')} style={styles.closeIcon} />
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    logoContainer: {
        justifyContent: 'center',
    },
    logo: {
        width: 50,
        height: 50,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1,
    },
    infoContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    info: {
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '80%',
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    infoDate: {
        fontSize: 16,
    },
    scannerContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    closeIcon: {
        width: 20,
        height: 20,
    },
});

export default Accueil;

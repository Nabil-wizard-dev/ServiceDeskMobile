import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import * as Progress from 'react-native-progress'; // J'imagine que tu utilises cette librairie

const ChargingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Section Logo */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../constants/logo/ServiceDeskLogo_forBlueFont.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
        </View>

        {/* Texte d'accroche */}
        <Text style={styles.sloganText}>
          Un support rapide{'\n'}pour une équipe performante
        </Text>

        {/* Barre de progression */}
        <View style={styles.progressContainer}>
          <Progress.Bar 
            progress={0.4} 
            width={220} 
            height={6} 
            borderRadius={4} 
            color="#5C93FA" /* Bleu clair de la jauge */
            unfilledColor="#182B6A" /* Bleu très foncé pour le fond de la jauge */
            borderWidth={0} /* Pour enlever la bordure par défaut */
          />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

export default ChargingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Note : L'image montre un dégradé. React Native de base ne gère pas les dégradés.
    // J'utilise ici un bleu roi uni. Si tu veux le vrai dégradé, il faudra utiliser 
    // la librairie 'react-native-linear-gradient'.
    backgroundColor: '#1E3587', 
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 40,
    marginTop: 150,
    alignItems: 'center',
  },
  logo: {
    width: 450, 
    height: 200, // Ajuste cette hauteur en fonction du ratio réel de ton image
  },
  sloganText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24, // Donne un peu d'espace entre les deux lignes
    marginBottom: 100, // Pousse la barre de chargement vers le bas
  },
  progressContainer: {
    alignItems: 'center',
    width: '100%',
    paddingTop:100,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 15,
  }
});
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SeparatorWithText = ({ text = "ou" }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
};

export default SeparatorWithText;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Aligne les lignes et le texte horizontalement
    alignItems: 'center',    // Centre verticalement les éléments
    marginVertical: 20,      // Espace au-dessus et en dessous du séparateur
    paddingHorizontal: 16,   // Espace sur les côtés
  },
  line: {
    flex: 1,                 // Permet aux lignes d'occuper tout l'espace disponible
    height: 1,               // Épaisseur de la ligne
    backgroundColor: '#CCCCCC', // Couleur de la ligne (gris clair)
  },
  text: {
    marginHorizontal: 10,    // Espace entre le texte et les lignes
    color: '#666666',        // Couleur du texte
    fontSize: 14,
    fontWeight: '500',
  },
});
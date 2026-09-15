import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import TextInputField from '../../components/inputs/TextInputField';
import TextAreaField from '../../components/inputs/TextAreaField';
import SegmentedControl, {
  SegmentedOption,
} from '../../components/inputs/SegmentedControl';
import { COLORS } from '../../../constants/constantColors';
import SelectDropdown from '../../components/inputs/SelectedDropDown';
import FileUploadArea from '../../components/inputs/FileUploadArea';
import PrimaryButton from '../../components/buttons/PrimaryButton';

const NewTicketScreen = () => {
  const PRIORITY_OPTIONS: SegmentedOption[] = [
    {
      label: 'Basse',
      value: 'basse',
      color: COLORS.success,
      backgroundColor: COLORS.successLight,
    },
    {
      label: 'Moyenne',
      value: 'moyenne',
      color: COLORS.info,
      backgroundColor: COLORS.infoLight,
    },
    {
      label: 'Haute',
      value: 'haute',
      color: COLORS.warning,
      backgroundColor: COLORS.warningLight,
    },
    {
      label: 'Urgente',
      value: 'urgente',
      color: COLORS.error,
      backgroundColor: COLORS.errorLight,
    },
  ];

  const CATEGORIES = [
    { label: 'Voirie', value: 'voirie' },
    { label: 'Eau & Assainissement', value: 'eau' },
    { label: 'Électricité', value: 'electricite' },
  ];

  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('moyenne');
  const [category, setCategory] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Sujet *</Text>
          <TextInputField
            placeholder="Ex : Impossible de se connecter au VPN"
            keyboardType="default"
            autoCapitalize="sentences"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Description *</Text>
          <TextAreaField
            value={description}
            onChangeText={setDescription}
            placeholder="Décrivez votre problème..."
            maxLength={1000}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Priorité *</Text>
          <SegmentedControl
            options={PRIORITY_OPTIONS}
            value={priority}
            onChange={setPriority}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Catégorie</Text>
          <SelectDropdown
            options={CATEGORIES}
            value={category}
            onSelect={setCategory}
            placeholder="Sélectionner une catégorie"
            title="Choisir une catégorie"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Pièces jointes</Text>
          <FileUploadArea
            title="Ajouter des fichiers"
            subtitle="(photos, documents...)"
            onPress={() => {}}
          />
        </View>

        {/* Bouton de soumission */}
        <View style={styles.buttonContainer}>
          <PrimaryButton title="Créer le ticket" onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewTicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    // paddingTop: 6,
    paddingBottom: 32,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 6,
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
});

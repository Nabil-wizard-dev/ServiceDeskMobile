import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import {
  AddTicket,
  Ticket,
  TicketPriorityEnum,
} from '../../../domain/entities/Ticket';
import { CreateTicket } from '../../../domain/usecases/ticket/CreateTicket';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App';

const NewTicketScreen = () => {
  const PRIORITY_OPTIONS: SegmentedOption[] = [
    {
      label: 'Basse',
      value: TicketPriorityEnum.LOW,
      color: COLORS.success,
      backgroundColor: COLORS.successLight,
    },
    {
      label: 'Moyenne',
      value: TicketPriorityEnum.MEDIUM,
      color: COLORS.info,
      backgroundColor: COLORS.infoLight,
    },
    {
      label: 'Haute',
      value: TicketPriorityEnum.HIGH,
      color: COLORS.warning,
      backgroundColor: COLORS.warningLight,
    },
    {
      label: 'Urgente',
      value: TicketPriorityEnum.URGENT,
      color: COLORS.error,
      backgroundColor: COLORS.errorLight,
    },
  ];

  const CATEGORIES = [
    { label: 'Voirie', value: 'voirie' },
    { label: 'Eau & Assainissement', value: 'eau' },
    { label: 'Électricité', value: 'electricite' },
  ];
  //pour le formulaire
  const [subject, setSubject] = useState('');
  const [tickets, setTickets] = useState<Ticket[]>();
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TicketPriorityEnum>();
  const [category, setCategory] = useState<string | null>(null);

  // la navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // appel su usecase
  const handleAdd = async (newTicket: AddTicket) => {
    const createdTicket = await CreateTicket(newTicket);
    return createdTicket;
  };

  //pour l'envoi
  // --- handleSend : Validation, préparation des données et réinitialisation ---
  const handleSend = async () => {
    // 1. Validation des champs obligatoires (Sujet et Description ont des *)
    if (!subject || !description) {
      Alert.alert(
        'Veuillez remplir les champs obligatoires (Sujet et Description).',
      );
      console.log({"sub":subject,'descript': description, priority});
      return;
    }
     console.log(subject, description, priority);
    await handleAdd({
      subject: subject,
      description: description,
      priority: priority,
      employee_id: '01m1k8qewyes6ntzc3bmdczaj6',
    });
    console.log(subject, description, priority);

    setSubject('');
    setDescription('');
    setCategory(null);
    setPriority(TicketPriorityEnum.MEDIUM);

    Alert.alert('Ticket créé avec succès !');
    // navigation.navigate('TicketList')
    navigation.navigate('MainTabs', {
  screen: 'TicketList',
});
    
  };

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
             onChangeText={setSubject}
             value={subject}
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
            value={(priority) as string}
            onChange={(val) => setPriority(val as TicketPriorityEnum)}
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
          <PrimaryButton title="Créer le ticket" onPress={handleSend} />
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

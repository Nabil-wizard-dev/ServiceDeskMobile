import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import StatCard from '../../components/dataDisplay/StatCard';
import { COLORS } from '../../../constants/constantColors';
import Feather from 'react-native-vector-icons/Feather';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import TextLink from '../../components/buttons/TextLink';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App';
import TicketListItem from '../../components/dataDisplay/TicketListItem';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.container}>  
      <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}  contentContainerStyle={styles.scrollContent}>
        {/* En-tête */}
        <Text style={styles.greetingTitle}>Bonjour Afi 👋</Text>
        <Text style={styles.greetingSubtitle}>
          Que pouvons-nous faire pour vous ?
        </Text>

        {/* Grille de cartes statistiques */}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <StatCard
            icon={<Feather name="file-text" size={18} color={COLORS.primary} />}
            iconBackgroundColor={COLORS.iconBlue}
            label="Mes tickets"
            value={5}
          />
          <StatCard
            icon={
              <Feather name="alert-circle" size={18} color={COLORS.error} />
            }
            iconBackgroundColor={COLORS.iconRed}
            label="Ouverts"
            value={2}
          />
        </View>
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
          <StatCard
            icon={<Feather name="clock" size={18} color={COLORS.warning} />}
            iconBackgroundColor={COLORS.iconOrange}
            label="En cours"
            value={2}
          />
          <StatCard
            icon={
              <Feather name="check-circle" size={18} color={COLORS.success} />
            }
            iconBackgroundColor={COLORS.iconGreen}
            label="Résolus"
            value={1}
          />
        </View>

        {/* Bouton d'action principal */}
        <View style={styles.buttonContainer}>
          <PrimaryButton title="+ Nouveau ticket" onPress={() => navigation.navigate('NewTicket')} />
        </View>

        {/* Section Tickets récents */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tickets récents</Text>
          <TextLink
            title="Voir tout"
            onPress={() => {
              navigation.navigate('TicketList');
            }}
          />
        </View>

        {/* Liste partielle de tickets */}
        <View style={styles.ticketList}>
          <TicketListItem
            ticketId="TCK-2025-0012"
            title="Problème d'accès au VPN"
            status="en_cours"
          />
          <TicketListItem
            ticketId="TCK-2025-0011"
            title="Imprimante indisponible"
            status="ouvert"
          />
          <TicketListItem
            ticketId="TCK-2025-0010"
            title="Installation logiciel"
            status="resolu"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  scrollContent: {
    paddingBottom: 32, // Évite que le dernier élément soit collé au bas de l'écran
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  greetingSubtitle: {
    fontSize: 15,
    color: '#64748B',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cardWrapper: {
    flex: 1,
  },
  buttonContainer: {
    marginVertical: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  ticketList: {
    gap: 12,
  },
});

import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PrimaryButton from '../../components/buttons/PrimaryButton'
import StatusBadge from '../../components/layout/StatusBadge'
import { COLORS } from '../../../constants/constantColors'
import InfoRow from '../../components/dataDisplay/InfoRow'
import Feather from 'react-native-vector-icons/Feather';
import { NavigationContainer, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { TicketDetails } from '../../../domain/usecases/ticket/TicketDetails'
import { Ticket } from '../../../domain/entities/Ticket'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../../App'

type DetailsRouteProp = RouteProp<{ Details: { ticketId?: string } | undefined }, 'Details'>;

const TicketDetailsScreen = () => {
   // la navigation
      const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  //recup la route
 const route = useRoute<DetailsRouteProp>();
 
  // 3. Extraction sécurisée du ticketId (sera string ou undefined)
  const ticketId = route.params?.ticketId;

  const [ticket, setTicket] = useState<Ticket>();

  const handleGet = async ()=>{
    if(!ticketId)return;

      const data = await TicketDetails(ticketId);
      setTicket(data);
      console.log(data)
    }
  useEffect( () => {handleGet()},[])


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* En-tête ID + Statut */}
        <View style={styles.headerRow}>
          <Text style={styles.ticketId}>TCK-2025-0012</Text>
          <StatusBadge status="in_progress" />
        </View>

        {/* Titre du ticket */}
        <Text style={styles.ticketTitle}>Problème d'accès au VPN</Text>

        {/* Date avec icône */}
        <View style={styles.dateContainer}>
          <Feather name="calendar" size={16} color="#64748B" />
          <Text style={styles.dateText}>24 août 2025 - 10:30</Text>
        </View>

        {/* Section Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <View style={styles.cardContainer}>
          <Text style={styles.descriptionText}>
            Bonjour,{'\n'}
            Je n'arrive plus à me connecter au VPN depuis ce matin. Le message d'erreur indique une authentification invalide.{'\n'}
            Merci pour votre aide.
          </Text>
        </View>

        {/* Section Informations */}
        <Text style={styles.sectionTitle}>Informations</Text>
        <View style={styles.cardContainer}>
          <InfoRow icon={<Feather name="user" size={16} color={COLORS.textMuted} />} label="Employé" value="Afi Kossi" />
          <InfoRow icon={<Feather name="grid" size={16} color={COLORS.textMuted} />} label="Catégorie" value="Accès réseau" />
          <InfoRow icon={<Feather name="bell" size={16} color={COLORS.textMuted} />} label="Priorité" value="Haute" />
          <InfoRow icon={<Feather name="target" size={16} color={COLORS.textMuted} />} label="Statut" value="En cours" />
          <InfoRow icon={<Feather name="clock" size={16} color={COLORS.textMuted} />} label="Dernière mise à jour" value="24 août 2025 - 14:22" />
        </View>
      </ScrollView>

      {/* Bouton fixe en bas */}
      <View style={styles.footerContainer}>
        <PrimaryButton title="Ajouter un commentaire" onPress={() => navigation.navigate('Comments',{ticketId:ticketId})} />
      </View>
    </SafeAreaView>
  );
};

export default TicketDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ticketId: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  dateText: {
    fontSize: 14,
    color: '#64748B',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  cardContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 24,
    gap: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
});
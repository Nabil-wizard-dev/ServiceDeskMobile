import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SearchInput from '../../components/inputs/SearchInput';
import TabsHeader, { FilterTab } from '../../components/layout/TabsHeader';
import TicketListItem from '../../components/dataDisplay/TicketListItem';
import { Ticket } from '../../../domain/entities/Ticket';
import { TicketList } from '../../../domain/usecases/ticket/TicketList';
import { RootStackParamList } from '../../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


const TicketListScreen = () => {
  // la navigation
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const FILTER_TABS: FilterTab[] = [
    { key: 'tous', label: 'Tous', count: 5 },
    { key: 'ouverts', label: 'Ouverts', count: 2 },
    { key: 'en_cours', label: 'En cours', count: 2 },
    { key: 'resolus', label: 'Résolus', count: 1 },
  ];

  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('tous');

  useEffect(()=>{
    TicketList().then((response)=>{
      setTickets(response)
    })
  },[])

  // const toDetails =  async(id:string)=>{
  //   navigation.navigate('Details')

  // }

  const [tickets, setTickets] = useState<Ticket[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput
          value={search}
          onChangeText={setSearch}
          placeholder="Rechercher un ticket..."
        />
      </View>

      <View style={styles.tabsContainer}>
        <TabsHeader
          tabs={FILTER_TABS}
          activeKey={activeFilter}
          onTabPress={setActiveFilter}
        />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {tickets.map((ticket) => (
          <TicketListItem
            key={ticket.reference}
            ticketId={ticket.reference}
            title={ticket.subject}
            status={ticket.status ?? 'in_progress'}
            date="24 août 2025 - 10:30"
            onPress={() => navigation.navigate('Details',{ticketId:ticket.id})}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TicketListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  tabsContainer: { 
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 12,
  },
});

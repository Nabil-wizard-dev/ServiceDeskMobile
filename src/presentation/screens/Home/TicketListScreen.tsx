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

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('tous');

  useEffect(() => {
    TicketList().then((response) => {
      setTickets(response);
    });
  }, []);

  // Calcul dynamique des compteurs d'onglets à partir des tickets récupérés
  const filterTabs: FilterTab[] = [
    { key: 'tous', label: 'Tous', count: tickets.length },
    {
      key: 'ouverts',
      label: 'Ouverts',
      count: tickets.filter((t) => t.status === 'open').length,
    },
    {
      key: 'en_cours',
      label: 'En cours',
      count: tickets.filter((t) => t.status === 'in_progress').length,
    },
    {
      key: 'resolus',
      label: 'Résolus',
      count: tickets.filter((t) => t.status === 'resolved' || t.status === 'closed').length,
    },
  ];

  // Filtrage des tickets selon l'onglet actif et la recherche
  const filteredTickets = tickets.filter((ticket) => {
    let matchStatus = true;
    if (activeFilter === 'ouverts') {
      matchStatus = ticket.status === 'open';
    } else if (activeFilter === 'en_cours') {
      matchStatus = ticket.status === 'in_progress';
    } else if (activeFilter === 'resolus') {
      matchStatus = ticket.status === 'resolved' || ticket.status === 'closed';
    }

    const matchSearch =
      search.trim() === '' ||
      ticket.subject?.toLowerCase().includes(search.toLowerCase()) ||
      ticket.reference?.toLowerCase().includes(search.toLowerCase());

    return matchStatus && matchSearch;
  });

  const formatDate = (dateValue?: Date | string) => {
    if (!dateValue) return undefined;
    const d = new Date(dateValue);
    return isNaN(d.getTime())
      ? undefined
      : d.toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
  };

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
          tabs={filterTabs}
          activeKey={activeFilter}
          onTabPress={setActiveFilter}
        />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {filteredTickets.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun ticket trouvé</Text>
          </View>
        ) : (
          filteredTickets.map((ticket) => (
            <TicketListItem
              key={ticket.id || ticket.reference}
              ticketId={ticket.reference}
              title={ticket.subject}
              status={ticket.status ?? 'in_progress'}
              date={formatDate(ticket.createdAt)}
              onPress={() => navigation.navigate('Details', { ticketId: ticket.id })}
            />
          ))
        )}
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#64748B',
  },
});

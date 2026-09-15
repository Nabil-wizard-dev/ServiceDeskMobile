import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import SearchInput from '../../components/inputs/SearchInput';
import TabsHeader, { FilterTab } from '../../components/layout/TabsHeader';
import TicketListItem from '../../components/dataDisplay/TicketListItem';

const TicketListScreen = () => {
  const FILTER_TABS: FilterTab[] = [
    { key: 'tous', label: 'Tous', count: 5 },
    { key: 'ouverts', label: 'Ouverts', count: 2 },
    { key: 'en_cours', label: 'En cours', count: 2 },
    { key: 'resolus', label: 'Résolus', count: 1 },
  ];

  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('tous');

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
        {Array.from({ length: 10 }).map((_, index) => (
          <TicketListItem
            key={index}
            ticketId={`TCK-2025-001${index + 1}`}
            title="Problème d'accès au VPN"
            status="en_cours"
            date="24 août 2025 - 10:30"
            onPress={() => console.log(`Pressed ticket ${index}`)}
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

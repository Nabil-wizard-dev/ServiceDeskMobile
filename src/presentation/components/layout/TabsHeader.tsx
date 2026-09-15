import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../../../constants/constantColors';

export interface FilterTab {
  key: string;
  label: string;
  count?: number;
}

interface TabsHeaderProps {
  tabs: FilterTab[];
  activeKey: string;
  onTabPress: (key: string) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Onglets de filtrage horizontaux avec compteur (ex: "Tous (5)").
 * L'onglet actif : texte foncé + gras + soulignement. Les autres restent gris.
 * ScrollView horizontal pour rester utilisable si la liste de filtres s'allonge.
 */
const TabsHeader: React.FC<TabsHeaderProps> = ({ tabs, activeKey, onTabPress, style }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={style}
      contentContainerStyle={styles.container}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            activeOpacity={0.7}
            style={[styles.tab, isActive && styles.tabActive]}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
              {tab.count !== undefined ? ` (${tab.count})` : ''}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: COLORS.textPrimary,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  labelActive: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
});

export default TabsHeader;
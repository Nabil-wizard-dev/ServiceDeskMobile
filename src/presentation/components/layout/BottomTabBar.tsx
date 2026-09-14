import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../../constants/constantColors';
import FloatingActionButton from '../buttons/FloatingActionButton';

export interface TabItem {
  key: string;
  label: string;
  /** Fonction qui retourne l'icône selon la couleur (active ou inactive) */
  icon: (color: string) => React.ReactNode;
}

interface BottomTabBarProps {
  /** Exactement 4 onglets, répartis 2 à gauche / 2 à droite du FAB central */
  tabs: TabItem[];
  activeKey: string;
  onTabPress: (key: string) => void;
  onFabPress: () => void;
  fabIcon?: React.ReactNode;
}

/**
 * Barre de navigation du bas, custom (ne s'appuie pas sur le tab bar natif
 * iOS/Android) — donc rendu identique sur toutes les plateformes.
 * Réutilise FloatingActionButton, repositionné pour dépasser au-dessus de la barre.
 */
const BottomTabBar: React.FC<BottomTabBarProps> = ({
  tabs,
  activeKey,
  onTabPress,
  onFabPress,
  fabIcon,
}) => {
  const half = Math.ceil(tabs.length / 2);
  const leftTabs = tabs.slice(0, half);
  const rightTabs = tabs.slice(half);

  const renderTab = (tab: TabItem) => {
    const isActive = tab.key === activeKey;
    const color = isActive ? COLORS.primary : COLORS.textMuted;
    return (
      <TouchableOpacity
        key={tab.key}
        style={styles.tab}
        onPress={() => onTabPress(tab.key)}
        activeOpacity={0.7}
      >
        {tab.icon(color)}
        <Text style={[styles.label, { color }]}>{tab.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {leftTabs.map(renderTab)}

        <View style={styles.fabSlot}>
          <FloatingActionButton onPress={onFabPress} icon={fabIcon} />
        </View>

        {rightTabs.map(renderTab)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    flex: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
  },
  fabSlot: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -28, // fait dépasser le FAB au-dessus de la barre, comme sur la capture
  },
});

export default BottomTabBar;
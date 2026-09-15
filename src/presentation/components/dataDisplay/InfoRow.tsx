import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { COLORS } from '../../../constants/constantColors';

interface InfoRowProps {
  label: string;
  value: string;
  /** Icône optionnelle devant le label, ex: <Feather name="user" ... /> */
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Ligne clé/valeur pour un écran de détails (ex: "Employé" / "Afi Kossi").
 * Empile plusieurs InfoRow pour une fiche détail ; ajoute un borderBottom
 * via `style` si tu veux séparer les lignes.
 */
const InfoRow: React.FC<InfoRowProps> = ({ label, value, icon, style }) => {
  return (
    <View style={[styles.row, style]}>
      <View style={styles.left}>
        {icon}
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flexShrink: 1,
    textAlign: 'right',
    marginLeft: 12,
  },
});

export default InfoRow;
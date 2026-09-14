import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { COLORS } from '../../../constants/constantColors';

export type TicketStatus = 'ouvert' | 'en_cours' | 'resolu' | 'ferme';

interface StatusBadgeProps {
  status: TicketStatus;
  /** Texte affiché, remplace le label par défaut si fourni */
  label?: string;
  style?: StyleProp<ViewStyle>;
}

const STATUS_CONFIG: Record<
  TicketStatus,
  { label: string; color: string; backgroundColor: string }
> = {
  ouvert: { label: 'Ouvert', color: COLORS.error, backgroundColor: COLORS.errorLight },
  en_cours: { label: 'En cours', color: COLORS.warning, backgroundColor: COLORS.warningLight },
  resolu: { label: 'Résolu', color: COLORS.success, backgroundColor: COLORS.successLight },
  ferme: { label: 'Fermé', color: COLORS.textSecondary, backgroundColor: COLORS.surfaceSecondary },
};

/**
 * Pilule colorée indiquant l'état d'un ticket (Ouvert/rouge, En cours/orange,
 * Résolu/vert, Fermé/gris). Même style visuel que SegmentedControl, mais
 * purement informatif (pas cliquable).
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, style }) => {
  const config = STATUS_CONFIG[status];

  return (
    <View style={[styles.badge, { backgroundColor: config.backgroundColor }, style]}>
      <Text style={[styles.label, { color: config.color }]}>{label ?? config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default StatusBadge;
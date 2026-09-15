import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { COLORS } from '../../../constants/constantColors';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  /** Couleur de fond de l'icône, ex: COLORS.iconBlue, COLORS.iconGreen... */
  iconBackgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Petit bloc de stat pour le dashboard (icône, label, valeur).
 * Utilisé typiquement en grille 2x2 : Mes tickets, Ouverts, En cours, Résolus.
 * Les tokens iconBlue/iconGreen/iconOrange/iconRed du fichier couleurs
 * permettent de varier le fond de l'icône selon la stat affichée.
 */
const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  iconBackgroundColor = COLORS.iconBlue,
  style,
}) => {
  return (
    <View style={[styles.card, style]}>
      <View style={[styles.iconWrapper, { backgroundColor: iconBackgroundColor }]}>
        {icon}
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 14,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});

export default StatCard;
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/constantColors';

interface MenuItemProps {
  icon?: React.ReactNode;
  label: string;
  onPress: () => void;
  /** Élément à droite, chevron par défaut — remplaçable par un badge, un switch... */
  rightElement?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Ligne cliquable de menu (ex: écran profil) : icône, texte, chevron à droite.
 */
const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onPress, rightElement, style }) => {
  return (
    <TouchableOpacity style={[styles.row, style]} onPress={onPress} activeOpacity={0.6}>
      <View style={styles.left}>
        {icon}
        <Text style={styles.label}>{label}</Text>
      </View>
      {rightElement ?? <Feather name="chevron-right" size={20} color={COLORS.textMuted} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
});

export default MenuItem;
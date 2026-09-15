import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../../../constants/constantColors';

export interface SegmentedOption {
  label: string;
  value: string;
  /** Couleur du texte à l'état sélectionné, ex: COLORS.success */
  color: string;
  /** Couleur de fond à l'état sélectionné, ex: COLORS.successLight */
  backgroundColor: string;
}

interface SegmentedControlProps {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Sélecteur en ligne façon "tags" cliquables, comportement radio button
 * (un seul choix actif à la fois). Chaque option porte sa propre couleur —
 * utilisé pour la priorité : Basse/vert, Moyenne/bleu, Haute/orange, Urgente/rouge.
 * Les options non sélectionnées restent neutres (gris) pour faire ressortir le choix actif.
 */
const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => onChange(option.value)}
            activeOpacity={0.7}
            style={[
              styles.pill,
              {
                backgroundColor: isSelected
                  ? option.backgroundColor
                  : COLORS.surfaceSecondary,
              },
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: isSelected ? option.color : COLORS.textMuted },
                isSelected && styles.labelSelected,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
  },
  labelSelected: {
    fontWeight: '700',
  },
});

export default SegmentedControl;
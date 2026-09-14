import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/constantColors';

interface FloatingActionButtonProps {
  onPress: () => void;
  /** Icône affichée au centre, "plus" blanc par défaut */
  icon?: React.ReactNode;
  size?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Gros bouton rond flottant (FAB), typiquement le "+" central de la barre
 * de navigation. Anneau blanc + ombre portée pour l'effet "flottant"
 * au-dessus de la tab bar.
 */
const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon,
  size = 56,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      style={[
        styles.button,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: disabled ? COLORS.primaryLight : COLORS.primary,
        },
        style,
      ]}
    >
      {icon ?? <Feather name="plus" size={size * 0.45} color={COLORS.textWhite} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: COLORS.surface,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});

export default FloatingActionButton;
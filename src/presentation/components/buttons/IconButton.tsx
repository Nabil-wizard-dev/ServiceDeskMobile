import React from 'react';
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { COLORS } from '../../../constants/constantColors';

interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  /** 'outlined' : fond blanc + bordure (ex: cloche, réglages). 'plain' : icône seule, sans fond (ex: flèche retour, kebab menu) */
  variant?: 'outlined' | 'plain';
  /** 'square' : coins arrondis, 'circle' : cercle complet */
  shape?: 'square' | 'circle';
  size?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Bouton ne contenant qu'une icône. Sert aussi bien pour un bouton retour
 * "nu" que pour les icônes encadrées (cloche, réglages, kebab menu).
 */
const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  variant = 'outlined',
  shape = 'square',
  size = 40,
  disabled = false,
  style,
}) => {
  const borderRadius = shape === 'circle' ? size / 2 : size * 0.28;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
      style={[
        styles.base,
        { width: size, height: size, borderRadius },
        variant === 'outlined' && styles.outlined,
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlined: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default IconButton;
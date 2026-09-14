import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS } from '../../../constants/constantColors';

interface OutlinedButtonProps {
  title: string;
  onPress: () => void;
  /** Icône affichée à gauche du texte, ex: <Icon name="fingerprint" size={20} color={COLORS.primary} /> */
  icon?: React.ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

/**
 * Bouton secondaire : fond blanc, bordure fine, texte et icône en bleu.
 * Ex: "Connexion avec empreinte".
 * L'icône est passée en ReactNode pour rester libre du set d'icônes utilisé
 * (Feather n'a pas d'icône fingerprint, MaterialCommunityIcons oui par ex).
 */
const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  title,
  onPress,
  icon,
  disabled = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <Text style={[styles.text, disabled && styles.textDisabled, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  textDisabled: {
    color: COLORS.textMuted,
  },
});

export default OutlinedButton;
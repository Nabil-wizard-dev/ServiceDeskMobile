import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/constantColors';

interface TextInputFieldProps extends TextInputProps {
  /** Nom de l'icône Feather à afficher à gauche (ex: 'mail', 'lock', 'user') */
  leftIcon?: string;
  /** Si true, le champ devient un champ mot de passe avec toggle œil intégré */
  secureTextEntry?: boolean;
  /** Style additionnel pour le conteneur (utile pour ajuster le margin entre champs) */
  containerStyle?: StyleProp<ViewStyle>;
  /** Passe le conteneur en état d'erreur (bordure rouge) */
  error?: boolean;
}

/**
 * Champ de texte réutilisable : icône à gauche configurable, et si
 * secureTextEntry est activé, un toggle "afficher / masquer" à droite.
 * Même composant pour un champ email, mot de passe, ou tout autre champ simple.
 */
const TextInputField: React.FC<TextInputFieldProps> = ({
  leftIcon,
  secureTextEntry = false,
  containerStyle,
  error = false,
  ...textInputProps
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const shouldHideText = secureTextEntry && !isPasswordVisible;

  return (
    <View style={[styles.container, error && styles.containerError, containerStyle]}>
      {leftIcon ? (
        <Feather name={leftIcon} size={20} color={COLORS.textMuted} style={styles.leftIcon} />
      ) : null}

      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.inputPlaceholder}
        secureTextEntry={shouldHideText}
        {...textInputProps}
      />

      {secureTextEntry ? (
        <TouchableOpacity
          onPress={() => setIsPasswordVisible((prev) => !prev)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={20}
            color={COLORS.textMuted}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
    marginBottom: 12,
  },
  containerError: {
    borderColor: COLORS.error,
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
    padding: 0, // évite le padding par défaut d'Android qui décale le texte
  },
});

export default TextInputField;
import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { COLORS } from '../../../constants/constantColors';

interface TextAreaFieldProps
  extends Omit<TextInputProps, 'multiline' | 'value' | 'onChangeText'> {
  value: string;
  onChangeText: (text: string) => void;
  /** Si fourni, applique la limite et affiche le compteur "x/max" */
  maxLength?: number;
  minHeight?: number;
  containerStyle?: StyleProp<ViewStyle>;
  error?: boolean;
}

/**
 * Champ de texte multiligne (ex: description d'un ticket), avec compteur
 * de caractères optionnel. Composant contrôlé, comme TextInputField.
 */
const TextAreaField: React.FC<TextAreaFieldProps> = ({
  value,
  onChangeText,
  maxLength,
  minHeight = 110,
  containerStyle,
  error = false,
  placeholder = 'Décrivez votre problème...',
  ...textInputProps
}) => {
  return (
    <View style={[styles.container, error && styles.containerError, containerStyle]}>
      <TextInput
        style={[styles.input, { minHeight }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.inputPlaceholder}
        multiline
        textAlignVertical="top"
        maxLength={maxLength}
        {...textInputProps}
      />

      {maxLength ? (
        <Text style={styles.counter}>
          {value.length}/{maxLength}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 8,
  },
  containerError: {
    borderColor: COLORS.error,
  },
  input: {
    fontSize: 15,
    color: COLORS.textPrimary,
    padding: 0,
  },
  counter: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 6,
  },
});

export default TextAreaField;
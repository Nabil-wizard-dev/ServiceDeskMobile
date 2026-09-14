import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS } from '../../../constants/constantColors';

interface TextLinkProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

/**
 * Lien texte cliquable (ex: "Mot de passe oublié ?", "Voir tout").
 * Pas de bouton, juste du texte bleu avec une zone de tap confortable.
 */
const TextLink: React.FC<TextLinkProps> = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
     textAlign: 'center',
  },
});

export default TextLink;
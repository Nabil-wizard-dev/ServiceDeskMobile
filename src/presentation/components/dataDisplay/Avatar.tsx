import React from 'react';
import { View, Text, Image, StyleSheet, StyleProp, ViewStyle, ImageStyle } from 'react-native';
import { COLORS } from '../../../constants/constantColors';

interface AvatarProps {
  /** Nom complet, utilisé pour générer les initiales si pas d'image (ex: "Afi Kossi" -> "AK") */
  name?: string;
  /** Initiales à afficher directement, prioritaire sur name si fourni */
  initials?: string;
  /** URI de la photo de profil ; si fournie, affichée à la place des initiales */
  imageUri?: string;
  size?: number;
  /** 'light' : fond bleu clair + texte bleu (défaut). 'solid' : fond bleu plein + texte blanc */
  variant?: 'light' | 'solid';
  style?: StyleProp<ViewStyle>;
}

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const second = parts.length > 1 ? parts[1][0] : '';
  return (first + second).toUpperCase();
};

/**
 * Avatar rond : photo de profil si imageUri est fourni, sinon initiales
 * sur fond coloré. Deux variantes : fond clair/texte bleu, ou fond bleu plein/texte blanc.
 */
const Avatar: React.FC<AvatarProps> = ({
  name,
  initials,
  imageUri,
  size = 44,
  variant = 'light',
  style,
}) => {
  const displayInitials = initials ?? (name ? getInitials(name) : '');

  const containerStyle = [
    styles.container,
    {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: variant === 'solid' ? COLORS.primary : COLORS.primaryVeryLight,
    },
    style,
  ];

  if (imageUri) {
    return <Image source={{ uri: imageUri }} style={[styles.image,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style as ImageStyle,,styles.image]} />;
  }

  return (
    <View style={containerStyle}>
      <Text
        style={[
          styles.initials,
          {
            fontSize: size * 0.4,
            color: variant === 'solid' ? COLORS.textWhite : COLORS.primary,
          },
        ]}
      >
        {displayInitials}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'cover',
  },
  initials: {
    fontWeight: '700',
  },
});

export default Avatar;
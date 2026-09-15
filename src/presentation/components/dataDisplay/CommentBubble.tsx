import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { COLORS } from '../../../constants/constantColors';

interface CommentBubbleProps {
  message: string;
  timestamp: string;
  /** Nom de l'expéditeur, généralement affiché côté support/autre uniquement */
  senderName?: string;
  /** true = message de l'utilisateur (droite, bleu) ; false = support/autre (gauche, clair) */
  isOwnMessage?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Bulle de message dans un chat. Alignement et couleurs changent selon
 * l'expéditeur : utilisateur à droite en bleu, support/autre à gauche en clair.
 */
const CommentBubble: React.FC<CommentBubbleProps> = ({
  message,
  timestamp,
  senderName,
  isOwnMessage = false,
  style,
}) => {
  return (
    <View
      style={[styles.wrapper, { alignSelf: isOwnMessage ? 'flex-end' : 'flex-start' }, style]}
    >
      <View style={[styles.bubble, isOwnMessage ? styles.bubbleOwn : styles.bubbleOther]}>
        {senderName ? (
          <Text style={[styles.senderName, isOwnMessage && styles.textOwn]}>{senderName}</Text>
        ) : null}
        <Text style={[styles.timestamp, isOwnMessage && styles.textOwnMuted]}>{timestamp}</Text>
        <Text style={[styles.message, isOwnMessage && styles.textOwn]}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    maxWidth: '80%',
    marginVertical: 4,
  },
  bubble: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleOwn: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: COLORS.surfaceSecondary,
    borderBottomLeftRadius: 4,
  },
  senderName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 6,
  },
  message: {
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  textOwn: {
    color: COLORS.textWhite,
  },
  textOwnMuted: {
    color: COLORS.primaryVeryLight,
  },
});

export default CommentBubble;
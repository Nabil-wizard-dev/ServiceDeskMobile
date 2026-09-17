import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/constantColors';
import StatusBadge from '../layout/StatusBadge';
import { TicketStatus } from '../../../domain/entities/Ticket';

interface TicketListItemProps {
  ticketId: string;
  title: string;
  status: TicketStatus;
  /** Optionnelle — certains écrans affichent la date, d'autres non */
  date?: string;
  /** Icône personnalisée, document par défaut */
  icon?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Carte résumé d'un ticket : icône, ID, titre, date optionnelle, statut.
 * Composant le plus réutilisé de l'app — s'appuie sur StatusBadge pour la pilule d'état.
 */
const TicketListItem: React.FC<TicketListItemProps> = ({
  ticketId,
  title,
  status,
  date,
  icon,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.iconWrapper}>
        {icon ?? <Feather name="file-text" size={20} color={COLORS.primary} />}
      </View>

      <View style={styles.content}>
        <Text style={styles.ticketId}>{ticketId}</Text>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {date ? <Text style={styles.date}>{date}</Text> : null}
      </View>

      <StatusBadge status={status} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.iconBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: 2,
  },
  ticketId: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  title: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  date: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
});

export default TicketListItem;
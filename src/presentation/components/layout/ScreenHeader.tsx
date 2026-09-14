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

interface ScreenHeaderProps {
  title?: string;
  /** Affiche une flèche retour standard à gauche */
  showBackButton?: boolean;
  onBackPress?: () => void;
  /** Élément personnalisé à gauche (prioritaire sur showBackButton), ex: un Avatar */
  leftComponent?: React.ReactNode;
  /** Élément(s) à droite, ex: une icône réglages, ou plusieurs IconButton côte à côte */
  rightComponent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * En-tête de page : titre centré, avec emplacements gauche/droite flexibles.
 * À gauche : flèche retour par défaut (showBackButton), ou n'importe quel
 * élément custom (leftComponent) — ex: un Avatar sur l'écran d'accueil.
 * À droite : une ou plusieurs actions (icône réglages, kebab menu, cloche...).
 * Le titre reste centré indépendamment de la largeur des éléments gauche/droite.
 */
const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  leftComponent,
  rightComponent,
  style,
}) => {
  const renderLeft = () => {
    if (leftComponent) return leftComponent;
    if (showBackButton) {
      return (
        <TouchableOpacity
          onPress={onBackPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="chevron-left" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.side}>{renderLeft()}</View>

      <View style={styles.titleWrapper} pointerEvents="none">
        {title ? (
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        ) : null}
      </View>

      <View style={[styles.side, styles.sideRight]}>{rightComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
    paddingHorizontal: 16,
  },
  side: {
    minWidth: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideRight: {
    justifyContent: 'flex-end',
  },
  titleWrapper: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    maxWidth: '60%',
  },
});

export default ScreenHeader;
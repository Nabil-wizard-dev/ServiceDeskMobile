import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/constantColors';

interface FileUploadAreaProps {
  onPress: () => void;
  title?: string;
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Zone d'ajout de pièces jointes : bordure pointillée, icône trombone,
 * titre + sous-titre. Purement présentationnel — onPress déclenche l'action,
 * à toi de brancher le picker de fichiers/photos derrière.
 */
const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  onPress,
  title = 'Ajouter des fichiers',
  subtitle = '(photos, documents...)',
  style,
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress} activeOpacity={0.7}>
      <Feather name="paperclip" size={20} color={COLORS.primary} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: COLORS.primaryLight,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: COLORS.surface,
  },
  icon: {
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.primaryLight,
    marginTop: 2,
  },
});

export default FileUploadArea;
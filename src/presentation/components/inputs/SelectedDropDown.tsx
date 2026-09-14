import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/constantColors';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectDropdownProps {
  options: SelectOption[];
  value: string | null;
  onSelect: (value: string) => void;
  placeholder?: string;
  /** Titre affiché en haut de la liste d'options, ex: "Choisir une catégorie" */
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  error?: boolean;
}

/**
 * Champ de sélection. Au tap, ouvre une liste d'options en bas d'écran.
 * Composant contrôlé (value + onSelect), même logique que les autres
 * champs du kit (TextInputField, CheckboxItem).
 */
const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  value,
  onSelect,
  placeholder = 'Sélectionner',
  title,
  containerStyle,
  error = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  const handleSelect = (optionValue: string) => {
    onSelect(optionValue);
    setIsOpen(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.container, error && styles.containerError, containerStyle]}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.7}
      >
        <Text style={selectedLabel ? styles.valueText : styles.placeholderText}>
          {selectedLabel ?? placeholder}
        </Text>
        <Feather name="chevron-down" size={20} color={COLORS.textMuted} />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.sheet}>
            {title ? <Text style={styles.sheetTitle}>{title}</Text> : null}
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.value === value && styles.optionTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.value === value ? (
                    <Feather name="check" size={18} color={COLORS.primary} />
                  ) : null}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
  },
  containerError: {
    borderColor: COLORS.error,
  },
  placeholderText: {
    fontSize: 15,
    color: COLORS.inputPlaceholder,
  },
  valueText: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingBottom: 24,
    maxHeight: '60%',
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  optionText: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  optionTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default SelectDropdown;
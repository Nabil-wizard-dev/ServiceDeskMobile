import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/constantColors';

interface CheckBoxItemProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Case à cocher avec son label, ex: "Se souvenir de moi".
 * Composant contrôlé : l'état (checked) est géré par le parent, comme
 * value/onChangeText sur TextInputField.
 */
const CheckBoxItem: React.FC<CheckBoxItemProps> = ({
  label,
  checked,
  onChange,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onChange(!checked)}
      activeOpacity={0.7}
      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? <Feather name="check" size={14} color={COLORS.textWhite} /> : null}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:10,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  boxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  label: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
});

export default CheckBoxItem;
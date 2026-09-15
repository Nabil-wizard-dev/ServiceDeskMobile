import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Avatar from '../../components/dataDisplay/Avatar';
import MenuItem from '../../components/dataDisplay/MenuItem';
import { COLORS } from '../../../constants/constantColors';
import Feather from 'react-native-vector-icons/Feather';
import PrimaryButton from '../../components/buttons/PrimaryButton';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Section Profil */}
        <View style={styles.profileHeader}>
          <Avatar name="Afi Kossi" size={64} variant="light" />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Afi Kossi</Text>
            <Text style={styles.userRole}>Chargée de projet</Text>
            <Text style={styles.userCompany}>INNOVERTEC SARL</Text>
          </View>
        </View>

        {/* Card Contenant les options de menu */}
        <View style={styles.menuCard}>
          <MenuItem
            icon={<Feather name="user" size={18} color={COLORS.textMuted} />}
            label="Informations personnelles"
            onPress={() => {}}
          />
          <MenuItem
            icon={
              <Feather name="file-text" size={18} color={COLORS.textMuted} />
            }
            label="Mes tickets"
            onPress={() => {}}
          />
          <MenuItem
            icon={<Feather name="bell" size={18} color={COLORS.textMuted} />}
            label="Notifications"
            onPress={() => {}}
          />
          <MenuItem
            icon={
              <Feather name="settings" size={18} color={COLORS.textMuted} />
            }
            label="Paramètres"
            onPress={() => {}}
          />
          <MenuItem
            icon={
              <Feather name="help-circle" size={18} color={COLORS.textMuted} />
            }
            label="Aide & Support"
            onPress={() => {}}
          />
          <MenuItem
            icon={<Feather name="info" size={18} color={COLORS.textMuted} />}
            label="À propos"
            onPress={() => {}}
          />
        </View>

        {/* Bouton Déconnexion */}
        <View style={styles.logoutContainer}>
          <PrimaryButton title="-> Déconnexion" onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 2,
  },
  userCompany: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    marginBottom: 24,
  },
  logoutContainer: {
    marginTop: 0,
  },
});

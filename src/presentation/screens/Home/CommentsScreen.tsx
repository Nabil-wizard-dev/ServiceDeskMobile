import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TextInputField from '../../components/inputs/TextInputField';
import IconButton from '../../components/buttons/IconButton';
import { COLORS } from '../../../constants/constantColors';
import Feather from 'react-native-vector-icons/Feather';
import Avatar from '../../components/dataDisplay/Avatar';
import CommentBubble from '../../components/dataDisplay/CommentBubble';

const CommentsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Zone des commentaires scrollable */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.commentRow}>
          <Avatar />
          <View style={styles.bubbleWrapper}>
            <CommentBubble
              senderName="Support IT"
              timestamp="24 août 2025 - 11:15"
              message="Bonjour Afi, Nous prenons en charge votre demande. Nous revenons vers vous rapidement."
            />
          </View>
        </View>
      </ScrollView>

      {/* Zone de saisie fixe en bas */}
      <View style={styles.bottomBar}>
        <View style={styles.inputWrapper}>
          <TextInputField
            leftIcon="link"
            placeholder="Écrire un commentaire..."
            keyboardType="default"
            autoCapitalize="sentences"
          />
        </View>
        <IconButton
          variant="plain"
          icon={
            <Feather name="send" size={20} color={COLORS.primary} />
          }
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    gap: 16,
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  bubbleWrapper: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  inputWrapper: {
    flex: 1,
  },
});

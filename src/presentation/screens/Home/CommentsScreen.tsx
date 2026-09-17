import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import TextInputField from '../../components/inputs/TextInputField';
import IconButton from '../../components/buttons/IconButton';
import { COLORS } from '../../../constants/constantColors';
import Feather from 'react-native-vector-icons/Feather';
import Avatar from '../../components/dataDisplay/Avatar';
import { Comment, CreateComment } from '../../../domain/entities/comment';
import CommentBubble from '../../components/dataDisplay/CommentBubble';
import { CommentsByTicket } from '../../../domain/usecases/comment/CommentsBuyTicket';
import { CreateTicket } from '../../../domain/usecases/ticket/CreateTicket';
import { AddComment } from '../../../domain/usecases/comment/AddComment';
import { RouteProp, useRoute } from '@react-navigation/native';

type CommentsRouteProp = RouteProp<
  { Comments: { ticketId?: string } | undefined },
  'Comments'
>;

const CommentsScreen = () => {
  //recup la route
  const route = useRoute<CommentsRouteProp>();

  // 3. Extraction sécurisée du ticketId (sera string ou undefined)
  const ticketId = route.params?.ticketId;

  //
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    CommentsByTicket(ticketId as string).then(response => {
      setComments(response);
    });
  }, []);

  //

  // pour la creation
  const handleAdd = async (newComment: CreateComment) => {
    const created = await AddComment(ticketId as string, newComment);
    // Tu ajoutes à la liste existante
    setComments(prev => [created, ...prev]);
  };

  //pour l'envoie
  const handleSend = () => {
    if (!text.trim()) return;
    handleAdd({
      message: text,
      employee_id: '01m1k8qewyes6ntzc3bmdczaj6',
    });
    setText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Zone des commentaires scrollable */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.commentRow}>
          <Avatar name="support it" />
          <View style={styles.bubbleWrapper}>
            <CommentBubble
              senderName="Support IT"
              timestamp="24 août 2025 - 11:15"
              message="Bonjour Afi, Nous prenons en charge votre demande. Nous revenons vers vous rapidement."
            />
          </View>
        </View>

        {comments.map(comment => (
          <View style={styles.commentRow}>
            <Avatar name={comment.employee.fullName} />
            <View style={styles.bubbleWrapper}>
              <CommentBubble
                senderName={comment.employee.fullName}
                timestamp={comment.createdAt.toLocaleString()}
                message={comment.message}
              />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Zone de saisie fixe en bas */}
      <View style={styles.bottomBar}>
        <View style={styles.inputWrapper}>
          <TextInputField
            leftIcon="link"
            placeholder="Écrire un commentaire..."
            keyboardType="default"
            value={text}
            onChangeText={setText}
            autoCapitalize="sentences"
          />
        </View>
        <IconButton
          variant="plain"
          icon={<Feather name="send" size={20} color={COLORS.primary} />}
          onPress={handleSend}
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

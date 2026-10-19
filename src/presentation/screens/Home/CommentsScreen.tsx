import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import TextInputField from '../../components/inputs/TextInputField';
import IconButton from '../../components/buttons/IconButton';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { COLORS } from '../../../constants/constantColors';
import Feather from 'react-native-vector-icons/Feather';
import Avatar from '../../components/dataDisplay/Avatar';
import { Comment, CreateComment } from '../../../domain/entities/comment';
import { TicketStatus } from '../../../domain/entities/Ticket';
import CommentBubble from '../../components/dataDisplay/CommentBubble';
import { CommentsByTicket } from '../../../domain/usecases/comment/CommentsBuyTicket';
import { TicketDetails } from '../../../domain/usecases/ticket/TicketDetails';
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

  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState('');
  const [ticketStatus, setTicketStatus] = useState<TicketStatus | null>(null);
  const [showClosedModal, setShowClosedModal] = useState(false);

  useEffect(() => {
    if (ticketId) {
      CommentsByTicket(ticketId).then(response => {
        setComments(response);
      });
      TicketDetails(ticketId)
        .then(ticket => {
          setTicketStatus(ticket.status);
        })
        .catch(err => {
          console.log('[CommentsScreen] Error fetching ticket status:', err);
        });
    }
  }, [ticketId]);

  // pour la creation
  const handleAdd = async (newComment: CreateComment) => {
    // Contrôle du statut du ticket
    if (ticketStatus === 'closed') {
      setShowClosedModal(true);
      return;
    }

    const created = await AddComment(ticketId as string, newComment);
    // Tu ajoutes à la liste existante
    setComments(prev => [created, ...prev]);
  };

  //pour l'envoie
  const handleSend = () => {
    // Contrôle du statut avant envoi
    if (ticketStatus === 'closed') {
      setShowClosedModal(true);
      return;
    }

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
          <View key={comment.id} style={styles.commentRow}>
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
            placeholder={
              ticketStatus === 'closed'
                ? 'Ce ticket est fermé (commentaires désactivés)'
                : 'Écrire un commentaire...'
            }
            keyboardType="default"
            value={text}
            onChangeText={setText}
            autoCapitalize="sentences"
            editable={ticketStatus !== 'closed'}
          />
        </View>
        <IconButton
          variant="plain"
          icon={
            <Feather
              name="send"
              size={20}
              color={ticketStatus === 'closed' ? COLORS.textMuted : COLORS.primary}
            />
          }
          onPress={handleSend}
        />
      </View>

      {/* Modal d'information lorsque le ticket est fermé */}
      <Modal
        visible={showClosedModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowClosedModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconContainer}>
              <Feather name="lock" size={28} color={COLORS.error} />
            </View>
            <Text style={styles.modalTitle}>Ticket fermé</Text>
            <Text style={styles.modalMessage}>
              Ce ticket est clôturé. Il n'est plus possible d'y ajouter de nouveaux commentaires.
            </Text>
            <View style={{ width: '100%' }}>
              <PrimaryButton
                title="Compris"
                onPress={() => setShowClosedModal(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  modalIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.errorLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
});

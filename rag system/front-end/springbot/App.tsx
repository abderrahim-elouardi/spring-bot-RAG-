import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ChatInput from './components/ChatInput';
import MessageBubble, { Message } from './components/MessageBubble';
import TypingIndicator from './components/TypingIndicator';
import { COLORS, FONTS } from './constants/theme';
import { sendMessage } from './services/api';

const WELCOME: Message = {
  id: 'welcome',
  role: 'bot',
  text: "Hello! I'm Spring Bot 🌿\nAsk me anything about Spring Boot — data access, security, JPA, REST, and more.",
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<FlatList>(null);

  const scrollToEnd = () =>
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 80);

  const handleSend = async (question: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: question };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setError(null);
    scrollToEnd();

    try {
      const answer = await sendMessage(question);
      const botMsg: Message = { id: Date.now().toString() + '_bot', role: 'bot', text: answer };
      setMessages(prev => [...prev, botMsg]);
    } catch (e: any) {
      setError('Could not reach the server. Make sure the API is running.');
    } finally {
      setLoading(false);
      scrollToEnd();
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons name="leaf" size={20} color={COLORS.primary} />
        </View>
        <View>
          <Text style={styles.headerTitle}>Spring Bot</Text>
          <Text style={styles.headerSub}>SPRING FRAMEWORK ASSISTANT</Text>
        </View>
        <View style={styles.headerBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.badgeText}>online</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Chat area */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={m => m.id}
          renderItem={({ item }) => <MessageBubble message={item} />}
          ListFooterComponent={
            <>
              {loading && <TypingIndicator />}
              {error && (
                <View style={styles.errorRow}>
                  <Ionicons name="alert-circle" size={14} color={COLORS.error} />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}
              <View style={{ height: 8 }} />
            </>
          }
          contentContainerStyle={styles.list}
          onContentSizeChange={scrollToEnd}
          showsVerticalScrollIndicator={false}
        />

        <ChatInput onSend={handleSend} disabled={loading} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    backgroundColor: COLORS.background,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryGlow,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  headerTitle: {
    ...FONTS.header,
    color: COLORS.text,
  },
  headerSub: {
    ...FONTS.label,
    color: COLORS.primary,
    marginTop: 1,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginLeft: 'auto',
    backgroundColor: 'rgba(109,179,63,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(109,179,63,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
  },
  badgeText: {
    ...FONTS.label,
    color: COLORS.primary,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },

  list: {
    paddingTop: 12,
  },

  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginHorizontal: 16,
    marginTop: 8,
    padding: 10,
    backgroundColor: 'rgba(248,81,73,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(248,81,73,0.2)',
    borderRadius: 10,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 13,
    flex: 1,
  },
});

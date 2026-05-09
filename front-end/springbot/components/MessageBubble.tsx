import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { decode } from 'html-entities';
import Markdown from 'react-native-markdown-display';

export type Message = {
  id: string;
  role: 'user' | 'bot';
  text: string;
};

export default function MessageBubble({ message }: { message: Message }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start();
  }, []);

  const isUser = message.role === 'user';

  // Configuration des styles spécifiques au Markdown
  const markdownStyles = {
    body: {
      ...FONTS.body,
      color: isUser ? '#D8F3DC' : COLORS.text,
    },
    // Pour que les @Entity et codes ne soient pas des gros blocs blancs
    code_inline: {
      backgroundColor: isUser ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      color: isUser ? '#FFFFFF' : COLORS.primary,
      borderRadius: 4,
      paddingHorizontal: 4,
    },
    // Pour les blocs de code (ex: interface Java)
    fence: {
      backgroundColor: '#1E1E1E',
      borderRadius: 8,
      padding: 10,
      marginVertical: 5,
    },
    code_block: { color: '#D4D4D4' },
    // Amélioration des listes
    bullet_list: { marginVertical: 5 },
    ordered_list: { marginVertical: 5 },
  };

  return (
    <Animated.View style={[
      styles.row,
      isUser ? styles.rowUser : styles.rowBot,
      { opacity, transform: [{ translateY }] },
    ]}>
      {!isUser && (
        <View style={styles.avatar}>
          <Ionicons name="leaf" size={14} color={COLORS.primary} />
        </View>
      )}

      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleBot]}>
        <Markdown style={markdownStyles}>
          {decode(message.text)}
        </Markdown>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 4,
    marginHorizontal: 12,
  },
  rowUser: { justifyContent: 'flex-end' },
  rowBot:  { justifyContent: 'flex-start' },

  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primaryGlow,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 2,
  },

  bubble: {
    maxWidth: '82%', // Un peu plus large pour le code
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  bubbleUser: {
    backgroundColor: COLORS.userBubble,
    borderWidth: 1,
    borderColor: COLORS.userBubbleBorder,
    borderBottomRightRadius: 4,
  },
  bubbleBot: {
    backgroundColor: COLORS.botBubble,
    borderWidth: 1,
    borderColor: COLORS.botBubbleBorder,
    borderBottomLeftRadius: 4,
  },
});
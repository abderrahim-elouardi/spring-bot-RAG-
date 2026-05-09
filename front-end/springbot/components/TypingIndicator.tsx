import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { COLORS } from '../constants/theme';

const DOT_SIZE = 8;
const ANIMATION_DURATION = 500;

function Dot({ delay }: { delay: number }) {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(translateY, { toValue: -6, duration: ANIMATION_DURATION, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0,  duration: ANIMATION_DURATION, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.dot, { transform: [{ translateY }] }]} />
  );
}

export default function TypingIndicator() {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Dot delay={0} />
        <Dot delay={160} />
        <Dot delay={320} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginVertical: 4,
    marginHorizontal: 12,
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.botBubble,
    borderWidth: 1,
    borderColor: COLORS.botBubbleBorder,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: COLORS.primary,
  },
});

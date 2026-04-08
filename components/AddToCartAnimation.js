import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

export default function AddToCartAnimation({ visible, onHide }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, friction: 8, useNativeDriver: true }),
      ]).start();

      setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 0.5, duration: 300, useNativeDriver: true }),
        ]).start(() => onHide());
      }, 1500);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
      <Text style={styles.icon}>✓</Text>
      <Text style={styles.text}>Adicionado ao carrinho!</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', top: '50%', left: '50%',
    marginLeft: -100, marginTop: -50,
    width: 200, backgroundColor: '#4CAF50',
    padding: 20, borderRadius: 12,
    alignItems: 'center', elevation: 10,
  },
  icon: { fontSize: 32, color: '#fff', marginBottom: 8 },
  text: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
});
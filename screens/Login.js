import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { theme } = useTheme();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Erro', 'Email inválido');
      return;
    }
    setIsLoggedIn(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Text style={styles.title}>InfnetFood</Text>
      <Text style={[styles.subtitle, { color: theme.colors.subtext }]}>Seu delivery favorito</Text>

      <TextInput
        style={[styles.input, {
          borderColor: theme.colors.inputBorder,
          backgroundColor: theme.colors.inputBg,
          color: theme.colors.inputText,
        }]}
        placeholder="Email"
        placeholderTextColor={theme.colors.subtext}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.input, {
          borderColor: theme.colors.inputBorder,
          backgroundColor: theme.colors.inputBg,
          color: theme.colors.inputText,
        }]}
        placeholder="Senha"
        placeholderTextColor={theme.colors.subtext}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6347',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FF6347',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
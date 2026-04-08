import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Alert, ActivityIndicator
} from 'react-native';
import { useState, useEffect } from 'react';
import { sendOrderNotification, requestPermissions } from '../services/notifications';
import { searchCEP } from '../services/cep';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { useTheme } from '../context/ThemeContext';

export default function Checkout({ navigation }) {
  const { cartItems, total, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { theme } = useTheme();

  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    requestPermissions();
  }, []);

  const handleSearchCEP = async () => {
    if (cep.length < 8) return;
    setLoading(true);
    const result = await searchCEP(cep);
    setLoading(false);
    if (result.success) {
      setNeighborhood(`${result.data.neighborhood}`), 
      setStreet(`${result.data.street}`),
      setCity(`${result.data.city}`),
      setState(`${result.data.state}`);
    } else {
      Alert.alert('Erro', result.error);
    }
  };

  const handleFinish = async () => {
    if (!cep || !city || !number || !paymentMethod || !neighborhood || !street || !state) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }
    addOrder(cartItems, total);

    await sendOrderNotification('confirmed');
    setTimeout(() => sendOrderNotification('preparing'), 5000);
    setTimeout(() => sendOrderNotification('onTheWay'), 10000);
    setTimeout(() => sendOrderNotification('delivered'), 15000);
    clearCart();

    Alert.alert(
      'Pedido Confirmado!',
      'Seu pedido foi realizado com sucesso. Acompanhe o status na aba Pedidos.',
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.getParent()?.navigate('HomeTab');
          },
        },
      ]
    );
  };

  const inputStyle = [styles.input, {
    borderColor: theme.colors.inputBorder,
    backgroundColor: theme.colors.inputBg,
    color: theme.colors.inputText,
  }];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Finalizar Pedido</Text>

      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Resumo do Pedido</Text>
        {cartItems.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={{ color: theme.colors.text }}>{item.quantity}x {item.name}</Text>
            <Text style={{ color: theme.colors.text }}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
        <View style={[styles.totalRow, { borderTopColor: theme.colors.border }]}>
          <Text style={[styles.totalLabel, { color: theme.colors.text }]}>Total:</Text>
          <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Endereço de Entrega *</Text>
        <View style={styles.cepRow}>
          <TextInput
            style={[inputStyle, { flex: 1 }]}
            placeholder="CEP"
            placeholderTextColor={theme.colors.subtext}
            value={cep}
            onChangeText={setCep}
            keyboardType="numeric"
            maxLength={8}
          />
          <TouchableOpacity style={styles.cepButton} onPress={handleSearchCEP} disabled={loading}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.cepButtonText}>Buscar</Text>
            }
          </TouchableOpacity>
        </View>
        <TextInput
          style={inputStyle}
          placeholder="Cidade"
          placeholderTextColor={theme.colors.subtext}
          value={city}
          onChangeText={setCity}
        />
         <TextInput
          style={inputStyle}
          placeholder="Estado"
          placeholderTextColor={theme.colors.subtext}
          value={state}
          onChangeText={setState}
        />
          <TextInput
          style={inputStyle}
          placeholder="Rua"
          placeholderTextColor={theme.colors.subtext}
          value={street}
          onChangeText={setStreet}
        />
          <TextInput
          style={inputStyle}
          placeholder="Bairro"
          placeholderTextColor={theme.colors.subtext}
          value={neighborhood}
          onChangeText={setNeighborhood}
        />
        <TextInput
          style={inputStyle}
          placeholder="Número *"
          placeholderTextColor={theme.colors.subtext}
          value={number}
          onChangeText={setNumber}
          keyboardType="numeric"
        />
        <TextInput
          style={inputStyle}
          placeholder="Complemento (opcional)"
          placeholderTextColor={theme.colors.subtext}
          value={complement}
          onChangeText={setComplement}
        />
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Forma de Pagamento *</Text>
        {['Cartão', 'Dinheiro', 'PIX'].map((method, idx) => {
          const icons = ['💳', '💵', '📱'];
          const labels = ['Cartão de Crédito/Débito', 'Dinheiro', 'PIX'];
          return (
            <TouchableOpacity
              key={method}
              style={[
                styles.paymentOption,
                { borderColor: theme.colors.inputBorder },
                paymentMethod === method && styles.selectedPayment,
              ]}
              onPress={() => setPaymentMethod(method)}
            >
              <Text style={{ color: theme.colors.text }}>{icons[idx]} {labels[idx]}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}>Confirmar Pedido</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, marginTop: 10 },
  section: { padding: 16, borderRadius: 12, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  item: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  totalRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginTop: 12, paddingTop: 12, borderTopWidth: 1,
  },
  totalLabel: { fontSize: 18, fontWeight: 'bold' },
  totalValue: { fontSize: 20, fontWeight: 'bold', color: '#FF6347' },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, fontSize: 16, marginBottom: 12 },
  cepRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  cepButton: {
    backgroundColor: '#FF6347', padding: 12, borderRadius: 8,
    justifyContent: 'center', alignItems: 'center', minWidth: 80,
  },
  cepButtonText: { color: '#fff', fontWeight: 'bold' },
  paymentOption: { padding: 16, borderWidth: 1, borderRadius: 8, marginBottom: 8 },
  selectedPayment: { borderColor: '#FF6347', backgroundColor: '#FF6347' },
  button: {
    backgroundColor: '#FF6347', padding: 16,
    borderRadius: 8, alignItems: 'center', marginBottom: 40,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
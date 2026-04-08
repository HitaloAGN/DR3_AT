import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useOrders } from '../context/OrdersContext';
import { useTheme } from '../context/ThemeContext';

export default function Orders() {
  const { orders } = useOrders();
  const { theme } = useTheme();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Entregue': return '#4CAF50';
      case 'Em preparo': return '#FF9800';
      case 'A caminho': return '#2196F3';
      case 'Confirmado': return '#9C27B0';
      default: return '#666';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Meus Pedidos</Text>
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={{ fontSize: 48 }}>📋</Text>
          <Text style={[styles.emptyText, { color: theme.colors.subtext }]}>
            Nenhum pedido realizado
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
              <View style={styles.header}>
                <Text style={[styles.orderId, { color: theme.colors.text }]}>
                  Pedido #{item.id.length > 6 ? item.id.slice(-6) : item.id}
                </Text>
                <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
                  {item.status}
                </Text>
              </View>
              <Text style={[styles.dateText, { color: theme.colors.subtext }]}>{item.date}</Text>
              {item.items.map((product, index) => (
                <Text key={index} style={[styles.item, { color: theme.colors.inputText }]}>
                  • {product}
                </Text>
              ))}
              <Text style={styles.total}>Total: R$ {item.total.toFixed(2)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, marginTop: 10 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  emptyText: { fontSize: 18 },
  card: { padding: 16, borderRadius: 12, marginBottom: 12, elevation: 2 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  orderId: { fontSize: 16, fontWeight: 'bold' },
  status: { fontSize: 14, fontWeight: '600' },
  dateText: { fontSize: 14, marginBottom: 12 },
  item: { fontSize: 14, marginBottom: 4 },
  total: { fontSize: 18, fontWeight: 'bold', color: '#FF6347', marginTop: 12 },
});
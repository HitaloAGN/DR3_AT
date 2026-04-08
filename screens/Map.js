import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from '../context/ThemeContext';

const restaurants = [
  { id: '1', name: 'Burger House', lat: -22.9035, lng: -43.2096, cuisine: 'Lanches' },
  { id: '2', name: 'Pizza Express', lat: -22.9068, lng: -43.1729, cuisine: 'Pizzas' },
  { id: '3', name: 'Sushi Master', lat: -22.9099, lng: -43.2095, cuisine: 'Japonês' },
  { id: '4', name: 'Açaí da Praia', lat: -22.9110, lng: -43.2055, cuisine: 'Açaí' },
  { id: '5', name: 'Doce Sabor', lat: -22.9028, lng: -43.2073, cuisine: 'Sobremesas' },
  { id: '6', name: 'Burger King', lat: -22.9088, lng: -43.1968, cuisine: 'Lanches' },
  { id: '7', name: "McDonald's", lat: -22.9045, lng: -43.2080, cuisine: 'Lanches' },
  { id: '8', name: 'Subway', lat: -22.9055, lng: -43.2015, cuisine: 'Lanches' },
  { id: '9', name: 'KFC', lat: -22.9078, lng: -43.2100, cuisine: 'Lanches' },
  { id: '10', name: "Bob's", lat: -22.9020, lng: -43.2060, cuisine: 'Lanches' },
];

export default function Map({ navigation }) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -22.9068,
          longitude: -43.2000,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {restaurants.map(restaurant => (
          <Marker
            key={restaurant.id}
            coordinate={{ latitude: restaurant.lat, longitude: restaurant.lng }}
            title={restaurant.name}
            description={restaurant.cuisine}
            onPress={() => navigation.navigate('RestaurantDetails', { restaurant })}
          />
        ))}
      </MapView>

      <View style={[styles.listContainer, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.listTitle, { color: theme.colors.text }]}>Restaurantes Próximos</Text>
        <FlatList
          horizontal
          data={restaurants}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, { backgroundColor: theme.colors.background }]}
              onPress={() => navigation.navigate('RestaurantDetails', { restaurant: item })}
            >
              <Text style={[styles.restaurantName, { color: theme.colors.text }]}>{item.name}</Text>
              <Text style={[styles.cuisine, { color: theme.colors.subtext }]}>{item.cuisine}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  listContainer: {
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
  },
  listTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  card: { padding: 16, borderRadius: 12, marginRight: 12, minWidth: 150 },
  restaurantName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  cuisine: { fontSize: 14 },
});
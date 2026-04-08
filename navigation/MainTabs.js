import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

import Home from '../screens/Home';
import Products from '../screens/Products';
import ProductDetails from '../screens/ProductDetails';
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';
import Profile from '../screens/Profile';
import Orders from '../screens/Orders';
import Map from '../screens/Map';
import RestaurantDetails from '../screens/RestaurantDetails';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ThemeStack({ children }) {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          color: theme.colors.text,
        },
      }}
    >
      {children}
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <ThemeStack>
      <Stack.Screen name="HomeScreen" component={Home} options={{ title: 'InfnetFood' }} />
      <Stack.Screen name="Products" component={Products} options={{ title: 'Produtos' }} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ title: 'Detalhes' }} />
    </ThemeStack>
  );
}

function CartStack() {
  return (
    <ThemeStack>
      <Stack.Screen name="CartScreen" component={Cart} options={{ title: 'Carrinho' }} />
      <Stack.Screen name="Checkout" component={Checkout} options={{ title: 'Finalizar Pedido' }} />
    </ThemeStack>
  );
}

function MapStack() {
  return (
    <ThemeStack>
      <Stack.Screen name="MapScreen" component={Map} options={{ title: 'Restaurantes' }} />
      <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} options={{ title: 'Detalhes' }} />
    </ThemeStack>
  );
}

function OrdersStack() {
  return (
    <ThemeStack>
      <Stack.Screen name="OrdersScreen" component={Orders} options={{ title: 'Meus Pedidos' }} />
    </ThemeStack>
  );
}

function ProfileStack() {
  return (
    <ThemeStack>
      <Stack.Screen name="ProfileScreen" component={Profile} options={{ title: 'Meu Perfil' }} />
    </ThemeStack>
  );
}

function SettingsStack() {
  return (
    <ThemeStack>
      <Stack.Screen name="SettingsScreen" component={Settings} options={{ title: 'Configurações' }} />
    </ThemeStack>
  );
}

export default function MainTabs() {
  const { theme } = useTheme();
  const { itemCount } = useCart();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6347',
        tabBarInactiveTintColor: theme.colors.subtext,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 11,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="MapTab"
        component={MapStack}
        options={{
          tabBarLabel: 'Mapa',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🗺️</Text>,
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartStack}
        options={{
          tabBarLabel: 'Carrinho',
          tabBarIcon: ({ color }) => (
            <View>
              <Text style={{ fontSize: 20, color }}>🛒</Text>
              {itemCount > 0 && (
                <View style={{
                  position: 'absolute',
                  top: -4,
                  right: -8,
                  backgroundColor: '#FF6347',
                  borderRadius: 8,
                  minWidth: 16,
                  height: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 3,
                }}>
                  <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>
                    {itemCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersStack}
        options={{
          tabBarLabel: 'Pedidos',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📋</Text>,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>👤</Text>,
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Config',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>⚙️</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
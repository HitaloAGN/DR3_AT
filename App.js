import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import Login from './screens/Login';
import MainTabs from './navigation/MainTabs';
import { ThemeProvider } from './context/ThemeContext';
import { OrdersProvider } from './context/OrdersContext';
import { CartProvider } from './context/CartContext';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ThemeProvider>
      <OrdersProvider>
        <CartProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {!isLoggedIn ? (
                <Stack.Screen name="Login">
                  {props => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
                </Stack.Screen>
              ) : (
                <Stack.Screen name="Main" component={MainTabs} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </CartProvider>
      </OrdersProvider>
    </ThemeProvider>
  );
}
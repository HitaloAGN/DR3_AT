import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function sendOrderNotification(status) {
  const messages = {
    confirmed: '✅ Pedido confirmado! Preparando seu pedido...',
    preparing: '👨‍🍳 Seu pedido está sendo preparado',
    onTheWay: '🚗 Pedido a caminho! Chegando em breve',
    delivered: '🎉 Pedido entregue! Bom apetite!',
  };

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'InfnetFood',
      body: messages[status] || 'Atualização do seu pedido',
      data: { status },
    },
    trigger: null,
  });
}

export async function requestPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}
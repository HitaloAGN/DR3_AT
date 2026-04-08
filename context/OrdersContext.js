import { createContext, useContext, useState } from 'react';

const OrdersContext = createContext();

const initialOrders = [
  {
    id: '1',
    date: '15/12/2025',
    items: ['2x X-Burger', '1x Coca-Cola'],
    total: 57.80,
    status: 'Entregue',
  },
  {
    id: '2',
    date: '05/04/2026',
    items: ['1x Pizza Margherita', '2x Guaraná'],
    total: 48.00,
    status: 'Em preparo',
  },
  {
    id: '3',
    date: '02/03/2026',
    items: ['3x Açaí 500ml'],
    total: 45.00,
    status: 'A caminho',
  },
];

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(initialOrders);

  function addOrder(items, total) {
    const now = new Date();
    const date = now.toLocaleDateString('pt-BR');
    const newOrder = {
      id: String(Date.now()),
      date,
      items: items.map(i => `${i.quantity}x ${i.name}`),
      total,
      status: 'Confirmado',
    };

    setOrders(prev => [newOrder, ...prev]);

    setTimeout(() => {
      setOrders(prev =>
        prev.map(o => o.id === newOrder.id ? { ...o, status: 'Em preparo' } : o)
      );
    }, 5000);

    setTimeout(() => {
      setOrders(prev =>
        prev.map(o => o.id === newOrder.id ? { ...o, status: 'A caminho' } : o)
      );
    }, 10000);

    setTimeout(() => {
      setOrders(prev =>
        prev.map(o => o.id === newOrder.id ? { ...o, status: 'Entregue' } : o)
      );
    }, 15000);

    return newOrder.id;
  }

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}
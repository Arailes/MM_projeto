import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = '/api'; // Ajuste para a URL do backend se necessário

interface Order {
  price: string;
  quantity: number;
}

export default function App() {
  const [bids, setBids] = useState<Order[]>([]);
  const [asks, setAsks] = useState<Order[]>([]);
  const [type, setType] = useState<'bid' | 'ask'>('bid');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const fetchOrders = async () => {
    try {
      const bidsRes = await axios.get(`${API_URL}/orders?type=bid`);
      const asksRes = await axios.get(`${API_URL}/orders?type=ask`);
      setBids(Object.entries(bidsRes.data).map(([price, quantity]) => ({ price, quantity })));
      setAsks(Object.entries(asksRes.data).map(([price, quantity]) => ({ price, quantity })));
    } catch (e) {
      setMessage('Erro ao buscar ordens');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAddOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/add-order`, { type, price, quantity });
      setMessage('Ordem adicionada!');
      setPrice('');
      setQuantity(1);
      fetchOrders();
    } catch (e) {
      setMessage('Erro ao adicionar ordem');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Order Book</h1>
      <form onSubmit={handleAddOrder} style={{ marginBottom: 20 }}>
        <select value={type} onChange={e => setType(e.target.value as 'bid' | 'ask')}>
          <option value="bid">Bid</option>
          <option value="ask">Ask</option>
        </select>
        <input
          type="text"
          placeholder="Preço"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantity}
          min={1}
          onChange={e => setQuantity(Number(e.target.value))}
          required
        />
        <button type="submit">Adicionar Ordem</button>
      </form>
      {message && <div style={{ color: 'green', marginBottom: 10 }}>{message}</div>}
      <div style={{ display: 'flex', gap: 40 }}>
        <div>
          <h2>Bids</h2>
          <ul>
            {bids.map((o, i) => (
              <li key={i}>Preço: {o.price} | Qtd: {o.quantity}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Asks</h2>
          <ul>
            {asks.map((o, i) => (
              <li key={i}>Preço: {o.price} | Qtd: {o.quantity}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

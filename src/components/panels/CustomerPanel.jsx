import React, { useState } from 'react';
import './CustomerPanel.css'

const CustomerPanel = ({ orders, onTakeOrder }) => {
  const [orderTitle, setOrderTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleConfirmOrder = async () => {
    if (!orderTitle) {
      setMessage('Будь ласка, введіть назву замовлення.');
      return;
    }

    const matchingOrder = orders.find(
      (order) => order.title.toLowerCase() === orderTitle.toLowerCase()
    );

    if (matchingOrder) {
      try {
        await onTakeOrder(matchingOrder.id);
        setMessage(`Замовлення "${matchingOrder.title}" успішно підтверджено.`);
      } catch (error) {
        setMessage(`Помилка підтвердження замовлення: ${error.message}`);
      }
    } else {
      setMessage(`Замовлення з назвою "${orderTitle}" не знайдено.`);
    }
  };

  return (
    <section className="customer-panel">
      <h1>Панель Клієнта</h1>

      <div className="customer-panel-section">
        <label htmlFor="orderTitle" className="customer-panel-label">
          Введіть назву замовлення:
          <input
            id="orderTitle"
            type="text"
            className="customer-panel-input"
            value={orderTitle}
            onChange={(e) => setOrderTitle(e.target.value)}
            placeholder="Назва замовлення"
          />
        </label>
        <button className="customer-panel-button" onClick={handleConfirmOrder}>
          Підтвердити замовлення
        </button>
      </div>

      {/* Повідомлення */}
      {message && <p className="customer-panel-message">{message}</p>}
    </section>
  );
};

export default CustomerPanel;

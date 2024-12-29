import React, {useEffect, useState} from "react";
import './App.css'
import RoleSelector from "./components/roleHandler/RoleSelector.jsx";
import OrderList from "./components/order/OrderList.jsx";
import RoleControlPanel from "./components/roleHandler/RoleControlPanel.jsx";
import axios from "axios";

function App() {
  const [activeRole, setActiveRole] = useState(localStorage.getItem('role') || 'customer');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshOrders, setRefreshOrders] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/lab9/orders/getAll');
        setOrders(response.data);
      } catch (err) {
        setError(err.message || 'Помилка при завантаженні даних');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [refreshOrders]);

  const handleRoleChange = (role) => {
    localStorage.setItem('role', role);
    setActiveRole(role);
  };

  const handleTakeOrder = async (orderId) => {
    try {
      const response = await axios.put(`http://localhost:8080/lab9/customers/takeOrder/${orderId}`);
      console.log(`Замовлення з ID ${orderId} підтверджено:`, response.data);
      setRefreshOrders((prev) => !prev);
    } catch (error) {
      console.error(`Помилка підтвердження замовлення: ${error.response?.data || error.message}`);
      alert(`Не вдалося підтвердити замовлення: ${error.response?.data || error.message}`);
    }
  };

  return (
    <>
      <header>
        <RoleSelector activeRole={activeRole} onRoleChange={handleRoleChange} />
      </header>
      <main>
        <RoleControlPanel
          orders={orders}
          activeRole={activeRole}
          onRoleChange={handleRoleChange}
          onTakeOrder={handleTakeOrder}
        />
        {loading && <p>Завантаження замовлень...</p>}
        {error && <p>Помилка: {error}</p>}
        <OrderList orders={orders} activeRole={activeRole} />
      </main>
    </>
  );

}

export default App

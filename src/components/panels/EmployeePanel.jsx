import React, { useState } from 'react';
import axios from 'axios';
import './EmployeePanel.css'

const EmployeePanel = () => {
  const [orderId, setOrderId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [message, setMessage] = useState('');

  const checkEmployeeExists = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/lab9/employees/get/${employeeId}`)
      return response.data
    } catch (e) {
      return null
    }
  }

  const handleConfirmOrder = async () => {
    if (!orderId) {
      setMessage("Введіть ID замовлення")
      return;
    }

    const employee = await checkEmployeeExists()
    if (!employee) {
      setMessage(`Працівник з ID ${employeeId} не знайдений.`)
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/lab9/orders/get/${orderId}`)
      const { data: order } = response;

      if (order.status === 'COMPLETED') {
        setMessage(`Замовлення з ID ${orderId} вже підтверджено`)
      } else {
        await axios.put(`http://localhost:8080/lab9/employees/confirm/order/${orderId}`)
        setMessage(`Замовлення з ID ${orderId} було успішно підтверджено.`)
      }

    } catch (e) {
      setMessage(`Помилка: ${e.response?.data || "Замовлення не знайдено."}`)
    }
  }

  return (
    <section>
      <h1>Панель працівника:</h1>
      <div className={'employee-container'}>
        <label htmlFor="employeeId">
          ID працівника:
          <input
            id="employeeId"
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="1"
          />
        </label>

        <label htmlFor="orderId">
          Підтвердження замовлення за ID:
          <input
            id="orderId"
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="1"
          />
        </label>
        <button className={'role-btn'} onClick={handleConfirmOrder}>
          Підтвердити замовлення
        </button>
        {message && <p>{message}</p>}
      </div>
    </section>
  );
};

export default EmployeePanel;

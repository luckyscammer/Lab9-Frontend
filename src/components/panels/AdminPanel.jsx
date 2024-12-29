import React, { useState } from 'react';
import './AdminPanel.css'
import axios from "axios";

const AdminPanelForm = () => {
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({});
  const [deleteId, setDeleteId] = useState('');
  const [message, setMessage] = useState('');
  const [deleteType, setDeleteType] = useState('')

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderFields = () => {
    switch (role) {
      case 'order':
        return (
          <>
            <label className="admin-panel-label">
              Назва:
              <input
                className="admin-panel-input"
                type="text"
                name="title"
                onChange={handleInputChange}
                placeholder="Введіть назву"
              />
            </label>
            <label className="admin-panel-label">
              Опис:
              <input
                className="admin-panel-input"
                type="text"
                name="description"
                onChange={handleInputChange}
                placeholder="Введіть опис"
              />
            </label>
            <label className="admin-panel-label">
              Категорія:
              <input
                className="admin-panel-input"
                type="text"
                name="category"
                onChange={handleInputChange}
                placeholder="Введіть категорію"
              />
            </label>
          </>
        );
      case 'customer':
        return (
          <>
            <label className="admin-panel-label">
              Ім'я:
              <input
                className="admin-panel-input"
                type="text"
                name="name"
                onChange={handleInputChange}
                placeholder="Введіть ім'я"
              />
            </label>
            <label className="admin-panel-label">
              Електронна пошта:
              <input
                className="admin-panel-input"
                type="email"
                name="email"
                onChange={handleInputChange}
                placeholder="Введіть електронну пошту"
              />
            </label>
          </>
        );
      case 'admin':
        return (
          <>
            <label className="admin-panel-label">
              Ім'я:
              <input
                className="admin-panel-input"
                type="text"
                name="name"
                onChange={handleInputChange}
                placeholder="Введіть ім'я"
              />
            </label>
            <label className="admin-panel-label">
              Пароль:
              <input
                className="admin-panel-input"
                type="text"
                name="password"
                onChange={handleInputChange}
                placeholder="Введіть пароль"
              />
            </label>
          </>
        );
      case 'employee':
        return (
          <>
            <label className="admin-panel-label">
              Ім'я:
              <input
                className="admin-panel-input"
                type="text"
                name="name"
                onChange={handleInputChange}
                placeholder="Введіть ім'я"
              />
            </label>
            <label className="admin-panel-label">
              Прізвище:
              <input
                className="admin-panel-input"
                type="text"
                name="surname"
                onChange={handleInputChange}
                placeholder="Введіть прізвище"
              />
            </label>
            <label className="admin-panel-label">
              Компанія:
              <input
                className="admin-panel-input"
                type="text"
                name="company"
                onChange={handleInputChange}
                placeholder="Введіть компанію"
              />
            </label>
            <label className="admin-panel-label">
              Пошта:
              <input
                className="admin-panel-input"
                type="text"
                name="email"
                onChange={handleInputChange}
                placeholder="Введіть пошту"
              />
            </label>
          </>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      setMessage("Будь ласка, виберіть роль для створення.");
      return;
    }

    const urlMap = {
      admin: "http://localhost:8080/lab9/admins/create",
      customer: "http://localhost:8080/lab9/admins/create/customer",
      employee: "http://localhost:8080/lab9/admins/create/employee",
      order: "http://localhost:8080/lab9/admins/create/order",
    };

    try {
      const response = await axios.post(urlMap[role], formData);
      setMessage(`Запис типу ${role} успішно створено.`);
    } catch (error) {
      setMessage(`Помилка створення запису: ${error.response?.data || error.message}`);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!deleteType || !deleteId) {
      setMessage('Будь ласка, виберіть тип запису та введіть ID.');
      return;
    }

    try {
      const urlMap = {
        admin: `http://localhost:8080/lab9/admins/delete/${deleteId}`,
        customer: `http://localhost:8080/lab9/admins/delete/customer/${deleteId}`,
        employee: `http://localhost:8080/lab9/admins/delete/employee/${deleteId}`,
        order: `http://localhost:8080/lab9/admins/delete/order/${deleteId}`,
      };

      const response = await axios.delete(urlMap[deleteType]);
      setMessage(`Запис типу ${deleteType} з ID ${deleteId} успішно видалено.`);
    } catch (error) {
      setMessage(`Помилка: ${error.response?.data || 'Не вдалося видалити запис.'}`);
    }
  };

  return (
    <section>
      <h1>Панель адміністратора:</h1>
      <div className={'admin-container'}>
        <h2>Створення записів</h2>
        <form className="admin-panel-form" onSubmit={handleSubmit}>
          <label className="admin-panel-label">
            Роль:
            <select
              className="admin-panel-input"
              name="role"
              onChange={handleRoleChange}
            >
              <option value="">-- Виберіть роль --</option>
              <option value="admin">Адмін</option>
              <option value="customer">Клієнт</option>
              <option value="employee">Працівник</option>
              <option value="order">Замовлення</option>
            </select>
          </label>
          {renderFields()}
          {role && <button className="admin-panel-button" type="submit">Створити</button>}
        </form>

        <h2>Видалення записів</h2>
        <form className="admin-panel-form" onSubmit={handleDelete}>
          <label className="admin-panel-label">
            Тип запису:
            <select
              className="admin-panel-input"
              name="deleteType"
              value={deleteType}
              onChange={(e) => setDeleteType(e.target.value)}
            >
              <option value="">-- Виберіть тип запису --</option>
              <option value="admin">Адмін</option>
              <option value="customer">Клієнт</option>
              <option value="employee">Працівник</option>
              <option value="order">Замовлення</option>
            </select>
          </label>
          <label className="admin-panel-label">
            Введіть ID для видалення:
            <input
              className="admin-panel-input"
              type="text"
              name="deleteId"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
              placeholder="Введіть ID"
            />
          </label>
          <button className="admin-panel-button" type="submit">Видалити</button>
        </form>

        {message && <p className="admin-panel-message">{message}</p>}
      </div>
    </section>

  );
};

export default AdminPanelForm;

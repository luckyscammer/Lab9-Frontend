import React from 'react';
import './RoleSelector.css';

const RoleSelector = ({ activeRole, onRoleChange }) => {
  return (
    <section>
      <h1>Виберіть роль:</h1>
      <div id="buttons">
        <button
          className={`role-btn ${activeRole === 'admin' ? 'active' : ''}`}
          onClick={() => onRoleChange('admin')}
        >
          Адміністратор
        </button>
        <button
          className={`role-btn ${activeRole === 'employer' ? 'active' : ''}`}
          onClick={() => onRoleChange('employer')}
        >
          Емплойер
        </button>
        <button
          className={`role-btn ${activeRole === 'customer' ? 'active' : ''}`}
          onClick={() => onRoleChange('customer')}
        >
          Користувач
        </button>
      </div>
    </section>
  );
};

export default RoleSelector;

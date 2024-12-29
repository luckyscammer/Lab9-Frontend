import './RoleSelector.css'
import AdminPanel from "../panels/AdminPanel.jsx";
import EmployeePanel from "../panels/EmployeePanel.jsx";
import CustomerPanel from "../panels/CustomerPanel.jsx";

const RoleControlPanel = ({ orders, activeRole, onTakeOrder }) => {
  if (activeRole === 'admin') return <AdminPanel />;
  if (activeRole === 'employer') return <EmployeePanel />;
  return <CustomerPanel orders={orders} onTakeOrder={onTakeOrder} />;
}

export default RoleControlPanel
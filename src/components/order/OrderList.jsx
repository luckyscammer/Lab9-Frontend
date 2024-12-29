import './OrderList.css';

const OrderList = ({ orders, activeRole }) => {
  // console.log(orders)
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Список замовлень</h1>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className={`order-card ${order.status.toLowerCase()}`}>
              {activeRole !== 'customer' && <p>id: {order.id}</p>}
              <h2>{order.title}</h2>
              <p>{order.description}</p>
              <p><strong>Категорія:</strong> {order.category}</p>
              <p><strong>Статус:</strong> {order.status}</p>
            </div>
          ))
        ) : (
          <p>Замовлень не знайдено</p>
        )}
      </div>
    </>
  );
};

export default OrderList;

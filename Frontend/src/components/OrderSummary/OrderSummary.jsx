import { useNavigate } from "react-router-dom";
import "./styles.css";

function OrderSummary({ orderItems, onClose }) {  
  const totalPrice = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalItems = orderItems.reduce((total, item) => total + item.quantity, 0);

  const navigate = useNavigate();
  const handlePlaceOrderClick = () => {
    navigate("/place-order", { state: { orderItems } });
  };

  return (
    <>
      <div className="order-summary-overlay" onClick={onClose}>
        <div className="order-summary-modal" onClick={(event) => event.stopPropagation()}>
          <button className="order-summary-close" onClick={onClose} aria-label="Close order summary">
            ×
          </button>

          <h2>Order Summary</h2>

          {orderItems.length === 0 ? (
            <p className="empty-summary">Your order is empty. Add a few items to get started.</p>
          ) : (
            <>
              <div className="summary-items">
                {orderItems.map((item) => (
                  <div className="summary-item" key={item.id}>
                    <div>
                      <p className="summary-item-name">{item.name}</p>
                      <p className="summary-item-meta">{item.quantity} × ${item.price.toFixed(2)}</p>
                    </div>
                    <span className="summary-item-total">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="summary-total-row">
                <span>
                  {totalItems} item{totalItems !== 1 ? "s" : ""}
                </span>
                <strong>Total: ${totalPrice.toFixed(2)}</strong>
              </div>
            </>
          )}

          <button className="place-order-btn" onClick={handlePlaceOrderClick} type="button">
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderSummary;
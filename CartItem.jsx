import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const parseCost = (cost) => parseFloat(String(cost).replace('$', ''));

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const calculateItemTotal = (item) => parseCost(item.cost) * item.quantity;
  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + calculateItemTotal(item), 0);

  const handleIncrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => dispatch(removeItem(item.name));
  const handleCheckoutShopping = () => alert('Coming Soon');

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      {cart.map((item) => (
        <div className="cart-item" key={item.name}>
          <img src={item.image} alt={item.name} />
          <div style={{ flex: 1 }}>
            <h3>{item.name}</h3>
            <p>Unit price: {item.cost}</p>
            <div className="cart-item-quantity">
              <button onClick={() => handleDecrement(item)}>-</button>
              <span style={{ margin: '0 10px' }}>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <p>Subtotal: ${calculateItemTotal(item).toFixed(2)}</p>
          </div>
          <button onClick={() => handleRemove(item)}>Delete</button>
        </div>
      ))}
      <div style={{ marginTop: 20 }}>
        <button className="continue_shopping_btn" onClick={onContinueShopping}>Continue Shopping</button>
        <button className="continue_shopping_btn" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;

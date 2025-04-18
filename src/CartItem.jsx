import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + Number(item.cost.substring(1)) * item.quantity, 0).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // Increment the quantity of an item
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement the quantity of an item (prevent going below 1)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  // Remove an item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (Number(item.cost.substring(1)) * item.quantity).toFixed(2);
  };

  // Handle checkout button click
  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    setShowModal(true); // Show the modal
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="cart-container">
      {/* Total Cart Amount */}
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>

      {/* Cart Items */}
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Shopping and Checkout Buttons */}
      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount"></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>
          Checkout
        </button>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Checkout</h2>
            <p>Functionality to be added for future reference.</p>
            <button className="modal-close-button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;



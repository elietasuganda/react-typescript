import React from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartProps {
  cart: { product: Product; quantity: number}[];
}

const Cart: React.FC<CartProps> = ({ cart }) => {
  const totalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => {
                console.log(item.product.image);
            
            return (
              <li key={item.product.id}>
                <img src={item.product.image} alt={item.product.title} width={50} />
                <p>{item.product.title}</p>
                <p>Price: ${item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${item.product.price * item.quantity}</p>
              </li>
            );
            })}
          </ul>
          <h3>Total Amount: ${totalAmount}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
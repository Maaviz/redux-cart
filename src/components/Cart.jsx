import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";



const Cart = () => {
  const { cartItems , subtotal, tax, total, shipping} = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const increment = (id) => {
    dispatch({
      type: "addToCart",
      payload:{id},
    })
    
    dispatch({ type: "calculatePrice" })
   };
  const decrement = (id) => {
     dispatch({
      type: "decrement",
      payload:id,
     })
    dispatch({ type: "calculatePrice" })
    
   };
  const deleteHandler = (id) => { 
    
     dispatch({
      type: "deleteFromCart",
      payload:id,
     })
    dispatch({ type: "calculatePrice" })
    
  };







  return (
  
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i) => (
            <CartItem
              name={i.name}
              id={i.id}
              price={i.price}
              qty={i.quantity}
              imgSrc={i.imgSrc}
              key={i.id}
              increment={increment}
              decrement={decrement}
              deleteHandler={deleteHandler}
            />
          ))
        ) : (
          <h1>No Items Yet</h1>
        )} ;
      </main>
      <aside>
        <h2>Subtotal: ${subtotal}</h2>
        <h2>Shipping: ${shipping}</h2>
        <h2>Tax: ${tax}</h2>
        <h2>Total: ${total}</h2>
      </aside>
      </div>
    
  );
};


const CartItem = ({
  name,
  id,
  price,
  qty,
  imgSrc,
  increment,
  decrement,
  deleteHandler,
}) => (
  <div className="cartItem">
    <img src={imgSrc} alt={name} />
    <article>
      <h3>{name}</h3>
      <p>${price}</p>
    </article>

    <div>
      <button onClick={() => increment(id)}>+</button>
      <p>{qty}</p>
      <button onClick={() => decrement(id)}> -</button>
    </div>

    <AiFillDelete onClick={() => deleteHandler(id)} />
  </div>
);

export default Cart;

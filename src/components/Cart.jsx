import React, {useRef} from 'react'
import { Link } from "react-router-dom";
import {AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping} from 'react-icons/ai';
import {TiDeleteOutline} from 'react-icons/ti';
import getStripe from '../api/getStripe';
import toast from 'react-hot-toast';
import axios from 'axios';

import { useStateContext } from '../context/StateContext';

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const Cart = () => {
  const cartRef = useRef();
  const {totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove} = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await axios.post('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    }).then(response => {
      if(response.statusCode === 500) return;
    
      const data = response.data;
    
      toast.loading('Redirecting...');
    
      stripe.redirectToCheckout({ sessionId: data.id });
    })
    .catch((e) => {
      toast.error('Upload Failed: ' + e )
    })
  
  }

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button type='button' className='cart-heading' onClick={()=> setShowCart(false)}>
          <AiOutlineLeft/>
          <span className='heading'> Your Cart </span>
          <span className='cart-num-items'> ({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'> 
          <AiOutlineShopping size={150} />
          <h3> Your Shopping Bag is Empty</h3> 
          <Link to={`/`}>
            <button type='button' onClick={() => setShowCart(false)} className="btn"> Continue Shopping</button>
            </Link> 
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item, index)=> (
              <div className='product' key={item.id}> 
                <img src={item?.image} className="cart-product-image"></img>
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className='flex bottom'>
                    <div>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={()=> toggleCartItemQuantity(item.id, 'dec')}>
                            <AiOutlineMinus/>
                        </span>
                        <span className='num' onClick="">
                            {item.quantity}
                        </span>
                        <span className='plus' onClick={()=> toggleCartItemQuantity(item.id, 'inc')}>
                            <AiOutlinePlus/>
                        </span>
                      </p>
                    </div>
                    <button type='button' className='remove-item' onClick={() =>{
                      if (window.confirm("Do you really want to remove this?")) {
                        onRemove(item)
                      }
                    }}>
                        <TiDeleteOutline/>
                    </button>
                  </div>
                </div>
              </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal</h3>
              <h3>{formatter.format(totalPrice)}</h3>
             </div> 
             <div className='btn-container'>
              <button type='button' className='btn' onClick={handleCheckout}> Proceed to Checkout</button>
            </div> 
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
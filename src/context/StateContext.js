import React, {createContext, useContext, useState, useEffect} from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) => {
   const [showCart, setShowCart] = useState(false);
   const [cartItems, setCartItems] = useState([]);
   const [totalPrice, setTotalPrice] = useState(0);
   const [totalQuantities, setTotalQuantities] = useState(0);
   const [qty, setQty] = useState(1);

   let foundProduct;
   let index;

   const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item.id === product.id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if(checkProductInCart) {

        const updatedCartItems = cartItems.map((cartProduct)=> {
            if (cartProduct.id === product.id) return {
                ...cartProduct, 
                quantity: cartProduct.quantity + quantity
            }
        })

        setCartItems(updatedCartItems);
    } else {
        product.quantity = quantity;
        setCartItems([...cartItems, {...product}]);
    }
    toast.success(`${qty} ${product.name} was added to your cart.`);
   }

   const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item.id === product.id);
    const newCartItems = cartItems.filter((item) => item.id !== product.id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
   }

   const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item.id === id);
    index = cartItems.findIndex((product) => product.id === id);

    if(value === 'inc') {
        cartItems.splice(index, 1, {
            ...foundProduct,
            quantity: foundProduct.quantity + 1,
          });
        setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
        if(foundProduct.quantity > 1) {
            cartItems.splice(index, 1, {
                ...foundProduct,
                quantity: foundProduct.quantity - 1,
              });
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
        }
    }
   }

   const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
   }

   const decreaseQty = () => {
    setQty((prevQty) => {
        if(prevQty - 1 < 1) return 1;

        return prevQty - 1
    });
   }

   return (
    <Context.Provider
        value = {{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            increaseQty,
            decreaseQty,
            onAdd,
            setShowCart, 
            toggleCartItemQuantity,
            onRemove
        }}
    >
        {children}
    </Context.Provider>
   )
}

export const useStateContext = () => useContext(Context);
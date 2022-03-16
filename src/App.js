import React, { useState, useEffect } from 'react';
import { commerce } from './lib/lightyourway';
import { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter, Routes , Route } from 'react-router-dom';

const App = () => {
    const [products, setProducts] = useState([]);
    // setting the cart as a object equal to empty object
    const [cart, setCart] = useState({});

    // async arrow function to fetch products 
    const fetchProducts = async () => {
      // storing data of products list from commerce.js
        const { data } = await commerce.products.list();
    
        // populating products
        setProducts(data);
      };

      // async function to fetch cart items
      const fetchCart = async () => {
        // calling setCart and storing response from api call retrieve function
        setCart(await commerce.cart.retrieve())
      }

      // async function with product id and quantity of product as parameters
      const handleAddToCart = async (productId, quantity) => {
        // pass these parameters to api and add to cart
        const { cart } = await commerce.cart.add(productId, quantity);

        // calling setCart with the API response cart object
        setCart(cart);
      }

      // Async function used to update cart item quantities by passing a product ID and quantity
      const handleUpdateCartQty = async (productId, quantity) => {
        // storing API call response in cart object while passing product id and quantity
        const { cart } = await commerce.cart.update(productId, { quantity });

        // calling setCart with the API response cart object
        setCart(cart);
      }

      // Async function used to remove items from the cart by passing a product ID
      const handleRemoveFromCart = async (productId) => {
        // Storing api call response that removed a certain product in cart object
        const { cart } = await commerce.cart.remove(productId);

        // calling setCart with the API response cart object
        setCart(cart);
      }

      // Async function used to empty the cart object entirely
      const handleEmptyCart = async () => {
        // Storing api call response in the cart object
        const { cart } = await commerce.cart.empty();

        // calling setCart with the API response cart object
        setCart(cart);
      }

      // use effect hook
      useEffect(() => {
        // calling fetch products function
        fetchProducts();
        // calling fetch cart function
        fetchCart();
      }, []);

      console.log(cart);


     // Passing products as a prop inside of the products function
  return ( 
    <BrowserRouter>
      <div>
          <Navbar totalItems={cart.total_items} />
              <Routes>
                    <Route exact path='/Checkout' element={<Checkout cart={cart}/>} />
                    <Route path='/' element={<Products products = {products} onAddToCart = {handleAddToCart}/>} />
                    <Route path='/cart' element={<Cart cart={cart} 
                    // passing functions to cart
                    handleUpdateCartQty={handleUpdateCartQty}
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleEmptyCart={handleEmptyCart}
                    />}
                    />
               </Routes>  
      </div>
    </BrowserRouter>
  );
}

export default App;


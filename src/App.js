import React, { useState, useEffect } from 'react';
import { commerce } from './lib/lightyourway';
import { Products, Navbar, Cart } from './components';
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
        const item = await commerce.cart.add(productId, quantity);

        // calling setCart after item is added
        setCart(item.cart);
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
                    <Route path='/' element={<Products products = {products} onAddToCart = {handleAddToCart}/>} />
                    <Route path='/cart' element={<Cart cart={cart} />} />
               </Routes>  
      </div>
    </BrowserRouter>
  );
}

export default App;


import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const ProductMarketplace: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*');
      setProducts(data || []);
    };
    fetchProducts();
  }, []);

  const addToCart = (product: any) => {
    setCart([...cart, product]);
  };

  const checkout = async () => {
    const userId = supabase.auth.user()?.id;
    if (userId) {
      for (const product of cart) {
        await supabase
          .from('health_analytics')
          .insert([
            {
              patient_id: userId,
              product_id: product.id,
              health_data: { purchased: new Date().toISOString() },
            },
          ]);
      }
      setCart([]);
      alert('Checkout successful!');
    }
  };

  return (
    <div>
      <h2>Product Marketplace</h2>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Cart</h2>
        {cart.map((product, index) => (
          <div key={index}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
        {cart.length > 0 && <button onClick={checkout}>Checkout</button>}
      </div>
    </div>
  );
};

export default ProductMarketplace;

import React, { useState } from 'react';
import { Produto, CartItem } from '../types';
import ProductCard from './ProductCard'; // Importe o ProductCard

interface MenuProps {
  addToCart: (item: CartItem) => void;
  produtos: Produto[];
}

const Menu: React.FC<MenuProps> = ({ addToCart, produtos }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {produtos.map((produto) => (
        <ProductCard 
          key={produto.id} 
          product={produto} 
          addToCart={addToCart} 
        />
      ))}
    </div>
  );
};

export default Menu;
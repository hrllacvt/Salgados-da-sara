import React, { useState } from 'react';
import { products, getCategoryTitle, getCategoryDescription } from '../data/products';
import ProductCard from './ProductCard';

interface MenuProps {
  addToCart: (item: any) => void;
}

const Menu: React.FC<MenuProps> = ({ addToCart }) => {
  const categories = ['fritos', 'sortidos', 'assados', 'especiais', 'opcionais'];
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProducts = activeCategory 
    ? products.filter(product => product.category === activeCategory)
    : products;

  const groupedProducts = categories.map(category => {
    return {
      category,
      title: getCategoryTitle(category),
      description: getCategoryDescription(category),
      products: products.filter(product => product.category === category)
    };
  });

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Cardápio</h1>
      
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button 
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all
            ${activeCategory === null 
              ? 'bg-gray-100 text-gray-900' 
              : 'bg-gray-700 text-white hover:bg-gray-600'}`}
          onClick={() => setActiveCategory(null)}
        >
          Todos
        </button>
        
        {categories.map(category => (
          <button 
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all
              ${activeCategory === category 
                ? 'bg-gray-100 text-gray-900' 
                : 'bg-gray-700 text-white hover:bg-gray-600'}`}
            onClick={() => setActiveCategory(category)}
          >
            {getCategoryTitle(category)}
          </button>
        ))}
      </div>

      {activeCategory === null ? (
        groupedProducts.map(group => (
          <div key={group.category} className="mb-12">
            <div className="border-b border-gray-700 mb-6">
              <h2 className="text-2xl font-semibold mb-2">{group.title}</h2>
              {group.description && (
                <p className="text-gray-400 text-sm mb-4">{group.description}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.products.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div>
          <div className="border-b border-gray-700 mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              {getCategoryTitle(activeCategory)}
            </h2>
            {getCategoryDescription(activeCategory) && (
              <p className="text-gray-400 text-sm mb-4">
                {getCategoryDescription(activeCategory)}
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
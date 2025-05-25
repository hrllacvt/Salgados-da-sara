import React, { useState } from 'react';
import { Product, CartItem } from '../types';

interface ProductCardProps {
  product: Product;
  addToCart: (item: CartItem) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const [orderType, setOrderType] = useState<'cento' | 'meioCento' | 'unidade'>('cento');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Calcular preço baseado no tipo de pedido
  const calculatePrice = (basePrice: number, type: 'cento' | 'meioCento' | 'unidade'): number => {
    if (product.category === 'opcionais') {
      return basePrice;
    }
    
    // Retorna o preço exato para cada tipo de pedido
    switch(type) {
      case 'cento':
        return basePrice;
      case 'meioCento':
        return basePrice / 2;
      case 'unidade':
        return basePrice / 100;
      default:
        return basePrice;
    }
  };

  const currentPrice = calculatePrice(product.price, orderType);
  
  // Calcular quantidade mínima baseada no tipo de pedido
  const getMinQuantity = (): number => {
    if (orderType === 'unidade') {
      return product.minQuantity;
    }
    return 1;
  };

  const handleAddToCart = () => {
    // Verificar quantidade mínima
    if (orderType === 'unidade' && quantity < product.minQuantity) {
      alert(`Quantidade mínima para ${product.name} é ${product.minQuantity} unidades.`);
      return;
    }

    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: currentPrice,
      quantity: product.category === 'opcionais' ? quantity : quantity,
      orderType,
      category: product.category,
    };
    
    addToCart(item);
    setIsAdding(false);
    setQuantity(1);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-[1.02]">
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">
              {product.category === 'opcionais' ? 'Porção' :
                orderType === 'cento' ? 'Cento (100 unidades)' :
                orderType === 'meioCento' ? 'Meio Cento (50 unidades)' :
                'Unidade'}
            </span>
            <span className="text-xl font-bold">
              R$ {currentPrice.toFixed(2)}
            </span>
          </div>
          
          {!isAdding && (
            <button 
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
              onClick={() => setIsAdding(true)}
            >
              Adicionar
            </button>
          )}
        </div>
        
        {isAdding && (
          <div className="mt-4 space-y-4">
            {product.category !== 'opcionais' && (
              <div className="flex flex-col space-y-2">
                <label className="text-sm text-gray-300">Selecione uma opção:</label>
                <div className="flex gap-2">
                  <button 
                    className={`px-3 py-1 rounded-md text-sm ${orderType === 'cento' ? 'bg-gray-100 text-gray-900' : 'bg-gray-700 text-white'}`}
                    onClick={() => setOrderType('cento')}
                  >
                    Cento
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-md text-sm ${orderType === 'meioCento' ? 'bg-gray-100 text-gray-900' : 'bg-gray-700 text-white'}`}
                    onClick={() => setOrderType('meioCento')}
                  >
                    Meio Cento
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-md text-sm ${orderType === 'unidade' ? 'bg-gray-100 text-gray-900' : 'bg-gray-700 text-white'}`}
                    onClick={() => setOrderType('unidade')}
                  >
                    Unidade
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-gray-300">
                Quantidade{orderType === 'unidade' && product.category !== 'opcionais' ? ` (min. ${product.minQuantity})`: ''}:
              </label>
              <div className="flex items-center">
                <button 
                  className="bg-gray-700 px-3 py-1 rounded-md"
                  onClick={() => setQuantity(Math.max(getMinQuantity(), quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min={getMinQuantity()}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(getMinQuantity(), parseInt(e.target.value) || 1))}
                  className="w-16 text-center mx-2 bg-gray-700 text-white py-1 rounded-md"
                />
                <button 
                  className="bg-gray-700 px-3 py-1 rounded-md"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors w-1/2"
                onClick={() => setIsAdding(false)}
              >
                Cancelar
              </button>
              <button 
                className="bg-gray-100 hover:bg-white text-gray-900 px-4 py-2 rounded-md transition-colors w-1/2 font-medium"
                onClick={handleAddToCart}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
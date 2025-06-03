import React, { useState } from 'react';
import { Produto, CartItem } from '../types';

interface ProductCardProps {
  product: Produto;
  addToCart: (item: CartItem) => void;
}

type CategoriaValida = 'fritos' | 'sortidos' | 'assados' | 'especiais' | 'opcionais';

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Mapa de quantidades mínimas
  const minQuantities: Record<CategoriaValida, number> = {
    'fritos': 10,
    'sortidos': 20,
    'assados': 20,
    'especiais': 20,
    'opcionais': 1
  };

  // Obter quantidade mínima com fallback seguro
  const getMinQuantity = (): number => {
    if (product.categoria && product.categoria in minQuantities) {
      return minQuantities[product.categoria as CategoriaValida];
    }
    return 1;
  };

  const minQty = getMinQuantity();

  const handleAddToCart = () => {
    if (quantity < minQty) {
      alert(`Quantidade mínima para ${product.nome} é ${minQty} unidades.`);
      return;
    }

    const item: CartItem = {
      ...product,
      quantity,
      orderType,
    };
    
    addToCart(item);
    setIsAdding(false);
    setQuantity(1);
  };

  // Função segura para converter preço para número
  const getPrecoNumerico = () => {
    if (typeof product.preco === 'number') return product.preco;
    return Number(product.preco) || 0;
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-[1.02]">
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">{product.nome}</h3>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">
              {product.categoria === 'opcionais' ? 'Porção' : 'Unidade'}
            </span>
            <span className="text-xl font-bold">
              R$ {getPrecoNumerico().toFixed(2)}
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
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-gray-300">Tipo de Entrega:</label>
              <div className="flex gap-2">
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${orderType === 'delivery' ? 'bg-gray-100 text-gray-900' : 'bg-gray-700 text-white'}`}
                  onClick={() => setOrderType('delivery')}
                >
                  Entrega
                </button>
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${orderType === 'pickup' ? 'bg-gray-100 text-gray-900' : 'bg-gray-700 text-white'}`}
                  onClick={() => setOrderType('pickup')}
                >
                  Retirada
                </button>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-gray-300">
                Quantidade {minQty > 1 ? `(mín. ${minQty})` : ''}:
              </label>
              <div className="flex items-center">
                <button 
                  className="bg-gray-700 px-3 py-1 rounded-md"
                  onClick={() => setQuantity(Math.max(minQty, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min={minQty}
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value)) {
                      setQuantity(Math.max(minQty, value));
                    }
                  }}
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
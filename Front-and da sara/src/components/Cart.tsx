import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CartItem, User } from '../types';

interface CartProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onRemove: (index: number) => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
  user: User | null;
  setActiveTab: (tab: string) => void;
  onOrderComplete: () => void;
}

const Cart: React.FC<CartProps> = ({ 
  isOpen, 
  items, 
  onClose, 
  onRemove, 
  onUpdateQuantity,
  user,
  setActiveTab,
  onOrderComplete
}) => {
  const [paymentStep, setPaymentStep] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'pickup'>('pickup');
  
  // Função segura para converter preço para número
  const parsePreco = (preco: number | string): number => {
    if (typeof preco === 'number') return preco;
    return parseFloat(preco) || 0;
  };

  // Calcular subtotal
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => {
      const precoNumerico = parsePreco(item.preco);
      return sum + (precoNumerico * item.quantity);
    }, 0);
  };

  // Calcular total
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryFee = deliveryOption === 'delivery' ? 10 : 0;
    return subtotal + deliveryFee;
  };

  const handleContinue = () => {
    if (!user) {
      setActiveTab('register');
      onClose();
      return;
    }
    
    setPaymentStep(true);
  };

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      alert('Por favor, selecione um método de pagamento.');
      return;
    }
    
    alert('Pedido realizado com sucesso! Um atendente entrará em contato para confirmar seu pedido.');
    
    // Resetar o estado
    setPaymentStep(false);
    setPaymentMethod('');
    onOrderComplete();
  };

  const handleBack = () => {
    setPaymentStep(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-gray-800 w-full md:w-96 h-full overflow-y-auto shadow-xl flex flex-col">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {paymentStep ? 'Pagamento' : 'Seu Carrinho'}
          </h2>
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>
        
        {!paymentStep ? (
          <>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {items.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  Seu carrinho está vazio
                </div>
              ) : (
                items.map((item, index) => {
                  const precoNumerico = parsePreco(item.preco);
                  return (
                    <div key={`${item.id}-${item.orderType}-${index}`} className="bg-gray-700 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{item.nome}</h3>
                          <p className="text-sm text-gray-400">
                            {item.orderType === 'delivery' ? 'Entrega' : 'Retirada'} 
                          </p>
                        </div>
                        <button 
                          className="text-gray-400 hover:text-white"
                          onClick={() => onRemove(index)}
                        >
                          <X size={18} />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <button 
                            className="bg-gray-600 px-2 py-1 rounded"
                            onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button 
                            className="bg-gray-600 px-2 py-1 rounded"
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-medium">
                            R$ {(precoNumerico * item.quantity).toFixed(2)}
                          </p> 
                          <p className="text-xs text-gray-400">
                            R$ {precoNumerico.toFixed(2)} cada
                          </p> 
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            
            <div className="p-4 border-t border-gray-700">
              <div className="flex justify-between mb-4">
                <span>Subtotal:</span>
                <span>R$ {calculateSubtotal().toFixed(2)}</span>
              </div>

              {user && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="pickup"
                        checked={deliveryOption === 'pickup'}
                        onChange={(e) => setDeliveryOption(e.target.value as 'pickup' | 'delivery')}
                        className="mr-2"
                      />
                      Retirar no Local
                    </label>
                    <span>R$ 0,00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="delivery"
                        checked={deliveryOption === 'delivery'}
                        onChange={(e) => setDeliveryOption(e.target.value as 'pickup' | 'delivery')}
                        className="mr-2"
                      />
                      Entrega
                    </label>
                    <span>+ R$ 10,00</span>
                  </div>
                </div>
              )}

              <div className="flex justify-between mb-4 pt-2 border-t border-gray-600">
                <span className="font-bold">Total:</span>
                <span className="font-bold">R$ {calculateTotal().toFixed(2)}</span>
              </div>
              
              <button 
                className="w-full bg-gray-100 hover:bg-white text-gray-900 py-3 rounded-lg font-medium transition-colors"
                onClick={handleContinue}
                disabled={items.length === 0}
              >
                {user ? 'Continuar' : 'Fazer Login/Cadastro'}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 p-4 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Informações do Cliente</h3>
                {user && (
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <p><strong>Nome:</strong> {user.nome}</p>
                    <p><strong>Telefone:</strong> {user.telefone}</p>
                    {user.endereco && <p><strong>Endereço:</strong> {user.endereco}</p>}
                    {user.complemento && <p><strong>Complemento:</strong> {user.complemento}</p>}
                    {user.bairro && <p><strong>Bairro:</strong> {user.bairro}</p>}
                    {user.cidade && <p><strong>Cidade:</strong> {user.cidade}</p>}
                    <p><strong>Tipo de Entrega:</strong> {deliveryOption === 'delivery' ? 'Entrega' : 'Retirada no Local'}</p>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Forma de Pagamento</h3>
                <div className="space-y-2">
                  <label className="flex items-center bg-gray-700 p-3 rounded-lg cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="dinheiro"
                      checked={paymentMethod === 'dinheiro'}
                      onChange={() => setPaymentMethod('dinheiro')}
                      className="mr-2"
                    />
                    Dinheiro
                  </label>
                  
                  <label className="flex items-center bg-gray-700 p-3 rounded-lg cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="cartão"
                      checked={paymentMethod === 'cartão'}
                      onChange={() => setPaymentMethod('cartão')}
                      className="mr-2"
                    />
                    Cartão de Crédito/Débito
                  </label>
                  
                  <label className="flex items-center bg-gray-700 p-3 rounded-lg cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="pix"
                      checked={paymentMethod === 'pix'}
                      onChange={() => setPaymentMethod('pix')}
                      className="mr-2"
                    />
                    PIX
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Resumo do Pedido</h3>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <div className="space-y-2 mb-3">
                    {items.map((item, index) => {
                      const precoNumerico = parsePreco(item.preco);
                      return (
                        <div key={index} className="flex justify-between">
                          <span>{item.quantity}x {item.nome}</span>
                          <span>R$ {(precoNumerico * item.quantity).toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="pt-2 border-t border-gray-600">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>R$ {calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxa de Entrega:</span>
                      <span>R$ {deliveryOption === 'delivery' ? '10,00' : '0,00'}</span>
                    </div>
                    <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-600">
                      <span>Total:</span>
                      <span>R$ {calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-700 flex gap-2">
              <button 
                className="w-1/2 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
                onClick={handleBack}
              >
                Voltar
              </button>
              <button 
                className="w-1/2 bg-gray-100 hover:bg-white text-gray-900 py-3 rounded-lg font-medium transition-colors"
                onClick={handlePlaceOrder}
              >
                Finalizar Pedido
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
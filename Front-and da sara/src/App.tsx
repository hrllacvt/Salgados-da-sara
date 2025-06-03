import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import Header from './components/Header';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import UserInfo from './components/UserInfo';
import { CartItem, User, Produto } from './types';
import api from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('menu');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar usuário do localStorage se existir
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Carregar produtos do backend
  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const response = await api.getProdutos();
        setProdutos(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar produtos');
        setLoading(false);
        console.error(err);
      }
    };
    
    carregarProdutos();
  }, []);

  // Salvar usuário no localStorage quando mudar
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const addToCart = (item: CartItem) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => 
        cartItem.id === item.id && 
        cartItem.orderType === item.orderType
    );

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += item.quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, item]);
    }
    
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const updateCartItemQuantity = (index: number, quantity: number) => {
    if (quantity < 1) return;
    
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    setCart(newCart);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setActiveTab('menu');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleOrderComplete = async () => {
    try {
      // Aqui você pode implementar a lógica para enviar o pedido para o backend
      // Exemplo:
      // await api.criarPedido({
      //   userId: user?.id,
      //   items: cart,
      //   total: calcularTotal(),
      //   status: 'pendente'
      // });
      
      setCart([]);
      setIsCartOpen(false);
    } catch (err) {
      console.error('Erro ao finalizar pedido:', err);
      setError('Erro ao finalizar pedido');
    }
  };

  const calcularTotal = () => {
    return cart.reduce((total, item) => total + (item.preco * item.quantity), 0);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (loading) return <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black text-white flex items-center justify-center">Carregando...</div>;
  if (error) return <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black text-white flex items-center justify-center">{error}</div>;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black text-white">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user}
        cartItemCount={cartItemCount}
        toggleCart={() => setIsCartOpen(!isCartOpen)}
      />

      <div className="container mx-auto px-4 py-8">
        {activeTab === 'menu' && (
          <Menu 
            addToCart={addToCart} 
            produtos={produtos} 
          />
        )}
        
        {activeTab === 'login' && (
          <Login 
            onLogin={handleLogin} 
            switchToRegister={() => setActiveTab('register')} 
          />
        )}
        
        {activeTab === 'register' && (
          <Register 
            onRegister={handleLogin} 
            switchToLogin={() => setActiveTab('login')} 
          />
        )}
        
        {activeTab === 'user-info' && user && (
          <UserInfo 
            user={user} 
            onLogout={handleLogout} 
          />
        )}
      </div>

      <Cart 
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onRemove={removeFromCart}
        onUpdateQuantity={updateCartItemQuantity}
        user={user}
        setActiveTab={setActiveTab}
        onOrderComplete={handleOrderComplete}
        total={calcularTotal()}
      />
      
      <div 
        className="fixed bottom-4 right-4 md:hidden bg-gray-900 rounded-full p-3 shadow-lg" 
        onClick={() => setIsCartOpen(!isCartOpen)}
      >
        <div className="relative">
          <ShoppingCart size={24} />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItemCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
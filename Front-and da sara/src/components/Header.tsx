import React from 'react';
import { ShoppingCart, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User | null;
  cartItemCount: number;
  toggleCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  setActiveTab, 
  user, 
  cartItemCount,
  toggleCart
}) => {
  return (
    <header className="bg-gray-900 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div 
            className="text-2xl font-bold cursor-pointer flex items-center"
            onClick={() => setActiveTab('menu')}
          >
            Salgado da Sara
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <button 
              className={`text-base ${activeTab === 'menu' ? 'font-bold' : 'font-normal'}`}
              onClick={() => setActiveTab('menu')}
            >
              Cardápio
            </button>
            
            {user ? (
              <button 
                className={`text-base ${activeTab === 'user-info' ? 'font-bold' : 'font-normal'}`}
                onClick={() => setActiveTab('user-info')}
              >
                Informações do Cliente
              </button>
            ) : (
              <button 
                className={`text-base ${activeTab === 'login' ? 'font-bold' : 'font-normal'}`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
            )}
            
            <button 
              className="flex items-center gap-1 relative"
              onClick={toggleCart}
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </button>
          </nav>
          
          <div className="md:hidden flex items-center gap-4">
            {user ? (
              <button onClick={() => setActiveTab('user-info')}>
                <UserIcon size={20} />
              </button>
            ) : (
              <button onClick={() => setActiveTab('login')}>
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
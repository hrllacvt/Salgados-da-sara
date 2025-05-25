import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  switchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, switchToRegister }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const formatPhoneNumber = (value: string) => {
    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const unformattedValue = e.target.value.replace(/\D/g, '');
    const formattedValue = formatPhoneNumber(unformattedValue);
    setPhone(formattedValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simulação de login - normalmente isso seria uma chamada de API
    const users = localStorage.getItem('users');
    
    if (users) {
      const parsedUsers = JSON.parse(users);
      const user = parsedUsers.find((u: any) => u.phone === phone && u.password === password);
      
      if (user) {
        // Remove a senha antes de passar para o state
        const { password, ...userWithoutPassword } = user;
        onLogin(userWithoutPassword);
      } else {
        setError('Telefone ou senha incorretos.');
      }
    } else {
      setError('Nenhum usuário cadastrado. Por favor, crie uma conta primeiro.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      
      {error && (
        <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Telefone (com DDD)
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
            placeholder="(00) 00000-0000"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Senha
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-gray-100 hover:bg-white text-gray-900 font-medium py-2 px-4 rounded-md transition-colors"
        >
          Entrar
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Não tem uma conta?{' '}
          <button 
            className="text-gray-300 hover:text-white underline"
            onClick={switchToRegister}
          >
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
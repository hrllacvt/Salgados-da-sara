import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { User } from '../types';

interface RegisterProps {
  onRegister: (user: User) => void;
  switchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    complement: '',
    neighborhood: '',
    city: '',
    deliveryOption: 'pickup' as 'pickup' | 'delivery'
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const formatPhoneNumber = (value: string) => {
    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Remove formatação atual
      const unformattedValue = value.replace(/\D/g, '');
      // Aplica nova formatação
      const formattedValue = formatPhoneNumber(unformattedValue);
      setFormData({
        ...formData,
        [name]: formattedValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasMinLength) return 'A senha deve ter pelo menos 6 caracteres';
    if (!hasUpperCase) return 'A senha deve conter pelo menos uma letra maiúscula';
    if (!hasLowerCase) return 'A senha deve conter pelo menos uma letra minúscula';
    if (!hasNumber) return 'A senha deve conter pelo menos um número';
    if (!hasSpecialChar) return 'A senha deve conter pelo menos um caractere especial';
    
    return '';
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Formato inválido. Use (00) 00000-0000';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Endereço é obrigatório';
    }
    
    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = 'Bairro é obrigatório';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'Cidade é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      // Salvar usuário no localStorage (simulando um backend)
      const users = localStorage.getItem('users');
      const parsedUsers = users ? JSON.parse(users) : [];
      
      // Verificar se o telefone já está cadastrado
      const userExists = parsedUsers.some((user: any) => user.phone === formData.phone);
      
      if (userExists) {
        setErrors({ phone: 'Este telefone já está cadastrado' });
        return;
      }
      
      // Salvar o novo usuário
      const newUser = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        complement: formData.complement,
        neighborhood: formData.neighborhood,
        city: formData.city,
        deliveryOption: formData.deliveryOption
      };
      
      parsedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(parsedUsers));
      
      // Criar objeto de usuário sem a senha para o state da aplicação
      const { password, confirmPassword, ...userWithoutPassword } = formData;
      onRegister(userWithoutPassword as User);
    }
  };
  
  return (
    <div className="max-w-xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6 mt-8 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Cadastro de Cliente</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nome Completo*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400`}
              required
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Telefone (com DDD)*
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-gray-700 border ${errors.phone ? 'border-red-500' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400`}
              placeholder="(00) 00000-0000"
              required
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              E-mail*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400`}
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Endereço*
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-gray-700 border ${errors.address ? 'border-red-500' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400`}
              required
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
          
          <div>
            <label htmlFor="complement" className="block text-sm font-medium mb-1">
              Complemento
            </label>
            <input
              type="text"
              id="complement"
              name="complement"
              value={formData.complement}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          
          <div>
            <label htmlFor="neighborhood" className="block text-sm font-medium mb-1">
              Bairro*
            </label>
            <input
              type="text"
              id="neighborhood"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-gray-700 border ${errors.neighborhood ? 'border-red-500' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400`}
              required
            />
            {errors.neighborhood && <p className="text-red-500 text-xs mt-1">{errors.neighborhood}</p>}
          </div>
          
          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-1">
              Cidade*
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-gray-700 border ${errors.city ? 'border-red-500' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400`}
              required
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Senha*
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-gray-700 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 pr-10`}
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
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirmar Senha*
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-gray-700 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 pr-10`}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-gray-100 hover:bg-white text-gray-900 font-medium py-2 px-4 rounded-md transition-colors"
          >
            Cadastrar
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Já tem uma conta?{' '}
          <button 
            className="text-gray-300 hover:text-white underline"
            onClick={switchToLogin}
          >
            Fazer Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
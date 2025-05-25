export interface Product {
  id: string;
  name: string;
  price: number; // Preço para cento
  category: 'fritos' | 'sortidos' | 'assados' | 'especiais' | 'opcionais';
  minQuantity: number; // Quantidade mínima para pedidos de unidade
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  orderType: 'cento' | 'meioCento' | 'unidade';
  category: 'fritos' | 'sortidos' | 'assados' | 'especiais' | 'opcionais';
}

export interface User {
  name: string;
  phone: string;
  email: string;
  address: string;
  complement?: string;
  neighborhood: string;
  city: string;
  deliveryOption: 'delivery' | 'pickup';
}
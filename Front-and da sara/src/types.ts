export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria?: string;
}

export interface CartItem extends Produto {
  quantity: number;
  orderType: 'delivery' | 'pickup';
}

export interface User {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
}
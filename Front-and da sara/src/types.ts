export type Categoria = 'fritos' | 'sortidos' | 'assados' | 'especiais' | 'opcionais';

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria?: Categoria;
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
  complemento?: string;
  bairro?: string;
  cidade?: string;
}
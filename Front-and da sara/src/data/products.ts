import { Produto } from '../types';

export const products: Produto[] = [
  // FRITOS
  { 
    id: 1, 
    nome: 'Bolinha de queijo', 
    descricao: 'Deliciosas bolinhas de queijo', 
    preco: 110, 
    imagem: 'bolinha-queijo.jpg',
    categoria: 'fritos'
  },
  { 
    id: 2, 
    nome: 'Coxinha frango', 
    descricao: 'Coxinha de frango com catupiry', 
    preco: 110, 
    imagem: 'coxinha-frango.jpg',
    categoria: 'fritos'
  },
  { 
    id: 3, 
    nome: 'Coxinha brócolis/queijo', 
    descricao: 'Coxinha de brócolis com queijo', 
    preco: 110, 
    imagem: 'coxinha-brocolis-queijo.jpg',
    categoria: 'fritos'
  },
  { 
    id: 4, 
    nome: 'Bombinha calabresa/queijo', 
    descricao: 'Bombinha de calabresa com queijo', 
    preco: 110, 
    imagem: 'bombinha-calabresa-queijo.jpg',
    categoria: 'fritos'
  },
  { 
    id: 5, 
    nome: 'Enroladinho de salsicha', 
    descricao: 'Enroladinho de salsicha', 
    preco: 110, 
    imagem: 'enroladinho-salsicha.jpg',
    categoria: 'fritos'
  },
  { 
    id: 6, 
    nome: 'Croquetes', 
    descricao: 'Croquetes de carne', 
    preco: 110, 
    imagem: 'croquetes.jpg',
    categoria: 'fritos'
  },
  { 
    id: 7, 
    nome: 'Pastel simples (gado/frango/queijo)', 
    descricao: 'Pastel simples com recheio à escolha', 
    preco: 100, 
    imagem: 'pastel-simples.jpg',
    categoria: 'fritos'
  },
  { 
    id: 8, 
    nome: 'Travesseirinho de gado', 
    descricao: 'Travesseirinho de carne moída', 
    preco: 110, 
    imagem: 'travesseirinho-gado.jpg',
    categoria: 'fritos'
  },
  { 
    id: 9, 
    nome: 'Risoles de gado', 
    descricao: 'Risoles de carne moída', 
    preco: 120, 
    imagem: 'risoles-gado.jpg',
    categoria: 'fritos'
  },
  { 
    id: 10, 
    nome: 'Risoles frango', 
    descricao: 'Risoles de frango', 
    preco: 120, 
    imagem: 'risoles-frango.jpg',
    categoria: 'fritos'
  },
  
  // SORTIDOS
  { 
    id: 11, 
    nome: 'Barquetes (legumes ou frango)', 
    descricao: 'Barquetes de legumes ou frango', 
    preco: 180, 
    imagem: 'barquetes.jpg',
    categoria: 'sortidos'
  },
  { 
    id: 12, 
    nome: 'Canudinhos (legumes ou frango)', 
    descricao: 'Canudinhos de legumes ou frango', 
    preco: 120, 
    imagem: 'canudinhos.jpg',
    categoria: 'sortidos'
  },
  { 
    id: 13, 
    nome: 'Torradinhas', 
    descricao: 'Torradinhas crocantes', 
    preco: 170, 
    imagem: 'torradinhas.jpg',
    categoria: 'sortidos'
  },
  { 
    id: 14, 
    nome: 'Espetinho', 
    descricao: 'Espetinho de carne e vegetais', 
    preco: 180, 
    imagem: 'espetinho.jpg',
    categoria: 'sortidos'
  },
  { 
    id: 15, 
    nome: 'Mini Pizza', 
    descricao: 'Mini pizza com diversos sabores', 
    preco: 160, 
    imagem: 'mini-pizza.jpg',
    categoria: 'sortidos'
  },
  { 
    id: 16, 
    nome: 'Mini Sanduíches', 
    descricao: 'Mini sanduíches diversos', 
    preco: 160, 
    imagem: 'mini-sanduiches.jpg',
    categoria: 'sortidos'
  },
  
  // ASSADOS
  { 
    id: 17, 
    nome: 'Presunto e Queijo', 
    descricao: 'Salgado assado de presunto e queijo', 
    preco: 160, 
    imagem: 'presunto-queijo.jpg',
    categoria: 'assados'
  },
  { 
    id: 18, 
    nome: 'Gado', 
    descricao: 'Salgado assado de carne moída', 
    preco: 160, 
    imagem: 'gado.jpg',
    categoria: 'assados'
  },
  { 
    id: 19, 
    nome: 'Frango', 
    descricao: 'Salgado assado de frango', 
    preco: 160, 
    imagem: 'frango.jpg',
    categoria: 'assados'
  },
  { 
    id: 20, 
    nome: 'Legumes', 
    descricao: 'Salgado assado de legumes', 
    preco: 160, 
    imagem: 'legumes.jpg',
    categoria: 'assados'
  },
  { 
    id: 21, 
    nome: 'Brócolis c/ Ricota', 
    descricao: 'Salgado assado de brócolis com ricota', 
    preco: 160, 
    imagem: 'brocolis-ricota.jpg',
    categoria: 'assados'
  },
  { 
    id: 22, 
    nome: 'Palmito', 
    descricao: 'Salgado assado de palmito', 
    preco: 160, 
    imagem: 'palmito.jpg',
    categoria: 'assados'
  },
  
  // ESPECIAIS
  { 
    id: 23, 
    nome: 'Mini Cachorro Quente', 
    descricao: 'Mini cachorro quente', 
    preco: 220, 
    imagem: 'mini-cachorro-quente.jpg',
    categoria: 'especiais'
  },
  { 
    id: 24, 
    nome: 'Mini Hambúrguer', 
    descricao: 'Mini hambúrguer', 
    preco: 220, 
    imagem: 'mini-hamburguer.jpg',
    categoria: 'especiais'
  },
  { 
    id: 25, 
    nome: 'Empadinhas', 
    descricao: 'Empadinhas de frango ou palmito', 
    preco: 200, 
    imagem: 'empadinhas.jpg',
    categoria: 'especiais'
  },
  
  // OPCIONAIS
  { 
    id: 26, 
    nome: 'Batata Frita (Porção)', 
    descricao: 'Porção de batata frita', 
    preco: 6.5, 
    imagem: 'batata-frita.jpg',
    categoria: 'opcionais'
  }
];

export const getCategoryTitle = (category: string): string => {
  const titles: Record<string, string> = {
    'fritos': 'SALGADOS FRITOS',
    'sortidos': 'SORTIDOS',
    'assados': 'ASSADOS',
    'especiais': 'ESPECIAIS',
    'opcionais': 'OPCIONAIS'
  };
  
  return titles[category] || category.toUpperCase();
};

export const getCategoryDescription = (category: string): string => {
  const descriptions: Record<string, string> = {
    'fritos': 'SALGADOS FRITOS NO MÍNIMO 10 UNIDADES',
    'sortidos': 'MÍNIMO 20 UNIDADES POR SABOR',
    'assados': 'MÍNIMO 20 UNIDADES POR SABOR',
    'especiais': 'MÍNIMO 20 UNIDADES POR SABOR',
    'opcionais': ''
  };
  
  return descriptions[category] || '';
};
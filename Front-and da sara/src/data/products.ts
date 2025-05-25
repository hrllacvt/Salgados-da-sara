import { Product } from '../types';

export const products: Product[] = [
  // FRITOS
  { 
    id: 'bolinha-queijo', 
    name: 'Bolinha de queijo', 
    price: 110, 
    category: 'fritos',
    minQuantity: 10
  },
  { 
    id: 'coxinha-frango', 
    name: 'Coxinha frango', 
    price: 110, 
    category: 'fritos',
    minQuantity: 10
  },
  { 
    id: 'coxinha-brocolis-queijo', 
    name: 'Coxinha brócolis/queijo', 
    price: 110, 
    category: 'fritos',
    minQuantity: 10
  },
  { 
    id: 'bombinha-calabresa-queijo', 
    name: 'Bombinha calabresa/queijo', 
    price: 110, 
    category: 'fritos',
    minQuantity: 10
  },
  { 
    id: 'enroladinho-salsicha', 
    name: 'Enroladinho de salsicha', 
    price: 110, 
    category: 'fritos',
    minQuantity: 10
  },
  { 
    id: 'croquetes', 
    name: 'Croquetes', 
    price: 110, 
    category: 'fritos',
    minQuantity: 10
  },
  { 
    id: 'pastel-simples', 
    name: 'Pastel simples (gado/frango/queijo)', 
    price: 100, 
    category: 'fritos',
    minQuantity: 10
  },
  { 
    id: 'travesseirinho-gado', 
    name: 'Travesseirinho de gado', 
    price: 110, 
    category: 'fritos',
    minQuantity: 10
  },
  { 
    id: 'risoles-gado', 
    name: 'Risoles de gado', 
    price: 120, 
    category: 'fritos',
    minQuantity: 10
  },
  { 
    id: 'risoles-frango', 
    name: 'Risoles frango', 
    price: 120, 
    category: 'fritos',
    minQuantity: 10
  },
  
  // SORTIDOS
  { 
    id: 'barquetes', 
    name: 'Barquetes (legumes ou frango)', 
    price: 180, 
    category: 'sortidos',
    minQuantity: 20
  },
  { 
    id: 'canudinhos', 
    name: 'Canudinhos (legumes ou frango)', 
    price: 120, 
    category: 'sortidos',
    minQuantity: 20
  },
  { 
    id: 'torradinhas', 
    name: 'Torradinhas', 
    price: 170, 
    category: 'sortidos',
    minQuantity: 20
  },
  { 
    id: 'espetinho', 
    name: 'Espetinho', 
    price: 180, 
    category: 'sortidos',
    minQuantity: 20
  },
  { 
    id: 'mini-pizza', 
    name: 'Mini Pizza', 
    price: 160, 
    category: 'sortidos',
    minQuantity: 20
  },
  { 
    id: 'mini-sanduiches', 
    name: 'Mini Sanduíches', 
    price: 160, 
    category: 'sortidos',
    minQuantity: 20
  },
  
  // ASSADOS
  { 
    id: 'assado-presunto-queijo', 
    name: 'Presunto e Queijo', 
    price: 160, 
    category: 'assados',
    minQuantity: 20
  },
  { 
    id: 'assado-gado', 
    name: 'Gado', 
    price: 160, 
    category: 'assados',
    minQuantity: 20
  },
  { 
    id: 'assado-frango', 
    name: 'Frango', 
    price: 160, 
    category: 'assados',
    minQuantity: 20
  },
  { 
    id: 'assado-legumes', 
    name: 'Legumes', 
    price: 160, 
    category: 'assados',
    minQuantity: 20
  },
  { 
    id: 'assado-brocolis-ricota', 
    name: 'Brócolis c/ Ricota', 
    price: 160, 
    category: 'assados',
    minQuantity: 20
  },
  { 
    id: 'assado-palmito', 
    name: 'Palmito', 
    price: 160, 
    category: 'assados',
    minQuantity: 20
  },
  
  // ESPECIAIS
  { 
    id: 'mini-cachorro-quente', 
    name: 'Mini Cachorro Quente', 
    price: 220, 
    category: 'especiais',
    minQuantity: 20
  },
  { 
    id: 'mini-hamburguer', 
    name: 'Mini Hambúrguer', 
    price: 220, 
    category: 'especiais',
    minQuantity: 20
  },
  { 
    id: 'empadinhas', 
    name: 'Empadinhas', 
    price: 200, 
    category: 'especiais',
    minQuantity: 20
  },
  
  // OPCIONAIS
  { 
    id: 'batata-frita', 
    name: 'Batata Frita (Porção)', 
    price: 6.5, 
    category: 'opcionais',
    minQuantity: 1
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
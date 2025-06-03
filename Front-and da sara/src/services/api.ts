// front-and-da-sara/src/services/api.ts
import axios, { AxiosResponse } from 'axios';
import { Produto } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // URL do seu backend
});

export default {
  getProdutos: (): Promise<AxiosResponse<Produto[]>> => api.get('/produtos'),
  getProduto: (id: number): Promise<AxiosResponse<Produto>> => api.get(`/produtos/${id}`),
  criarProduto: (produto: Omit<Produto, 'id'>): Promise<AxiosResponse<Produto>> => 
    api.post('/produtos', produto),
  atualizarProduto: (id: number, produto: Produto): Promise<AxiosResponse<Produto>> => 
    api.put(`/produtos/${id}`, produto),
  deletarProduto: (id: number): Promise<AxiosResponse<void>> => 
    api.delete(`/produtos/${id}`),
};
export interface Componente {
  id?: number;
  nome: string;
  marca: string;
  categoria: string;
  soquete?: string;
  tipoMemoria?: string;
  potencia?: number;
  tdp: number;
  benchmark: number;
  descricao: string;
  imagem: string;
  precoMercadoLivre: number;
  precoAliexpress: number;
  historico: number[];
}
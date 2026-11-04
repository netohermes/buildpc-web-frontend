export interface ProdutoPronto {
  id?: number;
  nome: string;
  tipo: 'notebook' | 'pc';
  categoriaUso: 'Gamer' | 'Trabalho' | 'Estudo';
  descricao: string;
  imagem: string;
  precoMercadoLivre: number;
  precoAliexpress: number;
}
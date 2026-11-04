export interface Montagem {
  id?: number;
  usuarioId: number;
  nome: string;
  componentesIds: number[];
  total: number;
  data: string;
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProdutoPronto } from '../models/produto-pronto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoProntoService {


  url = 'http://localhost:3000/produtosProntos';

  constructor(private http: HttpClient) {
  }


  listar() {
    return this.http.get<ProdutoPronto[]>(this.url);
  }


  buscarPorId(id: number) {
    return this.http.get<ProdutoPronto>(this.url + '/' + id);
  }


  listarPorCategoriaUso(categoriaUso: string) {
    return this.http.get<ProdutoPronto[]>(this.url + '?categoriaUso=' + categoriaUso);
  }


  listarPorTipo(tipo: string) {
    return this.http.get<ProdutoPronto[]>(this.url + '?tipo=' + tipo);
  }
}
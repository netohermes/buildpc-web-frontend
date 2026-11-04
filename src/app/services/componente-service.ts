import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Componente } from '../models/componente';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService {


  url = 'http://localhost:3000/componentes';

  constructor(private http: HttpClient) {
  }


  listar() {
    return this.http.get<Componente[]>(this.url);
  }


  buscarPorId(id: number) {
    return this.http.get<Componente>(this.url + '/' + id);
  }


  listarPorCategoria(categoria: string) {
    return this.http.get<Componente[]>(this.url + '?categoria=' + categoria);
  }


  pesquisar(texto: string) {
    return this.http.get<Componente[]>(this.url + '?q=' + texto);
  }


  cadastrar(componente: Componente) {
    return this.http.post<Componente>(this.url, componente);
  }


  atualizar(componente: Componente) {
    return this.http.put<Componente>(this.url + '/' + componente.id, componente);
  }


  excluir(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
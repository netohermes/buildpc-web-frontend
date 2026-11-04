import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Montagem } from '../models/montagem';

@Injectable({
  providedIn: 'root'
})
export class MontagemService {


  url = 'http://localhost:3000/montagens';

  constructor(private http: HttpClient) {
  }


  listarDoUsuario(usuarioId: number) {
    return this.http.get<Montagem[]>(this.url + '?usuarioId=' + usuarioId);
  }


  salvar(montagem: Montagem) {
    return this.http.post<Montagem>(this.url, montagem);
  }


  excluir(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {


  url = 'http://localhost:3000/categorias';

  constructor(private http: HttpClient) {
  }


  listar() {
    return this.http.get<Categoria[]>(this.url);
  }
}
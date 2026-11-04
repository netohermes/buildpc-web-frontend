import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Componente } from '../models/componente';
import { COMPONENTES } from '../data/componentes-mock';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService {

  componentes: Componente[] = COMPONENTES.map(c => ({ ...c }));

  constructor() {
  }


  listar() {
    return of(this.componentes.slice());
  }


  buscarPorId(id: number) {
    let peca = this.componentes.find(c => c.id == id);
    return of(peca || null);
  }


  listarPorCategoria(categoria: string) {
    return of(this.componentes.filter(c => c.categoria == categoria));
  }


  pesquisar(texto: string) {
    let busca = texto.toLowerCase();
    let lista = this.componentes.filter(c =>
      c.nome.toLowerCase().includes(busca) || c.marca.toLowerCase().includes(busca)
    );
    return of(lista);
  }


  cadastrar(componente: Componente) {
    let maiorId = 0;
    for (let c of this.componentes) {
      if (c.id! > maiorId) {
        maiorId = c.id!;
      }
    }
    componente.id = maiorId + 1;
    this.componentes.push(componente);
    return of(componente);
  }


  atualizar(componente: Componente) {
    let posicao = this.componentes.findIndex(c => c.id == componente.id);
    if (posicao != -1) {
      this.componentes[posicao] = componente;
    }
    return of(componente);
  }


  excluir(id: number) {
    this.componentes = this.componentes.filter(c => c.id != id);
    return of(null);
  }
}

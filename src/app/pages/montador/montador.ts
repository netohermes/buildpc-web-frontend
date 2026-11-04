import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from '../../services/categoria-service';
import { ComponenteService } from '../../services/componente-service';
import { MontadorService } from '../../services/montador-service';
import { Categoria } from '../../models/categoria';
import { Componente } from '../../models/componente';

@Component({
  selector: 'app-montador',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './montador.html',
  styleUrl: './montador.scss'
})
export class Montador implements OnInit {

  // as 6 categorias (abas)
  categorias = signal<Categoria[]>([]);

  // categoria que esta aberta agora
  categoriaAtual = signal('processador');

  // peças da categoria aberta (vem da api)
  pecas = signal<Componente[]>([]);

  // peças que o usuario escolheu para o pc
  escolhidas = signal<Componente[]>([]);

  // formulario dos filtros
  filtros = new FormGroup({
    marca: new FormControl(''),
    soquete: new FormControl(''),
    precoMaximo: new FormControl<number | null>(null),
    tdpMaximo: new FormControl<number | null>(null),
    apenasCompativeis: new FormControl(true)
  });

  constructor(
    private categoriaService: CategoriaService,
    private componenteService: ComponenteService,
    public montadorService: MontadorService
  ) {
  }

  ngOnInit() {
    this.categoriaService.listar().subscribe(dados => {
      this.categorias.set(dados);
    });
    this.carregarPecas();
  }

  // busca na api as peças da categoria aberta
  carregarPecas() {
    this.componenteService.listarPorCategoria(this.categoriaAtual()).subscribe(dados => {
      this.pecas.set(dados);
    });
  }

  // quando clica numa aba
  trocarCategoria(slug: string) {
    this.categoriaAtual.set(slug);
    this.filtros.reset({
      marca: '',
      soquete: '',
      precoMaximo: null,
      tdpMaximo: null,
      apenasCompativeis: true
    });
    this.carregarPecas();
  }

  // lista das marcas da categoria aberta, sem repetir
  marcas() {
    let lista: string[] = [];
    for (let peca of this.pecas()) {
      if (!lista.includes(peca.marca)) {
        lista.push(peca.marca);
      }
    }
    return lista;
  }

  // aplica os filtros na lista de peças
  pecasFiltradas() {
    let filtro = this.filtros.value;
    let resultado: Componente[] = [];

    for (let peca of this.pecas()) {
      let mostrar = true;

      if (filtro.marca && peca.marca != filtro.marca) {
        mostrar = false;
      }
      if (filtro.soquete && peca.soquete != filtro.soquete) {
        mostrar = false;
      }
      if (filtro.precoMaximo && this.montadorService.menorPreco(peca) > filtro.precoMaximo) {
        mostrar = false;
      }
      if (filtro.tdpMaximo && peca.tdp > filtro.tdpMaximo) {
        mostrar = false;
      }
      if (filtro.apenasCompativeis && !this.montadorService.ehCompativel(peca, this.escolhidas())) {
        mostrar = false;
      }

      if (mostrar) {
        resultado.push(peca);
      }
    }

    return resultado;
  }

  // adiciona a peça (se ja tinha uma da mesma categoria, troca)
  adicionar(peca: Componente) {
    let novaLista: Componente[] = [];
    for (let escolhida of this.escolhidas()) {
      if (escolhida.categoria != peca.categoria) {
        novaLista.push(escolhida);
      }
    }
    novaLista.push(peca);
    this.escolhidas.set(novaLista);
  }

  // remove a peça de uma categoria
  remover(categoria: string) {
    let novaLista: Componente[] = [];
    for (let escolhida of this.escolhidas()) {
      if (escolhida.categoria != categoria) {
        novaLista.push(escolhida);
      }
    }
    this.escolhidas.set(novaLista);
  }

  // retorna a peça escolhida de uma categoria
  pecaEscolhida(categoria: string) {
    return this.montadorService.buscarPeca(this.escolhidas(), categoria);
  }
}
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProdutoProntoService } from '../../services/produto-pronto-service';
import { ProdutoPronto } from '../../models/produto-pronto';

@Component({
  selector: 'app-produtos-prontos',
  imports: [ReactiveFormsModule],
  templateUrl: './produtos-prontos.html',
  styleUrl: './produtos-prontos.scss'
})
export class ProdutosProntos implements OnInit {

  produtos = signal<ProdutoPronto[]>([]);

  // filtros
  filtros = new FormGroup({
    tipo: new FormControl(''),
    categoriaUso: new FormControl(''),
    precoMaximo: new FormControl<number | null>(null)
  });

  constructor(private produtoProntoService: ProdutoProntoService) {
  }

  ngOnInit() {
    this.produtoProntoService.listar().subscribe(dados => {
      this.produtos.set(dados);
    });
  }

  // aplica os filtros
  produtosFiltrados() {
    let filtro = this.filtros.value;
    let resultado: ProdutoPronto[] = [];

    for (let produto of this.produtos()) {
      let mostrar = true;

      if (filtro.tipo && produto.tipo != filtro.tipo) {
        mostrar = false;
      }
      if (filtro.categoriaUso && produto.categoriaUso != filtro.categoriaUso) {
        mostrar = false;
      }
      if (filtro.precoMaximo && this.menorPreco(produto) > filtro.precoMaximo) {
        mostrar = false;
      }

      if (mostrar) {
        resultado.push(produto);
      }
    }

    return resultado;
  }

  menorPreco(produto: ProdutoPronto) {
    return Math.min(produto.precoMercadoLivre, produto.precoAliexpress);
  }

  lojaMaisBarata(produto: ProdutoPronto) {
    if (produto.precoAliexpress < produto.precoMercadoLivre) {
      return 'AliExpress';
    } else {
      return 'Mercado Livre';
    }
  }
}
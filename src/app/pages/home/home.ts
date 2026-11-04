import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ComponenteService } from '../../services/componente-service';
import { Componente } from '../../models/componente';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {


  ofertas = signal<Componente[]>([]);

  destaques = signal<Componente[]>([]);

  noticias = [
    { titulo: 'Placas de vídeo ficam mais baratas', resumo: 'As placas intermediárias tiveram queda de preço nos últimos meses.' },
    { titulo: 'Memória DDR5 mais acessível', resumo: 'Os kits de 16 GB DDR5 já custam quase o mesmo que os DDR4.' },
    { titulo: 'Vale a pena comprar no AliExpress?', resumo: 'Os preços costumam ser menores, mas o prazo de entrega é maior.' }
  ];

  constructor(private componenteService: ComponenteService) {
  }

  ngOnInit() {
    this.componenteService.listar().subscribe(dados => {

      let listaOfertas = dados.slice();
      listaOfertas.sort((a, b) => this.quedaDePreco(b) - this.quedaDePreco(a));
      this.ofertas.set(listaOfertas.slice(0, 4));

      let listaDestaques: Componente[] = [];
      for (let peca of dados) {
        if (peca.benchmark >= 75) {
          listaDestaques.push(peca);
        }
      }
      this.destaques.set(listaDestaques);
    });
  }


  menorPreco(peca: Componente) {
    if (peca.precoAliexpress < peca.precoMercadoLivre) {
      return peca.precoAliexpress;
    } else {
      return peca.precoMercadoLivre;
    }
  }

  lojaMaisBarata(peca: Componente) {
    if (peca.precoAliexpress < peca.precoMercadoLivre) {
      return 'AliExpress';
    } else {
      return 'Mercado Livre';
    }
  }

  quedaDePreco(peca: Componente) {
    return peca.historico[0] - peca.historico[peca.historico.length - 1];
  }
}
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ComponenteService } from '../../services/componente-service';
import { Componente } from '../../models/componente';

@Component({
  selector: 'app-componente-detalhe',
  imports: [RouterLink],
  templateUrl: './componente-detalhe.html',
  styleUrl: './componente-detalhe.scss'
})
export class ComponenteDetalhe implements OnInit {

  // a peça que esta sendo exibida
  peca = signal<Componente | null>(null);

  constructor(private rota: ActivatedRoute, private componenteService: ComponenteService) {
  }

  ngOnInit() {
    // pega o id que esta no endereço (ex: /componente/7)
    let id = Number(this.rota.snapshot.paramMap.get('id'));

    this.componenteService.buscarPorId(id).subscribe(dados => {
      this.peca.set(dados);
    });
  }

  // diferença de preço entre as duas lojas
  economia(peca: Componente) {
    return Math.abs(peca.precoMercadoLivre - peca.precoAliexpress);
  }
}
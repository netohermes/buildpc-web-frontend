import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ComponenteService } from '../../services/componente-service';
import { Componente } from '../../models/componente';

@Component({
  selector: 'app-componente-detalhe',
  imports: [RouterLink],
  templateUrl: './componente-detalhe.html',
  styleUrl: './componente-detalhe.scss'
})
export class ComponenteDetalhe implements OnInit {

  peca = signal<Componente | null>(null);

  constructor(private rota: ActivatedRoute, private router: Router, private componenteService: ComponenteService) {
  }

  ngOnInit() {
    let id = Number(this.rota.snapshot.paramMap.get('id'));

    this.componenteService.buscarPorId(id).subscribe(dados => {
      if (dados == null) {
        this.router.navigate(['/']);
      } else {
        this.peca.set(dados);
      }
    });
  }

  economia(peca: Componente) {
    return Math.abs(peca.precoMercadoLivre - peca.precoAliexpress);
  }
}
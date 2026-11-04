import { Component, OnInit, signal } from '@angular/core';
import { ComponenteService } from '../../services/componente-service';
import { Componente } from '../../models/componente';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  // lista de peças (começa vazia)
  componentes = signal<Componente[]>([]);

  constructor(private componenteService: ComponenteService) {
  }

  // roda quando a pagina abre
  ngOnInit() {
    this.componenteService.listar().subscribe(dados => {
      this.componentes.set(dados);
    });
  }
}
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComponenteService } from '../../services/componente-service';
import { Componente } from '../../models/componente';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin implements OnInit {

  componentes = signal<Componente[]>([]);

  pecaEditando = signal<Componente | null>(null);

  mensagem = signal('');

  busca = new FormControl('');

  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    marca: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    soquete: new FormControl(''),
    tipoMemoria: new FormControl(''),
    potencia: new FormControl<number | null>(null, Validators.min(0)),
    tdp: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    precoMercadoLivre: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)]),
    precoAliexpress: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)])
  });

  constructor(private componenteService: ComponenteService) {
  }

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.componenteService.listar().subscribe(dados => {
      this.componentes.set(dados);
    });
  }

  pesquisar() {
    this.componenteService.pesquisar(this.busca.value || '').subscribe(dados => {
      this.componentes.set(dados);
    });
  }

  campoInvalido(nome: string) {
    let campo = this.formulario.get(nome);
    return campo!.invalid && campo!.touched;
  }

  salvar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    let dados: any = this.formulario.value;

    if (this.pecaEditando() == null) {
      let nova = {
        ...dados,
        benchmark: 0,
        descricao: '',
        imagem: 'https://placehold.co/300x300?text=' + dados.nome,
        historico: [Math.min(dados.precoMercadoLivre, dados.precoAliexpress)]
      };
      this.componenteService.cadastrar(nova).subscribe(() => {
        this.limpar();
        this.mensagem.set('Peça cadastrada com sucesso!');
        this.carregar();
      });
    } else {
      let atualizada = { ...this.pecaEditando(), ...dados };
      this.componenteService.atualizar(atualizada).subscribe(() => {
        this.limpar();
        this.mensagem.set('Peça atualizada com sucesso!');
        this.carregar();
      });
    }
  }

  editar(peca: Componente) {
    this.limpar();
    this.pecaEditando.set(peca);
    this.formulario.patchValue(peca);
    window.scrollTo(0, 0);
  }

  excluir(peca: Componente) {
    if (confirm('Excluir "' + peca.nome + '"?')) {
      this.componenteService.excluir(peca.id!).subscribe(() => {
        this.mensagem.set('Peça excluída com sucesso!');
        this.carregar();
      });
    }
  }

  limpar() {
    this.formulario.reset({ categoria: '', soquete: '', tipoMemoria: '' });
    this.pecaEditando.set(null);
    this.mensagem.set('');
  }
}
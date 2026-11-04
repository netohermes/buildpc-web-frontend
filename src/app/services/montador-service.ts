import { Injectable } from '@angular/core';
import { Componente } from '../models/componente';

@Injectable({
  providedIn: 'root'
})
export class MontadorService {

  // procura na lista a peça escolhida de uma categoria
  buscarPeca(escolhidas: Componente[], categoria: string) {
    for (let peca of escolhidas) {
      if (peca.categoria == categoria) {
        return peca;
      }
    }
    return undefined;
  }

  // menor preço entre as duas lojas
  menorPreco(peca: Componente) {
    if (peca.precoAliexpress < peca.precoMercadoLivre) {
      return peca.precoAliexpress;
    } else {
      return peca.precoMercadoLivre;
    }
  }

  // soma o menor preço de todas as peças escolhidas
  calcularTotal(escolhidas: Componente[]) {
    let total = 0;
    for (let peca of escolhidas) {
      total = total + this.menorPreco(peca);
    }
    return total;
  }

  // soma o consumo (tdp) de todas as peças escolhidas
  calcularConsumo(escolhidas: Componente[]) {
    let consumo = 0;
    for (let peca of escolhidas) {
      consumo = consumo + peca.tdp;
    }
    return consumo;
  }

  // fonte recomendada: consumo + 30% de folga
  potenciaRecomendada(escolhidas: Componente[]) {
    let consumo = this.calcularConsumo(escolhidas);
    return Math.ceil(consumo * 1.3);
  }

  // confere se uma peça combina com as que ja foram escolhidas
  ehCompativel(peca: Componente, escolhidas: Componente[]) {
    let processador = this.buscarPeca(escolhidas, 'processador');
    let placaMae = this.buscarPeca(escolhidas, 'placa-mae');
    let memoria = this.buscarPeca(escolhidas, 'memoria-ram');

    // processador precisa ter o mesmo soquete da placa-mãe
    if (peca.categoria == 'processador' && placaMae) {
      if (peca.soquete != placaMae.soquete) {
        return false;
      }
    }

    // placa-mãe precisa combinar com o processador e com a memória
    if (peca.categoria == 'placa-mae') {
      if (processador && peca.soquete != processador.soquete) {
        return false;
      }
      if (memoria && peca.tipoMemoria != memoria.tipoMemoria) {
        return false;
      }
    }

    // memória precisa ser do tipo que a placa-mãe aceita
    if (peca.categoria == 'memoria-ram' && placaMae) {
      if (peca.tipoMemoria != placaMae.tipoMemoria) {
        return false;
      }
    }

    // fonte precisa aguentar o consumo
    if (peca.categoria == 'fonte') {
      if ((peca.potencia || 0) < this.potenciaRecomendada(escolhidas)) {
        return false;
      }
    }

    return true;
  }

  // monta a lista de problemas da montagem
  verificarProblemas(escolhidas: Componente[]) {
    let problemas: string[] = [];

    let processador = this.buscarPeca(escolhidas, 'processador');
    let placaMae = this.buscarPeca(escolhidas, 'placa-mae');
    let memoria = this.buscarPeca(escolhidas, 'memoria-ram');
    let fonte = this.buscarPeca(escolhidas, 'fonte');

    if (processador && placaMae && processador.soquete != placaMae.soquete) {
      problemas.push('O processador (' + processador.soquete + ') não encaixa na placa-mãe (' + placaMae.soquete + ').');
    }

    if (placaMae && memoria && placaMae.tipoMemoria != memoria.tipoMemoria) {
      problemas.push('A memória é ' + memoria.tipoMemoria + ', mas a placa-mãe só aceita ' + placaMae.tipoMemoria + '.');
    }

    if (fonte) {
      let recomendada = this.potenciaRecomendada(escolhidas);
      if ((fonte.potencia || 0) < recomendada) {
        problemas.push('A fonte de ' + fonte.potencia + 'W é fraca. O recomendado é pelo menos ' + recomendada + 'W.');
      }
    }

    return problemas;
  }
}
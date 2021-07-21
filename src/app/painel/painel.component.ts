import { Component, OnInit } from '@angular/core';
import { ProdutoService } from './produto.service';
import { IProdutos } from './pessoas/I-produtos';
import { FormControl } from '@angular/forms';
import { HostListener } from '@angular/core';
import { Produto } from './pessoas/produto';
@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements OnInit {
  produtos: Produto[] = [];
  selectedItem: IProdutos;
  pesquisaContainerActived = false;
  statusControl = new FormControl('A');
  posAtual = 0;
  qntdPorPagina = 50;
  ultimaconsulta: string;
  displayedColumns = [
    'codigo',
    'descricao',
    'cl',
  ];
  constructor(
    private readonly produtoService: ProdutoService,
  ) { }

  ngOnInit() {
  }

  async pesquisar(query: string = this.ultimaconsulta,posAtual = 0){
    this.posAtual = posAtual
    this.ultimaconsulta = query
    const result = await this.produtoService.getProdutos(this.ultimaconsulta, posAtual);
    if(posAtual === 0){
      this.produtos = [...result]
    }else{
      this.produtos = [...this.produtos, ...result]
    }
  }

  carregarMaisItens(){
    if(this.produtos.length === this.posAtual + this.qntdPorPagina){
      this.posAtual = this.posAtual + this.qntdPorPagina
      this.pesquisar(this.ultimaconsulta, this.posAtual);
    }
  }

  @HostListener('click', ['$event'])
  backDropClick(event: MouseEvent) {

    this.pesquisaContainerActived = false;
  }
}

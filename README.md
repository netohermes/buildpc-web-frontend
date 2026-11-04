# BuildPC

Aplicação web em Angular que compara o preço de peças de computador entre o Mercado Livre e o AliExpress, mostrando a loja mais barata, as ofertas que mais baixaram de preço e as peças com melhor desempenho.

Projeto da disciplina Desenvolvimento Web Front-End (Universidade FUMEC). Esta versão corresponde ao **Trabalho 02 – Roteamento, Data-binding, Diretivas, Services e Funções de Manipulação de Dados**.

## Telas

| Rota | Tela | Funcionalidades |
| --- | --- | --- |
| `/` | Home | Ofertas do dia (peças que mais baixaram de preço), destaques de desempenho, notícias e links para os detalhes de cada peça. |
| `/componente/:id` | Detalhes da peça | Foto, especificações, barra de desempenho, comparação de preços entre as lojas e valor economizado. Um id inexistente volta para o início. |
| `/admin` | Área administrativa | Cadastro, edição, exclusão e pesquisa de peças, com formulário reativo e validações. Botão para ver os detalhes de cada peça. |

O menu de navegação (Início e Admin) fica no cabeçalho, presente em todas as telas.

## Como rodar

Requisitos: Node.js 20 ou superior.

```bash
npm install
npm start
```

Depois abra `http://localhost:4200/` no navegador.

Não é preciso API nem banco de dados: os dados são mock (veja abaixo).

Outros comandos:

```bash
npm run build   # gera a versão de produção em dist/
npm test        # roda os testes unitários
```

## Dados (mock)

- `src/app/models/componente.ts`: interface `Componente`, que define a estrutura de uma peça.
- `src/app/data/componentes-mock.ts`: lista estática `COMPONENTES` com 12 peças.
- `src/app/services/componente-service.ts`: `ComponenteService`, responsável por listar, buscar por id, pesquisar, cadastrar, atualizar e excluir peças. Trabalha sobre uma cópia da lista em memória, então as alterações somem ao recarregar a página.

## Estrutura

```
src/app/
  app.routes.ts      rotas da aplicação
  app.config.ts      provideRouter(routes)
  app.ts / app.html  moldura: cabeçalho, <router-outlet> e rodapé
  shared/            header (menu) e footer
  pages/             home, componente-detalhe e admin
  services/          ComponenteService
  models/            interface Componente
  data/              lista mock de componentes
```

As rotas ficam em `app.routes.ts`, que no Angular 21 (componentes standalone) faz o papel do antigo `app-routing.module.ts`.

## Conceitos aplicados

- **Roteamento:** rotas com parâmetro (`componente/:id`), rota curinga (`**`), `routerLink`, `routerLinkActive` e navegação por código com `Router.navigate`.
- **Data-binding:** interpolação, property binding (`[src]`, `[disabled]`, `[class.melhor]`, `[style.width.%]`), event binding (`(click)`, `(ngSubmit)`, `(keyup.enter)`) e signals.
- **Diretivas e controle de fluxo:** `@if`, `@for`, `formGroup`, `formControlName` e `formControl`.
- **Services:** toda a manipulação de dados passa pelo `ComponenteService`.

## Versionamento

O projeto segue GitFlow e Conventional Commits:

- `feature/*`: desenvolvimento de cada parte (home, detalhes, admin, services…);
- `develop`: integração das features;
- `release/trabalho-02`: versão preparada para esta entrega;
- `main`: versão entregue, marcada com a tag `v0.2.0`.

Tecnologias: Angular 21, TypeScript, SCSS e RxJS.

# ProjetoHQ - Interface Web

# Como usar

1. Acesso a pasta do projeto e digite o comando abaixo:

```sh
npm install
```

2. Inicie o servidor  `localhost:4200` no seu browser:

```sh
npm start
```

# Estrutura do Projeto

```
dist/                        web app production build
docs/                        project docs and coding guides
e2e/                         end-to-end tests
src/                         project source code
|- app/                      app components
|  |- core/                  core module (singleton services and single-use components)
|  |- shared/                shared module  (common components, directives and pipes)
|  |- app.component.*        app root component (shell)
|  |- app.module.ts          app root module definition
|  |- app-routing.module.ts  app routes
|  +- ...                    additional modules and components
|- assets/                   app assets (images, fonts, sounds...)
|- environments/             values for various build environments
|- theme/                    app global scss variables and theme
|- translations/             translations files
|- index.html                html entry point
|- main.scss                 global style entry point
|- main.ts                   app entry point
|- polyfills.ts              polyfills needed by Angular
+- test.ts                   unit tests entry point
reports/                     test and coverage reports
proxy.conf.js                backend proxy configuration
```

# App Template

O template foi construido com [HTML5](http://whatwg.org/html), [TypeScript](http://www.typescriptlang.org) e
[Sass](http://sass-lang.com). Os arquivos de tradução estão no formato [JSON](http://www.json.org).

#### Bibliotecas utilizadas

- [Angular](https://angular.io)
- [Bootstrap 5](https://getbootstrap.com)
- [ng-bootsrap](https://ng-bootstrap.github.io/)
- [Font Awesome](http://fontawesome.io)
- [RxJS](http://reactivex.io/rxjs)
- [ngx-translate](https://github.com/ngx-translate/core)


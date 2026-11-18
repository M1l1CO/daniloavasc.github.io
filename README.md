# Danilo Vasconcellos

Site pessoal disponível em <https://m1l1co.github.io/daniloavasc.github.io/>.

## Versões

- `V1/`: versão estática antiga, preservada como histórico e backup.
- `V2/`: versão atual em Angular, publicada no GitHub Pages pelo workflow do repositório.

## Executar a V2 localmente

```bash
cd V2
npm ci
npm start
```

O servidor de desenvolvimento ficará disponível em `http://localhost:4200`.

Para gerar o build local com o caminho-base do GitHub Pages:

```bash
npm run build -- --base-href /daniloavasc.github.io/
```

O build de produção é publicado automaticamente no GitHub Pages após alterações
na branch `main`. A aplicação fica em `src/app`; a navegação está em
`src/app/layout/site-navigation` e as seções do currículo em `src/app/sections`.

Os logos das empresas ficam em `V2/public/assets/companies`. Os logos Vidalink
e DXC foram obtidos nos sites oficiais; o logo histórico da Bemis veio do
[Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Bemis_Company_logo.svg).

# V2 — Portfólio Angular

## Desenvolvimento local

```bash
npm ci
npm start
```

O servidor fica disponível em `http://localhost:4200`.

## Testes e build

```bash
npm test -- --watch=false
npm run build -- --base-href /daniloavasc.github.io/
```

O GitHub Actions publica o conteúdo de `dist/portfolio-angular/browser` no
GitHub Pages quando há alterações na branch `main`.

`src/legacy-base.css` mantém uma cópia dos estilos-base usados pela V1 para que
a V2 possa ser compilada e publicada de forma independente.

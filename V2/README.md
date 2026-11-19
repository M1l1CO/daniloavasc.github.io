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

## Analytics de visitas

O Cloudflare Web Analytics está configurado em `src/index.html` usando o JS
Snippet. Após o deploy e os primeiros acessos, as métricas ficam disponíveis no
painel **Web Analytics** da conta Cloudflare. O token é público por natureza e
fica visível no código entregue ao navegador.

`src/legacy-base.css` mantém uma cópia dos estilos-base usados pela V1 para que
a V2 possa ser compilada e publicada de forma independente.

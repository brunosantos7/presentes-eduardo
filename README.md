# Edu Air Free Shop · 1º aniversário do Eduardo

“Loja de bordo” do primeiro aniversário do Eduardo: brinquedos de verdade com preços de brincadeira. O convidado coloca itens na mala, fecha a compra e paga o total com Pix (QR Code ou copia e cola) direto na chave.

Site: https://brunosantos7.github.io/presentes-eduardo/

## Editar conteúdo

- `src/data/evento.ts` — nome da loja, textos do topo, chave Pix (CPF), nome e cidade do recebedor
- `src/data/presentes.ts` — produtos: nome, piada, descrição real, preço “original”, preço e imagem
- `public/images/` — ilustrações dos produtos (JPEG 640px) e imagem do herói

## Desenvolvimento

```bash
npm install
npm test
npm run dev
```

O Vite usa o base path `/presentes-eduardo/` (Pages do repositório). O workflow define `VITE_BASE_PATH` automaticamente.

## Deploy

Push em `main` dispara `.github/workflows/deploy.yml`, que roda testes, faz o build e publica `dist` no GitHub Pages (modo GitHub Actions, já ativo no repositório).

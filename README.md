# Presentes do Eduardo

Lista de aniversário com pagamento via Pix. O convidado escolhe um presente (ou um valor livre), lê o QR Code ou copia o código Pix e o valor cai direto na chave.

Site: https://brunosantos7.github.io/presentes-eduardo/

## Editar a lista e o Pix

Tudo fica em dois arquivos:

- `src/data/evento.ts` — nome, chave Pix, cidade e WhatsApp
- `src/data/presentes.ts` — itens e valores

## Desenvolvimento

```bash
npm install
npm test
npm run dev
```

O Vite usa o base path `/presentes-eduardo/` (GitHub Pages do repositório). Em produção o workflow define `VITE_BASE_PATH` automaticamente.

## Deploy

O push em `main` dispara `.github/workflows/deploy.yml` e publica o `dist` no GitHub Pages. O repositório já está com Pages no modo **GitHub Actions**.

const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatarPreco(valor: number): string {
  return moeda.format(valor);
}

export function formatarPrecoAbsurdo(valor: number): string {
  if (valor >= 1_000_000) {
    const milhoes = valor / 1_000_000;
    return `R$ ${milhoes.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} mi`;
  }
  return moeda.format(valor);
}

export function desconto(original: number, atual: number): string {
  const pct = (1 - atual / original) * 100;
  // Acima disso o número vira ruído; a piada funciona melhor com um teto fixo.
  if (pct >= 99.9) return "-99,99%";
  return `-${pct.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}%`;
}

export function imagem(nome: string): string {
  return `${import.meta.env.BASE_URL}images/${nome}`;
}

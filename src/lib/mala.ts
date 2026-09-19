import { useReducer } from "react";
import { produtos } from "../data/presentes";

export type ItemMala = {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  livre?: boolean;
};

type Acao =
  | { tipo: "adicionar"; produtoId: string }
  | { tipo: "adicionarLivre"; valor: number }
  | { tipo: "alterar"; id: string; delta: number }
  | { tipo: "remover"; id: string }
  | { tipo: "limpar" };

function reducer(estado: ItemMala[], acao: Acao): ItemMala[] {
  switch (acao.tipo) {
    case "adicionar": {
      const produto = produtos.find((p) => p.id === acao.produtoId);
      if (!produto) return estado;
      const existente = estado.find((i) => i.id === produto.id);
      if (existente) {
        return estado.map((i) =>
          i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i,
        );
      }
      return [
        ...estado,
        { id: produto.id, nome: produto.nome, preco: produto.preco, quantidade: 1 },
      ];
    }
    case "adicionarLivre":
      return [
        ...estado,
        {
          id: `livre-${Date.now()}`,
          nome: "Milhas Edu Air",
          preco: acao.valor,
          quantidade: 1,
          livre: true,
        },
      ];
    case "alterar":
      return estado
        .map((i) =>
          i.id === acao.id ? { ...i, quantidade: i.quantidade + acao.delta } : i,
        )
        .filter((i) => i.quantidade > 0);
    case "remover":
      return estado.filter((i) => i.id !== acao.id);
    case "limpar":
      return [];
  }
}

export function useMala() {
  const [itens, dispatch] = useReducer(reducer, []);
  const total = itens.reduce((soma, i) => soma + i.preco * i.quantidade, 0);
  const quantidade = itens.reduce((soma, i) => soma + i.quantidade, 0);
  return { itens, total, quantidade, dispatch };
}

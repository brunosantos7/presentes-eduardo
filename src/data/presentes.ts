export type Presente = {
  id: string;
  nome: string;
  descricao: string;
  valor: number;
  emoji: string;
};

export const presentes: Presente[] = [
  {
    id: "jantar",
    nome: "Jantar especial",
    descricao: "Uma noite boa de comida e conversa, sem pressa.",
    valor: 150,
    emoji: "🍝",
  },
  {
    id: "fone",
    nome: "Fone de ouvido",
    descricao: "Música, podcast e aquele filme no sofá.",
    valor: 200,
    emoji: "🎧",
  },
  {
    id: "livros",
    nome: "Livros novos",
    descricao: "Pilha de leitura para a próxima estação.",
    valor: 80,
    emoji: "📚",
  },
  {
    id: "ingresso",
    nome: "Ingresso / experiência",
    descricao: "Show, cinema, museu ou aquele programa diferente.",
    valor: 120,
    emoji: "🎟️",
  },
  {
    id: "viagem",
    nome: "Caixinha da viagem",
    descricao: "Uma ajuda para o próximo destino.",
    valor: 250,
    emoji: "✈️",
  },
  {
    id: "surpresa",
    nome: "Presente surpresa",
    descricao: "Contribuição livre para ele escolher depois.",
    valor: 50,
    emoji: "🎁",
  },
];

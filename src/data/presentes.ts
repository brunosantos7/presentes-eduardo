export type Produto = {
  id: string;
  nome: string;
  chamada: string;
  descricao: string;
  precoOriginal: number;
  preco: number;
  imagem: string;
  selo?: string;
};

export const produtos: Produto[] = [
  {
    id: "aviao",
    nome: "Avião particular",
    chamada: "Jato executivo de 1 lugar, movido a mãozinha.",
    descricao: "Aviãozinho de madeira para puxar e empurrar.",
    precoOriginal: 45_000_000,
    preco: 45,
    imagem: "aviao.jpg",
    selo: "Primeira classe",
  },
  {
    id: "carro",
    nome: "Ferrari 0 km",
    chamada: "De zero a “dá-dá” em 2 segundos.",
    descricao: "Carrinho de brinquedo com rodas grandes.",
    precoOriginal: 3_500_000,
    preco: 35,
    imagem: "carro.jpg",
  },
  {
    id: "mansao",
    nome: "Mansão com piscina",
    chamada: "4 suítes imaginárias e piscina de bolinhas aquecida pelo sol.",
    descricao: "Cabaninha infantil + piscina de bolinhas.",
    precoOriginal: 12_000_000,
    preco: 60,
    imagem: "mansao.jpg",
    selo: "Imóvel de luxo",
  },
  {
    id: "iate",
    nome: "Iate de luxo",
    chamada: "Navega em águas rasas (banheira). Tripulação de patos inclusa.",
    descricao: "Barquinho de banho com patinhos.",
    precoOriginal: 8_000_000,
    preco: 20,
    imagem: "iate.jpg",
  },
  {
    id: "urso",
    nome: "Copiloto oficial",
    chamada: "Urso aviador com 10.000 horas de voo no colo.",
    descricao: "Pelúcia de urso com capacete e cachecol.",
    precoOriginal: 1_200,
    preco: 40,
    imagem: "urso.jpg",
    selo: "Tripulação",
  },
  {
    id: "mala",
    nome: "Mala de grife",
    chamada: "Coleção Lisboa–Rio. Cabe 3 chupetas e 1 biscoito.",
    descricao: "Malinha infantil de rodinhas.",
    precoOriginal: 25_000,
    preco: 55,
    imagem: "mala.jpg",
  },
  {
    id: "trem",
    nome: "Trem-bala",
    chamada: "Tóquio → Araguari em 0 minutos (não sai da sala).",
    descricao: "Trenzinho de madeira com vagões coloridos.",
    precoOriginal: 300_000_000,
    preco: 40,
    imagem: "trem.jpg",
  },
  {
    id: "balao",
    nome: "Balão panorâmico",
    chamada: "Voo sobre o berço. Decolagem às 20h, hora do sono.",
    descricao: "Móbile de balão em tecido para o quarto.",
    precoOriginal: 2_500,
    preco: 30,
    imagem: "balao.jpg",
  },
  {
    id: "triciclo",
    nome: "Moto de alta cilindrada",
    chamada: "Motor: pernas do papai. Buzina de verdade.",
    descricao: "Triciclo/andador com empurrador.",
    precoOriginal: 15_000,
    preco: 90,
    imagem: "triciclo.jpg",
  },
  {
    id: "globo",
    nome: "Volta ao mundo",
    chamada: "Em 80 dias… ou 80 minutos de soneca.",
    descricao: "Bola-globo de pelúcia com mapa e bússola.",
    precoOriginal: 120_000,
    preco: 50,
    imagem: "globo.jpg",
  },
  {
    id: "fraldas",
    nome: "Querosene de aviação",
    chamada: "Combustível essencial. Sem ele, nenhum voo decola.",
    descricao: "Pacote grande de fraldas.",
    precoOriginal: 5_000,
    preco: 100,
    imagem: "fraldas.jpg",
    selo: "Mais vendido",
  },
  {
    id: "fantasia",
    nome: "Uniforme de comandante",
    chamada: "Tamanho 1 ano. Asas não incluídas.",
    descricao: "Fantasia de aviador com jaqueta, capacete e cachecol.",
    precoOriginal: 3_000,
    preco: 70,
    imagem: "fantasia.jpg",
  },
];

import { useState } from "react";
import { evento } from "./data/evento";
import { produtos } from "./data/presentes";
import { imagem } from "./lib/format";
import { ProdutoCard } from "./components/ProdutoCard";
import { MilhasCard } from "./components/MilhasCard";
import { Checkout, type Escolha } from "./components/Checkout";

export default function App() {
  const [escolha, setEscolha] = useState<Escolha | null>(null);

  return (
    <div className="loja">
      <header className="topo">
        <div className="topo-inner">
          <div className="marca">
            <span className="marca-asa" aria-hidden>
              ✈
            </span>
            <div>
              <strong>{evento.loja}</strong>
              <small>{evento.voo}</small>
            </div>
          </div>
          <a className="btn-mala" href="#vitrine">
            <span aria-hidden>🧳</span>
            <span className="btn-mala-texto">Vitrine</span>
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-texto">
          <p className="etiqueta">1º aniversário · Loja de bordo</p>
          <h1>{evento.titulo}</h1>
          <p className="hero-sub">{evento.subtitulo}</p>
          <p className="hero-msg">{evento.mensagem}</p>
          <div className="hero-selos">
            <span>Frete grátis para o colo</span>
            <span>Pix direto, sem taxa</span>
            <span>Troca por sorriso</span>
          </div>
          <a className="btn-primario" href="#vitrine">
            Ver a vitrine
          </a>
        </div>
        <div className="hero-img">
          <img
            src={imagem("hero-urso.jpg")}
            alt="Ursinho aviador pilotando um avião vermelho e amarelo"
            width={900}
            height={900}
          />
        </div>
      </section>

      <div className="faixa" aria-hidden>
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className={`bandeirinha b${i % 4}`} />
        ))}
      </div>

      <main id="vitrine" className="vitrine">
        <div className="vitrine-cabecalho">
          <h2>Ofertas de bordo</h2>
          <p>Preços de mentira, brinquedos de verdade. Escolha um e pague com Pix.</p>
        </div>
        <div className="grade">
          {produtos.map((produto) => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
              onEscolher={() => setEscolha({ nome: produto.nome, valor: produto.preco })}
            />
          ))}
          <MilhasCard onEscolher={(valor) => setEscolha({ nome: "Milhas Edu Air", valor })} />
        </div>
      </main>

      <footer className="rodape">
        <p>
          Pix ({evento.pix.tipo}): <strong>{evento.pix.chave}</strong>
        </p>
        <p className="rodape-fino">
          Nenhuma compra é real: é uma transferência Pix direta. Nada é salvo neste site.
        </p>
        <p className="rodape-fino">Obrigado por embarcar nessa aventura com o {evento.homenageado}!</p>
      </footer>

      {escolha ? <Checkout escolha={escolha} onClose={() => setEscolha(null)} /> : null}
    </div>
  );
}

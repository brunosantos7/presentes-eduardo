import { useEffect, useState } from "react";
import { evento } from "./data/evento";
import { produtos } from "./data/presentes";
import { formatarPreco, imagem } from "./lib/format";
import { useMala } from "./lib/mala";
import { ProdutoCard } from "./components/ProdutoCard";
import { MilhasCard } from "./components/MilhasCard";
import { Checkout } from "./components/Checkout";

export default function App() {
  const mala = useMala();
  const [checkoutAberto, setCheckoutAberto] = useState(false);
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    if (!aviso) return;
    const t = window.setTimeout(() => setAviso(""), 1800);
    return () => window.clearTimeout(t);
  }, [aviso]);

  function adicionar(produtoId: string, nome: string) {
    mala.dispatch({ tipo: "adicionar", produtoId });
    setAviso(`${nome} foi para a mala.`);
  }

  function adicionarLivre(valor: number) {
    mala.dispatch({ tipo: "adicionarLivre", valor });
    setAviso(`${formatarPreco(valor)} em milhas foram para a mala.`);
  }

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
          <button
            type="button"
            className="btn-mala"
            onClick={() => setCheckoutAberto(true)}
            aria-label={`Abrir mala com ${mala.quantidade} itens`}
          >
            <span aria-hidden>🧳</span>
            <span className="btn-mala-texto">Mala</span>
            {mala.quantidade > 0 ? <span className="badge">{mala.quantidade}</span> : null}
          </button>
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
          <p>Preços de mentira, brinquedos de verdade. Estoque ilimitado — pode repetir.</p>
        </div>
        <div className="grade">
          {produtos.map((produto) => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
              onAdicionar={() => adicionar(produto.id, produto.nome)}
            />
          ))}
          <MilhasCard onAdicionar={adicionarLivre} />
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

      {mala.quantidade > 0 ? (
        <div className="barra-mala">
          <div>
            <strong>{formatarPreco(mala.total)}</strong>
            <small>
              {mala.quantidade} {mala.quantidade === 1 ? "item na mala" : "itens na mala"}
            </small>
          </div>
          <button type="button" className="btn-primario" onClick={() => setCheckoutAberto(true)}>
            Fechar a mala e pagar
          </button>
        </div>
      ) : null}

      {aviso ? (
        <div className="toast" role="status">
          {aviso}
        </div>
      ) : null}

      {checkoutAberto ? (
        <Checkout
          itens={mala.itens}
          total={mala.total}
          onAlterar={(id, delta) => mala.dispatch({ tipo: "alterar", id, delta })}
          onRemover={(id) => mala.dispatch({ tipo: "remover", id })}
          onClose={() => setCheckoutAberto(false)}
        />
      ) : null}
    </div>
  );
}

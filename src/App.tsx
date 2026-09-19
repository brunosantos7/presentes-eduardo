import { useMemo, useState } from "react";
import { evento } from "./data/evento";
import { presentes, type Presente } from "./data/presentes";
import { formatarPreco } from "./lib/format";
import { PixModal } from "./components/PixModal";

type Selecao = {
  nome: string;
  valor: number;
};

export default function App() {
  const [selecao, setSelecao] = useState<Selecao | null>(null);
  const [valorLivre, setValorLivre] = useState("75");

  const valorLivreNumero = useMemo(() => {
    const normalizado = valorLivre.replace(/\./g, "").replace(",", ".");
    return Number.parseFloat(normalizado);
  }, [valorLivre]);

  function presentear(presente: Presente) {
    setSelecao({ nome: presente.nome, valor: presente.valor });
  }

  function presentearLivre() {
    if (!Number.isFinite(valorLivreNumero) || valorLivreNumero <= 0) {
      return;
    }
    setSelecao({ nome: "Presente livre", valor: valorLivreNumero });
  }

  const whatsappLista = evento.whatsapp
    ? `https://wa.me/${evento.whatsapp}?text=${encodeURIComponent(
        `Oi! Quero presentear o ${evento.homenageado} pela lista: https://brunosantos7.github.io/presentes-eduardo/`,
      )}`
    : null;

  return (
    <div className="page">
      <div className="glow" aria-hidden />
      <header className="hero">
        <p className="eyebrow">Lista de presentes · Pix</p>
        <h1>{evento.titulo}</h1>
        <p className="lead">{evento.subtitulo}</p>
        <p className="message">{evento.mensagem}</p>
      </header>

      <main>
        <section className="grid" aria-label="Lista de presentes">
          {presentes.map((presente) => (
            <article key={presente.id} className="card">
              <div className="card-top">
                <span className="emoji" aria-hidden>
                  {presente.emoji}
                </span>
                <strong>{formatarPreco(presente.valor)}</strong>
              </div>
              <h2>{presente.nome}</h2>
              <p>{presente.descricao}</p>
              <button type="button" onClick={() => presentear(presente)}>
                Presentear via Pix
              </button>
            </article>
          ))}

          <article className="card card-livre">
            <div className="card-top">
              <span className="emoji" aria-hidden>
                ✨
              </span>
              <strong>Valor livre</strong>
            </div>
            <h2>Outro valor</h2>
            <p>Mande o quanto fizer sentido para você.</p>
            <label className="valor-livre">
              <span>Valor em reais</span>
              <input
                inputMode="decimal"
                value={valorLivre}
                onChange={(event) => setValorLivre(event.target.value)}
                aria-label="Valor livre em reais"
              />
            </label>
            <button
              type="button"
              onClick={presentearLivre}
              disabled={!Number.isFinite(valorLivreNumero) || valorLivreNumero <= 0}
            >
              Gerar Pix
            </button>
          </article>
        </section>
      </main>

      <footer className="footer">
        <p>
          Chave Pix ({evento.pix.tipo}): <span>{evento.pix.chave}</span>
        </p>
        {whatsappLista ? (
          <a href={whatsappLista} target="_blank" rel="noreferrer">
            Combinar pelo WhatsApp
          </a>
        ) : null}
        <p className="fine">O pagamento vai direto para a chave Pix. Nenhum dado seu fica salvo neste site.</p>
      </footer>

      {selecao ? (
        <PixModal
          nomePresente={selecao.nome}
          valor={selecao.valor}
          onClose={() => setSelecao(null)}
        />
      ) : null}
    </div>
  );
}

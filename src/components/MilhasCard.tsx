import { useState } from "react";

type Props = {
  onAdicionar: (valor: number) => void;
};

const sugestoes = [25, 50, 100];

export function MilhasCard({ onAdicionar }: Props) {
  const [texto, setTexto] = useState("");

  const valor = Number.parseFloat(texto.replace(/\./g, "").replace(",", "."));
  const valido = Number.isFinite(valor) && valor > 0;

  return (
    <article className="produto produto-milhas">
      <div className="produto-corpo">
        <p className="etiqueta">Programa de fidelidade</p>
        <h3>Milhas Edu Air</h3>
        <p className="chamada">Não achou o brinquedo ideal? Mande milhas: ele troca depois.</p>
        <div className="sugestoes">
          {sugestoes.map((s) => (
            <button
              key={s}
              type="button"
              className="chip"
              onClick={() => setTexto(String(s))}
            >
              R$ {s}
            </button>
          ))}
        </div>
        <label className="campo">
          <span>Outro valor (R$)</span>
          <input
            inputMode="decimal"
            placeholder="Ex.: 80"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        </label>
        <button
          type="button"
          className="btn-primario"
          disabled={!valido}
          onClick={() => {
            onAdicionar(valor);
            setTexto("");
          }}
        >
          Colocar na mala
        </button>
      </div>
    </article>
  );
}

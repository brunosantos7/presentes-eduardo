import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { evento } from "../data/evento";
import { formatarPreco } from "../lib/format";
import { montarPixCopiaECola } from "../lib/pix";

export type Escolha = {
  nome: string;
  valor: number;
};

type Props = {
  escolha: Escolha;
  onClose: () => void;
};

export function Checkout({ escolha, onClose }: Props) {
  const [qr, setQr] = useState("");
  const [feedback, setFeedback] = useState("");

  const payload = montarPixCopiaECola({
    chave: evento.pix.chave,
    nome: evento.pix.nomeRecebedor,
    cidade: evento.pix.cidade,
    valor: escolha.valor,
  });

  useEffect(() => {
    let ativo = true;
    QRCode.toDataURL(payload, {
      width: 320,
      margin: 1,
      color: { dark: "#17365c", light: "#fffdf7" },
    }).then((url) => {
      if (ativo) setQr(url);
    });
    return () => {
      ativo = false;
    };
  }, [payload]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function copiar(texto: string, ok: string) {
    try {
      await navigator.clipboard.writeText(texto);
      setFeedback(ok);
    } catch {
      setFeedback("Não deu para copiar automaticamente. Selecione e copie o texto.");
    }
  }

  return (
    <div className="modal-fundo" onClick={onClose} role="presentation">
      <div
        className="cartao"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cartao-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="fechar" onClick={onClose} aria-label="Fechar">
          ×
        </button>

        <div className="cartao-cabecalho">
          <p className="etiqueta">Cartão de embarque</p>
          <h2 id="cartao-titulo">{escolha.nome}</h2>
          <p className="cartao-voo">{evento.voo}</p>
        </div>

        <div className="total">
          <span>Valor do Pix</span>
          <strong>{formatarPreco(escolha.valor)}</strong>
        </div>

        <div className="pix-area">
          {qr ? (
            <img className="qr" src={qr} alt="QR Code Pix com o valor do presente" />
          ) : (
            <div className="qr-skel" />
          )}
          <p className="dica">
            Abra o app do banco, escolha <strong>Pix → Ler QR Code</strong> ou cole o código.
          </p>
          <div className="acoes">
            <button
              type="button"
              className="btn-primario"
              onClick={() => copiar(payload, "Código Pix copiado! Cole no app do banco.")}
            >
              Copiar Pix Copia e Cola
            </button>
            <button
              type="button"
              className="btn-secundario"
              onClick={() =>
                copiar(
                  evento.pix.chave,
                  `Chave ${evento.pix.tipo} copiada. Valor: ${formatarPreco(escolha.valor)}.`,
                )
              }
            >
              Copiar chave {evento.pix.tipo}
            </button>
          </div>
          <p className="chave-visivel">
            Chave {evento.pix.tipo}: <strong>{evento.pix.chave}</strong>
          </p>
          {feedback ? <p className="feedback">{feedback}</p> : null}
        </div>

        <div className="cartao-rasgo" aria-hidden />
        <p className="cartao-fino">
          Portão 1 · Assento A1 · Embarque imediato no coração do {evento.homenageado}
        </p>
      </div>
    </div>
  );
}

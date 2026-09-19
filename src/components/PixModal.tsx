import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { evento } from "../data/evento";
import { formatarPreco } from "../lib/format";
import { montarPixCopiaECola } from "../lib/pix";

type PixModalProps = {
  nomePresente: string;
  valor: number;
  onClose: () => void;
};

export function PixModal({ nomePresente, valor, onClose }: PixModalProps) {
  const [qr, setQr] = useState("");
  const [feedback, setFeedback] = useState("");

  const payload = montarPixCopiaECola({
    chave: evento.pix.chave,
    nome: evento.pix.nomeRecebedor,
    cidade: evento.pix.cidade,
    valor,
  });

  useEffect(() => {
    let ativo = true;
    QRCode.toDataURL(payload, {
      width: 280,
      margin: 1,
      color: { dark: "#3b2a2c", light: "#fffaf3" },
    }).then((url) => {
      if (ativo) {
        setQr(url);
      }
    });
    return () => {
      ativo = false;
    };
  }, [payload]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function copiar(texto: string, ok: string) {
    try {
      await navigator.clipboard.writeText(texto);
      setFeedback(ok);
    } catch {
      setFeedback("Não deu para copiar automaticamente. Selecione o texto.");
    }
  }

  const whatsapp = evento.whatsapp
    ? `https://wa.me/${evento.whatsapp}?text=${encodeURIComponent(
        `Presenteei o ${evento.homenageado} com ${nomePresente} (${formatarPreco(valor)}) via Pix.`,
      )}`
    : null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pix-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="close" onClick={onClose} aria-label="Fechar">
          ×
        </button>
        <p className="eyebrow">Pix</p>
        <h2 id="pix-title">{nomePresente}</h2>
        <p className="modal-valor">{formatarPreco(valor)}</p>
        {qr ? <img className="qr" src={qr} alt="QR Code Pix" /> : <div className="qr-skel" />}
        <p className="hint">Abra o app do banco, leia o QR Code ou cole o código Pix.</p>
        <div className="actions">
          <button type="button" onClick={() => copiar(payload, "Código Pix copiado.")}>
            Copiar Pix Copia e Cola
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => copiar(evento.pix.chave, "Chave Pix copiada.")}
          >
            Copiar chave
          </button>
        </div>
        {whatsapp ? (
          <a className="whatsapp" href={whatsapp} target="_blank" rel="noreferrer">
            Avisar no WhatsApp
          </a>
        ) : null}
        {feedback ? <p className="feedback">{feedback}</p> : null}
      </div>
    </div>
  );
}

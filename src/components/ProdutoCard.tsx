import type { Produto } from "../data/presentes";
import { desconto, formatarPreco, formatarPrecoAbsurdo, imagem } from "../lib/format";

type Props = {
  produto: Produto;
  onAdicionar: () => void;
};

export function ProdutoCard({ produto, onAdicionar }: Props) {
  return (
    <article className="produto">
      <div className="produto-img">
        <img
          src={imagem(produto.imagem)}
          alt={produto.descricao}
          loading="lazy"
          width={640}
          height={640}
        />
        <span className="desconto">{desconto(produto.precoOriginal, produto.preco)}</span>
        {produto.selo ? <span className="selo">{produto.selo}</span> : null}
      </div>
      <div className="produto-corpo">
        <h3>{produto.nome}</h3>
        <p className="chamada">{produto.chamada}</p>
        <p className="descricao">{produto.descricao}</p>
        <div className="precos">
          <s>{formatarPrecoAbsurdo(produto.precoOriginal)}</s>
          <strong>{formatarPreco(produto.preco)}</strong>
        </div>
        <button type="button" className="btn-primario" onClick={onAdicionar}>
          Colocar na mala
        </button>
      </div>
    </article>
  );
}

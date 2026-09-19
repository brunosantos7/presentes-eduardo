type PixPayloadInput = {
  chave: string;
  nome: string;
  cidade: string;
  valor?: number;
  txid?: string;
};

function tlv(id: string, value: string): string {
  const length = value.length.toString().padStart(2, "0");
  return `${id}${length}${value}`;
}

function semAcento(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9 ]/g, "")
    .trim()
    .toUpperCase();
}

export function crc16(payload: string): string {
  let crc = 0xffff;

  for (let i = 0; i < payload.length; i += 1) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function montarPixCopiaECola({
  chave,
  nome,
  cidade,
  valor,
  txid = "***",
}: PixPayloadInput): string {
  const chaveLimpa = chave.trim();
  const nomeLimpo = semAcento(nome).slice(0, 25) || "RECEBEDOR";
  const cidadeLimpa = semAcento(cidade).slice(0, 15) || "BRASIL";
  const txidLimpo = txid.replace(/[^A-Za-z0-9*]/g, "").slice(0, 25) || "***";

  const merchantAccount = tlv(
    "26",
    `${tlv("00", "br.gov.bcb.pix")}${tlv("01", chaveLimpa)}`,
  );

  const partes = [
    tlv("00", "01"),
    tlv("01", "11"),
    merchantAccount,
    tlv("52", "0000"),
    tlv("53", "986"),
  ];

  if (typeof valor === "number" && Number.isFinite(valor) && valor > 0) {
    partes.push(tlv("54", valor.toFixed(2)));
  }

  partes.push(
    tlv("58", "BR"),
    tlv("59", nomeLimpo),
    tlv("60", cidadeLimpa),
    tlv("62", tlv("05", txidLimpo)),
  );

  const payload = `${partes.join("")}6304`;
  return `${payload}${crc16(payload)}`;
}

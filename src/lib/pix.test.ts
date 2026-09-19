import { describe, expect, it } from "vitest";
import { crc16, montarPixCopiaECola } from "./pix";

describe("crc16", () => {
  it("calcula o CRC do payload Pix de exemplo do BACEN", () => {
    const payload =
      "00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400005204000053039865802BR5913Fulano de Tal6008BRASILIA62070503***6304";
    expect(crc16(payload)).toBe("1D3D");
  });
});

describe("montarPixCopiaECola", () => {
  it("inclui chave, valor e CRC válido", () => {
    const payload = montarPixCopiaECola({
      chave: "teste@email.com",
      nome: "Eduardo",
      cidade: "Campo Grande",
      valor: 80,
    });

    expect(payload.startsWith("000201")).toBe(true);
    expect(payload).toContain("br.gov.bcb.pix");
    expect(payload).toContain("teste@email.com");
    expect(payload).toContain("80.00");
    expect(payload).toContain("EDUARDO");
    expect(payload).toContain("CAMPO GRANDE");
    expect(payload.slice(-4)).toBe(crc16(payload.slice(0, -4)));
  });

  it("omite o campo de valor quando não informado", () => {
    const payload = montarPixCopiaECola({
      chave: "11999999999",
      nome: "Eduardo",
      cidade: "Campo Grande",
    });

    expect(payload).not.toContain("540");
    expect(payload.slice(-4)).toBe(crc16(payload.slice(0, -4)));
  });
});

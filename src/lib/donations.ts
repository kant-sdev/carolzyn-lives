/**
 * URL de checkout externo do MidFielder.tv.
 * O Pix é processado inteiramente do outro lado — não guardamos nenhum
 * dado de pagamento aqui, só redirecionamos com segurança.
 */
export const MIDFIELDER_CHECKOUT_URL = "https://midfielder.tv.br/carolzyn";

/**
 * Formata um valor numérico como moeda brasileira (R$ 1.234,00).
 */
export function formatCurrencyBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}
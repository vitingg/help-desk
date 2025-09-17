export function formattedPrice(price: number) {
  const alreadyFormatted = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  return alreadyFormatted;
}

export function parseMoney(money: number) {
  const moneyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
  // 1$ = 1000 centavos
  return moneyFormat.format(money / 1000);
}

export function parseMoneySimple(money: number) {
  const moneyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
  if (money >= 99999999999999) return 'Monto excedido';
  // 1$ = 1000 centavos
  return moneyFormat.format(money / 100);
}

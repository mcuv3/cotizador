export const moneyToDouble = (money: string) =>
  +money.split("$")[1].split(",").join("");

export default function totalsAmountSum(products) {
  let sum = 0;
  for (let product of products) {
    sum += product.amount;
  }
  return sum;
}

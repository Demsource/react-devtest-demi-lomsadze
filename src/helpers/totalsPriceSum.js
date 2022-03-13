export default function totalsPriceSum(products) {
  let inTotal = 0;

  products.forEach((product) => {
    inTotal += product.price * product.amount;
  });

  return parseFloat(inTotal).toFixed(2);
}

export default function totalsPriceSum(products) {
  let inTotal = 0;

  products.forEach((product) => {
    inTotal += product.totalPrice;
  });

  return parseFloat(inTotal).toFixed(2);
}

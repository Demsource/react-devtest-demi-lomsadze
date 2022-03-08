export default function isEqual(prevObject, newObject) {
  const prevKeys = Object.keys(prevObject);
  const newKeys = Object.keys(newObject);
  if (prevKeys.length !== newKeys.length) return false;

  if (prevKeys.some((attr, i) => attr !== newKeys[i])) return false;

  for (let key of prevKeys) {
    if (
      key !== "amount" && // for comparing procucts
      key !== "cartProductId" && // for comparing procucts
      key !== "totalPrice" && // for comparing procucts
      key !== "payload" && // for comparing procucts
      prevObject[key] !== newObject[key]
    ) {
      return false;
    }
  }

  return true;
}

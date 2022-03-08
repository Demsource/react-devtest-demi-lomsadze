import { useQuery } from "@apollo/client";
import { LOAD_CURRENCIES } from "./Queries";

export default function withCurrencies(Component) {
  function ComponentWithGQLProp(props) {
    const { loading, error, data } = useQuery(LOAD_CURRENCIES);
    return <Component {...props} gqlProps={{ loading, error, data }} />;
  }

  return ComponentWithGQLProp;
}

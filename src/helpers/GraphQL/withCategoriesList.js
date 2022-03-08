import { useQuery } from "@apollo/client";
import { LOAD_CATEGORY_NAMES } from "./Queries";

export default function withCategoriesList(Component) {
  function ComponentWithGQLProp(props) {
    const { loading, error, data } = useQuery(LOAD_CATEGORY_NAMES);
    return <Component {...props} gqlProps={{ loading, error, data }} />;
  }

  return ComponentWithGQLProp;
}

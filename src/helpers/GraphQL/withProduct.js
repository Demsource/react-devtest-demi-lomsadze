import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { LOAD_PRODUCT } from "./Queries";

export default function withProduct(Component) {
  function ComponentWithGQLProp(props) {
    const { loading, error, data, refetch } = useQuery(LOAD_PRODUCT, {
      variables: {
        id: useParams()?.id,
      },
    });

    return (
      <Component {...props} gqlProps={{ loading, error, data, refetch }} />
    );
  }

  return ComponentWithGQLProp;
}

import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { categoryContext } from "../../Contexts/ActiveCategoryStateProvider";
import { LOAD_CATEGORY } from "./Queries";

export default function withCategory(Component) {
  function ComponentWithGQLProp(props) {
    const { activeCategory } = useContext(categoryContext);
    const categoryInput = { title: activeCategory };
    const { loading, error, data } = useQuery(LOAD_CATEGORY, {
      variables: {
        categoryInput,
      },
    });
    return <Component {...props} gqlProps={{ loading, error, data }} />;
  }

  return ComponentWithGQLProp;
}

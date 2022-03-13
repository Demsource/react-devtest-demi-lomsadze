import { gql } from "@apollo/client";

export const LOAD_CATEGORY_NAMES = gql`
  {
    categories {
      name
    }
  }
`;

export const LOAD_CURRENCIES = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

export const LOAD_CATEGORY = gql`
  query GetCategory($categoryInput: CategoryInput!) {
    category(input: $categoryInput) {
      name
      products {
        id
        brand
        inStock
        gallery
        name
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        attributes {
          id
          name
          type
          items {
            id
            displayValue
            value
          }
        }
      }
    }
  }
`;

export const LOAD_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;

import React from "react";
import {
  fireEvent,
  render,
} from "../../../utils/testUtils";
import ProductCard from "./ProductCard";
import * as router from "react-router";
import fetchMock from "jest-fetch-mock";
import Products from "./Product";
import { act } from "react-dom/test-utils";
import { products } from "../../../services/testData";

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  fetchMock.resetMocks();
});

describe("Product list Tests", () => {
  test("Show Oops no data found when elementsSearched it's empty", async () => {
    const { getByTestId } = await act(async () => render(<Products />));
    expect(getByTestId("noDataFound")).toBeInTheDocument();
  });

  test("productCard show correctly and and navigate to /product:id on click", () => {
    const product = {
      brand: "Acer",
      id: "ZmGrkLRPXOTpxsU4jjAcv",
      imgUrl:
        "https://front-test-api.herokuapp.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg",
      model: "Iconia Talk S",
      price: "170",
    };
    const { getByTestId } = render(
      <ProductCard
        brand={product.brand}
        image={product.imgUrl}
        model={product.model}
        price={product.price}
        id={product.id}
      />
    );
    const productCard = getByTestId("productCard");
    expect(productCard).toMatchSnapshot();

    fireEvent.click(getByTestId("productCardBox"));

    expect(navigate).toHaveBeenCalledWith(`/product/${product.id}`);
  });

  // test("Show Spinner when data is fetching", async () => {
  //   fetchMock.mockResponseOnce(JSON.stringify(products));
  //   const storeRef = setupApiStore(productAPI);
  //   render(<Products />, { wrapper: storeRef.wrapper });
  //   await waitFor(() =>
  //     expect(screen.getByTestId("isLoading")).toBeInTheDocument()
  //   );
  // });

  test("show products when elementsSearched have data", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(products));
    const { getByTestId } = await act(async () => render(<Products />));
    expect(getByTestId("productsData")).toBeInTheDocument();
  });
});

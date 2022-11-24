import fetchMock from "jest-fetch-mock";
import { setupApiStore } from "../utils/testUtils";
import { productAPI } from "./productAPI";
import { products } from "./testData";

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("Product API test", () => {
  test("Get all products success request", async () => {
    const storeRef = setupApiStore(productAPI);
    fetchMock.mockResponse(JSON.stringify({}));
    await storeRef.store.dispatch(
      productAPI.endpoints.getProducts.initiate(undefined)
    );
    expect(fetchMock).toBeCalledTimes(1);
    const { method, url } = fetchMock.mock.calls[0][0];

    expect(method).toBe("GET");
    expect(url).toBe("https://front-test-api.herokuapp.com/api/product");
  });

  test("Get all products successful response", async () => {
    const storeRef = setupApiStore(productAPI);
    fetchMock.mockResponse(JSON.stringify(products));

    const response = await storeRef.store.dispatch(
      productAPI.endpoints.getProducts.initiate()
    );
    const { status, data, isSuccess } = response;
    expect(status).toBe("fulfilled");
    expect(isSuccess).toBe(true);
    expect(data).toStrictEqual(products);
  });

  test("Get all products unsuccessful response", async () => {
    const storeRef = setupApiStore(productAPI);
    fetchMock.mockReject(new Error("Internal Server Error"));

    const response = await storeRef.store.dispatch(
      productAPI.endpoints.getProducts.initiate(undefined)
    );

    const {
      status,
      error: { error },
      isError,
    } = response;
    expect(status).toBe("rejected");
    expect(isError).toBe(true);
    expect(error).toBe("Error: Internal Server Error");
  });

  test("Get product by ID success request", async () => {
    const fakeID = "1234";
    const storeRef = setupApiStore(productAPI);
    fetchMock.mockResponse(JSON.stringify({}));

    await storeRef.store.dispatch(
      productAPI.endpoints.getProductById.initiate(fakeID)
    );

    expect(fetchMock).toBeCalledTimes(1);
    const { method, url } = fetchMock.mock.calls[0][0];

    expect(method).toBe("GET");
    expect(url).toBe(
      `https://front-test-api.herokuapp.com/api/product/${fakeID}`
    );
  });

  test("Get product by ID successful response", async () => {
    const id = "ZmGrkLRPXOTpxsU4jjAcv";

    const storeRef = setupApiStore(productAPI);
    fetchMock.mockResponse(JSON.stringify(products[0]));

    const response = await storeRef.store.dispatch(
      productAPI.endpoints.getProductById.initiate(id)
    );
    const { status, data, isSuccess } = response;
    expect(status).toBe("fulfilled");
    expect(isSuccess).toBe(true);
    expect(data).toStrictEqual(products[0]);
  });

  test("Get product by ID unsuccessful response", async () => {
    const storeRef = setupApiStore(productAPI);
    fetchMock.mockReject(new Error("Internal Server Error"));

    const response = await storeRef.store.dispatch(
      productAPI.endpoints.getProductById.initiate(undefined)
    );

    const {
      status,
      error: { error },
      isError,
    } = response;
    expect(status).toBe("rejected");
    expect(isError).toBe(true);
    expect(error).toBe("Error: Internal Server Error");
  });

  test("Add product to cart success request", async () => {
    const storeRef = setupApiStore(productAPI);
    fetchMock.mockResponse(JSON.stringify({}));

    await storeRef.store.dispatch(
      productAPI.endpoints.addProductToCart.initiate(undefined)
    );

    expect(fetchMock).toBeCalledTimes(1);
    const { method, url } = fetchMock.mock.calls[0][0];

    expect(method).toBe("POST");
    expect(url).toBe(`https://front-test-api.herokuapp.com/api/cart`);
  });

  test("Get product by ID successful response", async () => {
    const product = {
      id: "ZmGrkLRPXOTpxsU4jjAcv",
      brand: "Acer",
      model: "Iconia Talk S",
      price: "170",
      imgUrl:
        "https://front-test-api.herokuapp.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg",
    };

    const storeRef = setupApiStore(productAPI);
    fetchMock.mockResponse(
      JSON.stringify({
        count: 1
      })
    );

    const response = await storeRef.store.dispatch(
      productAPI.endpoints.addProductToCart.initiate(product)
    );
    const { data } = response;
    expect(data).toStrictEqual({
      count: 1
    });
  });

  test("Get product by ID unsuccessful response", async () => {
    const storeRef = setupApiStore(productAPI);
    fetchMock.mockReject(new Error("Internal Server Error"));

    const response = await storeRef.store.dispatch(
      productAPI.endpoints.addProductToCart.initiate()
    );

    const {
      error: { error, status },
    } = response;
    expect(status).toBe("FETCH_ERROR");
    expect(error).toBe("Error: Internal Server Error");
  });
});

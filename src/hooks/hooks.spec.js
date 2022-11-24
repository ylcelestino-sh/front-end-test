import { renderHook } from "../utils/testUtils";
import { PLACEHOLDER } from "../constant/constant";
import useLazyLoadImage from "./useLazyLoadImage";
import useSearch from "./useSearch";

describe("Custom Hooks Test", () => {
  test("useLazyLoadImage get imageSrc not to be undefined", () => {
    const { result } = renderHook(() => useLazyLoadImage(PLACEHOLDER));
    const { imageSrc } = result.current;
    expect(imageSrc).not.toBe(undefined);
  });

  test.each([undefined, null, "foo"])(
    "useLazyLoadImage get imageSrc to be undefined",
    (value) => {
      const { result } = renderHook(() => useLazyLoadImage(value));
      const { imageSrc } = result;
      expect(imageSrc).toBeUndefined();
    }
  );
  test.each([undefined, null, "foo"])(
    "useLazyLoadImage get imageSrc to be undefined",
    (value) => {
      const { result } = renderHook(() => useLazyLoadImage(value));
      const { imageSrc } = result;
      expect(imageSrc).toBeUndefined();
    }
  );

  test.each([[], undefined, null])(
    "useSearch return elementsSearched empty array when no past correct array",
    (product) => {
      const { result } = renderHook(() =>
        useSearch({ elements: product, propertyOfSearch: "model" })
      );
      const { elementsSearched } = result.current;
      expect(elementsSearched).toStrictEqual([]);
    }
  );

  test("useSearch return elementsSearched correct data", () => {
    const products = [
      {
        brand: "Acer",
        id: "ZmGrkLRPXOTpxsU4jjAcv",
        imgUrl:
          "https://front-test-api.herokuapp.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg",
        model: "Iconia Talk S",
        price: "170",
      },
      {
        brand: "fake brand",
        id: "fakeID",
        imgUrl: "fake url",
        model: "fake model",
        price: "fake price",
      },
    ];
    const { result } = renderHook(() =>
      useSearch({
        elements: products,
        searchValue: "iconia",
        propertyOfSearch: "model",
      })
    );
    const { elementsSearched } = result.current;
    expect(elementsSearched).toStrictEqual([products[0]]);
  });
  
  test("useSearch return empty array when searchValue is not found in the list", () => {
    const products = [
      {
        brand: "Acer",
        id: "ZmGrkLRPXOTpxsU4jjAcv",
        imgUrl:
          "https://front-test-api.herokuapp.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg",
        model: "Iconia Talk S",
        price: "170",
      },
      {
        brand: "fake brand",
        id: "fakeID",
        imgUrl: "fake url",
        model: "fake model",
        price: "fake price",
      },
    ];
    const { result } = renderHook(() =>
      useSearch({
        elements: products,
        searchValue: "other fake value",
        propertyOfSearch: "model",
      })
    );
    const { elementsSearched } = result.current;
    expect(elementsSearched).toStrictEqual([]);
  });
});


// TODO: move Products data to  __mock__

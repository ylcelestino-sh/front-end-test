import React from "react";
import { PLACEHOLDER } from "../constant/constant";
import { render, screen } from "../utils/testUtils";
import BadgeNotification from "./BadgeNotification";
import LazyImage from "./LazyImage";
describe("custom components test", () => {
  // BadgeNotification
  describe("BadgeNotification test", () => {
    test("BadgeNotification should show correctly with props", () => {
      render(<BadgeNotification itemsNumbers={1} />);
      const badgeNotificationItem = screen.getByTestId("itemNumber");

      expect(badgeNotificationItem).toMatchSnapshot();
      expect(badgeNotificationItem.textContent).toBe("1");
    });
    test("BadgeNotification should show correctly without props", () => {
      render(<BadgeNotification />);
      const badgeNotificationItem = screen.getByTestId("itemNumber");

      expect(badgeNotificationItem).toMatchSnapshot();
      expect(badgeNotificationItem.textContent).toBe("0");
    });
  });

  // LazyImage
  describe("LazyImage test", () => {
    test("LazyImage should show correctly", () => {
      render(<LazyImage alt={"fake alt"} src={PLACEHOLDER} />);
      expect(screen.getByTestId("lazyImage")).toMatchSnapshot();
    });

    test.each(["", null, undefined])(
      "LazyImage should show default placeholder when src it's empty, null or undefined",
      (src) => {
        render(<LazyImage alt={"fake alt"} src={src} />);
        expect(
          screen.getByTestId("lazyImage").attributes.getNamedItem("src").value
        ).toBe(PLACEHOLDER);
      }
    );
  });
});

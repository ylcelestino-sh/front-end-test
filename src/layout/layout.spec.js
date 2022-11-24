import React from "react";
import { render } from "../utils/testUtils";
import MainContainer from "./MainContainer";

test("Render main container", () => {
  const { container } = render(<MainContainer />);
 const header = container.querySelector('#header');
 const mainContainer = container.querySelector('#container');

  expect(mainContainer).toBeInTheDocument();
  expect(header).toBeInTheDocument();

  expect(mainContainer).toMatchSnapshot();
  expect(header).toMatchSnapshot();
    
});

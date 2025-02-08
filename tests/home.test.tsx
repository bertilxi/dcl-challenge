import "@testing-library/jest-dom";
import { expect, test } from "vitest";
import { Home } from "../src/pages/home";
import { render } from "./utils";

test("Home page didn't change", () => {
  const { asFragment } = render(<Home />);

  expect(asFragment()).toMatchSnapshot();
});

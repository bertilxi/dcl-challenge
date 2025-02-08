import "@testing-library/jest-dom";
import { expect, test } from "vitest";
import { Transfer } from "../src/pages/transfer";
import { render } from "./utils";

test("Transfer page didn't change", async () => {
  const { asFragment } = render(<Transfer />);

  expect(asFragment()).toMatchSnapshot();
});

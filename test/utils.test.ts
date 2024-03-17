import { expect, it } from "vitest";
import { randomSort } from "../src/utils";

it("shuffles a minimal set", () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const sorted = randomSort(arr);
  for (let i = 0; i < arr.length; i++) {
    expect(sorted).toContain(arr[i]);
  }
  expect(sorted).not.toEqual(arr);
});

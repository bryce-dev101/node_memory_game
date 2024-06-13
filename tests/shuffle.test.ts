import { shuffle } from "../src/utils/shuffle";

describe("shuffle", () => {
  it("should shuffle an array", () => {
    const array = [1, 2, 3, 4, 5];
    const shuffledArray = shuffle([...array]);

    // Check if fall original elements are present
    expect(shuffledArray).toEqual(expect.arrayContaining(array));
    // Check if the array is shuffled (not in the same order)
    expect(shuffledArray).not.toEqual(array);
  });

  it("should handle an empty array", () => {
    const array: number[] = [];
    const shuffledArray = shuffle([...array]);

    // check its still an empty array
    expect(shuffledArray).toEqual([]);
  });

  it("should handle an array with one element", () => {
    const array = [1];
    const shuffledArray = shuffle([...array]);

    // check its still 1
    expect(shuffledArray).toEqual([1]);
  });

  it("should handle an array with identical elements", () => {
    const array = [1, 1, 1, 1, 1];
    const shuffledArray = shuffle([...array]);

    // check its still 5 identical items
    expect(shuffledArray).toEqual([1, 1, 1, 1, 1]);
  });
});

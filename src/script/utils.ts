/**
 * Shuffles an array, returning a new array
 * @param arr the array to shuffle
 * @returns a new array with the same elements as the input, but in a random order
 */
export const randomSort = <T>(arr: T[]) =>
  arr
    .map((val) => ({ val, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ val }) => val);

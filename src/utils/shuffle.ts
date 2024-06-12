/**
 * Shuffle an array of items (cards)
 * @param array - The array to shuffle (cards)
 * @returns The shuffled array (cards)
 */
export const shuffle = <Cards>(array: Cards[]): Cards[] => {
  let currentIndex = array.length,
    temporaryValue: Cards,
    randomIndex: number;

  // While there are remaining elemnets to shuffle
  while (0 !== currentIndex) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

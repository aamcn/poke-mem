import type PokemonCardObject from "../cardTemplate/cardConstructor/cardConstructor";

// Function to shuffle an array and ensure the shuffled array is not the same as the original.

function shuffleArray(array: Array<PokemonCardObject>, attempts = 0) {
  // Prevent infinite loop in case of failure to shuffle.
  if (attempts > 20) {
    return [...array];
  }
  // Validate Array.
  if (!Array.isArray(array)) {
    throw new TypeError("Expected input to be an array");
  }
  // Shuffle Array.
  const shuffledArray = [...array].sort(() => Math.random() - 0.5);
  //If shuffledArray is the same as the original array, reshuffle until it does not.
  if (JSON.stringify(shuffledArray) === JSON.stringify(array)) {
    return shuffleArray(array, attempts + 1);
  } else {
    return shuffledArray;
  }
}
export { shuffleArray };

// Get a random integer between min and max arguments.

function getRandomInt(min: number, max: number): number {
  if (typeof min !== "number" || typeof max !== "number") {
    throw new Error("Invalid input, both min and max must be numbers");
  }
  // Ensure min and max are integers.
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  // If min and max are the same, return min.
  if (minInt >= maxInt) {
    return maxInt;
  }
  return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
}

// Get an array of unique random index numbers based on the cardTotal argument.
function getRandomIndexArray(cardTotal: number): Array<number> {
  const randomIndexNumbers: Array<number> = [];
  while (randomIndexNumbers.length !== cardTotal) {
    const randomIndex: number = getRandomInt(0, 150);
    if (!randomIndexNumbers.includes(randomIndex)) {
      randomIndexNumbers.push(randomIndex);
    }
  }
  return randomIndexNumbers;
}

export { getRandomInt, getRandomIndexArray };

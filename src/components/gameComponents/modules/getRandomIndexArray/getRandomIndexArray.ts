
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


 function getRandomIndexArray(cardTotal: number): Array<number> {
   const randomIndexNumbers: Array<number> = [];
   for (let i = 0; i < cardTotal; i++) {
     const randomIndex: number = getRandomInt(0, 149);
     randomIndexNumbers.push(randomIndex);
   }
   return randomIndexNumbers;
 }

export { getRandomInt, getRandomIndexArray };

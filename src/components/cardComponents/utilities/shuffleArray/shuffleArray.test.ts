import { it, describe, expect } from "vitest";
import { shuffleArray } from "./shuffleArray";
import type PokemonCardObject from "../cardConstructor/cardConstructor";

describe("shuffleArray", () => {

  it("Should return an Array", () => {
    const testArray = [{ name: "tony" }, { name: "trevor" }, { name: "bob" }, { name: "gary" }];
    const shuffled = shuffleArray(testArray as PokemonCardObject[]);
    expect(Array.isArray(shuffled)).toBe(true);
  });

  it("Should return a new Array instance", () => {
    const testArray = [{ name: "tony" }, { name: "trevor" }, { name: "bob" }, { name: "gary" }];
    const shuffled = shuffleArray(testArray as PokemonCardObject[]);
    expect(shuffled).not.toBe(testArray);
  });

  it("Should return error if input is not an array", () => {
    expect(() => {
      shuffleArray("not an array");
    }).toThrow("Expected input to be an array");
  });

  it("Should return an Array the same length as passed in", () => {
    const testArray = [{ name: "tony" }, { name: "trevor" }, { name: "bob" }, { name: "gary" }];
    const shuffled = shuffleArray(testArray as PokemonCardObject[]);
    expect(shuffled.length).toEqual(testArray.length);
  });

  it("Should not return an empty array", () => {
    const testArray = [{ name: "tony" }, { name: "trevor" }, { name: "bob" }, { name: "gary" }];
    const shuffled = shuffleArray(testArray as PokemonCardObject[]);
    expect(shuffled).not.toEqual([]);
  });

  it("Should not return an array with undefined elements", () => {
    const testArray = [{ name: "tony" }, { name: "trevor" }, { name: "bob" }, { name: "gary" }];
    const shuffled = shuffleArray(testArray as PokemonCardObject[]);
    expect(shuffled).not.toContain(undefined);
  });

  it("Should shuffle the array (statistical test)", () => {
    const testArray = [{ name: "tony" }, { name: "trevor" }, { name: "bob" }, { name: "gary" }];
    let differentCount = 0;

    // Run shuffle multiple times
    for (let i = 0; i < 10; i++) {
      const shuffled = shuffleArray(testArray as PokemonCardObject[]);
      if (JSON.stringify(shuffled) !== JSON.stringify(testArray)) {
        differentCount++;
      }
    }
    // Should shuffle differently at least once in 10 attempts
    expect(differentCount).toBeGreaterThan(0);
  });
});

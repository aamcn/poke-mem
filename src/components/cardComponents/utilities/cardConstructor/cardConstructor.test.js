import { it, describe, expect } from "vitest";
import { PokemonCardObject } from "./cardConstructor";

describe("PokemonCardObject Contructor", () => {
  const newCard = new PokemonCardObject("Tom", "mockUrl", 1, "grass");

  it("Should return an object", () => {
    expect(newCard).toBeTypeOf("object");
  });

  it("Should return an object with the correct keys", () => {
    expect(newCard).toHaveProperty("name");
    expect(newCard).toHaveProperty("imageUrl");
    expect(newCard).toHaveProperty("id");
    expect(newCard).toHaveProperty("type");
    expect(newCard).toHaveProperty("isClicked");
  });

  it("Should return an object containing input arguments", () => {
    expect(newCard.name).toStrictEqual("Tom");
    expect(newCard.imageUrl).toStrictEqual("mockUrl");
    expect(newCard.id).toStrictEqual(1);
    expect(newCard.type).toStrictEqual("grass");
  });

  it("Should initially return isClicked as false", () => {
    expect(newCard.isClicked).toBe(false);
  });

  it("Should store isClicked as true when updated", () => {
    newCard.isClicked = true;
    expect(newCard.isClicked).toBe(true);
  });

  it("Should change isClicked back to false when toggled", () => {
    newCard.toggleClick();
    expect(newCard.isClicked).toBe(true);
  });

  it("Should throw error if any input is missing", () => {
    expect(() => {
      new PokemonCardObject("Tom", "mockUrl", 1);
    }).toThrowError(
      "Invalid input: all fields (name, imageUrl, id, type) are required",
    );
  });

  it("Should throw error when type of name, imageUrl or type is not a string", () => {
    expect(() => {
      new PokemonCardObject(123, "url", 1, "grass");
    }).toThrowError("Invalid input: name, imageUrl, and type must be strings");
    expect(() => {
      new PokemonCardObject("Tom", 456, 1, "grass");
    }).toThrowError("Invalid input: name, imageUrl, and type must be strings");
    expect(() => {
      new PokemonCardObject("Tom", "url", 1, 789);
    }).toThrowError("Invalid input: name, imageUrl, and type must be strings");
  });

  it("Should throw error when id is a negative integer", () => {
    expect(() => {
      new PokemonCardObject("Tom", "url", -1, "grass");
    }).toThrowError("Invalid input: id must be a positive number");
  });
});

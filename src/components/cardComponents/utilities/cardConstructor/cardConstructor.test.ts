import { it, describe, expect } from "vitest";
import PokemonCardObject from "./cardConstructor";

describe("PokemonCardObject Contructor", () => {
  const newCard = new PokemonCardObject("Tom", "mockUrl", "1Id", "grass");

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
    expect(newCard.id).toStrictEqual("1Id");
    expect(newCard.type).toStrictEqual("grass");
  });

  it("Should initially return isClicked as false", () => {
    expect(newCard.isClicked).toBe(false);
  });

  it("Should return isClicked as true when updated", () => {
    newCard.isClicked = true;
    expect(newCard.isClicked).toBe(true);
  });

  it("Should change isClicked back to false when toggled", () => {
    newCard.toggleClick();
    expect(newCard.isClicked).toBe(false);
    newCard.toggleClick();
    expect(newCard.isClicked).toBe(true);
  });
});

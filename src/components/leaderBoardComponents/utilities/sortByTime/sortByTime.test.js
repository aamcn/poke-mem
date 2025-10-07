import { sortByTime } from "./sortByTime";
import { describe, expect, it } from "vitest";

describe("sortByTime", () => {
  it("should sort an array of objects by the 'finish_time' property", () => {
    const input = [
      { id: 1, finish_time: "00:20:50" },
      { id: 2, finish_time: "00:11:40" },
      { id: 3, finish_time: "00:13:20" },
    ];
    const expected = [
      { id: 2, finish_time: "00:11:40" },
      { id: 3, finish_time: "00:13:20" },
      { id: 1, finish_time: "00:20:50" },
    ];
    const result = input.sort(sortByTime);
    expect(result).toEqual(expected);
  });

  it("should handle an empty array", () => {
    const input = [];
    const expected = [];
    const result = input.sort(sortByTime);
    expect(result).toEqual(expected);
  });

  it("should handle an array with one element", () => {
    const input = [{ id: 1, finish_time: "00:20:50" }];
    const expected = [{ id: 1, finish_time: "00:20:50" }];
    const result = input.sort(sortByTime);
    expect(result).toEqual(expected);
  });

  it("should handle an array with two elements", () => {
    const input = [
      { id: 1, finish_time: "00:20:50" },
      { id: 2, finish_time: "00:11:40" },
    ];
    const expected = [
      { id: 2, finish_time: "00:11:40" },
      { id: 1, finish_time: "00:20:50" },
    ];
    const result = input.sort(sortByTime);
    expect(result).toEqual(expected);
  });

  it("should handle an array with identical finish times", () => {
    const input = [
      { id: 1, finish_time: "00:20:50" },
      { id: 2, finish_time: "00:20:50" },
    ];
    const expected = [
      { id: 1, finish_time: "00:20:50" },
      { id: 2, finish_time: "00:20:50" },
    ];
    const result = input.sort(sortByTime);
    expect(result).toEqual(expected);
  });

  it("Should handle an array with non-standard time formats", () => {
    const input = [
      { id: 1, finish_time: "20:50" },
      { id: 2, finish_time: "11:40" },
      { id: 3, finish_time: "13:20" },
    ];
    const expected = [
      { id: 2, finish_time: "11:40" },
      { id: 3, finish_time: "13:20" },
      { id: 1, finish_time: "20:50" },
    ];
    const result = input.sort(sortByTime);
    expect(result).toEqual(expected);
  });

  it("should handle non string inputs gracefully", () => {
    const input = [
      { id: 1, finish_time: 12345 },
      { id: 2, finish_time: null },
      { id: 3, finish_time: undefined },
    ];
    const expected = [
      { id: 1, finish_time: 12345 },
      { id: 2, finish_time: null },
      { id: 3, finish_time: undefined },
    ];
    const result = input.sort(sortByTime);
    expect(result).toEqual(expected);
  });
});

import { describe, expect, it } from "vitest";
import { positiveInteger } from "./cast.ts";

describe("cast helpers", () => {
  it("rejects zero for positive integer strings", () => {
    expect(() => positiveInteger("0", "page")).toThrow("page must be a positive integer");
  });

  it("accepts positive integer strings", () => {
    expect(positiveInteger("2", "page")).toBe(2);
  });
});

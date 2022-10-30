import { expect, describe, it } from "vitest";
import HLC, { HLTimestamp } from "./HLC";

// A fake clock
const createClock = () => {
  let time = 0;
  return () => {
    time = time + 1000;
    return new Date(time);
  };
};

describe("HLC", () => {
  it("now: two timestamps are always after each other", () => {
    const hlc = new HLC(createClock());
    const ts1 = hlc.now();
    const ts2 = hlc.now();
    expect(ts1.compareTo(ts2)).toBeLessThan(0);
  });

  it("now: two timestamps are always after each other", () => {
    const hlc1 = new HLC(createClock());
    const hlc2 = new HLC(createClock());
    hlc2.now();
    hlc2.now();
    hlc2.now();
    const hlc2_ts4 = hlc2.now();
    hlc1.now();
    const hlc1_ts2 = hlc1.tick(hlc2_ts4);

    expect(hlc1_ts2.compareTo(hlc2_ts4)).toBeGreaterThan(0);
  });
});

describe("HLTimestamp", () => {
  // equals
  it("equals: a timestamp is equal to itself", () => {
    const ts1 = new HLTimestamp(new Date(500000000000), 0);
    const ts2 = new HLTimestamp(new Date(500000000000), 0);
    expect(ts1.equals(ts2)).toBeTruthy();
  });
  it("equals: a timestamp is not equal if the logic part is different", () => {
    const ts1 = new HLTimestamp(new Date(500000000000), 0);
    const ts2 = new HLTimestamp(new Date(500000000000), 1);
    expect(ts1.equals(ts2)).toBeFalsy();
  });
  it("equals: a timestamp is not equal if the time is different", () => {
    const ts1 = new HLTimestamp(new Date(510000000000), 0);
    const ts2 = new HLTimestamp(new Date(500000000000), 0);
    expect(ts1.equals(ts2)).toBeFalsy();
  });

  // compareTo
  it("compareTo: a timestamp is equal to itself", () => {
    const ts1 = new HLTimestamp(new Date(500000000000), 0);
    const ts2 = new HLTimestamp(new Date(500000000000), 0);
    expect(ts1.compareTo(ts2)).toBe(0);
  });

  it("compareTo: a timestamp is equal to itself", () => {
    const ts1 = new HLTimestamp(new Date(500000000000), 0);
    const ts2 = new HLTimestamp(new Date(500000000000), 1);
    expect(ts1.compareTo(ts2)).toBeLessThan(0);
  });

  it("compareTo: a timestamp is equal to itself", () => {
    const ts1 = new HLTimestamp(new Date(510000000000), 0);
    const ts2 = new HLTimestamp(new Date(500000000000), 0);
    expect(ts1.compareTo(ts2)).toBe(10000000000);
  });

  // max
  it("max: of two equal timestamps", () => {
    const ts1 = new HLTimestamp(new Date(500000000000), 0);
    const ts2 = new HLTimestamp(new Date(500000000000), 0);
    expect(ts1.max(ts2)).toBe(ts2);
  });

  it("max: a timestamp when logical is different", () => {
    const ts1 = new HLTimestamp(new Date(500000000000), 0);
    const ts2 = new HLTimestamp(new Date(500000000000), 1);
    expect(ts1.max(ts2)).toBe(ts2);
  });

  it("max:whent eh time is different", () => {
    const ts1 = new HLTimestamp(new Date(510000000000), 0);
    const ts2 = new HLTimestamp(new Date(500000000000), 0);
    expect(ts1.max(ts2)).toBe(ts1);
  });
});

/**
 * Modules to deal with javascript objects that are like plain JSON.
 */

export type JSONPrimitive = string | number | boolean | null | undefined;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = { [member: string]: JSONValue };
export interface JSONArray extends Array<JSONValue> {}

export const encode = JSON.parse;
export const decode = JSON.stringify;

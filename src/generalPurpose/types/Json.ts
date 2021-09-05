// Adapted from https://github.com/sindresorhus/type-fest/blob/main/source/basic.d.ts

export type JsonPrimitive = string | number | boolean | null;

export type JsonValue =
  | JsonArray
  | JsonObject
  | JsonPrimitive
  ;
export type MutableJsonValue =
  | MutableJsonArray
  | MutableJsonObject
  | JsonPrimitive
  ;

export type JsonArray = readonly JsonValue[];
export type MutableJsonArray = MutableJsonValue[];

export type JsonObject = Readonly<{
  [Key in string]?: JsonValue;
}>;
export type MutableJsonObject = {
  [Key in string]?: MutableJsonValue;
};

// From https://github.com/sindresorhus/type-fest/blob/main/source/jsonify.d.ts

// type NonJsonable = ((...args: any[]) => any) | undefined;

// export type Jsonify<T> = 
//   [Extract<T, NonJsonable>] extends [never]
//     ? T extends JsonPrimitive
//       ? T
//       : T extends Array<infer U>
//         ? ReadonlyArray<Jsonify<U>>
//         : T extends object
//           ? {readonly [P in keyof T]: Jsonify<T[P]>}
//           : never
//     : never;


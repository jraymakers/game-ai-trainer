export type Ok<T> = Readonly<{
  ok: true;
  value: T;
}>;

export type Err<E = Error> = Readonly<{
  ok: false;
  error: E;
}>;

export type Result<T, E = Error> = Ok<T> | Err<E>;

export function ok<T>(value: T): Ok<T> {
  return { ok: true, value };
}

export function err<E = Error>(error: E): Err<E> {
  return { ok: false, error };
}

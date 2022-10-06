/**
 *
 * Implementation of all Array extensions methods described on `typings.d.ts`.
 *
 */

Array.prototype.makeString = function <T>(
  this: Array<T>,
  initWith: string,
  separator: string,
  lastSeparator: string,
  endWith: string
): string {
  const arr = this;
  const lastElem = [...arr].pop();
  const lastSep = lastSeparator
    ? lastSeparator
    : separator;

  return arr.length > 1
    ? initWith
      .concat(arr.slice(0, -1).join(separator))
      .concat(lastSep)
      .concat(lastElem.toString())
      .concat(endWith)
    : initWith.concat(arr.join(separator).concat(endWith));
};

Array.prototype.isEmpty = function <T>(this: Array<T>): boolean {
  const arr = this;

  return !arr || arr.length === 0;
};

/**
 *
 * Contract declaration of all extension prototype functions.
 *
 * Once declared an interface below, please implement the contract in
 * the correspondent `.extensions.ts` file.
 *
 */

// string.extensions.ts
interface String {
  /**
   *
   * Capitalizes a string
   *
   * @returns string - Capitalized string value
   *
   */
  capitalize(): string;
}

// string.extensions.ts
interface Array<T> {
  /**
   *
   * Displays the elements of an array as a single string, using custom characters for
   * initial, middle and final slots.
   *
   * @example
   *
   * ['apple', 'banana', 'orange'].mkString('(', ', ', '.', ')');
   * // returns "(apple, banana, orange.)"
   *
   * @param initWith - String value to put in the beginning of the string
   * @param separator - String value to separate the values
   * @param lastSeparator - String value to separate the last two values
   * @param endWith - String value to be put in the end of the string
   *
   * @returns string - Generated string with the informed separators.
   */
  makeString(initWith: string, separator: string, lastSeparator: string, endWith: string): string;

  /**
   * Verifies if an array has no elements at all.
   *
   * @returns boolean - Indicates if the array is empty;
   *
   */
  isEmpty<T>(this: Array<T>): boolean;
}

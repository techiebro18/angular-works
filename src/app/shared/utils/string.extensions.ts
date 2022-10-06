/**
 *
 * Implementation of all String extensions methods described on `typings.d.ts`.
 *
 */

String.prototype.capitalize = function (): string {
  return String(this).charAt(0).toUpperCase() + String(this).slice(1);
};

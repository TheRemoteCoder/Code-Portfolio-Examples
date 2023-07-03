/**
 * Fix TypeScript support for new ES features.
 *
 * - https://stackoverflow.com/questions/50677868/error-ts2339-property-entries-does-not-exist-on-type-formdata
 * - https://github.com/Microsoft/TypeScript/issues/14537
 *
 * @todo  Outsource in an Interface file (did not work with 'declare global' or import).
 */
declare global {
  // tslint:disable-next-line: interface-name
  interface FormData {
    entries(): Iterator<[string, string | Blob]>;
    getAll(): string[];
  }
}

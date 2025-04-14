# JavaScript Lodash Questions

## Guidelines

- The focus of these Lodash questions is on learning. We don't have to handle as many cases as Lodash, especially the super obscure ones.

## Clone Skeleton

1. Clone the skeleton for JS Lodash questions from `packages/questions/__template__/javascript-lodash`
1. Replace the placeholders with matching cases (we'll use `_.groupBy` as an example):
   - `todoReplaceMe` -> `groupBy`
   - `todo-replace-me` -> `group-by`
   - `TODO Replace Me` -> `Group By`

## Description

Obtain description here: https://raw.githubusercontent.com/lodash/lodash/4.17.15/doc/README.md

Make sure to call out anything we do that will deviate from Lodash.

## Skeleton

Obtain Array-based typedefs from here: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/lodash/common/array.d.ts

## Unit Test

It's preferable to refer to Lodash's existing tests within https://github.com/lodash/lodash/blob/master/test/. Use it as a base, but remove the tests that are testing for obscure stuff that we won't support.

If that's not enough, use ChatGPT with the following prompt:

```
Generate Jest unit tests for Lodash's <replaceMe> function. Group tests using describe blocks where possible. Do not declare separate variables for the input and output of the tests. Use `test` instead of `it`. Favor having more test blocks than too many assertions within a test block.

// Delete where appropriate.

// For function that take in an array
Add tests for empty arrays, single-element arrays, two-element arrays, multiple element arrays.

// For functions that take in indices
Add tests for negative indices. If the function takes in multiple indices, add tests for a mix of all combinations of positive and negative indices.

// For functions that take in objects
Add tests for empty objects, objects with a single key, two keys, multiple keys.

// If the input should not be mutated
Add a test that the input is not mutated and a new array or object is returned.

// If the input should be mutated
Add a test that the input is mutated and a new array or object is not returned.
```

### Lodash Test

Also add a `lodash.test.js` file to test that Lodash's code can pass our tests (and also the other way round).

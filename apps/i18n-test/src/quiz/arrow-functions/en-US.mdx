---
title: Can you offer a use case for the new arrow => function syntax?
subtitle: How does this new syntax differ from other functions?
---

## TL;DR

Arrow functions provide a concise syntax for writing functions in JavaScript. They are particularly useful for maintaining the `this` context within methods and callbacks. For example, in an event handler or array method like `map`, arrow functions can simplify the code and avoid issues with `this` binding.

```js live
const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6]
```

---

## Use case for the new arrow => function syntax

### Simplifying syntax

Arrow functions provide a more concise way to write functions. This is especially useful for short functions or callbacks.

```js live
// Traditional function
const add = function (a, b) {
  return a + b;
};

// Arrow function
const anotherAdd = (a, b) => a + b;

console.log(add(2, 3)); // Output: 5
console.log(anotherAdd(2, 3)); // Output: 5
```

### Lexical `this` binding

Arrow functions do not have their own `this` context. Instead, they inherit `this` from the surrounding scope. This is particularly useful in methods and callbacks where the `this` context can be tricky.

```js live
function Timer() {
  this.seconds = 0;
  this.increment = () => {
    this.seconds++; // 'this.seconds' is inherited from the outer scope
    console.log(this.seconds);
  };
}

const timer = new Timer();
timer.increment(); // 1
timer.increment(); // 2
```

In the example above, using a traditional function inside `setInterval` would require additional steps to maintain the correct `this` context.

### Using arrow functions in array methods

Arrow functions are often used in array methods like `map`, `filter`, and `reduce` for cleaner and more readable code.

```js live
const numbers = [1, 2, 3, 4, 5];

// Traditional function
const doubledTraditional = numbers.map(function (n) {
  return n * 2;
});

// Arrow function
const doubled = numbers.map((n) => n * 2);

console.log(doubled); // [2, 4, 6, 8, 10]
```

### Event handlers

Arrow functions can be used in event handlers to maintain the `this` context of the class or object.

```js live
class Button {
  constructor() {
    this.count = 0;
    this.button = document.createElement('button');
    this.button.innerText = 'Click me';
    this.button.addEventListener('click', () => {
      this.count++;
      console.log('count:', this.count);
    });
    document.body.appendChild(this.button);
  }
}

const myButton = new Button();
myButton.button.click(); // count: 1
myButton.button.click(); // count: 2
```

## Further reading

- [MDN Web Docs: Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [JavaScript.info: Arrow functions revisited](https://javascript.info/arrow-functions)
- [Eloquent JavaScript: Functions](https://eloquentjavascript.net/03_functions.html)

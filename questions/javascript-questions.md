## JS Questions

Answers to [Front-end Job Interview Questions - JS Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/questions/javascript-questions.md). Pull requests for suggestions and corrections are welcome!

* [Explain event delegation](#explain-event-delegation)
* [Explain how `this` works in JavaScript](#explain-how-this-works-in-javascript)
* [Explain how prototypal inheritance works](#explain-how-prototypal-inheritance-works)
* [What do you think of AMD vs CommonJS?](#what-do-you-think-of-amd-vs-commonjs)
* [Explain why the following doesn't work as an IIFE: `function foo(){ }();`. What needs to be changed to properly make it an IIFE?](#explain-why-the-following-doesnt-work-as-an-iife-function-foo--what-needs-to-be-changed-to-properly-make-it-an-iife)
* [What's the difference between a variable that is: `null`, `undefined` or undeclared? How would you go about checking for any of these states?](#whats-the-difference-between-a-variable-that-is-null-undefined-or-undeclared-how-would-you-go-about-checking-for-any-of-these-states)
* [What is a closure, and how/why would you use one?](#what-is-a-closure-and-howwhy-would-you-use-one)
* [Can you describe the main difference between a `.forEach` loop and a `.map()` loop and why you would pick one versus the other?](#can-you-describe-the-main-difference-between-a-foreach-loop-and-a-map-loop-and-why-you-would-pick-one-versus-the-other)
* [What's a typical use case for anonymous functions?](#whats-a-typical-use-case-for-anonymous-functions)
* [How do you organize your code? (module pattern, classical inheritance?)](#how-do-you-organize-your-code-module-pattern-classical-inheritance)
* [What's the difference between host objects and native objects?](#whats-the-difference-between-host-objects-and-native-objects)
* [Difference between: `function Person(){}`, `var person = Person()`, and `var person = new Person()`?](#difference-between-function-person-var-person--person-and-var-person--new-person)
* [What's the difference between `.call` and `.apply`?](#whats-the-difference-between-call-and-apply)
* [Explain `Function.prototype.bind`.](#explain-functionprototypebind)
* [When would you use `document.write()`?](#when-would-you-use-documentwrite)
* [What's the difference between feature detection, feature inference, and using the UA string?](#whats-the-difference-between-feature-detection-feature-inference-and-using-the-ua-string)
* [Explain Ajax in as much detail as possible.](#explain-ajax-in-as-much-detail-as-possible)
* [What are the advantages and disadvantages of using Ajax?](#what-are-the-advantages-and-disadvantages-of-using-ajax)
* [Explain how JSONP works (and how it's not really Ajax).](#explain-how-jsonp-works-and-how-its-not-really-ajax)
* [Have you ever used JavaScript templating? If so, what libraries have you used?](#have-you-ever-used-javascript-templating-if-so-what-libraries-have-you-used)
* [Explain "hoisting".](#explain-hoisting)
* [Describe event bubbling.](#describe-event-bubbling)
* [What's the difference between an "attribute" and a "property"?](#whats-the-difference-between-an-attribute-and-a-property)
* [Why is extending built-in JavaScript objects not a good idea?](#why-is-extending-built-in-javascript-objects-not-a-good-idea)
* [Difference between document `load` event and document `DOMContentLoaded` event?](#difference-between-document-load-event-and-document-domcontentloaded-event)
* [What is the difference between `==` and `===`?](#what-is-the-difference-between--and-)
* [Explain the same-origin policy with regards to JavaScript.](#explain-the-same-origin-policy-with-regards-to-javascript)
* [Make this work: `duplicate([1,2,3,4,5]); // [1,2,3,4,5,1,2,3,4,5]`](#make-this-work)
* [Why is it called a Ternary expression, what does the word "Ternary" indicate?](#why-is-it-called-a-ternary-expression-what-does-the-word-ternary-indicate)
* [What is "use strict";? what are the advantages and disadvantages to using it?](#what-is-use-strict-what-are-the-advantages-and-disadvantages-to-using-it)
* [Create a for loop that iterates up to 100 while outputting "fizz" at multiples of 3, "buzz" at multiples of 5 and "fizzbuzz" at multiples of 3 and 5](#create-a-for-loop-that-iterates-up-to-100-while-outputting-fizz-at-multiples-of-3-buzz-at-multiples-of-5-and-fizzbuzz-at-multiples-of-3-and-5)
* [Why is it, in general, a good idea to leave the global scope of a website as-is and never touch it?](#why-is-it-in-general-a-good-idea-to-leave-the-global-scope-of-a-website-as-is-and-never-touch-it)
* [Why would you use something like the `load` event? Does this event have disadvantages? Do you know any alternatives, and why would you use those?](#why-would-you-use-something-like-the-load-event-does-this-event-have-disadvantages-do-you-know-any-alternatives-and-why-would-you-use-those)
* [Explain what a single page app is and how to make one SEO-friendly.](#explain-what-a-single-page-app-is-and-how-to-make-one-seo-friendly)
* [What is the extent of your experience with Promises and/or their polyfills?](#what-is-the-extent-of-your-experience-with-promises-andor-their-polyfills)
* [What are the pros and cons of using Promises instead of callbacks?](#what-are-the-pros-and-cons-of-using-promises-instead-of-callbacks)
* [What are some of the advantages/disadvantages of writing JavaScript code in a language that compiles to JavaScript?](#what-are-some-of-the-advantagesdisadvantages-of-writing-javascript-code-in-a-language-that-compiles-to-javascript)
* [What tools and techniques do you use debugging JavaScript code?](#what-tools-and-techniques-do-you-use-for-debugging-javascript-code)
* [What language constructions do you use for iterating over object properties and array items?](#what-language-constructions-do-you-use-for-iterating-over-object-properties-and-array-items)
* [Explain the difference between mutable and immutable objects.](#explain-the-difference-between-mutable-and-immutable-objects)
* [Explain the difference between synchronous and asynchronous functions.](#explain-the-difference-between-synchronous-and-asynchronous-functions)
* [What is event loop? What is the difference between call stack and task queue?](#what-is-event-loop-what-is-the-difference-between-call-stack-and-task-queue)
* [Explain the differences on the usage of `foo` between `function foo() {}` and `var foo = function() {}`](#explain-the-differences-on-the-usage-of-foo-between-function-foo--and-var-foo--function-)
* [What are the differences between variables created using `let`, `var` or `const`?](#what-are-the-differences-between-variables-created-using-let-var-or-const)
* [What are the differences between ES6 class and ES5 function constructors?](#what-are-the-differences-between-es6-class-and-es5-function-constructors)
* [Can you offer a use case for the new arrow => function syntax? How does this new syntax differ from other functions?](#can-you-offer-a-use-case-for-the-new-arrow--function-syntax-how-does-this-new-syntax-differ-from-other-functions)
* [What advantage is there for using the arrow syntax for a method in a constructor?](#what-advantage-is-there-for-using-the-arrow-syntax-for-a-method-in-a-constructor)
* [What is the definition of a higher-order function?](#what-is-the-definition-of-a-higher-order-function)
* [Can you give an example for destructuring an object or an array?](#can-you-give-an-example-for-destructuring-an-object-or-an-array)
* [ES6 Template Literals offer a lot of flexibility in generating strings, can you give an example?](#es6-template-literals-offer-a-lot-of-flexibility-in-generating-strings-can-you-give-an-example)
* [Can you give an example of a curry function and why this syntax offers an advantage?](#can-you-give-an-example-of-a-curry-function-and-why-this-syntax-offers-an-advantage)
* [What are the benefits of using spread syntax and how is it different from rest syntax?](#what-are-the-benefits-of-using-spread-syntax-and-how-is-it-different-from-rest-syntax)
* [How can you share code between files?](#how-can-you-share-code-between-files)
* [Why you might want to create static class members?](#why-you-might-want-to-create-static-class-members)

### Explain event delegation

Event delegation is a technique involving adding event listeners to a parent element instead of adding them to the descendant elements. The listener will fire whenever the event is triggered on the descendant elements due to event bubbling up the DOM. The benefits of this technique are:

* Memory footprint goes down because only one single handler is needed on the parent element, rather than having to attach event handlers on each descendant.
* There is no need to unbind the handler from elements that are removed and to bind the event for new elements.

###### References

* https://davidwalsh.name/event-delegate
* https://stackoverflow.com/questions/1687296/what-is-dom-event-delegation

[[↑] Back to top](#js-questions)

### Explain how `this` works in JavaScript

There's no simple explanation for `this`; it is one of the most confusing concepts in JavaScript. A hand-wavey explanation is that the value of `this` depends on how the function is called. I have read many explanations on `this` online, and I found [Arnav Aggrawal](https://medium.com/@arnav_aggarwal)'s explanation to be the clearest. The following rules are applied:

1. If the `new` keyword is used when calling the function, `this` inside the function is a brand new object.
2. If `apply`, `call`, or `bind` are used to call/create a function, `this` inside the function is the object that is passed in as the argument.
3. If a function is called as a method, such as `obj.method()` — `this` is the object that the function is a property of.
4. If a function is invoked as a free function invocation, meaning it was invoked without any of the conditions present above, `this` is the global object. In a browser, it is the `window` object. If in strict mode (`'use strict'`), `this` will be `undefined` instead of the global object.
5. If multiple of the above rules apply, the rule that is higher wins and will set the `this` value.
6. If the function is an ES2015 arrow function, it ignores all the rules above and receives the `this` value of its surrounding scope at the time it is created.

For an in-depth explanation, do check out his [article on Medium](https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3).

###### References

* https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3
* https://stackoverflow.com/a/3127440/1751946

[[↑] Back to top](#js-questions)

### Explain how prototypal inheritance works

This is an extremely common JavaScript interview question. All JavaScript objects have a `prototype` property, that is a reference to another object. When a property is accessed on an object and if the property is not found on that object, the JavaScript engine looks at the object's `prototype`, and the `prototype`'s `prototype` and so on, until it finds the property defined on one of the `prototype`s or until it reaches the end of the prototype chain. This behavior simulates classical inheritance, but it is really more of [delegation than inheritance](https://davidwalsh.name/javascript-objects).

###### References

* https://www.quora.com/What-is-prototypal-inheritance/answer/Kyle-Simpson
* https://davidwalsh.name/javascript-objects

[[↑] Back to top](#js-questions)

### What do you think of AMD vs CommonJS?

Both are ways to implement a module system, which was not natively present in JavaScript until ES2015 came along. CommonJS is synchronous while AMD (Asynchronous Module Definition) is obviously asynchronous. CommonJS is designed with server-side development in mind while AMD, with its support for asynchronous loading of modules, is more intended for browsers.

I find AMD syntax to be quite verbose and CommonJS is closer to the style you would write import statements in other languages. Most of the time, I find AMD unnecessary, because if you served all your JavaScript into one concatenated bundle file, you wouldn't benefit from the async loading properties. Also, CommonJS syntax is closer to Node style of writing modules and there is less context-switching overhead when switching between client side and server side JavaScript development.

I'm glad that with ES2015 modules, that has support for both synchronous and asynchronous loading, we can finally just stick to one approach. Although it hasn't been fully rolled out in browsers and in Node, we can always use transpilers to convert our code.

###### References

* https://auth0.com/blog/javascript-module-systems-showdown/
* https://stackoverflow.com/questions/16521471/relation-between-commonjs-amd-and-requirejs

[[↑] Back to top](#js-questions)

### Explain why the following doesn't work as an IIFE: `function foo(){ }();`. What needs to be changed to properly make it an IIFE?

IIFE stands for Immediately Invoked Function Expressions. The JavaScript parser reads `function foo(){ }();` as `function foo(){ }` and `();`, where the former is a function declaration and the latter (a pair of brackets) is an attempt at calling a function but there is no name specified, hence it throws `Uncaught SyntaxError: Unexpected token )`.

Here are two ways to fix it that involves adding more brackets: `(function foo(){ })()` and `(function foo(){ }())`. These functions are not exposed in the global scope and you can even omit its name if you do not need to reference itself within the body.

You might also use `void` operator: `void function foo(){ }();`. Unfortunately, there is one issue with such approach. The evaluation of given expression is always `undefined`, so if your IIFE function returns anything, you can't use it. An example:

```
// Don't add JS syntax to this code block to prevent Prettier from formatting it.
const foo = void function bar() { return 'foo'; }();

console.log(foo); // undefined
```

###### References

* http://lucybain.com/blog/2014/immediately-invoked-function-expression/
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void

[[↑] Back to top](#js-questions)

### What's the difference between a variable that is: `null`, `undefined` or undeclared? How would you go about checking for any of these states?

**Undeclared** variables are created when you assign a value to an identifier that is not previously created using `var`, `let` or `const`. Undeclared variables will be defined globally, outside of the current scope. In strict mode, a `ReferenceError` will be thrown when you try to assign to an undeclared variable. Undeclared variables are bad just like how global variables are bad. Avoid them at all cost! To check for them, wrap its usage in a `try`/`catch` block.

```js
function foo() {
  x = 1; // Throws a ReferenceError in strict mode
}

foo();
console.log(x); // 1
```

A variable that is `undefined` is a variable that has been declared, but not assigned a value. It is of type `undefined`. If a function does not return any value as the result of executing it is assigned to a variable, the variable also has the value of `undefined`. To check for it, compare using the strict equality (`===`) operator or `typeof` which will give the `'undefined'` string. Note that you should not be using the abstract equality operator to check, as it will also return `true` if the value is `null`.

```js
var foo;
console.log(foo); // undefined
console.log(foo === undefined); // true
console.log(typeof foo === 'undefined'); // true

console.log(foo == null); // true. Wrong, don't use this to check!

function bar() {}
var baz = bar();
console.log(baz); // undefined
```

A variable that is `null` will have been explicitly assigned to the `null` value. It represents no value and is different from `undefined` in the sense that it has been explicitly assigned. To check for `null,` simply compare using the strict equality operator. Note that like the above, you should not be using the abstract equality operator (`==`) to check, as it will also return `true` if the value is `undefined`.

```js
var foo = null;
console.log(foo === null); // true
console.log(typeof foo === 'object'); // true

console.log(foo == undefined); // true. Wrong, don't use this to check!
```

As a personal habit, I never leave my variables undeclared or unassigned. I will explicitly assign `null` to them after declaring if I don't intend to use it yet. If you use a linter in your workflow, it will usually also be able to check that you are not referencing undeclared variables.

###### References

* https://stackoverflow.com/questions/15985875/effect-of-declared-and-undeclared-variables
* https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined

[[↑] Back to top](#js-questions)

### What is a closure, and how/why would you use one?

A closure is the combination of a function and the lexical environment within which that function was declared. The word "lexical" refers to the fact that lexical scoping uses the location where a variable is declared within the source code to determine where that variable is available. Closures are functions that have access to the outer (enclosing) function's variables—scope chain even after the outer function has returned.

**Why would you use one?**

* Data privacy / emulating private methods with closures. Commonly used in the [module pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).
* [Partial applications or currying](https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8#.l4b6l1i3x).

###### References

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
* https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36

[[↑] Back to top](#js-questions)

### Can you describe the main difference between a `.forEach` loop and a `.map()` loop and why you would pick one versus the other?

To understand the differences between the two, let's look at what each function does.

**`forEach`**

* Iterates through the elements in an array.
* Executes a callback for each element.
* Does not return a value.

```js
const a = [1, 2, 3];
const doubled = a.forEach((num, index) => {
  // Do something with num and/or index.
});

// doubled = undefined
```

**`map`**

* Iterates through the elements in an array.
* "Maps" each element to a new element by calling the function on each element, creating a new array as a result.

```js
const a = [1, 2, 3];
const doubled = a.map(num => {
  return num * 2;
});

// doubled = [2, 4, 6]
```

The main difference between `.forEach` and `.map()` is that `.map()` returns a new array. If you need the result, but do not wish to mutate the original array, `.map()` is the clear choice. If you simply need to iterate over an array, `forEach` is a fine choice.

###### References

* https://codeburst.io/javascript-map-vs-foreach-f38111822c0f

[[↑] Back to top](#js-questions)

### What's a typical use case for anonymous functions?

They can be used in IIFEs to encapsulate some code within a local scope so that variables declared in it do not leak to the global scope.

```js
(function() {
  // Some code here.
})();
```

As a callback that is used once and does not need to be used anywhere else. The code will seem more self-contained and readable when handlers are defined right inside the code calling them, rather than having to search elsewhere to find the function body.

```js
setTimeout(function() {
  console.log('Hello world!');
}, 1000);
```

Arguments to functional programming constructs or Lodash (similar to callbacks).

```js
const arr = [1, 2, 3];
const double = arr.map(function(el) {
  return el * 2;
});
console.log(double); // [2, 4, 6]
```

###### References

* https://www.quora.com/What-is-a-typical-usecase-for-anonymous-functions
* https://stackoverflow.com/questions/10273185/what-are-the-benefits-to-using-anonymous-functions-instead-of-named-functions-fo

[[↑] Back to top](#js-questions)

### How do you organize your code? (module pattern, classical inheritance?)

In the past, I used Backbone for my models which encourages a more OOP approach, creating Backbone models and attaching methods to them.

The module pattern is still great, but these days, I use React/Redux which utilize a single-directional data flow based on Flux architecture. I would represent my app's models using plain objects and write utility pure functions to manipulate these objects. State is manipulated using actions and reducers like in any other Redux application.

I avoid using classical inheritance where possible. When and if I do, I stick to [these rules](https://medium.com/@dan_abramov/how-to-use-classes-and-sleep-at-night-9af8de78ccb4).

[[↑] Back to top](#js-questions)

### What's the difference between host objects and native objects?

Native objects are objects that are part of the JavaScript language defined by the ECMAScript specification, such as `String`, `Math`, `RegExp`, `Object`, `Function`, etc.

Host objects are provided by the runtime environment (browser or Node), such as `window`, `XMLHTTPRequest`, etc.

###### References

* https://stackoverflow.com/questions/7614317/what-is-the-difference-between-native-objects-and-host-objects

[[↑] Back to top](#js-questions)

### Difference between: `function Person(){}`, `var person = Person()`, and `var person = new Person()`?

This question is pretty vague. My best guess at its intention is that it is asking about constructors in JavaScript. Technically speaking, `function Person(){}` is just a normal function declaration. The convention is to use PascalCase for functions that are intended to be used as constructors.

`var person = Person()` invokes the `Person` as a function, and not as a constructor. Invoking as such is a common mistake if it the function is intended to be used as a constructor. Typically, the constructor does not return anything, hence invoking the constructor like a normal function will return `undefined` and that gets assigned to the variable intended as the instance.

`var person = new Person()` creates an instance of the `Person` object using the `new` operator, which inherits from `Person.prototype`. An alternative would be to use `Object.create`, such as: `Object.create(Person.prototype)`.

```js
function Person(name) {
  this.name = name;
}

var person = Person('John');
console.log(person); // undefined
console.log(person.name); // Uncaught TypeError: Cannot read property 'name' of undefined

var person = new Person('John');
console.log(person); // Person { name: "John" }
console.log(person.name); // "john"
```

###### References

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new

[[↑] Back to top](#js-questions)

### What's the difference between `.call` and `.apply`?

Both `.call` and `.apply` are used to invoke functions and the first parameter will be used as the value of `this` within the function. However, `.call` takes in comma-separated arguments as the next arguments while `.apply` takes in an array of arguments as the next argument. An easy way to remember this is C for `call` and comma-separated and A for `apply` and an array of arguments.

```js
function add(a, b) {
  return a + b;
}

console.log(add.call(null, 1, 2)); // 3
console.log(add.apply(null, [1, 2])); // 3
```

[[↑] Back to top](#js-questions)

### Explain `Function.prototype.bind`.

Taken word-for-word from [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind):

> The `bind()` method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.

In my experience, it is most useful for binding the value of `this` in methods of classes that you want to pass into other functions. This is frequently done in React components.

###### References

* https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind

[[↑] Back to top](#js-questions)

### When would you use `document.write()`?

`document.write()` writes a string of text to a document stream opened by `document.open()`. When `document.write()` is executed after the page has loaded, it will call `document.open` which clears the whole document (`<head>` and `<body>` removed!) and replaces the contents with the given parameter value. Hence it is usually considered dangerous and prone to misuse.

There are some answers online that explain `document.write()` is being used in analytics code or [when you want to include styles that should only work if JavaScript is enabled](https://www.quirksmode.org/blog/archives/2005/06/three_javascrip_1.html). It is even being used in HTML5 boilerplate to [load scripts in parallel and preserve execution order](https://github.com/paulirish/html5-boilerplate/wiki/Script-Loading-Techniques#documentwrite-script-tag)! However, I suspect those reasons might be outdated and in the modern day, they can be achieved without using `document.write()`. Please do correct me if I'm wrong about this.

###### References

* https://www.quirksmode.org/blog/archives/2005/06/three_javascrip_1.html
* https://github.com/h5bp/html5-boilerplate/wiki/Script-Loading-Techniques#documentwrite-script-tag

[[↑] Back to top](#js-questions)

### What's the difference between feature detection, feature inference, and using the UA string?

**Feature Detection**

Feature detection involves working out whether a browser supports a certain block of code, and running different code depending on whether it does (or doesn't), so that the browser can always provide a working experience rather crashing/erroring in some browsers. For example:

```js
if ('geolocation' in navigator) {
  // Can use navigator.geolocation
} else {
  // Handle lack of feature
}
```

[Modernizr](https://modernizr.com/) is a great library to handle feature detection.

**Feature Inference**

Feature inference checks for a feature just like feature detection, but uses another function because it assumes it will also exist, e.g.:

```js
if (document.getElementsByTagName) {
  element = document.getElementById(id);
}
```

This is not really recommended. Feature detection is more foolproof.

**UA String**

This is a browser-reported string that allows the network protocol peers to identify the application type, operating system, software vendor or software version of the requesting software user agent. It can be accessed via `navigator.userAgent`. However, the string is tricky to parse and can be spoofed. For example, Chrome reports both as Chrome and Safari. So to detect Safari you have to check for the Safari string and the absence of the Chrome string. Avoid this method.

###### References

* https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection
* https://stackoverflow.com/questions/20104930/whats-the-difference-between-feature-detection-feature-inference-and-using-th
* https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent

[[↑] Back to top](#js-questions)

### Explain Ajax in as much detail as possible.

Ajax (asynchronous JavaScript and XML) is a set of web development techniques using many web technologies on the client side to create asynchronous web applications. With Ajax, web applications can send data to and retrieve from a server asynchronously (in the background) without interfering with the display and behavior of the existing page. By decoupling the data interchange layer from the presentation layer, Ajax allows for web pages, and by extension web applications, to change content dynamically without the need to reload the entire page. In practice, modern implementations commonly substitute use JSON instead of XML, due to the advantages of JSON being native to JavaScript.

The `XMLHttpRequest` API is frequently used for the asynchronous communication or these days, the `fetch` API.

###### References

* https://en.wikipedia.org/wiki/Ajax_(programming)
* https://developer.mozilla.org/en-US/docs/AJAX

[[↑] Back to top](#js-questions)

### What are the advantages and disadvantages of using Ajax?

**Advantages**

* Better interactivity. New content from the server can be changed dynamically without the need to reload the entire page.
* Reduce connections to the server since scripts and stylesheets only have to be requested once.
* State can be maintained on a page. JavaScript variables and DOM state will persist because the main container page was not reloaded.
* Basically most of the advantages of an SPA.

**Disadvantages**

* Dynamic webpages are harder to bookmark.
* Does not work if JavaScript has been disabled in the browser.
* Some webcrawlers do not execute JavaScript and would not see content that has been loaded by JavaScript.
* Basically most of the disadvantages of an SPA.

[[↑] Back to top](#js-questions)

### Explain how JSONP works (and how it's not really Ajax).

JSONP (JSON with Padding) is a method commonly used to bypass the cross-domain policies in web browsers because Ajax requests from the current page to a cross-origin domain is not allowed.

JSONP works by making a request to a cross-origin domain via a `<script>` tag and usually with a `callback` query parameter, for example: `https://example.com?callback=printData`. The server will then wrap the data within a function called `printData` and return it to the client.

```html
<!-- https://mydomain.com -->
<script>
function printData(data) {
  console.log(`My name is ${data.name}!`);
}
</script>

<script src="https://example.com?callback=printData"></script>
```

```js
// File loaded from https://example.com?callback=printData
printData({ name: 'Yang Shun' });
```

The client has to have the `printData` function in its global scope and the function will be executed by the client when the response from the cross-origin domain is received.

JSONP can be unsafe and has some security implications. As JSONP is really JavaScript, it can do everything else JavaScript can do, so you need to trust the provider of the JSONP data.

These days, [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) is the recommended approach and JSONP is seen as a hack.

###### References

* https://stackoverflow.com/a/2067584/1751946

[[↑] Back to top](#js-questions)

### Have you ever used JavaScript templating? If so, what libraries have you used?

Yes. Handlebars, Underscore, Lodash, AngularJS, and JSX. I disliked templating in AngularJS because it made heavy use of strings in the directives and typos would go uncaught. JSX is my new favorite as it is closer to JavaScript and there is barely any syntax to learn. Nowadays, you can even use ES2015 template string literals as a quick way for creating templates without relying on third-party code.

```js
const template = `<div>My name is: ${name}</div>`;
```

However, do be aware of a potential XSS in the above approach as the contents are not escaped for you, unlike in templating libraries.

[[↑] Back to top](#js-questions)

### Explain "hoisting".

Hoisting is a term used to explain the behavior of variable declarations in your code. Variables declared or initialized with the `var` keyword will have their declaration "moved" up to the top of the current scope, which we refer to as hoisting. However, only the declaration is hoisted, the assignment (if there is one), will stay where it is.

Note that the declaration is not actually moved - the JavaScript engine parses the declarations during compilation and becomes aware of declarations and their scopes. It is just easier to understand this behavior by visualizing the declarations as being hoisted to the top of their scope. Let's explain with a few examples.

```js
// var declarations are hoisted.
console.log(foo); // undefined
var foo = 1;
console.log(foo); // 1

// let/const declarations are NOT hoisted.
console.log(bar); // ReferenceError: bar is not defined
let bar = 2;
console.log(bar); // 2
```

Function declarations have the body hoisted while the function expressions (written in the form of variable declarations) only has the variable declaration hoisted.

```js
// Function Declaration
console.log(foo); // [Function: foo]
foo(); // 'FOOOOO'
function foo() {
  console.log('FOOOOO');
}
console.log(foo); // [Function: foo]

// Function Expression
console.log(bar); // undefined
bar(); // Uncaught TypeError: bar is not a function
var bar = function() {
  console.log('BARRRR');
};
console.log(bar); // [Function: bar]
```

[[↑] Back to top](#js-questions)

### Describe event bubbling.

When an event triggers on a DOM element, it will attempt to handle the event if there is a listener attached, then the event is bubbled up to its parent and the same thing happens. This bubbling occurs up the element's ancestors all the way to the `document`. Event bubbling is the mechanism behind event delegation.

[[↑] Back to top](#js-questions)

### What's the difference between an "attribute" and a "property"?

Attributes are defined on the HTML markup but properties are defined on the DOM. To illustrate the difference, imagine we have this text field in our HTML: `<input type="text" value="Hello">`.

```js
const input = document.querySelector('input');
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello
```

But after you change the value of the text field by adding "World!" to it, this becomes:

```js
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello World!
```

###### References

* https://stackoverflow.com/questions/6003819/properties-and-attributes-in-html

[[↑] Back to top](#js-questions)

### Why is extending built-in JavaScript objects not a good idea?

Extending a built-in/native JavaScript object means adding properties/functions to its `prototype`. While this may seem like a good idea at first, it is dangerous in practice. Imagine your code uses a few libraries that both extend the `Array.prototype` by adding the same `contains` method, the implementations will overwrite each other and your code will break if the behavior of these two methods is not the same.

The only time you may want to extend a native object is when you want to create a polyfill, essentially providing your own implementation for a method that is part of the JavaScript specification but might not exist in the user's browser due to it being an older browser.

###### References

* http://lucybain.com/blog/2014/js-extending-built-in-objects/

[[↑] Back to top](#js-questions)

### Difference between document `load` event and document `DOMContentLoaded` event?

The `DOMContentLoaded` event is fired when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.

`window`'s `load` event is only fired after the DOM and all dependent resources and assets have loaded.

###### References

* https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
* https://developer.mozilla.org/en-US/docs/Web/Events/load

[[↑] Back to top](#js-questions)

### What is the difference between `==` and `===`?

`==` is the abstract equality operator while `===` is the strict equality operator. The `==` operator will compare for equality after doing any necessary type conversions. The `===` operator will not do type conversion, so if two values are not the same type `===` will simply return `false`. When using `==`, funky things can happen, such as:

```js
1 == '1'; // true
1 == [1]; // true
1 == true; // true
0 == ''; // true
0 == '0'; // true
0 == false; // true
```

My advice is never to use the `==` operator, except for convenience when comparing against `null` or `undefined`, where `a == null` will return `true` if `a` is `null` or `undefined`.

```js
var a = null;
console.log(a == null); // true
console.log(a == undefined); // true
```

###### References

* https://stackoverflow.com/questions/359494/which-equals-operator-vs-should-be-used-in-javascript-comparisons

[[↑] Back to top](#js-questions)

### Explain the same-origin policy with regards to JavaScript.

The same-origin policy prevents JavaScript from making requests across domain boundaries. An origin is defined as a combination of URI scheme, hostname, and port number. This policy prevents a malicious script on one page from obtaining access to sensitive data on another web page through that page's Document Object Model.

###### References

* https://en.wikipedia.org/wiki/Same-origin_policy

[[↑] Back to top](#js-questions)

### Make this work:

```js
duplicate([1, 2, 3, 4, 5]); // [1,2,3,4,5,1,2,3,4,5]
```

```js
function duplicate(arr) {
  return arr.concat(arr);
}

duplicate([1, 2, 3, 4, 5]); // [1,2,3,4,5,1,2,3,4,5]
```

[[↑] Back to top](#js-questions)

### Why is it called a Ternary expression, what does the word "Ternary" indicate?

"Ternary" indicates three, and a ternary expression accepts three operands, the test condition, the "then" expression and the "else" expression. Ternary expressions are not specific to JavaScript and I'm not sure why it is even in this list.

###### References

* https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

[[↑] Back to top](#js-questions)

### What is `"use strict";`? What are the advantages and disadvantages to using it?

'use strict' is a statement used to enable strict mode to entire scripts or individual functions. Strict mode is a way to opt into a restricted variant of JavaScript.

Advantages:

* Makes it impossible to accidentally create global variables.
* Makes assignments which would otherwise silently fail to throw an exception.
* Makes attempts to delete undeletable properties throw (where before the attempt would simply have no effect).
* Requires that function parameter names be unique.
* `this` is undefined in the global context.
* It catches some common coding bloopers, throwing exceptions.
* It disables features that are confusing or poorly thought out.

Disadvantages:

* Many missing features that some developers might be used to.
* No more access to `function.caller` and `function.arguments`.
* Concatenation of scripts written in different strict modes might cause issues.

Overall, I think the benefits outweigh the disadvantages, and I never had to rely on the features that strict mode blocks. I would recommend using strict mode.

###### References

* http://2ality.com/2011/10/strict-mode-hatred.html
* http://lucybain.com/blog/2014/js-use-strict/

[[↑] Back to top](#js-questions)

### Create a for loop that iterates up to `100` while outputting **"fizz"** at multiples of `3`, **"buzz"** at multiples of `5` and **"fizzbuzz"** at multiples of `3` and `5`.

Check out this version of FizzBuzz by [Paul Irish](https://gist.github.com/jaysonrowe/1592432#gistcomment-790724).

```js
for (let i = 1; i <= 100; i++) {
  let f = i % 3 == 0,
    b = i % 5 == 0;
  console.log(f ? (b ? 'FizzBuzz' : 'Fizz') : b ? 'Buzz' : i);
}
```

I would not advise you to write the above during interviews though. Just stick with the long but clear approach. For more wacky versions of FizzBuzz, check out the reference link below.

###### References

* https://gist.github.com/jaysonrowe/1592432

[[↑] Back to top](#js-questions)

### Why is it, in general, a good idea to leave the global scope of a website as-is and never touch it?

Every script has access to the global scope, and if everyone uses the global namespace to define their variables, collisions will likely occur. Use the module pattern (IIFEs) to encapsulate your variables within a local namespace.

[[↑] Back to top](#js-questions)

### Why would you use something like the `load` event? Does this event have disadvantages? Do you know any alternatives, and why would you use those?

The `load` event fires at the end of the document loading process. At this point, all of the objects in the document are in the DOM, and all the images, scripts, links and sub-frames have finished loading.

The DOM event `DOMContentLoaded` will fire after the DOM for the page has been constructed, but do not wait for other resources to finish loading. This is preferred in certain cases when you do not need the full page to be loaded before initializing.

TODO.

###### References

* https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload

[[↑] Back to top](#js-questions)

### Explain what a single page app is and how to make one SEO-friendly.

The below is taken from the awesome [Grab Front End Guide](https://github.com/grab/front-end-guide), which coincidentally, is written by me!

Web developers these days refer to the products they build as web apps, rather than websites. While there is no strict difference between the two terms, web apps tend to be highly interactive and dynamic, allowing the user to perform actions and receive a response to their action. Traditionally, the browser receives HTML from the server and renders it. When the user navigates to another URL, a full-page refresh is required and the server sends fresh new HTML to the new page. This is called server-side rendering.

However, in modern SPAs, client-side rendering is used instead. The browser loads the initial page from the server, along with the scripts (frameworks, libraries, app code) and stylesheets required for the whole app. When the user navigates to other pages, a page refresh is not triggered. The URL of the page is updated via the [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API). New data required for the new page, usually in JSON format, is retrieved by the browser via [AJAX](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started) requests to the server. The SPA then dynamically updates the page with the data via JavaScript, which it has already downloaded in the initial page load. This model is similar to how native mobile apps work.

The benefits:

* The app feels more responsive and users do not see the flash between page navigations due to full-page refreshes.
* Fewer HTTP requests are made to the server, as the same assets do not have to be downloaded again for each page load.
* Clear separation of the concerns between the client and the server; you can easily build new clients for different platforms (e.g. mobile, chatbots, smart watches) without having to modify the server code. You can also modify the technology stack on the client and server independently, as long as the API contract is not broken.

The downsides:

* Heavier initial page load due to the loading of framework, app code, and assets required for multiple pages.
* There's an additional step to be done on your server which is to configure it to route all requests to a single entry point and allow client-side routing to take over from there.
* SPAs are reliant on JavaScript to render content, but not all search engines execute JavaScript during crawling, and they may see empty content on your page. This inadvertently hurts the Search Engine Optimization (SEO) of your app. However, most of the time, when you are building apps, SEO is not the most important factor, as not all the content needs to be indexable by search engines. To overcome this, you can either server-side render your app or use services such as [Prerender](https://prerender.io/) to "render your javascript in a browser, save the static HTML, and return that to the crawlers".

###### References

* https://github.com/grab/front-end-guide#single-page-apps-spas
* http://stackoverflow.com/questions/21862054/single-page-app-advantages-and-disadvantages
* http://blog.isquaredsoftware.com/presentations/2016-10-revolution-of-web-dev/
* https://medium.freecodecamp.com/heres-why-client-side-rendering-won-46a349fadb52

[[↑] Back to top](#js-questions)

### What is the extent of your experience with Promises and/or their polyfills?

Possess working knowledge of it. A promise is an object that may produce a single value sometime in the future: either a resolved value or a reason that it's not resolved (e.g., a network error occurred). A promise may be in one of 3 possible states: fulfilled, rejected, or pending. Promise users can attach callbacks to handle the fulfilled value or the reason for rejection.

Some common polyfills are `$.deferred`, Q and Bluebird but not all of them comply with the specification. ES2015 supports Promises out of the box and polyfills are typically not needed these days.

###### References

* https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261

[[↑] Back to top](#js-questions)

### What are the pros and cons of using Promises instead of callbacks?

**Pros**

* Avoid callback hell which can be unreadable.
* Makes it easy to write sequential asynchronous code that is readable with `.then()`.
* Makes it easy to write parallel asynchronous code with `Promise.all()`.

**Cons**

* Slightly more complex code (debatable).
* In older browsers where ES2015 is not supported, you need to load a polyfill in order to use it.

[[↑] Back to top](#js-questions)

### What are some of the advantages/disadvantages of writing JavaScript code in a language that compiles to JavaScript?

Some examples of languages that compile to JavaScript include CoffeeScript, Elm, ClojureScript, PureScript, and TypeScript.

Advantages:

* Fixes some of the longstanding problems in JavaScript and discourages JavaScript anti-patterns.
* Enables you to write shorter code, by providing some syntactic sugar on top of JavaScript, which I think ES5 lacks, but ES2015 is awesome.
* Static types are awesome (in the case of TypeScript) for large projects that need to be maintained over time.

Disadvantages:

* Require a build/compile process as browsers only run JavaScript and your code will need to be compiled into JavaScript before being served to browsers.
* Debugging can be a pain if your source maps do not map nicely to your pre-compiled source.
* Most developers are not familiar with these languages and will need to learn it. There's a ramp up cost involved for your team if you use it for your projects.
* Smaller community (depends on the language), which means resources, tutorials, libraries, and tooling would be harder to find.
* IDE/editor support might be lacking.
* These languages will always be behind the latest JavaScript standard.
* Developers should be cognizant of what their code is being compiled to — because that is what would actually be running, and that is what matters in the end.

Practically, ES2015 has vastly improved JavaScript and made it much nicer to write. I don't really see the need for CoffeeScript these days.

###### References

* https://softwareengineering.stackexchange.com/questions/72569/what-are-the-pros-and-cons-of-coffeescript

[[↑] Back to top](#js-questions)

### What tools and techniques do you use for debugging JavaScript code?

* React and Redux
  * [React Devtools](https://github.com/facebook/react-devtools)
  * [Redux Devtools](https://github.com/gaearon/redux-devtools)
* Vue
  * [Vue Devtools](https://github.com/vuejs/vue-devtools)
* JavaScript
  * [Chrome Devtools](https://hackernoon.com/twelve-fancy-chrome-devtools-tips-dc1e39d10d9d)
  * `debugger` statement
  * Good old `console.log` debugging

###### References

* https://hackernoon.com/twelve-fancy-chrome-devtools-tips-dc1e39d10d9d
* https://raygun.com/blog/javascript-debugging/

[[↑] Back to top](#js-questions)

### What language constructions do you use for iterating over object properties and array items?

For objects:

* `for` loops - `for (var property in obj) { console.log(property); }`. However, this will also iterate through its inherited properties, and you will add an `obj.hasOwnProperty(property)` check before using it.
* `Object.keys()` - `Object.keys(obj).forEach(function (property) { ... })`. `Object.keys()` is a static method that will lists all enumerable properties of the object that you pass it.
* `Object.getOwnPropertyNames()` - `Object.getOwnPropertyNames(obj).forEach(function (property) { ... })`. `Object.getOwnPropertyNames()` is a static method that will lists all enumerable and non-enumerable properties of the object that you pass it.

For arrays:

* `for` loops - `for (var i = 0; i < arr.length; i++)`. The common pitfall here is that `var` is in the function scope and not the block scope and most of the time you would want block scoped iterator variable. ES2015 introduces `let` which has block scope and it is recommended to use that instead. So this becomes: `for (let i = 0; i < arr.length; i++)`.
* `forEach` - `arr.forEach(function (el, index) { ... })`. This construct can be more convenient at times because you do not have to use the `index` if all you need is the array elements. There are also the `every` and `some` methods which will allow you to terminate the iteration early.

Most of the time, I would prefer the `.forEach` method, but it really depends on what you are trying to do. `for` loops allow more flexibility, such as prematurely terminate the loop using `break` or incrementing the iterator more than once per loop.

[[↑] Back to top](#js-questions)

### Explain the difference between mutable and immutable objects.

* What is an example of an immutable object in JavaScript?
* What are the pros and cons of immutability?
* How can you achieve immutability in your own code?

TODO

[[↑] Back to top](#js-questions)

### Explain the difference between synchronous and asynchronous functions.

Synchronous functions are blocking while asynchronous functions are not. In synchronous functions, statements complete before the next statement is run. In this case, the program is evaluated exactly in order of the statements and execution of the program is paused if one of the statements take a very long time.

Asynchronous functions usually accept a callback as a parameter and execution continue on the next line immediately after the asynchronous function is invoked. The callback is only invoked when the asynchronous operation is complete and the call stack is empty. Heavy duty operations such as loading data from a web server or querying a database should be done asynchronously so that the main thread can continue executing other operations instead of blocking until that long operation to complete (in the case of browsers, the UI will freeze).

[[↑] Back to top](#js-questions)

### What is event loop? What is the difference between call stack and task queue?

The event loop is a single-threaded loop that monitors the call stack and checks if there is any work to be done in the task queue. If the call stack is empty and there are callback functions in the task queue, a function is dequeued and pushed onto the call stack to be executed.

If you haven't already checked out Philip Robert's [talk on the Event Loop](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html), you should. It is one of the most viewed videos on JavaScript.

###### References

* https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html
* http://theproactiveprogrammer.com/javascript/the-javascript-event-loop-a-stack-and-a-queue/

[[↑] Back to top](#js-questions)

### Explain the differences on the usage of `foo` between `function foo() {}` and `var foo = function() {}`

The former is a function declaration while the latter is a function expression. The key difference is that function declarations have its body hoisted but the bodies of function expressions are not (they have the same hoisting behavior as variables). For more explanation on hoisting, refer to the question above on hoisting. If you try to invoke a function expression before it is defined, you will get an `Uncaught TypeError: XXX is not a function` error.

**Function Declaration**

```js
foo(); // 'FOOOOO'
function foo() {
  console.log('FOOOOO');
}
```

**Function Expression**

```js
foo(); // Uncaught TypeError: foo is not a function
var foo = function() {
  console.log('FOOOOO');
};
```

###### References

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function

[[↑] Back to top](#js-questions)

### What are the differences between variables created using `let`, `var` or `const`?

Variables declared using the `var` keyword are scoped to the function in which they are created, or if created outside of any function, to the global object. `let` and `const` are _block scoped_, meaning they are only accessible within the nearest set of curly braces (function, if-else block, or for-loop).

```js
function foo() {
  // All variables are accessible within functions.
  var bar = 'bar';
  let baz = 'baz';
  const qux = 'qux';

  console.log(bar); // bar
  console.log(baz); // baz
  console.log(qux); // qux
}

console.log(bar); // ReferenceError: bar is not defined
console.log(baz); // ReferenceError: baz is not defined
console.log(qux); // ReferenceError: qux is not defined
```

```js
if (true) {
  var bar = 'bar';
  let baz = 'baz';
  const qux = 'qux';
}

// var declared variables are accessible anywhere in the function scope.
console.log(bar); // bar
// let and const defined variables are not accessible outside of the block they were defined in.
console.log(baz); // ReferenceError: baz is not defined
console.log(qux); // ReferenceError: qux is not defined
```

`var` allows variables to be hoisted, meaning they can be referenced in code before they are declared. `let` and `const` will not allow this, instead throwing an error.

```js
console.log(foo); // undefined

var foo = 'foo';

console.log(baz); // ReferenceError: can't access lexical declaration 'baz' before initialization

let baz = 'baz';

console.log(bar); // ReferenceError: can't access lexical declaration 'bar' before initialization

const bar = 'bar';
```

Redeclaring a variable with `var` will not throw an error, but 'let' and 'const' will.

```js
var foo = 'foo';
var foo = 'bar';
console.log(foo); // "bar"

let baz = 'baz';
let baz = 'qux'; // Uncaught SyntaxError: Identifier 'baz' has already been declared
```

`let` and `const` differ in that `let` allows reassigning the variable's value while `const` does not.

```js
// This is fine.
let foo = 'foo';
foo = 'bar';

// This causes an exception.
const baz = 'baz';
baz = 'qux';
```

###### References

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const

[[↑] Back to top](#js-questions)

### What are the differences between ES6 class and ES5 function constructors?

Let's first look at example of each:

```js
// ES5 Function Constructor
function Person(name) {
  this.name = name;
}

// ES6 Class
class Person {
  constructor(name) {
    this.name = name;
  }
}
```

For simple constructors, they look pretty similar.

The main difference in the constructor comes when using inheritance. If we want to create a `Student` class that subclasses `Person` and add a `studentId` field, this is what we have to do in addition to the above.

```js
// ES5 Function Constructor
function Student(name, studentId) {
  // Call constructor of superclass to initialize superclass-derived members.
  Person.call(this, name);

  // Initialize subclass's own members.
  this.studentId = studentId;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

// ES6 Class
class Student extends Person {
  constructor(name, studentId) {
    super(name);
    this.studentId = studentId;
  }
}
```

It's much more verbose to use inheritance in ES5 and the ES6 version is easier to understand and remember.

###### References

* https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance
* https://eli.thegreenplace.net/2013/10/22/classical-inheritance-in-javascript-es5

[[↑] Back to top](#js-questions)

### Can you offer a use case for the new arrow => function syntax? How does this new syntax differ from other functions?

TODO

[[↑] Back to top](#js-questions)

### What advantage is there for using the arrow syntax for a method in a constructor?

TODO

[[↑] Back to top](#js-questions)

### What is the definition of a higher-order function?

A higher-order function is any function that takes one or more functions as arguments, which it uses to operate on some data, and/or returns a function as a result. Higher-order functions are meant to abstract some operation that is performed repeatedly. The classic example of this is `map`, which takes an array and a function as arguments. `map` then uses this function to transform each item in the array, returning a new array with the transformed data. Other popular examples in JavaScript are `forEach`, `filter`, and `reduce`. A higher-order function doesn't just need to be manipulating arrays as there are many use cases for returning a function from another function. `Function.prototype.bind` is one such example in JavaScript.

**Map**

Let say we have an array of names which we need to transform each string to uppercase.

```js
const names = ['irish', 'daisy', 'anna'];
```

The imperative way will be as such:

```js
const transformNamesToUppercase = function(names) {
  const results = [];
  for (let i = 0; i < names.length; i++) {
    results.push(names[i].toUpperCase());
  }
  return results;
};
transformNamesToUppercase(names); // ['IRISH', 'DAISY', 'ANNA']
```

Use `.map(transformerFn)` makes the code shorter and more declarative.

```js
const transformNamesToUppercase = function(names) {
  return names.map(name => name.toUpperCase());
};
transformNamesToUppercase(names); // ['IRISH', 'DAISY', 'ANNA']
```

###### References

* https://medium.com/javascript-scene/higher-order-functions-composing-software-5365cf2cbe99
* https://hackernoon.com/effective-functional-javascript-first-class-and-higher-order-functions-713fde8df50a
* https://eloquentjavascript.net/05_higher_order.html

[[↑] Back to top](#js-questions)

### Can you give an example for destructuring an object or an array?

Destructuring is an expression available in ES6 which enables a succinct and convenient way to extract values of Objects or Arrays and place them into distinct variables.

**Array destructuring**

```js
// Variable assignment.
const foo = ['one', 'two', 'three'];

const [one, two, three] = foo;
console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "three"
```

```js
// Swapping variables
let a = 1;
let b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1
```

**Object destructuring**

```js
// Variable assignment.
const o = { p: 42, q: true };
const { p, q } = o;

console.log(p); // 42
console.log(q); // true
```

###### References

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
* https://ponyfoo.com/articles/es6-destructuring-in-depth

[[↑] Back to top](#js-questions)

### ES6 Template Literals offer a lot of flexibility in generating strings, can you give an example?

TODO

[[↑] Back to top](#js-questions)

### Can you give an example of a curry function and why this syntax offers an advantage?

Currying is a pattern where a function with more than one parameter is broken into multiple functions that, when called in series, will accumulate all of the required parameters one at a time. This technique can be useful for making code written in a functional style easier to read and compose. It's important to note that for a function to be curried, it needs to start out as one function, then broken out into a sequence of functions that each accepts one parameter.

```js
function curry(fn) {
  if (fn.length === 0) {
    return fn;
  }

  function _curried(depth, args) {
    return function(newArgument) {
      if (depth - 1 === 0) {
        return fn(...args, newArgument);
      }
      return _curried(depth - 1, [...args, newArgument]);
    };
  }

  return _curried(fn.length, []);
}

function add(a, b) {
  return a + b;
}

var curriedAdd = curry(add);
var addFive = curriedAdd(5);

var result = [0, 1, 2, 3, 4, 5].map(addFive); // [5, 6, 7, 8, 9, 10]
```

###### References

* https://hackernoon.com/currying-in-js-d9ddc64f162e

[[↑] Back to top](#js-questions)

### What are the benefits of using spread syntax and how is it different from rest syntax?

ES6's spread syntax is very useful when coding in a functional paradigm as we can easily create copies of arrays or objects without resorting to `Object.create`, `slice`, or a library function. This language feature is used often in Redux and rx.js projects.

```js
function putDookieInAnyArray(arr) {
  return [...arr, 'dookie'];
}

const result = putDookieInAnyArray(['I', 'really', "don't", 'like']); // ["I", "really", "don't", "like", "dookie"]

const person = {
  name: 'Todd',
  age: 29,
};

const copyOfTodd = { ...person };
```

ES6's rest syntax offers a shorthand for including an arbitrary number of arguments to be passed to a function. It is like an inverse of the spread syntax, taking data and stuffing it into an array rather than unpacking an array of data, and it works in function arguments, as well as in array and object destructuring assignments.

```js
function addFiveToABunchOfNumbers(...numbers) {
  return numbers.map(x => x + 5);
}

const result = addFiveToABunchOfNumbers(4, 5, 6, 7, 8, 9, 10); // [9, 10, 11, 12, 13, 14, 15]

const [a, b, ...rest] = [1, 2, 3, 4]; // a: 1, b: 2, rest: [3, 4]

const { e, f, ...others } = {
  e: 1,
  f: 2,
  g: 3,
  h: 4,
}; // e: 1, f: 2, others: { g: 3, h: 4 }
```

###### References

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

[[↑] Back to top](#js-questions)

### How can you share code between files?

This depends on the JavaScript environment.

On the client (browser environment), as long as the variables/functions are declared in the global scope (`window`), all scripts can refer to them. Alternatively, adopt the Asynchronous Module Definition (AMD) via RequireJS for a more modular approach.

On the server (Node.js), the common way has been to use CommonJS. Each file is treated as a module and it can export variables and functions by attaching them to the `module.exports` object.

ES2015 defines a module syntax which aims to replace both AMD and CommonJS. This will eventually be supported in both browser and Node environments.

[[↑] Back to top](#js-questions)

###### References

* http://requirejs.org/docs/whyamd.html
* https://nodejs.org/docs/latest/api/modules.html
* http://2ality.com/2014/09/es6-modules-final.html

### Why you might want to create static class members?

Static class members (properties/methods) are not tied to a specific instance of a class and have the same value regardless of which instance is referring to it. Static properties are typically configuration variables and static methods are usually pure utility functions which do not depend on the state of the instance.

###### References

* https://stackoverflow.com/questions/21155438/when-to-use-static-variables-methods-and-when-to-use-instance-variables-methods

[[↑] Back to top](#js-questions)

### Other Answers

* http://flowerszhong.github.io/2013/11/20/javascript-questions.html

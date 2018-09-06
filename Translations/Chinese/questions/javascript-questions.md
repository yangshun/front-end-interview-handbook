## JS 问题

本章节是[前端开发者面试问题 - JS 部分](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/questions/javascript-questions.md)的参考答案。 欢迎提出 PR 进行建议和指正！

* [请解释事件委托（event delegation）。](#请解释事件委托event-delegation)
* [请简述`JavaScript`中的`this`。](#请简述javascript中的this)
* [请解释原型继承（prototypal inheritance）的工作原理。](#请解释原型继承prototypal-inheritance的工作原理)
* [说说你对 AMD 和 CommonJS 的了解。](#说说你对-amd-和-commonjs-的了解)
* [请解释下面代码为什么不能用作 IIFE：`function foo(){ }();`，需要作出哪些修改才能使其成为 IIFE？](#请解释下面代码为什么不能用作-iifefunction-foo-需要作出哪些修改才能使其成为-iife)
* [`null`、`undefined`和未声明变量之间有什么区别？如何检查判断这些状态值？](#nullundefined和未声明变量之间有什么区别如何检查判断这些状态值)
* [什么是闭包（closure），为什么使用闭包？](#什么是闭包closure为什么使用闭包)
* [请说明`.forEach`循环和`.map()`循环的主要区别，它们分别在什么情况下使用？](#请说明foreach循环和map循环的主要区别它们分别在什么情况下使用)
* [匿名函数的典型应用场景是什么？](#匿名函数的典型应用场景是什么)
* [你如何组织自己的代码？（使用模块模式（module pattern）还是经典继承（classical inheritance）？）](#你如何组织自己的代码使用模块模式module-pattern还是经典继承classical-inheritance)
* [宿主对象（host objects）和原生对象（native objects）的区别是什么？](#宿主对象host-objects和原生对象native-objects的区别是什么)
* [下列语句有什么区别：`function Person(){}`、`var person = Person()`和`var person = new Person()`？](#下列语句有什么区别function-personvar-person--person和var-person--new-person)
* [`.call`和`.apply`有什么区别？](#call和apply有什么区别)
* [请说明`Function.prototype.bind`的用法。](#请说明functionprototypebind的用法)
* [什么时候会用到`document.write()`？](#什么时候会用到documentwrite)
* [功能检测（feature detection）、功能推断（feature inference）和使用 UA 字符串之间有什么区别？](#功能检测feature-detection功能推断feature-inference和使用-ua-字符串之间有什么区别)
* [请尽可能详细地解释 Ajax。](#请尽可能详细地解释-ajax)
* [使用 Ajax 的优缺点分别是什么？](#使用ajax的优缺点分别是什么)
* [请说明 JSONP 的工作原理，它为什么不是真正的 Ajax？](#请说明-jsonp-的工作原理它为什么不是真正的-ajax)
* [你使用过 JavaScript 模板吗？用过什么相关的库？](#你使用过-javascript-模板吗用过什么相关的库)
* [请解释变量提升（hoisting）。](#请解释变量提升hoisting)
* [请描述事件冒泡。](#请描述事件冒泡)
* [“attribute” 和 “property” 之间有什么区别？](#attribute-和-property-之间有什么区别)
* [为什么扩展 JavaScript 内置对象是不好的做法？](#为什么扩展-javascript-内置对象是不好的做法)
* [document 中的`load`事件和`DOMContentLoaded`事件之间的区别是什么？](#document-中的load事件和domcontentloaded事件之间的区别是什么)
* [`==`和`===`的区别是什么？](#和的区别是什么)
* [请解释关于 JavaScript 的同源策略。](#请解释关于-javascript-的同源策略)
* [请使下面的语句生效：](#请使下面的语句生效)

```js
duplicate([1, 2, 3, 4, 5]); // [1,2,3,4,5,1,2,3,4,5]
```

* [请说明三元表达式中“三元”这个词代表什么？](#请说明三元表达式中三元这个词代表什么)
* [什么是`"use strict";`？使用它有什么优缺点？](#什么是use-strict使用它有什么优缺点)
* [创建一个循环，从 1 迭代到 100，`3`的倍数时输出 "fizz"，`5`的倍数时输出 "buzz"，同时为`3`和`5`的倍数时输出 "fizzbuzz"。](#创建一个循环从1迭代到1003的倍数时输出-fizz5的倍数时输出-buzz同时为3和5的倍数时输出-fizzbuzz)
* [为什么不要使用全局作用域？](#为什么不要使用全局作用域)
* [为什么要使用`load`事件？这个事件有什么缺点吗？你知道一些代替方案吗，为什么使用它们？](#为什么要使用load事件这个事件有什么缺点吗你知道一些代替方案吗为什么使用它们)
* [请解释单页应用是什么，如何使其对 SEO 友好。](#请解释单页应用是什么如何使其对seo友好)
* [你对 Promises 及其 polyfill 的掌握程度如何？](#你对-promises-及其-polyfill-的掌握程度如何)
* [`Promise`代替回调函数有什么优缺点？](#promise代替回调函数有什么优缺点)
* [用转译成 JavaScript 的语言写 JavaScript 有什么优缺点？](#用转译成-javascript-的语言写-javascript-有什么优缺点)
* [你使用什么工具和技巧调试 JavaScript 代码？](#你使用什么工具和技巧调试-javascript-代码)
* [你使用什么语句遍历对象的属性和数组的元素？](#你使用什么语句遍历对象的属性和数组的元素)
* [请解释可变对象和不可变对象之间的区别。](#请解释可变对象和不可变对象之间的区别)
* [请解释同步和异步函数之间的区别。](#请解释同步和异步函数之间的区别)
* [什么是事件循环？调用堆栈和任务队列之间有什么区别？](#什么是事件循环调用堆栈和任务队列之间有什么区别)
* [请解释`function foo() {}`和`var foo = function() {}`之间`foo`的用法上的区别。](#请解释function-foo-和var-foo--function-之间foo的用法上的区别)
* [使用`let`、`var`和`const`创建变量有什么区别？](#使用letvar和const创建变量有什么区别)
* [ES6 的类和 ES5 的构造函数有什么区别？](#es6-的类和-es5-的构造函数有什么区别)
* [你能给出一个使用箭头函数的例子吗，箭头函数与其他函数有什么不同？](#你能给出一个使用箭头函数的例子吗箭头函数与其他函数有什么不同)
* [在构造函数中使用箭头函数有什么好处？](#在构造函数中使用箭头函数有什么好处)
* [高阶函数（higher-order）的定义是什么？](#高阶函数higher-order的定义是什么)
* [请给出一个解构（destructuring）对象或数组的例子。](#请给出一个解构destructuring对象或数组的例子)
* [ES6 的模板字符串为生成字符串提供了很大的灵活性，你可以举个例子吗？](#es6-的模板字符串为生成字符串提供了很大的灵活性你可以举个例子吗)
* [你能举出一个柯里化函数（curry function）的例子吗？它有哪些好处？](#你能举出一个柯里化函数curry-function的例子吗它有哪些好处)
* [使用扩展运算符（spread）的好处是什么，它与使用剩余参数语句（rest）有什么区别？](#使用扩展运算符spread的好处是什么它与使用剩余参数语句rest有什么区别)
* [如何在文件之间共用代码？](#如何在文件之间共用代码)
* [什么情况下会用到静态类成员？](#什么情况下会用到静态类成员)

### 请解释事件委托（event delegation）。

事件委托是将事件监听器添加到父元素，而不是每个子元素单独设置事件监听器。当触发子元素时，事件会冒泡到父元素，监听器就会触发。这种技术的好处是：

* 内存占用减少，因为只需要一个父元素的事件处理程序，而不必为每个后代都添加事件处理程序。
* 无需从已删除的元素中解绑处理程序，也无需将处理程序绑定到新元素上。

###### 参考

* https://davidwalsh.name/event-delegate
* https://stackoverflow.com/questions/1687296/what-is-dom-event-delegation

[[↑] 回到顶部](#js-问题)

### 请简述`JavaScript`中的`this`。

JS 中的`this`是一个相对复杂的概念，不是简单几句能解释清楚的。粗略地讲，函数的调用方式决定了`this`的值。我阅读了网上很多关于`this`的文章，[Arnav Aggrawal](https://medium.com/@arnav_aggarwal) 写的比较清楚。`this`取值符合以下规则：

1. 在调用函数时使用`new`关键字，函数内的`this`是一个全新的对象。
1. 如果`apply`、`call`或`bind`方法用于调用、创建一个函数，函数内的 this 就是作为参数传入这些方法的对象。
1. 当函数作为对象里的方法被调用时，函数内的`this`是调用该函数的对象。比如当`obj.method()`被调用时，函数内的 this 将绑定到`obj`对象。
1. 如果调用函数不符合上述规则，那么`this`的值指向全局对象（global object）。浏览器环境下`this`的值指向`window`对象，但是在严格模式下(`'use strict'`)，`this`的值为`undefined`。
1. 如果符合上述多个规则，则较高的规则（1 号最高，4 号最低）将决定`this`的值。
1. 如果该函数是 ES2015 中的箭头函数，将忽略上面的所有规则，`this`被设置为它被创建时的上下文。

想获得更深入的解释，请查看[他在 Medium 上的文章](https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3)。

###### 参考

* https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3
* https://stackoverflow.com/a/3127440/1751946

[[↑] 回到顶部](#js-问题)

### 请解释原型继承（prototypal inheritance）的工作原理。

这是一个非常常见的 JavaScript 问题。所有 JS 对象都有一个`prototype`属性，指向它的原型对象。当试图访问一个对象的属性时，如果没有在该对象上找到，它还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。这种行为是在模拟经典的继承，[但是与其说是继承，不如说是委托（delegation）](https://davidwalsh.name/javascript-objects)。

###### 参考

* https://www.quora.com/What-is-prototypal-inheritance/answer/Kyle-Simpson
* https://davidwalsh.name/javascript-objects

[[↑] 回到顶部](#js-问题)

### 说说你对 AMD 和 CommonJS 的了解。

它们都是实现模块体系的方式，直到 ES2015 出现之前，JavaScript 一直没有模块体系。CommonJS 是同步的，而 AMD（Asynchronous Module Definition）从全称中可以明显看出是异步的。CommonJS 的设计是为服务器端开发考虑的，而 AMD 支持异步加载模块，更适合浏览器。

我发现 AMD 的语法非常冗长，CommonJS 更接近其他语言 import 声明语句的用法习惯。大多数情况下，我认为 AMD 没有使用的必要，因为如果把所有 JavaScript 都捆绑进一个文件中，将无法得到异步加载的好处。此外，CommonJS 语法上更接近 Node 编写模块的风格，在前后端都使用 JavaScript 开发之间进行切换时，语境的切换开销较小。

我很高兴看到 ES2015 的模块加载方案同时支持同步和异步，我们终于可以只使用一种方案了。虽然它尚未在浏览器和 Node 中完全推出，但是我们可以使用代码转换工具进行转换。

###### 参考

* https://auth0.com/blog/javascript-module-systems-showdown/
* https://stackoverflow.com/questions/16521471/relation-between-commonjs-amd-and-requirejs

[[↑] 回到顶部](#js-问题)

### 请解释下面代码为什么不能用作 IIFE：`function foo(){ }();`，需要作出哪些修改才能使其成为 IIFE？

IIFE（Immediately Invoked Function Expressions）代表立即执行函数。 JavaScript 解析器将 `function foo(){ }();`解析成`function foo(){ }`和`();`。其中，前者是函数声明；后者（一对括号）是试图调用一个函数，却没有指定名称，因此它会抛出`Uncaught SyntaxError: Unexpected token )`的错误。

修改方法是：再添加一对括号，形式上有两种：`(function foo(){ })()`和`(function foo(){ }())`。以上函数不会暴露到全局作用域，如果不需要在函数内部引用自身，可以省略函数的名称。

你可能会用到 `void` 操作符：`void function foo(){ }();`。但是，这种做法是有问题的。表达式的值是`undefined`，所以如果你的 IIFE 有返回值，不要用这种做法。例如：

```
// Don't add JS syntax to this code block to prevent Prettier from formatting it.
const foo = void function bar() { return 'foo'; }();

console.log(foo); // undefined
```

###### 参考

* http://lucybain.com/blog/2014/immediately-invoked-function-expression/
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void

[[↑] 回到顶部](#js-问题)

### `null`、`undefined`和未声明变量之间有什么区别？如何检查判断这些状态值？

当你没有提前使用`var`、`let`或`const`声明变量，就为一个变量赋值时，该变量是未声明变量（undeclared variables）。未声明变量会脱离当前作用域，成为全局作用域下定义的变量。在严格模式下，给未声明的变量赋值，会抛出`ReferenceError`错误。和使用全局变量一样，使用未声明变量也是非常不好的做法，应当尽可能避免。要检查判断它们，需要将用到它们的代码放在`try`/`catch`语句中。

```js
function foo() {
  x = 1; // 在严格模式下，抛出 ReferenceError 错误
}

foo();
console.log(x); // 1
```

当一个变量已经声明，但没有赋值时，该变量的值是`undefined`。如果一个函数的执行结果被赋值给一个变量，但是这个函数却没有返回任何值，那么该变量的值是`undefined`。要检查它，需要使用严格相等（`===`）；或者使用`typeof`，它会返回`'undefined'`字符串。请注意，不能使用非严格相等（`==`）来检查，因为如果变量值为`null`，使用非严格相等也会返回`true`。

```js
var foo;
console.log(foo); // undefined
console.log(foo === undefined); // true
console.log(typeof foo === 'undefined'); // true

console.log(foo == null); // true. 错误，不要使用非严格相等！

function bar() {}
var baz = bar();
console.log(baz); // undefined
```

`null`只能被显式赋值给变量。它表示`空值`，与被显式赋值 `undefined` 的意义不同。要检查判断`null`值，需要使用严格相等运算符。请注意，和前面一样，不能使用非严格相等（`==`）来检查，因为如果变量值为`undefined`，使用非严格相等也会返回`true`。

```js
var foo = null;
console.log(foo === null); // true

console.log(foo == undefined); // true. 错误，不要使用非严格相等！
```

作为一种个人习惯，我从不使用未声明变量。如果定义了暂时没有用到的变量，我会在声明后明确地给它们赋值为`null`。

###### 参考

* https://stackoverflow.com/questions/15985875/effect-of-declared-and-undeclared-variables
* https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined

[[↑] 回到顶部](#js-问题)

### 什么是闭包（closure），为什么使用闭包？

闭包是函数和声明该函数的词法环境的组合。词法作用域中使用的域，是变量在代码中声明的位置所决定的。闭包是即使被外部函数返回，依然可以访问到外部（封闭）函数作用域的函数。

**为什么使用闭包？**

* 利用闭包实现数据私有化或模拟私有方法。这个方式也称为[模块模式（module pattern）](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)。
* [部分参数函数（partial applications）柯里化（currying）](https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8#.l4b6l1i3x).

###### 参考

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
* https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36

[[↑] 回到顶部](#js-问题)

### 请说明`.forEach`循环和`.map()`循环的主要区别，它们分别在什么情况下使用？

为了理解两者的区别，我们看看它们分别是做什么的。

**`forEach`**

* 遍历数组中的元素。
* 为每个元素执行回调。
* 无返回值。

```js
const a = [1, 2, 3];
const doubled = a.forEach((num, index) => {
  // 执行与 num、index 相关的代码
});

// doubled = undefined
```

**`map`**

* 遍历数组中的元素
* 通过对每个元素调用函数，将每个元素“映射（map）”到一个新元素，从而创建一个新数组。

```js
const a = [1, 2, 3];
const doubled = a.map(num => {
  return num * 2;
});

// doubled = [2, 4, 6]
```

`.forEach`和`.map()`的主要区别在于`.map()`返回一个新的数组。如果你想得到一个结果，但不想改变原始数组，用`.map()`。如果你只需要在数组上做迭代修改，用`forEach`。

###### 参考

* https://codeburst.io/javascript-map-vs-foreach-f38111822c0f

[[↑] 回到顶部](#js-问题)

### 匿名函数的典型应用场景是什么？

匿名函数可以在 IIFE 中使用，来封装局部作用域内的代码，以便其声明的变量不会暴露到全局作用域。

```js
(function() {
  // 一些代码。
})();
```

匿名函数可以作为只用一次，不需要在其他地方使用的回调函数。当处理函数在调用它们的程序内部被定义时，代码具有更好地自闭性和可读性，可以省去寻找该处理函数的函数体位置的麻烦。

```js
setTimeout(function() {
  console.log('Hello world!');
}, 1000);
```

匿名函数可以用于函数式编程或 Lodash（类似于回调函数）。

```js
const arr = [1, 2, 3];
const double = arr.map(function(el) {
  return el * 2;
});
console.log(double); // [2, 4, 6]
```

###### 参考

* https://www.quora.com/What-is-a-typical-usecase-for-anonymous-functions
* https://stackoverflow.com/questions/10273185/what-are-the-benefits-to-using-anonymous-functions-instead-of-named-functions-fo

[[↑] 回到顶部](#js-问题)

### 你如何组织自己的代码？（使用模块模式（module pattern）还是经典继承（classical inheritance）？）

我以前使用 Backbone 组织我的模型（model），Backbone 鼓励采用面向对象的方法——创建 Backbone 模型，并为其添加方法。

模块模式仍然是很好的方式，但是现在我使用基于 React/Redux 的 Flux 体系结构，它鼓励使用单向函数编程的方法。我用普通对象（plain object）表示我的 app 模型，编写实用纯函数去操作这些对象。使用动作（actions）和化简器（reducers）来处理状态，就像其他 Redux 应用一样。

我尽可能避免使用经典继承。如果非要这么做，我会坚持[这些原则](https://medium.com/@dan_abramov/how-to-use-classes-and-sleep-at-night-9af8de78ccb4)。

[[↑] 回到顶部](#js-问题)

### 宿主对象（host objects）和原生对象（native objects）的区别是什么？

原生对象是由 ECMAScript 规范定义的 JavaScript 内置对象，比如`String`、`Math`、`RegExp`、`Object`、`Function`等等。

宿主对象是由运行时环境（浏览器或 Node）提供，比如`window`、`XMLHTTPRequest`等等。

###### 参考

* https://stackoverflow.com/questions/7614317/what-is-the-difference-between-native-objects-and-host-objects

[[↑] 回到顶部](#js-问题)

### 下列语句有什么区别：`function Person(){}`、`var person = Person()`和`var person = new Person()`？

这个问题问得很含糊。我猜这是在考察 JavaScript 中的构造函数（constructor）。从技术上讲，`function Person(){}`只是一个普通的函数声明。使用 PascalCase 方式命名函数作为构造函数，是一个惯例。

`var person = Person()`将`Person`以普通函数调用，而不是构造函数。如果该函数是用作构造函数的，那么这种调用方式是一种常见错误。通常情况下，构造函数不会返回任何东西，因此，像普通函数一样调用构造函数，只会返回`undefined`赋给用作实例的变量。

`var person = new Person()`使用`new`操作符，创建`Person`对象的实例，该实例继承自`Person.prototype`。另外一种方式是使用`Object.create`，例如：Object.create(Person.prototype)`。

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

###### 参考

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new

[[↑] 回到顶部](#js-问题)

### `.call`和`.apply`有什么区别？

`.call`和`.apply`都用于调用函数，第一个参数将用作函数内 this 的值。然而，`.call`接受逗号分隔的参数作为后面的参数，而`.apply`接受一个参数数组作为后面的参数。一个简单的记忆方法是，从`call`中的 C 联想到逗号分隔（comma-separated），从`apply`中的 A 联想到数组（array）。

```js
function add(a, b) {
  return a + b;
}

console.log(add.call(null, 1, 2)); // 3
console.log(add.apply(null, [1, 2])); // 3
```

[[↑] 回到顶部](#js-问题)

### 请说明`Function.prototype.bind`的用法。

摘自[MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind)：

> `bind()`方法创建一个新的函数, 当被调用时，将其 this 关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。

根据我的经验，将`this`的值绑定到想要传递给其他函数的类的方法中是非常有用的。在 React 组件中经常这样做。

###### 参考

* https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind

[[↑] 回到顶部](#js-问题)

### 什么时候会用到`document.write()`？

`document.write()`用来将一串文本写入由`document.open()`打开的文档流中。当页面加载后执行`document.write()`时，它将调用`document.open`，会清除整个文档（`<head>`和`<body>`会被移除！），并将文档内容替换成给定的字符串参数。因此它通常被认为是危险的并且容易被误用。

网上有一些答案，解释了`document.write()`被用于分析代码中，或者[当你想包含只有在启用了 JavaScript 的情况下才能工作的样式](https://www.quirksmode.org/blog/archives/2005/06/three_javascrip_1.html)。它甚至在 HTML5 样板代码中用于[并行加载脚本并保持执行顺序](https://github.com/paulirish/html5-boilerplate/wiki/Script-Loading-Techniques#documentwrite-script-tag)！但是，我怀疑这些使用原因是过时的，现在可以在不使用`document.write()`的情况下实现。如果我的观点有错，请纠正我。

###### 参考

* https://www.quirksmode.org/blog/archives/2005/06/three_javascrip_1.html
* https://github.com/h5bp/html5-boilerplate/wiki/Script-Loading-Techniques#documentwrite-script-tag

[[↑] 回到顶部](#js-问题)

### 功能检测（feature detection）、功能推断（feature inference）和使用 UA 字符串之间有什么区别？

**功能检测（feature detection）**

功能检测包括确定浏览器是否支持某段代码，以及是否运行不同的代码（取决于它是否执行），以便浏览器始终能够正常运行代码功能，而不会在某些浏览器中出现崩溃和错误。例如：

```js
if ('geolocation' in navigator) {
  // 可以使用 navigator.geolocation
} else {
  // 处理 navigator.geolocation 功能缺失
}
```

[Modernizr](https://modernizr.com/)是处理功能检测的优秀工具。

**功能推断（feature inference）**

功能推断与功能检测一样，会对功能可用性进行检查，但是在判断通过后，还会使用其他功能，因为它假设其他功能也可用，例如：

```js
if (document.getElementsByTagName) {
  element = document.getElementById(id);
}
```

非常不推荐这种方式。功能检测更能保证万无一失。

**UA 字符串**

这是一个浏览器报告的字符串，它允许网络协议对等方（network protocol peers）识别请求用户代理的应用类型、操作系统、应用供应商和应用版本。它可以通过`navigator.userAgent`访问。 然而，这个字符串很难解析并且很可能存在欺骗性。例如，Chrome 会同时作为 Chrome 和 Safari 进行报告。因此，要检测 Safari，除了检查 Safari 字符串，还要检查是否存在 Chrome 字符串。不要使用这种方式。

###### 参考

* https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection
* https://stackoverflow.com/questions/20104930/whats-the-difference-between-feature-detection-feature-inference-and-using-th
* https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent

[[↑] 回到顶部](#js-问题)

### 请尽可能详细地解释 Ajax。

Ajax（asynchronous JavaScript and XML）是使用客户端上的许多 Web 技术，创建异步 Web 应用的一种 Web 开发技术。借助 Ajax，Web 应用可以异步（在后台）向服务器发送数据和从服务器检索数据，而不会干扰现有页面的显示和行为。通过将数据交换层与表示层分离，Ajax 允许网页和扩展 Web 应用程序动态更改内容，而无需重新加载整个页面。实际上，现在通常将 XML 替换为 JSON，因为 JavaScript 对 JSON 有原生支持优势。

`XMLHttpRequest` API 经常用于异步通信。此外还有最近流行的`fetch` API。

###### 参考

* https://en.wikipedia.org/wiki/Ajax_(programming)
* https://developer.mozilla.org/en-US/docs/AJAX

[[↑] 回到顶部](#js-问题)

### 使用 Ajax 的优缺点分别是什么？

**优点**

* 交互性更好。来自服务器的新内容可以动态更改，无需重新加载整个页面。
* 减少与服务器的连接，因为脚本和样式只需要被请求一次。
* 状态可以维护在一个页面上。JavaScript 变量和 DOM 状态将得到保持，因为主容器页面未被重新加载。
* 基本上包括大部分 SPA 的优点。

**缺点**

* 动态网页很难收藏。
* 如果 JavaScript 已在浏览器中被禁用，则不起作用。
* 有些网络爬虫不执行 JavaScript，也不会看到 JavaScript 加载的内容。
* 基本上包括大部分 SPA 的缺点。

[[↑] 回到顶部](#js-问题)

### 请说明 JSONP 的工作原理，它为什么不是真正的 Ajax？

JSONP（带填充的 JSON）是一种通常用于绕过 Web 浏览器中的跨域限制的方法，因为 Ajax 不允许跨域请求。

JSONP 通过`<script>`标签发送跨域请求，通常使用`callback`查询参数，例如：`https://example.com?callback=printData`。 然后服务器将数据包装在一个名为`printData`的函数中并将其返回给客户端。

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
// 文件加载自 https://example.com?callback=printData
printData({ name: 'Yang Shun' });
```

客户端必须在其全局范围内具有`printData`函数，并且在收到来自跨域的响应时，该函数将由客户端执行。

JSONP 可能具有一些安全隐患。由于 JSONP 是纯 JavaScript 实现，它可以完成 JavaScript 所能做的一切，因此需要信任 JSONP 数据的提供者。

现如今，[跨来源资源共享（CORS）](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) 是推荐的主流方式，JSONP 已被视为一种比较 hack 的方式。

###### 参考

* https://stackoverflow.com/a/2067584/1751946

[[↑] 回到顶部](#js-问题)

### 你使用过 JavaScript 模板吗？用过什么相关的库？

使用过。Handlebars、Underscore、Lodash、AngularJS 和 JSX。我不喜欢 AngularJS 中的模板，因为它在指令中大量使用了字符串，并且书写错误会被忽略。JSX 是我的新宠，因为它更接近 JavaScript，几乎没有什么学习成本。现在，可以使用 ES2015 模板字符串快速创建模板，而不需依赖第三方代码。

```js
const template = `<div>My name is: ${name}</div>`;
```

但是，请注意上述方法中可能存在的 XSS，因为内容不会被转义，与模板库不同。

[[↑] 回到顶部](#js-问题)

### 请解释变量提升（hoisting）。

变量提升（hoisting）是用于解释代码中变量声明行为的术语。使用`var`关键字声明或初始化的变量，会将声明语句“提升”到当前作用域的顶部。 但是，只有声明才会触发提升，赋值语句（如果有的话）将保持原样。我们用几个例子来解释一下。

```js
// 用 var 声明得到提升
console.log(foo); // undefined
var foo = 1;
console.log(foo); // 1

// 用 let/const 声明不会提升
console.log(bar); // ReferenceError: bar is not defined
let bar = 2;
console.log(bar); // 2
```

函数声明会使函数体提升，但函数表达式（以声明变量的形式书写）只有变量声明会被提升。

```js
// 函数声明
console.log(foo); // [Function: foo]
foo(); // 'FOOOOO'
function foo() {
  console.log('FOOOOO');
}
console.log(foo); // [Function: foo]

// 函数表达式
console.log(bar); // undefined
bar(); // Uncaught TypeError: bar is not a function
var bar = function() {
  console.log('BARRRR');
};
console.log(bar); // [Function: bar]
```

[[↑] 回到顶部](#js-问题)

### 请描述事件冒泡。

当一个事件在 DOM 元素上触发时，如果有事件监听器，它将尝试处理该事件，然后事件冒泡到其父级元素，并发生同样的事情。最后直到事件到达祖先元素。事件冒泡是实现事件委托的原理（event delegation）。

[[↑] 回到顶部](#js-问题)

### “attribute” 和 “property” 之间有什么区别？

“Attribute” 是在 HTML 中定义的，而 “property” 是在 DOM 上定义的。为了说明区别，假设我们在 HTML 中有一个文本框：`<input type="text" value="Hello">`。

```js
const input = document.querySelector('input');
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello
```

但是在文本框中键入“ World!”后:

```js
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello World!
```

###### 参考

* https://stackoverflow.com/questions/6003819/properties-and-attributes-in-html

[[↑] 回到顶部](#js-问题)

### 为什么扩展 JavaScript 内置对象是不好的做法？

扩展 JavaScript 内置（原生）对象意味着将属性或方法添加到其`prototype`中。虽然听起来很不错，但事实上这样做很危险。想象一下，你的代码使用了一些库，它们通过添加相同的 contains 方法来扩展`Array.prototype`，如果这两个方法的行为不相同，那么这些实现将会相互覆盖，你的代码将不能正常运行。

扩展内置对象的唯一使用场景是创建 polyfill，本质上为老版本浏览器缺失的方法提供自己的实现，该方法是由 JavaScript 规范定义的。

###### 参考

* http://lucybain.com/blog/2014/js-extending-built-in-objects/

[[↑] 回到顶部](#js-问题)

### document 中的`load`事件和`DOMContentLoaded`事件之间的区别是什么？

当初始的 HTML 文档被完全加载和解析完成之后，`DOMContentLoaded`事件被触发，而无需等待样式表、图像和子框架的完成加载。

`window`的`load`事件仅在 DOM 和所有相关资源全部完成加载后才会触发。

###### 参考

* https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
* https://developer.mozilla.org/en-US/docs/Web/Events/load

[[↑] 回到顶部](#js-问题)

### `==`和`===`的区别是什么？

`==`是抽象相等运算符，而`===`是严格相等运算符。`==`运算符是在进行必要的类型转换后，再比较。`===`运算符不会进行类型转换，所以如果两个值不是相同的类型，会直接返回`false`。使用`==`时，可能发生一些特别的事情，例如：

```js
1 == '1'; // true
1 == [1]; // true
1 == true; // true
0 == ''; // true
0 == '0'; // true
0 == false; // true
```

我的建议是从不使用`==`运算符，除了方便与`null`或`undefined`比较时，`a == null`如果`a`为`null`或`undefined`将返回`true`。

```js
var a = null;
console.log(a == null); // true
console.log(a == undefined); // true
```

###### 参考

* https://stackoverflow.com/questions/359494/which-equals-operator-vs-should-be-used-in-javascript-comparisons

[[↑] 回到顶部](#js-问题)

### 请解释关于 JavaScript 的同源策略。

同源策略可防止 JavaScript 发起跨域请求。源被定义为 URI、主机名和端口号的组合。此策略可防止页面上的恶意脚本通过该页面的文档对象模型，访问另一个网页上的敏感数据。

###### 参考

* https://en.wikipedia.org/wiki/Same-origin_policy

[[↑] 回到顶部](#js-问题)

### 请使下面的语句生效：

```js
duplicate([1, 2, 3, 4, 5]); // [1,2,3,4,5,1,2,3,4,5]
```

```js
function duplicate(arr) {
  return arr.concat(arr);
}

duplicate([1, 2, 3, 4, 5]); // [1,2,3,4,5,1,2,3,4,5]
```

[[↑] 回到顶部](#js-问题)

### 请说明三元表达式中“三元”这个词代表什么？

“三元”表示接受三个操作数：判断条件，`then`表达式和`else`表达式。三元表达式不是 JavaScript 特有的，我不知道这个问题为什么会出现在这里。

###### 参考

* https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

[[↑] 回到顶部](#js-问题)

### 什么是`"use strict";`？使用它有什么优缺点？

'use strict' 是用于对整个脚本或单个函数启用严格模式的语句。严格模式是可选择的一个限制 JavaScript 的变体一种方式 。

**优点：**

* 无法再意外创建全局变量。
* 会使引起静默失败（silently fail，即：不报错也没有任何效果）的赋值操抛出异常。
* 试图删除不可删除的属性时会抛出异常（之前这种操作不会产生任何效果）。
* 要求函数的参数名唯一。
* 全局作用域下，`this`的值为`undefined`。
* 捕获了一些常见的编码错误，并抛出异常。
* 禁用令人困惑或欠佳的功能。

**缺点：**

* 缺失许多开发人员已经习惯的功能。
* 无法访问`function.caller`和`function.arguments`。
* 以不同严格模式编写的脚本合并后可能导致问题。

总的来说，我认为利大于弊，我从来不使用严格模式禁用的功能，因此我推荐使用严格模式。

###### 参考

* http://2ality.com/2011/10/strict-mode-hatred.html
* http://lucybain.com/blog/2014/js-use-strict/

[[↑] 回到顶部](#js-问题)

### 创建一个循环，从 1 迭代到 100，`3`的倍数时输出 "fizz"，`5`的倍数时输出 "buzz"，同时为`3`和`5`的倍数时输出 "fizzbuzz"。

来自 [Paul Irish](https://gist.github.com/jaysonrowe/1592432#gistcomment-790724)的 FizzBuzz。

```js
for (let i = 1; i <= 100; i++) {
  let f = i % 3 == 0,
    b = i % 5 == 0;
  console.log(f ? (b ? 'FizzBuzz' : 'Fizz') : b ? 'Buzz' : i);
}
```

我不建议你在面试时写上面的代码。只要写得清晰即可。关于更多千奇百怪的 FizzBuzz 实现，请查看下面的参考链接。

###### 参考

* https://gist.github.com/jaysonrowe/1592432

[[↑] 回到顶部](#js-问题)

### 为什么不要使用全局作用域？

每个脚本都可以访问全局作用域，如果人人都使用全局命名空间来定义自己的变量，肯定会发生冲突。使用模块模式（IIFE）将变量封装在本地命名空间中。

[[↑] 回到顶部](#js-问题)

### 为什么要使用`load`事件？这个事件有什么缺点吗？你知道一些代替方案吗，为什么使用它们？

在文档装载完成后会触发`load`事件。此时，在文档中的所有对象都在 DOM 中，所有图像、脚本、链接和子框架都完成了加载。

DOM 事件`DOMContentLoaded`将在页面的 DOM 构建完成后触发，但不要等待其他资源完成加载。如果在初始化之前不需要装入整个页面，这个事件是使用首选。

TODO.

###### 参考

* https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload

[[↑] 回到顶部](#js-问题)

### 请解释单页应用是什么，如何使其对 SEO 友好。

以下摘自 [Grab Front End Guide](https://github.com/grab/front-end-guide)，碰巧的是，这正是我自己写的！

现如今，Web 开发人员将他们构建的产品称为 Web 应用，而不是网站。虽然这两个术语之间没有严格的区别，但网络应用往往具有高度的交互性和动态性，允许用户执行操作并接收他们的操作响应。在过去，浏览器从服务器接收 HTML 并渲染。当用户导航到其它 URL 时，需要整页刷新，服务器会为新页面发送新的 HTML。这被称为服务器端渲染。

然而，在现代的 SPA 中，客户端渲染取而代之。浏览器从服务器加载初始页面、整个应用程序所需的脚本（框架、库、应用代码）和样式表。当用户导航到其他页面时，不会触发页面刷新。该页面的 URL 通过 [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) 进行更新。浏览器通过 [AJAX](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started) 请求向服务器检索新页面所需的数据（通常采用 JSON 格式）。然后，SPA 通过 JavaScript 来动态更新页面，这些 JavaScript 在初始页面加载时已经下载。这种模式类似于原生移动应用的工作方式。

**好处：**

* 用户感知响应更快，用户切换页面时，不再看到因页面刷新而导致的白屏。
* 对服务器进行的 HTTP 请求减少，因为对于每个页面加载，不必再次下载相同的资源。
* 客户端和服务器之间的关注点分离。可以为不同平台（例如手机、聊天机器人、智能手表）建立新的客户端，而无需修改服务器代码。只要 API 没有修改，可以单独修改客户端和服务器上的代码。

**坏处：**

* 由于加载了多个页面所需的框架、应用代码和资源，导致初始页面加载时间较长。
* 服务器还需要进行额外的工作，需要将所有请求路由配置到单个入口点，然后由客户端接管路由。
* SPA 依赖于 JavaScript 来呈现内容，但并非所有搜索引擎都在抓取过程中执行 JavaScript，他们可能会在你的页面上看到空的内容。这无意中损害了应用的搜索引擎优化（SEO）。然而，当你构建应用时，大多数情况下，搜索引擎优化并不是最重要的因素，因为并非所有内容都需要通过搜索引擎进行索引。为了解决这个问题，可以在服务器端渲染你的应用，或者使用诸如 [Prerender](https://prerender.io/) 的服务来“在浏览器中呈现你的 javascript，保存静态 HTML，并将其返回给爬虫”。

###### 参考

* https://github.com/grab/front-end-guide#single-page-apps-spas
* http://stackoverflow.com/questions/21862054/single-page-app-advantages-and-disadvantages
* http://blog.isquaredsoftware.com/presentations/2016-10-revolution-of-web-dev/
* https://medium.freecodecamp.com/heres-why-client-side-rendering-won-46a349fadb52

[[↑] 回到顶部](#js-问题)

### 你对 Promises 及其 polyfill 的掌握程度如何？

掌握它的工作原理。`Promise`是一个可能在未来某个时间产生结果的对象：操作成功的结果或失败的原因（例如发生网络错误）。 `Promise`可能处于以下三种状态之一：fulfilled、rejected 或 pending。 用户可以对`Promise`添加回调函数来处理操作成功的结果或失败的原因。

一些常见的 polyfill 是`$.deferred`、Q 和 Bluebird，但不是所有的 polyfill 都符合规范。ES2015 支持 Promises，现在通常不需要使用 polyfills。

###### 参考

* https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261

[[↑] 回到顶部](#js-问题)

### `Promise`代替回调函数有什么优缺点？

**优点：**

* 避免可读性极差的回调地狱。
* 使用`.then()`编写的顺序异步代码，既简单又易读。
* 使用`Promise.all()`编写并行异步代码变得很容易。

**缺点：**

* 轻微地增加了代码的复杂度（这点存在争议）。
* 在不支持 ES2015 的旧版浏览器中，需要引入 polyfill 才能使用。

[[↑] 回到顶部](#js-问题)

### 用转译成 JavaScript 的语言写 JavaScript 有什么优缺点？

Some examples of languages that compile to JavaScript include CoffeeScript, Elm, ClojureScript, PureScript and TypeScript.
这些是转译成 JavaScript 的语言，包括 CoffeeScript、Elm、ClojureScript、PureScript 和 TypeScript。

**优点：**

* 修复了 JavaScript 中的一些长期问题，并摒弃了 JavaScript 不好的做法。
* 在 JavaScript 的基础上提供一些语法糖，使我们能够编写更短的代码，我认为 ES5 缺乏语法糖的支持，但 ES2015 非常好。
* 对于需要长时间维护的大型项目，静态类型非常好用（针对 TypeScript）。

**缺点：**

* 由于浏览器只运行 JavaScript，所以需要构建、编译过程，在将代码提供给浏览器之前，需要将代码转译为 JavaScript。
* 如果 source map 不能很好地映射到预编译的源代码，调试会很痛苦。
* 大多数开发人员不熟悉这些语言，需要学习它。如果将其用于项目，会增加团队成本。
* 社区比较小（取决于语言），这意味着资源、教程、图书和工具难以找到。
* 可能缺乏 IDE（编辑器）的支持。
* 这些语言将始终落后于最新的 JavaScript 标准。
* 开发人员应该清楚代码正在被编译到什么地方——因为这是实际运行的内容，是最重要的。

实际上，ES2015 已经大大改进了 JavaScript，编写体验很好。我现在还没有真正看到对 CoffeeScript 的需求。

###### 参考

* https://softwareengineering.stackexchange.com/questions/72569/what-are-the-pros-and-cons-of-coffeescript

[[↑] 回到顶部](#js-问题)

### 你使用什么工具和技巧调试 JavaScript 代码？

* React 和 Redux
  * [React Devtools](https://github.com/facebook/react-devtools)
  * [Redux Devtools](https://github.com/gaearon/redux-devtools)
* Vue
  * [Vue Devtools](https://github.com/vuejs/vue-devtools)
* JavaScript
  * [Chrome Devtools](https://hackernoon.com/twelve-fancy-chrome-devtools-tips-dc1e39d10d9d)
  * `debugger`声明
  * 使用万金油`console.log`进行调试

###### 参考

* https://hackernoon.com/twelve-fancy-chrome-devtools-tips-dc1e39d10d9d
* https://raygun.com/blog/javascript-debugging/

[[↑] 回到顶部](#js-问题)

### 你使用什么语句遍历对象的属性和数组的元素？

**对象：**

* `for`循环：`for (var property in obj) { console.log(property); }`。但是，这还会遍历到它的继承属性，在使用之前，你需要加入`obj.hasOwnProperty(property)`检查。
* `Object.keys()`：`Object.keys(obj).forEach(function (property) { ... })`。`Object.keys()`方法会返回一个由一个给定对象的自身可枚举属性组成的数组。
* `Object.getOwnPropertyNames()`：`Object.getOwnPropertyNames(obj).forEach(function (property) { ... })`。`Object.getOwnPropertyNames()`方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组。

**数组：**

* `for` loops：`for (var i = 0; i < arr.length; i++)`。这里的常见错误是`var`是函数作用域而不是块级作用域，大多数时候你想要迭代变量在块级作用域中。ES2015 引入了具有块级作用域的`let`，建议使用它。所以就变成了：`for (let i = 0; i < arr.length; i++)`。
* `forEach`：`arr.forEach(function (el, index) { ... })`。这个语句结构有时会更精简，因为如果你所需要的只是数组元素，你不必使用`index`。还有`every`和`some`方法可以让你提前终止遍历。

大多数情况下，我更喜欢`.forEach`方法，但这取决于你想要做什么。`for`循环有更强的灵活性，比如使用`break`提前终止循环，或者递增步数大于一。

[[↑] 回到顶部](#js-问题)

### 请解释可变对象和不可变对象之间的区别。

* 什么是 JavaScript 中的不可变对象的例子？
* 不变性有什么优点和缺点？
* 你如何在自己的代码中实现不变性？

**_可变对象_** 在创建之后是可以被改变的。

**_不可变对象_** 在创建之后是不可以被改变的。

1. 在 `JavaScript` 中，`string` 和 `number` 从设计之初就是不可变(Immutable)。
2. **_不可变_** 其实是保持一个对象状态不变，这样做的好处是使得开发更加简单，可回溯，测试友好，减少了任何可能的副作用。但是，每当你想添加点东西到一个不可变(Immutable)对象里时，它一定是先拷贝已存在的值到新实例里，然后再给新实例添加内容，最后返回新实例。相比可变对象，这势必会有更多内存、计算量消耗。
3. 比如：构造一个纯函数

```js
const student1 = {
  school: 'Baidu',
  name: 'HOU Ce',
  birthdate: '1995-12-15',
};

const changeStudent = (student, newName, newBday) => {
  return {
    ...student, // 使用解构
    name: newName, // 覆盖name属性
    birthdate: newBday, // 覆盖birthdate属性
  };
};

const student2 = changeStudent(student1, 'YAN Haijing', '1990-11-10');

// both students will have the name properties
console.log(student1, student2);
// Object {school: "Baidu", name: "HOU Ce", birthdate: "1995-12-15"}
// Object {school: "Baidu", name: "YAN Haijing", birthdate: "1990-11-10"}
```

###### 参考

* https://juejin.im/post/58d0ff6f1b69e6006b8fd4e9
* https://www.interviewcake.com/concept/java/mutable
* https://www.sitepoint.com/immutability-javascript/

[[↑] 回到顶部](#js-问题)

### 请解释同步和异步函数之间的区别。

同步函数阻塞，而异步函数不阻塞。在同步函数中，语句完成后，下一句才执行。在这种情况下，程序可以按照语句的顺序进行精确评估，如果其中一个语句需要很长时间，程序的执行会停滞很长时间。

异步函数通常接受回调作为参数，在调用异步函数后立即继续执行下一行。回调函数仅在异步操作完成且调用堆栈为空时调用。诸如从 Web 服务器加载数据或查询数据库等重负载操作应该异步完成，以便主线程可以继续执行其他操作，而不会出现一直阻塞，直到费时操作完成的情况（在浏览器中，界面会卡住）。

[[↑] 回到顶部](#js-问题)

### 什么是事件循环？调用堆栈和任务队列之间有什么区别？

事件循环是一个单线程循环，用于监视调用堆栈并检查是否有工作即将在任务队列中完成。如果调用堆栈为空并且任务队列中有回调函数，则将回调函数出队并推送到调用堆栈中执行。

如果你没有看过 Philip Robert [关于事件循环的演讲](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html)，你应该看一下。这是观看次数最多的 JavaScript 相关视频之一。

###### 参考

* https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html
* http://theproactiveprogrammer.com/javascript/the-javascript-event-loop-a-stack-and-a-queue/

[[↑] 回到顶部](#js-问题)

### 请解释`function foo() {}`和`var foo = function() {}`之间`foo`的用法上的区别。

前者是函数声明，后者是函数表达式。关键的区别在于函数声明会使函数体提升（具有与变量相同的提升行为），但函数表达式的函数体不能。有关变量提升的更多解释，请参阅上面关于变量提升的问题。如果你试图在定义函数表达式之前调用它，你会得到一个`Uncaught TypeError: XXX is not a function`的错误。

**函数声明**

```js
foo(); // 'FOOOOO'
function foo() {
  console.log('FOOOOO');
}
```

**函数表达式**

```js
foo(); // Uncaught TypeError: foo is not a function
var foo = function() {
  console.log('FOOOOO');
};
```

###### 参考

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function

[[↑] 回到顶部](#js-问题)

### 使用`let`、`var`和`const`创建变量有什么区别？

用`var`声明的变量的作用域是它当前的执行上下文，它可以是嵌套的函数，也可以是声明在任何函数外的变量。`let`和`const`是块级作用域，意味着它们只能在最近的一组花括号（function、if-else 代码块或 for 循环中）中访问。

```js
function foo() {
  // 所有变量在函数中都可访问
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

// 用 var 声明的变量在函数作用域上都可访问
console.log(bar); // bar
// let 和 const 定义的变量在它们被定义的语句块之外不可访问
console.log(baz); // ReferenceError: baz is not defined
console.log(qux); // ReferenceError: qux is not defined
```

`var`会使变量提升，这意味着变量可以在声明之前使用。`let`和`const`不会使变量提升，提前使用会报错。

```js
console.log(foo); // undefined

var foo = 'foo';

console.log(baz); // ReferenceError: can't access lexical declaration 'baz' before initialization

let baz = 'baz';

console.log(bar); // ReferenceError: can't access lexical declaration 'bar' before initialization

const bar = 'bar';
```

用`var`重复声明不会报错，但`let`和`const`会。

```js
var foo = 'foo';
var foo = 'bar';
console.log(foo); // "bar"

let baz = 'baz';
let baz = 'qux'; // Uncaught SyntaxError: Identifier 'baz' has already been declared
```

`let`和`const`的区别在于：`let`允许多次赋值，而`const`只允许一次。

```js
// 这样不会报错。
let foo = 'foo';
foo = 'bar';

// 这样会报错。
const baz = 'baz';
baz = 'qux';
```

###### 参考

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const

[[↑] 回到顶部](#js-问题)

### ES6 的类和 ES5 的构造函数有什么区别？

TODO

[[↑] 回到顶部](#js-问题)

### 你能给出一个使用箭头函数的例子吗，箭头函数与其他函数有什么不同？

TODO

[[↑] 回到顶部](#js-问题)

### 在构造函数中使用箭头函数有什么好处？

TODO

[[↑] 回到顶部](#js-问题)

### 高阶函数（higher-order）的定义是什么？

高阶函数是将一个或多个函数作为参数的函数，它用于数据处理，也可能将函数作为返回结果。高阶函数是为了抽象一些重复执行的操作。一个典型的例子是`map`，它将一个数组和一个函数作为参数。`map`使用这个函数来转换数组中的每个元素，并返回一个包含转换后元素的新数组。JavaScript 中的其他常见示例是`forEach`、`filter`和`reduce`。高阶函数不仅需要操作数组的时候会用到，还有许多函数返回新函数的用例。`Function.prototype.bind`就是一个例子。

**Map 示例：**

假设我们有一个由名字组成的数组，我们需要将每个字符转换为大写字母。

```js
const names = ['irish', 'daisy', 'anna'];
```

不使用高阶函数的方法是这样：

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

使用`.map(transformerFn)`使代码更简明

```js
const transformNamesToUppercase = function(names) {
  return names.map(name => name.toUpperCase());
};
transformNamesToUppercase(names); // ['IRISH', 'DAISY', 'ANNA']
```

###### 参考

* https://medium.com/javascript-scene/higher-order-functions-composing-software-5365cf2cbe99
* https://hackernoon.com/effective-functional-javascript-first-class-and-higher-order-functions-713fde8df50a
* https://eloquentjavascript.net/05_higher_order.html

[[↑] 回到顶部](#js-问题)

### 请给出一个解构（destructuring）对象或数组的例子。

解构是 ES6 中新功能，它提供了一种简洁方便的方法来提取对象或数组的值，并将它们放入不同的变量中。

**数组解构**

```js
// 变量赋值
const foo = ['one', 'two', 'three'];

const [one, two, three] = foo;
console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "three"
```

```js
// 变量交换
let a = 1;
let b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1
```

**对象解构**

```js
// 变量赋值
const o = { p: 42, q: true };
const { p, q } = o;

console.log(p); // 42
console.log(q); // true
```

###### 参考

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
* https://ponyfoo.com/articles/es6-destructuring-in-depth

[[↑] 回到顶部](#js-问题)

### ES6 的模板字符串为生成字符串提供了很大的灵活性，你可以举个例子吗？

**_模板字面量_**（Template literals） 是允许嵌入表达式的字符串字面量。你可以使用多行字符串和字符串插值功能。

**语法**

```js
`string text``string text line 1
 string text line 2``string text ${expression} string text`;

tag`string text ${expression} string text`;
```

**示例**

```js
console.log(`string text line 1
string text line 2`);
// "string text line 1
// string text line 2"

var a = 5;
var b = 10;
console.log(`Fifteen is ${a + b} and\nnot ${2 * a + b}.`);
// "Fifteen is 15 and
// not 20."
```

```js
//show函数采用rest参数的写法如下：

let name = '张三',
  age = 20,
  message = show`我来给大家介绍:${name}的年龄是${age}.`;

function show(stringArr, ...values) {
  let output = '';

  let index = 0;

  for (; index < values.length; index++) {
    output += stringArr[index] + values[index];
  }

  output += stringArr[index];

  return output;
}

message; //"我来给大家介绍:张三的年龄是20."
```

###### 参考

* https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings

[[↑] 回到顶部](#js-问题)

### 你能举出一个柯里化函数（curry function）的例子吗？它有哪些好处？

柯里化（currying）是一种模式，其中具有多个参数的函数被分解为多个函数，当被串联调用时，将一次一个地累积所有需要的参数。这种技术帮助编写函数式风格的代码，使代码更易读、紧凑。值得注意的是，对于需要被 curry 的函数，它需要从一个函数开始，然后分解成一系列函数，每个函数都需要一个参数。

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

###### 参考

* https://hackernoon.com/currying-in-js-d9ddc64f162e

[[↑] 回到顶部](#js-问题)

### 使用扩展运算符（spread）的好处是什么，它与使用剩余参数语句（rest）有什么区别？

在函数泛型编码时，ES6 的扩展运算符非常有用，因为我们可以轻松创建数组和对象的拷贝，而无需使用`Object.create`、`slice`或其他函数库。这个语言特性在 Redux 和 rx.js 的项目中经常用到。

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

ES6 的剩余参数语句提供了一个简写，允许我们将不定数量的参数表示为一个数组。它就像是扩展运算符语法的反面，将数据收集到数组中，而不是解构数组。剩余参数语句在函数参数、数组和对象的解构赋值中有很大作用。

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

###### 参考

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

[[↑] 回到顶部](#js-问题)

### 如何在文件之间共用代码？

这取决于执行 JavaScript 的环境。

在客户端（浏览器环境）上，只要变量或函数在全局作用域（`window`）中声明，所有脚本都可以引用它们。或者，通过 RequireJS 采用异步模块定义（AMD）以获得更多模块化方法。

在服务器（Node.js）上，常用的方法是使用 CommonJS。每个文件都被视为一个模块，可以通过将它们附加到`module.exports`对象来导出变量和函数。

ES2015 定义了一个模块语法，旨在替换 AMD 和 CommonJS。 这最终将在浏览器和 Node 环境中得到支持。

[[↑] 回到顶部](#js-问题)

###### 参考

* http://requirejs.org/docs/whyamd.html
* https://nodejs.org/docs/latest/api/modules.html
* http://2ality.com/2014/09/es6-modules-final.html

### 什么情况下会用到静态类成员？

静态类成员（属性或方法）不绑定到某个类的特定实例，不管哪个实例引用它，都具有相同的值。静态属性通常是配置变量，而静态方法通常是纯粹的实用函数，不依赖于实例的状态。

###### 参考

* https://stackoverflow.com/questions/21155438/when-to-use-static-variables-methods-and-when-to-use-instance-variables-methods

[[↑] 回到顶部](#js-问题)

### 其他答案

* http://flowerszhong.github.io/2013/11/20/javascript-questions.html

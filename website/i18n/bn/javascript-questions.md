---
title: ফ্রন্টএন্ড ডেভেলপার এর জন্য JavaScript প্রশ্ন
---

উত্তরসমূহ [ফ্রন্টএন্ড জব ইন্টারভিউ প্রশ্ন - JS প্রশ্নসূমুহ](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/src/questions/javascript-questions.md)। পরামর্শ এবং পুল-রিকোয়েস্ট এর মাধ্যমে সংশোধনের করুন!

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

### ইভেন্ট ডেলিগেশন ব্যাখ্যা করুন

ইভেন্ট ডেলিগেশন হল এমন একটি কৌশল যেখানে ইভেন্ট কে চাইল্ড এলিমেন্ট এর পরিবর্তে প্যারেন্ট এলিমেন্ট এ বসানো হয়। ডোম এর ইভেন্ট-বাবলিং বৈশিষ্টের কারণে যখনই চাইল্ড এ ইভেন্টটি ট্রিগার হবে তখনই ইভেন্টটি কল হবে। এই টেকনিক এর সুবিধাগুলি হলো :

- মেমরি ফুটপ্রিন্ট কমে যায় কারণ প্রতিটি চাইল্ড এ ইভেন্ট হ্যান্ডলার সংযুক্ত করার পরিবর্তে প্যারেন্ট এলিমেন্টে শুধুমাত্র একটি একক হ্যান্ডলার প্রয়োজন হয়।
- অপসারণ করা এলিমেন্ট থেকে হ্যান্ডলারকে আনবাইন্ড করার এবং নতুন উপাদানগুলির জন্য ইভেন্টটিকে বাইন্ড করার দরকার নেই।

###### রেফারেন্স

- https://davidwalsh.name/event-delegate
- https://stackoverflow.com/questions/1687296/what-is-dom-event-delegation

### JavaScript এ 'this' কীভাবে কাজ করে তা ব্যাখ্যা করুন

'this' এর কোন সহজ ব্যাখ্যা নেই; এটি জাভাস্ক্রিপ্টের সবচেয়ে বিভ্রান্তিকর ধারণাগুলির মধ্যে একটি। একটি ব্যাখ্যা হল যে 'this' এর মান কীভাবে ফাংশনটিকে কল করা হয় তার উপর নির্ভর করে। আমি অনলাইনে `this` নিয়ে অনেক ব্যাখ্যা পড়েছি এবং আমি [Arnav Aggrawal](https://medium.com/@arnav_aggarwal) এর ব্যাখ্যাটি সবচেয়ে পরিষ্কার বলে খুঁজে পেয়েছি। নিম্নলিখিত নিয়ম প্রয়োগ করা হয়েছে :

১. যদি 'new' কীওয়ার্ডটি ফাংশনটি কল করার সময় ব্যবহার করা হয়, তাহলে ফাংশনের ভিতরে `this` একটি নতুন অবজেক্ট। ২. যদি একটি ফাংশন কল/তৈরি করতে `apply`, `call` বা `bind` ব্যবহার করা হয়, তাহলে ফাংশনের ভিতরে `this` টি সেই অবজেক্ট যা আর্গুমেন্ট হিসেবে পাস করা হয়। ৩. যদি একটি ফাংশনকে একটি মেথড হিসাবে কল করা হয়, যেমন `obj.method()`——তাহলে `this` হবে সেই অবজেক্ট যেটির প্রপার্টি হবে ওই ফাংশন। ৪. যদি ফাংশনটি একটি ফাংশন ইনভোকেশন হিসাবে ব্যবহার করা হয়, অর্থাৎ এটি কোনো শর্ত ছাড়াই কল করা হয়, তাহলে 'this' হবে গ্লোবাল অবজেক্ট। এটি হলো ব্রাউজারে একটি `window` অবজেক্ট। যদি (`use strict`) মোডে থাকে, তাহলে `this` গ্লোবাল অবজেক্টের পরিবর্তে `undefined` হবে। ৫. উপরের নিয়মগুলির একাধিক প্রযোজ্য হলে, যে নিয়মটি উপরে, সেটি জয়ী হবে এবং সেটি `this` মান সেট করবে। ৬. যদি ফাংশনটি একটি ES2015 অ্যারো ফাংশন হয়, তবে এটি উপরের সমস্ত নিয়ম উপেক্ষা করে এবং এটি তৈরি করার সময় এটির আশেপাশের স্কোপ এর `this` মানটি গ্রহণ করে৷

গভীর ব্যাখ্যার জন্য, চেক করুন তার [Medium আর্টিকেল](https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3).

#### আপনি কি ES6 এ this দিয়ে কাজ করার নিয়ম পরিবর্তন হয়েছে এমন একটি উদাহরণ দিতে পারবেন?

ES6 এ [অ্যারো ফাঙ্কশন](http://2ality.com/2017/12/alternate-this.html#arrow-functions) আছে যেটি হলো [লেক্সিক্যাল স্কোপ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_separate_this)। এটি সাধারণত সুবিধাজনক কিন্তু কলারকে `.call` বা `.apply`-এর মাধ্যমে কনটেক্সট নিয়ন্ত্রণ করতে বাধা দেয়—যার পরিণতি হল যে `jQuery` এর মতো একটি লাইব্রেরি আপনার ইভেন্ট হ্যান্ডলার ফাংশনে `this` কে সঠিকভাবে bind করবে না। সুতরাং, বড় লিগ্যাসি অ্যাপ্লিকেশনগুলিকে রিফ্যাক্টর করার সময় এটি মাথায় রাখা গুরুত্বপূর্ণ৷

###### রেফারেন্স

- https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3
- https://stackoverflow.com/a/3127440/1751946

### প্রোটোটিপাল ইনহেরিটেন্স কিভাবে কাজ করে তা ব্যাখ্যা করুন

এটি একটি কমন JavaScript ইন্টারভিউ প্রশ্ন। সমস্ত JavaScript অবজেক্টের একটি `__proto__` প্রপার্টি আছে যা `Object.create(null)` দিয়ে তৈরি করা অবজেক্ট ছাড়া, এটি অন্য একটি অবজেক্টের রেফারেন্স, যেটিকে অবজেক্টের "প্রোটোটাইপ" বলা হয়। যখন কোনো অবজেক্ট এ কোনো প্রপার্টি অ্যাক্সেস করা হয় এবং যদি সেই অবজেক্ট এ প্রপার্টি টি পাওয়া না যায়, জাভাস্ক্রিপ্ট ইঞ্জিন অবজেক্টের `__proto__`, এবং `__proto__` এর `__proto__` দেখে, যতক্ষণ না এটি প্রপার্টি টি খুঁজে পায় বা যতক্ষণ না এটি প্রোটোটাইপ চেইনের শেষ পর্যন্ত পৌঁছায়। এটিকে ক্লাসিকাল ইনহেরিটেন্স ও বলা যাই। কিন্তু এটি আসলেই [ইনহেরিটেন্স থেকে ডেলিগেশন বেশি](https://davidwalsh.name/javascript-objects)।

#### প্রোটোটিপাল ইনহেরিটেন্স এর উদাহরণ

```js
function Parent() {
  this.name = 'Parent';
}

Parent.prototype.greet = function () {
  console.log('Hello from ' + this.name);
};

const child = Object.create(Parent.prototype);

child.cry = function () {
  console.log('waaaaaahhhh!');
};

child.cry();
// waaaaaahhhh!

child.greet();
// hello from Parent

child.constructor;
// ƒ Parent() {
//   this.name = 'Parent';
// }

child.constructor.name;
// 'Parent'
```

উল্লেখ্য বিষয়গুলি হলো:

- _child_- এ `.greet` ডিফাইন করা হয়নি, তাই js ইঞ্জিন প্রোটোটাইপ চেইনের উপরে যায় এবং _Parent_ থেকে ইনহেরিটেন্স এ পাওয়া `.greet` খুঁজে পায়।
- প্রোটোটাইপ মেথডগুলো ইনহেরিট করে পাওয়ার জন্য আমাদের নিম্নলিখিত পদ্ধতির মধ্যে যেইকোনো একভাবে `Object.create` কল করতে হবে:
- Object.create(Parent.prototype);
- Object.create(new Parent(null));
- Object.create(objLiteral);
- বর্তমানে, `child.constructor` `Parent`-এর দিকে নির্দেশ করছে:

আমরা যদি এটি সংশোধন করতে চাই তবে সেক্ষেত্রে:

```js
function Parent() {
  this.name = 'Parent';
}

Parent.prototype.greet = function () {
  console.log('Hello from ' + this.name);
};

function Child() {
  Parent.call(this);
  this.name = 'Child';
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

const child = new Child();

child.greet();
// hello from Child

child.constructor.name;
// 'Child'
```

###### রেফারেন্স

- http://dmitrysoshnikov.com/ecmascript/javascript-the-core/
- https://www.quora.com/What-is-prototypal-inheritance/answer/Kyle-Simpson
- https://davidwalsh.name/javascript-objects
- https://crockford.com/javascript/prototypal.html
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain

### আপনি AMD বনাম CommonJS সম্পর্কে কি মনে করেন?

উভয়ই লাইব্রেরি হলো একটি মডিউল সিস্টেম, যা ES2015 আসা পর্যন্ত জাভাস্ক্রিপ্টে উপস্থিত ছিল না। CommonJS সিঙ্ক্রোনাস কিন্তু AMD (Asynchronous Module Definition) অ্যাসিঙ্ক্রোনাস। CommonJS সার্ভার-সাইড ডেভেলপমেন্টকে মাথায় রেখে ডিজাইন করা হয়েছে, অন্যদিকে AMD, অ্যাসিঙ্ক্রোনাস বৈশিষ্টের সাথে ব্রাউজারগুলির জন্য উদ্দেশ্যে করে তৈরি করা হয়েছে।

আমি AMD সিনট্যাক্সকে বেশ ভার্বোস বলে মনে করি এবং CommonJS আপনি অন্যান্য প্রোগ্রামিং ল্যাঙ্গুয়েজে যেইভাবে import ব্যবহার করেন তার কাছাকাছি। বেশিরভাগ সময়, আমি AMD কে অপ্রয়োজনীয় বলে মনে করি, কারণ আপনি যদি আপনার সমস্ত জাভাস্ক্রিপ্ট একটি সংযুক্ত বান্ডেল ফাইলে পরিবেশন করেন তখন আপনি অ্যাসিঙ্ক লোডিং বৈশিষ্ট্যগুলি থেকে উপকৃত হবেন না। এছাড়াও, CommonJS সিনট্যাক্স প্রায় Node.js এ মডিউল লেখার মতন এবং ক্লায়েন্ট সাইড এবং সার্ভার সাইড জাভাস্ক্রিপ্ট ডেভেলপমেন্টের মধ্যে স্যুইচ করার সময় কম কনটেক্সট-সুইচিং ওভারহেড আছে।

আমি খুশি ES2015 এর সাথে, যা সিঙ্ক্রোনাস এবং অ্যাসিঙ্ক্রোনাস লোডিং উভয়ের জন্য সাপোর্ট করে, তাই আমরা কেবল একটি পদ্ধতিত ফলো করতে পারি। যদিও এটি ব্রাউজারে এবং নোডে সম্পূর্ণরূপে চালু করা হয়নি, আমরা আমাদের কোড রূপান্তর করতে সর্বদা ট্রান্সপিলার ব্যবহার করতে পারি।

###### রেফারেন্স

- https://auth0.com/blog/javascript-module-systems-showdown/
- https://stackoverflow.com/questions/16521471/relation-between-commonjs-amd-and-requirejs

### ব্যাখ্যা করুন কেন নিম্নলিখিত কোডটি একটি IIFE হিসাবে কাজ করে না: `function foo(){ }();`। এটিকে সঠিকভাবে একটি IIFE করতে কী পরিবর্তন করতে হবে?

IIFE এর ফুলফর্ম হলো Immediately Invoked Function Expressions। জাভাস্ক্রিপ্ট পার্সারটি `function foo(){ }();` এই কোডটি `function foo(){ }` এবং `();` হিসেবে পড়ে। যেখানে প্রথমটি একটি _function declaration_ এবং পরেরটি (এক জোড়া বন্ধনী) একটি একটি ফাংশন ইনভোকেশন বুঝাই কিন্তু কোন নাম নির্দিষ্ট করা নেই, তাই এটি `Uncaught SyntaxError: Unexpected token )` রিটার্ন করে।

এটি ঠিক করার দুটি উপায় রয়েছে : `(function foo(){ })()` এবং `(function foo(){ }())` । যে স্টেটমেন্টগুলো `function` দিয়ে শুরু হয় সেগুলোকে _function declarations_ হিসেবে বিবেচনা করা হয়; এই ফাংশনটিকে `()` এর মধ্যে রাখা হলে, এটি একটি _ function expression_ হয়ে যায় যা পরবর্তী `()` এর সাথে কার্যকর করা যেতে পারে। এই ফাংশনগুলি গ্লোবাল স্কোপ এ প্রকাশ করা হয় না এবং আপনি যদি এটিকে বডি এর মধ্যে উল্লেখ করতে না চান তবে আপনি এটির নামও বাদ দিতে পারেন।

আপনি `void` অপারেটরও ব্যবহার করতে পারেন: `void function foo(){ }();`। দুর্ভাগ্যবশত, এই ধরনের পদ্ধতির সাথে একটি সমস্যা আছে। প্রদত্ত এক্সপ্রেশন সর্বদা 'undefined' রিটার্ন করবে, তাই যদি আপনার IIFE ফাংশন কিছু রিটার্ন করে, আপনি এটি ব্যবহার করতে পারবেন না। যেমন:

```js
const foo = void (function bar() {
  return 'foo';
})();

console.log(foo); // undefined
```

###### রেফারেন্স

- http://lucybain.com/blog/2014/immediately-invoked-function-expression/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void

### `null`, `undefined` অথবা undeclared ভেরিয়েবলের মধ্যে পার্থক্য কী? আপনি কিভাবে ভেরিয়েবলের এই মানগুলো চেক করবেন?

**Undeclared** ভেরিয়েবল তৈরি হয় যখন আপনি একটি ভ্যারিয়েবল এ একটি মান ডিক্লেয়ার করেন যা পূর্বে `var`, `let` বা `const` ব্যবহার করে তৈরি করা হয়নি। Undeclared ভেরিয়েবলগুলি গ্লোবালি ডিফাইন করা হবে, বর্তমান স্কোপ এর বাহিরে। strict mode, এ আপনি যখন একটি Undeclared ভ্যারিয়েবল এ এসাইন করবেন তখন একটি `ReferenceError` ছুড়ে দেওয়া হবে। Undeclared ভেরিয়েবলগুলি গ্লোবাল ভেরিয়েবলগুলির মতোই ক্ষতিকর। তাই তাদের এড়িয়ে চলুন! এদের পরীক্ষা করতে, `try`/`catch` ব্লক ব্যবহার করুন।

```js
function foo() {
  x = 1; // Throws a ReferenceError in strict mode
}

foo();
console.log(x); // 1
```

একটি `undefined` ভেরিয়েবল হলো এমন একটি ভেরিয়েবল যা ডিক্লেয়ার করা হয়েছে, কিন্তু কোনো মান নির্ধারণ করা হয়নি। যদি কোনো ফাংশন কল করার পরে কোনো মান রিটার্ন না করে এবং এটি যদি একটি ভ্যারিয়েবল এ রাখা হয়, তাহলে ভেরিয়েবলটিরও `undefined` মান থাকে। এটি পরীক্ষা করার জন্য, strict equality(`===`) অপারেটর বা `typeof` ব্যবহার করে তুলনা করুন যা `'undefined'` স্ট্রিং রিটার্ন করবে। মনে রাখবেন চেক করার জন্য abstract equality operator ব্যবহার করা উচিত নয়, কারণ মানটি যদি 'null' হয় তবে এটি 'true' ফেরত দেবে।

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

যদি কোনো একটি ভেরিয়েবল `null` হয় তবে তা সুস্পষ্টভাবে `null` মানের সাথে বরাদ্দ করা হবে। এটি কোনো মান উপস্থাপন করে না এবং এটি 'undefined' থেকে আলাদা এ অর্থে যে এটিতে আলাদাভাবে মান বরাদ্দ করা হয়েছে৷ `null` চেক করতে, strict equality operator ব্যবহার করে তুলনা করুন। মনে রাখবেন যে উপরের মত, এটি চেক করার জন্য abstract equality operator (`==`) ব্যবহার করা উচিত নয়, কারণ মানটি যদি 'undefined' হয় তবে এটি 'true' ফেরত দেবে।

```js
var foo = null;
console.log(foo === null); // true
console.log(typeof foo === 'object'); // true

console.log(foo == undefined); // true. Wrong, don't use this to check!
```

ব্যক্তিগত অভ্যাস হিসাবে, আমি কখনই আমার ভেরিয়েবলগুলি undeclared বা unassigned রাখিনা। আমি যদি ভ্যারিয়েবল টি এখন ব্যবহার না করি তাহলে আমি `null` এসাইন করে রাখি। আপনি যদি আপনার ওয়ার্কফ্লোতে একটি লিন্টার ব্যবহার করেন তবে এটি সাধারণত চেক করতে সক্ষম হবে যে আপনি undeclared ভেরিয়েবলগুলি উল্লেখ করছেন না।

###### রেফারেন্স

- https://stackoverflow.com/questions/15985875/effect-of-declared-and-undeclared-variables
- https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined

### closure কি, এবং কিভাবে/কেন আপনি একটি ব্যবহার করবেন?

Closure হল একটি ফাংশন এবং ঐ ফাংশনটির লেক্সিক্যাল এনভায়রনমেন্ট এর সমন্বয় যার মধ্যে সেই ফাংশনটি ঘোষণা করা হয়েছিল। "lexical" শব্দটি দ্বারা বোঝায় লেক্সিক্যাল স্কোপিং অর্থ্যাৎ ভ্যারিয়েবল টি কোন এরিয়া পর্যন্ত এক্সেস করা যাই এবং এটি নির্ধারণ করা হয় সেই অবস্থানটি ব্যবহার করে যেখানে একটি ভেরিয়েবল সোর্স কোডের মধ্যে ঘোষণা করা হয়। Closure হলো ফাংশন যা বাইরের ফাংশন রিটার্ন করার পরেও বাইরের ফাংশনের ভেরিয়েবল-স্কোপ চেইন অ্যাক্সেস করতে পারে।

**কেন আপনি একটি ব্যবহার করবেন?**

- ডেটা গোপনীয়তা / ব্যক্তিগত পদ্ধতি অনুকরণ করা। সাধারণত ব্যবহৃত হয় [মডিউল প্যাটার্ন](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)।
- [পার্শিয়াল এপ্লিকেশন অথবা কার্রিং](https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8#.l4b6l1i3x).

###### রেফারেন্স

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
- https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36

### আপনি কি একটি `.forEach` লুপ এবং `.map()` লুপের মধ্যে প্রধান পার্থক্য বর্ণনা করতে পারেন এবং কেন আপনি একটি বনাম অন্যটিকে বেছে নেবেন?

উভয়ের মধ্যে পার্থক্য বোঝার জন্য, প্রতিটি ফাংশন কী করে তা দেখি।

**`forEach`**

- একটি অ্যারের উপাদানগুলির মধ্যে পুনরাবৃত্তি করে।
- প্রতিটি উপাদানের জন্য একটি কলব্যাক কার্যকর করে।
- এটি কোনো মান ফেরত দেয় না।

```js
const a = [1, 2, 3];
const doubled = a.forEach((num, index) => {
  // Do something with num and/or index.
});

// doubled = undefined
```

**`map`**

- একটি অ্যারের উপাদানগুলির মধ্যে পুনরাবৃত্তি করে।
- প্রতিটি উপাদানকে "Map" করে একটি নতুন উপাদানে পরিণত করে প্রতিটি উপাদানের ফাংশন কল করে, ফলে একটি নতুন অ্যারে তৈরি করে।

```js
const a = [1, 2, 3];
const doubled = a.map((num) => {
  return num * 2;
});

// doubled = [2, 4, 6]
```

`.forEach` এবং `.map()` এর মধ্যে প্রধান পার্থক্য হল `.map()` একটি নতুন অ্যারে প্রদান করে। আপনার যদি আসল অ্যারে পরিবর্তন করতে না চান, তাহলে `.map()` বেছে নিন। কিন্তু আপনি যদি কেবল একটি অ্যারের উপর পুনরাবৃত্তি করতে চান, তাহলে `forEach` বেছে নিন।

###### রেফারেন্স

- https://codeburst.io/javascript-map-vs-foreach-f38111822c0f

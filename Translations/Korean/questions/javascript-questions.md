# JS 질문

* [이벤트 위임에 대해 설명하세요.](#이벤트-위임에-대해-설명하세요)
* [`this`가 JavaScript 에서 어떻게 작동하는지 설명하세요.](#this가-javascript에서-어떻게-작동하는지-설명하세요)
* [프로토타입 상속이 어떻게 작동하는지 설명하세요.](#프로토타입-상속이-어떻게-작동하는지-설명하세요)
* [AMD 대 CommonJS 에 대해 어떻게 생각하십니까?](#amd-대-commonjs에-대해-어떻게-생각하십니까)
* [다음 내용이 IIFE 로 작동하지 않는 이유를 설명하세요: `function foo(){ }();`를 IIFE 로 만들기 위해서는 무엇이 바뀌어야 할까요?](#다음-내용이-iife로-작동하지-않는-이유를-설명하세요-function-foo-를-iife로-만들기-위해서는-무엇이-바뀌어야-할까요)
* [`null`, `undefined`, `선언되지 않은 변수` 의 차이점은 무엇입니까? 당신은 어떻게 이 상태들에 대한 점검을 할 것입니까?](#null-undefined-선언되지-않은-변수-의-차이점은-무엇입니까-당신은-어떻게-이-상태들에-대한-점검을-할-것입니까)
* [클로저는 무엇이며, 어떻게/왜 사용합니까?](#클로저는-무엇이며-어떻게-왜-사용합니까)
* [`.forEach` 루프와 `.map()` 루프 사이의 주요 차이점을 설명할 수 있습니까? 왜 둘중 하나를 선택하겠습니까?](#forEach-루프와-map-루프-사이의-주요-차이점을-설명할-수-있습니까-왜-둘중-하나를-선택하겠습니까)
* [익명 함수의 일반적인 사용 사례는 무엇입니까?](#익명-함수의-일반적인-사용-사례는-무엇입니까)
* [코드를 어떻게 구성합니까? (모듈 패턴, 고전적인 상속?)](#코드를-어떻게-구성합니까-모듈-패턴-고전적인-상속)
* [호스트 객체와 내장 객체의 차이점은 무엇입니까?](#호스트-객체와-내장-객체의-차이점은-무엇입니까)
* [`Person(){}`, `var person = Person()`, `var person = new Person()` 의 차이점은 무엇입니까?](#Person-var-person-Person-var-person-new-Person-의-차이점은-무엇입니까)
* [`.call`과 `.apply`의 차이점은 무엇입니까?](#call-과-apply-의-차이점은-무엇입니까)
* [`Function.prototype.bind`에 대해 설명하세요.](#Function-prototype-bind-에-대해-설명하세요)
* [언제 `document.write()`를 사용합니까?](#언제-document-write-를-사용합니까)
* [Feature detection, Feature inference, UA String 의 차이점은 무엇입니까?](#Feature-detection-Feature-inference-UA-String-의-차이점은-무엇입니까)
* [Ajax에 대해 가능한한 자세히 설명하십시오.](#Ajax에-대해-가능한한-자세히-설명하십시오)
* [Ajax를 사용하는 것의 장단점은 무엇입니까?](#Ajax를-사용하는-것의-장단점은-무엇입니까)
* [JSONP의 작동 방식(Ajax가 아닌 방법)을 설명하십시오.](#JSONP의-작동-방식-Ajax가-아닌-방법-을-설명하십시오)
* [자바스크립트 템플릿을 사용한 적이 있습니까? 사용해봤다면, 어떤 라이브러리를 사용했습니까?](#자바스크립트-템플릿을-사용한-적이-있습니까-사용해봤다면-어떤-라이브러리를-사용했습니까)
* [`hoisting`에 대해 설명하세요.](#hoisting-에-대해-설명하세요)
* [event bubbling에 대해 설명하세요.](#event-bubbling에-대해-설명하세요)
* ["attribute"와 "property"의 차이점은 무엇입니까?](#attribute-와-property-의-차이점은-무엇입니까)
* [내장 JavaScript 객체를 확장하는 것이 좋은 생각이 아닌 이유는 무엇입니까?](#내장-javascript-객체를-확장하는-것이-좋은-생각이-아닌-이유는-무엇입니까)
* [document `load` 이벤트와 document `DOMContentLoaded` 이벤트의 차이점은 무엇입니까?](#document-load-이벤트와-document-DOMContentLoaded-이벤트의-차이점은-무엇입니까)
* [`==`와 `===`의 차이점은 무엇입니까?](#==-와-===-의-차이점은-무엇입니까)
* [JavaScript와 관련하여 same-origin 정책을 설명하십시오.](#javascript와-관련하여-same-origin-정책을-설명하십시오)
* [이것이 작동하게 만들어보세요: `duplicate([1,2,3,4,5]); // [1,2,3,4,5,1,2,3,4,5]`](#이것이-작동하게-만들어보세요)
* [왜 Ternary 표현이라고 부르고, "Ternary"라는 단어는 무엇을 나타냅니까?](#왜-ternary-표현이라고-부르고-ternary-라는-단어는-무엇을-나타냅니까)
* [`"use strict";` 이 무엇입니까? 사용시 장단점이 무엇인가요?](#use-strict-이-무엇입니까-사용시-장단점이-무엇인가요)
* [100까지 증가하면서 `3`의 배수에는 **"fizz"**를 출력하고, `5`의 배수에는 **"buzz"**를 출력하고, `3`과 `5`의 배수에는 **"fizzbuzz"**를 출력하는 for loop를 만드세요.](#100까지-증가하면서-3-의-배수에는-fizz-를-출력하고-5-의-배수에는-buzz-를-출력하고-3-과-5-의-배수에는-fizzbuzz-를-출력하는-for-loop를-만드세요)
* [일반적으로 웹 사이트의 전역 스코프를 그대로 두고 건드리지 않는 것이 좋은 이유는 무엇입니까?](#일반적으로-웹-사이트의-전역-스코프를-그대로-두고-건드리지-않는-것이-좋은-이유는-무엇입니까)
* [왜 `load` 이벤트와 같은 것을 사용하나요? 이 이벤트에는 단점이 있나요? 다른 대안을 알고있나요? 알고있다면 왜 그것을 사용할건가요?](#왜-load-이벤트와-같은-것을-사용하나요-이 이벤트에는-단점이-있나요-다른-대안을-알고있나요-알고있다면-왜-그것을-사용할건가요)
* [single page app이 무엇인지 설명하고 SEO-friendly한 앱을 만드는 방법을 설명하십시오.](#single-page-app이-무엇인지-설명하고-seo-friendly한-앱을-만드는-방법을-설명하십시오)
* [Promises 와/또는 Polyfill에 대한 당신의 경험은 어느 정도입니까?](#promises-와-또는-polyfill에-대한-당신의-경험은-어느-정도입니까)
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

---

## JS 질문

[프론트엔드 면접 질문 - JS 질문](https://github.com/h5bp/Front-end-Developer-Interview-Questions#html-questions)에 대한 해설입니다.
Pull Request 를 통한 제안 및 수정 요청을 환영합니다.

### 이벤트 위임에 대해 설명하세요.

이벤트 위임은 이벤트 리스너를 하위 요소에 추가하는 대신 상위 요소에 추가하는 기법입니다. 리스너는 DOM 의 버블링된 이벤트로 인해 하위 요소에서 이벤트가 발생될 때마다 실행됩니다. 이 기술의 이점은 다음과 같습니다.

* 각 하위 항목에 이벤트 핸들러를 연결하지 않고 상위 요소에 하나의 단일 핸들러만 필요하기 때문에 메모리 사용 공간이 줄어 듭니다.
* 제거된 요소에서 핸들러를 해제하고 새 요소에 대해 이벤트를 바인딩할 필요가 없습니다.

###### 참고자료

* <https://davidwalsh.name/event-delegate>
* <https://stackoverflow.com/questions/1687296/what-is-dom-event-delegation>

### `this`가 JavaScript 에서 어떻게 작동하는지 설명하세요.

`this`는 간단하게 설명하기 어렵습니다. JavaScript 에서 가장 혼란스러운 개념 중 하나입니다. 대략 설명하면 `this`의 값은 함수가 호출되는 방식에 따라 달라집니다.
온라인에 많은 설명이 있는데 [Arnav Aggrawal](https://medium.com/@arnav_aggarwal)의 설명이 가장 명확했습니다.
다음 규칙과 같습니다.

1.  함수를 호출할 때 `new` 키워드를 사용하는 경우 함수 내부에 있는 `this`는 완전히 새로운 객체입니다.
2.  `apply`, `call`, `bind`가 함수의 호출 / 작성에 사용되는 경우 함수 내의 `this`는 인수로 전달된 객체입니다.
3.  `obj.method()`와 같이 함수를 메서드로 호출하는 경우 `this`는 함수가 프로퍼티인 객체입니다.
4.  함수가 자유함수로 호출되는 경우 즉 위의 조건없이 호출되는 경우 `this`는 전역 객체입니다. 브라우저에서는 `window` 객체입니다. 엄격 모드(`'use strict'`) 일 경우 `this`는 전역 객체 대신 `undefined`가 됩니다.
5.  위의 규칙 중 다수가 적용되면 더 높은 규칙이 승리하고 `this`값을 설정합니다.
6.  함수가 ES2015 화살표 함수인 경우 위의 모든 규칙을 무시하고 생성된 시점에서 주변 스코프의 `this`값을 받습니다.

상세한 설명은 [Medium 의 글](https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3)를 참조하세요.

###### 참고자료

* <https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3>
* <https://stackoverflow.com/a/3127440/1751946>

### 프로토타입 상속이 어떻게 작동하는지 설명하세요.

이것은 매우 일반적인 JavaScript 인터뷰 질문입니다. 모든 JavaScript 객체는 다른 객체에 대한 참조인 `prototype` 프로퍼티를 가지고 있습니다. 객체의 프로퍼티에 접근할 때 해당 객체에 해당 프로퍼티가 없으면 JavaScript 엔진은 객체의 `prototype`과 `prototype`의 `prototype`등을 보고 프로퍼티가 정의될 때까지 찾고 만약 객체의 프로퍼티에 접근할 때 해당 객체에 해당 프로퍼티가 없으면 프로토타입 체인 중 하나에 있거나 프로토타입 체인의 끝에 도달 할 때까지 찾습니다. 이 동작은 고전적인 상속을 흉내내지만 실제로 [상속보다 위임](https://davidwalsh.name/javascript-objects)에 더 가깝습니다.

###### 참고자료

* <https://www.quora.com/What-is-prototypal-inheritance/answer/Kyle-Simpson>
* <https://davidwalsh.name/javascript-objects>

### AMD 대 CommonJS 에 대해 어떻게 생각하십니까?

두 가지 모두 ES2015 가 등장할 때까지 JavaScript 에 기본적으로 존재하지 않는 모듈 시스템을 구현하는 방법입니다. CommonJS 는 동기식인 반면 AMD (Asynchronous Module Definition - 비동기식 모듈 정의)는 분명히 비동기식입니다. CommonJS 는 서버-사이드 개발을 염두에 두고 설계되었으며 AMD 는 모듈의 비동기 로딩을 지원하므로 브라우저용으로 더 많이 사용됩니다.

AMD 은 구문이 매우 장황하고 CommonJS 은 다른 언어로 된 import 문을 작성하는 스타일에 더 가깝습니다. 대부분의 경우 AMD 를 필요로 하지 않습니다. 모든 JavaScript 를 연결된 하나의 번들 파일로 제공하면 비동기 로딩 속성의 이점을 누릴 수 없기 때문입니다. 또한 CommonJS 구문은 모듈 작성의 노드 스타일에 가깝고 클라이언트-사이드과 서버-사이드 JavaScript 개발 사이를 전환할 때 문맥 전환 오버 헤드가 적습니다.

ES2015 모듈이 동기식 및 비동기식 로딩을 모두 지원하는 것이 반가운 것은 마침내 하나의 접근 방식만 고수할 수 있다는 점입니다. 브라우저와 노드에서 완전히 작동되지는 않았지만 언제나 트랜스파일러를 사용하여 코드를 변환할 수 있습니다.

###### 참고자료

* <https://auth0.com/blog/javascript-module-systems-showdown/>
* <https://stackoverflow.com/questions/16521471/relation-between-commonjs-amd-and-requirejs>

### 다음 내용이 IIFE 로 작동하지 않는 이유를 설명하세요: `function foo(){ }();`를 IIFE 로 만들기 위해서는 무엇이 바뀌어야 할까요?

IIFE 는 즉시 함수 호출 표현식을 의미합니다. JavaScript 파서는 `function foo(){ }();`을 `function foo(){ }`와 `();` 같이 읽습니다. 전자는 함수 선언이며 후자 ( 한 쌍의 괄호 )는 함수를 호출하려고 시도했지만 이름이 지정되지 않았기 때문에 `Uncaught SyntaxError : Unexpected token`)을 던집니다.

추가로 괄호를 추가하는 두 가지 방법이 있습니다: `(function foo(){ })()` 그리고 `(function foo(){ }())`.

JavaScript 파서는 `function foo () {} ();`를`function foo () {}`와 `();`로 읽습니다. 이러한 함수는 전역 스코프에서 노출되지 않으며 본문 내에서 자체를 참조할 필요가 없는 경우 해당 함수의 이름을 생략할 수도 있습니다.

###### 참고자료

* <http://lucybain.com/blog/2014/immediately-invoked-function-expression/>

### `null`, `undefined`, `선언되지 않은 변수` 의 차이점은 무엇입니까? 당신은 어떻게 이 상태들에 대한 점검을 할 것입니까?

**선언되지 않은 변수** 변수는 이전에 `var`, `let`, `const` 를 사용하여 생성되지 않은 식별자에 값을 할당 할 때 생성됩니다. `선언되지 않은 변수` 는 현재 범위 외부에서 전역으로 정의됩니다. strict 모드에서는 `선언되지 않은 변수` 에 할당하려고 할 때 `ReferenceError` 가 throw 됩니다. `선언되지 않은 변수` 는 전역 변수처럼 좋지 않은 것입니다. 그것들은 모두 피하세요! 이들을 검사하기 위해 사용할 때 `try` / `catch` 블록에 감싸십시오.

```js
function foo() {
  x = 1; // strict 모드에서 ReferenceError를 발생시킵니다.
}

foo();
console.log(x); // 1
```

`undefined` 변수는 선언되었지만 값이 할당되지 않은 변수입니다. 이것은 `undefined` 타입입니다. 함수가 실행 결과에 따라 값을 반환하지 않으면 변수에 할당되며, 변수가 `undefined` 값을 갖습니다. 이것을 검사하기 위해, 엄격한 (`===`) 연산자 또는 `typeof` 에 `undefined` 문자열을 사용하여 비교하십시오. 확인을 위해 추상 평등 연산자(`==`)를 사용해서는 안되며, 이는 값이 `null` 이면 `true` 를 반환합니다.

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

`null` 인 변수는 `null` 값에 명시적으로 할당될 것입니다. 그것은 값을 나타내지 않으며 명시적으로 할당된다는 점에서 `undefined`와 다릅니다. `null`을 체크하기 위해서 단순히 완전 항등 연산자(`===`)를 사용하여 비교하면 됩니다. 위와 같이, 추상 평등 연산자 (`==`)를 사용해서는 안되며, 값이 `undefined`이면 `true`를 반환합니다.

```js
var foo = null;
console.log(foo === null); // true

console.log(foo == undefined); // true. Wrong, don't use this to check!
```

개인적 습관으로, 저는 변수를 선언하지 않거나 할당하지 않은 상태로 두지 않습니다. 아직 사용하지 않으려는 경우, 선언한 후에 명시적으로 `null` 을 할당할 것입니다.

###### 참고자료

* <https://stackoverflow.com/questions/15985875/effect-of-declared-and-undeclared-variables>
* <https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined>

### 클로저는 무엇이며, 어떻게/왜 사용합니까?

클로저는 함수와 그 함수가 선언된 렉시컬 환경의 조합입니다. "렉시컬"은 렉시컬 범위 지정이 변수가 사용 가능한 위치를 결정하기 위해 소스 코드 내에서 변수가 선언된 위치를 사용한다는 사실을 나타냅니다. 클로저는 외부 함수가 반환된 후에도 외부 함수의 변수 범위 체인에 접근할 수 있는 함수입니다.

**왜 클로저를 사용합니까?**

* 데이터 프라이버시 / 클로저로 private method 를 모방. 일반적으로 [모듈 패턴](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)에 사용됩니다.
* [부분적인 응용 프로그램 또는 currying](https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8#.l4b6l1i3x).

###### 참고자료

* <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures>
* <https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36>

### `.forEach` 루프와 `.map()` 루프 사이의 주요 차이점을 설명할 수 있습니까? 왜 둘중 하나를 선택하겠습니까?

이 두 함수의 차이점을 이해하기 위해 각 함수가 무엇을 하는지 살펴보겠습니다.

**`forEach`**

* 배열의 요소를 반복합니다.
* 각 요소에 대한 콜백을 실행합니다.
* 값을 반환하지 않습니다.

```js
const a = [1, 2, 3];
const doubled = a.forEach((num, index) => {
  // Do something with num and/or index.
});

// doubled = undefined
```

**`map`**

* 배열의 요소를 반복합니다.
* 각 요소에서 함수를 호출하여 결과로 새 배열을 작성하여 각 요소를 새 요소에 맵핑합니다.

```js
const a = [1, 2, 3];
const doubled = a.map(num => {
  return num * 2;
});

// doubled = [2, 4, 6]
```

`.forEach` 와 `.map()` 의 주된 차이점은 `.map()` 이 새로운 배열을 반환한다는 것입니다. 결과가 필요하지만 원본 배열을 변경하고 싶지 않으면 `.map()` 이 확실한 선택입니다. 단순히 배열을 반복할 필요가 있다면, forEach 가 좋은 선택입니다.

###### 참고자료

* <https://codeburst.io/javascript-map-vs-foreach-f38111822c0f>

### 익명 함수의 일반적인 사용 사례는 무엇입니까?

익명함수는 IIFE 로 사용되어 지역 범위 내에서 일부 코드를 캡슐화하므로 선언된 변수가 전역 범위로 누출되지 않습니다.

```js
(function() {
  // Some code here.
})();
```

한 번 사용되며 다른 곳에서는 사용할 필요가 없는 콜백으로 사용됩니다. 함수 본체를 찾기 위해 다른 곳을 찾아볼 필요없이 코드를 호출하는 코드 바로 안에 핸들러가 정의되어 있으면 코드가 보다 독립적이고 읽기 쉽게 보일 것입니다.

```js
setTimeout(function() {
  console.log('Hello world!');
}, 1000);
```

함수형 프로그래밍 또는 Lodash 에 대한 인수(콜백과 유사).

```js
const arr = [1, 2, 3];
const double = arr.map(function(el) {
  return el * 2;
});
console.log(double); // [2, 4, 6]
```

###### 참고자료

* <https://www.quora.com/What-is-a-typical-usecase-for-anonymous-functions>
* <https://stackoverflow.com/questions/10273185/what-are-the-benefits-to-using-anonymous-functions-instead-of-named-functions-fo>

### 코드를 어떻게 구성합니까? (모듈 패턴, 고전적인 상속?)

과거에는 Backbone 모델을 만들고 그 모델에 메소드를 연결하는 등 OOP 접근 방식을 장려하는 모델에 Backbone 을 사용했습니다.

모듈 패턴은 여전히 ​​ 훌륭하지만, 요즘에는 React/Redux 기반의 Flux 아키텍처를 사용합니다. 이 아키텍처는 단방향 프로그래밍 방식을 권장합니다. 저는 평범한 객체를 사용하여 응용 프로그램의 모델을 표현하고 이러한 객체를 조작하는 유틸리티 순수 함수를 작성합니다. 상태는 다른 Redux 응용 프로그램에서와 마찬가지로 action 및 reducer 를 사용하여 조작됩니다.

가능한 경우 고전적인 상속을 사용하지 않습니다. 저는 [이 규칙들](https://medium.com/@dan_abramov/how-to-use-classes-and-sleep-at-night-9af8de78ccb4)을 유지합니다.

### 호스트 객체와 내장 객체의 차이점은 무엇입니까?

내장 객체는 ECMAScript 사양에 정의된 JavaScript 언어의 일부인 객체입니다. (예: `String`, `Math`, `RegExp`, `Object`, `Function` 등)

호스트 객체는 `window`, `XMLHTTPRequest` 등과 같이 런타임 환경 (브라우저 또는 노드)에 의해 제공됩니다.

###### 참고자료

* <https://stackoverflow.com/questions/7614317/what-is-the-difference-between-native-objects-and-host-objects>

### `Person(){}`, `var person = Person()`, `var person = new Person()` 의 차이점은 무엇입니까?

이 질문은 굉장해 애매합니다. 질문의 의도에 대한 저의 최선의 추측은 자바스크립트의 생성자에 대해 묻는 것입니다. 엄밀히 말하면, `function Person(){}`은 정상적인 함수 선언 일뿐입니다. 이 컨벤션은 생성자로 사용하기 위해 함수에 PascalCase 를 사용합니다.

`var person = Person()`은 생성자가 아니며 `Person`을 함수로 호출합니다. 함수를 생성자로 사용하려는 경우에 이렇게 호출하는 것이 일반적인 실수입니다. 일반적으로 생성자는 아무것도 반환하지 않으므로 일반 함수처럼 생성자를 호출하면 `undefined`가 반환되고 지정된 변수에 할당됩니다.

`var person = new Person()`은 `Person.prototype`을 상속받은 `new` 연산자를 사용하여 `Person` 객체의 인스턴스를 생성합니다. 또다른 방법은 `Object.create`를 사용하는 것입니다: `Object.create(Person.prototype)`.

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

###### 참고자료

* <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new>

### `.call`과 `.apply`의 차이점은 무엇입니까?

`.call`과 `.apply`는 모두 함수를 호출하는데 사용되며 첫 번째 매개 변수는 함수 내에서 `this`의 값으로 사용됩니다. 그러나 `.call`은 쉼표로 구분된 인수를 두번째 인수로 취하고 `.apply`는 인수의 배열을 두번째 인수로 취합니다. `call`은 `C`: Comma 로 구분되며 `apply`는 인수 배열인 `A`: `arguments` 라고 기억하면 쉽습니다.

```js
function add(a, b) {
  return a + b;
}

console.log(add.call(null, 1, 2)); // 3
console.log(add.apply(null, [1, 2])); // 3
```

### `Function.prototype.bind`에 대해 설명하세요.

[MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind)에서 인용.

> `bind()` 메소드는 호출될 때 this 키워드가 제공된 값으로 설정되고 새로운 함수가 호출될 때 주어진 인자 앞에 주어진 시퀀스가 ​​ 선행되는 새로운 함수를 생성합니다.

내 경험상, 다른 함수로 전달하고자하는 클래스의 메소드에서 `this`의 값을 바인딩할 때 가장 유용합니다. 이것은 종종 React 컴포넌트에서 사용됩니다.

###### 참고자료

* <https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind>

### 언제 `document.write()`를 사용합니까?

`document.write()`는 `document.open()`에 의해 열린 문서 스트림에 텍스트 문자열을 씁니다. 페이지가 로드된 후에 `document.write()`가 실행되면 `document.open`을 호출하여 문서 전체를 지우고 (`<head>`와 `<body>`를 지웁니다!). 문자열로 주어진 매개 변수 값으로 대체합니다. 그러므로 일반적으로 위험하고 오용되기 쉽습니다.

`document.write()`가 코드분석이나 [JavaScript 가 활성화된 경우에만 작동하는 스타일을 포함하고 싶을 때](https://www.quirksmode.org/blog/archives/2005/06/three_javascrip_1.html) 사용되는 경우를 설명하는 온라인 답변이 몇 가지 있습니다. 심지어 HTML5 보일러 플레이트에서 [스크립트를 병렬로로드하고 실행 순서를 보존](https://github.com/paulirish/html5-boilerplate/wiki/Script-Loading-Techniques#documentwrite-script-tag)할때도 사용됩니다! 그러나, 저는 그 이유가 시대에 뒤 떨어진 것으로 생각하고 있으며, 현재는 `document.write()`를 사용하지 않고도 할 수 있습니다. 이것이 틀렸다면 고쳐주세요.

###### 참고자료

* <https://www.quirksmode.org/blog/archives/2005/06/three_javascrip_1.html>
* <https://github.com/h5bp/html5-boilerplate/wiki/Script-Loading-Techniques#documentwrite-script-tag>

### Feature detection, Feature inference, UA String 의 차이점은 무엇입니까?

**Feature Detection**

Feature Detection은 브라우저가 특정 코드 블록을 지원하는지에 따라 다른 코드를 실행하도록 하여, 일부 브라우저에서 항상 오류가 발생하도록합니다. 예:

```js
if ('geolocation' in navigator) {
  // Can use navigator.geolocation
} else {
  // Handle lack of feature
}
```

[Modernizr](https://modernizr.com/)는 Feature detection을 처리 ​​할 수 있는 훌륭한 라이브러리입니다.

**Feature Inference**

Feature inference는 Feature detection과 마찬가지로 기능을 확인하지만 다른 함수도 존재한다고 가정하고 사용합니다. 예:

```js
if (document.getElementsByTagName) {
  element = document.getElementById(id);
}
```

이것은 권장하지 않습니다. Feature detection이 더 확실합니다.

**UA String**

네트워크 프로토콜 피어가 요청하는 소프트웨어 사용자 에이전트의 응용 프로그램 유형, 운영 체제, 소프트웨어 공급 업체 또는 소프트웨어 버전을 식별 할 수 있도록 해주는 browser-reported String입니다. `navigator.userAgent` 를 통해 액세스 할 수 있습니다. 하지만 문자열은 구문 분석하기 까다로우며 스푸핑 될 수 있습니다. 예를 들어 Chrome은 Chrome과 Safari로 모두 보고됩니다. Safari를 감지하기 위해서는 Safari 문자열이 있는지와 Chrome 문자열이 없는지 확인해야합니다. 이 방법은 사용하지 마십시오.

###### 참고자료

* <https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection>
* <https://stackoverflow.com/questions/20104930/whats-the-difference-between-feature-detection-feature-inference-and-using-th>
* <https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent>

### Ajax에 대해 가능한한 자세히 설명하십시오.

Ajax (asynchronous JavaScript and XML)는 비동기 웹 응용 프로그램을 만들기 위해 클라이언트 측에서 여러 웹 기술을 사용하는 웹 개발 기술의 집합입니다. Ajax를 사용하면 웹 애플리케이션은 기존 페이지의 화면 및 동작을 방해하지 않으면서 백그라운드에서 비동기적으로 서버로 데이터를 보내고 서버에서 데이터를 받아올 수 있습니다. Ajax는 프리젠테이션 레이어에서 데이터 교환 레이어를 분리함으로써 웹 페이지 및 확장 웹 애플리케이션이 전체 페이지를 다시로드 할 필요없이 동적으로 컨텐츠를 변경할 수 있도록 합니다. 실제로 최근에는 일반적으로 네이티브 자바스크립트의 장점 때문에 XML대신 JSON을 사용합니다.

`XMLHttpRequest` API는 비동기 통신 또는 최근 `fetch` API에 자주 사용됩니다.

###### 참고자료

* <https://en.wikipedia.org/wiki/Ajax_(programming>)
* <https://developer.mozilla.org/en-US/docs/AJAX>

### Ajax를 사용하는 것의 장단점은 무엇입니까?

**장점**

* 상호작용성이 좋아집니다. 서버의 새로운 컨텐츠를 전체 페이지를 다시로드 할 필요없이 동적으로 변경할 수 있습니다.
* 스크립트 및 스타일 시트는 한 번만 요청하면되므로 서버에 대한 연결을 줄여줍니다.
* 상태를 페이지에서 관리 할 수 ​​있습니다. 메인 컨테이너 페이지가 다시 로드되지 않기 때문에 JavaScript의 변수와 DOM의 상태가 유지됩니다.
* 기본적으로 SPA의 장점 대부분입니다.

**단점**

* 동적 웹 페이지는 북마크 하기 어렵습니다.
* 브라우저에서 JavaScript가 비활성화 된 경우 작동하지 않습니다.
* 일부 웹 크롤러는 자바 스크립트를 실행하지 않으며 JavaScript에 의해 로드된 콘텐츠를 볼 수 없습니다.
* SPA의 대부분의 단점이 대부분입니다.

### JSONP의 작동 방식(Ajax가 아닌 방법)을 설명하십시오.

JSONP (JSON with Padding)은 현재 페이지에서 cross-origin 도메인으로의 Ajax 요청이 허용되지 않기 때문에 웹 브라우저에서 cross-domain 정책을 우회하는 데 일반적으로 사용되는 방법입니다.

JSONP는 `<script>`태그를 통해 cross-origin 도메인에 요청하고 보통 `callback`쿼리 매개 변수(예: `https://example.com?callback=printData`)로 요청합니다. 그러면 서버는 `printData`라는 함수 안에 데이터를 래핑하여 클라이언트로 반환합니다.

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

클라이언트는 전역 범위에 있는 `printData` 함수를 가져야만하고 cross-origin domain으로부터의 응답이 수신 될 때 함수가 클라이언트에 의해 실행됩니다.

JSONP는 안전하지 않을 수 있으며 보안과 관련이 있습니다. JSONP은 실제로 JavaScript고, JavaScript가 할 수 있는 모든 작업을 수행 할 수 있으므로 JSONP 데이터 공급자를 신뢰해야만 합니다.

요즘에는 [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing)가 권장되는 접근 방식이며 JSONP는 해킹으로 간주됩니다.

###### 참고자료

* <https://stackoverflow.com/a/2067584/1751946>

### 자바스크립트 템플릿을 사용한 적이 있습니까? 사용해봤다면, 어떤 라이브러리를 사용했습니까?

네. Handlebars, Underscore, Lodash, AngularJS 및 JSX. 저는 AngularJS에서 템플릿을 싫어했습니다. 지시자에서 문자열을 많이 사용하게 되며 오타가 발견되지 않기 때문입니다. JSX는 자바스크립트에 가깝고 배워야 하는 새로운 구문이 거의 없기 때문에 흥미롭습니다. 요즘 Third-party 코드에 의존하지 않고 템플릿을 만드는 빠른 방법으로 ES2015 템플릿 문자열 리터럴을 사용할 수도 있습니다.

```js
const template = `<div>My name is: ${name}</div>`;
```

그러나 템플릿 라이브러리와 달리 Contents가 이스케이프되지 않으므로 위의 접근 방식에서 잠재적 XSS를 알고 있어야합니다.

### `hoisting`에 대해 설명하세요.

Hoisting은 코드에서 변수 선언의 동작을 설명하는데 사용되는 용어입니다. `var` 키워드로 선언 혹은 초기화된 변수는 현재 스코프의 최상위까지 `hoisted`됩니다. 그러나 선언문만 `hoisted`되며 할당(있는 경우)은 그대로입니다. 몇 가지 예를 들어 설명해 보겠습니다.

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

함수 선언은 바디를 호이스팅되는 반면 변수 선언 형태로 작성된 함수 표헌식은 변수 선언만 호이스팅됩니다.

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

### event bubbling에 대해 설명하세요.

DOM 요소에서 이벤트가 트리거되면 리스너가 연결되어 있는 경우 이벤트 처리를 시도한 다음 해당 이벤트가 부모에게 버블링되고 같은 이벤트가 발생합니다. 이 버블링은 요소의 조상 `document` 까지 계속적으로 발생시킵니다. 이벤트 버블링은 이벤트 위임의 메커니즘입니다.

### "attribute"와 "property"의 차이점은 무엇입니까?

속성은 HTML 마크업에 정의되지만 속성은 DOM에 정의됩니다. 차이점을 설명하기 위해 HTML에이 텍스트 필드가 있다고 생각해보새요. `<input type="text" value="Hello">`.

```js
const input = document.querySelector('input');
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello
```

그러나 텍스트 필드에 "World!"를 추가하면 이렇게 될것입니다.

```js
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello World!
```

###### 참고자료

* <https://stackoverflow.com/questions/6003819/properties-and-attributes-in-html>

### 내장 JavaScript 객체를 확장하는 것이 좋은 생각이 아닌 이유는 무엇입니까?

빌트인/네이티브 JavaScript 객체를 확장한다는 것은 prototype에 속성/함수를 추가한다는 것을 의미합니다. 이것은 처음에는 좋은 생각처럼 보일 수 있지만 실제로는 위험합니다. 여러분의 코드가 동일한 `contains` 메소드를 추가함으로써 `Array.prototype`을 확장하는 여러가지 라이브러리를 사용한다고 상상해보십시오. 이러한 구현은 메소드를 서로 덮어쓰게 되며 이 두 메소드의 동작이 동일하지 않으면 코드가 망가질것입니다.

네이티브 객체를 확장 할 수 있는 유일한 경우는 폴리필을 만들려고 할 때입니다. 자바스크립트 사양의 일부이지만 오래된 브라우저이기 때문에 사용자 브라우저에 없을 수도 있는 메서드에 대한 고유한 구현을 제공해야할 경우입니다.

###### 참고자료

* <http://lucybain.com/blog/2014/js-extending-built-in-objects/>

### document `load` 이벤트와 document `DOMContentLoaded` 이벤트의 차이점은 무엇입니까?

`DOMContentLoaded` 이벤트는 스타일시트, 이미지, 서브프레임이 로딩을 기다리지 않고 초기 HTML 문서가 완전히 로드되고 파싱될 때 발생합니다.

`window`의 `load`이벤트는 DOM과 모든 종속 리소스와 에셋들이 로드된 후에 만 ​​발생합니다.

###### 참고자료

* <https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded>
* <https://developer.mozilla.org/en-US/docs/Web/Events/load>

### `==`와 `===`의 차이점은 무엇입니까?

`==`는 추상 동등 연산자이고 `===`는 완전 동등 연산자입니다. `==`연산자는 타입 변환이 필요한 경우 타입 변환을 한 후에 동등한지 비교할 것입니다. `===`연산자는 타입 변환을 하지 않으므로 두 값이 같은 타입이 아닌 경우 `===`는 단순히 `false`를 반환합니다. `==`를 사용하면 다음과 같은 무서운 일이 발생할 수 있습니다.

```js
1 == '1'; // true
1 == [1]; // true
1 == true; // true
0 == ''; // true
0 == '0'; // true
0 == false; // true
```

저의 조언은 편의상 `null`과 `undefined`를 비교할 때를 제외하고, `==`연산자를 절대 사용하지 않는 것입니다. `a == null`은 `a`가 `null` 또는 `undefined`이면 `true`를 반환합니다.

```js
var a = null;
console.log(a == null); // true
console.log(a == undefined); // true
```

###### 참고자료

* <https://stackoverflow.com/questions/359494/which-equals-operator-vs-should-be-used-in-javascript-comparisons>

### JavaScript와 관련하여 same-origin 정책을 설명하십시오.

same-origin 정책은 JavaScript가 도메인 경계를 넘어서 요청하는 것을 방지합니다. origin은 URI 체계, 호스트 이름 및 포트 번호의 조합으로 정의됩니다. 이 정책은 한 페이지의 악의적인 스크립트가 해당 페이지의 문서 객체 모델을 통해 다른 웹 페이지의 중요한 데이터에 액세스하는 것을 방지합니다.

###### 참고자료

* <https://en.wikipedia.org/wiki/Same-origin_policy>

### 이것이 작동하게 만들어보세요.

```js
duplicate([1, 2, 3, 4, 5]); // [1,2,3,4,5,1,2,3,4,5]
```

```js
function duplicate(arr) {
  return arr.concat(arr);
}

duplicate([1, 2, 3, 4, 5]); // [1,2,3,4,5,1,2,3,4,5]
```

### 왜 Ternary 표현이라고 부르고, "Ternary"라는 단어는 무엇을 나타냅니까?

"Ternary"는 삼항을 나타내고 삼항 표현식은 세가지 피연산자, 테스트 조건문, "then"표현식, "else"표현식을 받습니다. 삼항 표현식은 자바 스크립트에만 해당되는 것이 아니며 왜 이 목록에 있는지 잘 모르겠습니다.

###### 참고자료

* <https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator>

### `"use strict";` 이 무엇입니까? 사용시 장단점이 무엇인가요?

'use strict'는 전체 스크립트나 개별 함수에 엄격 모드를 사용하는데 사용되는 명령문입니다. Strict 모드는 JavaScript 제한된 변형에서 선택하는 방법입니다.

장점:

* 실수로 전역변수를 만드는 것이 불가능합니다.
* 암묵적으로 실패한 예외를 throw하지 못하는 할당을 만듭니다.
* 삭제할 수 없는 속성을 삭제하려고 시도합니다. (시도 효과가 없을 때까지)
* 함수의 매개변수 이름은 고유해야합니다.
* `this`는 전역 컨텍스트에서 undefined입니다.
* 예외를 발생시키는 몇가지 일반적인 코딩을 잡아냅니다.
* 헷갈리거나 잘 모르는 기능을 사용할수 없게 합니다.

단점 :

* 일부 개발자는 익숙하지 않은 기능이 많습니다.
* `function.caller`와 `function.arguments`에 더 이상 접근 할 수 없습니다.
* 서로 다른 엄격한 모드로 작성된 스크립트를 병합하면 문제가 발생할 수 있습니다.

전반적으로 장점이 단점보다 중요하다고 생각합니다. 엄격 모드가 차단하는 기능에 의존하지 않아도됩니다. 엄격한 모드를 사용하는 것을 추천합니다.

###### 참고자료

* <http://2ality.com/2011/10/strict-mode-hatred.html>
* <http://lucybain.com/blog/2014/js-use-strict/>

### 100까지 증가하면서 `3`의 배수에는 **"fizz"**를 출력하고, `5`의 배수에는 **"buzz"**를 출력하고, `3`과 `5`의 배수에는 **"fizzbuzz"**를 출력하는 for loop를 만드세요.

[Paul Irish](https://gist.github.com/jaysonrowe/1592432#gistcomment-790724)의 이 FizzBuzz를 확인해보세요.

```js
for (let i = 1; i <= 100; i++) {
  let f = i % 3 == 0,
    b = i % 5 == 0;
  console.log(f ? (b ? 'FizzBuzz' : 'Fizz') : b ? 'Buzz' : i);
}
```

저는 인터뷰 중에 위와 같이 쓰라고 조언하지는 않습니다. 길지만 분명한 접근 방식을 고수하십시오. FizzBuzz의 더 다양한 버전을 보려면 아래의 참조 링크를 확인하십시오.

###### 참고자료

* <https://gist.github.com/jaysonrowe/1592432>

### 일반적으로 웹 사이트의 전역 스코프를 그대로 두고 건드리지 않는 것이 좋은 이유는 무엇입니까?

모든 스크립트는 전역 스코프에 액세스할 수 있으며 모든 사람이 전역 네임스페이스를 사용하여 변수를 정의하면 충돌이 발생할 수 있습니다. 모듈 패턴 (IIFEs)을 사용하여 변수를 로컬 네임스페이스 내에 캡슐화하십시오.

### 왜 `load` 이벤트와 같은 것을 사용하나요? 이 이벤트에는 단점이 있나요? 다른 대안을 알고있나요? 알고있다면 왜 그것을 사용할건가요?

`load` 이벤트는 문서로딩 프로세스가 끝날 때 발생됩니다. 이 시점에서 문서의 모든 객체가 DOM에 있고, 모든 이미지, 스크립트, 링크 및 하위 프레임로딩이 완료됩니다.

DOM 이벤트 `DOMContentLoaded`는 페이지의 DOM이 생성 된 후에 발생하지만 다른 리소스가 로딩되기를 기다리지 않습니다. 이것은 초기화되기 전에 전체 페이지가 로드될 필요가없는 경우에 선호됩니다.

TODO.

###### 참고자료

* <https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload>

### single page app이 무엇인지 설명하고 SEO-friendly한 앱을 만드는 방법을 설명하십시오.

아래는 [Grab Front End Guide](https://github.com/grab/front-end-guide)에서 가져온 것이며, 우연히도 저를 위해 쓰여졌습니다!

웹 개발자는 요즘 웹 사이트가 아닌 웹 앱으로 제작한 제품을 언급합니다. 두 가지 용어 사이에는 엄격한 차이는 없지만 웹 앱은 대화형 및 동적인 경향이 있어 사용자가 작업을 수행하고 작업에 대한 응답을 받을 수 있습니다. 전통적으로, 브라우저는 서버에서 HTML을 받아 렌더링합니다. 사용자가 다른 URL로 이동하면 전체페이지 새로고침이 필요하며 서버는 새페이지에 대해 새 HTML을 보냅니다. 이를 server-side rendering이라고합니다.

그러나 현대 SPA에서는 대신 클라이언트 측 렌더링이 사용됩니다. 브라우저는 전체 애플리케이션에 필요한 스크립트(프레임워크, 라이브러리, 앱 코드) 및 스타일시트와 함께 서버의 초기 페이지를 로드합니다. 사용자가 다른 페이지로 이동하면 페이지 새로고침이 발생하지 않습니다. 페이지의 URL은 [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)를 통해 업데이트됩니다. 일반적으로 JSON 형식의 새 페이지에 필요한 새 데이터는 브라우저에서 [AJAX](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started) 요청을 통해 서버로 전송됩니다. SPA는 초기 페이지 로딩에서 미리 다운로드된 자바스크립트를 통해 페이지를 동적으로 업데이트합니다. 이 모델은 네이티브 모바일 앱의 작동 방식과 유사합니다.

장점들:

* 전체페이지 새로고침으로 인해 페이지탐색 사이에 하얀화면이 보이지 않아 앱이 더 반응적으로 느껴지게 됩니다.

* 동일한 애셋을 페이지로드마다 다시 다운로드 할 필요가 없으므로 서버에 대한 HTTP 요청이 줄어 듭니다.

* 클라이언트와 서버 사이의 고려해야할 부분을 명확하게 구분합니다. 서버 코드를 수정하지 않고도 다양한 플랫폼(예: 모바일, 채팅 봇, 스마트워치)에 맞는 새로운 클라이언트를 쉽게 구축 할 수 있습니다. 또한 API 계약이 깨지지 않는한 내에서 클라이언트와 서버에서 기술 스택을 독립적으로 수정할 수 있습니다.

단점들:

* 여러 페이지에 필요한 프레임워크, 앱 코드, 애셋로드로 인해 초기 페이지로드가 무거워집니다.

* 모든 요청을 단일 진입점으로 라우트하고 클라이언트 측 라우팅이 그 한곳에서 인계받을 수 있도록 서버를 구성하는 추가 단계가 수행되어야합니다.

* SPA는 콘텐츠를 렌더링하기 위해 JavaScript에 의존하지만 모든 검색 엔진이 크롤링 중에 JavaScript를 실행하지는 않으며 페이지에 빈 콘텐츠가 표시 될 수 있습니다. 이로 인해 의도치 않게 앱의 검색 엔진 최적화 (SEO)가 어려워집니다.

그러나 대부분의 경우 앱을 제작할 때 검색 엔진에서 모든 콘텐츠 색인할 필요는 없으므로 SEO가 가장 중요한 요소는 아닙니다. 이를 극복하기 위해, 앱을 서버 측 렌더링하거나 [Prerender](https://prerender.io/)와 같은 서비스를 사용하여 "브라우저에서 자바 스크립트를 렌더링하고, 정적 HTML을 저장한 다음, 크롤러에게 반환합니다".

###### 참고자료

* <https://github.com/grab/front-end-guide#single-page-apps-spas>
* <http://stackoverflow.com/questions/21862054/single-page-app-advantages-and-disadvantages>
* <http://blog.isquaredsoftware.com/presentations/2016-10-revolution-of-web-dev/>
* <https://medium.freecodecamp.com/heres-why-client-side-rendering-won-46a349fadb52>

### Promises 와/또는 Polyfill에 대한 당신의 경험은 어느 정도입니까?

Promise는 어느 시점에 resolve된 값 또는 resolve되지 않은 이유(예: 네트워크 오류가 발생) 중 하나의 값을 생성 할 수있는 객체입니다. promise는 fulfilled, rejected, pending 3가지 상태 중 하나일 수 있습니다. promise 사용자는 콜백을 붙여서 fulfill된 값이나 reject된 이유를 처리할 수 ​​있습니다.

일반적인 polyfill은 `$.deferred`, Q 와 Bluebird 입니다만, 모두가 스펙을 따르는 것은 아닙니다. ES2015는 즉시 사용할 수 있는 Promise를 지원하며 일반적으로 요즘 polyfill은 필요하지 않습니다.

###### 참고자료

* <https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261>

### What are the pros and cons of using Promises instead of callbacks?

**Pros**

* Avoid callback hell which can be unreadable.
* Makes it easy to write sequential asynchronous code that is readable with `.then()`.
* Makes it easy to write parallel asynchronous code with `Promise.all()`.

**Cons**

* Slightly more complex code (debatable).
* In older browsers where ES2015 is not supported, you need to load a polyfill in order to use it.

### What are some of the advantages/disadvantages of writing JavaScript code in a language that compiles to JavaScript?

Some examples of languages that compile to JavaScript include CoffeeScript, Elm, ClojureScript, PureScript and TypeScript.

Advantages:

* Fixes some of the longstanding problems in JavaScript and discourages JavaScript anti-patterns.
* Enables you to write shorter code, by providing some syntactic sugar on top of JavaScript, which I think ES5 lacks, but ES2015 is awesome.
* Static types are awesome (in the case of TypeScript) for large projects that need to be maintained over time.

Disadvantages:

* Require a build/compile process as browsers only run JavaScript and your code will need to be compiled into JavaScript before being served to browsers.
* Debugging can be a pain if your source maps do not map nicely to your pre-compiled source.
* Most developers are not familiar with these languages and will need to learn it. There's a ramp up cost involved for your team if you use it for your projects.
* Smaller community (depends on the language), which means resources, tutorials, libraries and tooling would be harder to find.
* IDE/editor support might be lacking.
* These languages will always be behind the latest JavaScript standard.
* Developers should be cognizant of what their code is being compiled to — because that is what would actually be running, and that is what matters in the end.

Practically, ES2015 has vastly improved JavaScript and made it much nicer to write. I don't really see the need for CoffeeScript these days.

###### References

* <https://softwareengineering.stackexchange.com/questions/72569/what-are-the-pros-and-cons-of-coffeescript>

### What tools and techniques do you use for debugging JavaScript code?

* React and Redux
  * [React Devtools](https://github.com/facebook/react-devtools)
  * [Redux Devtools](https://github.com/gaearon/redux-devtools)
* JavaScript
  * [Chrome Devtools](https://hackernoon.com/twelve-fancy-chrome-devtools-tips-dc1e39d10d9d)
  * `debugger` statement
  * Good old `console.log` debugging

###### References

* <https://hackernoon.com/twelve-fancy-chrome-devtools-tips-dc1e39d10d9d>
* <https://raygun.com/blog/javascript-debugging/>

### What language constructions do you use for iterating over object properties and array items?

For objects:

* `for` loops - `for (var property in obj) { console.log(property); }`. However, this will also iterate through its inherited properties, and you will add an `obj.hasOwnProperty(property)` check before using it.
* `Object.keys()` - `Object.keys(obj).forEach(function (property) { ... })`. `Object.keys()` is a static method that will lists all enumerable properties of the object that you pass it.
* `Object.getOwnPropertyNames()` - `Object.getOwnPropertyNames(obj).forEach(function (property) { ... })`. `Object.getOwnPropertyNames()` is a static method that will lists all enumerable and non-enumerable properties of the object that you pass it.

For arrays:

* `for` loops - `for (var i = 0; i < arr.length; i++)`. The common pitfall here is that `var` is in the function scope and not the block scope and most of the time you would want block scoped iterator variable. ES2015 introduces `let` which has block scope and it is recommended to use that instead. So this becomes: `for (let i = 0; i < arr.length; i++)`.
* `forEach` - `arr.forEach(function (el, index) { ... })`. This construct can be more convenient at times because you do not have to use the `index` if all you need is the array elements. There are also the `every` and `some` methods which will allow you to terminate the iteration early.

Most of the time, I would prefer the `.forEach` method, but it really depends on what you are trying to do. `for` loops allow more flexibility, such as prematurely terminate the loop using `break` or incrementing the iterator more than once per loop.

### Explain the difference between mutable and immutable objects.

* What is an example of an immutable object in JavaScript?
* What are the pros and cons of immutability?
* How can you achieve immutability in your own code?

TODO

### Explain the difference between synchronous and asynchronous functions.

Synchronous functions are blocking while asynchronous functions are not. In synchronous functions, statements complete before the next statement is run. In this case the program is evaluated exactly in order of the statements and execution of the program is paused if one of the statements take a very long time.

Asynchronous functions usually accept a callback as a parameter and execution continues on the next line immediately after the asynchronous function is invoked. The callback is only invoked when the asynchronous operation is complete and the call stack is empty. Heavy duty operations such as loading data from a web server or querying a database should be done asynchronously so that the main thread can continue executing other operations instead of blocking until that long operation to complete (in the case of browsers, the UI will freeze).

### What is event loop? What is the difference between call stack and task queue?

The event loop is a single-threaded loop that monitors the call stack and checks if there is any work to be done in the task queue. If the call stack is empty and there are callback functions in the task queue, a function is dequeued and pushed onto the call stack to be executed.

If you haven't already checked out Philip Robert's [talk on the Event Loop](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html), you should. It is one of the most viewed videos on JavaScript.

###### References

* <https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html>
* <http://theproactiveprogrammer.com/javascript/the-javascript-event-loop-a-stack-and-a-queue/>

### Explain the differences on the usage of `foo` between `function foo() {}` and `var foo = function() {}`

The former is a function declaration while the latter is a function expression. The key difference is that function declarations have its body hoisted but the bodies of function expressions are not (they have the same hoisting behaviour as variables). For more explanation on hoisting, refer to the question above on hoisting. If you try to invoke a function expression before it is defined, you will get an `Uncaught TypeError: XXX is not a function` error.

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

* <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function>

### What are the differences between variables created using `let`, `var` or `const`?

Variables declared using the `var` keyword are scoped to the function in which they are created, or if created outside of any function, to the global object. `let` and `const` are _block scoped_, meaning they are only accessible within the nearest set of curly braces (function, if-else block, or for-loop).

```js
function foo() {
  // All variables are accessible within functions
  var bar = 'bar';
  let baz = 'baz';
  const qux = 'qux';

  console.log(bar); // "bar"
  console.log(baz); // "baz"
  console.log(qux); // "qux"
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

// var declared variables are accessible anywhere in the function scope
console.log(bar); // "bar"
// let and const defined variables are not accessible outside of the block they were defined in
console.log(baz); // ReferenceError: baz is not defined
console.log(qux); // ReferenceError: qux is not defined
```

`var` allows variables to be hoisted, meaning they can be referenced in code before they are declared. `let` and `const` will not allow this, instead throwing an error.

```js
console.log(foo); // undefined

var foo = 'foo';

console.log(baz); // ReferenceError: can't access lexical declaration `baz' before initialization

let baz = 'baz';

console.log(bar); // ReferenceError: can't access lexical declaration `bar' before initialization

const bar = 'bar';
```

Redeclaring a variable with `var` will not throw an error, but 'let' and 'const' will.

```js
var foo = 'foo';
var foo = 'bar';
console.log(foo); // "bar"

let baz = 'baz';
let baz = 'qux'; // SyntaxError: redeclaration of let baz
```

`let` and `const` differ in that `let` allows reassigning the variable's value while `const` does not.

```js
// this is fine
let foo = 'foo';
foo = 'bar';

// this causes an exception
const baz = 'baz';
baz = 'qux';
```

###### References

* <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let>
* <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var>
* <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const>

### What are the differences between ES6 class and ES5 function constructors?

TODO

### Can you offer a use case for the new arrow => function syntax? How does this new syntax differ from other functions?

TODO

### What advantage is there for using the arrow syntax for a method in a constructor?

TODO

### What is the definition of a higher-order function?

A higher-order function is any function that takes another function as a parameter, which it uses to operate on some data, or returns a function as a result. Higher-order functions are meant to abstract some operation that is performed repeatedly. The classic example of this is `map`, which takes an array and a function as arguments. `map` then uses this function to transform each item in the array, returning a new array with the transformed data. Other popular examples in JavaScript are `forEach`, `filter`, and `reduce`. A higher-order function doesn't just need to be manipulating arrays as there are many use cases for returning a function from another function. `Array.prototype.bind` is one such example in JavaScript.

##### Map

Let say we have an array of names which we need to transform each element to uppercase string.

`const names = ['irish', 'daisy', 'anna']`;

The imperative way will be like:

```js
const transformNamesToUppercase = names => {
  const results = [];
  for (let i = 0; i < names.length; i++) {
    results.push(names[i].toUpperCase());
  }
  return results;
};
transformNamesToUppercase(names); // ['IRISH', 'DAISY', 'ANNA']
```

Use `.map(transformerFn)` to become more simplified, easy to reason about and declarative.

```js
const transformNamesToUppercase = names =>
  names.map(name => name.toUpperCase());
transformNamesToUppercase(names); // ['IRISH', 'DAISY', 'ANNA']
```

##### Filter

We want to filter all names which their initial character starts with **i**.

The imperative way will be like:

```js
const filterNames = names => {
  const results = [];
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    if (name.startsWith('i')) {
      results.push(name);
    }
  }
  return results;
};
filterNames(names); // ['IRISH']
```

Instead using `for loop`, use `.filter(predicateFn)` to look more declarative.

```js
const filterNames = names => names.filter(name => name.startsWith('i'));
filterNames(names); // ['IRISH']
```

##### Reduce

Sum all the values of an array

`const numbers = [1,2,3,4,5];`

Imperative way:

```js
const sumOfNumbers = numbers => {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
};
sumOfNumbers(numbers); // 15
```

More declarative using `.reduce(reducerFn)`:

```js
const sumOfNumbers = numbers =>
  numbers.reduce((total, number) => (total += number), 0);
sumOfNumbers(numbers); // 15
```

Use **higher-order function** to make your code easy to reason about and improve the quality of your code. This became your code more **declarative** instead imperative, say **what you want done** not **how to do it**.

###### References

* <https://medium.com/javascript-scene/higher-order-functions-composing-software-5365cf2cbe99>
* <https://hackernoon.com/effective-functional-javascript-first-class-and-higher-order-functions-713fde8df50a>
* <https://eloquentjavascript.net/05_higher_order.html>

### Can you give an example for destructuring an object or an array?

TODO

### ES6 Template Literals offer a lot of flexibility in generating strings, can you give an example?

TODO

### Can you give an example of a curry function and why this syntax offers an advantage?

Currying is a pattern where a function with more than one parameter is broken into multiple functions that, when called in series, will accumulate all of the required parameters one at a time. This technique can be useful for making code written in a functional style easier to read and compose. It's important to note that for a function to be curried, it needs to start out as one function, then broken out into a sequence of functions that each take one parameter.

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

* <https://hackernoon.com/currying-in-js-d9ddc64f162e>

### What are the benefits of using spread syntax and how is it different from rest syntax?

ES6's spread syntax is very useful when coding in a functional paradigm as we can easily create copies of arrays or objects without resorting to `Object.create`, `slice`, or a library function. This language feature gets a lot of use in projects using Redux or RX.js.

```js
function putDookieInAnyArray(arr) {
  return [...arr, 'dookie'];
}

var result = putDookieInAnyArray(['I', 'really', "don't", 'like']); // ["I", "really", "don't", "like", "dookie"]

var person = {
  name: 'Todd',
  age: 29
};

var copyOfTodd = { ...person };
```

ES6's rest syntax offers a shorthand for including an arbitrary number of arguments to be passed to a function. It is like an inverse of the spread syntax, taking data and stuffing it into an array rather than upacking an array of data, but it only works in function arguments.

```js
function addFiveToABunchOfNumbers(...numbers) {
  return numbers.map(x => x + 5);
}

var result = addFiveToABunchOfNumbers(4, 5, 6, 7, 8, 9, 10); // [9, 10, 11, 12, 13, 14, 15]
```

###### References

* <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax>
* <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters>

### How can you share code between files?

TODO

### Why you might want to create static class members?

TODO

### Other Answers

* <http://flowerszhong.github.io/2013/11/20/javascript-questions.html>

## Related

If you are interested in how data structures are implemented, check out [Lago](https://github.com/yangshun/lago), a Data Structures and Algorithms library for JavaScript. It is pretty much still WIP but I intend to make it into a library that is able to be used in production and also a reference resource for revising Data Structures and Algorithms.

## Contributing

Feel free to make pull requests to correct any mistakes in the answers or suggest new questions.

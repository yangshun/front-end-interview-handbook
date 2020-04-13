---
title: JavaScript 질문
---

[프론트엔드 면접 질문 - JS 질문](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/src/questions/css-questions.md)에 대한 해설입니다. Pull Request를 통한 제안, 수정 요청 환영합니다.

## 목차

- [이벤트 위임에 대해 설명하세요.](#이벤트-위임에-대해-설명하세요)
- [`this`가 JavaScript에서 어떻게 작동하는지 설명하세요.](#this가-javascript에서-어떻게-작동하는지-설명하세요)
- [프로토타입 상속이 어떻게 작동하는지 설명하세요.](#프로토타입-상속이-어떻게-작동하는지-설명하세요)
- [AMD vs CommonJS에 대해 어떻게 생각하나요?](#amd-vs-commonjs에-대해-어떻게-생각하나요)
- [다음이 IIFE로 작동하지 않는 이유를 설명하세요: `function foo(){ }();`를 IIFE로 만들기 위해서는 무엇을 바꿔야하나요?](#다음이-iife로-작동하지-않는-이유를-설명하세요-function-foo-를-iife로-만들기-위해서는-무엇을-바꿔야하나요)
- [`null`, `undefined`, `undeclared`의 차이점은 무엇인가요? 어떻게 이 상태들에 대한 확인을 할 것인가요?](#null-undefined-undeclared의-차이점은-무엇인가요-어떻게-이-상태들에-대한-확인을-할-것인가요)
- [클로저는 무엇이며, 어떻게/왜 사용하나요?](#클로저는-무엇이며-어떻게왜-사용하나요)
- [`.forEach` 루프와 `.map()` 루프 사이의 주요 차이점을 설명할 수 있나요? 왜 둘 중 하나를 선택할 것인가요?](#foreach-루프와-map-루프-사이의-주요-차이점을-설명할-수-있나요-왜-둘-중-하나를-선택할-것인가요)
- [익명 함수의 일반적인 사용 사례는 무엇인가요?](#익명-함수의-일반적인-사용-사례는-무엇인가요)
- [코드를 어떻게 구성하나요? (모듈 패턴, 고전적인 상속?)](#코드를-어떻게-구성하나요-모듈-패턴-고전적인-상속)
- [호스트 객체와 내장 객체의 차이점은 무엇인가요?](#호스트-객체와-내장-객체의-차이점은-무엇인가요)
- [`function Person(){}`, `var person = Person()`, `var person = new Person()`의 차이점은 무엇인가요?](#function-person-var-person--person-var-person--new-person의-차이점은-무엇인가요)
- [`.call`과 `.apply`의 차이점은 무엇인가요?](#call과-apply의-차이점은-무엇인가요)
- [`Function.prototype.bind`에 대해 설명하세요.](#functionprototypebind에-대해-설명하세요)
- [언제 `document.write()`를 사용하나요?](#언제-documentwrite를-사용하나요)
- [Feature detection, Feature inference, UA String의 차이점은 무엇인가요?](#feature-detection-feature-inference-ua-string의-차이점은-무엇인가요)
- [Ajax에 대해 가능한 한 자세히 설명하세요.](#ajax에-대해-가능한-한-자세히-설명하세요)
- [Ajax를 사용하는 것의 장단점은 무엇인가요?](#ajax를-사용하는-것의-장단점은-무엇인가요)
- [JSONP가 어떻게 동작하는지(그리고 Ajax와 어떻게 다른지)를 설명하세요.](#jsonp가-어떻게-동작하는지그리고-ajax와-어떻게-다른지를-설명하세요)
- [JavaScript 템플릿을 사용한 적이 있나요? 사용해봤다면, 어떤 라이브러리를 사용했나요?](#JavaScript-템플릿을-사용한-적이-있나요-사용해봤다면-어떤-라이브러리를-사용했나요)
- [`호이스팅`에 대해 설명하세요.](#호이스팅에-대해-설명하세요)
- [event bubbling에 대해 설명하세요.](#event-bubbling에-대해-설명하세요)
- ["attribute"와 "property"의 차이점은 무엇인가요?](#attribute와-property의-차이점은-무엇인가요)
- [내장 JavaScript 객체를 확장하는 것이 좋은 생각이 아닌 이유는 무엇인가요?](#내장-javascript-객체를-확장하는-것이-좋은-생각이-아닌-이유는-무엇인가요)
- [document `load` 이벤트와 document `DOMContentLoaded` 이벤트의 차이점은 무엇인가요?](#document-load-이벤트와-document-domcontentloaded-이벤트의-차이점은-무엇인가요)
- [`==`와 `===`의 차이점은 무엇인가요?](#와-의-차이점은-무엇인가요)
- [JavaScript와 관련하여 same-origin 정책을 설명하세요.](#javascript와-관련하여-same-origin-정책을-설명하세요)
- [다음이 작동하게 만들어보세요.](#다음이-작동하게-만들어보세요)
- [왜 Ternary expression이라고 부르고, "Ternary"라는 단어는 무엇을 나타내나요?](#왜-ternary-expression이라고-부르고-ternary라는-단어는-무엇을-나타내나요)
- [`"use strict";` 이 무엇인가요? 사용시 장단점이 무엇인가요?](#use-strict-이-무엇인가요-사용시-장단점이-무엇인가요)
- [100까지 증가하면서 `3`의 배수에는 `fizz`를 출력하고, `5`의 배수에는 `buzz`를 출력하고, `3`과 `5`의 배수에는 `fizzbuzz`를 출력하는 for loop를 만드세요.](#100까지-증가하면서-3의-배수에는-fizz를-출력하고-5의-배수에는-buzz를-출력하고-3과-5의-배수에는-fizzbuzz를-출력하는-for-loop를-만드세요)
- [일반적으로 웹 사이트의 전역 스코프를 그대로 두고 건드리지 않는 것이 좋은 이유는 무엇인가요?](#일반적으로-웹-사이트의-전역-스코프를-그대로-두고-건드리지-않는-것이-좋은-이유는-무엇인가요)
- [왜 `load` 이벤트와 같은 것을 사용하나요? 이 이벤트에는 단점이 있나요? 다른 대안을 알고 있나요? 알고 있다면 왜 그것을 사용할 건가요?](#왜-load-이벤트와-같은-것을-사용하나요-이-이벤트에는-단점이-있나요-다른-대안을-알고-있나요-알고-있다면-왜-그것을-사용할-건가요)
- [single page app이 무엇인지 설명하고 SEO-friendly하게 만드는 방법을 설명하세요.](#single-page-app이-무엇인지-설명하고-seo-friendly하게-만드는-방법을-설명하세요)
- [Promises와 그 Polyfill에 대한 당신의 경험은 어느 정도인가요?](#promises와-그-polyfill에-대한-당신의-경험은-어느-정도인가요)
- [Callback 대신에 Promise를 사용할 때의 장점과 단점은 무엇인가요?](#callback-대신에-promise를-사용할-때의-장점과-단점은-무엇인가요)
- [JavaScript로 컴파일되는 언어로 JavaScript 코드를 작성하는 경우의 장단점은 무엇인가요?](#javascript로-컴파일되는-언어로-javascript-코드를-작성하는-경우의-장단점은-무엇인가요)
- [JavaScript 코드를 디버깅하기 위해 어떤 도구와 기술을 사용하나요?](#javascript-코드를-디버깅하기-위해-어떤-도구와-기술을-사용하나요)
- [오브젝트 속성이나 배열 항목을 반복할 때 사용하는 언어 구문은 무엇인가요?](#오브젝트-속성이나-배열-항목을-반복할-때-사용하는-언어-구문은-무엇인가요)
- [mutable 객체와 immutable 객체 사이의 차이점을 설명하세요.](#mutable-객체와-immutable-객체-사이의-차이점을-설명하세요)
- [동기, 비동기 함수의 차이점을 설명하세요.](#동기-비동기-함수의-차이점을-설명하세요)
- [이벤트 루프란 무엇인가요? 콜 스택과 태스크 큐의 차이점은 무엇인가요?](#이벤트-루프란-무엇인가요-콜-스택과-태스크-큐의-차이점은-무엇인가요)
- [`function foo() {}`와 `var foo = function() {}` 사이에서 `foo` 사용의 차이에 대해 설명하세요.](#function-foo-와-var-foo--function--사이에서-foo-사용법의-차이에-대해-설명하세요)
- [`let`, `var`, `const`를 사용하여 생성된 변수들의 차이점은 무엇인가요?](#let-var-const를-사용하여-생성된-변수들의-차이점은-무엇인가요)
- [ES6 클래스와 ES5 함수 생성자의 차이점은 무엇인가요?](#es6-클래스와-es5-함수-생성자의-차이점은-무엇인가요)
- [새 화살표 => 함수 문법에 대한 사용 예시를 들 수 있나요? 이 새로운 문법은 다른 함수와 어떻게 다른가요?](#새-화살표--함수-문법에-대한-사용-예시를-들-수-있나요-이-새로운-문법은-다른-함수와-어떻게-다른가요)
- [생성자의 메서드에 화살표 문법을 사용하면 어떤 이점이 있나요?](#생성자의-메서드에-화살표-문법을-사용하면-어떤-이점이-있나요)
- [고차 함수(higher-order function)의 정의는 무엇인가요?](#고차-함수higher-order-function의-정의는-무엇인가요)
- [객체나 배열에 대한 디스트럭쳐링 예시를 들 수 있나요?](#객체나-배열에-대한-디스트럭쳐링-예시를-들-수-있나요)
- [ES6 템플릿 리터럴은 문자열을 생성하는데 많은 유연성을 제공합니다. 이에 대한 예를 들 수 있나요?](#es6-템플릿-리터럴은-문자열을-생성하는데-많은-유연성을-제공합니다-이에-대한-예를-들-수-있나요)
- [curry 함수의 예를 들어 줄 수 있나요? 그리고 이 문법은 어떤 이점을 가지고 있나요?](#curry-함수의-예를-들어-줄-수-있나요-그리고-이-문법은-어떤-이점을-가지고-있나요)
- [spread 문법을 사용할 때의 이점은 무엇이며 rest 문법과 다른 점은 무엇인가요?](#spread-문법을-사용할-때의-이점은-무엇이며-rest-문법과-다른-점은-무엇인가요)
- [파일 간에 코드를 공유하려면 어떻게 해야하나요?](#파일-간에-코드를-공유하려면-어떻게-해야하나요)
- [정적 클래스 멤버를 만드는 이유는 무엇인가요?](#정적-클래스-멤버를-만드는-이유는-무엇인가요)

### 이벤트 위임에 대해 설명하세요.

이벤트 위임은 이벤트 리스너를 하위 요소에 추가하는 대신 상위 요소에 추가하는 기법입니다. 리스너는 DOM의 event bubbling으로 인해 하위 요소에서 이벤트가 발생될 때마다 실행됩니다. 이 기술의 이점은 다음과 같습니다.

- 각 하위 항목에 이벤트 핸들러를 연결하지 않고, 상위 요소에 하나의 단일 핸들러만 필요하기 때문에 메모리 사용 공간이 줄어듭니다.
- 제거된 요소에서 핸들러를 해제하고 새 요소에 대해 이벤트를 바인딩할 필요가 없습니다.

###### 참고자료

- https://davidwalsh.name/event-delegate
- https://stackoverflow.com/questions/1687296/what-is-dom-event-delegation

[[↑] Back to top](#목차)

### `this`가 JavaScript에서 어떻게 작동하는지 설명하세요.

`this`는 간단하게 설명하기 어렵습니다. JavaScript에서 가장 혼란스러운 개념 중 하나입니다. 대략 설명하면 `this`의 값은 함수가 호출되는 방식에 따라 달라집니다. 온라인에 많은 설명을 읽었는데, [Arnav Aggrawal](https://medium.com/@arnav_aggarwal)의 설명이 가장 명확했습니다. 다음 규칙과 같습니다.

1.  함수를 호출할 때 `new` 키워드를 사용하는 경우, 함수 내부에 있는 `this`는 완전히 새로운 객체입니다.
2.  `apply`, `call`, `bind`가 함수의 호출/생성에 사용되는 경우, 함수 내의 `this`는 인수로 전달된 객체입니다.
3.  `obj.method()`와 같이 함수를 메서드로 호출하는 경우, `this`는 함수가 프로퍼티인 객체입니다.
4.  함수가 자유함수로 호출되는 경우, 즉, 위의 조건 없이 호출되는 경우 `this`는 전역 객체입니다. 브라우저에서는 `window` 객체입니다. 엄격 모드(`'use strict'`) 일 경우, `this`는 전역 객체 대신 `undefined`가 됩니다.
5.  위의 규칙 중 다수가 적용되면 더 상위 규칙이 승리하고 `this`값을 설정합니다.
6.  함수가 ES2015 화살표 함수인 경우 위의 모든 규칙을 무시하고 생성된 시점에서 주변 스코프의 `this`값을 받습니다.

상세한 설명은 [Medium의 글](https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3)을 참조하세요.

###### References

- https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3
- https://stackoverflow.com/a/3127440/1751946

[[↑] Back to top](#목차)

### 프로토타입 상속이 어떻게 작동하는지 설명하세요.

이는 매우 일반적인 JavaScript 인터뷰 질문입니다. 모든 JavaScript 객체는 다른 객체에 대한 참조인 `__proto__` 프로퍼티를 가지고 있습니다. 객체의 프로퍼티에 접근할 때, 해당 객체에 해당 프로퍼티가 없으면 JavaScript 엔진은 객체의 `__proto__`과 `__proto__`의 `__proto__`등을 보고 프로퍼티 정의가 있을 때까지 찾고, 만약 객체의 프로퍼티에 접근할 때 해당 객체에 해당 프로퍼티가 없으면 프로토타입 체인 중 하나에 있거나 프로토타입 체인의 끝에 도달할 때까지 찾습니다. 이 동작은 고전적인 상속을 흉내내지만, 실제로 [상속보다 위임](https://davidwalsh.name/javascript-objects)에 더 가깝습니다.

###### 참고자료

- https://www.quora.com/What-is-prototypal-inheritance/answer/Kyle-Simpson
- https://davidwalsh.name/javascript-objects

[[↑] Back to top](#목차)

### AMD vs CommonJS에 대해 어떻게 생각하나요?

두 가지 모두 ES2015가 등장하기 전까지 JavaScript에 기본적으로 존재하지 않는 모듈 시스템을 구현하는 방법입니다. CommonJS는 동기식인 반면 AMD(Asynchronous Module Definition - 비동기식 모듈 정의)는 분명히 비동기식입니다. CommonJS는 서버사이드 개발을 염두에 두고 설계되었으며, AMD는 모듈의 비동기 로딩을 지원하므로 브라우저용으로 더 많이 사용됩니다.

AMD은 구문이 매우 장황하고, CommonJS은 다른 언어처럼 import 문을 작성하는 스타일에 더 가깝습니다. 대부분의 경우 AMD를 필요로 하지 않습니다. 모든 JavaScript를 연결된 하나의 번들 파일로 제공하면 비동기 로딩 속성의 이점을 누릴 수 없기 때문입니다. 또한 CommonJS 구문은 모듈 작성의 노드 스타일에 가깝고 클라이언트 사이드와 서버사이드 JavaScript 개발 사이를 전환할 때 문맥 전환 오버 헤드가 적습니다.

ES2015 모듈이 동기식 및 비동기식 로딩을 모두 지원하는 것이 반가운 것은 마침내 하나의 접근 방식만 고수할 수 있다는 점입니다. 브라우저와 노드에서 완전히 작동되지는 않지만, 언제나 트랜스파일러를 사용하여 코드를 변환할 수 있습니다.

###### 참고자료

- https://auth0.com/blog/javascript-module-systems-showdown/
- https://stackoverflow.com/questions/16521471/relation-between-commonjs-amd-and-requirejs

[[↑] Back to top](#목차)

### 다음이 IIFE로 작동하지 않는 이유를 설명하세요: `function foo(){ }();`를 IIFE로 만들기 위해서는 무엇을 바꿔야하나요?

IIFE는 즉시 함수 호출 표현식(Immediately Invoked Function Expressions)을 의미합니다. JavaScript parser는 `function foo(){ }();`을 `function foo(){ }`와 `();`로 읽습니다. 전자는 **함수 선언**이며 후자(한 쌍의 중괄호)는 함수를 호출하려고 시도했지만, 이름이 지정되지 않았기 때문에 `Uncaught SyntaxError : Unexpected token )`을 발생시킵니다.

괄호를 추가하여 고치는 두 가지 방법이 있습니다: `(function foo(){ })()` 그리고 `(function foo(){ }())`. `function`으로 시작하는 문은 **함수 선언**으로 간주됩니다. 이 함수를 `()`로 묶으면 **함수 식**이 되고, 이렇게하면 다음 `()`로 함수를 실행할 수 있습니다. 이러한 함수는 전역 범위에 노출되지 않으며, 본문 내에서 이 함수 자체를 참조할 필요가 없는 경우에는 해당 함수의 이름을 생략할 수도 있습니다.

`void function foo(){ }();`처럼 `void` 연산자를 사용할 수도 있습니다. 불행히도, 이러한 접근방식에는 한 가지 문제가 있습니다. 주어진 표현식의 평가는 항상 `undefined`이므로, IIFE 함수가 무언가를 반환하면, 사용할 수 없습니다. 예:

```js
// Don't add JS syntax to this code block to prevent Prettier from formatting it.
const foo = void (function bar() {
  return 'foo';
})();

console.log(foo); // undefined
```

###### 참고자료

- http://lucybain.com/blog/2014/immediately-invoked-function-expression/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void

[[↑] Back to top](#목차)

### `null`, `undefined`, `undeclared`의 차이점은 무엇인가요? 어떻게 이 상태들에 대한 확인을 할 것인가요?

**Undeclared** 변수는 이전에 `var`, `let`, `const`를 사용하여 생성되지 않은 식별자에 값을 할당할 때 생성됩니다. `Undeclared` 변수는 현재 범위 외부에 전역으로 정의됩니다. strict 모드에서는 `Undeclared` 변수에 할당하려고 할 때, `ReferenceError`가 발생합니다. `Undeclared` 변수는 전역 변수처럼 좋지 않습니다. 이것들은 모두 사용을 피하세요! 이를 검사하려면, 사용할 때 `try`/`catch` 블록에 감싸세요.

```js
function foo() {
  x = 1; // strict 모드에서 ReferenceError를 발생시킵니다.
}

foo();
console.log(x); // 1
```

`undefined` 변수는 선언되었지만, 값이 할당되지 않은 변수입니다. 이는 `undefined` 타입입니다. 함수가 실행 결과에 따라 아무값도 반환하지 않으면, 변수에 할당되며, 그 변수가 `undefined` 값을 갖습니다. 이를 검사하기 위해, 엄격한 (`===`) 연산자 또는 `typeof`에 `undefined` 문자열을 사용하여 비교하세요. 확인을 위해 추상 평등 연산자(`==`)를 사용해서는 안되며, 이는 값이 `null`이면 `true`를 반환합니다.

```js
var foo;
console.log(foo); // undefined
console.log(foo === undefined); // true
console.log(typeof foo === 'undefined'); // true

console.log(foo == null); // true. 옳지않습니다. 이렇게 사용하지 마세요.

function bar() {}
var baz = bar();
console.log(baz); // undefined
```

`null`인 변수는 `null` 값이 명시적으로 할당된 것입니다. 그것은 값을 나타내지 않으며, 명시적으로 할당됐다는 점에서 `undefined`와 다릅니다. `null`을 체크하기 위해서 단순히 완전 항등 연산자(`===`)를 사용하여 비교하면 됩니다. 위와 같이, 추상 평등 연산자 (`==`)를 사용해서는 안되며, 값이 `undefined`이면 `true`를 반환합니다.

```js
var foo = null;
console.log(foo === null); // true

console.log(foo == undefined); // true. 옳지않습니다. 이렇게 사용하지 마세요.
```

개인적 습관으로, 저는 변수를 선언하지 않거나(undeclared) 할당하지 않은 상태(unassigned)로 두지 않습니다. 아직 사용하지 않으려는 경우, 선언한 후에 명시적으로 `null`을 할당할 것입니다. 작업시 linter를 사용하면, 일반적으로 Undeclared 변수를 참조하지는 않는지 확인할 수 있습니다.

###### 참고자료

- https://stackoverflow.com/questions/15985875/effect-of-declared-and-undeclared-variables
- https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined

[[↑] Back to top](#목차)

### 클로저는 무엇이며, 어떻게/왜 사용하나요?

클로저는 함수와 그 함수가 선언된 렉시컬 환경의 조합입니다. "렉시컬"은 렉시컬 범위 지정이 변수가 사용 가능한 위치를 결정하기 위해 소스 코드 내에서 변수가 선언된 위치를 사용한다는 사실을 나타냅니다. 클로저는 외부 함수가 반환된 후에도 외부 함수의 변수 범위 체인에 접근할 수 있는 함수입니다.

**왜 클로저를 사용합니까?**

- 클로저로 데이터 프라이버시 / private method를 모방. 일반적으로 [모듈 패턴](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)에 사용됩니다.
- [부분 적용 또는 currying](https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8#.l4b6l1i3x).

###### 참고자료

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
- https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36

[[↑] Back to top](#목차)

### `.forEach` 루프와 `.map()` 루프 사이의 주요 차이점을 설명할 수 있나요? 왜 둘 중 하나를 선택할 것인가요?

이 두 함수의 차이점을 이해하기 위해 각 함수가 무엇을 하는지 살펴보겠습니다.

**`forEach`**

- 배열의 요소를 반복합니다.
- 각 요소에 대해 콜백을 실행합니다.
- 값을 반환하지 않습니다.

```js
const a = [1, 2, 3];
const doubled = a.forEach((num, index) => {
  // num나 index로 무언가 합니다.
});

// doubled = undefined
```

**`map`**

- 배열의 요소를 반복합니다.
- 각 요소에서 함수를 호출하여 결과로 새 배열을 작성하여 각 요소를 새 요소에 매핑합니다.

```js
const a = [1, 2, 3];
const doubled = a.map((num) => {
  return num * 2;
});

// doubled = [2, 4, 6]
```

`.forEach`와 `.map()`의 가장 큰 차이점은 `.map()`이 새로운 배열을 반환한다는 것입니다. 결과가 필요하지만 원본 배열을 변경하고 싶지 않으면, `.map()`이 확실한 선택입니다. 단순히 배열을 반복할 필요가 있다면, `forEach`가 좋은 선택입니다.

###### 참고자료

- https://codeburst.io/javascript-map-vs-foreach-f38111822c0f

[[↑] Back to top](#목차)

### 익명 함수의 일반적인 사용 사례는 무엇인가요?

익명함수는 IIFE로 사용되어 지역 범위 내에서 일부 코드를 캡슐화하므로 선언된 변수가 전역 범위로 누출되지 않습니다.

```js
(function () {
  // 코드
})();
```

한 번 사용되고 다른 곳에서는 사용할 필요가 없는 콜백으로 사용됩니다. 함수 본체를 찾기 위해 다른 곳을 찾아볼 필요 없이 코드를 호출하는 코드 바로 안에 핸들러가 정의되어 있으면 코드가 보다 독립적이고 읽기 쉽게 보일 것입니다.

```js
setTimeout(function () {
  console.log('Hello world!');
}, 1000);
```

함수형 프로그래밍 또는 Lodash에 대한 인수(콜백과 유사)로 사용.

```js
const arr = [1, 2, 3];
const double = arr.map(function (el) {
  return el * 2;
});
console.log(double); // [2, 4, 6]
```

###### 참고자료

- https://www.quora.com/What-is-a-typical-usecase-for-anonymous-functions
- https://stackoverflow.com/questions/10273185/what-are-the-benefits-to-using-anonymous-functions-instead-of-named-functions-fo

[[↑] Back to top](#목차)

### 코드를 어떻게 구성하나요? (모듈 패턴, 고전적인 상속?)

과거에는 Backbone 모델을 만들고 그 모델에 메소드를 연결하는 등 OOP 접근 방식을 장려하는 모델에 Backbone 을 사용했습니다.

모듈 패턴은 여전히​​ 훌륭하지만, 요즘에는 React/Redux 기반의 Flux 아키텍처를 사용합니다. 이 아키텍처는 단방향 프로그래밍 방식을 권장합니다. 저는 평범한 객체를 사용하여 응용 프로그램의 모델을 표현하고 이러한 객체를 조작하는 유틸리티 순수 함수를 작성합니다. 상태는 다른 Redux 응용 프로그램에서와 마찬가지로 action 및 reducer를 사용하여 조작됩니다.

가능한 경우 고전적인 상속을 사용하지 않습니다. 저는 [이 규칙들](https://medium.com/@dan_abramov/how-to-use-classes-and-sleep-at-night-9af8de78ccb4)을 유지합니다.

[[↑] Back to top](#목차)

### 호스트 객체와 내장 객체의 차이점은 무엇인가요?

내장 객체는 ECMAScript 사양에 정의된 JavaScript 언어의 일부인 객체입니다. (예: `String`, `Math`, `RegExp`, `Object`, `Function` 등)

호스트 객체는 `window`, `XMLHTTPRequest` 등과 같이 런타임 환경 (브라우저 or 노드)에 의해 제공됩니다.

###### 참고자료

- https://stackoverflow.com/questions/7614317/what-is-the-difference-between-native-objects-and-host-objects

[[↑] Back to top](#목차)

### `function Person(){}`, `var person = Person()`, `var person = new Person()`의 차이점은 무엇인가요?

이 질문은 굉장해 애매합니다. 질문의 의도에 대한 저의 최선의 추측은 JavaScript의 생성자에 대해 묻는 것입니다. 엄밀히 말하면, `function Person(){}`은 정상적인 함수 선언일 뿐입니다. 이 컨벤션은 함수생성자로 사용하기 위해 함수이름에 PascalCase를 사용합니다.

`var person = Person()`은 생성자가 아니며 `Person`을 함수로 호출합니다. 함수를 생성자로 사용하려는 경우에 이렇게 호출하는 것은 일반적인 실수입니다. 일반적으로 생성자는 아무것도 반환하지 않으므로 일반 함수처럼 생성자를 호출하면 `undefined`가 반환되고 지정된 변수에 할당됩니다.

`var person = new Person()`은 `Person.prototype`을 상속받은 `new` 연산자를 사용하여 `Person` 객체의 인스턴스를 생성합니다. 또 다른 방법은 `Object.create`를 사용하는 것입니다: `Object.create(Person.prototype)`.

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

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new

[[↑] Back to top](#목차)

### `.call`과 `.apply`의 차이점은 무엇인가요?

`.call`과 `.apply`는 모두 함수를 호출하는데 사용되며, 첫 번째 매개변수는 함수 내에서 `this`의 값으로 사용됩니다. 그러나 `.call`은 쉼표로 구분된 인수를 두 번째 인수로 취하고 `.apply`는 인수의 배열을 두 번째 인수로 취합니다. `call`은 `C`: `Comma` 로 구분되며, `apply`는 인수 배열인 `A`: `arguments` 라고 기억하면 쉽습니다.

```js
function add(a, b) {
  return a + b;
}

console.log(add.call(null, 1, 2)); // 3
console.log(add.apply(null, [1, 2])); // 3
```

[[↑] Back to top](#목차)

### `Function.prototype.bind`에 대해 설명하세요.

[MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind)에서 인용:

> `bind()` 메소드는 호출될 때, this 키워드가 주어진 인자 값으로 설정되고, 새로운 함수가 호출될 때, 앞쪽의 매개변수도 자신의 인자를 사용해 미리 순서대로 채워놓은 새로운 함수를 반환합니다.

저의 경험상, 다른 함수로 전달하고자 하는 클래스의 메소드에서 `this`의 값을 바인딩할 때 가장 유용합니다. 이는 React 컴포넌트에서 자주 사용됩니다.

###### 참고자료

- https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind

[[↑] Back to top](#목차)

### 언제 `document.write()`를 사용하나요?

`document.write()`는 `document.open()`에 의해 열린 문서 스트림에 텍스트 문자열을 씁니다. 페이지가 로드된 후에 `document.write()`가 실행되면 `document.open`을 호출하여 문서 전체를 지우고 (`<head>`와 `<body>`를 지웁니다!). 문자열로 주어진 매개 변수 값으로 대체합니다. 그러므로 일반적으로 위험하고 오용되기 쉽습니다.

`document.write()`가 코드분석이나 [JavaScript가 활성화된 경우에만 작동하는 스타일을 포함하고 싶을 때](https://www.quirksmode.org/blog/archives/2005/06/three_javascrip_1.html) 사용되는 경우를 설명하는 온라인 답변이 몇 가지 있습니다. 심지어 HTML5 보일러 플레이트에서 [스크립트를 병렬로 로드하고 실행 순서를 보존](https://github.com/paulirish/html5-boilerplate/wiki/Script-Loading-Techniques#documentwrite-script-tag)할 때도 사용됩니다! 그러나, 저는 그 이유가 시대에 뒤떨어진 것으로 생각하고 있으며, 현재는 `document.write()`를 사용하지 않고도 할 수 있습니다. 이것이 틀렸다면 고쳐주세요.

###### 참고자료

- https://www.quirksmode.org/blog/archives/2005/06/three_javascrip_1.html
- https://github.com/h5bp/html5-boilerplate/wiki/Script-Loading-Techniques#documentwrite-script-tag

[[↑] Back to top](#목차)

### Feature detection, Feature inference, UA String의 차이점은 무엇인가요?

**Feature Detection**

Feature Detection은 브라우저가 특정 코드 블록을 지원하는지에 따라 다른 코드를 실행하도록 하여, 일부 브라우저에서 항상 오류 대신 무언가 작동하도록 합니다. 예:

```js
if ('geolocation' in navigator) {
  // navigator.geolocation를 사용할 수 있습니다
} else {
  // 부족한 기능 핸들링
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

네트워크 프로토콜 피어가 요청하는 소프트웨어 유저 에이전트의 응용 프로그램 유형, 운영 체제, 소프트웨어 공급 업체 또는 소프트웨어 버전을 식별할 수 있도록 해주는 browser-reported String입니다. `navigator.userAgent` 를 통해 접근 할 수 있습니다. 하지만 문자열은 구문 분석하기 까다로우며 스푸핑될 수 있습니다. 예를 들어, Chrome은 Chrome과 Safari로 모두 보고됩니다. Safari를 감지하기 위해서는 Safari 문자열이 있는지와 Chrome 문자열이 없는지 확인해야 합니다. 이 방법은 사용하지 마세요.

###### 참고자료

- https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection
- https://stackoverflow.com/questions/20104930/whats-the-difference-between-feature-detection-feature-inference-and-using-th
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent

[[↑] Back to top](#목차)

### Ajax에 대해 가능한 한 자세히 설명하세요.

Ajax(asynchronous JavaScript and XML)는 비동기 웹 응용 프로그램을 만들기 위해 클라이언트 측에서 사용되는 웹 개발 기술의 집합입니다. Ajax를 사용하면 웹 애플리케이션은 기존 페이지의 화면 및 동작을 방해하지 않으면서 백그라운드에서 비동기적으로 서버로 데이터를 보내고 서버에서 데이터를 받아올 수 있습니다. Ajax는 프리젠테이션 레이어에서 데이터 교환 레이어를 분리함으로써, 웹페이지 및 확장 웹 애플리케이션이 전체 페이지를 다시 로드 할 필요 없이 동적으로 컨텐츠를 변경할 수 있도록 합니다. 실제로 최근에는 일반적으로 네이티브 JavaScript의 장점 때문에 XML대신 JSON을 사용합니다.

`XMLHttpRequest` API는 비동기 통신에 자주 사용되며, 최근에는 `fetch` API가 자주 사용됩니다.

###### 참고자료

- https://en.wikipedia.org/wiki/Ajax_(programming)
- https://developer.mozilla.org/en-US/docs/AJAX

[[↑] Back to top](#목차)

### Ajax를 사용하는 것의 장단점은 무엇인가요?

**장점**

- 상호작용성이 좋아집니다. 서버의 새로운 컨텐츠를 전체 페이지를 다시로드할 필요 없이 동적으로 변경할 수 있습니다.
- 스크립트나 스타일 시트는 한 번만 요청하면 되므로 서버에 대한 연결을 줄여줍니다.
- 상태를 페이지에서 관리 할 수 ​​있습니다. 메인 컨테이너 페이지가 다시 로드되지 않기 때문에 JavaScript의 변수와 DOM의 상태가 유지됩니다.
- 기본적으로 SPA의 대부분의 장점과 같습니다.

**단점**

- 동적 웹 페이지는 북마크하기 어렵습니다.
- 브라우저에서 JavaScript가 비활성화된 경우 작동하지 않습니다.
- 일부 웹 크롤러는 JavaScript를 실행하지 않으며 JavaScript에 의해 로드된 콘텐츠를 볼 수 없습니다.
- SPA의 대부분의 단점과 같습니다.

[[↑] Back to top](#목차)

### JSONP가 어떻게 동작하는지(그리고 Ajax와 어떻게 다른지)를 설명하세요.

JSONP(JSON with Padding)는 현재 페이지에서 cross-origin 도메인으로의 Ajax 요청이 허용되지 않기 때문에 웹 브라우저에서 cross-domain 정책을 우회하는 데 일반적으로 사용되는 방법입니다.

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
// https://example.com?callback=printData 에서 로드된 파일
printData({name: 'Yang Shun'});
```

클라이언트는 전역 범위에 있는 `printData` 함수를 가져야만 하고, cross-origin domain으로부터의 응답이 수신될 때 함수가 클라이언트에 의해 실행됩니다.

JSONP는 안전하지 않을 수 있으며, 보안 관련 이슈가 있습니다. JSONP는 실제 JavaScript고, JavaScript가 할 수 있는 모든 작업을 수행할 수 있으므로 JSONP 데이터 공급자를 신뢰해야만 합니다.

요즘에는 [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing)가 권장되는 접근 방식이며 JSONP는 해킹으로 간주됩니다.

###### 참고자료

- https://stackoverflow.com/a/2067584/1751946

[[↑] Back to top](#목차)

### JavaScript 템플릿을 사용한 적이 있나요? 사용해봤다면, 어떤 라이브러리를 사용했나요?

네. Handlebars, Underscore, Lodash, AngularJS, JSX. 저는 AngularJS에서의 템플릿을 좋아하지 않았습니다. 지시자에서 문자열을 많이 사용하게 되며 오타가 감지되지 않기 때문입니다. JSX는 JavaScript에 가깝고 배워야 하는 새로운 문법이 거의 없기 때문에 더 좋아합니다. 요즘에는, Third-party 라이브러리에 의존하지 않고 템플릿을 만드는 빠른 방법으로 ES2015 템플릿 문자열 리터럴을 사용할 수도 있습니다.

```js
const template = `<div>My name is: ${name}</div>`;
```

그러나 템플릿 라이브러리와 달리 컨텐츠가 이스케이프되지 않으므로 위의 접근 방식에서 잠재적 XSS를 알고 있어야 합니다.

[[↑] Back to top](#목차)

### `호이스팅`에 대해 설명하세요.

호이스팅은 코드에서 변수 선언의 동작을 설명하는데 사용되는 용어입니다. `var` 키워드로 선언되거나 초기화된 변수는 현재 스코프의 최상위까지 `옮겨`집니다. 이것을 호이스팅이라고 부릅니다. 그러나 선언문만 `호이스팅`되며 할당(있는 경우)은 그대로 있게 됩니다.

사실 선언은 실제로 이동되지 않습니다 - JavaScript 엔진은 컴파일 중에 선언을 파싱하고 선언과 해당 스코프를 인식합니다. 선언을 해당 스코프의 맨 위로 옮겨지는 것으로 생각하여 동작을 이해하는 것이 더 쉬울 뿐입니다. 몇 가지 예를 들어 설명해 보겠습니다.

```js
// var 선언이 호이스팅됩니다
console.log(foo); // undefined
var foo = 1;
console.log(foo); // 1

// let/const 선언은 호이스팅되지 않습니다.
console.log(bar); // ReferenceError: bar is not defined
let bar = 2;
console.log(bar); // 2
```

함수 선언은 함수몸체가 호이스팅되는 반면, 변수 선언 형태로 작성된 함수 표현식은 변수 선언만 호이스팅됩니다.

```js
// 함수 선언
console.log(foo); // [Function: foo]
foo(); // 'FOOOOO'
function foo() {
  console.log('FOOOOO');
}
console.log(foo); // [Function: foo]

// 함수 표현식
console.log(bar); // undefined
bar(); // Uncaught TypeError: bar is not a function
var bar = function () {
  console.log('BARRRR');
};
console.log(bar); // [Function: bar]
```

[[↑] Back to top](#목차)

### event bubbling에 대해 설명하세요.

DOM 요소에서 이벤트가 트리거되면 리스너가 연결되어 있는 경우 이벤트 처리를 시도한 다음, 해당 이벤트가 부모에게 bubbling되고 부모에서 같은 이벤트가 발생합니다. 이 bubbling은 요소의 최상단 부모요소인 `document`까지 계속적으로 발생시킵니다. 이벤트 bubbling은 이벤트 위임의 작동 메커니즘입니다.

[[↑] Back to top](#목차)

### "attribute"와 "property"의 차이점은 무엇인가요?

attribute는 HTML 마크업에 정의되지만 property는 DOM에 정의됩니다. 차이점을 설명하기 위해 HTML에 다음 텍스트 필드가 있다고 가정해 봅시다: `<input type="text" value="Hello">`.

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

- https://stackoverflow.com/questions/6003819/properties-and-attributes-in-html

[[↑] Back to top](#목차)

### 내장 JavaScript 객체를 확장하는 것이 좋은 생각이 아닌 이유는 무엇인가요?

내장/네이티브 JavaScript 객체를 확장한다는 것은 prototype에 속성/함수를 추가한다는 것을 의미합니다. 이것은 처음에는 좋은 생각처럼 보일 수 있지만 실제로는 위험합니다. 여러분의 코드가 동일한 `contains` 메소드를 추가함으로써 `Array.prototype`을 확장하는 여러가지 라이브러리를 사용한다고 상상해보십시오. 이러한 구현은 메소드를 서로 덮어쓰게 되며, 이 두 메소드의 동작이 동일하지 않으면 코드가 망가질 것입니다.

네이티브 객체를 확장할 수 있는 유일한 경우는 polyfill을 만들 때입니다. JavaScript 사양의 일부이지만, 오래된 브라우저이기 때문에 사용자 브라우저에 없을 수도 있는 메서드에 대한 고유한 구현을 제공해야할 경우 뿐입니다.

###### 참고자료

- http://lucybain.com/blog/2014/js-extending-built-in-objects/

[[↑] Back to top](#목차)

### document `load` 이벤트와 document `DOMContentLoaded` 이벤트의 차이점은 무엇인가요?

`DOMContentLoaded` 이벤트는 스타일시트, 이미지, 서브프레임 로딩을 기다리지 않고, 초기 HTML 문서가 완전히 로드되고 파싱되면 발생합니다.

`window`의 `load` 이벤트는 DOM과 모든 종속 리소스와 에셋들이 로드된 후에 ​​발생합니다.

###### 참고자료

- https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
- https://developer.mozilla.org/en-US/docs/Web/Events/load

[[↑] Back to top](#목차)

### `==`와 `===`의 차이점은 무엇인가요?

`==`는 추상 동등 연산자이고 `===`는 완전 동등 연산자입니다. `==`연산자는 타입 변환이 필요한 경우 타입 변환을 한 후에 동등한지 비교할 것입니다. `===`연산자는 타입 변환을 하지 않으므로 두 값이 같은 타입이 아닌 경우 `===`는 `false`를 반환합니다. `==`를 사용하면 다음과 같은 무서운 일이 발생할 수 있습니다.

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

- https://stackoverflow.com/questions/359494/which-equals-operator-vs-should-be-used-in-javascript-comparisons

[[↑] Back to top](#목차)

### JavaScript와 관련하여 same-origin 정책을 설명하세요.

same-origin 정책은 JavaScript가 도메인 경계를 넘어서 요청하는 것을 방지합니다. origin은 URI 체계, 호스트 이름, 포트 번호의 조합으로 정의됩니다. 이 정책은 한 페이지의 악의적인 스크립트가 해당 페이지의 DOM을 통해 다른 웹 페이지의 중요한 데이터에 접근하는 것을 방지합니다.

###### 참고자료

- https://en.wikipedia.org/wiki/Same-origin_policy

[[↑] Back to top](#목차)

### 다음이 작동하게 만들어보세요.

```js
duplicate([1, 2, 3, 4, 5]); // [1,2,3,4,5,1,2,3,4,5]
```

```js
function duplicate(arr) {
  return arr.concat(arr);
}

duplicate([1, 2, 3, 4, 5]); // [1,2,3,4,5,1,2,3,4,5]
```

[[↑] Back to top](#목차)

### 왜 Ternary expression이라고 부르고, "Ternary"라는 단어는 무엇을 나타내나요?

"Ternary"는 "삼항"을 나타내고 삼항 표현식은 세가지 피연산자, 테스트 조건문, "then"표현식, "else"표현식을 받습니다. 삼항 표현식은 JavaScript에만 해당되는 것이 아니며 왜 이 목록에 있는지 잘 모르겠습니다.

###### 참고자료

- https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

[[↑] Back to top](#목차)

### `"use strict";` 이 무엇인가요? 사용시 장단점이 무엇인가요?

'use strict'는 전체 스크립트나 개별 함수에 엄격 모드를 사용하는데 사용되는 명령문입니다. Strict 모드는 JavaScript 다양한 자바스크립트를 제한하는 방법입니다.

장점:

- 실수로 전역변수를 만드는 것이 불가능합니다.
- 암묵적으로 실패한 예외를 throw하지 못하는 할당을 만듭니다.
- 삭제할 수 없는 속성을 삭제하려고 시도합니다. (시도 효과가 없을 때까지)
- 함수의 매개변수 이름은 고유해야합니다.
- `this`는 전역 컨텍스트에서 undefined입니다.
- 예외를 발생시키는 몇 가지 일반적인 코딩을 잡아냅니다.
- 헷갈리거나 잘 모르는 기능을 사용할 수 없게 합니다.

단점:

- 일부 개발자는 익숙하지 않은 기능이 많습니다.
- `function.caller`와 `function.arguments`에 더 이상 접근할 수 없습니다.
- 서로 다른 엄격한 모드로 작성된 스크립트를 병합하면 문제가 발생할 수 있습니다.

전반적으로 장점이 단점보다 중요하다고 생각합니다. 엄격 모드가 차단하는 기능에 의존하지 않아도 됩니다. 엄격한 모드를 사용하는 것을 추천합니다.

###### 참고자료

- http://2ality.com/2011/10/strict-mode-hatred.html
- http://lucybain.com/blog/2014/js-use-strict/

[[↑] Back to top](#목차)

### 100까지 증가하면서 `3`의 배수에는 `fizz`를 출력하고, `5`의 배수에는 `buzz`를 출력하고, `3`과 `5`의 배수에는 `fizzbuzz`를 출력하는 for loop를 만드세요.

[Paul Irish](https://gist.github.com/jaysonrowe/1592432#gistcomment-790724)의 FizzBuzz를 확인해보세요.

```js
for (let i = 1; i <= 100; i++) {
  let f = i % 3 == 0,
    b = i % 5 == 0;
  console.log(f ? (b ? 'FizzBuzz' : 'Fizz') : b ? 'Buzz' : i);
}
```

저는 인터뷰 중에 위와 같이 쓰라고 조언하지는 않습니다. 길지만 분명한 접근 방식을 고수하세요. FizzBuzz의 더 다양한 버전을 보려면 아래의 참조 링크를 확인하세요.

###### 참고자료

- https://gist.github.com/jaysonrowe/1592432

[[↑] Back to top](#목차)

### 일반적으로 웹 사이트의 전역 스코프를 그대로 두고 건드리지 않는 것이 좋은 이유는 무엇인가요?

모든 스크립트는 전역 스코프에 접근할 수 있으며, 모든 사람이 전역 네임스페이스를 사용하여 변수를 정의하면 충돌이 발생할 수 있습니다. 모듈 패턴 (IIFEs)을 사용하여 변수를 로컬 네임스페이스 내에 캡슐화하세요.

[[↑] Back to top](#목차)

### 왜 `load` 이벤트와 같은 것을 사용하나요? 이 이벤트에는 단점이 있나요? 다른 대안을 알고 있나요? 알고 있다면 왜 그것을 사용할 건가요?

`load` 이벤트는 문서로딩 프로세스가 끝날 때 발생됩니다. 이 시점에서 문서의 모든 객체가 DOM에 있고, 모든 이미지, 스크립트, 링크 및 하위 프레임로딩이 완료됩니다.

DOM 이벤트 `DOMContentLoaded`는 페이지의 DOM이 생성된 후에 발생하지만 다른 리소스가 로딩되기를 기다리지 않습니다. 이것은 초기화되기 전에 전체 페이지가 로드될 필요가 없는 경우에 선호됩니다.

TODO.

###### 참고자료

- https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload

[[↑] Back to top](#목차)

### single page app이 무엇인지 설명하고 SEO-friendly하게 만드는 방법을 설명하세요.

아래는 [Grab Front End Guide](https://github.com/grab/front-end-guide)에서 가져온 것이며, 우연히도 제가 작성했습니다!

웹 개발자는 요즘 웹 사이트가 아닌 웹 앱으로 제작한 제품을 언급합니다. 두 가지 용어 사이에는 엄격한 차이는 없지만, 웹 앱은 대화형, 동적인 경향이 있어 사용자가 작업을 수행하고 작업에 대한 응답을 받을 수 있습니다. 전통적으로, 브라우저는 서버에서 HTML을 받아 렌더링합니다. 사용자가 다른 URL로 이동하면, 전체페이지 새로고침이 필요하며 서버는 새페이지에 대해 새 HTML을 보냅니다. 이를 server-side rendering이라고합니다.

그러나 현대 SPA에서는 대신 client-side rendering이 사용됩니다. 브라우저는 전체 애플리케이션에 필요한 스크립트(프레임워크, 라이브러리, 앱 코드) 및 스타일시트와 함께 서버의 초기 페이지를 로드합니다. 사용자가 다른 페이지로 이동하면 페이지 새로고침이 발생하지 않습니다. 페이지의 URL은 [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)를 통해 업데이트됩니다. 일반적으로 JSON 형식의 새 페이지에 필요한 새 데이터는 브라우저에서 [AJAX](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started) 요청을 통해 서버로 전송됩니다. SPA는 초기 페이지 로딩에서 미리 다운로드된 JavaScript를 통해 페이지를 동적으로 업데이트합니다. 이 모델은 네이티브 모바일 앱의 작동 방식과 유사합니다.

장점들:

- 전체 페이지 새로고침으로 인해 페이지 탐색 사이에 하얀 화면이 보이지 않아 앱이 더 반응적으로 느껴지게 됩니다.
- 동일한 애셋을 페이지 로드마다 다시 다운로드할 필요가 없으므로 서버에 대한 HTTP 요청이 줄어듭니다.
- 클라이언트와 서버 사이의 고려해야 할 부분을 명확하게 구분합니다. 서버 코드를 수정하지 않고도 다양한 플랫폼(예: 모바일, 채팅 봇, 스마트워치)에 맞는 새로운 클라이언트를 쉽게 구축할 수 있습니다. 또한 API 규약이 깨지지 않는 한도 내에서 클라이언트와 서버에서 기술 스택을 독립적으로 수정할 수 있습니다.

단점들:

- 여러 페이지에 필요한 프레임워크, 앱 코드, 애셋로드로 인해 초기 페이지로드가 무거워집니다.
- 모든 요청을 단일 진입점으로 라우트하고 클라이언트 측 라우팅이 그 한곳에서 인계받을 수 있도록 서버를 구성하는 추가 단계가 필요합니다.
- SPA는 콘텐츠를 렌더링하기 위해 JavaScript에 의존하지만 모든 검색 엔진이 크롤링 중에 JavaScript를 실행하지는 않으며 페이지에 빈 콘텐츠가 표시될 수 있습니다. 이로 인해 의도치 않게 앱의 검색 엔진 최적화(SEO)가 어려워집니다. 그러나 대부분의 경우 앱을 제작할 때 검색 엔진에서 모든 콘텐츠 색인할 필요는 없으므로 SEO가 가장 중요한 요소는 아닙니다. 이를 극복하기 위해, 앱을 서버 측 렌더링하거나 [Prerender](https://prerender.io/)와 같은 서비스를 사용하여 "브라우저에서 JavaScript를 렌더링하고, 정적 HTML을 저장한 다음, 크롤러에게 반환합니다".

###### 참고자료

- https://github.com/grab/front-end-guide#single-page-apps-spas
- http://stackoverflow.com/questions/21862054/single-page-app-advantages-and-disadvantages
- http://blog.isquaredsoftware.com/presentations/2016-10-revolution-of-web-dev/
- https://medium.freecodecamp.com/heres-why-client-side-rendering-won-46a349fadb52

[[↑] Back to top](#목차)

### Promises와 그 Polyfill에 대한 당신의 경험은 어느 정도인가요?

Promise는 어느 시점에 resolve된 값 또는 resolve되지 않은 이유(예: 네트워크 오류가 발생) 중 하나의 값을 생성할 수 있는 객체입니다. promise는 fulfilled, rejected, pending 3가지 상태 중 하나일 수 있습니다. promise 사용자는 콜백을 붙여서 fulfill된 값이나 reject된 이유를 처리할 수 ​​있습니다.

일반적인 polyfill은 `$.deferred`, Q, Bluebird 입니다만, 모두가 스펙을 따르는 것은 아닙니다. ES2015는 즉시 사용할 수 있는 Promise를 지원하며 일반적으로 요즘엔 polyfill이 필요하지 않습니다.

###### 참고자료

- https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261

[[↑] Back to top](#목차)

### Callback 대신에 Promise를 사용할 때의 장점과 단점은 무엇인가요?

**장점**

- 가독성이 떨어질 수 있는 콜백 지옥을 피할 수 있습니다.
- `.then()`을 이용하여 가독성 좋은 연속적인 비동기 코드를 쉽게 작성할 수 있습니다.
- `Promise.all()`을 사용하여 병렬 비동기 코드를 쉽게 작성할 수 있습니다.
- Promise를 통해 콜백만 사용하는 코딩방식에 있는 다음과 같은 상황이 발생하지 않습니다:
  - 콜백을 너무 빨리 호출함
  - 콜백을 너무 늦게 호출하거나 호출하지 않음
  - 콜백을 너무 적게 호출하거나 너무 많이 호출함
  - 필요한 환경/매개변수를 전달하는데 실패함
  - 발생가능한 오류/예외를 무시함

**단점**

- 약간 더 복잡한 소스코드(논쟁의 여지가 있음).
- ES2015를 지원하지 않는 이전 브라우저에서 이를 사용하기 위해서는 polyfill을 로드해야 합니다.

###### 참고자료

- https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch3.md

[[↑] Back to top](#목차)

### JavaScript로 컴파일되는 언어로 JavaScript 코드를 작성하는 경우의 장단점은 무엇인가요?

JavaScript로 컴파일되는 언어의 예로 CoffeeScript, Elm, ClojureScript, PureScript, TypeScript가 있습니다.

장점:

- JavaScript의 오랜 문제점들을 해결하고 JavaScript 안티-패턴을 방지합니다.
- JavaScript 위에 syntatic sugar를 제공함으로써 더 짧은 소스코드를 작성할 수 있도록 해줍니다. 제 생각에는 ES5는 부족하지만 ES2015는 굉장합니다.
- 정적 타입은 시간 경과에 따라 유지 관리해야 하는 대규모 프로젝트에서 훌륭합니다(TypeScript의 경우).

단점:

- 브라우저는 오직 JavaScript만 실행하기 때문에 빌드/컴파일 프로세스가 필요하며 브라우저에 제공되기 전에 JavaScript로 코드를 컴파일해야 합니다.
- 소스 맵이 미리 컴파일된 소스에 잘 매핑되지 않으면 디버깅이 어려울 수 있습니다.
- 대부분의 개발자들은 이러한 언어에 익숙하지 않으므로 이를 배워야합니다. 프로젝트에 사용할 경우 팀 비용이 증가합니다.
- 소규모 커뮤니티(언어에 따라 다름)에서는 리소스, 튜토리얼, 라이브러리, 툴을 찾기가 어려울 수 있습니다.
- IDE / 편집기 지원이 부족할 수 있습니다.
- 이러한 언어는 항상 최신 JavaScript 표준보다 뒤쳐질 것입니다.
- 개발자들은 자신들의 코드를 무엇으로 컴파일하고 있는지 알고 있어야 합니다. 왜냐하면 그것이 실제로 실행될 것이고, 그것이 결국 중요하기 때문입니다.

실질적으로 ES2015는 JavaScript를 크게 개선하여 작성하기가 훨씬 쉬워졌습니다. 요즘은 CoffeeScript가 필요성을 느끼지 못합니다.

###### 참고자료

- https://softwareengineering.stackexchange.com/questions/72569/what-are-the-pros-and-cons-of-coffeescript

[[↑] Back to top](#목차)

### JavaScript 코드를 디버깅하기 위해 어떤 도구와 기술을 사용하나요?

- React and Redux
  - [React Devtools](https://github.com/facebook/react-devtools)
  - [Redux Devtools](https://github.com/gaearon/redux-devtools)
- JavaScript
  - [Chrome Devtools](https://hackernoon.com/twelve-fancy-chrome-devtools-tips-dc1e39d10d9d)
  - `debugger` statement
  - Good old `console.log` debugging

###### 참고자료

- https://hackernoon.com/twelve-fancy-chrome-devtools-tips-dc1e39d10d9d
- https://raygun.com/blog/javascript-debugging/

[[↑] Back to top](#목차)

### 오브젝트 속성이나 배열 항목을 반복할 때 사용하는 언어 구문은 무엇인가요?

오브젝트의 경우:

- `for-in` 반복 - `for (var property in obj) { console.log(property); }`. 그러나, 이는 상속된 속성도 반복되며, 사용하기 전에 `obj.hasOwnProperty(property)` 체크를 추가해야 합니다.
- `Object.keys()` - `Object.keys(obj).forEach(function (property) { ... })`. `Object.keys()`는 전달하는 객체의 열거 가능한 모든 속성을 나열하는 정적 메서드입니다.
- `Object.getOwnPropertyNames()` - `Object.getOwnPropertyNames(obj).forEach(function (property) { ... })`. `Object.getOwnPropertyNames()`는 전달하는 객체의 열거 가능한 속성과 열거불가능한 모든 속성을 나열하는 정적 메서드입니다.

배열의 경우:

- `for` 반복 - `for (var i = 0; i < arr.length; i++)`. 여기에 있는 일반적인 함정은 `var`이 함수 스코프고 블록 스코프가 아니며, 대부분 블록 스코프의 반복자 변수를 원할 것이라는 점입니다. ES2015에는 블록 범위가 있는 `let`이 추가됐고, 이를 대신 사용할 것을 권장합니다. 그래서 다음과 같이 됩니다. `for (let i = 0; i < arr.length; i++)`.
- `forEach` - `arr.forEach(function (el, index) { ... })`. 필요한 것이 배열의 요소라면 `index`를 사용할 필요가 없기 때문에 이 구문이 더 편리 할 수 ​​있습니다. 또한 `every`과 `some`메서드를 이용하여 반복을 일찍 끝낼 수 있습니다.
- `for-of` 반복 - `for (let elem of arr) { ... }`. ES6는 `String`, `Array`, `Map`, `Set` 등과 같은 [iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol)을 준수하는 객체를 반복 할 수 있게 해주는 새로운 `for-of` 루프를 도입했습니다. `for` 루프의 장점은 루프에서 벗어날 수 있다는 것이고, `forEach()`의 장점은 카운터 변수가 필요 없기 때문에 `for` 루프보다 간결하다는 것입니다. `for-of` 루프를 사용하면, 루프에서 빠져 나올 수도 있고 더 간결한 구문도 얻을 수 있습니다.

대부분의 경우에 저는 `.forEach` 메서드를 선호하지만, 무엇을 하느냐에 따라서 각 상황에 맞게 사용하는 것이 좋습니다. ES6 이전에는 `for` 루프를 사용하여 루프를 조기 종료해야 할 때 `break`를 사용했습니다. 그러나 이제 ES6에서는 `for-of`루프를 사용하여 이를 수행 할 수 있습니다. 루프 당 반복자를 두 번 이상 늘리는 것과 같이 유연성이 더 필요하다면, `for` 루프를 사용할 것입니다.

또한, `for-of` 루프를 사용할 때 각 배열 요소의 인덱스와 값에 모두 접근해야하는 경우 ES6 Array의 `entries()` 메소드와 destructuring을 사용하면됩니다.

```js
const arr = ['a', 'b', 'c'];

for (let [index, elem] of arr.entries()) {
  console.log(index, ': ', elem);
}
```

###### 참고자료

- http://2ality.com/2015/08/getting-started-es6.html#from-for-to-foreach-to-for-of
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries

[[↑] Back to top](#목차)

### mutable 객체와 immutable 객체 사이의 차이점을 설명하세요.

- JavaScript에서 immutable 객체의 예는 무엇인가요?
- Immutability의 장점과 단점은 무엇인가요?
- 자신의 코드에서 어떻게 immutability를 얻을 수 있나요?

TODO

[[↑] Back to top](#목차)

### 동기, 비동기 함수의 차이점을 설명하세요.

동기 함수는 블로킹인 반면, 비동기 함수는 그렇지 않습니다. 동기 함수에서는 다음 명령문이 실행되기 전에 앞 명령문이 완료됩니다. 이 경우, 프로그램은 명령문의 순서대로 정확하게 평가되고 명령문 중 하나가 매우 오랜 시간이 걸리면 프로그램 실행이 일시중지됩니다.

비동기 함수는 일반적으로 파라미터를 통해서 콜백을 받고, 비동기 함수가 호출된 후 즉시 다음 줄 실행이 계속됩니다. 콜백은 비동기 작업이 완료되고 호출 스택이 비어 있을 때만 호출됩니다. 웹 서버에서 데이터를 로드하거나 데이터베이스를 쿼리하는 등의 무거운 작업을 비동기식으로 수행하여, 메인 스레드가 긴 작업을 완료할 때까지 블로킹하지 않고 다른 작업을 계속할 수 있습니다(브라우저의 경우 UI가 중지됨).

[[↑] Back to top](#목차)

### 이벤트 루프란 무엇인가요? 콜 스택과 태스크 큐의 차이점은 무엇인가요?

이벤트 루프는 콜 스택을 모니터하고 태스크 큐에서 수행할 작업이 있는지 확인하는 단일 스레드 루프입니다. 콜 스택이 비어 있고 태스크 큐에 콜백 함수가 있는 경우, 함수는 큐에서 제거되고 실행될 콜 스택으로 푸시됩니다.

Philip Robert의 [talk on the Event Loop](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html)를 아직 확인하지 않은 경우 확인하십시오. JavaScript 분야에서 가장 많은 조회수를 기록한 동영상 중 하나입니다.

###### 참고자료

- https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html
- http://theproactiveprogrammer.com/javascript/the-javascript-event-loop-a-stack-and-a-queue/

[[↑] Back to top](#목차)

### `function foo() {}`와 `var foo = function() {}` 사이에서 `foo` 사용의 차이에 대해 설명하세요.

전자는 함수 선언인 반면, 후자는 함수 표현식입니다. 주요한 차이점은 함수 선언은 함수바디가 호이스트되지만, 함수 표현식의 바디는 호이스트되지 않습니다(변수와 동일한 호이스팅 동작을 가짐). 호이스팅에 대한 자세한 설명은 질문 위의 호이스팅을 참조하십시오. 함수 표현식을 정의하기 전에 호출하려고 하면 `Uncaught TypeError : XXX is not function` 에러가 발생합니다.

**함수 선언**

```js
foo(); // 'FOOOOO'
function foo() {
  console.log('FOOOOO');
}
```

**함수 표현식**

```js
foo(); // Uncaught TypeError: foo는 함수가 아닙니다
var foo = function () {
  console.log('FOOOOO');
};
```

###### 참고자료

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function

[[↑] Back to top](#목차)

### `let`, `var`, `const`를 사용하여 생성된 변수들의 차이점은 무엇인가요?

`var` 키워드를 사용하여 선언된 변수는 함수가 생성된 함수나 함수 밖에서 생성된 함수에 전역 오브젝트로 적용됩니다. `let`과 `const`는 블록 스코프입니다. 즉, 가장 가까운 중괄호(function, if-else 블록, for-loop) 내에서만 접근할 수 있습니다.

```js
function foo() {
  // 함수 내에서 모든 변수에 접근할 수 있습니다.
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

// var로 선언된 변수는 함수 스코프의 어디에서나 접근할 수 있습니다.
console.log(bar); // "bar"
// let과 const로 정의된 변수는 정의된 블록 외부에서 접근할 수 없습니다.
console.log(baz); // ReferenceError: baz is not defined
console.log(qux); // ReferenceError: qux is not defined
```

`var`는 변수가 호이스트되도록 허용합니다. 즉, 변수가 선언되기 전에 코드에서 참조될 수 있습니다. `let`과 `const`는 이를 허용하지 않고 대신 에러를 던집니다.

```js
console.log(foo); // undefined

var foo = 'foo';

console.log(baz); // ReferenceError: can't access lexical declaration 'baz' before initialization

let baz = 'baz';

console.log(bar); // ReferenceError: can't access lexical declaration 'bar' before initialization

const bar = 'bar';
```

`var`을 사용하여 변수를 다시 선언해도 에러가 발생하지 않지만, `let`과 `const`는 에러를 발생시킵니다.

```js
var foo = 'foo';
var foo = 'bar';
console.log(foo); // "bar"

let baz = 'baz';
let baz = 'qux'; // Uncaught SyntaxError: Identifier 'baz' has already been declared
```

`let`은 변수의 값을 재할당할 수 있지만, `const`는 재할당할 수 없다는 점이 다릅니다.

```js
// 괜찮습니다
let foo = 'foo';
foo = 'bar';

// 예외가 발생합니다
const baz = 'baz';
baz = 'qux';
```

###### 참고자료

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const

[[↑] Back to top](#목차)

### ES6 클래스와 ES5 함수 생성자의 차이점은 무엇인가요?

먼저 각각의 예를 살펴보겠습니다.

```js
// ES5 함수 생성자
function Person(name) {
  this.name = name;
}

// ES6 클래스
class Person {
  constructor(name) {
    this.name = name;
  }
}
```

간단한 생성자의 경우에는 매우 유사합니다.

생성자의 주요 차이점은 상속을 사용할 때 발생합니다. `Person`의 하위 클래스이면서 `studentId` 필드를 추가로 가지고 있는 `Student` 클래스를 만들고자 한다면, 이것이 우리가 추가로 해야할 일입니다.

```js
// ES5 함수 생성자
function Student(name, studentId) {
  // 수퍼 클래스의 생성자를 호출하여 수퍼 클래스에서 상속된 멤버를 초기화합니다.
  Person.call(this, name);

  // 서브 클래스의 멤버를 초기화합니다.
  this.studentId = studentId;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

// ES6 클래스
class Student extends Person {
  constructor(name, studentId) {
    super(name);
    this.studentId = studentId;
  }
}
```

ES5에서 상속을 사용하는 것이 훨씬 더 불편하며, ES6 버전이 이해하고 기억하기가 더 쉽습니다.

###### 참고자료

- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance
- https://eli.thegreenplace.net/2013/10/22/classical-inheritance-in-javascript-es5

[[↑] Back to top](#목차)

### 새 화살표 => 함수 문법에 대한 사용 예시를 들 수 있나요? 이 새로운 문법은 다른 함수와 어떻게 다른가요?

화살표 함수의 한 가지 분명한 이점은 `function` 키워드를 사용하지 않고도 함수를 생성하는데 필요한 문법을 단순화하는 것입니다.

또한, 화살표 함수 내의 `this`는, `this`가 함수를 호출하는 객체에 의해 결정되는 일반 함수와 다르게, 주변 스코프에에 묶입니다.

렉시컬스코프 `this`는 특히 React 컴포넌트에서 콜백을 호출할 때 유용합니다.

[[↑] Back to top](#목차)

### 생성자의 메서드에 화살표 문법을 사용하면 어떤 이점이 있나요?

생성자 내부에서 화살표 함수를 메소드로 사용하는 주된 장점은, 함수 생성시 `this`의 값이 설정되고 그 이후에는 변경할 수 없다는 것입니다.

따라서, 생성자가 새로운 객체를 생성하는데 사용될 때, `this`는 항상 그 객체를 참조할 것입니다.

예를 들어, 우리가 인수로 first name을 받고, 그 이름을 `console.log`로 출력하는 `Person` 생성자가 있다고 해봅시다. 하나는 일반 함수이고, 다른 하나는 화살표 함수일 때,

```js
const Person = function (firstName) {
  this.firstName = firstName;
  this.sayName1 = function () {
    console.log(this.firstName);
  };
  this.sayName2 = () => {
    console.log(this.firstName);
  };
};

const john = new Person('John');
const dave = new Person('Dave');

john.sayName1(); // John
john.sayName2(); // John

// 일반 함수의 'this'값은 변경할 수 있지만, 화살표 함수는 변경할 수 없습니다.
john.sayName1.call(dave); // Dave (because "this" is now the dave object)
john.sayName2.call(dave); // John

john.sayName1.apply(dave); // Dave (because 'this' is now the dave object)
john.sayName2.apply(dave); // John

john.sayName1.bind(dave)(); // Dave (because 'this' is now the dave object)
john.sayName2.bind(dave)(); // John

var sayNameFromWindow1 = john.sayName1;
sayNameFromWindow1(); // undefined (because 'this' is now the window object)

var sayNameFromWindow2 = john.sayName2;
sayNameFromWindow2(); // John
```

여기에서 주요 장점은 `this`는 일반 함수에 대해 변경될 수 있지만, 컨텍스트는 항상 화살표 함수에 대해 동일하게 유지된다는 것입니다. 따라서 화살표 함수를 앱의 다른 부분으로 전달하는 경우에도 컨텍스트 변경에 대해 걱정할 필요가 없습니다.

이는 특히 React 클래스 컴포넌트에서 유용할 수 있습니다. 일반 함수를 사용하는 클릭 핸들러와 같은 클래스 메소드를 정의한 다음, 해당 클릭 핸들러를 하위 컴포넌트의 prop으로 전달하면 상위 컴포넌트의 생성자에서 `this`도 바인드해야합니다.

대신 화살표 함수를 사용하면, 메소드가 `this`값을 주위 렉시컬 컨텍스트에서 자동으로 가져오기 때문에 `this`를 바인딩할 필요가 없습니다.

(좋은 데모, 샘플 코드는 [이 기사](https://medium.com/@machnicki/handle-events-in-react-with-arrow-functions-ede88184bbb)를 참조하세요.)

###### 참고자료

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
- https://medium.com/@machnicki/handle-events-in-react-with-arrow-functions-ede88184bbb

[[↑] Back to top](#목차)

### 고차 함수(higher-order function)의 정의는 무엇인가요?

고차 함수는 다른 함수를 매개 변수로 사용하여 어떤 데이터를 처리하거나, 결과로 함수를 반환하는 함수입니다. 고차 함수는 반복적으로 수행되는 어떤 연산을 추상화하기 위한 것입니다. 전형적인 예시는 배열과 함수를 인수로 취하는 `map`입니다. `map`은 고차 함수를 사용하여 배열의 각 항목을 변환하고, 변환된 데이터로 새로운 배열을 반환합니다. JavaScript에서 흔히 볼 수 있는 다른 예로 `forEach`, `filter`, `reduce`가 있습니다. 다른 함수에서 함수를 반환하는 많은 사용사례가 있기 때문에 고차 함수는 배열을 조작할 필요가 없습니다. `Array.prototype.bind`는 JavaScript에서 그러한 예시 중 하나입니다.

**Map**

각 요소를 대문자 문자열로 변환해야하는 이름들을 가진 배열이 있다고 가정해 보겠습니다.

```js
const names = ['irish', 'daisy', 'anna'];
```

일반적인 방법은 다음과 같습니다.

```js
const transformNamesToUppercase = function (names) {
  const results = [];
  for (let i = 0; i < names.length; i++) {
    results.push(names[i].toUpperCase());
  }
  return results;
};
transformNamesToUppercase(names); // ['IRISH', 'DAISY', 'ANNA']
```

`.map(transformerFn)`을 사용하면 코드가 더 짧아지고 선언적이어집니다.

```js
const transformNamesToUppercase = function (names) {
  return names.map((name) => name.toUpperCase());
};
transformNamesToUppercase(names); // ['IRISH', 'DAISY', 'ANNA']
```

###### 참고자료

- https://medium.com/javascript-scene/higher-order-functions-composing-software-5365cf2cbe99
- https://hackernoon.com/effective-functional-javascript-first-class-and-higher-order-functions-713fde8df50a
- https://eloquentjavascript.net/05_higher_order.html

[[↑] Back to top](#목차)

### 객체나 배열에 대한 디스트럭쳐링 예시를 들 수 있나요?

디스트럭쳐링은 ES6에서 사용할 수 있는 표현식으로 객체나 배열의 값을 추출하여 다른 변수에 배치하는 간결하고 편리한 방법을 제공합니다.

**배열 디스트럭쳐링**

```js
// 변수 할당.
const foo = ['one', 'two', 'three'];

const [one, two, three] = foo;
console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "three"
```

```js
// 변수 교환
let a = 1;
let b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1
```

**객체 디스트럭쳐링**

```js
// 변수 할당.
const o = {p: 42, q: true};
const {p, q} = o;

console.log(p); // 42
console.log(q); // true
```

###### 참고자료

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
- https://ponyfoo.com/articles/es6-destructuring-in-depth

[[↑] Back to top](#목차)

### ES6 템플릿 리터럴은 문자열을 생성하는데 많은 유연성을 제공합니다. 이에 대한 예를 들 수 있나요?

템플릿 리터럴을 사용하면 문자열 보간을 하거나 문자열에 변수를 포함하는 작업을 간단하게 수행할 수 있습니다. ES2015 이전에는 아래와 같이하는 것이 일반적이었습니다.

```js
var person = {name: 'Tyler', age: 28};
console.log(
  'Hi, my name is ' + person.name + ' and I am ' + person.age + ' years old!',
);
// 'Hi, my name is Tyler and I am 28 years old!'
```

템플릿 리터럴을 사용하면, 대신 이렇게해도 같은 출력을 만들 수 있습니다.

```js
const person = {name: 'Tyler', age: 28};
console.log(`Hi, my name is ${person.name} and I am ${person.age} years old!`);
// 'Hi, my name is Tyler and I am 28 years old!'
```

템플릿 리터럴을 사용하고 있으며 `${}` 플레이스홀더 안에 표현식을 삽입할 수 있다는 것을 나타내기 위해 따옴표(`'`)가 아닌 백틱(`)을 사용한다는 것에 유의하세요.

두번째 유용한 사용사례는 다중행 문자열을 만드는 것입니다. ES2015 이전에는 아래와 같이 다행의 문자열을 만들 수 있었습니다.

```js
console.log('This is line one.\nThis is line two.');
// This is line one.
// This is line two.
```

또는 코드에서 여러 줄로 나눠진 긴 문자열을 읽기 위해 텍스트 편집기에서 오른쪽으로 스크롤 할 필요가 없도록하려면 다음과 같이 작성할 수 있습니다.

```js
console.log('This is line one.\n' + 'This is line two.');
// This is line one.
// This is line two.
```

그러나 템플릿 리터럴은 당신이 추가한 간격 그대로 유지됩니다. 예를 들어, 위에 작성한 것과 동일한 다중행 출력을 작성하려면 다음과 같이하면 됩니다.

```js
console.log(`This is line one.
This is line two.`);
// This is line one.
// This is line two.
```

템플릿 리터럴의 또 다른 사용사례는 간단한 변수 보간을 위한 템플릿 라이브러리의 대체품으로 사용하는 것입니다.

```js
const person = {name: 'Tyler', age: 28};
document.body.innerHTML = `
  <div>
    <p>Name: ${person.name}</p>
    <p>Name: ${person.age}</p>
  </div>
`;
```

**`.innerHTML`을 사용하면 코드가 XSS의 영향을 받을 수 있습니다. 사용자로부터 입력받은 데이터인 경우 표시하기 전에 데이터를 안전하게 만드세요!**

###### 참고자료

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

[[↑] Back to top](#목차)

### curry 함수의 예를 들어 줄 수 있나요? 그리고 이 문법은 어떤 이점을 가지고 있나요?

currying은 둘 이상의 매개 변수가 있는 함수가 여러 함수로 분리된 패턴으로, 직렬로 호출하면, 필요한 모든 매개 변수가 한 번에 하나씩 누적됩니다. 이 기법은 함수형 스타일로 작성된 코드를 읽고, 합성하기 더 쉬워진 경우 유용할 수 있습니다. 함수를 currying하려면, 하나의 함수로 시작하여, 하나의 매개 변수를 취하는 일련의 함수로 분리해야 합니다.

```js
function curry(fn) {
  if (fn.length === 0) {
    return fn;
  }

  function _curried(depth, args) {
    return function (newArgument) {
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

###### 참고자료

- https://hackernoon.com/currying-in-js-d9ddc64f162e

[[↑] Back to top](#목차)

### spread 문법을 사용할 때의 이점은 무엇이며 rest 문법과 다른 점은 무엇인가요?

ES6의 spread 문법은 함수형 패러다임에서 코딩할 때 매우 유용합니다. 왜냐하면 `Object.create`, `slice`나 라이브러리 함수를 사용하지 않고도 배열이나 객체의 복사본을 쉽게 만들 수 있기 때문입니다. 이 언어 기능은 Redux나 RxJS를 사용하는 프로젝트에서 많이 사용됩니다.

```js
function putDookieInAnyArray(arr) {
  return [...arr, 'dookie'];
}

var result = putDookieInAnyArray(['I', 'really', "don't", 'like']); // ["I", "really", "don't", "like", "dookie"]

var person = {
  name: 'Todd',
  age: 29,
};

var copyOfTodd = {...person};
```

ES6의 rest 구문은 함수에 전달할 임의의 수의 인수를 포함하는 약식을 제공합니다. 이는 데이터의 배열을 채우기보다는 데이터를 가져와서 배열로 채우는 spread 구문의 반대와 비슷하며, 배열이나 객체 디스트럭쳐링 할당뿐만 아니라 함수 인수에서도 작동합니다.

```js
function addFiveToABunchOfNumbers(...numbers) {
  return numbers.map((x) => x + 5);
}

const result = addFiveToABunchOfNumbers(4, 5, 6, 7, 8, 9, 10); // [9, 10, 11, 12, 13, 14, 15]

const [a, b, ...rest] = [1, 2, 3, 4]; // a: 1, b: 2, rest: [3, 4]

const {e, f, ...others} = {
  e: 1,
  f: 2,
  g: 3,
  h: 4,
}; // e: 1, f: 2, others: { g: 3, h: 4 }
```

###### 참고자료

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

[[↑] Back to top](#목차)

### 파일 간에 코드를 공유하려면 어떻게 해야하나요?

이것은 Javascript 환경에 따라 다릅니다.

클라이언트(브라우저 환경)에서는, 변수/함수가 전역 스코프(`window`)에 선언되어있는 한 모든 스크립트가 이를 참조할 수 있습니다. 또는, 보다 모듈형 접근 방식을 위해 RequireJS를 통해 비동기 모듈 정의(AMD)를 이용합니다.

서버(Node.js)에서 일반적인 방법은 CommonJS를 사용하는 것입니다. 각 파일은 모듈로 취급되며, 변수와 함수를 `module.exports` 객체에 붙여서 내보낼 수 있습니다.

ES2015에서는 AMD 및 commonJS를 모두 대체하기 위한 모듈 문법을 정의합니다. 이 기능은 브라우저 및 노드 환경 모두에서 지원됩니다.

###### 참고자료

- http://requirejs.org/docs/whyamd.html
- https://nodejs.org/docs/latest/api/modules.html
- http://2ality.com/2014/09/es6-modules-final.html

[[↑] Back to top](#목차)

### 정적 클래스 멤버를 만드는 이유는 무엇인가요?

정적 클래스 멤버(속성/메서드)는 클래스의 특정 인스턴스와 묶이지 않으며, 어떤 인스턴스가 이를 참조하는지에 관계없이 동일한 값을 가집니다. 정적 속성은 일반적으로 설정(configuration) 변수이며 정적 메서드는 일반적으로 인스턴스의 상태에 의존하지 않는 순수 유틸리티 함수입니다.

###### 참고자료

- https://stackoverflow.com/questions/21155438/when-to-use-static-variables-methods-and-when-to-use-instance-variables-methods

[[↑] Back to top](#목차)

### 다른 답변들

- <http://flowerszhong.github.io/2013/11/20/javascript-questions.html>

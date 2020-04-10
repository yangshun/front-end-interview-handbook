## Pytania z JS

Odpowiedzi do [Front-end Job Interview Questions - JS Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/src/questions/javascript-questions.md). Pull requesty mile widziane, jeśli masz sugestie i poprawki!

- [Explain event delegation](#explain-event-delegation)
- [Explain how `this` works in JavaScript](#explain-how-this-works-in-javascript)
- [Explain how prototypal inheritance works](#explain-how-prototypal-inheritance-works)
- [What do you think of AMD vs CommonJS?](#what-do-you-think-of-amd-vs-commonjs)
- [Explain why the following doesn't work as an IIFE: `function foo(){ }();`. What needs to be changed to properly make it an IIFE?](#explain-why-the-following-doesnt-work-as-an-iife-function-foo--what-needs-to-be-changed-to-properly-make-it-an-iife)
- [What's the difference between a variable that is: `null`, `undefined` or undeclared? How would you go about checking for any of these states?](#whats-the-difference-between-a-variable-that-is-null-undefined-or-undeclared-how-would-you-go-about-checking-for-any-of-these-states)
- [What is a closure, and how/why would you use one?](#what-is-a-closure-and-howwhy-would-you-use-one)
- [Can you describe the main difference between a `.forEach` loop and a `.map()` loop and why you would pick one versus the other?](#can-you-describe-the-main-difference-between-a-foreach-loop-and-a-map-loop-and-why-you-would-pick-one-versus-the-other)
- [What's a typical use case for anonymous functions?](#whats-a-typical-use-case-for-anonymous-functions)
- [How do you organize your code? (module pattern, classical inheritance?)](#how-do-you-organize-your-code-module-pattern-classical-inheritance)
- [What's the difference between host objects and native objects?](#whats-the-difference-between-host-objects-and-native-objects)
- [Difference between: `function Person(){}`, `var person = Person()`, and `var person = new Person()`?](#difference-between-function-person-var-person--person-and-var-person--new-person)
- [What's the difference between `.call` and `.apply`?](#whats-the-difference-between-call-and-apply)
- [Explain `Function.prototype.bind`.](#explain-functionprototypebind)
- [When would you use `document.write()`?](#when-would-you-use-documentwrite)
- [What's the difference between feature detection, feature inference, and using the UA string?](#whats-the-difference-between-feature-detection-feature-inference-and-using-the-ua-string)
- [Explain Ajax in as much detail as possible.](#explain-ajax-in-as-much-detail-as-possible)
- [What are the advantages and disadvantages of using Ajax?](#what-are-the-advantages-and-disadvantages-of-using-ajax)
- [Explain how JSONP works (and how it's not really Ajax).](#explain-how-jsonp-works-and-how-its-not-really-ajax)
- [Have you ever used JavaScript templating? If so, what libraries have you used?](#have-you-ever-used-javascript-templating-if-so-what-libraries-have-you-used)
- [Explain "hoisting".](#explain-hoisting)
- [Describe event bubbling.](#describe-event-bubbling)
- [What's the difference between an "attribute" and a "property"?](#whats-the-difference-between-an-attribute-and-a-property)
- [Why is extending built-in JavaScript objects not a good idea?](#why-is-extending-built-in-javascript-objects-not-a-good-idea)
- [Difference between document `load` event and document `DOMContentLoaded` event?](#difference-between-document-load-event-and-document-domcontentloaded-event)
- [What is the difference between `==` and `===`?](#what-is-the-difference-between--and-)
- [Explain the same-origin policy with regards to JavaScript.](#explain-the-same-origin-policy-with-regards-to-javascript)
- [Make this work: `duplicate([1,2,3,4,5]); // [1,2,3,4,5,1,2,3,4,5]`](#make-this-work)
- [Why is it called a Ternary expression, what does the word "Ternary" indicate?](#why-is-it-called-a-ternary-expression-what-does-the-word-ternary-indicate)
- [What is "use strict";? what are the advantages and disadvantages to using it?](#what-is-use-strict-what-are-the-advantages-and-disadvantages-to-using-it)
- [Create a for loop that iterates up to 100 while outputting "fizz" at multiples of 3, "buzz" at multiples of 5 and "fizzbuzz" at multiples of 3 and 5](#create-a-for-loop-that-iterates-up-to-100-while-outputting-fizz-at-multiples-of-3-buzz-at-multiples-of-5-and-fizzbuzz-at-multiples-of-3-and-5)
- [Why is it, in general, a good idea to leave the global scope of a website as-is and never touch it?](#why-is-it-in-general-a-good-idea-to-leave-the-global-scope-of-a-website-as-is-and-never-touch-it)
- [Why would you use something like the `load` event? Does this event have disadvantages? Do you know any alternatives, and why would you use those?](#why-would-you-use-something-like-the-load-event-does-this-event-have-disadvantages-do-you-know-any-alternatives-and-why-would-you-use-those)
- [Explain what a single page app is and how to make one SEO-friendly.](#explain-what-a-single-page-app-is-and-how-to-make-one-seo-friendly)
- [What is the extent of your experience with Promises and/or their polyfills?](#what-is-the-extent-of-your-experience-with-promises-andor-their-polyfills)
- [What are the pros and cons of using Promises instead of callbacks?](#what-are-the-pros-and-cons-of-using-promises-instead-of-callbacks)
- [What are some of the advantages/disadvantages of writing JavaScript code in a language that compiles to JavaScript?](#what-are-some-of-the-advantagesdisadvantages-of-writing-javascript-code-in-a-language-that-compiles-to-javascript)
- [What tools and techniques do you use debugging JavaScript code?](#what-tools-and-techniques-do-you-use-for-debugging-javascript-code)
- [What language constructions do you use for iterating over object properties and array items?](#what-language-constructions-do-you-use-for-iterating-over-object-properties-and-array-items)
- [Explain the difference between mutable and immutable objects.](#explain-the-difference-between-mutable-and-immutable-objects)
- [Explain the difference between synchronous and asynchronous functions.](#explain-the-difference-between-synchronous-and-asynchronous-functions)
- [What is event loop? What is the difference between call stack and task queue?](#what-is-event-loop-what-is-the-difference-between-call-stack-and-task-queue)
- [Explain the differences on the usage of `foo` between `function foo() {}` and `var foo = function() {}`](#explain-the-differences-on-the-usage-of-foo-between-function-foo--and-var-foo--function-)
- [What are the differences between variables created using `let`, `var` or `const`?](#what-are-the-differences-between-variables-created-using-let-var-or-const)
- [What are the differences between ES6 class and ES5 function constructors?](#what-are-the-differences-between-es6-class-and-es5-function-constructors)
- [Can you offer a use case for the new arrow => function syntax? How does this new syntax differ from other functions?](#can-you-offer-a-use-case-for-the-new-arrow--function-syntax-how-does-this-new-syntax-differ-from-other-functions)
- [What advantage is there for using the arrow syntax for a method in a constructor?](#what-advantage-is-there-for-using-the-arrow-syntax-for-a-method-in-a-constructor)
- [What is the definition of a higher-order function?](#what-is-the-definition-of-a-higher-order-function)
- [Can you give an example for destructuring an object or an array?](#can-you-give-an-example-for-destructuring-an-object-or-an-array)
- [ES6 Template Literals offer a lot of flexibility in generating strings, can you give an example?](#es6-template-literals-offer-a-lot-of-flexibility-in-generating-strings-can-you-give-an-example)
- [Can you give an example of a curry function and why this syntax offers an advantage?](#can-you-give-an-example-of-a-curry-function-and-why-this-syntax-offers-an-advantage)
- [What are the benefits of using spread syntax and how is it different from rest syntax?](#what-are-the-benefits-of-using-spread-syntax-and-how-is-it-different-from-rest-syntax)
- [How can you share code between files?](#how-can-you-share-code-between-files)
- [Why you might want to create static class members?](#why-you-might-want-to-create-static-class-members)

### Wyjaśnij delegowanie zdarzeń

Delegowanie zdarzeń to technika polegająca na dodawaniu event listenerów do elementu nadrzędnego zamiast dodawania ich do elementów potomnych. Listener będzie wyzwalany za każdym razem, gdy zdarzenie zostanie wyzwolone na elementach potomnych z powodu wystąpienia zdarzenia propagującego DOM. Korzyści z tej techniki to:

- Memory footprint zmniejsza się, ponieważ do elementu nadrzędnego potrzebny jest tylko jeden moduł obsługi, zamiast konieczności dołączania modułów obsługi zdarzeń do każdego elementu potomnego.
- Nie ma potrzeby odłączania modułu obsługi od usuwanych elementów i wiązania zdarzenia dla nowych elementów.

###### Bibliografia

- https://davidwalsh.name/event-delegate
- https://stackoverflow.com/questions/1687296/what-is-dom-event-delegation

[[↑] Powrót na górę](#pytania-z-js)

### Wyjaśnij jak `this` działa w JavaScript

Nie ma prostego wyjaśnienia dla `this`; jest to jedna z najbardziej mylących koncepcji w JavaScript. Wytłumaczeniem na szybko jest to, że wartość `this` zależy od tego, jak wywoływana jest funkcja. Przeczytałem wiele wyjaśnień na temat `this` w Internecie i znalazłem wytłumaczenie od [Arnav Aggrawal](https://medium.com/@arnav_aggarwal), jako najbardziej klarowne. Stosuje się następujące zasady:

1. Jeśli słowo kluczowe `new` jest używane podczas wywoływania funkcji, `this` wewnątrz funkcji jest nowym obiektem.
2. Jeśli `apply`, `call`, lub `bind` służą do wywoływania/tworzenia funkcji, `this` wewnątrz funkcji jest obiektem przekazywanym jako argument.
3. Jeśli funkcja jest wywoływana jako metoda, na przykład `obj.method()` — `this` jest obiektem, którego funkcja jest własnością.
4. Jeśli funkcja jest wywoływana jako wywołanie wolnej funkcji, co oznacza, że została wywołana bez żadnego z powyższych warunków, `this` jest globalnym obiektem. W przeglądarce, jest obiektem `window`. Jeśli jest w trybie strict mode (`'use strict'`), `this` będzie `undefined` zamiast globalnego obiektu.
5. Jeśli stosuje się wiele powyższych zasad, reguła, która jest wyższa, wygrywa i ustawi wartość `this`.
6. Jeśli funkcja jest funkcją strzałkową (arrow function) ES2015, ignoruje wszystkie powyższe reguły i otrzymuje wartość `this` swojego otaczającego zakresu w momencie jej tworzenia.

Aby uzyskać szczegółowe wyjaśnienie, sprawdź jego [artykuł na Medium](https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3).

#### Czy możesz podać przykład jednego ze sposobów, w jaki praca z tym zmieniła się w ES6?

ES6 umożliwia korzystanie z [funkcji strzałkowych (arrow functions)](http://2ality.com/2017/12/alternate-this.html#arrow-functions) które wykorzystują [enclosing lexical scope](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_separate_this). Jest to zwykle wygodne, ale nie zabezpiecza caller przed kontrolowaniem kontekstu przez `.call` lub `.apply`— konsekwencją jest to, że biblioteka taka jak `jQuery` nie będzie poprawnie bindować `this` w funkcjach obsługi zdarzeń. Dlatego ważne jest, aby o tym pamiętać przy refaktoryzacji dużych aplikacji.

###### Bibliografia

- https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3
- https://stackoverflow.com/a/3127440/1751946

[[↑] Powrót na górę](#pytania-z-js)

### Wyjaśnij, jak działa dziedziczenie prototypowe

To jest bardzo częste pytanie dotyczące rozmowy rekrutacyjnej w JavaScript. Wszystkie obiekty JavaScript mają właściwość `__proto__`, jest to odniesienie do innego obiektu, który nazywa się "prototypem" obiektu. Gdy właściwość jest udostępniana na obiekt i jeśli właściwość nie została znaleziona na tym obiekcie, silnik JavaScript sprawdza `__proto__` obiektu oraz `__proto__` z `__proto__` i tak dalej, dopóki nie znajdzie właściwości zdefiniowanej w jednym z `__proto__` lub dopóki nie osiągnie końca łańcucha prototypów. To zachowanie symuluje klasyczne dziedziczenie, ale tak naprawdę jest bardziej [delegowaniem niż dziedziczeniem](https://davidwalsh.name/javascript-objects).

#### Przykład dziedziczenia prototypowego

Mamy już wbudowane `Object.create`, ale gdybyś dostarczył dla niego polyfill, mogłoby to wyglądać:

```javascript
if (typeof Object.create !== "function") {
  Object.create = function(parent) {
    function Tmp() {}
    Tmp.prototype = parent;
    return new Tmp();
  };
}

const Parent = function() {
  this.name = "Parent";
};

Parent.prototype.greet = function() {
  console.log("hello from Parent");
};

const child = Object.create(Parent.prototype);

child.cry = function() {
  console.log("waaaaaahhhh!");
};

child.cry();
// Outputs: waaaaaahhhh!

child.greet();
// Outputs: hello from Parent
```

Warto zwrócić uwagę na:

- `.greet` nie jest zdefiniowane w _child_, więc silnik idzie w górę łańcucha prototypów i znajduje `.greet` odziedziczone z _Parent_.
- Musimy wywołać `Object.create` na jeden z następujących sposobów dziedziczenia prototypowych metod:
  - Object.create(Parent.prototype);
  - Object.create(new Parent(null));
  - Object.create(objLiteral);
  - W tej chwili, `child.constructor` wskazuje na `Parent`:

```javascript
child.constructor
ƒ () {
  this.name = "Parent";
}
child.constructor.name
"Parent"
```

- Jeśli chcielibyśmy to naprawić, jedną z opcji byłoby:

```javascript
function Child() {
  Parent.call(this);
  this.name = "child";
}

Child.prototype = Parent.prototype;
Child.prototype.constructor = Child;

const c = new Child();

c.cry();
// Outputs: waaaaaahhhh!

c.greet();
// Outputs: hello from Parent

c.constructor.name;
// Outputs: "Child"
```

###### Bibliografia

- http://dmitrysoshnikov.com/ecmascript/javascript-the-core/
- https://www.quora.com/What-is-prototypal-inheritance/answer/Kyle-Simpson
- https://davidwalsh.name/javascript-objects
- https://crockford.com/javascript/prototypal.html
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain

[[↑] Powrót na górę](#pytania-z-js)

### Co sądzisz o AMD vs CommonJS?

Oba sposoby implementacji systemu modułowego, który nie pojawił się natywnie w JavaScript przed pojawieniem się ES2015. CommonJS jest synchroniczny, podczas gdy AMD (definicja modułu asynchronicznego) jest oczywiście asynchroniczny. CommonJS został zaprojektowany z myślą o rozwoju po stronie serwera, podczas gdy AMD, ze wsparciem dla asynchronicznego ładowania modułów, jest bardziej przeznaczone dla przeglądarek.

Uważam, że składnia AMD jest dość wymowna, a CommonJS jest bliższy stylowi, w którym pisałbyś instrukcje importu w innych językach. Przez większość czasu uważam, że AMD jest niepotrzebne, ponieważ jeśli podałeś cały JavaScript w jednym połączonym pliku pakietu, nie skorzystałbyś z właściwości ładowania asynchronicznego. Ponadto składnia CommonJS jest bliższa stylowi pisania modułów w Node, a przełączanie między tworzeniem JavaScript po stronie klienta i serwera jest mniejsze.

Cieszę się, że dzięki modułom ES2015, które obsługują zarówno ładowanie synchroniczne, jak i asynchroniczne, możemy w końcu zastosować jedno podejście. Chociaż nie został w pełni wdrożony w przeglądarkach i w Node, zawsze możemy użyć transpilatorów do konwersji naszego kodu.

###### Bibliografia

- https://auth0.com/blog/javascript-module-systems-showdown/
- https://stackoverflow.com/questions/16521471/relation-between-commonjs-amd-and-requirejs

[[↑] Powrót na górę](#pytania-z-js)

### Wyjaśnij, dlaczego następujące elementy nie działają jako IIFE: `function foo(){ }();`. Co należy zmienić, aby poprawnie uczynić to IIFE?

IIFE oznacza Immediately Invoked Function Expressions. Parser JavaScript czyta `function foo(){ }();` jako `function foo(){ }` i `();`, gdzie ten pierwszy to _deklaracja funkcji_ i ten drugi (para nawiasów) jest próbą wywołania funkcji, ale nie ma określonej nazwy, dlatego rzuca `Uncaught SyntaxError: Unexpected token )`.

Oto dwa sposoby rozwiązania tego problemu, polegające na dodaniu większej liczby nawiasów: `(function foo(){ })()` oraz `(function foo(){ }())`. Deklaracje zaczynające się od `function` są uważane za _deklaracji funkcji_; poprzez zawinięcie tej funkcji wewnątrz `()`, staje się _wyrażeniem funkcji_ które mogą być następnie wykonane z kolejnym `()`. Funkcje te nie są ujawniane w zakresie globalnym i można nawet pominąć jego nazwę, jeśli nie trzeba odwoływać się do ciała.

Możesz także użyć operatora `void`: `void function foo(){ }();`. Niestety istnieje jeden problem związany z takim podejściem. Ocena danego wyrażenia jest zawsze  `undefined`, więc jeśli funkcja IIFE zwraca cokolwiek, nie możesz jej użyć. Przykład:

```
// Don't add JS syntax to this code block to prevent Prettier from formatting it.
const foo = void function bar() { return 'foo'; }();

console.log(foo); // undefined
```

###### Bibliografia

- http://lucybain.com/blog/2014/immediately-invoked-function-expression/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void

[[↑] Powrót na górę](#pytania-z-js)

### Jaka jest różnica między zmienną: `null`, `undefined` lub niezadeklarowaną? Jak sprawdziłbyś którykolwiek z tych stanów?

**Niezadeklarowane** zmienne są tworzone, gdy przypisujesz wartość do identyfikatora, który nie był wcześniej tworzony przy użyciu `var`, `let` lub `const`. Niezadeklarowane zmienne zostaną zdefiniowane globalnie, poza bieżącym zakresem. W trybie strict mode, `ReferenceError` zostanie rzucony, gdy spróbujesz przypisać do niezadeklarowanej zmiennej. Niezadeklarowane zmienne są złe, tak jak zmienne globalne są złe. Unikaj ich za wszelką cenę! Aby je sprawdzić, zawiń jego użycie w bloku `try`/`catch`.

```js
function foo() {
  x = 1; // Throws a ReferenceError in strict mode
}

foo();
console.log(x); // 1
```

Zmienna `undefined` jest zmienną, która została zadeklarowana, ale nie ma przypisanej wartości. Jest to typu `undefined`. Jeśli funkcja nie zwraca żadnej wartości, ponieważ w wyniku jej wykonania jest przypisana do zmiennej, zmienna ma również wartość `undefined`. Aby to sprawdzić, porównaj, stosując operatora ścisłej równości (`===`) lub `typeof` który da string `'undefined'`. Zauważ, że nie powinieneś używać operatora abstrakcyjnej równości do sprawdzania, ponieważ zwróci on również wartość `true`, jeśli wartość wynosi `null`.

```js
var foo;
console.log(foo); // undefined
console.log(foo === undefined); // true
console.log(typeof foo === "undefined"); // true

console.log(foo == null); // true. Wrong, don't use this to check!

function bar() {}
var baz = bar();
console.log(baz); // undefined
```

Zmienna która jest `null` zostanie wyraźnie przypisana do wartości `null`. Nie reprezentuje żadnej wartości i różni się od `undefined` w tym sensie, że zostało to wyraźnie przypisane. Aby sprawdzić `null,` po prostu porównaj, używając operatora ścisłej równości. Pamiętaj, że podobnie jak powyżej, nie powinieneś używać abstrakcyjnego operatora równości (`==`) do sprawdzenia, to również zwróci `true` jeśli wartość jest `undefined`.

```js
var foo = null;
console.log(foo === null); // true
console.log(typeof foo === "object"); // true

console.log(foo == undefined); // true. Wrong, don't use this to check!
```

Jako osobisty nawyk nigdy nie pozostawiam moich zmiennych niezadeklarowanych ani nieprzypisanych. Wyraźnie przypiszę im `null` po zadeklarowaniu, jeśli nie zamierzam jej jeszcze używać. Jeśli użyjesz lintera w swoim przepływie pracy, zwykle będzie on również w stanie sprawdzić, czy nie odwołujesz się do niezadeklarowanych zmiennych.

###### Bibliografia

- https://stackoverflow.com/questions/15985875/effect-of-declared-and-undeclared-variables
- https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined

[[↑] Powrót na górę](#pytania-z-js)

### Czym jest domknięcie i jak/dlaczego miałbyś je zastosować?

Domknięcie (closure) jest kombinacją funkcji i środowiska leksykalnego, w którym zadeklarowano tę funkcję. Słowo "leksykalny" odnosi się do faktu, że zakres leksykalny wykorzystuje lokalizację, w której zmienna jest zadeklarowana w kodzie źródłowym, w celu ustalenia, gdzie ta zmienna jest dostępna. Domknięcia to funkcje, które mają dostęp do zmiennych funkcji zewnętrznej (obejmującej) - łańcuch zasięgu nawet po zwróceniu funkcji zewnętrznej.

**Dlaczego miałbyś skorzystać z tego?**

- Prywatność danych/emulacja prywatnych metod przy domknięciach. Powszechnie stosowane we [wzorcu modułu](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).
- [Partial applications lub currying](https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8#.l4b6l1i3x).

###### Bibliografia

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
- https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36

[[↑] Powrót na górę](#pytania-z-js)

### Czy możesz opisać główną różnicę pomiędzy pętlą `.forEach`, a pętlą `.map()` i dlaczego wybrałbyś jeden albo drugi?

Aby zrozumieć różnice między nimi, spójrzmy na to, co robi każda funkcja.

**`forEach`**

- Iteruje przez elementy w tablicy.
- Wykonuje callback dla każdego elementu.
- Nie zwraca wartości.

```js
const a = [1, 2, 3];
const doubled = a.forEach((num, index) => {
  // Do something with num and/or index.
});

// doubled = undefined
```

**`map`**

- Iteruje przez elementy w tablicy.
- "Mapuje" każdy element do nowego elementu, wywołując funkcję na każdym elemencie, tworząc w rezultacie nową tablicę.

```js
const a = [1, 2, 3];
const doubled = a.map(num => {
  return num * 2;
});

// doubled = [2, 4, 6]
```

Główna różnica między `.forEach` i `.map()` to to, że `.map()` zwraca nową tablicę. Jeśli potrzebujesz wyniku, ale nie chcesz mutować oryginalnej tablicy, `.map()` jest jasnym wyborem. Jeśli potrzebujesz po prostu iterować tablicę, `forEach` jest dobrym wyborem.

###### Bibliografia

- https://codeburst.io/javascript-map-vs-foreach-f38111822c0f

[[↑] Powrót na górę](#pytania-z-js)

### Jaki jest typowy przypadek użycia funkcji anonimowych?

Można ich użyć w IIFE do enkapsulacji części kodu w zakresie lokalnym, tak aby zmienne zadeklarowane w nim nie przenikały do zakresu globalnego.

```js
(function() {
  // Some code here.
})();
```

Jako callback, które jest używane raz i nie musi być używane nigdzie indziej. Kod będzie wydawał się bardziej samodzielny i czytelny, gdy procedury obsługi zostaną zdefiniowane bezpośrednio w kodzie wywołującym je, zamiast konieczności szukania gdzie indziej w celu znalezienia w ciele funkcji.

```js
setTimeout(function() {
  console.log("Hello world!");
}, 1000);
```

Argumenty do konstrukcji funkcjonalnego programowania lub Lodasha (podobne do callbacków).

```js
const arr = [1, 2, 3];
const double = arr.map(function(el) {
  return el * 2;
});
console.log(double); // [2, 4, 6]
```

###### Bibliografia

- https://www.quora.com/What-is-a-typical-usecase-for-anonymous-functions
- https://stackoverflow.com/questions/10273185/what-are-the-benefits-to-using-anonymous-functions-instead-of-named-functions-fo

[[↑] Powrót na górę](#pytania-z-js)

### Jak organizujesz swój kod? (wzorzec modułu, klasyczne dziedziczenie?)

W przeszłości używałem Backbone do moich modeli, co zachęca do bardziej otwartego podejścia, tworzenia modeli Backbone i dołączania do nich metod.

Wzorzec modułu jest nadal świetny, ale obecnie używam React/Redux, które wykorzystują jednokierunkowy przepływ danych oparty na architekturze Flux. Reprezentowałbym modele mojej aplikacji przy użyciu prostych obiektów i pisał funkcje czysto użytkowe do manipulowania tymi obiektami. Stan jest manipulowany za pomocą akcji i reduktorów, jak w każdej innej aplikacji Redux.

W miarę możliwości unikam dziedziczenia klasycznego. Kiedy już i jeśli to zrobię, trzymam się [tych reguł](https://medium.com/@dan_abramov/how-to-use-classes-and-sleep-at-night-9af8de78ccb4).

[[↑] Powrót na górę](#pytania-z-js)

### Jaka jest różnica między obiektami hosta a obiektami macierzystymi?

Obiekty macierzyste to obiekty, które są częścią języka JavaScript zdefiniowanego w specyfikacji ECMAScript, takie jak `String`, `Math`, `RegExp`, `Object`, `Function`, etc.

Obiekty hosta są dostarczane przez środowisko wykonawcze (przeglądarkę lub Node), takie jak `window`, `XMLHTTPRequest`, etc.

###### Bibliografia

- https://stackoverflow.com/questions/7614317/what-is-the-difference-between-native-objects-and-host-objects

[[↑] Powrót na górę](#pytania-z-js)

### Różnica pomiędzy: `function Person(){}`, `var person = Person()`, i `var person = new Person()`?

To pytanie jest dość niejasne. Myślę, że jego intencją jest to, że pyta o konstruktory w JavaScript. Z technicznego punktu widzenia, `function Person(){}` jest zwykłą deklaracją funkcji. Konwencja polega na wykorzystaniu PascalCase do funkcji, które mają być używane jako konstruktory.

`var person = Person()` wywołuje `Person` jako funkcję, i nie jako konstruktor. Wywołanie jako takie jest częstym błędem, jeśli funkcja ma być używana jako konstruktor. Zazwyczaj konstruktor niczego nie zwraca, dlatego wywołanie konstruktora jak normalnej funkcji zwróci `undefined`, a to zostanie przypisane do zmiennej przeznaczonej jako instancja.

`var person = new Person()` tworzy instancję obiektu `Person` za pomocą operatora `new`, który dziedziczy po `Person.prototype`. Alternatywą byłoby użycie `Object.create`, tak jak: `Object.create(Person.prototype)`.

```js
function Person(name) {
  this.name = name;
}

var person = Person("John");
console.log(person); // undefined
console.log(person.name); // Uncaught TypeError: Cannot read property 'name' of undefined

var person = new Person("John");
console.log(person); // Person { name: "John" }
console.log(person.name); // "john"
```

###### Bibliografia

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new

[[↑] Powrót na górę](#pytania-z-js)

### Jaka jest różnica pomiędzy `.call` i `.apply`?

Zarówno `.call`, jak i `.apply` są używane do wywoływania funkcji, a pierwszy parametr zostanie użyty jako wartość `this` w funkcji. Jednak `.call` przyjmuje argumenty oddzielone przecinkami jako kolejne argumenty, podczas gdy `.apply` przyjmuje tablicę argumentów jako następny argument. Łatwym sposobem na zapamiętanie tego jest C dla `call` i oddzielone przecinkami, i A dla `apply` oraz tablica argumentów.

```js
function add(a, b) {
  return a + b;
}

console.log(add.call(null, 1, 2)); // 3
console.log(add.apply(null, [1, 2])); // 3
```

[[↑] Powrót na górę](#pytania-z-js)

### Wytłumacz `Function.prototype.bind`.

Wzięte słowo w słowo z[MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind):

> Metoda `bind()` tworzy nową funkcję, która po wywołaniu ma ustawione słowo kluczowe `this` na podaną wartość, z podaną sekwencją argumentów poprzedzającą dowolną podaną podczas wywoływania nowej funkcji.

Z mojego doświadczenia wynika, że jest to najbardziej przydatne do bindowania wartości `this` w metodach klas, które chcesz przekazać innym funkcjom. Często odbywa się to w komponentach React.

###### Bibliografia

- https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind

[[↑] Powrót na górę](#pytania-z-js)

### Kiedy użyłbyś `document.write()`?

`document.write()` zapisuje ciąg tekstu do strumienia dokumentów otwartego przez `document.open()`. Kiedy `document.write()` jest wykonywane po załadowaniu strony, wywoła `document.open`, który usuwa cały dokument (`<head>`i `<body>` usunięto!) i zamienia zawartość na podaną wartość parametru. Dlatego jest zwykle uważany za niebezpieczny i podatny na niewłaściwe użycie.

Istnieje kilka odpowiedzi online, które wyjaśniają, że w kodzie analitycznym używany jest `document.write()` lub [gdy chcesz dołączyć style, które powinny działać tylko wtedy, gdy JavaScript jest włączony](https://www.quirksmode.org/blog/archives/2005/06/three_javascrip_1.html). Jest nawet używany w HTML5 boilerplate do [równoległego ładowania skryptów i zachowania kolejności wykonywania](https://github.com/paulirish/html5-boilerplate/wiki/Script-Loading-Techniques#documentwrite-script-tag)! Podejrzewam jednak, że przyczyny te mogą być nieaktualne i we współczesnych czasach można je osiągnąć bez użycia `document.write()`. Proszę, popraw mnie, jeśli się mylę.

###### Bibliografia

- https://www.quirksmode.org/blog/archives/2005/06/three_javascrip_1.html
- https://github.com/h5bp/html5-boilerplate/wiki/Script-Loading-Techniques#documentwrite-script-tag

[[↑] Powrót na górę](#pytania-z-js)

### Jaka jest różnica między wykrywaniem funkcji, feature inference i używaniem UA string?

**Feature Detection**

Wykrywanie funkcji polega na sprawdzeniu, czy przeglądarka obsługuje określony blok kodu, i uruchomieniu innego kodu w zależności od tego, czy to robi (czy nie), tak aby przeglądarka zawsze zapewniała działanie w przypadku awarii/błędów w niektórych przeglądarkach. Na przykład:

```js
if ("geolocation" in navigator) {
  // Can use navigator.geolocation
} else {
  // Handle lack of feature
}
```

[Modernizr](https://modernizr.com/) to świetna biblioteka do obsługi feature detection.

**Feature Inference**

Feature inference sprawdza funkcję podobnie jak wykrywanie funkcji, ale używa innej funkcji, ponieważ zakłada, że ona również będzie istnieć, np .:

```js
if (document.getElementsByTagName) {
  element = document.getElementById(id);
}
```

To nie jest naprawdę zalecane. Wykrywanie funkcji jest bardziej niezawodne.

**UA String**

Jest to string zgłaszany przez przeglądarkę, który umożliwia elementom protokołu sieciowego identyfikowanie typu aplikacji, systemu operacyjnego, dostawcy oprogramowania lub wersji oprogramowania żądającego agenta użytkownika oprogramowania. Można uzyskać do niego dostęp za pośrednictwem `navigator.userAgent`. Jednak string jest trudny do przeanalizowania i może zostać sfałszowany. Na przykład Chrome zgłasza zarówno Chrome, jak i Safari. Aby wykryć Safari, musisz sprawdzić string Safari i nieobecność Chrome string. Unikaj tej metody.

###### Bibliografia

- https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection
- https://stackoverflow.com/questions/20104930/whats-the-difference-between-feature-detection-feature-inference-and-using-th
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent

[[↑] Powrót na górę](#pytania-z-js)

### Wyjaśnij Ajax tak szczegółowo, jak to możliwe.

Ajax (asynchronous JavaScript and XML - asynchroniczny JavaScript i XML) to zestaw technik tworzenia stron internetowych wykorzystujących wiele technologii sieciowych po stronie klienta do tworzenia asynchronicznych aplikacji internetowych. Dzięki Ajax aplikacje internetowe mogą wysyłać dane i pobierać je z serwera asynchronicznie (w tle) bez ingerencji w wyświetlanie i zachowanie istniejącej strony. Oddzielając warstwę wymiany danych od warstwy prezentacji, Ajax pozwala stronom internetowym, a poprzez rozszerzenia aplikacji internetowych, dynamicznie zmieniać treść bez konieczności ponownego ładowania całej strony. W praktyce nowoczesne implementacje często zastępują użycie JSON zamiast XML, ze względu na zalety natywnej obsługi JSON w JavaScript.

API `XMLHttpRequest` jest często używany do komunikacji asynchronicznej lub w dzisiejszych czasach, `fetch` API.

###### Bibliografia

- https://en.wikipedia.org/wiki/Ajax_(programming)
- https://developer.mozilla.org/en-US/docs/AJAX

[[↑] Powrót na górę](#pytania-z-js)

### Jakie są zalety i wady korzystania z Ajax?

**Zalety**

- Lepsza interaktywność. Nowa zawartość z serwera może być zmieniana dynamicznie bez potrzeby przeładowywania całej strony.
- Zmniejsza liczbę połączeń z serwerem, ponieważ skrypty i arkusze stylów muszą być wymagane tylko raz.
- Stan można utrzymać na stronie. Zmienne JavaScript i stan DOM zostaną zachowane, ponieważ główna strona kontenera nie została ponownie załadowana.
- Zasadniczo większość zalet SPA.

**Wady**

- Dynamiczne strony internetowe są trudniejsze do dodania do zakładek.
- Nie działa, jeśli JavaScript jest wyłączony w przeglądarce.
- Niektóre przeglądarki internetowe nie wykonują JavaScript i nie widzą treści załadowanych przez JavaScript.
- Strony internetowe wykorzystujące Ajax do pobierania danych prawdopodobnie będą musiały połączyć pobrane dane zdalne z szablonami po stronie klienta, aby zaktualizować DOM. Aby tak się stało, JavaScript musi zostać przeanalizowany i wykonany w przeglądarce, a urządzenia mobilne z niższej półki mogą mieć z tym problem.
- Zasadniczo większość wad SPA.

[[↑] Powrót na górę](#pytania-z-js)

### Wyjaśnij, jak działa JSONP (i jak to naprawdę nie jest Ajax).

JSONP (JSON with Padding) jest metodą powszechnie używaną do omijania zasad międzydomenowych w przeglądarkach internetowych, ponieważ żądania Ajax z bieżącej strony do domeny międzydomenowej są niedozwolone.

JSONP działa poprzez wysłanie żądania do domeny cross-origin za pomocą znacznika `<script>` i zwykle za pomocą parametru zapytania `callback`, na przykład: `https://example.com?callback=printData`. Serwer następnie opakowuje dane w funkcję o nazwie `printData` i zwraca je klientowi.

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
printData({ name: "Yang Shun" });
```

Klient musi mieć funkcję `printData` w swoim globalnym zasięgu, a funkcja zostanie wykonana przez klienta po otrzymaniu odpowiedzi z domeny cross-origin.

JSONP może być niebezpieczny i ma pewne implikacje dla bezpieczeństwa. Ponieważ JSONP to tak naprawdę JavaScript, może robić wszystko, co potrafi JavaScript, więc musisz zaufać dostawcy danych JSONP.

Obecnie, [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) jest zalecanym podejściem, a JSONP jest postrzegany jako hack.

###### Bibliografia

- https://stackoverflow.com/a/2067584/1751946

[[↑] Powrót na górę](#pytania-z-js)

### Czy kiedykolwiek używałeś szablonów JavaScript? Jeśli tak, z jakich bibliotek korzystałeś?

Tak. Handlebars, Underscore, Lodash, AngularJS, i JSX. Nie podobało mi się tworzenie szablonów w AngularJS, ponieważ często używało łańcuchów w dyrektywach, a literówki nie zostały złapane. JSX jest moim nowym ulubionym, ponieważ jest bliżej JavaScript i nie ma prawie żadnej składni do nauki. W dzisiejszych czasach możesz nawet używać literałów ciągów szablonów ES2015 jako szybkiego sposobu tworzenia szablonów bez konieczności korzystania z kodu innej firmy.

```js
const template = `<div>My name is: ${name}</div>`;
```

Należy jednak pamiętać o potencjalnym XSS w powyższym podejściu, ponieważ zawartość nie jest dla ciebie umykająca, w przeciwieństwie do bibliotek szablonów.

[[↑] Powrót na górę](#pytania-z-js)

### Wytłumacz "hoisting".

Hoisting to termin używany do wyjaśnienia zachowania deklaracji zmiennych w kodzie. Zmienne zadeklarowane lub zainicjowane słowem kluczowym `var` będą miały swoją deklarację "przeniesioną" na górę zakresu na poziomie modułu/funkcji, który nazywamy windowaniem. Jednak tylko deklaracja jest windowana, przydział (jeśli taki istnieje) pozostanie tam, gdzie jest.

Zauważ, że deklaracja nie została faktycznie przeniesiona - silnik JavaScript analizuje deklaracje podczas kompilacji i dowiaduje się o deklaracjach i ich zakresach. Po prostu łatwiej jest zrozumieć to zachowanie, wizualizując deklaracje jako podnoszone na szczyt ich zakresu. Wyjaśnijmy kilka przykładów.

```js
console.log(foo); // undefined
var foo = 1;
console.log(foo); // 1
```

W deklaracjach funkcji podnoszone jest ciało, podczas gdy w wyrażeniach funkcji (zapisanych w formie deklaracji zmiennych) windowanana jest tylko deklaracja zmiennej.

```js
// Function Declaration
console.log(foo); // [Function: foo]
foo(); // 'FOOOOO'
function foo() {
  console.log("FOOOOO");
}
console.log(foo); // [Function: foo]

// Function Expression
console.log(bar); // undefined
bar(); // Uncaught TypeError: bar is not a function
var bar = function() {
  console.log("BARRRR");
};
console.log(bar); // [Function: bar]
```

Windowane są również zmienne zadeklarowane za pomocą `let` i `const`. Jednak w przeciwieństwie do `var` i `function`, nie są one inicjowane i dostęp do nich przed deklaracją spowoduje wyjątek `ReferenceError`. Zmienna znajduje się w "czasowej martwej strefie" od początku bloku do momentu przetworzenia deklaracji.

```js
x; // undefined
y; // Reference error: y is not defined

var x = "local";
let y = "local";
```

###### Bibliografia

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_Types#Variable_hoisting
- https://stackoverflow.com/questions/31219420/are-variables-declared-with-let-or-const-not-hoisted-in-es6/31222689#31222689

[[↑] Powrót na górę](#pytania-z-js)

### Opisz event bubbling.

Kiedy zdarzenie zostanie wyzwolone na elemencie DOM, spróbuje obsłużyć to zdarzenie, jeśli dołączony jest detektor, a następnie zdarzenie zostanie przekazane do jego obiektu nadrzędnego i nastąpi to samo. To 'bubbling' występuje u przodków elementu aż do `document`. Event bubbling jest mechanizmem delegowania zdarzeń.

[[↑] Powrót na górę](#pytania-z-js)

### Jaka jest różnica pomiędzy "attribute", a "property"?

Atrybuty są zdefiniowane w znacznikach HTML, ale właściwości są zdefiniowane w DOM. Aby zilustrować różnicę, wyobraź sobie, że mamy to pole tekstowe w naszym HTML: `<input type="text" value="Hello">`.

```js
const input = document.querySelector("input");
console.log(input.getAttribute("value")); // Hello
console.log(input.value); // Hello
```

Ale po zmianie wartości pola tekstowego przez dodanie "World!" staje się to:

```js
console.log(input.getAttribute("value")); // Hello
console.log(input.value); // Hello World!
```

###### Bibliografia

- https://stackoverflow.com/questions/6003819/properties-and-attributes-in-html

[[↑] Powrót na górę](#pytania-z-js)

### Dlaczego rozszerzenie wbudowanych obiektów JavaScript nie jest dobrym pomysłem?

Rozszerzenie wbudowanego/natywnego obiektu JavaScript oznacza dodanie właściwości/funkcji do jego `prototype`. Choć na początku może się to wydawać dobrym pomysłem, w praktyce jest niebezpieczne. Wyobraź sobie, że twój kod używa kilku bibliotek, które rozszerzają `Array.prototype` poprzez dodanie tej samej metody `contains`, implementacje się nadpisują, a twój kod się zepsuje, jeśli zachowanie tych dwóch metod nie będzie takie samo.

Jedynym momentem, w którym możesz chcieć rozszerzyć obiekt macierzysty, jest utworzenie polyfill, zasadniczo zapewniające własną implementację metody, która jest częścią specyfikacji JavaScript, ale może nie istnieć w przeglądarce użytkownika, jeśli jest to starsza przeglądarka.

###### Bibliografia

- http://lucybain.com/blog/2014/js-extending-built-in-objects/

[[↑] Powrót na górę](#pytania-z-js)

### Difference between document `load` event and document `DOMContentLoaded` event?

The `DOMContentLoaded` event is fired when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.

`window`'s `load` event is only fired after the DOM and all dependent resources and assets have loaded.

###### Bibliografia

- https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
- https://developer.mozilla.org/en-US/docs/Web/Events/load

[[↑] Powrót na górę](#pytania-z-js)

### What is the difference between `==` and `===`?

`==` is the abstract equality operator while `===` is the strict equality operator. The `==` operator will compare for equality after doing any necessary type conversions. The `===` operator will not do type conversion, so if two values are not the same type `===` will simply return `false`. When using `==`, funky things can happen, such as:

```js
1 == "1"; // true
1 == [1]; // true
1 == true; // true
0 == ""; // true
0 == "0"; // true
0 == false; // true
```

My advice is never to use the `==` operator, except for convenience when comparing against `null` or `undefined`, where `a == null` will return `true` if `a` is `null` or `undefined`.

```js
var a = null;
console.log(a == null); // true
console.log(a == undefined); // true
```

###### Bibliografia

- https://stackoverflow.com/questions/359494/which-equals-operator-vs-should-be-used-in-javascript-comparisons

[[↑] Powrót na górę](#pytania-z-js)

### Explain the same-origin policy with regards to JavaScript.

The same-origin policy prevents JavaScript from making requests across domain boundaries. An origin is defined as a combination of URI scheme, hostname, and port number. This policy prevents a malicious script on one page from obtaining access to sensitive data on another web page through that page's Document Object Model.

###### Bibliografia

- https://en.wikipedia.org/wiki/Same-origin_policy

[[↑] Powrót na górę](#pytania-z-js)

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

Or with ES6:

```js
const duplicate = arr => [...arr, ...arr];

duplicate([1, 2, 3, 4, 5]); // [1,2,3,4,5,1,2,3,4,5]
```

[[↑] Powrót na górę](#pytania-z-js)

### Why is it called a Ternary expression, what does the word "Ternary" indicate?

"Ternary" indicates three, and a ternary expression accepts three operands, the test condition, the "then" expression and the "else" expression. Ternary expressions are not specific to JavaScript and I'm not sure why it is even in this list.

###### Bibliografia

- https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

[[↑] Powrót na górę](#pytania-z-js)

### What is `"use strict";`? What are the advantages and disadvantages to using it?

'use strict' is a statement used to enable strict mode to entire scripts or individual functions. Strict mode is a way to opt into a restricted variant of JavaScript.

Advantages:

- Makes it impossible to accidentally create global variables.
- Makes assignments which would otherwise silently fail to throw an exception.
- Makes attempts to delete undeletable properties throw (where before the attempt would simply have no effect).
- Requires that function parameter names be unique.
- `this` is undefined in the global context.
- It catches some common coding bloopers, throwing exceptions.
- It disables features that are confusing or poorly thought out.

Disadvantages:

- Many missing features that some developers might be used to.
- No more access to `function.caller` and `function.arguments`.
- Concatenation of scripts written in different strict modes might cause issues.

Overall, I think the benefits outweigh the disadvantages, and I never had to rely on the features that strict mode blocks. I would recommend using strict mode.

###### Bibliografia

- http://2ality.com/2011/10/strict-mode-hatred.html
- http://lucybain.com/blog/2014/js-use-strict/

[[↑] Powrót na górę](#pytania-z-js)

### Create a for loop that iterates up to `100` while outputting **"fizz"** at multiples of `3`, **"buzz"** at multiples of `5` and **"fizzbuzz"** at multiples of `3` and `5`.

Check out this version of FizzBuzz by [Paul Irish](https://gist.github.com/jaysonrowe/1592432#gistcomment-790724).

```js
for (let i = 1; i <= 100; i++) {
  let f = i % 3 == 0,
    b = i % 5 == 0;
  console.log(f ? (b ? "FizzBuzz" : "Fizz") : b ? "Buzz" : i);
}
```

I would not advise you to write the above during interviews though. Just stick with the long but clear approach. For more wacky versions of FizzBuzz, check out the reference link below.

###### Bibliografia

- https://gist.github.com/jaysonrowe/1592432

[[↑] Powrót na górę](#pytania-z-js)

### Why is it, in general, a good idea to leave the global scope of a website as-is and never touch it?

Every script has access to the global scope, and if everyone uses the global namespace to define their variables, collisions will likely occur. Use the module pattern (IIFEs) to encapsulate your variables within a local namespace.

[[↑] Powrót na górę](#pytania-z-js)

### Why would you use something like the `load` event? Does this event have disadvantages? Do you know any alternatives, and why would you use those?

The `load` event fires at the end of the document loading process. At this point, all of the objects in the document are in the DOM, and all the images, scripts, links and sub-frames have finished loading.

The DOM event `DOMContentLoaded` will fire after the DOM for the page has been constructed, but do not wait for other resources to finish loading. This is preferred in certain cases when you do not need the full page to be loaded before initializing.

TODO.

###### Bibliografia

- https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload

[[↑] Powrót na górę](#pytania-z-js)

### Explain what a single page app is and how to make one SEO-friendly.

The below is taken from the awesome [Grab Front End Guide](https://github.com/grab/front-end-guide), which coincidentally, is written by me!

Web developers these days refer to the products they build as web apps, rather than websites. While there is no strict difference between the two terms, web apps tend to be highly interactive and dynamic, allowing the user to perform actions and receive a response to their action. Traditionally, the browser receives HTML from the server and renders it. When the user navigates to another URL, a full-page refresh is required and the server sends fresh new HTML to the new page. This is called server-side rendering.

However, in modern SPAs, client-side rendering is used instead. The browser loads the initial page from the server, along with the scripts (frameworks, libraries, app code) and stylesheets required for the whole app. When the user navigates to other pages, a page refresh is not triggered. The URL of the page is updated via the [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API). New data required for the new page, usually in JSON format, is retrieved by the browser via [AJAX](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started) requests to the server. The SPA then dynamically updates the page with the data via JavaScript, which it has already downloaded in the initial page load. This model is similar to how native mobile apps work.

The benefits:

- The app feels more responsive and users do not see the flash between page navigations due to full-page refreshes.
- Fewer HTTP requests are made to the server, as the same assets do not have to be downloaded again for each page load.
- Clear separation of the concerns between the client and the server; you can easily build new clients for different platforms (e.g. mobile, chatbots, smart watches) without having to modify the server code. You can also modify the technology stack on the client and server independently, as long as the API contract is not broken.

The downsides:

- Heavier initial page load due to the loading of framework, app code, and assets required for multiple pages.
- There's an additional step to be done on your server which is to configure it to route all requests to a single entry point and allow client-side routing to take over from there.
- SPAs are reliant on JavaScript to render content, but not all search engines execute JavaScript during crawling, and they may see empty content on your page. This inadvertently hurts the Search Engine Optimization (SEO) of your app. However, most of the time, when you are building apps, SEO is not the most important factor, as not all the content needs to be indexable by search engines. To overcome this, you can either server-side render your app or use services such as [Prerender](https://prerender.io/) to "render your javascript in a browser, save the static HTML, and return that to the crawlers".

###### Bibliografia

- https://github.com/grab/front-end-guide#single-page-apps-spas
- http://stackoverflow.com/questions/21862054/single-page-app-advantages-and-disadvantages
- http://blog.isquaredsoftware.com/presentations/2016-10-revolution-of-web-dev/
- https://medium.freecodecamp.com/heres-why-client-side-rendering-won-46a349fadb52

[[↑] Powrót na górę](#pytania-z-js)

### What is the extent of your experience with Promises and/or their polyfills?

Possess working knowledge of it. A promise is an object that may produce a single value sometime in the future: either a resolved value or a reason that it's not resolved (e.g., a network error occurred). A promise may be in one of 3 possible states: fulfilled, rejected, or pending. Promise users can attach callbacks to handle the fulfilled value or the reason for rejection.

Some common polyfills are `$.deferred`, Q and Bluebird but not all of them comply with the specification. ES2015 supports Promises out of the box and polyfills are typically not needed these days.

###### Bibliografia

- https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261

[[↑] Powrót na górę](#pytania-z-js)

### What are the pros and cons of using Promises instead of callbacks?

**Pros**

- Avoid callback hell which can be unreadable.
- Makes it easy to write sequential asynchronous code that is readable with `.then()`.
- Makes it easy to write parallel asynchronous code with `Promise.all()`.
- With promises, these scenarios which are present in callbacks-only coding, will not happen:
  - Call the callback too early
  - Call the callback too late (or never)
  - Call the callback too few or too many times
  - Fail to pass along any necessary environment/parameters
  - Swallow any errors/exceptions that may happen

**Cons**

- Slightly more complex code (debatable).
- In older browsers where ES2015 is not supported, you need to load a polyfill in order to use it.

###### Bibliografia

- https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch3.md

[[↑] Powrót na górę](#pytania-z-js)

### What are some of the advantages/disadvantages of writing JavaScript code in a language that compiles to JavaScript?

Some examples of languages that compile to JavaScript include CoffeeScript, Elm, ClojureScript, PureScript, and TypeScript.

Advantages:

- Fixes some of the longstanding problems in JavaScript and discourages JavaScript anti-patterns.
- Enables you to write shorter code, by providing some syntactic sugar on top of JavaScript, which I think ES5 lacks, but ES2015 is awesome.
- Static types are awesome (in the case of TypeScript) for large projects that need to be maintained over time.

Disadvantages:

- Require a build/compile process as browsers only run JavaScript and your code will need to be compiled into JavaScript before being served to browsers.
- Debugging can be a pain if your source maps do not map nicely to your pre-compiled source.
- Most developers are not familiar with these languages and will need to learn it. There's a ramp up cost involved for your team if you use it for your projects.
- Smaller community (depends on the language), which means resources, tutorials, libraries, and tooling would be harder to find.
- IDE/editor support might be lacking.
- These languages will always be behind the latest JavaScript standard.
- Developers should be cognizant of what their code is being compiled to — because that is what would actually be running, and that is what matters in the end.

Practically, ES2015 has vastly improved JavaScript and made it much nicer to write. I don't really see the need for CoffeeScript these days.

###### Bibliografia

- https://softwareengineering.stackexchange.com/questions/72569/what-are-the-pros-and-cons-of-coffeescript

[[↑] Powrót na górę](#pytania-z-js)

### What tools and techniques do you use for debugging JavaScript code?

- React and Redux
  - [React Devtools](https://github.com/facebook/react-devtools)
  - [Redux Devtools](https://github.com/gaearon/redux-devtools)
- Vue
  - [Vue Devtools](https://github.com/vuejs/vue-devtools)
- JavaScript
  - [Chrome Devtools](https://hackernoon.com/twelve-fancy-chrome-devtools-tips-dc1e39d10d9d)
  - `debugger` statement
  - Good old `console.log` debugging

###### Bibliografia

- https://hackernoon.com/twelve-fancy-chrome-devtools-tips-dc1e39d10d9d
- https://raygun.com/blog/javascript-debugging/

[[↑] Powrót na górę](#pytania-z-js)

### What language constructions do you use for iterating over object properties and array items?

For objects:

- `for-in` loops - `for (var property in obj) { console.log(property); }`. However, this will also iterate through its inherited properties, and you will add an `obj.hasOwnProperty(property)` check before using it.
- `Object.keys()` - `Object.keys(obj).forEach(function (property) { ... })`. `Object.keys()` is a static method that will lists all enumerable properties of the object that you pass it.
- `Object.getOwnPropertyNames()` - `Object.getOwnPropertyNames(obj).forEach(function (property) { ... })`. `Object.getOwnPropertyNames()` is a static method that will lists all enumerable and non-enumerable properties of the object that you pass it.

For arrays:

- `for` loops - `for (var i = 0; i < arr.length; i++)`. The common pitfall here is that `var` is in the function scope and not the block scope and most of the time you would want block scoped iterator variable. ES2015 introduces `let` which has block scope and it is recommended to use that instead. So this becomes: `for (let i = 0; i < arr.length; i++)`.
- `forEach` - `arr.forEach(function (el, index) { ... })`. This construct can be more convenient at times because you do not have to use the `index` if all you need is the array elements. There are also the `every` and `some` methods which will allow you to terminate the iteration early.
- `for-of` loops - `for (let elem of arr) { ... }`. ES6 introduces a new loop, the `for-of` loop, that allows you to loop over objects that conform to the [iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) such as `String`, `Array`, `Map`, `Set`, etc. It combines the advantages of the `for` loop and the `forEach()` method. The advantage of the `for` loop is that you can break from it, and the advantage of `forEach()` is that it is more concise than the `for` loop because you don't need a counter variable. With the `for-of` loop, you get both the ability to break from a loop and a more concise syntax.

Most of the time, I would prefer the `.forEach` method, but it really depends on what you are trying to do. Before ES6, we used `for` loops when we needed to prematurely terminate the loop using `break`. But now with ES6, we can do that with `for-of` loops. I would use `for` loops when I need even more flexibility, such as incrementing the iterator more than once per loop.

Also, when using the `for-of` loop, if you need to access both the index and value of each array element, you can do so with the ES6 Array `entries()` method and destructuring:

```
const arr = ['a', 'b', 'c'];

for (let [index, elem] of arr.entries()) {
  console.log(index, ': ', elem);
}
```

###### Bibliografia

- http://2ality.com/2015/08/getting-started-es6.html#from-for-to-foreach-to-for-of
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries

[[↑] Powrót na górę](#pytania-z-js)

### Explain the difference between mutable and immutable objects.

Immutability is a core principle in functional programming, and has lots to offer to object-oriented programs as well. A mutable object is an object whose state can be modified after it is created. An immutable object is an object whose state cannot be modified after it is created.

#### What is an example of an immutable object in JavaScript?

In JavaScript, some built-in types (numbers, strings) are immutable, but custom objects are generally mutable.

Some built-in immutable JavaScript objects are `Math`, `Date`.

Here are a few ways to add/simulate immutability on plain JavaScript objects.

**Object Constant Properties**

By combining `writable: false` and `configurable: false`, you can essentially create a constant (cannot be changed, redefined or deleted) as an object property, like:

```js
let myObject = {};
Object.defineProperty(myObject, "number", {
  value: 42,
  writable: false,
  configurable: false
});
console.log(myObject.number); // 42
myObject.number = 43;
console.log(myObject.number); // 42
```

**Prevent Extensions**

If you want to prevent an object from having new properties added to it, but otherwise leave the rest of the object's properties alone, call `Object.preventExtensions(...)`:

```
var myObject = {
  a: 2
};

Object.preventExtensions(myObject);

myObject.b = 3;
myObject.b; // undefined
```

In non-strict mode, the creation of `b` fails silently. In strict mode, it throws a `TypeError`.

**Seal**

`Object.seal()` creates a "sealed" object, which means it takes an existing object and essentially calls `Object.preventExtensions()` on it, but also marks all its existing properties as `configurable: false`.

So, not only can you not add any more properties, but you also cannot reconfigure or delete any existing properties (though you can still modify their values).

**Freeze**

`Object.freeze()` creates a frozen object, which means it takes an existing object and essentially calls `Object.seal()` on it, but it also marks all "data accessor" properties as writable:false, so that their values cannot be changed.

This approach is the highest level of immutability that you can attain for an object itself, as it prevents any changes to the object or to any of its direct properties (though, as mentioned above, the contents of any referenced other objects are unaffected).

```js
var immutable = Object.freeze({});
```

Freezing an object does not allow new properties to be added to an object and prevents from removing or altering the existing properties. `Object.freeze()` preserves the enumerability, configurability, writability and the prototype of the object. It returns the passed object and does not create a frozen copy.

#### What are the pros and cons of immutability?

**Pros**

- Easier change detection - Object equality can be determined in a performant and easy manner through referential equality. This is useful for comparing object differences in React and Redux.
- Programs with immutable objects are less complicated to think about, since you don't need to worry about how an object may evolve over time.
- Defensive copies are no longer necessary when immutable objects are returning from or passed to functions, since there is no possibility an immutable object will be modified by it.
- Easy sharing via references - One copy of an object is just as good as another, so you can cache objects or reuse the same object multiple times.
- Thread-safe - Immutable objects can be safely used between threads in a multi-threaded environment since there is no risk of them being modified in other concurrently running threads.
- Using libraries like ImmmutableJS, objects are modified using structural sharing and less memory is needed for having multiple objects with similar structures.

**Cons**

- Naive implementations of immutable data structures and its operations can result in extremely poor performance because new objects are created each time. It is recommended to use libraries for efficient immutable data structures and operations that leverage on structural sharing.
- Allocation (and deallocation) of many small objects rather than modifying existing ones can cause a performance impact. The complexity of either the allocator or the garbage collector usually depends on the number of objects on the heap.
- Cyclic data structures such as graphs are difficult to build. If you have two objects which can't be modified after initialization, how can you get them to point to each other?

###### Bibliografia

- https://stackoverflow.com/questions/1863515/pros-cons-of-immutability-vs-mutability

[[↑] Powrót na górę](#pytania-z-js)

#### How can you achieve immutability in your own code?

One way to achieve immutability is to use libraries like [immutable.js](http://facebook.github.io/immutable-js/), [mori](https://github.com/swannodette/mori) or [immer](https://github.com/immerjs/immer).

The alternative is to use `const` declarations combined with the techniques mentioned above for creation. For "mutating" objects, use the spread operator, `Object.assign`, `Array.concat()`, etc., to create new objects instead of mutate the original object.

Examples:

```js
// Array Example
const arr = [1, 2, 3];
const newArr = [...arr, 4]; // [1, 2, 3, 4]

// Object Example
const human = Object.freeze({ race: "human" });
const john = { ...human, name: "John" }; // {race: "human", name: "John"}
const alienJohn = { ...john, race: "alien" }; // {race: "alien", name: "John"}
```

###### Bibliografia

- https://stackoverflow.com/questions/1863515/pros-cons-of-immutability-vs-mutability
- https://www.sitepoint.com/immutability-javascript/
- https://wecodetheweb.com/2016/02/12/immutable-javascript-using-es6-and-beyond/

[[↑] Powrót na górę](#pytania-z-js)

### Explain the difference between synchronous and asynchronous functions.

Synchronous functions are blocking while asynchronous functions are not. In synchronous functions, statements complete before the next statement is run. In this case, the program is evaluated exactly in order of the statements and execution of the program is paused if one of the statements take a very long time.

Asynchronous functions usually accept a callback as a parameter and execution continue on the next line immediately after the asynchronous function is invoked. The callback is only invoked when the asynchronous operation is complete and the call stack is empty. Heavy duty operations such as loading data from a web server or querying a database should be done asynchronously so that the main thread can continue executing other operations instead of blocking until that long operation to complete (in the case of browsers, the UI will freeze).

[[↑] Powrót na górę](#pytania-z-js)

### What is event loop? What is the difference between call stack and task queue?

The event loop is a single-threaded loop that monitors the call stack and checks if there is any work to be done in the task queue. If the call stack is empty and there are callback functions in the task queue, a function is dequeued and pushed onto the call stack to be executed.

If you haven't already checked out Philip Robert's [talk on the Event Loop](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html), you should. It is one of the most viewed videos on JavaScript.

###### Bibliografia

- https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html
- http://theproactiveprogrammer.com/javascript/the-javascript-event-loop-a-stack-and-a-queue/

[[↑] Powrót na górę](#pytania-z-js)

### Explain the differences on the usage of `foo` between `function foo() {}` and `var foo = function() {}`

The former is a function declaration while the latter is a function expression. The key difference is that function declarations have its body hoisted but the bodies of function expressions are not (they have the same hoisting behavior as variables). For more explanation on hoisting, refer to the question above [on hoisting](#explain-hoisting). If you try to invoke a function expression before it is defined, you will get an `Uncaught TypeError: XXX is not a function` error.

**Function Declaration**

```js
foo(); // 'FOOOOO'
function foo() {
  console.log("FOOOOO");
}
```

**Function Expression**

```js
foo(); // Uncaught TypeError: foo is not a function
var foo = function() {
  console.log("FOOOOO");
};
```

###### Bibliografia

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function

[[↑] Powrót na górę](#pytania-z-js)

### What are the differences between variables created using `let`, `var` or `const`?

Variables declared using the `var` keyword are scoped to the function in which they are created, or if created outside of any function, to the global object. `let` and `const` are _block scoped_, meaning they are only accessible within the nearest set of curly braces (function, if-else block, or for-loop).

```js
function foo() {
  // All variables are accessible within functions.
  var bar = "bar";
  let baz = "baz";
  const qux = "qux";

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
  var bar = "bar";
  let baz = "baz";
  const qux = "qux";
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

var foo = "foo";

console.log(baz); // ReferenceError: can't access lexical declaration 'baz' before initialization

let baz = "baz";

console.log(bar); // ReferenceError: can't access lexical declaration 'bar' before initialization

const bar = "bar";
```

Redeclaring a variable with `var` will not throw an error, but 'let' and 'const' will.

```js
var foo = "foo";
var foo = "bar";
console.log(foo); // "bar"

let baz = "baz";
let baz = "qux"; // Uncaught SyntaxError: Identifier 'baz' has already been declared
```

`let` and `const` differ in that `let` allows reassigning the variable's value while `const` does not.

```js
// This is fine.
let foo = "foo";
foo = "bar";

// This causes an exception.
const baz = "baz";
baz = "qux";
```

###### Bibliografia

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const

[[↑] Powrót na górę](#pytania-z-js)

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

###### Bibliografia

- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance
- https://eli.thegreenplace.net/2013/10/22/classical-inheritance-in-javascript-es5

[[↑] Powrót na górę](#pytania-z-js)

### Can you offer a use case for the new arrow => function syntax? How does this new syntax differ from other functions?

One obvious benefit of arrow functions is to simplify the syntax needed to create functions, without a need for the `function` keyword. The `this` within arrow functions is also bound to the enclosing scope which is different compared to regular functions where the `this` is determined by the object calling it. Lexically-scoped `this` is useful when invoking callbacks especially in React components.

[[↑] Powrót na górę](#pytania-z-js)

### What advantage is there for using the arrow syntax for a method in a constructor?

The main advantage of using an arrow function as a method inside a constructor is that the value of `this` gets set at the time of the function creation and can't change after that. So, when the constructor is used to create a new object, `this` will always refer to that object. For example, let's say we have a `Person` constructor that takes a first name as an argument has two methods to `console.log` that name, one as a regular function and one as an arrow function:

```js
const Person = function(firstName) {
  this.firstName = firstName;
  this.sayName1 = function() {
    console.log(this.firstName);
  };
  this.sayName2 = () => {
    console.log(this.firstName);
  };
};

const john = new Person("John");
const dave = new Person("Dave");

john.sayName1(); // John
john.sayName2(); // John

// The regular function can have its 'this' value changed, but the arrow function cannot
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

The main takeaway here is that `this` can be changed for a normal function, but the context always stays the same for an arrow function. So even if you are passing around your arrow function to different parts of your application, you wouldn't have to worry about the context changing.

This can be particularly helpful in React class components. If you define a class method for something such as a click handler using a normal function, and then you pass that click handler down into a child component as a prop, you will need to also bind `this` in the constructor of the parent component. If you instead use an arrow function, there is no need to also bind "this", as the method will automatically get its "this" value from its enclosing lexical context. (See this article for an excellent demonstration and sample code: https://medium.com/@machnicki/handle-events-in-react-with-arrow-functions-ede88184bbb)

###### Bibliografia

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
- https://medium.com/@machnicki/handle-events-in-react-with-arrow-functions-ede88184bbb

[[↑] Powrót na górę](#pytania-z-js)

### What is the definition of a higher-order function?

A higher-order function is any function that takes one or more functions as arguments, which it uses to operate on some data, and/or returns a function as a result. Higher-order functions are meant to abstract some operation that is performed repeatedly. The classic example of this is `map`, which takes an array and a function as arguments. `map` then uses this function to transform each item in the array, returning a new array with the transformed data. Other popular examples in JavaScript are `forEach`, `filter`, and `reduce`. A higher-order function doesn't just need to be manipulating arrays as there are many use cases for returning a function from another function. `Function.prototype.bind` is one such example in JavaScript.

**Map**

Let say we have an array of names which we need to transform each string to uppercase.

```js
const names = ["irish", "daisy", "anna"];
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

###### Bibliografia

- https://medium.com/javascript-scene/higher-order-functions-composing-software-5365cf2cbe99
- https://hackernoon.com/effective-functional-javascript-first-class-and-higher-order-functions-713fde8df50a
- https://eloquentjavascript.net/05_higher_order.html

[[↑] Powrót na górę](#pytania-z-js)

### Can you give an example for destructuring an object or an array?

Destructuring is an expression available in ES6 which enables a succinct and convenient way to extract values of Objects or Arrays and place them into distinct variables.

**Array destructuring**

```js
// Variable assignment.
const foo = ["one", "two", "three"];

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

###### Bibliografia

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
- https://ponyfoo.com/articles/es6-destructuring-in-depth

[[↑] Powrót na górę](#pytania-z-js)

### ES6 Template Literals offer a lot of flexibility in generating strings, can you give an example?

Template literals help make it simple to do string interpolation, or to include variables in a string. Before ES2015, it was common to do something like this:

```js
var person = { name: "Tyler", age: 28 };
console.log(
  "Hi, my name is " + person.name + " and I am " + person.age + " years old!"
);
// 'Hi, my name is Tyler and I am 28 years old!'
```

With template literals, you can now create that same output like this instead:

```js
const person = { name: "Tyler", age: 28 };
console.log(`Hi, my name is ${person.name} and I am ${person.age} years old!`);
// 'Hi, my name is Tyler and I am 28 years old!'
```

Note that you use backticks, not quotes, to indicate that you are using a template literal and that you can insert expressions inside the `${}` placeholders.

A second helpful use case is in creating multi-line strings. Before ES2015, you could create a multi-line string like this:

```js
console.log("This is line one.\nThis is line two.");
// This is line one.
// This is line two.
```

Or if you wanted to break it up into multiple lines in your code so you didn't have to scroll to the right in your text editor to read a long string, you could also write it like this:

```js
console.log("This is line one.\n" + "This is line two.");
// This is line one.
// This is line two.
```

Template literals, however, preserve whatever spacing you add to them. For example, to create that same multi-line output that we created above, you can simply do:

```js
console.log(`This is line one.
This is line two.`);
// This is line one.
// This is line two.
```

Another use case of template literals would be to use as a substitute for templating libraries for simple variable interpolations:

```js
const person = { name: "Tyler", age: 28 };
document.body.innerHTML = `
  <div>
    <p>Name: ${person.name}</p>
    <p>Name: ${person.age}</p>
  </div>
`;
```

**Note that your code may be susceptible to XSS by using `.innerHTML`. Sanitize your data before displaying it if it came from a user!**

###### Bibliografia

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

[[↑] Powrót na górę](#pytania-z-js)

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

###### Bibliografia

- https://hackernoon.com/currying-in-js-d9ddc64f162e

[[↑] Powrót na górę](#pytania-z-js)

### What are the benefits of using spread syntax and how is it different from rest syntax?

ES6's spread syntax is very useful when coding in a functional paradigm as we can easily create copies of arrays or objects without resorting to `Object.create`, `slice`, or a library function. This language feature is used often in Redux and RxJS projects.

```js
function putDookieInAnyArray(arr) {
  return [...arr, "dookie"];
}

const result = putDookieInAnyArray(["I", "really", "don't", "like"]); // ["I", "really", "don't", "like", "dookie"]

const person = {
  name: "Todd",
  age: 29
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
  h: 4
}; // e: 1, f: 2, others: { g: 3, h: 4 }
```

###### Bibliografia

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

[[↑] Powrót na górę](#pytania-z-js)

### How can you share code between files?

This depends on the JavaScript environment.

On the client (browser environment), as long as the variables/functions are declared in the global scope (`window`), all scripts can refer to them. Alternatively, adopt the Asynchronous Module Definition (AMD) via RequireJS for a more modular approach.

On the server (Node.js), the common way has been to use CommonJS. Each file is treated as a module and it can export variables and functions by attaching them to the `module.exports` object.

ES2015 defines a module syntax which aims to replace both AMD and CommonJS. This will eventually be supported in both browser and Node environments.

[[↑] Powrót na górę](#pytania-z-js)

###### Bibliografia

- http://requirejs.org/docs/whyamd.html
- https://nodejs.org/docs/latest/api/modules.html
- http://2ality.com/2014/09/es6-modules-final.html

### Why you might want to create static class members?

Static class members (properties/methods) are not tied to a specific instance of a class and have the same value regardless of which instance is referring to it. Static properties are typically configuration variables and static methods are usually pure utility functions which do not depend on the state of the instance.

###### Bibliografia

- https://stackoverflow.com/questions/21155438/when-to-use-static-variables-methods-and-when-to-use-instance-variables-methods

[[↑] Powrót na górę](#pytania-z-js)

### Inne odpowiedzi

- http://flowerszhong.github.io/2013/11/20/javascript-questions.html

___________________________
Stworzone przez @[yangshun](https://github.com/yangshun) polska wersja od @[mbiesiad](https://github.com/mbiesiad)

---
title: JavaScript に関する質問
---

[Front-end Job Interview Questions - JS Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/src/questions/javascript-questions.md) の回答集です。提案や訂正のプルリクエストは大歓迎です！

## 目次

- [イベントデリゲーションについて説明してください。](#イベントデリゲーションについて説明してください)
- [JavaScript の `this` はどう機能するものなのか説明してください。](#javascript-の-this-はどう機能するものなのか説明してください)
- [プロトタイプ継承はどのように機能するか説明してください。](#プロトタイプ継承はどのように機能するか説明してください)
- [AMD と CommonJS は何が違いますか？](#amd-と-commonjs-は何が違いますか)
- [なぜ次のコードは IIFE として機能しないのでしょうか？:`function foo(){ }();` IIFE として機能させるには何を変える必要がありますか？](#なぜ次のコードは-iife-として機能しないのでしょうかfunction-foo--iife-として機能させるには何を変える必要がありますか)
- [変数が `null`、`undefined`、未定義だったときの違いはなんでしょう？どのようにして、これらの状態を調べますか？](#変数が-nullundefined未定義だったときの違いはなんでしょうどのようにしてこれらの状態を調べますか)
- [クロージャとはなんですか？また、なぜこれを使うのでしょうか？どのように使うのでしょうか？](#クロージャとはなんですかまたなぜこれを使うのでしょうかどのように使うのでしょうか)
- [`.forEach` と `.map()` の違いを説明できますか？これらをどのように使い分けますか？](#foreach-と-map-の違いを説明できますかこれらをどのように使い分けますか)
- [無名関数の典型的な使い方を教えてください。](#無名関数の典型的な使い方を教えてください)
- [どのようなことを意識してコードを組み立てていますか？（モジュールパターン, classical inheritance？）](#どのようなことを意識してコードを組み立てていますか-モジュールパターン-classical-inheritance)
- [host objects と native objects は何が違いますか？](#host-objects-と-native-objects-は何が違いますか)
- [次のコードの違いはなんですか？:`function Person(){}` 後、`var person = Person()` と `var person = new Person()`](#次のコードの違いはなんですか-function-person-後var-person--person-と-var-person--new-person)
- [`.call` と `.apply` の違いはなんですか？](#call-と-apply-の違いはなんですか)
- [`Function.prototype.bind` について説明してください。](#functionprototypebind-について説明してください)
- [`document.write()` はいつ使いますか？](#documentwrite-はいつ使いますか)
- [feature detection, feature inference, and using the UA string の違いはなんですか？](#feature-detection-feature-inference-and-using-the-ua-string-の違いはなんですか)
- [Ajax をできるだけ詳しく説明してください。](#ajax-をできるだけ詳しく説明してください)
- [Ajax を利用する利点と欠点はなんですか？](#ajax-を利用する利点と欠点はなんですか)
- [JSONP がどのように機能するか（またそれが Ajax とはどこが違うのか）を説明してください。](#jsonp-がどのように機能するかまたそれが-ajax-とはどこが違うのかを説明してください)
- [JavaScript templating を使ったことがありますか？ もしあれば、どのライブラリを使ったことがありますか？](#javascript-templating-を使ったことがありますか-もしあればどのライブラリを使ったことがありますか)
- ["巻き上げ"について説明してください。](#巻き上げについて説明してください)
- [event bubbling について教えてください。](#event-bubbling-について教えてください)
- ["attribute" と "property" の違いを説明してください。](#attribute-と-property-の違いを説明してください)
- [ビルトインオブジェクトを拡張することはなぜ良くないのでしょうか？](#ビルトインオブジェクトを拡張することはなぜ良くないのでしょうか)
- [document `load` event と document `DOMContentLoaded` event の違いは？](#document-load-event-と-document-domcontentloaded-event-の違いは)
- [`==` と `===` の違いはなんですか？](#-と--の違いはなんですか)
- [JavaScript の同一オリジンポリシーについて説明してください。](#javascript-の同一オリジンポリシーについて説明してください)
- [以下のコードを動くようにしてください: `duplicate([1,2,3,4,5]); // [1,2,3,4,5,1,2,3,4,5]`](#以下のコードを動くようにしてください)
- [それが　 Ternary expression と呼ばれるのはなぜですか？ "Ternary" はどういう意味で使われているのでしょうか？](#それがternary-expression-と呼ばれるのはなぜですか-ternary-はどういう意味で使われているのでしょうか)
- [`"use strict";` とはなんですか？これを使う利点と欠点を教えてください。](#use-strict-とはなんですかこれを使う利点と欠点を教えてください)
- [**"fizz"** を`3`の倍数で、**"buzz"** を`5`の倍数で、**"fizzbuzz"** を`3`と`5`の倍数で出力する`100`まで反復する for ループを作成してください。](#fizz-を3の倍数でbuzz-を5の倍数でfizzbuzz-を3と5の倍数で出力する100まで反復する-for-ループを作成してください)
- [Web サイトのグローバルスコープをそのままの状態を保ち、決して触らないことが、一般的に良いとされているのはなぜですか？](#web-サイトのグローバルスコープをそのままの状態を保ち決して触らないことが一般的に良いとされているのはなぜですか)
- [なぜあなたは `load` イベントのようなものを使うのですか？このイベントには欠点がありますか？あなたは何か選択肢を知っていますか、なぜそれらを使うのですか？](#なぜあなたは-load-イベントのようなものを使うのですかこのイベントには欠点がありますかあなたは何か選択肢を知っていますかなぜそれらを使うのですか)
- [シングルページアプリが何であるか、そして SEO に優しいアプリを作る方法を説明してください。](#シングルページアプリが何であるかそして-seo-に優しいアプリを作る方法を説明してください)
- [プロミスおよび/またはそのポリフィルの経験はどの程度ですか？](#プロミスおよびまたはそのポリフィルの経験はどの程度ですか)
- [コールバックの代わりにプロミスを使用することの長所と短所は何ですか？](#コールバックの代わりにプロミスを使用することの長所と短所は何ですか)
- [JavaScript にコンパイルしてくれる言語で JavaScript を書く利点と欠点をいくつか教えてください。](#javascript-にコンパイルしてくれる言語で-javascript-を書く利点と欠点をいくつか教えてください)
- [JavaScript のコードをデバッグする際にはどんなツールや技術をを利用しますか？](#javascript-のコードをデバッグする際にはどんなツールや技術をを利用しますか)
- [オブジェクトのプロパティや、配列の要素をイテレートする際にどの構文を使いますか？](#オブジェクトのプロパティや配列の要素をイテレートする際にどの構文を使いますか)
- [mutable と immutable オブジェクトの違いを説明してください](#mutable-と-immutable-オブジェクトの違いを説明してください)
- [synchronous と asynchronous functions の違いを説明してください。](#synchronous-と-asynchronous-functions-の違いを説明してください)
- [event loop とはなんですか？call stack や task queue との違いはなんですか？](#event-loop-とはなんですかcall-stack-や-task-queue-との違いはなんですか)
- [`function foo() {}` と `var foo = function() {}` をした場合の `foo` の使い方の違いを説明してください。](#function-foo--と-var-foo--function--をした場合の-foo-の使い方の違いを説明してください)
- [`let` と `var` と `const` で宣言した変数の違いはなんですか？](#let-と-var-と-const-で宣言した変数の違いはなんですか)
- [ES6 のクラス定義と、ES5 のコンストラクタ関数との違いには何がありますか？](#es6-のクラス定義とes5-のコンストラクタ関数との違いには何がありますか)
- [アロー構文の使い方を例示してください。この構文と他の方法による定義とは何が違いますか？](#アロー構文の使い方を例示してくださいこの構文と他の方法による定義とは何が違いますか)
- [コンストラクタにおいて、メソッドをアロー構文で定義する方法の利点はなんですか？](#コンストラクタにおいてメソッドをアロー構文で定義する方法の利点はなんですか)
- [高階関数とはなんですか？](#高階関数とはなんですか)
- [オブジェクトと配列について、「分割代入」の例を教えてください。](#オブジェクトと配列について分割代入の例を教えてください)
- [ES6 のテンプレート文字列は文字列を作り出す上で様々な柔軟性をもたらしますが、例を示すことはできますか？](#es6-のテンプレート文字列は文字列を作り出す上で様々な柔軟性をもたらしますが例を示すことはできますか)
- [カリー化の例を説明してください。またカリー化がもたらす利点はどこにあるのでしょうか？](#カリー化の例を説明してくださいまたカリー化がもたらす利点はどこにあるのでしょうか)
- [spread syntax を利用する利点はなんですか？また、rest syntax とは何が違っていますか？](#spread-syntax-を利用する利点はなんですかまたrest-syntax-とは何が違っていますか)
- [ファイル間でコードを共有するにはどうすれば良いですか？](#ファイル間でコードを共有するにはどうすれば良いですか)
- [静的クラスメンバーはどんな場面で使いますか？](#静的クラスメンバーはどんな場面で使いますか)

### イベントデリゲーションについて説明してください。

イベントデリゲーションは、イベントリスナーを子要素に追加するのではなく、親要素に追加する手法です。リスナーは子孫要素でイベントがトリガーされるたびに発生します。これはイベントが DOM を登ってくるためです。この手法の利点は次のとおりです。

- 子孫ごとにイベントハンドラーをアタッチするのではなく親要素に 1 つのハンドラーしか必要ないため、メモリの使用量が減少します。
- 削除された要素からハンドラをはずしたり、新しい要素にイベントをつける必要がなくなります。

###### 参考

- https://davidwalsh.name/event-delegate
- https://stackoverflow.com/questions/1687296/what-is-dom-event-delegation

[[↑] 先頭に戻る](#目次)

### JavaScript の `this` はどう機能するものなのか説明してください。

`this` の簡単な説明はありません。それは JavaScript の最も混乱しやすい概念の 1 つです。手のひら波の説明は、`this` の値が関数の呼び出し方法に依存するということです。私はこのオンラインで多くの説明を読んでおり、[Arnav Aggrawal](https://medium.com/@arnav_aggarwal)の説明が最も明白であることがわかりました。次のルールが適用されます。

1. 関数を呼び出すときに `new` キーワードが使用されている場合、関数内の `this` は全く新しいオブジェクトです。
2. `apply`、`call`、`bind` を使って関数を呼び出す/作成する場合、関数内の `this` は引数として渡されるオブジェクトです。
3. メソッドが `obj.method()` のように呼び出された場合、`this` はその関数がプロパティであるオブジェクトです。
4. 関数が空の関数呼び出しとして呼び出された場合、つまり、上記の条件のいずれかがなくても呼び出された場合、`this` はグローバルオブジェクトです。ブラウザでは、`window` オブジェクトです。strict モード（`'use strict'`）の場合、`this` はグローバルオブジェクトではなく `undefined` になります。
5. 上記のルールの複数が適用される場合、より高いルールが勝ち、`this` 値を設定します。
6. 関数が ES2015 矢印関数の場合、上記のすべてのルールを無視し、作成時にその周囲のスコープの `this` 値を受け取ります。

詳細な説明は、彼の [article on Medium](https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3) を参照してください。

###### 参考

- https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3
- https://stackoverflow.com/a/3127440/1751946

[[↑] 先頭に戻る](#目次)

### プロトタイプ継承はどのように機能するか説明してください。

これは非常によくある JavaScript インタビューの質問です。すべての JavaScript オブジェクトには、別のオブジェクトへの参照である `__proto__` プロパティがあります。プロパティがオブジェクト上でアクセスされ、プロパティがそのオブジェクトに見つからない場合、JavaScript エンジンはオブジェクトの `__proto__` と `__proto__` の `__proto__` などを調べて、プロパティが定義されるまで探します。プロトタイプチェーンの最後に到達するまで、この動作は古典的な継承をシミュレートしますが、実際は継承よりも委譲されています （[delegation than inheritance](https://davidwalsh.name/javascript-objects)）。

###### 参考

- https://www.quora.com/What-is-prototypal-inheritance/answer/Kyle-Simpson
- https://davidwalsh.name/javascript-objects

[[↑] 先頭に戻る](#目次)

### AMD と CommonJS は何が違いますか？

どちらも、ES2015 が登場するまで JavaScript にネイティブに存在しなかったモジュールシステムを実装する方法です。CommonJS は同期ですが、AMD（Asynchronous Module Definition）は明らかに非同期です。CommonJS はサーバー側の開発を念頭に置いて設計されていますが、AMD はモジュールの非同期ロードをサポートしているため、ブラウザ向けのものです。

私は AMD 構文が非常に冗長であり、CommonJS は他の言語のインポート文を書くスタイルに近いことがわかります。ほとんどの場合、すべての JavaScript を 1 つの連結されたバンドルファイルに提供した場合、非同期読み込みプロパティのメリットはないため、AMD は不要です。また、CommonJS 構文は、モジュールを書くノードスタイルに近く、クライアント側とサーバー側の JavaScript 開発を切り替える際のコンテキスト切り替えのオーバーヘッドが少なくなります。

同期と非同期の両方のロードをサポートする ES2015 モジュールでは、最終的には 1 つのアプローチに固執することができてうれしいです。ブラウザや Node では完全にロールアウトされていませんが、私たちはいつでもトランスパイラを使用してコードを変換することができます。

###### 参考

- https://auth0.com/blog/javascript-module-systems-showdown/
- https://stackoverflow.com/questions/16521471/relation-between-commonjs-amd-and-requirejs

[[↑] 先頭に戻る](#目次)

### なぜ次のコードは IIFE として機能しないのでしょうか？:`function foo(){ }();` IIFE として機能させるには何を変える必要がありますか？

IIFE は、Immediately Invoked Function Expressions の略です。JavaScript のパーサーは、`function foo(){ }();` を `function foo(){ }` と `();` として読み込みます。前者は関数宣言で、後者（括弧のペア）は試行です 関数を呼び出すときに名前が指定されていないので、`Uncaught SyntaxError: Unexpected token )` をスローします）。

`(function foo(){ })()` と `(function foo(){ }())` を追加するという 2 つの方法があります。これらの関数はグローバルスコープで公開されておらず、本体内で自身を参照する必要がない場合は、その名前を省略することもできます。

###### 参考

- http://lucybain.com/blog/2014/immediately-invoked-function-expression/

[[↑] 先頭に戻る](#目次)

### 変数が `null`、`undefined`、未定義だったときの違いはなんでしょう？どのようにして、これらの状態を調べますか？

**宣言されていない** 変数は、以前に `var`、`let` または `const` を使って作成されていない識別子に値を代入すると作成されます。宣言されていない変数は、現在のスコープの外部でグローバルに定義されます。strict モードでは、宣言されていない変数に代入しようとすると、`ReferenceError` がスローされます。宣言されていない変数は、グローバル変数がどのように悪いかと同じように悪いです。すべてのコストでそれらを避けてください！それらをチェックするには、その使用法を `try`/`catch` ブロックで囲みます。

```js
function foo() {
  x = 1; // Throws a ReferenceError in strict mode
}

foo();
console.log(x); // 1
```

`undefined` の変数は、宣言されているが値が割り当てられていない変数です。これは `undefined` 型です。実行結果が変数に代入されたときに関数が値を返さない場合、その変数は `undefined` の値も持ちます。それをチェックするには、厳密な等価（`===`）演算子、または `'undefined'` 文字列を与える `typeof` を使って比較してください。チェックするのに抽象均等演算子を使用すべきではないことに注意してください。値が `null` の場合は `true` も返されます。

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

`null` である変数は `null` 値に明示的に割り当てられます。これは明示的に割り当てられているという意味では値を表さず、`undefined` とは異なります。`null` をチェックするには、厳密な等価演算子を使って単純に比較します。上記のように、抽象均等演算子（`==`）を使ってチェックするべきではないことに注意してください。値が `undefined` の場合は `true` を返します。

```js
var foo = null;
console.log(foo === null); // true

console.log(foo == undefined); // true. Wrong, don't use this to check!
```

個人的な習慣として、変数を宣言されていない、または割り当てられていないままにすることは決してありません。宣言した後、明示的に `null` を割り当てるようにします。

###### 参考

- https://stackoverflow.com/questions/15985875/effect-of-declared-and-undeclared-variables
- https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined (英語)
- https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/undefined (日本語)

[[↑] 先頭に戻る](#目次)

### クロージャとはなんですか？また、なぜこれを使うのでしょうか？どのように使うのでしょうか？

クロージャは、関数とその関数が宣言されているレキシカル環境の組み合わせです。単語 "字句"は、語彙スコープがソースコード内で変数が宣言されている場所を使用して、その変数がどこで使用可能かを判断するという事実を指します。クロージャは、外側の関数が返った後でも、外側（囲む）関数の変数 - スコープチェーンにアクセスできる関数です。

**なぜそれを使うのか？**

- データのプライバシー/クロージャによるプライベートメソッドのエミュレート。[モジュールパターン](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)でよく使われる。
- [Partial applications or currying](https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8#.l4b6l1i3x)

###### 参考

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
- https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36

[[↑] 先頭に戻る](#目次)

### `.forEach` と `.map()` の違いを説明できますか？これらをどのように使い分けますか？

両者の違いを理解するために、各機能が何をしているかを見てみましょう。

**`forEach`**

- 配列内の要素を反復処理します。
- 各要素のコールバックを実行します。
- 値を返しません。

```js
const a = [1, 2, 3];
const doubled = a.forEach((num, index) => {
  // Do something with num and/or index.
});

// doubled = undefined
```

**`map`**

- 配列内の要素を反復処理します。
- 各要素の関数を呼び出し、結果として新しい配列を作成して、各要素を新しい要素にマップします。

```js
const a = [1, 2, 3];
const doubled = a.map((num) => {
  return num * 2;
});

// doubled = [2, 4, 6]
```

`.forEach` と `.map()` の主な違いは、`.map()` が新しい配列を返すことです。結果が必要だが元の配列を変更したくない場合は、`.map()` がはっきりとした選択です。単に配列を反復処理する必要がある場合、`forEach` は良い選択です。

###### 参考

- https://codeburst.io/javascript-map-vs-foreach-f38111822c0f

[[↑] 先頭に戻る](#目次)

### 無名関数の典型的な使い方を教えてください。

IIFE では、ローカルスコープ内でコードをカプセル化して、その中で宣言された変数がグローバルスコープに漏れないようにすることができます。

```js
(function () {
  // Some code here.
})();
```

一度使用され、他の場所で使用する必要がないコールバックです。関数本体を見つけるために他の場所を検索する必要がなく、コードを呼び出すコードの中でハンドラが定義されていると、コードはより自蔵的で読みやすいように見えます。

```js
setTimeout(function () {
  console.log('Hello world!');
}, 1000);
```

関数型プログラミング構造体または Lodash への引数（コールバックと同様）。

```js
const arr = [1, 2, 3];
const double = arr.map(function (el) {
  return el * 2;
});
console.log(double); // [2, 4, 6]
```

###### 参考

- https://www.quora.com/What-is-a-typical-usecase-for-anonymous-functions
- https://stackoverflow.com/questions/10273185/what-are-the-benefits-to-using-anonymous-functions-instead-of-named-functions-fo

[[↑] 先頭に戻る](#目次)

### どのようなことを意識してコードを組み立てていますか？ (モジュールパターン, classical inheritance？)

以前は、バックボーンモデルを作成し、そのモデルにメソッドを追加することで、OOP のアプローチを奨励するモデルに Backbone を使用しました。

モジュールのパターンはまだまだですが、最近では React/Redux をベースにした Flux アーキテクチャを使用しており、代わりに片方向関数型プログラミングのアプローチを採用しています。私は普通のオブジェクトを使って自分のアプリケーションのモデルを表現し、これらのオブジェクトを操作するためのユーティリティ純関数を記述します。状態は、他の Redux アプリケーションのようにアクションとレデューサーを使用して操作されます。

私は可能な限り古典的な継承を避けます。私がそうすると、[これらの規則](https://medium.com/@dan_abramov/how-to-use-classes-and-sleep-at-night-9af8de78ccb4)に固執します。

[[↑] 先頭に戻る](#目次)

### host objects と native objects は何が違いますか？

ネイティブオブジェクトは、`String`、`Math`、`RegExp`、`Object`、`Function` など、ECMAScript 仕様で定義された JavaScript 言語の一部であるオブジェクトです。

ホストオブジェクトは、`window`、`XMLHTTPRequest` などのランタイム環境（ブラウザまたはノード）によって提供されます。

###### 参考

- https://stackoverflow.com/questions/7614317/what-is-the-difference-between-native-objects-and-host-objects

[[↑] 先頭に戻る](#目次)

### 次のコードの違いはなんですか？: `function Person(){}` 後、`var person = Person()` と `var person = new Person()`

この質問はかなり曖昧です。JavaScript のコンストラクタについて質問しているのが私の考えです。技術的に言えば、`function Person(){}` は通常の関数宣言にすぎません。コンベンションでは、コンストラクタとして使用するための関数に対して PascalCase を使用しています。

`var person = Person()` はコンストラクタとしてではなく、関数として `Person` を呼び出します。関数をコンストラクタとして使用することが意図されている場合、そのような呼び出しはよくある間違いです。通常、コンストラクタは何も返さないので、通常の関数のようにコンストラクタを呼び出すと `undefined` が返され、インスタンスとして意図された変数に代入されます。

`var person = new Person()` は、`Person` オブジェクトのインスタンスを、`Person.prototype` から継承した `new` 演算子を使って作成します。代わりに、`Object.create(Person.prototype)` のような `Object.create` を使うこともできます。

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

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new (英語)
- https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/new (日本語)

[[↑] 先頭に戻る](#目次)

### `.call` と `.apply` の違いはなんですか？

`.call` と `.apply` は関数を呼び出すために使われ、最初のパラメータは関数内の `this` の値として使われます。しかし、`.call` は次の引数としてコンマ区切りの引数をとり、`.apply` は次の引数として引数の配列をとります。これを覚えやすい簡単な方法は、`call` ではカンマで区切り、`apply` とカンマで区切られた引数と引数の配列です。

```js
function add(a, b) {
  return a + b;
}

console.log(add.call(null, 1, 2)); // 3
console.log(add.apply(null, [1, 2])); // 3
```

[[↑] 先頭に戻る](#目次)

### `Function.prototype.bind` について説明してください。

[MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) から word-for-word を取り出しました：

> `bind()` メソッドは、呼び出されたときに this キーワードが指定された値に設定され、新しい関数が呼び出されたときに指定された引数のシーケンスが指定された値よりも前にある新しい関数を作成します。

私の経験上、他の関数に渡したいクラスのメソッドで `this` の値を束縛するのが最も有益です。これは React コンポーネントでよく行われます。

###### 参考

- https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind (英語)
- https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/bind (日本語)

[[↑] 先頭に戻る](#目次)

### `document.write()` はいつ使いますか？

`document.write()` は `document.open()` によってオープンされた文書ストリームに文字列を書き込みます。ページがロードされた後 `document.write()` が実行されると、`document.open` が呼び出され、ドキュメント全体が消去されます（`<head>` と `<body>`）文字列に与えられたパラメータ値。したがって、通常は危険であり、誤用されやすいと考えられています。

`document.write()` が解析コードで使用されている、または[JavaScript が有効になっている場合のみ動作するスタイルを含める場合](https://www.quirksmode.org/blog/archives/2005/06/three_javascrip_1.html)。HTML5 の定型句で[スクリプトを並行してロードして実行順序を保持する](https://github.com/paulirish/html5-boilerplate/wiki/Script-Loading-Techniques#documentwrite-script-tag)にも使用されています。しかし、私はそれらの理由が時代遅れかもしれないと思うし、現代では `document.write()` を使わなくても達成できます。私がこれについて間違っているなら、私に正しいことをしてください。

###### 参考

- https://www.quirksmode.org/blog/archives/2005/06/three_javascrip_1.html
- https://github.com/h5bp/html5-boilerplate/wiki/Script-Loading-Techniques#documentwrite-script-tag

[[↑] 先頭に戻る](#目次)

### feature detection, feature inference, and using the UA string の違いはなんですか？

**Feature Detection**

機能の検出には、ブラウザが特定のコードブロックをサポートしているかどうか、またそのコードが実行されているかどうかに応じて異なるコードが実行されているかどうかが決まります。例えば:

```js
if ('geolocation' in navigator) {
  // Can use navigator.geolocation
} else {
  // Handle lack of feature
}
```

[Modernizr](https://modernizr.com/) は、機能の検出を処理する素晴らしいライブラリです。

**Feature Inference**

フィーチャの推論は、フィーチャの検出と同様にフィーチャをチェックしますが、フィーチャが存在すると仮定して別の関数を使用します（例：

```js
if (document.getElementsByTagName) {
  element = document.getElementById(id);
}
```

これはあまり推奨されません。フィーチャの検出の方がより確実です。

**UA String**

これは、ネットワークプロトコルピアがアプリケーションタイプ、オペレーティングシステム、ソフトウェアベンダー、または要求しているソフトウェアユーザーエージェントのソフトウェアバージョンを識別できるようにするブラウザで報告された文字列です。これは `navigator.userAgent` を介してアクセスできます。しかし、文字列は解析するのが難しく、なりすましをすることができます。たとえば、Chrome は Chrome と Safari の両方としてレポートします。Safari を検出するには、Safari の文字列と Chrome 文字列がないかどうかを確認する必要があります。この方法は避けてください。

###### 参考

- https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection (英語)
- https://developer.mozilla.org/ja/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection (日本語)
- https://stackoverflow.com/questions/20104930/whats-the-difference-between-feature-detection-feature-inference-and-using-th
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent (英語)
- https://developer.mozilla.org/ja/docs/Web/HTTP/Browser_detection_using_the_user_agent (日本語)

[[↑] 先頭に戻る](#目次)

### Ajax をできるだけ詳しく説明してください。

Ajax（非同期 JavaScript と XML）は、クライアント側で多くの Web テクノロジを使用して非同期 Web アプリケーションを作成する一連の Web 開発手法です。Ajax を使用すると、Web アプリケーションは、既存のページの表示や動作を妨げずに、バックグラウンドで非同期的にサーバーにデータを送信し、サーバーから取得することができます。Ajax は、データ交換レイヤーをプレゼンテーション・レイヤーから切り離すことにより、Web ページ、さらには Web アプリケーションに対して、ページ全体を再ロードせずにコンテンツを動的に変更できるようにします。実際には、現代の実装では、XML を JSON に置き換えるのが一般的です。これは、JavaScript 固有のメリットがあるからです。

`XMLHttpRequest` API は、非同期通信や最近の `fetch` API のためによく使われます。

###### 参考

- https://en.wikipedia.org/wiki/Ajax_(programming)
- https://developer.mozilla.org/en-US/docs/AJAX (英語)
- https://developer.mozilla.org/ja/docs/AJAX (日本語)

[[↑] 先頭に戻る](#目次)

### Ajax を利用する利点と欠点はなんですか？

**利点**

- より良い対話性。サーバーからの新しいコンテンツは、ページ全体をリロードする必要なく動的に変更できます。
- スクリプトとスタイルシートは一度しか要求されないので、サーバへの接続を減らす。
- 状態はページ上で維持することができます。メインのコンテナページがリロードされなかったため、JavaScript 変数と DOM 状態は保持されます。
- 基本的に SPA の利点のほとんど。

**欠点**

- 動的なウェブページはブックマークするのが難しいです。
- ブラウザで JavaScript が無効になっていると機能しません。
- 一部の Webcrawler は JavaScript を実行しないため、JavaScript によって読み込まれたコンテンツは表示されません。
- SPA の基本的な欠点。

[[↑] 先頭に戻る](#目次)

### JSONP がどのように機能するか（またそれが Ajax とはどこが違うのか）を説明してください。

JSONP（パディング付き JSON）は、現在のページからクロスオリジンドメインへの Ajax リクエストが許可されていないため、Web ブラウザでクロスドメインポリシーをバイパスするためによく使用されるメソッドです。

JSONP は、`<script>` タグを介してクロスオリジンドメインにリクエストを行い、通常 `callback` クエリパラメータでリクエストします（例：`https://example.com?callback=printData`）。サーバは、`printData` と呼ばれる関数内でデータをラップし、それをクライアントに返します。

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
printData({name: 'Yang Shun'});
```

クライアントは、そのグローバルスコープ内に `printData` 関数を持たなければならず、関数はクロスオリジンドメインからの応答を受け取ったときにクライアントによって実行されます。

JSONP は安全ではなく、セキュリティ上の問題もあります。JSONP は実際に JavaScript であるため、JavaScript が実行できるすべての処理を行うことができるため、JSONP データのプロバイダを信頼する必要があります。

最近、[CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) が推奨されており、JSONP はハックとして認識されています。

###### 参考

- https://stackoverflow.com/a/2067584/1751946

[[↑] 先頭に戻る](#目次)

### JavaScript templating を使ったことがありますか？ もしあれば、どのライブラリを使ったことがありますか？

はい。Handlebars、Underscore、Lodash、AngularJS、JSX。私は AngularJS でテンプレートを嫌っていました。ディレクティブで文字列を大量に使用したり、タイプミスが検出されなかったからです。JSX は JavaScript に近いため、学ぶための構文はほとんどありませんので、私の新しいお気に入りです。今日、サードパーティのコードに頼らずにテンプレートを作成するための素早い方法として、ES2015 のテンプレート文字列リテラルを使用することもできます。

```js
const template = `<div>My name is: ${name}</div>`;
```

ただし、上記のアプローチでは、テンプレートライブラリとは異なり、コンテンツがエスケープされない可能性があるため、潜在的な XSS に注意してください。

[[↑] 先頭に戻る](#目次)

### "巻き上げ"について説明してください。

巻き上げは、コード内の変数宣言の動作を説明するために使用される用語です。`var` キーワードで宣言または初期化された変数の宣言は、現在のスコープの先頭まで "巻き上げ"されます。しかし、宣言だけが吊り上げられ、譲渡（存在する場合）がその場所にとどまります。いくつかの例をあげて説明しましょう。

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

関数宣言は本体を持ち上げているが、関数式（変数宣言の形で書かれている）は変数宣言のみを持ち上げている。

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
var bar = function () {
  console.log('BARRRR');
};
console.log(bar); // [Function: bar]
```

[[↑] 先頭に戻る](#目次)

### event bubbling について教えてください。

DOM エレメントでイベントがトリガーされると、リスナーが接続されている場合にイベントを処理しようとすると、そのイベントは親に浮上(bubble up)され、同じことが起こります。この泡立ちは、要素の先祖を `document` までずっと上げています。イベントの浮上(bubble up)は、イベントの委任の背後にあるメカニズムです。

[[↑] 先頭に戻る](#目次)

### "attribute" と "property" の違いを説明してください。

属性は HTML マークアップで定義されますが、プロパティは DOM で定義されます。違いを説明するために、HTML にこのテキストフィールドがあるとします：`<input type="text" value="Hello">`

```js
const input = document.querySelector('input');
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello
```

しかし、"World！"を追加してテキストフィールドの値を変更した後、それは、以下になります:

```js
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello World!
```

###### 参考

- https://stackoverflow.com/questions/6003819/properties-and-attributes-in-html

[[↑] 先頭に戻る](#目次)

### ビルトインオブジェクトを拡張することはなぜ良くないのでしょうか？

ビルトイン/ネイティブの JavaScript オブジェクトを拡張することは、その `prototype` にプロパティ/関数を追加することを意味します。これは最初は良いアイデアのように思えるかもしれませんが、実際には危険です。あなたのコードが同じ `contains` メソッドを追加することによって `Array.prototype` を拡張し、実装がお互いを上書きし、これらの 2 つのメソッドの動作が同じでない場合、あなたのコードが壊れてしまういくつかのライブラリを使っているとしましょう。

ネイティブオブジェクトを拡張する唯一の方法は、ポリフィルを作成する場合です。これは、JavaScript 仕様の一部であり、古いブラウザであるためにユーザーのブラウザには存在しないメソッドの独自の実装を提供することです。

###### 参考

- http://lucybain.com/blog/2014/js-extending-built-in-objects/

[[↑] 先頭に戻る](#目次)

### document `load` event と document `DOMContentLoaded` event の違いは？

`DOMContentLoaded` イベントは、スタイルシート、イメージ、サブフレームの読み込みを待つことなく、最初の HTML ドキュメントが完全に読み込まれ、解析されたときに発生します。

`window` の `load` イベントは、DOM とすべての従属リソースとアセットがロードされた後にのみ起動されます。

###### 参考

- https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded (英語)
- https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded (日本語)
- https://developer.mozilla.org/en-US/docs/Web/Events/load (英語)
- https://developer.mozilla.org/en-US/docs/Web/Events/load (日本語)

[[↑] 先頭に戻る](#目次)

### `==` と `===` の違いはなんですか？

`==` は抽象的な等価演算子であり、`===` は厳密な等価演算子です。`==` 演算子は、必要な型変換を行った後、等しいかどうかを比較します。`===` 演算子は型変換を行いません。したがって、2 つの値が同じ型でない場合、`===` は単に `false` を返します。`==` を使用すると、次のような厄介なことが起こる可能性があります:

```js
1 == '1'; // true
1 == [1]; // true
1 == true; // true
0 == ''; // true
0 == '0'; // true
0 == false; // true
```

私のアドバイスは `==` 演算子を使用しない事です。`null` や `undefined` を比較するような場合に、`a` が `null` でも `undefined` でも `a == null` が `true` を返すからです。

```js
var a = null;
console.log(a == null); // true
console.log(a == undefined); // true
```

###### 参考

- https://stackoverflow.com/questions/359494/which-equals-operator-vs-should-be-used-in-javascript-comparisons

[[↑] 先頭に戻る](#目次)

### JavaScript の同一オリジンポリシーについて説明してください。

同じ起点ポリシーは、JavaScript がドメインの境界を越えて要求を作成するのを防ぎます。原点は、URI スキーム、ホスト名、およびポート番号の組み合わせとして定義されます。このポリシーは、あるページの悪意のあるスクリプトが、そのページのドキュメントオブジェクトモデルを介して別の Web ページの機密データにアクセスすることを防止します。

###### 参考

- https://en.wikipedia.org/wiki/Same-origin_policy

[[↑] 先頭に戻る](#目次)

### 以下のコードを動くようにしてください:

```js
duplicate([1, 2, 3, 4, 5]); // [1,2,3,4,5,1,2,3,4,5]
```

```js
function duplicate(arr) {
  return arr.concat(arr);
}

duplicate([1, 2, 3, 4, 5]); // [1,2,3,4,5,1,2,3,4,5]
```

[[↑] 先頭に戻る](#目次)

### それが　 Ternary expression と呼ばれるのはなぜですか？ "Ternary" はどういう意味で使われているのでしょうか？

"Ternary" は 3 つを示し、3 つの式は 3 つのオペランド、テスト条件、"then" 式および "else" 式を受け入れます。三項式は JavaScript に固有のものではなく、なぜこのリスト内にあるのかわかりません。

###### 参考

- https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator (英語)
- https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator (日本語)

[[↑] 先頭に戻る](#目次)

### `"use strict";` とはなんですか？これを使う利点と欠点を教えてください。

'use strict' は、スクリプトまたは個々の関数全体に厳密なモードを有効にするために使用されるステートメントです。厳密モードは、JavaScript の制限された変形にオプトインする方法です。

利点：

- 誤ってグローバル変数を作成することは不可能になります。
- 静かに例外をスローすることができない割り当てを行います。
- 削除不可能なプロパティーの削除を試行させます（試行が効果を持たない前に）。
- 関数のパラメータ名は一意である必要があります。
- `this` はグローバルコンテキストでは未定義です。
- 例外を投げて、いくつかの共通のコーディング・グロッパーを捕まえる。
- それは、混乱しているか、または慎重に考えられていない機能を無効にします。

欠点：

- いくつかの開発者が慣れ親しかった欠けている機能がたくさんあります。
- `function.caller` と `function.arguments` へのアクセスはもうありません。
- 異なる厳密なモードで記述されたスクリプトを連結すると、問題が発生する可能性があります。

全体的に、私は利点が欠点を上回っていると思うし、厳密なモードブロックという機能に頼る必要はなかった。私は厳密なモードを使用することをお勧めします。

###### 参考

- http://2ality.com/2011/10/strict-mode-hatred.html
- http://lucybain.com/blog/2014/js-use-strict/

[[↑] 先頭に戻る](#目次)

### **"fizz"** を`3`の倍数で、**"buzz"** を`5`の倍数で、**"fizzbuzz"** を`3`と`5`の倍数で出力する`100`まで反復する for ループを作成してください。

[Paul Irish](https://gist.github.com/jaysonrowe/1592432#gistcomment-790724) による FizzBuzz のこのバージョンを確認してください。

```js
for (let i = 1; i <= 100; i++) {
  let f = i % 3 == 0,
    b = i % 5 == 0;
  console.log(f ? (b ? 'FizzBuzz' : 'Fizz') : b ? 'Buzz' : i);
}
```

私はあなたにインタビューの中で上記を書くことを勧めません。長くてはっきりしたアプローチに固執してください。もっと不気味なバージョンの FizzBuzz については、下記の参考リンクを参照してください。

###### 参考

- https://gist.github.com/jaysonrowe/1592432

[[↑] 先頭に戻る](#目次)

### Web サイトのグローバルスコープをそのままの状態を保ち、決して触らないことが、一般的に良いとされているのはなぜですか？

すべてのスクリプトはグローバルスコープにアクセスできます。誰もが独自の変数を定義するためにグローバル名前空間を使用している場合、衝突が発生します。モジュールパターン（IIFE）を使用して、変数をローカル名前空間内にカプセル化します。

[[↑] 先頭に戻る](#目次)

### なぜあなたは `load` イベントのようなものを使うのですか？このイベントには欠点がありますか？あなたは何か選択肢を知っていますか、なぜそれらを使うのですか？

`load` イベントは、ドキュメント読み込みプロセスの最後に発生します。この時点で、ドキュメント内のすべてのオブジェクトが DOM 内にあり、すべてのイメージ、スクリプト、リンク、およびサブフレームの読み込みが完了しています。

DOM イベント「DOMContentLoaded」は、ページの DOM が構築された後に起動しますが、他のリソースの読み込みが完了するまで待機しません。これは、初期化する前に全ページをロードする必要がない場合に適しています。

TODO.

###### 参考

- https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload (英語)
- https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload (日本語)

[[↑] 先頭に戻る](#目次)

### シングルページアプリが何であるか、そして SEO に優しいアプリを作る方法を説明してください。

以下は素晴らしい [Grab Front End Guide](https://github.com/grab/front-end-guide) から取ったもので、偶然にも私によって書かれています！

最近の Web 開発者は、Web アプリケーションではなく、Web アプリケーションとして構築する製品を指しています。この 2 つの用語の間には厳密な違いはありませんが、Web アプリケーションは高度にインタラクティブでダイナミックな傾向があり、ユーザはアクションを実行し、アクションのレスポンスを受け取ることができます。伝統的に、ブラウザはサーバから HTML を受け取り、レンダリングします。ユーザーが別の URL に移動すると、フルページの更新が必要になり、サーバーは新しいページの新しい HTML を新しく送信します。これをサーバサイドレンダリングといいます。

しかし、現代の SPA では、代わりにクライアント側のレンダリングが使用されます。ブラウザは、アプリケーション全体に必要なスクリプト（フレームワーク、ライブラリ、アプリケーションコード）とスタイルシートとともに、サーバーから初期ページを読み込みます。ユーザーが他のページに移動すると、ページのリフレッシュは実行されません。ページの URL は [HTML5 History API](https://developer.mozilla.org/ja/docs/Web/API/History_API) で更新されます。通常は JSON 形式の新しいページに必要な新しいデータは、[AJAX](https://developer.mozilla.org/ja/docs/AJAX/Getting_Started) リクエストを介してブラウザに取り込まれます。その後、SPA は JavaScript を介してデータを動的に更新します。これは、初期ページのロード時にすでにダウンロードされています。このモデルは、ネイティブモバイルアプリの仕組みと似ています。

利点：

- アプリの応答性が向上し、フルページのリフレッシュのためにページの移動の間にフラッシュが表示されないという問題がありました。
- ページロードごとに同じアセットを再度ダウンロードする必要がないため、サーバーへの HTTP 要求が少なくなります。
- クライアントとサーバーの間の問題の明確な分離。サーバーコードを変更することなく、さまざまなプラットフォーム（モバイル、チャットボット、スマートウォッチなど）の新しいクライアントを簡単に構築できます。また、API 契約が破られていない限り、クライアントとサーバーのテクノロジスタックを個別に変更することもできます。

欠点：

- 複数のページに必要なフレームワーク、アプリケーションコード、およびアセットの読み込みによる最初のページ読み込みが重くなりました。
- すべてのリクエストを単一のエントリポイントにルーティングし、そこからクライアント側のルーティングを引き継ぐように設定する追加のステップがサーバー上で実行されます。
- SPA はコンテンツを表示するために JavaScript に依存していますが、すべての検索エンジンがクロール中に JavaScript を実行するわけではなく、ページ上に空のコンテンツが表示されることがあります。これは、誤ってあなたのアプリの検索エンジン最適化（SEO）を傷つけます。しかし、ほとんどの場合、アプリケーションを構築するときに、SEO はすべてのコンテンツが検索エンジンによってインデックスを作成する必要があるわけではないため、最も重要な要素ではありません。これを克服するには、アプリをサーバー側でレンダリングするか、[Prerender](https://prerender.io/) などのサービスを使用してブラウザの JavaScript をレンダリングし、静的 HTML を保存してクローラー。

###### 参考

- https://github.com/grab/front-end-guide#single-page-apps-spas
- http://stackoverflow.com/questions/21862054/single-page-app-advantages-and-disadvantages
- http://blog.isquaredsoftware.com/presentations/2016-10-revolution-of-web-dev/
- https://medium.freecodecamp.com/heres-why-client-side-rendering-won-46a349fadb52

[[↑] 先頭に戻る](#目次)

### プロミスおよび/またはそのポリフィルの経験はどの程度ですか？

それの働く知識を持っています。約束は、将来的に単一の値を生成するオブジェクトです。解決された値または解決されなかった理由（ネットワークエラーなど）です。約束は、実現可能、拒否、保留の 3 つの状態のうちの 1 つにある可能性があります。プロミスユーザーは、完了した値や却下理由を処理するコールバックを添付することができます。

一般的な polyfill は `$.deferred`、Q、Bluebird ですが、それらのすべてが仕様に準拠しているわけではありません。ES2015 は、すぐに使用可能な約束をサポートしています。

###### 参考

- https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261

[[↑] 先頭に戻る](#目次)

### コールバックの代わりにプロミスを使用することの長所と短所は何ですか？

**長所**

- 読めないコールバック地獄は避けてください。
- `.then()` で読めるシーケンシャルな非同期コードを書くのが簡単になります。
- `Promise.all()` で並列非同期コードを書くのが簡単になります。

**短所**

- やや複雑なコード（議論の余地がある）。
- ES2015 がサポートされていない古いブラウザでは、使用するためにポリフィルをロードする必要があります。

[[↑] 先頭に戻る](#目次)

### JavaScript にコンパイルしてくれる言語で JavaScript を書く利点と欠点をいくつか教えてください。

JavaScript へコンパイルする言語には、CoffeeScript、Elm、ClojureScript、PureScript、TypeScript などがあります。

利点：

- JavaScript の長年にわたる問題のいくつかを修正し、JavaScript のアンチパターンを廃止しました。
- JavaScript の上に文法的な砂糖を提供することで、短いコードを書くことができますが、ES5 はそれがないと思っていますが、ES2015 はすばらしいです。
- 静的型は時間が経っても維持する必要のある大規模プロジェクトの場合は素晴らしいです（TypeScript の場合）。

欠点：

- ブラウザは JavaScript のみを実行するため、ビルド/コンパイルのプロセスを必要とし、ブラウザに提供する前にコードを JavaScript にコンパイルする必要があります。
- ソースマップがあらかじめコンパイルされたソースにうまくマッピングされない場合、デバッグが苦しいことがあります。
- ほとんどの開発者はこれらの言語に精通しておらず、それを学ぶ必要があります。プロジェクトに使用する場合、チームのコストが上昇します。
- 小規模なコミュニティ（言語に依存します）。リソース、チュートリアル、図書館、ツールなどを見つけるのが難しくなります。
- IDE/エディタのサポートが不足している可能性があります。
- これらの言語は常に最新の JavaScript 標準より遅れています。
- 開発者は、コードがコンパイルされていることを認識しておく必要があります。これは実際に実行されるコードであり、最終的に問題になります。

具体的には、ES2015 では JavaScript が大幅に改善され、はるかに書やすくなっています。私は最近 CoffeeScript の必要性を見ていません。

###### 参考

- https://softwareengineering.stackexchange.com/questions/72569/what-are-the-pros-and-cons-of-coffeescript

[[↑] 先頭に戻る](#目次)

### JavaScript のコードをデバッグする際にはどんなツールや技術をを利用しますか？

- React and Redux
  - [React Devtools](https://github.com/facebook/react-devtools)
  - [Redux Devtools](https://github.com/gaearon/redux-devtools)
- JavaScript
  - [Chrome Devtools](https://hackernoon.com/twelve-fancy-chrome-devtools-tips-dc1e39d10d9d)
  - `debugger` statement
  - Good old `console.log` debugging

###### 参考

- https://hackernoon.com/twelve-fancy-chrome-devtools-tips-dc1e39d10d9d
- https://raygun.com/blog/javascript-debugging/

[[↑] 先頭に戻る](#目次)

### オブジェクトのプロパティや、配列の要素をイテレートする際にどの構文を使いますか？

オブジェクトの場合：

- `for` ループ用 - `for (var property in obj) { console.log(property); }`。ただし、これは継承されたプロパティを繰り返し処理するため、使用する前に `obj.hasOwnProperty(property）` チェックを追加します。
- `Object.keys()` - `Object.keys(obj).forEach(function (property) { ... })`。`Object.keys()` は静的メソッドで、渡すオブジェクトのすべての列挙可能なプロパティをリストします。
- `Object.getOwnPropertyNames()` - `Object.getOwnPropertyNames(obj).forEach(function (property) { ... })`。`Object.getOwnPropertyNames()` は静的メソッドで、渡すオブジェクトのすべての列挙可能なプロパティと列挙可能でないプロパティをリストします。

配列の場合：

- `for` ループ - `for (var i = 0; i < arr.length; i++)`。ここでの一般的な落とし穴は、`var` は関数スコープであり、ブロックスコープではなく、ブロックスコープのイテレータ変数を使用したいと思うことです。ES2015 では、ブロックスコープを持つ `let` が導入されています。代わりにそのブロックを使用することをお勧めします。したがって、これは `for (let i = 0; i < arr.length; i++)` となります。
- `forEach` - `arr.forEach(function (el, index) { ... })`。必要なのが配列要素であれば `index` を使う必要がないので、このコンストラクトは時に便利です。また、`every` と `some` メソッドもあります。これにより、早期に反復処理を終了させることができます。

ほとんどの場合、私は `.forEach` メソッドを好むでしょうが、本当にあなたがしようとしているものに依存します。`for` ループは、より柔軟性を持たせます。たとえば、`break` を使ってループを早期に終了するか、ループごとにイテレータを複数回インクリメントします。

[[↑] 先頭に戻る](#目次)

### mutable と immutable オブジェクトの違いを説明してください

- JavaScript の不変オブジェクトの例は何ですか？
- 不変性の長所と短所は何ですか？
- あなた自身のコードで不変性をどのように達成できますか？

TODO

[[↑] 先頭に戻る](#目次)

### synchronous と asynchronous functions の違いを説明してください。

非同期関数が非同期関数ではなく、非同期関数がブロックされています。同期関数では、次のステートメントが実行される前にステートメントが完了します。この場合、プログラムはステートメントの順番で正確に評価され、ステートメントの 1 つが非常に長い場合、プログラムの実行は一時停止されます。

非同期関数は、通常、パラメータとしてコールバックを受け入れ、非同期関数が呼び出された直後に次の行で実行を続けます。コールバックは、非同期操作が完了し、呼び出しスタックが空の場合にのみ呼び出されます。Web サーバーからのデータのロードやデータベースのクエリなどの大規模な操作は、非同期で実行する必要があります。これにより、メインスレッドは、完了するまでの長い操作がブロックされるのではなく、他の操作の実行を継続できます（ブラウザの場合、UI はフリーズします）。

[[↑] 先頭に戻る](#目次)

### event loop とはなんですか？call stack や task queue との違いはなんですか？

イベントループは、コールスタックを監視し、タスクキューで実行する作業があるかどうかをチェックするシングルスレッドループです。コールスタックが空で、タスクキューにコールバック関数がある場合、関数はデキューされ、実行されるコールスタックにプッシュされます。

まだフィリップ・ロバートの [talk on the Event Loop](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html) をチェックしていならした方がいいでしょう。これは JavaScript のビデオで最も視聴されたものです。

###### 参考

- https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html
- http://theproactiveprogrammer.com/javascript/the-javascript-event-loop-a-stack-and-a-queue/

[[↑] 先頭に戻る](#目次)

### `function foo() {}` と `var foo = function() {}` をした場合の `foo` の使い方の違いを説明してください。

前者は関数宣言であり、後者は関数式です。主な相違点は、関数宣言は本体が巻き上げしているが、関数式の本体は（変数と同じ巻き上げの動作をしていない）ことである。巻き上げの詳細については、巻き上げのの質問を参照してください。関数式が定義される前に呼び出すと、`Uncaught TypeError：XXX is not function` エラーが出ます。

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
var foo = function () {
  console.log('FOOOOO');
};
```

###### 参考

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function (英語)
- https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/function (日本語)

[[↑] 先頭に戻る](#目次)

### `let` と `var` と `const` で宣言した変数の違いはなんですか？

`var` キーワードを使って宣言された変数は、それらが作成された関数、または関数の外で作成された場合はグローバルオブジェクトにスコープされます。`let` と `const` は _block scoped_ です。つまり、最も近い中括弧（関数、if-else ブロック、または for ループ）内でのみアクセス可能です。

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

`var` は変数を持ち上げることができます。つまり、変数が宣言される前にコード内で参照されます。`let` と `const` はこれを許さず、代わりにエラーを投げます。

```js
console.log(foo); // undefined

var foo = 'foo';

console.log(baz); // ReferenceError: can't access lexical declaration 'baz' before initialization

let baz = 'baz';

console.log(bar); // ReferenceError: can't access lexical declaration 'bar' before initialization

const bar = 'bar';
```

`var` で変数を再宣言してもエラーは発生しませんが、`let` と `const` はエラーになります。

```js
var foo = 'foo';
var foo = 'bar';
console.log(foo); // "bar"

let baz = 'baz';
let baz = 'qux'; // Uncaught SyntaxError: Identifier 'baz' has already been declared
```

`let` と `const` は `let` が変数の値を再割り当てすることができるという点で `let` と `const` は異なります。

```js
// This is fine.
let foo = 'foo';
foo = 'bar';

// This causes an exception.
const baz = 'baz';
baz = 'qux';
```

###### 参考

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let (英語)
- https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/let (日本語)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var (英語)
- https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/var (英語)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const (英語)
- https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/const (日本語)

[[↑] 先頭に戻る](#目次)

### ES6 のクラス定義と、ES5 のコンストラクタ関数との違いには何がありますか？

TODO

[[↑] 先頭に戻る](#目次)

### アロー構文の使い方を例示してください。この構文と他の方法による定義とは何が違いますか？

TODO

[[↑] 先頭に戻る](#目次)

### コンストラクタにおいて、メソッドをアロー構文で定義する方法の利点はなんですか？

TODO

[[↑] 先頭に戻る](#目次)

### 高階関数とはなんですか？

高次関数とは、1 つまたは複数の関数を引数としてとり、いくつかのデータを操作するために使用する関数および/または結果として関数を返す関数のことです。高次関数は、繰り返し実行される操作を抽象化することを意図しています。これの古典的な例は配列と関数を引数として取る `map` です。`map` はこの関数を使って配列内の各項目を変換し、変換されたデータで新しい配列を返します。JavaScript の他のよく使われている例は `forEach`、`filter`、`reduce` です。高次関数は、配列を操作するだけでなく、別の関数から関数を返す多くのユースケースがあるためです。`Array.prototype.bind` は JavaScript のそのような例です。

**Map**

文字列を大文字に変換するために必要な名前の配列があるとしましょう。

```js
const names = ['irish', 'daisy', 'anna'];
```

命令的な方法はこのようになります：

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

`.map(transformerFn)` を使うと、コードが短くて宣言的になります。

```js
const transformNamesToUppercase = function (names) {
  return names.map((name) => name.toUpperCase());
};
transformNamesToUppercase(names); // ['IRISH', 'DAISY', 'ANNA']
```

###### 参考

- https://medium.com/javascript-scene/higher-order-functions-composing-software-5365cf2cbe99
- https://hackernoon.com/effective-functional-javascript-first-class-and-higher-order-functions-713fde8df50a
- https://eloquentjavascript.net/05_higher_order.html

[[↑] 先頭に戻る](#目次)

### オブジェクトと配列について、「分割代入」の例を教えてください。

分割代入は、オブジェクトまたは配列の値を抽出して別の変数に配置する簡潔で便利な方法を可能にする ES6 で使用可能な式です。

**配列の分割代入**

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

**オブジェクトの分割代入**

```js
// Variable assignment.
const o = {p: 42, q: true};
const {p, q} = o;

console.log(p); // 42
console.log(q); // true
```

###### 参考

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment (英語)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment (日本語)
- https://ponyfoo.com/articles/es6-destructuring-in-depth

[[↑] 先頭に戻る](#目次)

### ES6 のテンプレート文字列は文字列を作り出す上で様々な柔軟性をもたらしますが、例を示すことはできますか？

TODO

[[↑] 先頭に戻る](#目次)

### カリー化の例を説明してください。またカリー化がもたらす利点はどこにあるのでしょうか？

カリングとは、複数のパラメータを持つ関数を複数の関数に分割し、直列に呼び出すと必要なすべてのパラメータを 1 つずつ累積するパターンです。このテクニックは、機能スタイルで書かれたコードを読みやすく、作成するのに便利です。カレイド関数を 1 つの関数として開始し、それぞれが 1 つのパラメータを取る一連の関数に分割する必要があることに注意することが重要です。

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

###### 参考

- https://hackernoon.com/currying-in-js-d9ddc64f162e

[[↑] 先頭に戻る](#目次)

### spread syntax を利用する利点はなんですか？また、rest syntax とは何が違っていますか？

ES6 の普及構文は、`Object.create`、`slice`、またはライブラリ関数に頼らずに配列やオブジェクトのコピーを簡単に作成できるので、機能的なパラダイムでコーディングするときに非常に便利です。この言語機能は、Redux および RxJS プロジェクトで頻繁に使用されます。

```js
function putDookieInAnyArray(arr) {
  return [...arr, 'dookie'];
}

const result = putDookieInAnyArray(['I', 'really', "don't", 'like']); // ["I", "really", "don't", "like", "dookie"]

const person = {
  name: 'Todd',
  age: 29,
};

const copyOfTodd = {...person};
```

ES6 の rest 構文は、任意の数の引数を関数に渡すための省略表現です。これは、データの配列をアンパックするのではなく、データを取り込んで配列に埋め込み、配列やオブジェクトの構造の割り当てと同様に、関数の引数でも機能する、普及した構文の逆です。

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

###### 参考

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax (英語)
- https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax (日本語)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters (英語)
- https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/rest_parameters (日本語)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment (英語)
- https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment (日本語)

[[↑] 先頭に戻る](#目次)

### ファイル間でコードを共有するにはどうすれば良いですか？

これは JavaScript の環境に依存します。

クライアント（ブラウザ環境）では、変数/関数がグローバルスコープ（`window`）で宣言されている限り、すべてのスクリプトがそれらを参照することができます。代わりに、よりモジュール化されたアプローチのために RequireJS を介して Asynchronous Module Definition（AMD）を採用してください。

サーバー（Node.js）では、CommonJS を使用するのが一般的な方法でした。各ファイルはモジュールとして扱われ、変数や関数を `module.exports` オブジェクトに添付することでエクスポートすることができます。

ES2015 は、AMD と CommonJS の両方を置き換えることを目指すモジュール構文を定義しています。これは最終的にブラウザ環境とノード環境の両方でサポートされます。

###### 参考

- http://requirejs.org/docs/whyamd.html
- https://nodejs.org/docs/latest/api/modules.html
- http://2ality.com/2014/09/es6-modules-final.html

[[↑] 先頭に戻る](#目次)

### 静的クラスメンバーはどんな場面で使いますか？

静的クラスメンバー（プロパティ/メソッド）は、クラスの特定のインスタンスに結びついておらず、それを参照しているインスタンスに関係なく同じ値を持ちます。静的プロパティは通常は構成変数であり、静的メソッドは通常、インスタンスの状態に依存しない純粋なユーティリティ関数です。

###### 参考

- https://stackoverflow.com/questions/21155438/when-to-use-static-variables-methods-and-when-to-use-instance-variables-methods

[[↑] 先頭に戻る](#目次)

### 他の方の回答集

- http://flowerszhong.github.io/2013/11/20/javascript-questions.html

---
title: Preguntas de JavaScript
---
## Tabla de contenidos
- [Tabla de contenidos](#tabla-de-contenidos)
  - [Explique la delegación de eventos](#explique-la-delegación-de-eventos)
      - [Referecias](#referecias)
  - [Explique como funciona this](#explique-como-funciona-this)
  - [Explique como funciona la herencia de prototipos](#explique-como-funciona-la-herencia-de-prototipos)
    - [Ejemplo de herencia de prototipos](#ejemplo-de-herencia-de-prototipos)
        - [Referencias](#referencias)
  - [Explique la diferencia cuando una variable es: `null`, `undefined` o `undeclared`. Como chequearia cada uno de estos estados?](#explique-la-diferencia-cuando-una-variable-es-null-undefined-o-undeclared-como-chequearia-cada-uno-de-estos-estados)
        - [Referencias](#referencias-1)
  - [Que es una closure, y como/porque se utilizaria?](#que-es-una-closure-y-comoporque-se-utilizaria)
        - [Referencias](#referencias-2)




### Explique la delegación de eventos

La delegación de eventos es una técnica en la cual los  escuchas de eventos se setean en el elemento padre en vez de en los elementos hijos. La función de escucha se ejecutara cuando el evento se dispare en los elementos descendientes gracias a la propagación de eventos del DOM. Los beneficios de esta técnica son:
- El uso de memoria se reduce dado que solo se requiere un unico escucha de eventos en el elemento parent, en vez de crear un escucha en cada descendiente.
- No es necesario quitar el escucha de los elementos que se eliminan y tampoco es necesario agregarlo cuando se crean nuevos elementos.

##### Referecias

- https://medium.com/@osmancea/delegaci%C3%B3n-de-eventos-del-dom-con-javascript-d28131d43686
- https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Eventos
-
[[↑] Ir al principio](#tabla-de-contenidos)

### Explique como funciona this

Una explicación simple es que  en Javascript  `this` depende de como se llama la función. Para entender mejor como funciona se deben seguir las siguientes reglas:
1. Si se utiliza la palabra clave `new` cuando se llama a la funcion, dentro de la función `this` será un nuevo objeto vacio.
2. Si se utiliza `apply`, `call`, o `bind` cuando se llama o crea la función, dentro de la función `this` será el objeto que se pase como argumento.
3. Si la función se llama de la forma `obj.method()`. `this` será el objeto que tiene la función como propiedad.
4. Si la función se invoca de forma regular, `this` será el objeto `global`. Dentro de un navegador, este objeto es el objeto `window`. Si se utiliza el modo estricto (`strict mode`), `this` sera `undefined` en lugar del objeto global.
5. Si se aplican multiples reglas, la regla con más prioridad prevalecera.
6. Si la función tiene la sintaxis de ES2015 de funcion flecha, se ignoran todas las reglas anteriores y `this` tendra el valor que tenga el contexto donde donde se crea la función.

Para una explicación más detallada, lee [este articulo](https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3) (en inglés).

### Explique como funciona la herencia de prototipos

Esta es una pregunta muy común en las entrevistas de Javascript. Todos lo objetos de Javascript tienen una propiedad `__proto__` que referencia a otro objetos, el cual se llama el prototipo del objeto. Cuando se accede a una propiedad de un objeto, se busca si el objeto tiene esa propiedad, si no la tiene, el engine de Javascript buscara en el objeto referenciado por `__proto__` y si este no tuviese la propiedad, seguira buscando por la cadena de prototipos hasta encontrar la propiedad o hasta llegar al final de la cadena de prototipo. Esto simula la herencia clasica de objetos, pero es más bien una [ delegación que herencia](https://davidwalsh.name/javascript-objects).

#### Ejemplo de herencia de prototipos

```js
if (typeof Object.create !== 'function') {
  Object.create = function (parent) {
    function Tmp() {}
    Tmp.prototype = parent;
    return new Tmp();
  };
}

const Padre = function () {
  this.name = 'Padre';
};

Padre.prototype.saludar = function () {
  console.log('Hola desde el Padre');
};

const hijo = Object.create(Padre.prototype);

hijo.llorar = function () {
  console.log('waaaaaahhhh!');
};

hijo.llorar();
// Salida: waaaaaahhhh!

hijo.saludar();
// Salida: Hola desde el Padre
```

Algo para destacar:

- `.saludar` no esta definido en el objeto _hijo_, por eso el engine busca por la cadena de prototipo hasta encontrar `.saludar` que esta definido en el _Padre_.
- Es necesario llamar a  `Object.create`  de la siguiente manera para que se produzca la herencia:
  - Object.create(Padre.prototype);
  - Object.create(new Padre(null));
  - Object.create(objLiteral);
  - `child.constructor` apunta al `Padre`:

```js
hijo.constructor
ƒ () {
  this.nombre = "Padre";
}
hijo.constructor.nombre
"Parent"
```

- If we'd like to correct this, one option would be to do:

```js
function Hijo() {
  Padre.call(this);
  this.name = 'hijo';
}

Hijo.prototype = Padre.prototype;
Hijo.prototype.constructor = Hijo;

const c = new Hijo();

c.llorar();
// Salida: waaaaaahhhh!

c.saludar();
// Salida: Hola desde el padre

c.constructor.name;
// Salida: "Hijo"
```

###### Referencias

- http://dmitrysoshnikov.com/ecmascript/javascript-the-core/
- https://www.quora.com/What-is-prototypal-inheritance/answer/Kyle-Simpson
- https://davidwalsh.name/javascript-objects
- https://crockford.com/javascript/prototypal.html
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
[[↑] Ir al principio](#tabla-de-contenidos)



### Explique la diferencia cuando una variable es: `null`, `undefined` o `undeclared`. Como chequearia cada uno de estos estados?


Una variable no declarada (`undeclared`) se crea cuando se asigna un valor a un identificador que no ha sido creado previamente usando `var`, `let` o `const`. Las variables no declaradas se crearan de forma `global` fuera del contexto actual. En el modo escrito, se creara un `ReferenceError` cuando se intente asignar un valor a una variable no declarada. Las variables no declaradas son una mala páctica, de la misma forma que las variables globales son una mala práctica.

```js
function foo() {
  x = 1; // Throws a ReferenceError in strict mode
}

foo();
console.log(x); // 1
```
 Una variable que es `undefined` es una variable que ha sido declarada, pero no se le ha asignado un valor. Esta variable es de tipo `undefined`.
 Si una función no devuelve un valor especifico, se devolvera por defecto `undefined`.

 Para chequear si una variable es `undefined`, se utiliza el operador de igualdad estricta(`===`) o el operador `typeof` que devolvera la cadena `'undefined'`. Es importante recalcar que no se utiliza el operador de igualdad abstracta (`==`) ya que este devolverá `true` si el valor es `null`.

```js
var foo;
console.log(foo); // undefined
console.log(foo === undefined); // true
console.log(typeof foo === 'undefined'); // true

console.log(foo == null); // true. Mal, no utilice esto para chequear!

function bar() {}
var baz = bar();
console.log(baz); // undefined
```



Una variable que es `null` tendra asignado explicitamente el valor `null` a diferencia de `undefined` que no se ha asignado ningun valor especifico. Para chequear si una variable es `null` se utiliza el operador de igualdad estricta ( `===`). Es importante recalcar, de la misma forma que anteriormente, no se debe utilizar el operador de igualdad (`==`) que devolverá `true` si el valor es `undefined`.

```js
var foo = null;
console.log(foo === null); // true
console.log(typeof foo === 'object'); // true

console.log(foo == undefined); // true. Wrong, don't use this to check!
```


Como recomendación personal, nunca dejar las variables no declaradas o no asignadas, sino que es conveniente asignarle explicitamente el valor `null` al momento de declarar la variable si no tiene un valor especifico aún. Si se utiliza algún tipo de linter, se pueden crear reglas para verificar que no se haga referencia a variables no declaradas.

###### Referencias

- https://stackoverflow.com/questions/15985875/effect-of-declared-and-undeclared-variables
- https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined

[[↑] Ir al principio](#tabla-de-contenidos)


### Que es una closure, y como/porque se utilizaria?
Una **closure** es la combinación de una función con el entorno lexico en el cual se declara dicha función. La palabra `lexico` hace referencia al hecho de que el contexto lexico referencia donde se declara una variable dentro del código para determinar que parte del código puede acceder a dicha variable. Una closure es una función que tiene acceso a las variables declaradas en el contexto externo aún cuando la función externa ya haya finalizado su ejecución.

**Porque utilizaría una?**

- Emular metodos privados con closures. Comunmente usada en el [patron modulo](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).
- [Aplicación parcial o ](https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8#.l4b6l1i3x).

###### Referencias

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
- https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36

[[↑] Ir al principio](#tabla-de-contenidos)

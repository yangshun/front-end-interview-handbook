# JS questions for Yangshun's choosing

<!-- #We should tag questions by difficulty and type for users to know what to study and when based on experience, etc. Can also tag by phone, online assessment, etc.-->

## 1. State a potential downside with using `typeof bar === "object"` to determine if `bar` is an object. What is a good way to avoid this pitfall?

As `null` is also considered an object in JavaScript, this method would also return true if `bar` was `null`.

We can avoid this by also checking if `bar` is `null`:

```js
console.log(bar !== null && typeof bar === 'object'); // should log false if bar is null
```

**Additional cases**

1. If we want to return `true` in the case that `bar` is a function

   The solution above will return `false` if `bar` is a function. We can modify it as follows:

   ```
   console.log((bar !== null) && ((typeof bar === "object") || (typeof bar === "function")));

   ```

2. If we want to return `false` if `bar` is an array

   The solution above will return `true` if `bar` is an array since arrays are objects in JavaScript. We can modify it as follows:

   ```js
   console.log(
     bar !== null &&
       typeof bar === 'object' &&
       toString.call(bar) !== '[object Array]',
   );
   ```

   ES5 can also be used, including null check:

   ```js
   console.log(Array.isArray(bar));
   ```

   <!-- Source: https://www.toptal.com/javascript/interview-questions -->

## 2. What is the rationale behind the practice of wrapping the contents of a JavaScript source file in a function block?

1. Creates a private namespace and hence helps to avoid potential name clashes between different JavaScript modules and libraries
2. Allow for an easily referenceable alias for a global variable. For example, in jQuery plugins. jQuery allows you to disable the `$` reference to the jQuery namespace, using `jQuery.noConflict()`. If this has been done, your code can still use `$` employing this closure technique, as follows:

```js
(function ($) {
  /* jQuery plugin code referencing $ */
})(jQuery);
```

<!-- Source: https://www.toptal.com/javascript/interview-questions -->

## 3. What is the rationale behind including `use strict` at the beginning of a JavaScript source file?

`use strict` is a way to voluntarily enforce stricter parsing and error handling on your JavaScript code at runtime. Code errors that would otherwise have been ignored or would have failed silently will now generate errors or throw exceptions.

Some of the benefits of `strict` mode include:

- More errors and exceptions thrown to facilitate debugging
- Avoids accidental globals by throwing errors when assigning values to an undeclared variable
- Eliminates `this` coercion by throwing an error when referencing a `this` value of null or undefined
- Prevents duplicate parameter values by throwing an error when it detects a duplicate named argument for a function
- Makes `eval()` safer as variables and functions declared are not created in the containing scope
- Throws error on invalid usage of `delete`, such as when attempting to delete a non-configurable property.

<!-- Source: https://www.toptal.com/javascript/interview-questions -->

## 4. Write a small function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome

The following one line function will return true if str is a palindrome; otherwise, it returns false.

```js
function isPalindrome(str) {
  str = str.replace(/\W/g, '').toLowerCase();
  return str == str.split('').reverse().join('');
}
```

For example:

```js
console.log(isPalindrome('level')); // logs 'true'
console.log(isPalindrome('levels')); // logs 'false'
console.log(isPalindrome('A car, a man, a maraca')); // logs 'true'
```

<!-- Source: https://www.toptal.com/javascript/interview-questions -->

## 5. What is a “closure” in JavaScript?

A closure is an inner function that has access to the variables in the outer (enclosing) function's scope chain.

The closure has access to variables in three scopes; specifically: (1) variable in its own scope, (2) variables in the enclosing function's scope, and (3) global variables.

<!-- Source: https://www.toptal.com/javascript/interview-questions -->

## 6. What is the value of `typeof undefined == typeof NULL`?

The expression will be evaluated to true, since `NULL` will be treated as any other undefined variable.

Note: JavaScript is case-sensitive and here we are using `NULL` instead of `null`.

<!-- Source: https://www.toptal.com/javascript/interview-questions -->

## 7. What is `NaN` and what is its type? What is a reliable method to test if a value is equal to `NaN`?

`NaN` is a property representing a value that is “not a number”. It results from failed numerical operations, due to:

- Failed conversion of string to number
- Use of undefined or NaN as an operand
- Arithmetric operations in indeterminate form or with indeterminate results e.g. infinity
- Use of invalid arguments in math functions

`NaN` is of type Number.

Given that `NaN` compared to anything is false, here are 2 reliable ways to test if a value is equal to `NaN`:

- `value !== value`
- ES6 `Number.isNaN()`

<!-- Source: https://www.toptal.com/javascript/interview-questions -->

## 8. Is JavaScript or an ASP script faster?

ASP Script is a server side scripting language and is executed on the server.

Meanwhile, JavaScript is a client side scripting language which is executed on the client browser. When JavaScript is inserted into a HTML document, the Internet browser will read the HTML and process JavaScript directly.

Since JavaScript is executed on the client, it doesn't need the assistance of the webserver to execute. Therefore, it doesn't need to make network calls and saves the round trip time to send requests and receive responses from the Server. Hence JavaScript is faster.

## 9. Explain why Cookies are needed and how you can create, get and delete Cookies.

Typically, after a webserver has sent a web page to the browser, the connection is closed and the server will not remember anything about the user. Cookies can allow the server to "remember" information about users. For example:

- When a user visits a webpage and inputs their preferred language, it can be stored in a cookie
- Next time the user visits again, the cookie remembers the language across pages

When a browser requests a web page from a server, cookies belonging to the page are added to the request. This way the server gets the necessary data to "remember" information about users.

JavaScript can also manipulate cookies using the cookie property of the Document object. JavaScript can read, create, modify, and delete the cookies that apply to the current web page.

To create cookies, assign a string value to the document.cookie object. For example:

```
document.cookie = "key1 = value1;key2 = value2;expires = date";

```

To read cookies, read the value of the document.cookie string will keep a list of name=value pairs separated by semicolons, where name is the name of a cookie and value is its string value. For example:

```
html>
   <head>
      <script type = "text/javascript">
         <!--
            function ReadCookie() {
               var allcookies = document.cookie;
               document.write ("All Cookies : " + allcookies );

               // Get all the cookies pairs in an array
               cookiearray = allcookies.split(';');

               // Now take key value pair out of this array
               for(var i=0; i<cookiearray.length; i++) {
                  name = cookiearray[i].split('=')[0];
                  value = cookiearray[i].split('=')[1];
                  document.write ("Key is : " + name + " and Value is : " + value);
               }
            }
         //-->
      </script>
   </head>

   <body>
      <form name = "myform" action = "">
         <p> click the following button and see the result:</p>
         <input type = "button" value = "Get Cookie" onclick = "ReadCookie()"/>
      </form>
   </body>
</html>
```

To delete a cookie, you just need to set the cookie's value to empty and set the value of expires to a passed date. For example:

```
<html>
   <head>
      <script type = "text/javascript">
         <!--
            function WriteCookie() {
               var now = new Date();
               now.setMonth( now.getMonth() - 1 );
               cookievalue = escape(document.myform.customer.value) + ";"

               document.cookie = "name=" + cookievalue;
               document.cookie = "expires=" + now.toUTCString() + ";"
               document.write("Setting Cookies : " + "name=" + cookievalue );
            }
          //-->
      </script>
   </head>

   <body>
      <form name = "myform" action = "">
         Enter name: <input type = "text" name = "customer"/>
         <input type = "button" value = "Set Cookie" onclick = "WriteCookie()"/>
      </form>
   </body>
</html>
```

## 10. What are the differences between `undeclared`, `undefined`, and `null`?

An undeclared variable is one that has not been declared with an appropriate keyword (such as `var`, `let`, `const`). Acccessing an undeclared variable will throw a `ReferenceError`.

On the other hand, an undefined variable is one which has been declared, but has not been assigned a value. `undefined` is a primitive data type in JavaScript which represents the absence of a value, intentional or otherwise.

Lastly, a `null` variable is one that is has been intentionally assigned without any value.

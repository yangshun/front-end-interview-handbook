---
title: How does JavaScript garbage collection work?
---

## TL;DR

Garbage collection in JavaScript is an automatic memory management mechanism that reclaims memory occupied by objects and variables that are no longer in use by the program. The two most common algorithms are mark-and-sweep and generational garbage collection.

**Mark-and-sweep**

The most common garbage collection algorithm used in JavaScript is the Mark-and-sweep algorithm. It operates in two phases:

- **Marking phase**: The garbage collector traverses the object graph, starting from the root objects (global variables, currently executing functions, etc.), and marks all reachable objects as "in-use".
- **Sweeping phase**: The garbage collector sweeps through memory, removing all unmarked objects, as they are considered unreachable and no longer needed.

This algorithm effectively identifies and removes objects that have become unreachable, freeing up memory for new allocations.

**Generational garbage collection**

Leveraged by modern JavaScript engines, objects are divided into different generations based on their age and usage patterns. Frequently accessed objects are moved to younger generations, while less frequently used objects are promoted to older generations. This optimization reduces the overhead of garbage collection by focusing on the younger generations, where most objects are short-lived.

Different JavaScript engines (differs according to browsers) implement different garbage collection algorithms and there's no standard way of doing garbage collection.

---

## Garbage collection in JavaScript

Garbage collection in JavaScript is an automatic process managed by the JavaScript engine, designed to reclaim memory occupied by objects that are no longer needed. This helps prevent memory leaks and optimizes the use of available memory. Here's an overview of how garbage collection works in JavaScript:

### Memory management basics

JavaScript allocates memory for objects, arrays, and other variables as they are created. Over time, some of these objects become unreachable because there are no references to them. Garbage collection is the process of identifying these unreachable objects and reclaiming their memory.

### Reachability

The primary concept in JavaScript garbage collection is reachability. An object is considered reachable if it can be accessed or reached in some way:

- **Global variables**: Objects referenced by global variables are always reachable.
- **Local variables and function parameters**: These objects are reachable as long as the function is executing.
- **Closure variables**: Objects referenced by closures are reachable if the closure is reachable.
- **DOM and other system roots**: Objects referenced by the DOM or other host objects.

If there is a chain of references from a root to an object, that object is considered reachable.

### Garbage collection algorithms

1. **Mark-and-sweep**:
   - **Mark Phase**: The garbage collector starts from the root objects and marks all reachable objects.
   - **Sweep Phase**: It then scans memory for objects that were not marked and reclaims their memory.
2. **Reference counting**:
   - This algorithm keeps a count of references to each object. When an object's reference count drops to zero, it is considered unreachable and can be collected.
   - A drawback of reference counting is that it cannot handle circular references well (e.g., two objects referencing each other but not referenced by any other object).
3. **Generational garbage collection**:
   - Memory is divided into generations: young and old.
   - Objects are initially allocated in the young generation.
   - Objects that survive multiple collections are promoted to the old generation.
   - Young generation collections are more frequent and faster, while old generation collections are less frequent but cover more objects.

### JavaScript engine implementations

Different JavaScript engines use variations of these algorithms:

- **V8 (Google Chrome, Node.js)**: Uses a combination of generational, mark-and-sweep, and other optimizations for efficient garbage collection.
- **SpiderMonkey (Mozilla Firefox)**: Uses incremental and generational garbage collection.
- **JavaScriptCore (Safari)**: Uses a mark-and-sweep algorithm with generational collection.

### Memory leaks

Memory leaks in JavaScript occur when a program fails to release memory that it no longer needs, causing the program to consume more and more memory over time.

Memory leaks in JavaScript can occur due to various reasons, including:

- **Accidental global variables**: Unintentionally creating global variables that remain in memory even after they are no longer needed.
- **Closures**: Improper use of closures, where an inner function retains references to variables from an outer function's scope, preventing the outer function's scope from being garbage collected.
- **Event listeners**: Failing to remove event listeners or callbacks when they are no longer needed, causing the associated objects to remain in memory.
- **Caching**: Implementing caches without proper eviction logic, leading to unbounded memory growth over time.
- **Detached DOM node references**: Keeping references to detached DOM nodes, preventing them from being garbage collected.
- **Forgotten timers or callbacks**: Failing to clear timers or callbacks when they are no longer needed, causing their associated data to remain in memory.

To avoid leaking memory:

- **Remove event listeners**: Always remove event listeners when they are no longer needed.
- **Clear references in closures**: Avoid holding unnecessary references in closures.
- **Manage DOM references**: Explicitly remove DOM nodes and their references when they are no longer needed.
- **Avoid global variables**: Minimize the use of global variables to reduce the risk of inadvertently keeping references alive.

## Further reading

- [Garbage collection - MDN](https://developer.mozilla.org/en-US/docs/Glossary/Garbage_collection)
- [Memory management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management)
- [Understanding memory management and garbage collection in JavaScript](https://www.linkedin.com/pulse/understanding-memory-management-garbage-collection-aayush-patniya)
- [JavaScript memory management: A comprehensive guide to garbage collection in JavaScript](https://www.calibraint.com/blog/garbage-collection-in-javascript)
- [Garbage collection - javascript.info](https://javascript.info/garbage-collection)

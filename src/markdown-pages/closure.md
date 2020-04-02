---
title: "Closure"
date: "2020-02-28"
description: "Closures and how to create private variables and methods"
---

Closures are created every time a function is created, at function creation time. A closure gives access to an outer function’s scope from an inner function. Nested functions have access to variables declared in their outer scope.For every closure we have three scopes: Local Scope (Own scope), Outer Functions Scope and Global Scope.

Function inside `greet()` has access the outer variable `age` and the global variable `describe`.

```javascript
const describe = "pretty"
const greet = whattosay => {
  var age = 44
  return function(name) {
    console.log(`${whattosay} ${describe} ${name} at age ${age}`)
  }
}
const sayHi = greet("Hi")
// greet function is executed and it's gone
// later when we call function sayHi(), it has access to all variables that need
sayHi("Charlize") // Hi pretty Charlize at age 44
```

We have possibility to emulate private methods using closures.

```javascript
const counter = (function() {
  let privateCounter = 0

  function changeBy(val) {
    privateCounter += val
  }
  return {
    increment: function() {
      changeBy(1)
    },

    value: function() {
      return privateCounter
    },
  }
})()
counter.increment()
counter.increment()
console.log(counter.value()) // 2
console.log(counter.privateCounter) // undefined
```

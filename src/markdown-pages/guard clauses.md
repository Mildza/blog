---
title: "Guard Clauses"
date: "2020-05-06"
description: "A guard clause is simply a single piece of conditional logic at the beginning of a function which will return from the function early if a certain condition is met."
---

Massive conditional logic statements with many levels of nested if and else if statements may be hard to read and easy to understand.

```javascript
const isPositiveNumber = number => {
  if (number === 0) {
    return "Its null"
  } else if (number > 0) {
    return "Positive"
  } else if (number < 0) {
    return "Negative"
  } else {
    return "its not a number"
  }
}
```

Guard clauses are very simple to implement inside nearly any function that uses conditional logic, but they massively increase the cleanliness of the code.

```javascript
const positiveNumber = number => {
  if (number === 0) return "Its null"
  if (number > 0) return "Positive"
  if (number < 0) return "Negative"
  return "its not a number"
}
```

---
title: "Variable Shadowing"
date: "2020-03-01"
description: "What happens when we have two variables with the same name but different scope?"
---

If we declare a variable within a certain scope (decision block, function, or inner class) and it has the same name as a variable declared in an outer scope, it's totally fine. They can exist both with no throwing errors. This is called variable shadowing.

```javascript
const x = 10
{
  const x = 5
  console.log(x) // 5
}
console.log(x) // 10

const log = () => {
  console.log(x)
}
log() // 10
```

We have a globally named variable that shares the same name as inner block. The an inner variable will be used only in that block. Other functions without that variable declaration will use the global one.

---
title: "Frontend Data Normalization"
date: "2020-04-01"
description: "How we can boost our app performance (especially at poor hardware) when we from API receive a large array of objects?"
---

Normalization on the frontend is useful when you want to work with complex relational data structures in a way that makes retrieval easy and reduces the amount of redundancy.

```javascript
const boxers = [
  { id: 1, name: "Ali", KOs: 60.66%},
  { id: 2, name: "Foreman", KOs: 83.95%},
  ...
  { id: 999, name: "Tyson", KOs: 75.86%},
  { id: 1000, name: "Klitchko", KOs: 76.81%},
]
```

If an array of objects is small it is ok but if we have a large amount of data it may become an issue.
When we want to extract the desired user, we usually use `find()` which gives us a linear time complexity O(n).

```javascript
const userObject = boxers.find(boxer => boxer.id === 999)
```

We can achieve normalization converting array to object by using a reduce function.

```javascript
const normalized_boxers = boxers.reduce((acc, boxer) => {
  acc[boxer.id] = boxer
  return acc
}, {})
```

And now we have:

```javascript
normalized_boxers = {
1: { id: 1, name: "Ali", KOs: 60.66%},
2: { id: 2, name: "Foreman", KOs: 83.95%},
...
999: { id: 999, name: "Tyson", KOs: 75.86%},
1000: { id: 1000, name: "Klitchko", KOs: 76.81%}
}
```

When we want to get desired boxer we just target object with id:

```javascript
normalized_boxers[999]
```

And we get back whole object:

```javascript
{
  id:999,
  name:"Tyson",
  KOs:75.86
}
```

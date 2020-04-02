---
title: "Multiple setTimeout overlaping in React"
date: "2020-02-28"
description: "How to clear a settimeout in react?"
---

We have for example message alert which is implemented with `settTimeout()` to display a message for 2 seconds. If we activate alert before the previous time was not expired, our new message will end in the previous interval. We need to clear timeout functions. `settTimeout()` functions give us back value - identifier so we can clear timer. The best place to do is `useEffect()` in a clear function.

```javascript
useEffect(() => {
    const timer = () => setTimeout(() => ...some work ... , 2000);
    const timerId = timer();
    return () => {
      clearTimeout(timerId);
    };
  });
```

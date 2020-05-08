---
title: "Vue Best Practice"
date: "2020-05-09"
description: "Vue Best Practice"
---

## Naming

1. No more than one component per file.
2. PascalCase for naming component files. (i.e. "MyComponent.vue" not "myComponent.vue")
3. Base components (that is, a "dumb" component that has no interactivity and just displays data) should begin with the prefix "Base", "V", or "App". (As in : "BaseButton.vue", "BaseTable.vue")
4. Components that are created and used only once should be prefixed with "The", as:
   "TheHeading.vue, "TheSidebar.vue"
5. Child components tightly coupled with their parent should include the parent component name as a prefix. For example, "TodoList.vue" has children "TodoListItem.vue" & "TodoListAddButton.vue".
6. Component names should start with the highest-level (often most general) words and end with descriptive modifying words.

## Codding

1. Template expressions should only have basic Javascript expressions.
2. Always use :key inside v-for
3. Don't mutate props directly in a child component. They can still be mutated, but they should use the .sync/emit pattern.
4. Use kebab-case for events:

```javascript
this.$emit('close-window')
<popup-window @close-window='handleEvent()' />
```

5. Declare props with camelCase and use kebab-case in templates

```javascript
;<PopupWindow title-text="hello world" />

props: {
  titleText: String
}
```

6. Don’t use v-if with v-for elements. The problem with this is that VueJS prioritizes the v-for directive over the v-if directive. So under the hood, it loops through every element and then checks the v-if conditional.

```javascript

<div v-for='product in cheapProducts'>

computed: {
  cheapProducts: () => {
    return this.products.filter(function (product) {
      return product.price < 100
    })
  }
}
```

This is good for a few reasons:
a) Rendering is much more efficient because we don’t loop over every item.
b) The filtered list will only be re-evaluated when a dependency changes.
c) It helps separate our component logic from the template, making our component more readable.

## Computed

Complex computed properties should be split into as many simpler properties as possible.

## PROPS

The prop is used to pass in an initial value; the child component wants to use it as a local data property afterwards. In this case, it’s best to define a local data property that uses the prop as its initial value:

```javascript
 props: ['initialCounter'],
  data: function () {
    return {
      counter: this.initialCounter
    }
  }
```

The prop is passed in as a raw value that needs to be transformed. In this case, it’s best to define a computed property using the prop’s value:

```javascript
 props: ['size'],
  computed: {
    normalizedSize: function () {
      return this.size.trim().toLowerCase()
    }
}
```

Validate your props with good definitions - It basically saves future you from current you.

```javascript
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return [
        'ok',
        'false',
        'error'
      ].indexOf(value) !== -1
    }
  }
}
```

When we want to pass number or boolean we need v-bind to tell Vue that this is a JavaScript expression rather than a string. It's same for arrays and objects.

```javascript
  <child v-bind:number="42" :isBoolean="false"></child>

```

## Vuex

1. As a general rule, data that interacts with the API should be stored in the Vuex store.
2. Keep all API calls in actions, and those actions then commit to the mutator, and thus to the state, you can ensure that:
   a) all components are pulling from the single source of truth, and that no data will be duplicated
   b) your front-end store will stay synced with your back-end data
   c) your application will update automatically as soon as the API call resolves.
3. Whenever you can, normalize data that comes in array form unless the order is important (such as when you're getting the top 20 most recent pages from your API.) Even if the data has come back from the API as an array of objects, AND your view needs to display it as an array mapped over with a v-for directive, you should consider storing it in the store as an object of objects, by some identifying key, and then just denormalizing the data back again inside the getter.
   a) Retrieiving something from an object by key is O(1), compared to O(n) if you use searches or filters to find the same data.
   b) You can easily use ES6+'s built in Object.keys, Object.values, and Object.entries methods to get an array back from any object, but it's a bit more complicated to go the other way around.
   c) Listing by key allows you to be able to access the correct data even as data is removed or added.

4. Getters should not mutate data. They should only return the data you need.
   Getters are great for taking the data from the store then formatting it the way you need it before handing it off to the Vue component. This keeps transformation logic outside of the presentational Vue component. You can also use this pattern to create different transforms on the same data without mutating that data.

```javascript
const getters = {
  partnersList: state => state.partnersList, // gets the partner list.
  getPartnerById: state => id => state.partnersList[id], // returns a function which returns any partner by id.
  currentPartnerId: state => state.currentPartnerId, // gets the current partner object
  currentPartner: state => state.partnersList[state.currentPartnerId], // (even though that object isn't stored directly in the state)
}
```

5. An action is a function which takes as it's first parameter an object with a "commit" function. This commit function, in turn, takes a string as it's first parameter - that string determines what command the mutator should run.
   Actions can be synchronous or asynchronous. Because the commit is passed in as a callback, you can wait for other functions to resolve before dispatching the data to the store.

```javascript
const actions = {
  setCurrentPartner: ({ commit }, partnerId) => {
    commit('SET_CURRENT_PARTNER_ID', partnerId);
  },
  grabPartnerList: ({ commit }) => {
    return api.get.partnersList()
      .then(partnersList => {
        commit('SET_PARTNER_LIST', normalizePartners(partnersList));
      })
      .catch((err) => {
        console.error(err);
      });
  },

```

Actions don't actually change the store data - that's what mutators are for - but they send the command to change data so that it's ready for inclusion in the store.

**If you need to transform data before it gets to the store, transform it in the action, if you need to transform data after it comes from the store, transform it in the getter.**

6. Mutations is an object with different methods that take the Observable state as the first parameter. It is here, and ONLY here that any part of the state should be changed.

```javascript
const mutations = {
  ["SET_PARTNER_LIST"](state, partnersList) {
    state.partnersList = partnersList
  },
  ["SET_CURRENT_PARTNER_ID"](state, partnerId) {
    state.currentPartnerId = partnerId
  },
}
```

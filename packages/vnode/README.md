# @vnode-execute/vnode

🚀 The nature of vnode!

## Design

The common designs are as follows

### Use vnode to describe DOM

```js
const elementVNode = {
  tag: 'div',
  data: {
    style: {
      width: '100px',
      height: '100px',
      backgroundColor: 'red'
    }
  }
}
```

```js
const elementVNode = {
  tag: 'div',
  data: null,
  children: {
    tag: 'span',
    data: null
  }
}
```

```js
const elementVNode = {
  tag: 'div',
  data: null,
  children: [
    {
      tag: 'h1',
      data: null
    },
    {
      tag: 'p',
      data: null
    }
  ]
}
```

```js
const textVNode = {
  tag: null,
  data: null,
  children: 'text content'
}
```

Think about `textVnode` design, if you design it, maybe you design like this:

```js
const textVNode = {
  tag: null,
  data: null,
  children: null,
  text: 'text content'
}
```

Reuse attributes as much as possible while ensuring that the semantics make sense.

### Use vnode to describe component

> Component

Transform

```html
<MyComponent />
```

to

```js
const elementVNode = {
  tag: MyComponent,
  data: null
}
```

> Fragment

```html
<template>
  <table>
    <tr>
      <Columns />
      <!-- Columns is a collection, just like: -->
      <!-- <template> -->
      <!-- <td></td> -->
      <!-- <td></td> -->
      <!-- <td></td> -->
      <!-- <template/> -->
    </tr>
  </table>
</template>
```

Transform

```html
<Columns />
```

to

```js
const Fragment = Symbol()

const fragmentVNode = {
  tag: Fragment,
  data: null,
  children: [
    {
      tag: 'td',
      data: null
    },
    {
      tag: 'td',
      data: null
    },
    {
      tag: 'td',
      data: null
    }
  ]
}
```

> Portal

Transform

```html
<template>
  <Portal target="#app-root">
    <div class="overlay"></div>
  </Portal>
</template>
```

to

```js
const Portal = Symbol()

const portalVNode = {
  tag: Portal,
  data: {
    target: '#app-root'
  },
  children: {
    tag: 'div',
    data: {
      class: 'overlay'
    }
  }
}
```

Use `Symbol` to mark vnode type is not better, we can define some flag to reocrd vnode type.

## VNode Types

1. html/svg DOM
2. component
    - stateful component
        - normal
        - keepalive
        - keepalived
    - functional component
3. text
4. fragment
5. portal

In vuejs 2.x vnode execute process like this:

[vuejs 2.x vnode execute process](https://github.com/HcySunYang/vue-design/blob/master/docs/zh/vnode.md)
[Just-in-Time (JiT) vs Ahead-of-Time (AoT)](https://stackoverflow.com/questions/41450226/just-in-time-jit-vs-ahead-of-time-aot-compilation-in-angular)

This pattern is JIT, developer not handle this.

## Question

1. How does vuejs create vnode?

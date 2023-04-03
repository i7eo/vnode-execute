import { /*Fragment, Portal,*/ h } from '@vnode-execute/h'
import render from './render'

// const dynamicArrayClass = ['test-1', 'test-2']
// const dynamicObjectClass = {
//   'test-3': true,
//   'test-4': true,
// }
// const elementVnode = h(
//   'div',
//   {
//     style: {
//       height: '100px',
//       width: '100px',
//       background: 'red',
//     },
//   },
//   // 'text'
//   h('div', {
//     style: {
//       height: '50px',
//       width: '50px',
//       background: 'green',
//     },
//     class: ['test', dynamicArrayClass, dynamicObjectClass],
//   })
// )
// render(elementVnode, document.getElementById('app'))

// const elementVnode1 = h('input', {
//   class: 'cls-a',
//   type: 'checkbox',
//   checked: true,
//   custom: '1',
// })
// render(elementVnode1, document.getElementById('app'))

// function handler() {
//   // eslint-disable-next-line no-alert
//   alert('click me')
// }
// const elementVnode2 = h('div', {
//   style: {
//     width: '100px',
//     height: '100px',
//     backgroundColor: 'red',
//   },
//   // 点击事件
//   onclick: handler,
// })
// render(elementVnode2, document.getElementById('app'))

// const elementVnode3 = h(
//   'div',
//   {
//     style: {
//       height: '100px',
//       width: '100px',
//       background: 'red',
//     },
//   },
//   '我是文本'
// )
// render(elementVnode3, document.getElementById('app'))

// const elementVNode4 = h(
//   'div',
//   {
//     style: {
//       height: '100px',
//       width: '100px',
//       background: 'red',
//     },
//   },
//   h(Fragment, null, [
//     h('span', null, '我是标题1......'),
//     h('span', null, '我是标题2......'),
//   ])
// )
// render(elementVNode4, document.getElementById('app'))

// const elementVNode5 = h(
//   'div',
//   {
//     style: {
//       height: '100px',
//       width: '100px',
//       background: 'red',
//     },
//   },
//   h(Portal, { target: '#portal-box' }, [
//     h('span', null, '我是标题1......'),
//     h('span', null, '我是标题2......'),
//   ])
// )
// render(elementVNode5, document.getElementById('app'))

// class MyComponent {
//   render() {
//     return h(
//       'div',
//       {
//         style: {
//           background: 'green',
//         },
//       },
//       [
//         h('span', null, '我是组件的标题1......'),
//         h('span', null, '我是组件的标题2......'),
//       ]
//     )
//   }
// }
// // h 函数的第一个参数是组件类
// const compVnode = h(MyComponent)
// render(compVnode, document.getElementById('app'))

function MyFunctionalComponent() {
  // 返回要渲染的内容描述，即 VNode
  return h(
    'div',
    {
      style: {
        background: 'green',
      },
    },
    [
      h('span', null, '我是组件的标题11......'),
      h('span', null, '我是组件的标题22......'),
    ]
  )
}
const compVnode = h(MyFunctionalComponent)
render(compVnode, document.getElementById('app'))

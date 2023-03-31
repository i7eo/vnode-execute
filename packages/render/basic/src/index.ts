import { h } from '@vnode-execute/h'
import render from './render'

const dynamicArrayClass = ['test-1', 'test-2']
const dynamicObjectClass = {
  'test-3': true,
  'test-4': true,
}

const elementVnode = h(
  'div',
  {
    style: {
      height: '100px',
      width: '100px',
      background: 'red',
    },
  },
  // 'text'
  h('div', {
    style: {
      height: '50px',
      width: '50px',
      background: 'green',
    },
    class: ['test', dynamicArrayClass, dynamicObjectClass],
  })
)

render(elementVnode, document.getElementById('app'))

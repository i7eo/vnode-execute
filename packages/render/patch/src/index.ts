import { /*Fragment, Portal,*/ h } from '@vnode-execute/h'
import render from './render'

// // 旧的 VNode 是一个 div 标签
// const prevVNode = h('div', null, '旧的 VNode')
// class MyComponent {
//   render() {
//     return h('h1', null, '新的 VNode')
//   }
// }
// // 新的 VNode 是一个组件
// const nextVNode = h(MyComponent)
// // 先后渲染新旧 VNode 到 #app
// render(prevVNode, document.getElementById('app'))
// render(nextVNode, document.getElementById('app'))

// // 旧的 VNode
// const prevVNode = h('div', {
//   style: {
//     width: '100px',
//     height: '100px',
//     backgroundColor: 'red',
//   },
// })
// // 新的 VNode
// const nextVNode = h('div', {
//   style: {
//     width: '100px',
//     height: '100px',
//     border: '1px solid green',
//   },
// })
// render(prevVNode, document.getElementById('app'))
// // 2秒后更新
// setTimeout(() => {
//   render(nextVNode, document.getElementById('app'))
// }, 2000)

// // 旧的 VNode
// const prevVNode = h(
//   'div',
//   null,
//   h('p', {
//     style: {
//       height: '100px',
//       width: '100px',
//       background: 'red',
//     },
//   })
// )
// // 新的 VNode
// const nextVNode = h(
//   'div',
//   null,
//   h('p', {
//     style: {
//       height: '100px',
//       width: '100px',
//       background: 'green',
//     },
//   })
// )
// render(prevVNode, document.getElementById('app'))
// // 2秒后更新
// setTimeout(() => {
//   render(nextVNode, document.getElementById('app'))
// }, 2000)

// // 旧的 VNode
// const prevVNode = h(
//   'div',
//   null,
//   h('p', {
//     style: {
//       height: '100px',
//       width: '100px',
//       background: 'red',
//     },
//   })
// )
// // 新的 VNode
// const nextVNode = h('div')
// render(prevVNode, document.getElementById('app'))
// // 2秒后更新
// setTimeout(() => {
//   render(nextVNode, document.getElementById('app'))
// }, 2000)

// // 旧的 VNode
// const prevVNode = h('div', null, h('p', null, '只有一个子节点'))
// // 新的 VNode
// const nextVNode = h('div', null, [
//   h('p', null, '子节点 1'),
//   h('p', null, '子节点 2'),
// ])
// render(prevVNode, document.getElementById('app'))
// // 2秒后更新
// setTimeout(() => {
//   render(nextVNode, document.getElementById('app'))
// }, 2000)

// // 旧的 VNode
// const prevVNode = h('div', null, [
//   h('p', null, '旧的子节点1'),
//   h('p', null, '旧的子节点2'),
// ])
// // 新的 VNode
// const nextVNode = h('div', null, [
//   h('p', null, '新的子节点1'),
//   h('p', null, '新的子节点2'),
// ])
// render(prevVNode, document.getElementById('app'))
// // 2秒后更新
// setTimeout(() => {
//   render(nextVNode, document.getElementById('app'))
// }, 2000)

// // 旧的 VNode
// const prevVNode = h('p', null, '旧文本')
// // 新的 VNode
// const nextVNode = h('p', null, '新文本')
// render(prevVNode, document.getElementById('app'))
// // 2秒后更新
// setTimeout(() => {
//   render(nextVNode, document.getElementById('app'))
// }, 2000)

// // 旧的 VNode
// const prevVNode = h(Fragment, null, [
//   h('p', null, '旧片段子节点 1'),
//   h('p', null, '旧片段子节点 2'),
// ])
// // 新的 VNode
// const nextVNode = h(Fragment, null, [
//   h('p', null, '新片段子节点 1'),
//   h('p', null, '新片段子节点 2'),
// ])
// render(prevVNode, document.getElementById('app'))
// // 2秒后更新
// setTimeout(() => {
//   render(nextVNode, document.getElementById('app'))
// }, 2000)

// // 旧的 VNode
// const prevVNode = h(
//   Portal,
//   { target: '#old-container' },
//   h('p', null, '旧的 Portal')
// )
// // 新的 VNode
// const nextVNode = h(
//   Portal,
//   { target: '#new-container' },
//   h('p', null, '新的 Portal')
// )
// render(prevVNode, document.getElementById('app'))
// // 2秒后更新
// setTimeout(() => {
//   render(nextVNode, document.getElementById('app'))
// }, 2000)

// // 组件类
// class MyComponent {
//   localState = 'one'

//   private _update() {
//     throw new Error('Method not implemented.')
//   }

//   mounted() {
//     setTimeout(() => {
//       this.localState = 'two'
//       this._update()
//     }, 2000)
//   }

//   render() {
//     return h('div', null, this.localState)
//   }
// }
// // 有状态组件 VNode
// const compVNode = h(MyComponent)
// render(compVNode, document.getElementById('app'))

// // 子组件类
// class ChildComponent {
//   private $props: any
//   render() {
//     return h('div', null, this.$props.text)
//   }
// }
// // 父组件类
// class ParentComponent {
//   localState = 'one'

//   render() {
//     return h(ChildComponent, {
//       text: this.localState,
//     })
//   }
// }
// // 有状态组件 VNode
// const compVNode = h(ParentComponent)
// render(compVNode, document.getElementById('app'))

// // 子组件类
// class ChildComponent {
//   private $props: any
//   render() {
//     return h('div', null, this.$props.text)
//   }
// }
// // 父组件类
// class ParentComponent {
//   localState = 'one'

//   mounted() {
//     setTimeout(() => {
//       this.localState = 'two'
//       this._update()
//     }, 2000)
//   }
//   private _update() {
//     throw new Error('Method not implemented.')
//   }

//   render() {
//     return h(ChildComponent, {
//       text: this.localState,
//     })
//   }
// }
// // 有状态组件 VNode
// const compVNode = h(ParentComponent)
// render(compVNode, document.getElementById('app'))

// // 子组件类 1
// class ChildComponent1 {
//   render() {
//     return h('div', null, '子组件 1')
//   }
// }
// // 子组件类 2
// class ChildComponent2 {
//   render() {
//     return h('div', null, '子组件 2')
//   }
// }
// // 父组件类
// class ParentComponent {
//   isTrue = true

//   mounted() {
//     setTimeout(() => {
//       this.isTrue = false
//       this._update()
//     }, 2000)
//   }
//   private _update() {
//     throw new Error('Method not implemented.')
//   }

//   render() {
//     return this.isTrue ? h(ChildComponent1) : h(ChildComponent2)
//   }
// }
// // 有状态组件 VNode
// const compVNode = h(ParentComponent)
// render(compVNode, document.getElementById('app'))

// 子组件 - 函数式组件
function MyFunctionalComp(props: any) {
  return h('div', null, props.text)
}
// 父组件类
class ParentComponent {
  localState = 'one'

  mounted() {
    setTimeout(() => {
      this.localState = 'two'
      this._update()
    }, 2000)
  }
  private _update() {
    throw new Error('Method not implemented.')
  }

  render() {
    return h(MyFunctionalComp, {
      text: this.localState,
    })
  }
}
// 有状态组件 VNode
const compVNode = h(ParentComponent)
render(compVNode, document.getElementById('app'))

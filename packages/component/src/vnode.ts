export function main() {
  /**
   * @description 状态组件(Stateful component)
   * 1. 是一个类，可实例化
   * 2. 可以有自身状态
   * 3. 产出 VNode 的方式：需要实例化，然后调用其 render 函数
   */
  class MyButton {
    render() {
      return {
        tag: 'div',
      }
    }
  }
  //vnode desc
  const MyButtonVNode = {
    tag: MyButton,
  }

  /**
   * @description 函数式组件(Functional component)
   * 1. 是一个纯函数
   * 2. 没有自身状态，只接收外部数据
   * 3. 产出 VNode 的方式：单纯的函数调用
   */
  function MyImage(props: Record<string, any>) {
    console.log(props)
    return {
      tag: 'img',
    }
  }

  function render(vnode: Record<string, any>, container: HTMLElement) {
    if (typeof vnode.tag === 'string') {
      mountElement(vnode, container)
    } else {
      mountComponent(vnode, container)
    }
  }

  function mountElement(vnode: Record<string, any>, container: HTMLElement) {
    // 创建元素
    const el = document.createElement(vnode.tag)
    // 将元素添加到容器
    container.appendChild(el)
  }

  function mountComponent(vnode: Record<string, any>, container: HTMLElement) {
    // 创建组件实例
    const instance = new vnode.tag()
    // 渲染
    instance.$vnode = instance.render()
    // 挂载
    mountElement(instance.$vnode, container)
  }

  render(MyButtonVNode, document.querySelector('.component-vnode-1')!)
  render(
    MyImage({ title: 'aa' }),
    document.querySelector('.component-vnode-2')!
  )
}

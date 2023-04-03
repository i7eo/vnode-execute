import { ChildrenFlags, VNodeFlags, createTextVNode } from '@vnode-execute/h'
import type { VNode } from '@vnode-execute/h'

const DomPropsRegExp = /[A-Z]|^(?:value|checked|selected|muted)$/

export default function render(
  vnode: VNode,
  container: VNode | HTMLElement | null
) {
  const _container = container as VNode
  const prevVNode = (_container as VNode).vnode
  if (prevVNode == null) {
    if (vnode) {
      // 没有旧的 VNode，使用 `mount` 函数挂载全新的 VNode
      mount(vnode, _container)
      // 将新的 VNode 添加到 _container.vnode 属性下，这样下一次渲染时旧的 VNode 就存在了
      _container.vnode = vnode
    }
  } else {
    if (vnode) {
      // 有旧的 VNode，则调用 `patch` 函数打补丁
      // patch(prevVNode, vnode, _container)
      // 更新 _container.vnode
      _container.vnode = vnode
    } else {
      // 有旧的 VNode 但是没有新的 VNode，这说明应该移除 DOM，在浏览器中可以使用 removeChild 函数。
      _container.removeChild(prevVNode.el)
      _container.vnode = null
    }
  }
}

function mount(vnode: VNode, container: VNode | HTMLElement, isSVG?: boolean) {
  const _container = container as VNode
  const { flags } = vnode
  if (flags & VNodeFlags.ELEMENT) {
    // 挂载普通标签
    mountElement(vnode, _container, isSVG)
  } else if (flags & VNodeFlags.COMPONENT) {
    // 挂载组件
    mountComponent(vnode, _container, isSVG)
  } else if (flags & VNodeFlags.TEXT) {
    // 挂载纯文本
    mountText(vnode, _container)
  } else if (flags & VNodeFlags.FRAGMENT) {
    // 挂载 Fragment
    mountFragment(vnode, _container, isSVG)
  } else if (flags & VNodeFlags.PORTAL) {
    // 挂载 Portal
    mountPortal(vnode, _container)
  }
}

function mountElement(
  vnode: VNode,
  container: VNode | HTMLElement,
  isSVG?: boolean
) {
  const _isSVG = Boolean(isSVG || vnode.flags & VNodeFlags.ELEMENT_SVG)
  const el = _isSVG
    ? document.createElementNS('http://www.w3.org/2000/svg', vnode.tag)
    : document.createElement(vnode.tag)
  vnode.el = el
  const data = vnode.data

  if (data) {
    for (const key in data) {
      switch (key) {
        case 'style':
          for (const k in data.style) {
            el.style[k] = data.style[k]
          }
          break
        case 'class':
          el.className = data[key]
          break
        default:
          if (key.startsWith('on')) {
            el.addEventListener(key.slice(2), data[key])
          } else if (DomPropsRegExp.test(key)) {
            // 当作 DOM Prop 处理
            el[key] = data[key]
          } else {
            // 当作 Attr 处理
            el.setAttribute(key, data[key])
          }
          break
      }
    }
  }

  const childFlags = vnode.childFlags
  const children = vnode.children

  if (childFlags !== ChildrenFlags.NO_CHILDREN) {
    if (childFlags & ChildrenFlags.SINGLE_VNODE) {
      mount(children, el, _isSVG)
    } else if (childFlags & ChildrenFlags.MULTIPLE_VNODES) {
      for (let i = 0; i < children.length; i++) {
        mount(children[i], el, _isSVG)
      }
    }
  }

  container.appendChild(el)
}

function mountComponent(
  vnode: VNode,
  container: VNode | HTMLElement,
  isSVG?: boolean
) {
  if (vnode.flags & VNodeFlags.COMPONENT_STATEFUL) {
    mountStatefulComponent(vnode, container, isSVG)
  } else {
    mountFunctionalComponent(vnode, container, isSVG)
  }
}

function mountStatefulComponent(
  vnode: VNode,
  container: VNode | HTMLElement,
  isSVG?: boolean
) {
  // 创建组件实例
  const instance = new vnode.tag()
  // 渲染VNode
  instance.$vnode = instance.render()
  // 挂载
  mount(instance.$vnode, container, isSVG)
  // el 属性值 和 组件实例的 $el 属性都引用组件的根DOM元素
  instance.$el = vnode.el = instance.$vnode.el
}

function mountFunctionalComponent(
  vnode: VNode,
  container: VNode | HTMLElement,
  isSVG?: boolean
) {
  // 获取 VNode
  const $vnode = vnode.tag()
  // 挂载
  mount($vnode, container, isSVG)
  // el 元素引用该组件的根元素
  vnode.el = $vnode.el
}

function mountText(vnode: VNode, container: VNode | HTMLElement) {
  const el = document.createTextNode(vnode.children)
  vnode.el = el
  container.appendChild(el)
}

function mountFragment(
  vnode: VNode,
  container: VNode | HTMLElement,
  isSVG?: boolean
) {
  // 拿到 children 和 childFlags
  const { children, childFlags } = vnode
  switch (childFlags) {
    case ChildrenFlags.SINGLE_VNODE:
      // 如果是单个子节点，则直接调用 mount
      mount(children, container, isSVG)
      vnode.el = children.el
      break
    case ChildrenFlags.NO_CHILDREN:
      // 如果没有子节点，等价于挂载空片段，会创建一个空的文本节点占位
      // eslint-disable-next-line no-case-declarations
      const placeholder = createTextVNode('')
      mountText(placeholder, container)
      // 没有子节点指向占位的空文本节点
      vnode.el = placeholder.el
      break
    default:
      // 多个子节点，遍历挂载之
      for (let i = 0; i < children.length; i++) {
        mount(children[i], container, isSVG)
      }
      // 多个子节点，指向第一个子节点
      vnode.el = children[0].el
  }
}

function mountPortal(vnode: VNode, container: VNode | HTMLElement) {
  const { tag, children, childFlags } = vnode

  // 获取挂载点
  const target = typeof tag === 'string' ? document.querySelector(tag) : tag
  if (!target) {
    console.warn(`please create html tag${tag}`)
    return
  }

  if (childFlags & ChildrenFlags.SINGLE_VNODE) {
    // 将 children 挂在到 target 上，而非 container
    mount(children, target)
  } else if (childFlags & ChildrenFlags.MULTIPLE_VNODES) {
    for (let i = 0; i < children.length; i++) {
      // 将 children 挂在到 target 上，而非 container
      mount(children[i], target)
    }
  }

  // 占位的空文本节点
  const placeholder = createTextVNode('')
  // 将该节点挂载到 container 中
  mountText(placeholder, container)
  // el 属性引用该节点
  vnode.el = placeholder.el
}

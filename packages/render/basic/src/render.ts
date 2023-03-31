import { ChildrenFlags, VNodeFlags } from '@vnode-execute/h'
import type { VNode } from '@vnode-execute/h'

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
    // mountComponent(vnode, _container, isSVG)
  } else if (flags & VNodeFlags.TEXT) {
    // 挂载纯文本
    // mountText(vnode, _container)
  } else if (flags & VNodeFlags.FRAGMENT) {
    // 挂载 Fragment
    // mountFragment(vnode, _container, isSVG)
  } else if (flags & VNodeFlags.PORTAL) {
    // 挂载 Portal
    // mountPortal(vnode, _container, isSVG)
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

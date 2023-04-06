const DomPropsRegExp = /\W|^(?:value|checked|selected|muted)$/

export function patchVNodeData(
  el: any,
  key: string,
  prevValue: any,
  nextValue: any
) {
  switch (key) {
    case 'style':
      for (const k in nextValue) {
        el.style[k] = nextValue[k]
      }
      for (const k in prevValue) {
        // eslint-disable-next-line no-prototype-builtins
        if (!nextValue.hasOwnProperty(k)) {
          el.style[k] = ''
        }
      }
      break
    case 'class':
      el.className = nextValue
      break
    default:
      if (key[0] === 'o' && key[1] === 'n') {
        // 事件
        // 移除旧事件
        if (prevValue) {
          el.removeEventListener(key.slice(2), prevValue)
        }
        // 添加新事件
        if (nextValue) {
          el.addEventListener(key.slice(2), nextValue)
        }
      } else if (DomPropsRegExp.test(key)) {
        // 当做 DOM Prop 处理
        el[key] = nextValue
      } else {
        // 当做 Attr 处理
        el.setAttribute(key, nextValue)
      }
      break
  }
}

let signal = 0 // 信号量
let instance = null // 实例
let actions = [] // 埋点动作

class Stack {
  constructor() {
    if (!signal) {
      signal = 1
      instance = new Stack()
    }
    return instance
  }

  push(action) {
    actions.push(action)
  }

  pushActions(actionArray) {
    actions = [actions, ...actionArray]
  }

  getActions() {
    return actions
  }

  clearActions() {
    actions = []
  }
}

export default Stack

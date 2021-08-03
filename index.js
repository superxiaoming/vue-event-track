import Stack from './core/stack'
import { directive } from './core/directive'
import { afterRouter } from './core/router'
const stack = new Stack()

const vueEventTrack = {}
vueEventTrack.install = function(Vue, options) {
  // 埋点指令
  directive(Vue, stack)

  // 路由埋点
  afterRouter(options.router)

  // 每两分钟执行提交操作
  setInterval(() => {
    const actions = stack.getActions()
    options.callBack(actions).then(res => {
      if (res === 'success') {
        stack.clearActions()
      } else {
        console.log('cancel clear actions')
      }
    })
  }, options.intervalTimes || 1200000)

  // 监听浏览器刷新
  window && window.addEventListener('beforeunload', () => {
    const actions = stack.getActions()
    options.callBack(actions).then(res => {
      if (res === 'success') {
        stack.clearActions()
      }
    })
  })

  // 挂载栈到Vue原型上
  Vue.prototype.$eventTrackStack = stack
}

export default vueEventTrack

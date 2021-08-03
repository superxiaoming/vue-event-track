import { dateFormat } from '../utils/utils'

export function directive(Vue, stack) {
  Vue.directive('track', {
    bind: (el, binding, vnode) => {
      if (binding.value) {
        switch (binding.value.act) {
          case 'click':
            el.onclick = function() {
              const params = Object.assign(binding.value, { triggerTime: dateFormat(new Date().getTime() / 1000) })
              stack.push(params)
              console.log('actions', stack.getActions())
            }
            break
          case 'other':
            console.log('other')
            break
        }
      }
    }
  })
}

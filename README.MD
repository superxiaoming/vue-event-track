# vue-event-track

> 用于Vue工程中进行数据埋点上传的工具

## 引入方式

```bash
# 安装依赖
npm install

# 引入main.js中
import vueEventTrack from 'vue-event-track'

Vue.use(vueEventTrack, {
  router, // vue-router实例
  callBack: callBackFunction, // 数据上报回调函数
  intervalTimes: 60000 // 定时上报时间，毫秒级
})

# 回调函数可参考如下格式，其中request为axios实例
export const callBackFunction = async params => {
  const res = await request({
    url: '/**',
    method: 'post',
    data: params
  })
  if (...) {
    return Promise.resolve('success') // success时代表数据上报成功，此时将会清除采集的埋点数据
  } else {
    return Promise.resolve('error') // error代表上报失败，此时不会清除采集的数据
  }
}
```

## 使用介绍

数据采集方式分两种，指令采集以及自定义采集，使用指令采集需在代码元素中使用自定义指令，示例如下：
```bash
# 指令参数为对象，其中act为对象必填属性，目前仅支持click事件操作，除act外，可随意添加其他业务属性
<button type="primary" v-track="{ act: 'click', ... }">click</button>
```

自定义采集：
由于已将vue-event-track的栈实例绑定到Vue原型上，因此可以通过调用下列api进行自定义采集，可在合适位置
如路由守卫等地方调用
```bash
# 获取采集数据，无参数，返回list
Vue.prototype.$eventTrackStack.getActions()

# 添加采集数据，参数为object，无返回
Vue.prototype.$eventTrackStack.push()

# 批量添加采集数据，参数为object list,无返回
Vue.prototype.$eventTrackStack.pushActions()

# 清除采集数据，无参数，无返回
Vue.prototype.$eventTrackStack.clearActions()
```

## License

[MIT](https://github.com/superxiaoming/vue-event-track.git) license.

Copyright (c) 2021-present Ysm

import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'
import {CLOUD_ENV} from '@/constants/config'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Taro.Config = {
    pages: ['pages/index/Index'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#e6e6e6',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true
    }
  }

  componentDidMount() {
    // 检查更新
    const updateManager = Taro.getUpdateManager()
    updateManager.onUpdateReady(() => {
      Taro.showModal({
        title: '更新提示',
        content: '新版的资讯奶酪新鲜出炉啦，快来尝尝吧~',
        success: res => {
          res.confirm && updateManager.applyUpdate()
        }
      })
    })
    Taro.cloud.init({
      env: CLOUD_ENV
    })
  }

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />
  }
}

Taro.render(<App />, document.getElementById('app'))

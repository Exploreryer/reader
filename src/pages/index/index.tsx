import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import request from '@/utils/request'
import { API_READ_HUB_TOPICS } from '@/constants/api'
import InfoCard from '@/components/InfoCard'
import _ from 'lodash'
import { formatDateOrDuring, parseFirstSentence, transformObjectToParams } from '@/utils'

interface IndexState {
  data: any[]
}

const DEFAULT_REQUEST_PARAMS = {
  pageSize: 20,
  lastCursor: ''
}

export default class Index extends Component<{}, IndexState> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '话题',
    backgroundColor: '#e6e6e6'
  }

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  getLastCursor = () => {
    const { data } = this.state
    return _.get(_.last(data), 'order')
  }

  updateData = params => {
    return request<any[]>({
      url: `${API_READ_HUB_TOPICS}${transformObjectToParams(params)}`,
      parse: res => _.get(res, 'data.data', [])
    })
  }

  refreshData = () => {
    this.updateData(DEFAULT_REQUEST_PARAMS).then((data: any[]) => {
      this.setState({
        data
      })
      return data
    })
  }

  loadMoreData = () => {
    this.updateData(
      _.extend({}, DEFAULT_REQUEST_PARAMS, { lastCursor: this.getLastCursor() })
    ).then(data => {
      this.setState(({ data: prevData }) => ({ data: prevData.concat(data) }))
      return data
    })
  }

  componentWillMount() {}

  componentDidMount() {
    this.refreshData()
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onPullDownRefresh() {
    this.refreshData()
  }

  onReachBottom(): void {
    this.loadMoreData()
  }

  render() {
    const { data } = this.state
    return (
      <View className="container">
        {data.map(item => {
          const { title, summary, createdAt: createTime } = item
          return (
            <InfoCard
              title={title}
              desc={parseFirstSentence(summary)}
              time={formatDateOrDuring(createTime)}
              key={title}
            />
          )
        })}
      </View>
    )
  }
}

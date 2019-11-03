import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './index.scss'
import request from "@/utils/request";
import {API_READ_HUB_TOPICS} from "@/constants/api";
import InfoCard from "@/components/InfoCard";
import _ from 'lodash';
import {formatDateOrDuring, parseFirstSentence} from "@/utils";

interface IndexState {
  data: any[]
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
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
    request({
      url: API_READ_HUB_TOPICS, onSuccess: (res) => {
        const data = _.get(res, 'data.data', [])
        console.log(data)
        this.setState({
          data
        })
      }
    })
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    const {data} = this.state
    return (
      <View className='container'>
        {
          data.map((item) => {
            const {title, summary, createdAt: createTime} = item
            return <InfoCard title={title} desc={parseFirstSentence(summary)} time={formatDateOrDuring(createTime)}
                             key={title}/>
          })
        }
      </View>
    )
  }
}

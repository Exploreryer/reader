import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import Card from '@/components/Card'
import _ from 'lodash'
import './InfoCard.scss'
import classNames from 'classnames'
import { getRect } from '@/utils/dom'
import { formatDateOrDuring, parseFirstSentence } from '@/utils'
import request from '@/utils/request'
import { API_READ_HUB_TOPIC } from '@/constants/api'

interface InfoCardProps {
  data: Record<string, any>
}

interface InfoCardState {
  active: boolean
  containerStyle: Record<string, any>
  detailData: Record<string, any>
}

export default class InfoCard extends Taro.Component<InfoCardProps, InfoCardState> {
  static defaultProps = {
    data: {}
  }

  containerRect: Record<string, number>

  constructor(props) {
    super(props)
    this.state = {
      active: false,
      containerStyle: {},
      detailData: {}
    }
  }

  componentDidMount(): void {
    getRect(
      '.info-card-container',
      rect => {
        const { width, height } = rect
        return (this.containerRect = { width, height })
      },
      this.$scope
    )
  }

  updateDetail = () => {
    const {
      data: { id }
    } = this.props
    Taro.showLoading()
    return request({ url: API_READ_HUB_TOPIC({ id }), parse: res => _.get(res, 'data', {}) }).then(
      detailData => {
        Taro.hideLoading()
        this.setState({ detailData })
        return detailData
      }
    )
  }

  handleLongPress = e => {
    Taro.vibrateShort().then(() => {
      // 抓取详细数据
      this.updateDetail()
      this.setState({
        containerStyle: {
          width: `${this.containerRect.width}px`,
          height: `${this.containerRect.height}px`,
          marginBottom: '30rpx'
        }
      })
      this.setState({ active: true })
    })
  }

  handleClosePreview = () => {
    this.setState({ active: false })
  }

  render(): any {
    const {
      data: { summary, title, createdAt }
    } = this.props
    const {
      active,
      containerStyle,
      detailData: { summary: detailSummary, createdAt: detailCreatedAt }
    } = this.state
    const cls = classNames('info-card-container', {
      'info-card-container-active': active
    })
    const desc = active ? detailSummary : parseFirstSentence(summary)
    const time = formatDateOrDuring(active ? detailCreatedAt : createdAt)
    return (
      <View className={cls} style={containerStyle}>
        <Card
          onLongPress={this.handleLongPress}
          onClick={this.handleClosePreview}
          class-name="main"
        >
          <View className="title">{title}</View>
          <View className="description">{desc}</View>
          <View className="time">{time}</View>
        </Card>
      </View>
    )
  }
}

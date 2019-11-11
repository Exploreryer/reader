import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Card from '@/components/Card'
import _ from 'lodash'
import './InfoCard.scss'
import classNames from 'classnames'
import { getRect, getRectOffset } from '@/utils/dom'
import { formatDateOrDuring, parseFirstSentence } from '@/utils'
import request from '@/utils/request'
import { API_READ_HUB_TOPIC } from '@/constants/api'
import { stylePrefix } from '@/utils/prefix'

const addStylePrefix = stylePrefix('info-card')

interface InfoCardProps {
  data: Record<string, any>
}

interface InfoCardState {
  active: boolean
  containerStyle: Record<string, any>
  mainStyle: Record<string, any>
  detailData: Record<string, any>
}

export default class InfoCard extends Taro.Component<
  InfoCardProps,
  InfoCardState
> {
  static defaultProps = {
    data: {}
  }

  containerRect: Record<string, number>
  containerRectOffset: Record<string, number>
  animationData = []

  constructor(props) {
    super(props)
    this.state = {
      active: false,
      containerStyle: {},
      mainStyle: {},
      detailData: {}
    }
  }

  componentDidMount(): void {
    getRect(
      '.info-card-container',
      rect => {
        this.containerRect = rect
      },
      this.$scope
    )
    getRectOffset(rect => (this.containerRectOffset = rect), this.$scope)
  }

  updateDetail = () => {
    const {
      data: { id }
    } = this.props
    const { detailData } = this.state
    return (
      _.isEmpty(detailData) &&
      request({
        url: API_READ_HUB_TOPIC({ id }),
        parse: res => _.get(res, 'data', {})
      }).then(detailData => {
        this.setState({ detailData })
        return detailData
      })
    )
  }

  getPopupAni = () =>
    Taro.createAnimation({
      transformOrigin: '50% 50%',
      timingFunction: 'ease',
      delay: 0
    })
      .scale(0.9, 0.9)
      .step({ during: 50 })
      .scale(1, 1)
      .step({ during: 50, delay: 50 })
      .export()

  getPopDownAni = () =>
    Taro.createAnimation({
      transformOrigin: '50% 50%',
      timingFunction: 'ease',
      delay: 0
    })
      .step({ during: 25 })
      .step({ during: 25, delay: 25 })
      .export()

  handleLongPress = e => {
    this.animationData = this.getPopupAni()
    Taro.vibrateShort().then(() => {
      setTimeout(() => {
        this.setState({
          containerStyle: {
            width: `${this.containerRect.width}px`,
            height: `${this.containerRect.height}px`,
            marginBottom: '30rpx'
          },
          active: true
        })
        // 抓取详细数据
        this.updateDetail()
      }, 100)
    })
  }

  handleClosePreview = () => {
    this.animationData = this.getPopDownAni()
    this.setState({ active: false })
  }

  handleAnimationEnd = e => {
    this.animationData = []
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
    const cls = classNames(addStylePrefix('container'), {
      [addStylePrefix('container-active')]: active
    })
    const desc = active ? detailSummary : parseFirstSentence(summary)
    const time = formatDateOrDuring(active ? detailCreatedAt : createdAt)
    return (
      <View className={cls} style={containerStyle}>
        <Card
          onLongPress={this.handleLongPress}
          onClick={this.handleClosePreview}
          className={classNames({
            [addStylePrefix('container-active-main')]: active
          })}
          animation={this.animationData}
          onAnimationEnd={this.handleAnimationEnd}
        >
          <View className={addStylePrefix('title')}>{title}</View>
          <View className={addStylePrefix('description')}>{desc}</View>
          <View className={addStylePrefix('time')}>{time}</View>
        </Card>
      </View>
    )
  }
}

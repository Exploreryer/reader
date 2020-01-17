import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Card from '@/components/Card'
import _get from 'lodash.get'
import _isEmpty from 'lodash.isempty'
import classNames from 'classnames'
import { getRect, getRectOffset } from '@/utils/dom'
import { formatDateOrDuring, parseFirstSentence } from '@/utils'
import request from '@/utils/request'
import {API_READ_HUB_TOPIC} from '@/constants/api'
import './InfoCard.scss'
import { stylePrefix } from '@/utils/prefix'

const addStylePrefix = stylePrefix('info-card')

interface InfoCardProps {
  data: BaseObject
}

interface InfoCardState {
  active: boolean
  containerStyle: BaseObject
  detailData: BaseObject
}

export default class InfoCard extends Taro.Component<
  InfoCardProps,
  InfoCardState
> {
  static defaultProps = {
    data: {}
  }

  containerRect: BaseObject<number>
  containerRectOffset: BaseObject<number>
  animationData: BaseObject[] = []

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
    return (
      _isEmpty( this.state.detailData) &&
      request({
        url: API_READ_HUB_TOPIC({ id }),
        parse: res => _get(res, 'data', {})
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
      .step({ duration: 50 })
      .scale(1, 1)
      .step({ duration: 50, delay: 50 })
      .export()

  getPopDownAni = () =>
    Taro.createAnimation({
      transformOrigin: '50% 50%',
      timingFunction: 'ease',
      delay: 0
    })
      .step({ duration: 25 })
      .step({ duration: 25, delay: 25 })
      .export()

  handleLongPress = () => {
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

  handleAnimationEnd = () => {
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

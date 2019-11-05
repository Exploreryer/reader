import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import Card from '@/components/Card'
import _ from 'lodash'
import './InfoCard.scss'
import classNames from 'classnames'
import { getRect } from '@/utils/dom'

interface InfoCardProps {
  title: string
  desc: string
  time: string
  onPreview: () => void
}

interface InfoCardState {
  active: boolean
  containerStyle: Record<string, any>
}

export default class InfoCard extends Taro.Component<InfoCardProps, InfoCardState> {
  containerRect: Record<string, number>

  constructor(props) {
    super(props)
    this.state = {
      active: false,
      containerStyle: {}
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

  handleLongPress = e => {
    Taro.vibrateShort().then(() => {
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
    const { title, desc, time } = this.props
    const { active, containerStyle } = this.state
    const cls = classNames('info-card-container', {
      'info-card-container-active': active
    })
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

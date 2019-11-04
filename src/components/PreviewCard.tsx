import Taro from '@tarojs/taro'
import Card from '@/components/Card'
import classNames from 'classnames'
import request from '@/utils/request'
import { API_READ_HUB_TOPIC } from '@/constants/api'
import { View } from '@tarojs/components'
import { formatDateOrDuring } from '@/utils'
import _ from 'lodash'
import './PreviewCard.scss'

interface PreviewCardProps extends StandardProps, Taro.ComponentClass {
  data: Record<string, any>
  onClose: () => void
  extraProps?: Record<string, any>
}

interface PreviewCardState {}

export default class PreviewCard extends Taro.Component<PreviewCardProps, PreviewCardState> {
  constructor(props) {
    super(props)
  }

  handleClose = e => {
    const { onClose } = this.props
    e.stopPropagation()
    onClose()
  }

  render(): any {
    const { data: { title, createdAt: createTime, summary }, className } = this.props
    const cls = classNames('container', className)

    return (
      <View className={cls}>
        <Card>
          <View className="main" onClick={this.handleClose}>
            <View className="title">{title}</View>
            <View className="time">{formatDateOrDuring(createTime)}</View>
            <View className="summary">{summary}</View>
            {/*<View className="media-report">{summary}</View>*/}
            {/*<View className="relative-event">{summary}</View>*/}
          </View>
        </Card>
      </View>
    )
  }
}

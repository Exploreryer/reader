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
  id?: number | string
  onClose: () => void
  extraProps?: Record<string, any>
}

interface PreviewCardState {
  data: Record<string, any>
}

export default class PreviewCard extends Taro.Component<PreviewCardProps, PreviewCardState> {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  componentDidMount(): void {
    const { id } = this.props
    request({ url: API_READ_HUB_TOPIC({ id }), parse: res => _.get(res, 'data', {}) }).then(
      data => {
        this.setState({ data })
        console.log(data)
        return data
      }
    )
  }

  handleClose = e => {
    const { onClose } = this.props
    e.stopPropagation()
    onClose()
  }

  render(): any {
    const { className } = this.props
    const cls = classNames('container', className)
    const {
      data: { title, createdAt: createTime, summary }
    } = this.state
    return (
      <View className={cls} >
        <Card>
          <View className="main" onClick={this.handleClose} >
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

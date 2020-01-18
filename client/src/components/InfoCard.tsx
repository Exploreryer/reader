import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Card from '@/components/Card'
import _get from 'lodash.get'
import _isEmpty from 'lodash.isempty'
import classNames from 'classnames'
import { formatDateOrDuring, parseFirstSentence } from '@/utils'
import request from '@/utils/request'
import { API_READ_HUB_TOPIC } from '@/constants/api'
import { stylePrefix } from '@/utils/prefix'
import './InfoCard.scss'

const addStylePrefix = stylePrefix('info-card')

interface InfoCardProps {
  data: BaseObject
}

interface InfoCardState {
  active: boolean
  detailData: BaseObject
}

export default class InfoCard extends Taro.Component<
  InfoCardProps,
  InfoCardState
> {
  static defaultProps = {
    data: {}
  }

  constructor(props) {
    super(props)
    this.state = {
      active: false,
      detailData: {}
    }
  }

  componentDidMount(): void {}

  updateDetail = () => {
    const {
      data: { id }
    } = this.props
    return (
      _isEmpty(this.state.detailData) &&
      request({
        url: API_READ_HUB_TOPIC({ id }),
        parse: res => _get(res, 'data', {})
      }).then(detailData => {
        this.setState({ detailData })
        return detailData
      })
    )
  }

  fetch = () => {
    this.setState({
      active: true
    })
  }

  handleClick = () => {
    const { active } = this.state
    const nextActive = !active
    if (nextActive) {
      // 抓取详细数据
      this.updateDetail()
    }
    this.setState({ active: nextActive })
  }

  render(): any {
    const {
      data: { summary, title, createdAt }
    } = this.props
    const {
      active,
      detailData: { summary: detailSummary, createdAt: detailCreatedAt }
    } = this.state
    const time = formatDateOrDuring(createdAt)
    return (
      <Card onClick={this.handleClick} className={classNames('info-card')}>
        <View className={addStylePrefix('title')}>{title}</View>
        <View
          className={classNames(addStylePrefix('description'), {
            [addStylePrefix('description-active')]: detailSummary && active
          })}
        >
          {detailSummary}
        </View>
        <View className={addStylePrefix('time')}>{time}</View>
      </Card>
    )
  }
}

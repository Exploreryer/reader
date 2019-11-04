import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import Card from '@/components/Card'
import _ from 'lodash'
import './InfoCard.scss'

interface InfoCardProps {
  title: string
  desc: string
  time: string
  onPreview: () => void
}

export default class InfoCard extends Taro.Component<InfoCardProps> {
  render(): any {
    const { title, desc, time, onPreview } = this.props
    return (
      <Card onClick={onPreview}>
        <View className="container">
          <View className="title">{title}</View>
          <View className="description">{desc} </View>
          <View className="time">{time}</View>
        </View>
      </Card>
    )
  }
}

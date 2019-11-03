import Taro from '@tarojs/taro'
import {Text, View} from "@tarojs/components";
import Card from "@/components/Card";
import './InfoCard.scss'

interface InfoCardProps {
  title: string
  desc: string
  time: string
}

export default class InfoCard extends Taro.Component<InfoCardProps> {
  render(): any {
    const {title, desc, time} = this.props
    return <Card>
      <View className="container">
        <View className="title">{title}</View>
        <View className="description">
          {desc} </View>
        <View className="time">{time}</View>
      </View>
    </Card>
  }

}

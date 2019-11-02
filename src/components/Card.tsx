import Taro from "@tarojs/taro"
import {View} from '@tarojs/components'
import './Card.scss'


export default class Card extends Taro.Component {

  render(): any {
    const {} = this.props
    return <View className="container">{this.props.children}</View>
  }
}

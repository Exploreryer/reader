import Taro from "@tarojs/taro"
import {View} from '@tarojs/components'
import './Card.scss'
import classNames from 'classnames'

class Card extends Taro.Component {

  render(): any {
    const {className} = this.props
    return <View className={classNames('container', className)}>{this.props.children}</View>
  }
}

export default Card

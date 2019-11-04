import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './Card.scss'
import classNames from 'classnames'

export interface CardProps extends StandardProps {
  onClick?: () => void
}

class Card extends Taro.Component<CardProps> {
  render(): any {
    const { className , onClick} = this.props
    return (
      <View className={classNames('container', className)} onClick={onClick}>
        {this.props.children}
      </View>
    )
  }
}

export default Card

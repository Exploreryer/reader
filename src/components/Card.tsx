import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './Card.scss'
import classNames from 'classnames'

export interface CardProps extends StandardProps {
  onClick?: (e) => void
  onLongPress?: (e) => void
}

class Card extends Taro.Component<CardProps> {

  static externalClasses = ['class-name']

  static defaultProps = {
    onClick: () => {},
    onLongPress: () => {}
  }

  render(): any {
    const { className, onClick, onLongPress } = this.props
    return (
      <View
        className={classNames('container', 'class-name', className)}
        onClick={onClick}
        onLongPress={onLongPress}
      >
        {this.props.children}
      </View>
    )
  }
}

export default Card

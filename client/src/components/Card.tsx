import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './Card.scss'
import classNames from 'classnames'

export interface CardProps extends StandardProps {
  onClick?: (e) => void
  onLongPress?: (e) => void
  onAnimationEnd?: (e) => void
  animation?: object[]
}

class Card extends Taro.Component<CardProps> {

  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    onClick: () => {},
    onLongPress: () => {},
    onAnimationEnd: () => {},
    animation: []
  }

  render(): any {
    const { className, onClick, onLongPress, style, animation, onAnimationEnd } = this.props
    return (
      <View
        className={classNames('card-container', className)}
        onClick={onClick}
        onLongPress={onLongPress}
        onAnimationEnd={onAnimationEnd}
        style={style}
        animation={animation}
      >
        {this.props.children}
      </View>
    )
  }
}

export default Card

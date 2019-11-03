import Taro from '@tarojs/taro'
import {View, Text} from "@tarojs/components";
import Card from "@/components/Card";
import './InfoCard.scss'

export default class InfoCard extends Taro.Component {


  render(): any {


    return <Card>
      <View className="container">
        <View className="title">我是一个标题标题我是一个标题标题我是一个标题标题我是一个标题标题我是一个标题标题</View>
        <Text className="description">
          我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述
        </Text>
      </View>
    </Card>
  }

}

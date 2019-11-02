import Taro from '@tarojs/taro'
import {View} from "@tarojs/components";
import Card from "@/components/Card";
import './InfoCard.scss'

export default class InfoCard extends Taro.Component {


  render(): any {


    return <Card>
      {/*<View className="title">I am title</View>*/}
      {/*<View className="description">*/}
      {/*  I am description*/}
      {/*</View>*/}
    </Card>
  }

}

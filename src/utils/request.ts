import Taro from '@tarojs/taro'

export interface RequestOption {
  url: string
  parse?: <T>(res: object) => T
}

export default <TOutput = any, TInput = RequestOption>(option: RequestOption) => {
  const { parse, ...restOption } = option
  return Taro.request<TOutput, TInput>(restOption).then(res => (parse ? parse<TOutput>(res) : res))
}

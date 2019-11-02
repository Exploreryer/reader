import Taro from '@tarojs/taro'

export interface RequestOption {
  url: string
  onSuccess?: (res: object) => void
  onError?: (err: object) => void
}

export default (option: RequestOption) => {
  const {onSuccess, onError, ...restOption} = option
  return Taro.request(restOption).then(onSuccess).catch(onError)
}

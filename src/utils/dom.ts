import Taro from '@tarojs/taro'

export const getRect = (selector, cb, scope) => {
  let query = Taro.createSelectorQuery()

  if (scope) {
    query = query.in(scope)
  }
  query
    .select(selector)
    .boundingClientRect(cb)
    .exec()
}

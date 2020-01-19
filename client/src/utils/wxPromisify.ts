import promisify from '@/utils/promisify'
import Taro from '@tarojs/taro'

// @ts-ignore
export default promisify<BaseObject, any>({ source: Taro, rejectKey: '', resolveKey: '' })

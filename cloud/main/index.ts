// 云函数入口文件
import cloud, { getWXContext } from 'wx-server-sdk'
cloud.init()

type Context = ReturnType<typeof getWXContext>
// 云函数入口函数
exports.main = async (event: Record<string, any>, context: Context) => {
  return 'hello'
}

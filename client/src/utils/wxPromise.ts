const buildWXPromise = (funcName, params = {}) =>
  new Promise((resolve, reject) => {
    wx[funcName]({
      success: resolve,
      fail: reject,
      ...params
    })
  })

export const auth = (params?: BaseObject) => buildWXPromise('authorize', params)
export const getSetting = (params?: BaseObject) => buildWXPromise('getSetting', params)
export const getUserInfo = (params?: BaseObject) => buildWXPromise('getUserInfo', params)
export const login = (params?: BaseObject) => buildWXPromise('login', params)

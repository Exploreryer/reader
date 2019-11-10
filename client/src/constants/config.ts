export const __DEV__ = process.env.NODE_ENV === 'development'
export const __PROD__ = process.env.NODE_ENV === 'production'
export const CLOUD_ENV_DEV = 'dev-vingeray'
export const CLOUD_ENV_PROD = 'prod'
export const CLOUD_ENV = __DEV__ ? CLOUD_ENV_DEV : CLOUD_ENV_PROD

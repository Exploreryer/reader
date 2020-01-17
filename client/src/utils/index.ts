import _reduce from 'lodash.reduce'
import dayjs  from 'dayjs'
import { FULL_DATE } from '@/constants/date_template'

export const parseFirstSentence = (str = '', separators = ['...', '…']) => {
  let ret = ''

  separators.forEach(sep => {
    if (str.includes(sep)) {
      ret = str.slice(0, str.indexOf(sep))
    }
  })

  return ret
}

type DateType = dayjs.Dayjs | string | number | Date
type FormatDateType = (date: DateType, template?: string) => string
export const formatDate: FormatDateType = (date, template = FULL_DATE) =>
  dayjs(date).format(template)
export const formatDateOrDuring = (date: DateType, template = FULL_DATE) => {
  if (!date) {
    return ''
  }
  // 计算这个时间是不是今天，如果是的话则显示多久以前
  const now = dayjs()
  const diffDay = now.diff(dayjs(date), 'day')
  const diffHour = now.diff(dayjs(date), 'hour')
  const diffMin = now.diff(dayjs(date), 'minute')
  const diffSec = now.diff(dayjs(date), 'second')

  if (!diffDay) {
    if (!diffHour) {
      if (!diffMin) {
        return `${diffSec} 秒以前`
      }
      return `${diffMin} 分钟以前`
    }
    return `${diffHour} 小时以前`
  }

  return formatDate(date, template)
}

export const transformObjectToParams = obj =>
  '?'.concat(_reduce(obj, (ret, value, key) => [...ret, `${key}=${value}`], []).join('&'))

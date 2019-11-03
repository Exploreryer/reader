import _ from 'lodash'
import dayjs, {Dayjs} from "dayjs";
import {FULL_DATE} from "@/constants/date_template";

export const parseFirstSentence = (str = '', separators = ['...', '…']) => {
  let ret = ''

  separators.forEach(sep => {
    if (str.includes(sep)) {
      ret = str.slice(0, str.indexOf(sep))
    }
  })

  return ret;
}

type DateType = Dayjs | string | number | Date
type FormatDateType = (date: DateType, template?: string) => string
export const formatDate: FormatDateType = (date, template = FULL_DATE) => dayjs(date).format(template)
export const formatDateOrDuring = (date: DateType, template = FULL_DATE) => {
  // 计算这个时间是不是今天，如果是的话则显示多久以前
  const now = dayjs()
  return now.isSame(dayjs(date), 'd') ? `${now.diff(dayjs(date), 'hour')} 小时以前` : formatDate(date, template)
}


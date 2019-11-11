import _partial from 'lodash/partial'
import _isEmpty from 'lodash/isEmpty'

const prefix = (
  separator: string,
  prefix: string,
  content: string | string[]
): string => {
  if (_isEmpty(content)) {
    return ''
  }
  content = typeof content === 'string' ? [content] : content
  return [prefix, ...content].join(separator)
}

export const stylePrefix = prefixClass => _partial(prefix, '-', prefixClass)
export const localePrefix = locale => _partial(prefix, '.', locale)

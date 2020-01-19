type TSource<TOptions, TReturn> = BaseObject<(options: TOptions) => Promise<TReturn>>

export interface PromisifyOptions<TSource> {
  source: TSource
  resolveKey: string
  rejectKey: string
}

export default <TFuncOptions, TFuncReturn>({
  source,
  resolveKey,
  rejectKey
}: PromisifyOptions<TSource<TFuncOptions, TFuncReturn>>) => {
  const dest: TSource<TFuncOptions, TFuncReturn> = {}
  for (let propName in source) {
    if (source.hasOwnProperty(propName)) {
      dest[propName] = options =>
        new Promise((resolve, reject) =>
          source[propName]({
            [resolveKey]: resolve,
            [rejectKey]: reject,
            ...options
          })
        )
    }
  }
  return dest
}

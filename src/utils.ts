import { Dictionary } from './types/utils'

export function mapValues <T, U> (
  obj: Dictionary<T>,
  f: (t: T, key: string) => U
): Dictionary<U> {
  const res: Dictionary<U> = {}
  Object.keys(obj).forEach(key => {
    res[key] = f(obj[key], key)
  })
  return res
}

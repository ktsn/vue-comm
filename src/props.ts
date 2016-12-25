import { PropOptions } from 'vue'
import { Class } from './types/utils'

export interface PropChain<T> {
  readonly get: PropOptions
  readonly optional: PropChain<T | null | undefined>

  validator (validator: (value: T) => boolean): PropChain<T>
  default (value: T | (() => T)): PropChain<T>

  or (x: NumberConstructor): PropChain<T | number>
  or (x: StringConstructor): PropChain<T | string>
  or (x: BooleanConstructor): PropChain<T | boolean>
  or <U>(x: Class<U>): PropChain<T | U>
}

class PropChainImpl implements PropChain<{}> {
  constructor (private options: PropOptions & { type: any[] }) {}

  get get (): PropOptions {
    return this.options
  }

  get optional () {
    this.options.required = false
    return this
  }


  validator (validator: (value: {}) => boolean) {
    this.options.validator = validator
    return this
  }


  default (value: {} | (() => {})) {
    this.options.default = value
    return this
  }

  or (type: any) {
    this.options.type.push(type)
    return this
  }
}

export function $ (x: NumberConstructor): PropChain<number>
export function $ (x: StringConstructor): PropChain<string>
export function $ (x: BooleanConstructor): PropChain<boolean>
export function $ <T>(x: Class<T>): PropChain<T>
export function $ (type: any): any {
  return new PropChainImpl({
    type: [type],
    required: true
  }) as PropChain<{}>
}

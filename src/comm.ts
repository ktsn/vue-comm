import { PropOptions } from 'vue'
import { Vue } from './vue'
import { PropChain } from './props'
import { mapValues } from './utils'
import { Class, Dictionary } from './types/utils'

export interface CommChain<P, E> {
  readonly Component: Class<Vue<P, E>>

  props <PN>(
    chain?: { readonly [K in keyof PN]: PropChain<PN[K]> }
  ): CommChain<PN, E>

  emits <EN>(): CommChain <P, EN>
}

class CommChainImpl implements CommChain<{}, {}> {
  constructor (private propOptionss: Dictionary<PropOptions>) {}

  get Component () {
    return Vue.extend({ props: this.propOptionss }) as any
  }

  props (chain = {}) {
    const ps: any = chain || {}
    const props = mapValues(ps, (p: any) => p.get)
    return new CommChainImpl(props)
  }

  emits () {
    return this
  }
}

export const comm = new CommChainImpl({}) as CommChain<{}, {}>

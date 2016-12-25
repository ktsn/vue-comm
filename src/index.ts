import './types/vnode-helper'

import { ComponentOptions, CreateElement } from 'vue'
import Component from 'vue-class-component'
import { Vue } from './vue'
import { Class, Dictionary } from './types/utils'

import {
  createHelper,
  apply,
  helpers,
  VNodeHelper
} from 'vue-vnode-helper'

export { createDecorator } from 'vue-class-component'
export { apply } from 'vue-vnode-helper'
export { $ } from './props'
export { comm } from './comm'

export type Helpers = Dictionary<VNodeHelper<any, any>>

export function component <P, E>(
  Class: Class<Vue<P, E>>,
  options: ComponentOptions<Vue<P, E>> = {}
): VNodeHelper<P, E> {

  const render = Class.prototype.render
  Class.prototype.render = function (this: Vue<P, E>, h: CreateElement) {
    return apply(h, render.call(this, helpers))
  }

  const Comp = Component(options)(Class as any)
  return createHelper(Comp)
}

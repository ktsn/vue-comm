import './types/vnode-helper'

import {
  ComponentOptions,
  CreateElement,
  RenderContext
} from 'vue'

import _Component from 'vue-class-component'
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

export function Component <P, E, V extends Vue<P, E>> (
  options: ComponentOptions<V>
): <R extends Class<Vue<P, E>>> (target: R) => R
export function Component <P, E, V extends Class<Vue<P, E>>> (
  target: V
): V
export function Component (
  optionOrTarget: ComponentOptions<Vue<{}, {}>> | Class<Vue<{}, {}>>
): any {
  if (typeof optionOrTarget === 'function') {
    patchRenderFunction(optionOrTarget)
    return _Component(optionOrTarget)
  }

  return (target: Class<Vue<{}, {}>>) => {
    patchRenderFunction(target)
    return _Component(optionOrTarget)(target as typeof Vue)
  }
}

export const helper: <P, E> (Class: Class<Vue<P, E>>) => VNodeHelper<P, E> = createHelper

function patchRenderFunction (Class: Class<Vue<{}, {}>>): void {
  const render = Class.prototype.render
  Class.prototype.render = function (
    this: Vue<any, any>,
    h: CreateElement,
    ctx: RenderContext | undefined
  ) {
    return apply(h, render.call(this, helpers, ctx))
  }
}

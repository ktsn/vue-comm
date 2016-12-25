import _Vue = require('vue')

export declare class Vue<P, E> extends _Vue {
  $props: P
  _emits: E
}
exports.Vue = _Vue
exports.Vue.mixin({
  beforeCreate (this: Vue<any, any>) {
    this.$props = this
  }
})

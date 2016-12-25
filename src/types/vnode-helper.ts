import { Vue } from '../vue'
import { Class } from './utils'

declare module 'vue-vnode-helper/lib/declarations' {
  interface CreateVNodeHelper {
    <P, E>(component: Class<Vue<P, E>>): VNodeHelper<P, E>
  }
}

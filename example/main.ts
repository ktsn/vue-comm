import Vue = require('vue')
import { apply } from '../'
import { app } from './components/app'

new Vue({
  el: '#app',
  render: h => apply(h, app()) as Vue.VNode
})

import { Helpers, component, comm } from '../'
import { counter } from './counter'

class App extends comm.Component {
  count: number = 0

  onInput (value: number) {
    this.count = value
  }

  render ({ h1, div }: Helpers) {
    return div('.app', [
      h1('.app-title', 'foobar Example'),
      counter({
        props: { value: this.count },
        on: { input: this.onInput }
      })
    ])
  }
}

export const app = component(App)

import { Helpers, Component, helper, comm } from '../../'
import { counter } from './counter'

@Component
class App extends comm.Comm {
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

export const app = helper(App)

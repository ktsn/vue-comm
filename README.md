# vue-typed-component

This project is an experiment to achieve type safety on Vue.js. The API is unstable and I cannot say that this can be used on actual applications.

## Example

The following is an example of creating a counter component.

```ts
import {
  // Decorator for defining the Vue component
  Component,

  // Function for creating a render helper for the component
  helper,

  // Helpers for defining props and events of the component
  comm,
  $,

  // Type having builtin render helpers
  Helpers
} from 'vue-typed-component'

const { Comm } = comm
  // Define prop types by using `$` helper
  // `$` helper has `.or`, `.optional`, `.validate` method chain
  //
  // e.g.
  // someProp: $(Number).or(String).optional
  //   -> someProp: number | string | null | undefined
  .props({
    value: $(Number)
  })
  // Define event handlers' type as type parameter
  .emits<{
    input (value: number): void
  }>()

// `Component` decorator can receive component options object
// as same as `vue-class-component`
// In addition, you can inherit props and events types
// by extending `Comm` that is made as above
@Component
class Counter extends Comm {
  onIncrement () {
    // Defined props are available on `$props`
    this.$emit('input', this.$props.value + 1)
  }

  onDecrement () {
    this.$emit('input', this.$props.value - 1)
  }

  // The 1st argument of `render` will receive render helpers
  // for all HTML5 elements
  // They have the same API as vue-vnode-helper
  render ({ div, button, output }: Helpers) {
    return div('.counter', [
      button('.counter-button', { on: { click: this.onDecrement }}, '-'),
      output('.counter-output', this.$props.value),
      button('.counter-button', { on: { click: this.onIncrement }}, '+')
    ])
  }
}

// Make a helper function for the component.
// Can be used in a render function of other component.
export const counter = helper(Counter)
```

The component helper recognize the types of props and events. That means we achieve type safe components communication.

```ts
render ({ div }: Helpers) {
  return div('.app', [
    // Counter component helper
    counter({
      props: {
        // This should be type checked
        // If you pass non-number type, the compiler print an error
        value: 42
      },
      on: {
        // The property of `on` is also type chacked as same as `props`
        input: value => console.log(value)
      }
    })
  ])
}
```

## License

MIT

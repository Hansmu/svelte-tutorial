# Svelte.js tutorial

## React similarities
If a primitive value changes or a reference to an object changes only then does a component update due to a value change. So you can't just set a property on an object without cloning it and expect it to update the UI.

When handling arrays, and the elements can appear and disappear, you'll need unique identifiers - keys. It's an optimization, and helps to avoid bugs.

Passing functions is done by reference with regular JS syntax. Can create anonymous functions inline as well.

## Basic Syntax
Has similar syntax to React.

To output a variable, you have single curly braces.
```svelte
<h1>Hello {name}</h1>
```

To add event listeners, you prepend them with `on:`
```svelte
<button on:click={increment}>Increment</button>
```

Reactive variables can be defined using labeled statements.
Labeled statements are things that exist in vanilla JS as well. 
It can be used to jump to it in loops.

In vanilla JS, it would be:
```js
let str = '';

someLabelHere: for (let i = 0; i < 5; i++) {
  if (i === 1) {
    continue someLabelHere;
  }
  str = str + i;
}

console.log(str);
```

In Svelte, the statements are prepended with a `$` sign.
The code can contain whatever statement you want.
```svelte
$: uppercaseName = name.toUpperCase();
$: console.log('Uppered the name', uppercaseName);
$: if (name === 'Bobbo') {
    console.log('Pretty old');
}
$: {
    console.log('Run wild with your imagination, but have a changing variable here.', age)
}
```

The styles that you add into Svelte components are scoped to that component.

It also automatically removes unused styles when compiling.

If you want Svelte to parse some input as HTML, then you can add a `@html` tag.
Obviously shouldn't do it, but in case it's needed.
```svelte
<p>{@html description}</p>
```

## Block Statements

Block statements start with a `#` in Svelte. They are used for `if` conditions, for example. The end is marked with `{/...}`
```svelte
{#if potassiumLevels > 10}
  <div>Critical levels!</div>
{/if}
```

With an if condition, you can add `else` and `else if` with a colon
```svelte
{#if val === 'valOne'}
  <span>A value</span>
{:else if val === 'valTwo'}
  <span>Another value</span>
{:else}
    <span>Default</span>
{/if}
```

For an array, you can use `each`. Index can be accessed using a comma after the element identifier.
Zero based as usual.
```svelte
{#each someArrayThatWeHave as aliasForSingleElement, theCurrentIterationIndexHere}
  <span>{theCurrentIterationIndexHere} - {aliasForSingleElement}</span>
{/each}
```

An array also has a special `:else` case that you can do.
This means that it'll run when the array is empty.
```svelte
{#each someArrayThatWeHave as aliasForSingleElement}
  <span>{aliasForSingleElement}</span>
{:else}
  <strong>No content in this array!</strong>
{/each}
```

To add unique keys to arrays, you can do so using parentheses appended to the each statement. In the example, it's `(contact.id)`:
```svelte
{#each createdContacts as contact, i (contact.id)}

{/each}
```

## Events
You can add modifiers to events.

A modifier is added using the pipe (``|``) character followed by a modifier.

For example, you can use `once` to fire an event only once.
```svelte
<button>on:click|once={clickFunc}</button>
```

Two other common things are ``preventDefault``, and ``stopPropagation`` to perform the common tasks of preventing default and stopping propagation.

Events from components can be propagated using similar syntax to adding an event handler, except you omit the handler.

The below example would propagate the event. If the consumer of this component would add an on click listener, then it'd catch what is being omitted by this event.
```svelte
<button on:click>Button</button>
```

In Svelte, you can also add custom events being emitted.

For that, you have the `createEventDispatcher` function from the Svelte library.
```svelte
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

dispatch('the-custom-event-name', 'some data for the custom event');
```

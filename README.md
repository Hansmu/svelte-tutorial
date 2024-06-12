# Svelte.js tutorial

## React similarities
If a primitive value changes or a reference to an object changes only then does a component update due to a value change. So you can't just set a property on an object without cloning it and expect it to update the UI.

When handling arrays, and the elements can appear and disappear, you'll need unique identifiers - keys. It's an optimization, and helps to avoid bugs.

Passing functions is done by reference with regular JS syntax. Can create anonymous functions inline as well.

You can spread onto the props for a component like you do in React.
```svelte
<CustomComponent {...customObject} />
```

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

## Child components - slots

In order to provide child components to another component, you can use something called slots.

Slots aren't a Svelte invention, it's used in web components.

You can have a default slot with no name, and then the rest named.
```svelte
<slot />

<slot name="another-slot"/>
```

To target the slot, you can add `slot="another-slot"` to a child component.

```svelte
<SomeComponent>
  <div slot="another-slot">Insert into specific slot</div>
</SomeComponent>
```

To give the slots a default, then you add some code as a child to it.
```svelte
<slot>
  <div>Default data shown</div>
</slot>
```

Default slot props can be provided to the default slot and used in the default slot. Named slots cannot be used.
```svelte
<slot {hovering} />
```

```svelte
<AnotherComponent
    let:hovering={active}
>
    <div>{active}</div>
</AnotherComponent>
```

## Component lifecycle

You have a bunch of different points that a component passes through during its lifecycle.

These different points can be used for different purposes.

### On creation
| Method              | When                                                                          | Usage                                                         |
|---------------------|-------------------------------------------------------------------------------|---------------------------------------------------------------|
| `<script>` executes | When the component gets used. When it is rendered somewhere in the DOM.       | Basic initialization work like initializing values.           |
| onMount()           | When the component gets mounted.                                              | Used for more complex initialization work like fetching data. |
| onDestroy()         | When the component gets unmounted, for example an if-block condition changed. | Any cleanup work for the component.                           |

### On update

`tick()` is a bit more complicated so a slightly longer explanation is needed.

Svelte batches DOM updates for efficiency. When state changes, Svelte doesn't immediately update the DOM; instead, it schedules an update.

The `tick()` method allows you to wait for these scheduled updates to complete.

A good example of a use case for `tick()` would be operating on text in a text area.

Imagine that you had a shortcut, which uppercased the selected text.
1. You highlight the text
2. You press the button and the selection becomes uppercased
3. The highlighted area remains highlighted

Now point 3 - highlighted area remaining is the issue.
When you update the text, then that leads to a DOM update, which means the highlighted area is dropped.

Whatever you write in your listener function would be executed synchronously, and then after the function has finished, then would a DOM update trigger because the reactive value was updated.

So if you're trying to keep the area highlighted with the logic that you have in the event listener, then you'll fail, because the DOM update removes the highlight.

So, what you'll need is the `tick()` lifecycle method. After the DOM update happens, then will you want to trigger your logic of keeping the text highlight.

You might also consider the `afterUpdate()` method, but that'd be outside the method body.

`tick()`, however, can be called inside the method body.

```js
function transform(event) {
    const { selectionStart, selectionEnd } = event.target;
    
    text = uppercaseSelection(event);
    
    tick().then(() => {
        setHighlightedArea(event, { selectionStart, selectionEnd });
    });
}
```

| Method         | When                                  | Usage                                                                                                          |
|----------------|---------------------------------------|----------------------------------------------------------------------------------------------------------------|
| beforeUpdate() | Right before the real DOM is touched. | Save DOM state before Svelte updates it.                                                                       |
| afterUpdate()  | After the update has finished.        | Manually update DOM/view after Svelte update. Usually not needed. A valid example would be scrolling the view. |
| tick()         | When batched DOM updates finish.      | Await Svelte's DOM update.                                                                                     |

### Validation

There is no built-in validation in Svelte.
You'll want to build your own or pull in a 3rd party library.
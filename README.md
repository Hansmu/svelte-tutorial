# Svelte.js tutorial

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
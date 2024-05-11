<script lang="ts">
  // When you're importing another component, then the component will be under the default import
  // Same as React, you're going to want to name them in PascalCase, because that's how it differentiates between custom and regular tags
  import ContactCard from './ContactCard.svelte';

  // When you're adding `export` to name, this means that the variable can be set from outside of the component.
	export let name: string = 'John'; 
	export let title: string = 'Pirate'; 
	export let description: string = 'Jolly fellow'; 

  // Notice how a prop has been set for this as well in the parent file.
  // But since it is not exported, then it cannot be initialized by them.
  let age = 30;

  // In this example, we're using this variable in a single place.
  // It becomes useful, when you have re-use for it.
  $: uppercaseName = name.toUpperCase();
  // You can, however, run whatever bit of code you want with the reactive statement.
  $: {
    console.log('Run wild with your imagination, but have a changing variable here.', age)
  }

  // Notice how this kind of thing doesn't get recalculated on each render, though.
  // And compare it with the reactive variable above.
  let agePlusOne = age + 1;

  function incrementAge() {
    age++;
  }

  function onNameChange(event: any) {
      name = event.target!.value;
  }
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>Hello {name}, my age is {age}!</h1>
<h1>Uppercased name, however {uppercaseName}</h1>
<h1>Static number here after first render {agePlusOne}</h1>
<!-- To add event listeners, you can prepend it with a `on:` -->
<button on:click={incrementAge}>Increment age</button>
<!-- If you add just the `value` setting, then the data is unidirectional. -->
<!-- If you want it to be bidirectional, then you need to listen for input. -->
<!-- <input type="text" value={name} on:input={onNameChange} /> -->
<!-- There is a shorter way of writing it, though -->
<input type="text" bind:value={name} />
<input type="text" bind:value={title} />
<input type="text" bind:value={description} />

<ContactCard userName={name} description={description} jobTitle={title}/>
<script lang="ts">
    // You can bind to whatever value that you want, if it's exported, then you can bind
    export let chosenOption = 1;
</script>

<button disabled={chosenOption === 1} on:click={() => (chosenOption = 1)}>Option 1</button>
<button disabled={chosenOption === 2} on:click={() => (chosenOption = 2)}>Option 2</button>
<script>
    import { createEventDispatcher } from 'svelte';

    export let valueOne;
    // To make a prop optional, you need to give it a default value
    export let valueThree = undefined;

    const dispatch = createEventDispatcher();

    function customEventDispatch() {
        // The first parameter is the custom event that we omit
        // Second parameter is any data that should go with it.
        // Doesn't have to be an object, can be any data.
        dispatch(
            'custom-button-event',
            {
                id: 'something-something'
            },
        );
    }

    let hovering = false;

    function enter() {
        hovering = true;
    }

    function leave() {
        hovering = false;
    }
</script>

<div>{valueOne}</div>
{#if valueThree}
    <div>{valueThree}</div>
{/if}

<slot name="targeted-slot"/>

<button on:click>One button</button>
<button on:click>Two button</button>
<button on:click={customEventDispatch}>Custom button event</button>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:mouseenter={enter} on:mouseleave={leave}>
	<slot {hovering} />
</div>

<slot name="unprovided-slot-example">
    <div>
        Since nothing was provided for this slot, then this is the default info that is shown.
    </div>
</slot>

<slot name="slot-with-props" />
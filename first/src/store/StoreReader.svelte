<script lang="ts">
    import { writableStoreExample, otherWritableStoreExample } from './store';
    import {onDestroy} from "svelte";
    import {get} from "svelte/store";

    let storeNumber: number = 0;

    let storedVal: number = 0;

    $: {
        if (storedVal === 125) {

        }
    }

    // Each time you set up a subscription, you need to also unsubscribe
    // If this element gets unmounted, then the subscription will still live on
    // The subscribe method will return an unsubscribe method
    const unsubscribe = writableStoreExample.subscribe(
        val => (storeNumber = val)
    );

    onDestroy(() => {
        unsubscribe();
    });

    const getCurrentStoreValue = () => {
        // This is one way to get the store value without a subscription, you just call a `get` on it
        console.log('Getting the store value without subscription', get(writableStoreExample));
    };
</script>

<div>
    The number in the store: {storeNumber}
</div>

<div>
    The automatically subscribed store: { $otherWritableStoreExample }
</div>

<button on:click={getCurrentStoreValue}>
    Get current store value
</button>
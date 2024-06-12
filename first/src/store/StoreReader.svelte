<script lang="ts">
    import { writableStoreExample, readableStoreExample } from './store';
    import {onDestroy} from "svelte";
    import {get} from "svelte/store";

    let storeNumber: number = 0;

    let storedVal: number = 0;

    let lastCheckedStoreValue = 0;

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
        const storeValue = get(writableStoreExample);
        console.log('Getting the store value without subscription', storeValue);

        lastCheckedStoreValue = storeValue;
    };
</script>

<div>
    The number in the store: {storeNumber}
</div>

<div>
    The automatically subscribed store: { $readableStoreExample }
</div>

<button on:click={getCurrentStoreValue}>
    Get current store value {lastCheckedStoreValue}
</button>
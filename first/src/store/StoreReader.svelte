<script lang="ts">
    import { writableStoreExample } from './store';
    import {onDestroy} from "svelte";

    let storeNumber: number = 0;

    // Each time you set up a subscription, you need to also unsubscribe
    // If this element gets unmounted, then the subscription will still live on
    // The subscribe method will return an unsubscribe method
    const unsubscribe = writableStoreExample.subscribe(
        val => (storeNumber = val)
    );

    onDestroy(() => {
        unsubscribe();
    });
</script>

<div>
    The number in the store: {storeNumber}
</div>


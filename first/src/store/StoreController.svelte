<script lang="ts">
    import { writableStoreExample } from './store';

    const changeStoreNumber = (changeBy: number) => {
        writableStoreExample.update((previousValue) => previousValue + changeBy);
    };

    const resetTheStoreValue = () => {
        writableStoreExample.set(123);
    };
</script>

<button on:click={resetTheStoreValue}>
    Reset value
</button>

<button on:click={() => changeStoreNumber(1)}>
    Increment value
</button>

<button on:click={() => changeStoreNumber(-1)}>
    Decrement value
</button>
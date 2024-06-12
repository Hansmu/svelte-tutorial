<script lang="ts">
    import { writableStoreExample } from './store';

    let storeNumber: number = 0;

    writableStoreExample.subscribe(
        val => (storeNumber = val)
    )
</script>

<div>
    The number in the store: {storeNumber}
</div>


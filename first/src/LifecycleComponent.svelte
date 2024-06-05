<script lang="ts">
    import {onMount, onDestroy, beforeUpdate, afterUpdate} from "svelte";

    console.log('LifecycleComponent: Script executed', Date.now());

    onMount(() => {
        console.log('LifecycleComponent: On mount', Date.now());
    });

    onDestroy(() => {
        console.log('LifecycleComponent: On destroy', Date.now());
    });

    beforeUpdate(() => {
        console.log('LifecycleComponent: Before update is triggered', Date.now());
    });

    afterUpdate(() => {
        console.log('LifecycleComponent: AFTER update is triggered', Date.now());
    });

    let variable = false;

    const toggleVariable = () => {
        variable = !variable;
    };
</script>

<div>
    <h3>Lifecycle Component</h3>
    <button on:click={toggleVariable}>
        Toggle stateful variable - {variable}
    </button>
</div>
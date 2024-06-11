<script lang="ts">
    import AnotherComponent from "./AnotherComponent.svelte";

    // In order to add props, you need to add exported values
    export let userName;
    export let jobTitle;
    export let description;

    const spreadProps = {
        valueOne: 'Potassium',
        valueTwo: 'Fish',
        random: 'Fandom'
    };
</script>

<!-- style tags are scoped in Svelte -->
<style>
    div {
        color: midnightblue;
    }

    .some-class {
        color: yellow;
    }
</style>

<div>
    <!-- Conditional class name application -->
    <div class:some-class={userName === 'Banana'}>
        {userName}        
    </div>    

    {#if jobTitle === 'Banana'}
        <div>
            Passionate about providing potassium
        </div>
    {:else if jobTitle === 'Ape'}
        <div>
            Passionate about consuming potassium
        </div>
    {:else}
        <div>
            {jobTitle}
        </div>
    {/if}

    {#each description.split(' ') as descriptionPart }
        <div>
            {descriptionPart}
        </div>
    {/each}

    <hr />
    <!-- When a custom event is emitted, then the data that is added to it can be found under `detail` -->
    <!-- Default slot props can be used only on the default slot.
            You can do so using the let:<variable-name>={localReferenceName} syntax.
    -->
    <AnotherComponent
        {...spreadProps}
        on:click={e => console.log(e.target.innerText)}
        on:custom-button-event={(e) => console.log('Custom event data', e.detail)}
        let:hovering={active}
    >
        <div>{active} - Default slot data here</div>
        <div slot="targeted-slot">Targeted a specific slot here</div>

        <div slot="slot-with-props">from the slot prop</div>
    </AnotherComponent>
</div>
<script lang="ts">
    // In order to add props, you need to add exported values
    export let userName;
    export let jobTitle;
    export let description;
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
</div>
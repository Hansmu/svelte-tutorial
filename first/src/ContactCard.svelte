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

    <div>
        {jobTitle}
    </div>

    <div>
        {description}
    </div>
</div>
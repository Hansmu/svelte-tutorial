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
</style>

<div>
    <div>
        {userName}        
    </div>    

    <div>
        {jobTitle}
    </div>

    <div>
        {description}
    </div>
</div>
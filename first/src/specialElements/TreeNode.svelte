<script context="module" lang="ts">
    export type Node = {
        name: string;
        isParent: boolean;
        children?: Node[];
    };
</script>

<script lang="ts">
    export let member: Node;
</script>

<style>
    div {
        margin-left: 1rem;
    }
</style>

<div>
    <p>{member.name}</p>
    {#if member.isParent}
        {#each (member.children || []) as child}
            <!-- svelte:self can be used to do recursive rendering -->
            <!-- to render another instance of the component itself from itself, you can use svelte:self -->
            <svelte:self member={child} />
        {/each}
    {/if}
</div>

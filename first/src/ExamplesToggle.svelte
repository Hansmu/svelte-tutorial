<script context="module" lang="ts">
    export enum Example {
        BASICS = 'Basics',
        FORM_BINDING = 'Form binding',
        STORE = 'Store',
        ANIMATIONS = 'Animations',
        FETCHING = 'Fetching data',
        SPECIAL_ELEMENTS = 'Special elements',
    }
</script>

<script lang="ts">
    export let chosenOption: Example;
</script>

<label for="example">Select example to display:</label>

<select name="example" id="example" bind:value={chosenOption}>
    {#each Object.values(Example) as value}
        <option value={value}>
            {value}
        </option>
    {/each}
</select>
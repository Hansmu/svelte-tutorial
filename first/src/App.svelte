<script lang="ts">
    import ExamplesToggle, {Example} from "./ExamplesToggle.svelte";
    import Basics from "./basics/Basics.svelte";
    import FormBindings from "./formBindings/FormBindings.svelte";
    import StoreExample from "./store/StoreExample.svelte";
    import Animations from "./animations/AnimationsExample.svelte";
    import FetchingData from "./fetching/FetchingData.svelte";
    import SpecialElements from "./specialElements/SpecialElements.svelte";

    let selectedOption: Example = Example.BASICS;

    $: {
        console.log(selectedOption)
    }
</script>

<ExamplesToggle bind:chosenOption={selectedOption} />

<div>
    {#if selectedOption === Example.BASICS}
        <Basics />
    {/if}

    {#if selectedOption === Example.FORM_BINDING}
        <FormBindings />
    {/if}

    {#if selectedOption === Example.STORE}
        <StoreExample />
    {/if}

    {#if selectedOption === Example.ANIMATIONS}
        <Animations />
    {/if}

    {#if selectedOption === Example.FETCHING}
        <FetchingData />
    {/if}

    {#if selectedOption === Example.SPECIAL_ELEMENTS}
        <SpecialElements />
    {/if}

</div>
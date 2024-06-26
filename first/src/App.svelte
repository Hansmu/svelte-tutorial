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
        console.log(selectedOption);
    }

    const renderedComponent: Record<Example, ConstructorOfATypedSvelteComponent> = {
        [Example.BASICS]: Basics,
        [Example.FORM_BINDING]: FormBindings,
        [Example.STORE]: StoreExample,
        [Example.ANIMATIONS]: Animations,
        [Example.FETCHING]: FetchingData,
        [Example.SPECIAL_ELEMENTS]: SpecialElements,
    };
</script>

<!-- To access the head of the DOM document, you can use the svelte:head tag. -->
<svelte:head>
    <title>{selectedOption}</title>
</svelte:head>

<ExamplesToggle bind:chosenOption={selectedOption} />

<div>
    <!-- In order to dynamically set a component to be rendered, you can use the svelte:component component -->
    <!-- Can also add props to it as you normally would and then they get forwarded to the components -->
    <svelte:component this={renderedComponent[selectedOption]} />
</div>
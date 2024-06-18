<script lang="ts">
    // Tweened is a store that allows for animating values
    // Basically it's just a reactive store that constantly updates the values until it reaches the designated value
    // So in our example it starts from 0 and using the provided configuration, it'll calculate values all the way up to the value that it has now been set to (0.5)
    import { tweened } from 'svelte/motion';
    // For different easings, you can import them from this Svelte package
    import { cubicIn } from 'svelte/easing';

    // Spring is another animation library, but this one takes physics into account and has different kinds of configuration options
    import { spring } from "svelte/motion";

    // Transition effects can be gained from here, but they're utilized a little bit differently
    // These bind to a directive
    import { slide, fly, fade, scale } from 'svelte/transition';

    const progress = tweened(0);

    let elementRef: HTMLInputElement;
    let isListToggled = true;

    const springStore = spring({
        rotation: 10,
        dx: 0
    }, {
        stiffness: 0.05,
        damping: 0.9,
        precision: 0.001
    });

    // If you react to the store, you'll see that the store value changes multiple times, all the way until it has reached its designated value.
    // $: console.log($progress);

    setTimeout(() => {
        progress.set(0.5, {
            // There are a couple of options you can provide to configure the animation more specifically
            delay: 0,
            duration: 700,
            easing: cubicIn
            // Interpolate would be needed when you're animating something that Svelte cannot figure out how to animate
            // And you'd need your own animation function for it
            // interpolate
        });
    }, 1500);

    const toggleCardIntoView = () => {
        if ($springStore.dx) {
            springStore.set({
                dx: 0,
                rotation: 10,
            });
        } else {
            springStore.set({
                dx: 1200,
                rotation: 120,
            });
        }
    };

    const toggleList = () => {
        isListToggled = !isListToggled;
    };

    // When logging out the spring store values, the same thing can be seen, it's simply a reactive store, that is constantly changing its values
    // From the starting value to the final value
    // $: console.log($springStore);

    let elements: string[] = [];

    const addElement = () => {
        elements = [...elements, elementRef.value]
    };
</script>

<style>
    .card {
        position: absolute;
        width: 20rem;
        height: 30rem;
        background: #ccc;
        left: calc(50% - 10rem);
        top: calc(50vh - 15rem);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        border-radius: 5px;
    }

    .element {
        width: 5rem;
        height: 5rem;
        background: #ccc;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        border-radius: 5px;
    }

    .elements-container {
        display: flex;
    }
</style>

<h2>Motion, Transitions & Animations</h2>

<progress value={$progress}/>

<input bind:this={elementRef}/>
<button on:click={addElement}>
    Add element
</button>

{#if isListToggled}
    <div class="elements-container">
            {#each elements as element}
                <!-- So you've got all of these different transition methods and you can configure all of them with certain parameters as well -->
                <!-- You need to have the specific ones imported as well -->
                <div transition:fade class="element">
                    {element}
                </div>
                <!-- You have a couple of options to listen to the animation lifecycle as well -->
                <!-- Introstart/introend for when the entrance animation starts/ends -->
                <!-- Outrostart/outroend for when the exit animation starts/ends -->
                <div
                    transition:scale class="element"
                    on:introstart={() => console.log('Adding the element starts')}
                    on:introend={() => console.log('Adding the element ends')}
                    on:outrostart={() => console.log('Removing the element starts')}
                    on:outroend={() => console.log('Removing the element ends')}
                >
                    {element}
                </div>
                <div transition:fly={{ duration: 400, easing: cubicIn, y: 300, x: -300 }} class="element">
                    {element}
                </div>
                <div transition:slide class="element">
                    {element}
                </div>
            {/each}
    </div>
{/if}

<button on:click={toggleCardIntoView}>
    Toggle card
</button>
<button on:click={toggleList}>
    Toggle list
</button>

<div class="card" style="transform: rotateZ({$springStore.rotation}deg) translateX({$springStore.dx}px)" />
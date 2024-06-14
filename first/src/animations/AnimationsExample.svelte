<script lang="ts">
    // Tweened is a store that allows for animating values
    // Basically it's just a reactive store that constantly updates the values until it reaches the designated value
    // So in our example it starts from 0 and using the provided configuration, it'll calculate values all the way up to the value that it has now been set to (0.5)
    import { tweened } from 'svelte/motion';
    // For different easings, you can import them from this Svelte package
    import { cubicIn } from 'svelte/easing';

    // Spring is another animation library, but this one takes physics into account and has different kinds of configuration options
    import { spring } from "svelte/motion";

    const progress = tweened(0);

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

    // When logging out the spring store values, the same thing can be seen, it's simply a reactive store, that is constantly changing its values
    // From the starting value to the final value
    // $: console.log($springStore);
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
</style>

<h2>Motion, Transitions & Animations</h2>

<progress value={$progress}/>

<button on:click={toggleCardIntoView}>
    Toggle card
</button>

<div class="card" style="transform: rotateZ({$springStore.rotation}deg) translateX({$springStore.dx}px)" />
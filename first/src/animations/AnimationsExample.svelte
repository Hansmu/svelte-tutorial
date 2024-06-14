<script lang="ts">
    // Tweened is a store that allows for animating values
    // Basically it's just a reactive store that constantly updates the values until it reaches the designated value
    // So in our example it starts from 0 and using the provided configuration, it'll calculate values all the way up to the value that it has now been set to (0.5)
    import { tweened } from 'svelte/motion';
    // For different easings, you can import them from this Svelte package
    import { cubicIn } from 'svelte/easing';

    const progress = tweened(0);

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
</script>

<h2>Motion, Transitions & Animations</h2>

<progress value={$progress}/>
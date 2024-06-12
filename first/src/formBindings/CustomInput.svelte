<script lang="ts">
    export let val: string;

    export const noOpFunction = () => {
        console.log('No op fn in CustomInput');
    };
</script>

<input type="text" bind:value={val}>
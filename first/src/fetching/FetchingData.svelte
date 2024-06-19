<script lang="ts">
    import {onMount} from "svelte";
    import {userStore} from "./userStore";

    // const getUsers = fetch('https://jsonplaceholder.typicode.com/users', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     }
    // }).then(res => {
    //     if (!res.ok) {
    //         throw new Error('Unsuccessful response');
    //     }
    //
    //     return res.json();
    // }).catch(err => {
    //     console.log(err);
    // });

    onMount(() => {
        userStore.queryUsers();
    });
</script>

<h2>Fetching data example</h2>

<!-- Svelte has its own await block to handle requests -->
<!--{#await getUsers}-->
<!--    <div>-->
<!--        Loading...-->
<!--    </div>-->
<!--{:then users}-->
<!--    {#each users as user (user.id)}-->
<!--        <div>-->
<!--            {user.name}-->
<!--        </div>-->
<!--    {/each}-->
<!--{:catch error}-->
<!--    <p>{error.message}</p>-->
<!--{/await}-->

{#if $userStore.isLoading}
    <div>
        Loading...
    </div>
{:else}
    {#each $userStore.users as user (user.id)}
        <div>
            {user.name}
        </div>
    {/each}
{/if}

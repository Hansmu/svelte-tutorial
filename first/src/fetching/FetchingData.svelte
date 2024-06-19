<script context="module" lang="ts">
    type Geo = {
        lat: string;
        lng: string;
    };

    type Address = {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: Geo;
    };

    type Company = {
        name: string;
        catchPhrase: string;
        bs: string;
    };

    type User = {
        id: number;
        name: string;
        username: string;
        email: string;
        address: Address;
        phone: string;
        website: string;
        company: Company;
    };
</script>

<script lang="ts">
    const getUsers = fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        if (!res.ok) {
            throw new Error('Unsuccessful response');
        }

        return res.json();
    }).catch(err => {
        console.log(err);
    });
</script>

<h2>Fetching data example</h2>

<!-- Svelte has its own await block to handle requests -->
{#await getUsers}
    <div>
        Loading...
    </div>
{:then users}
    {#each users as user (user.id)}
        <div>
            {user.name}
        </div>
    {/each}
{:catch error}
    <p>{error.message}</p>
{/await}
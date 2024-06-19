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
    import {onMount} from "svelte";

    let users: User[] = [];
    let isLoading = false;

    const fetchUsers = () => {
        isLoading = true;

        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (!res.ok) {
                throw new Error('Unsuccessful response');
            }

            return res.json();
        }).then(json => {
            users = json;
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            isLoading = false;
        });
    };

    onMount(() => {
        fetchUsers();
    });
</script>

<h2>Fetching data example</h2>

{#if isLoading}
    <div>
        Loading...
    </div>
{/if}

{#each users as user (user.id)}
    <div>
        {user.name}
    </div>
{/each}
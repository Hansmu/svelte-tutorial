import {writable} from "svelte/store";

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

type Store = {
    isLoading: boolean;
    users: User[];
};

const store = writable<Store>({
    isLoading: false,
    users: [],
});

const fetchUsers = () => {
    store.update(prev => ({
        ...prev,
        isLoading: true,
    }));

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
        store.update(prev => ({
            ...prev,
            users: json,
        }));
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        store.update(prev => ({
            ...prev,
            isLoading: false,
        }));
    });
};

export const userStore = {
    subscribe: store.subscribe,
    queryUsers: fetchUsers,
};

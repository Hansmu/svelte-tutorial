import { writable, readable } from 'svelte/store';

export const writableStoreExample = writable(123);

export const readableStoreExample = readable(123, (set) => {
    const unsubscribeFromWritable = writableStoreExample.subscribe(val => set(val));

    // You should return a cleanup function, which gets called once the store isn't needed anymore
    return () => {
        unsubscribeFromWritable();
    };
});

// You can also create a custom store that is usable by Svelte
// The one thing that is needed is the subscribe method
const customStoreBase = writable(321);

// You can just return an object with whatever methods, allowing you to centralize the logic of that store into one place
export const customStore = {
    subscribe: customStoreBase.subscribe,
    setTo9000: () => customStoreBase.set(9000),
    reset: () => customStoreBase.set(321),
};

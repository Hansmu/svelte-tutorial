import { writable, readable } from 'svelte/store';

export const writableStoreExample = writable(123);

export const readableStoreExample = readable(123, (set) => {
    const unsubscribeFromWritable = writableStoreExample.subscribe(val => set(val));

    // You should return a cleanup function, which gets called once the store isn't needed anymore
    return () => {
        unsubscribeFromWritable();
    };
});

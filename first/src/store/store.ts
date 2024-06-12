import { writable, readable } from 'svelte/store';

export const writableStoreExample = writable(123);
export const otherWritableStoreExample = writable(123);

writableStoreExample.subscribe(val => otherWritableStoreExample.set(val));
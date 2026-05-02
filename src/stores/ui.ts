import { writable } from 'svelte/store';

export const chaosLevel     = writable<number>(0);
export const chaosDiscovered = writable<boolean>(false);

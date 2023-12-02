import { writable } from 'svelte/store';

// Créez un store modifiable avec une valeur initiale de null
export const sessionStore = writable(null);

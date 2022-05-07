/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		loggedIn: boolean;
	}
	// interface Platform {}
	interface Session {
		loggedIn: boolean;
	}
	// interface Stuff {}
}

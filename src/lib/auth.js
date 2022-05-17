import { signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

import { auth } from '$lib/firebase';
import { goto } from '$app/navigation';

export const signInWithGithub = async () => {
	const githubProvider = new GithubAuthProvider();
	try {
		await signInWithPopup(auth, githubProvider);
		await goto('/');
	} catch (error) {
		console.error(error);
	}
};

export const signInWithGoogle = async () => {
	const googleProvider = new GoogleAuthProvider();
	try {
		await signInWithPopup(auth, googleProvider);
		await goto('/');
	} catch (error) {
		console.error(error);
	}
};

export const signOut = async () => {
	await auth.signOut();
	await goto('/');
};

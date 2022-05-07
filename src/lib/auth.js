import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { auth } from '$lib/firebase';

export const signInWithGithub = async () => {
	const provider = new GithubAuthProvider();
	try {
		await signInWithPopup(auth, provider);
		await fetch('/auth', { method: 'PUT' });
		window.location.href = '/';
	} catch (error) {
		console.error(error);
	}
};

export const signOut = async () => {
	await auth.signOut();
	await fetch('/auth', { method: 'DELETE' });
	window.location.href = '/login';
};

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDzDpAyye4eTCSmfvYfP4qftWPIpONUVsY',
	authDomain: 'sveltekit-code-journal.firebaseapp.com',
	projectId: 'sveltekit-code-journal',
	storageBucket: 'sveltekit-code-journal.appspot.com',
	messagingSenderId: '314210904339',
	appId: '1:314210904339:web:57c5dd3e53448e801a52e6',
	measurementId: 'G-07C47ZX2K8'
};

const app = initializeApp(firebaseConfig, 'CLIENT');
export const auth = getAuth(app);
export const db = getFirestore(app);

import cookie from 'cookie';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	// if (event.url.pathname.startsWith('/custom')) {
	// return new Response('custom response');
	// }
	const loggedIn = cookie.parse(event.request.headers.get('cookie') || '').loggedin;
	//convert to boolean
	event.locals.loggedIn = !!loggedIn;
	const response = await resolve(event);
	return response;
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
	// event.
	// return event.locals.user
	return {
		loggedIn: event.locals.loggedIn
	};
}

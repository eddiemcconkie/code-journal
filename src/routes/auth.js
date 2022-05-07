import cookie from 'cookie';
import { dev } from '$app/env';

/** @type {import('./auth').RequestHandler} */
export const put = async () => {
	return {
		status: 200,
		headers: {
			'Set-Cookie': cookie.serialize('loggedin', 'true', {
				path: '/',
				httpOnly: true,
				secure: !dev,
				maxAge: 60 * 60 * 24 * 7,
				sameSite: 'strict'
			})
		}
	};
};

/** @type {import('./auth').RequestHandler} */
export const del = async () => {
	return {
		status: 200,
		headers: {
			'Set-Cookie': cookie.serialize('loggedin', '', {
				path: '/',
				httpOnly: true,
				secure: !dev,
				maxAge: 0,
				sameSite: 'strict'
			})
		}
	};
};

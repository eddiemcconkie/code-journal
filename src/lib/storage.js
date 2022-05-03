export const save = (/** @type {string} */ key, /** @type {any} */ value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const load = (/** @type {string} */ key) => {
	const value = localStorage.getItem(key);
	return value ? JSON.parse(value) : [];
};

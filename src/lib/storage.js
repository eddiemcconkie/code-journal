export const saveData = (/** @type {string} */ key, /** @type {any} */ value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const loadData = (/** @type {string} */ key) => {
	const value = localStorage.getItem(key);
	return value ? JSON.parse(value) : [];
};

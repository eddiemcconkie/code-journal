/**
 * @param {HTMLInputElement} node
 * @param {(value: string)=>void} handler
 *  */
export const submitOnEnter = (node, handler) => {
	/** @param {KeyboardEvent} e */
	const onKeyDown = (e) => {
		if (e.key === 'Enter') {
			handler(node.value);
			node.value = '';
		}
	};
	node.addEventListener('keydown', onKeyDown);

	return {destroy()  {
		node.removeEventListener('keydown', onKeyDown);
	}};
};

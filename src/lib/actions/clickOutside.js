/** @param {HTMLElement} node @param {HTMLElement} exclude */
export const clickOutside = (node, exclude) => {
	/** @param {MouseEvent} e */
	const handleClick = (e) => {
		// @ts-ignore
		if (!node.contains(e.target) && !exclude.contains(e.target))
			node.dispatchEvent(new CustomEvent('close'));
	};

	/** @param {KeyboardEvent} e */
	const handleEscape = (e) => {
		if (e.key === 'Escape') node.dispatchEvent(new CustomEvent('close'));
	};

	document.addEventListener('click', handleClick, true);
	document.addEventListener('keyup', handleEscape, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
			document.removeEventListener('keyup', handleEscape, true);
		}
	};
};

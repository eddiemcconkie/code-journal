/** @param {HTMLElement} node */
export const trapFocus = (node) => {
	// Select on-demand to allow for dynamic focusable elements
	const getFocusableElements = () =>
		node.querySelectorAll(
			'a[href], input:not([disabled]), select:not([disabled]), button:not([disabled])'
		);

	/** @param {KeyboardEvent} e */
	const handleKeydown = (e) => {
		if (e.key === 'Tab') {
			const focusableElements = getFocusableElements();
			const firstFocusableElement = focusableElements[0];
			const lastFocusableElement = focusableElements[focusableElements.length - 1];
			if (e.shiftKey) {
				if (document.activeElement === firstFocusableElement) {
					e.preventDefault();
					// @ts-ignore
					lastFocusableElement.focus();
				}
			} else if (document.activeElement === lastFocusableElement) {
				e.preventDefault();
				// @ts-ignore
				firstFocusableElement.focus();
			}
		}
	};

	document.addEventListener('keydown', handleKeydown, true);

	return {
		destroy() {
			document.removeEventListener('keydown', handleKeydown, true);
		}
	};
};

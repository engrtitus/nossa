import "./polyfills.js";

(function () {
	if (typeof window === "undefined") {
		return;
	}
	const body = document.querySelector("body");
	if (!body) {
		console.error("Add a <body> tag to use nossa");
		return;
	}
	body.addEventListener("keydown", preventSpaceStart, false);
	body.addEventListener("paste", preventSpaceStart, false);
})();

function preventSpaceStart(e) {
	const fields = "input,textarea";
	let element = e.target;
	/**
	 * Here we are checking if the event (keydown/paste) was triggered in
	 * an input or textarea field.
	 */
	if (element && element.matches(fields)) {
		/**
		 * nossa-ignore is the class that can be added to specific
		 * inputs/textareas where this space as first field can be
		 * allowed.
		 *
		 * Then we check, if the input/text area has class nossa-ignore
		 */
		if (element.matches(".nossa-ignore")) {
			return;
		}

		const spaceRegex = /^\s/;
		let value;
		let isPasteTextTrimmed = false;

		/**
		 * Only two ways text can be added to the input/textarea field,
		 * 1. typing
		 * 2. pasting.
		 * If pasting, we get the text that was pasted from the clipboard
		 */
		if (e.type === "paste") {
			const pasteText = e.clipboardData.getData("text/plain");
			value = pasteText.trim();
			/**
			 * if the length of the pasted text is higher than the length
			 * of the trimmed text, that means some extra space were present at the
			 * begining or end of the pasted text
			 */
			if (pasteText.length > value.length) {
				isPasteTextTrimmed = true;
			}
		} else {
			/**
			 * Not a paste, get the value from the keycode
			 */
			value = String.fromCharCode(e.keyCode || e.which);
		}

		/**
		 * Check if value starts with a space or if pasted text has
		 * been trimmed (i.e had space initially) and cursor is at
		 * the begining of the input field (element.selectionStart is 0).
		 * If true, prevent input/textarea value from being updated
		 */
		if (element.selectionStart === 0) {
			if (spaceRegex.test(value) || isPasteTextTrimmed) {
				e.returnValue = false;
				if (e.preventDefault) {
					e.preventDefault();
				}
				/**
				 * Update the element's value with the trimmed text pasted
				 */
				if (isPasteTextTrimmed) {
					element.value = value;
				}
			} else {
				/**
				 * e.Keycode returns 229 on android regardless of
				 * character pressed (a, b, d, space-bar etc returns 229).
				 *
				 * So, we can't determine if whitespace was entered from the keycode.
				 *
				 * What we can do is modify the value by removing the space as
				 * it is being entered
				 */
				modifyValue(element);
			}
		}
	}
}

function modifyValue(element) {
	element.addEventListener("input", revertSpaceEntered, false);

	function revertSpaceEntered() {
		element.removeEventListener("input", revertSpaceEntered);
		/**
		 * We need to check if current value is "" after trimming
		 * (i.e only space as been entered) and replace the whitespaces
		 * with ""
		 */
		removeStartingSpaces(element);
	}
}

function removeStartingSpaces(element) {
	if (element.value) {
		if (element.value.trim() === "") {
			element.value = "";
		} else {
			element.value = element.value.trim();
		}
	}
}

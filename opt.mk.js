function oncopy(event) {
	document.removeEventListener("copy", oncopy, true);
	// Hide the event from the page to prevent tampering.
	event.stopImmediatePropagation();
	// Overwrite the clipboard content.
	event.preventDefault();
	event.clipboardData.setData("text/plain", text);
}

function saveOptions()
{
	document.addEventListener("copy", oncopy, true);
	// Requires the clipboardWrite permission
	document.execCommand("copy");
} 

document.querySelector("#button").addEventListener("click", saveOptions);

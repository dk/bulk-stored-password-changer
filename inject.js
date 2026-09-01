function prompt2(message) {
	const promptService = Services.prompt;
	const input = { value: "" };
	const accepted = promptService.promptPassword( null, "Bulk Stored Password Changer", message, input, null, {});
	return accepted ? input.value : null;
}

//////////////////
(async ()=>{
//////////////////

if (typeof Services === "undefined") {
	alert( "Run this in Firefox privileged Browser Console, not a website console.");
	return;
}

const login_mgr = Services.logins;

const oldp = prompt2("Enter the old password:");
if (oldp === null) return;

let logins;
try {
	// Firefox may show a Primary Password prompt here if needed.
	logins = await login_mgr.getAllLogins();
} catch (error) {
	console.error("Could not retrieve saved logins:", error);
	alert(
		"Firefox could not read saved logins. " +
		"If prompted, unlock your Primary Password and retry."
	);
	return;
}

const matches = logins.filter(login => login.password === oldp);
if (!matches.length) {
	alert("No saved login entries use that password.");
	return;
}
const displayed = matches
	.slice(0, 20)
	.map(login => login.hostname)
	.join("\n");
const remainder = (matches.length > 20) ? `\n... and ${matches.length - 20} more` : "";
if (
	!confirm(
		`Found ${matches.length} saved login(s):\n\n` +
		`${displayed}${remainder}\n\n` +
		"Replace the password for every listed entry?"
	)
)
	return;

const newp = prompt2( "Enter the new password, or click Cancel to stop:");
if (newp === null) return;
if (newp === oldp) {
	alert("The new password is the same as the old password; no changes made.");
	return;
}

let changed = 0;
const failures = [];

for (const login of matches) {
	try {
		const new_login = login.clone();
		new_login.password = newp;
		await login_mgr.modifyLoginAsync(login, new_login);
		changed++;
	} catch (error) {
		failures.push(login.hostname);
		console.error(`Failed to update ${login.hostname}:`, error);
	}
}

alert(
	`Changed ${changed} saved login(s).` +
	(failures.length
		? `\n\nFailed: ${failures.length}. Details are in Browser Console.`
		: "")
);

//////////////////
})();
//////////////////

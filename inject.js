(async () => {
  if (typeof Components === "undefined") {
    alert(
      "Run this in Firefox's privileged Browser Console, not a website console."
    );
    return;
  }

  const { classes: Cc, interfaces: Ci } = Components;

  const loginManager = Cc["@mozilla.org/login-manager;1"]
    .getService(Ci.nsILoginManager);

  const oldPassword = prompt("Enter the old password:");
  if (oldPassword === null) return;

  let logins;
  try {
    // Firefox may show a Primary Password prompt here if needed.
    logins = await loginManager.getAllLogins();
  } catch (error) {
    console.error("Could not retrieve saved logins:", error);
    alert(
      "Firefox could not read saved logins. " +
      "If prompted, unlock your Primary Password and retry."
    );
    return;
  }

  const matches = logins.filter(login => login.password === oldPassword);

  if (!matches.length) {
    alert("No saved login entries use that password.");
    return;
  }

  const displayed = matches
    .slice(0, 20)
    .map(login => login.hostname)
    .join("\n");

  const remainder =
    matches.length > 20 ? `\n... and ${matches.length - 20} more` : "";

  if (
    !confirm(
      `Found ${matches.length} saved login(s):\n\n` +
      `${displayed}${remainder}\n\n` +
      "Replace the password for every listed entry?"
    )
  ) {
    return;
  }

  const newPassword = prompt(
    "Enter the new password, or click Cancel to stop:"
  );

  if (newPassword === null) return;

  if (newPassword === oldPassword) {
    alert("The new password is the same as the old password; no changes made.");
    return;
  }

  let changed = 0;
  const failures = [];

  for (const login of matches) {
    try {
      const changes = Cc["@mozilla.org/hash-property-bag;1"]
        .createInstance(Ci.nsIWritablePropertyBag);

      changes.setProperty("password", newPassword);

      await loginManager.modifyLoginAsync(login, changes);
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
})();

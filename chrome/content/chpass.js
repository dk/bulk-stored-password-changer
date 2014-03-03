function bulkpasswordchanger_run() {

var Cc = Components.classes;
if (typeof(Cc) == 'undefined') {
	alert('cannot run in this environment, try error console');
	throw 'exit';
}		

var Ci = Components.interfaces;
var tokendb = Cc["@mozilla.org/security/pk11tokendb;1"].createInstance(Ci.nsIPK11TokenDB);
var token = tokendb.getInternalKeyToken();
try {token.login(true);} catch (e) {}
var pwdmanager;
if (!token.needsLogin()||token.isLoggedIn()){
	pwdmanager = Cc["@mozilla.org/login-manager;1"].getService(Ci.nsILoginManager);
} else {
	alert("cannot get login token");
	throw 'exit';
}
var signons = pwdmanager.getAllLogins({});

if ( !confirm(
	"This script will search through saved password and will replace old password entries with new ones. "+
	"\n\nNote: password prompts are unencrypted")) throw 'exit';

var oldp=prompt("Enter old password", "");
if ( oldp == null ) throw 'exit';

var i;
var found="";
var count=0;
for (i=0;i<signons.length;i++) {
	try {
		if (signons[i].password != oldp) continue;
		if ( count++ < 20 ) found += signons[i].hostname + '\n';
	}
	catch(e) {
	}
}
if ( count > 20 ) {
	found += "... and " + (count - 20) + "more";
} else if (count==0) {
	alert("No entries with this password found");
	throw 'exit';
}

if (!confirm( "Found the following URLs\n\n"+found+"\nProceed?"))
	throw 'exit';

var newp=prompt("Enter new password to change them, or click 'Cancel' to stop", "");
if ( newp == null ) throw 'exit';
var found = "";
var changed = 0;
for (i=0;i<signons.length;i++) {
	try {
		if (signons[i].password != oldp) continue;
		var old_entry = signons[i].clone();
		signons[i].password = newp;
		pwdmanager.modifyLogin(old_entry,signons[i]);
		changed++;
	}
	catch(e) {
	}
}
alert("Changed " + changed + " URLs ok");

}

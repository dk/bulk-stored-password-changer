bulk-stored-password-changer
============================

Firefox addon - changes saved passwords for many sites at once. Useful in
corporate environments where same password is used for many internal sites.

In our corporate network we are obliged to use common authentication to access
many of the compay interanl web sites. While under Windows that works seamless
with its domain-based Kerberos tickets, Linux integration is not that smooth,
and Firefox asks for a password each time it interacts with another interanl
site. Worse, the password is changed each three months, so is is never stopping
process of entering password again and again.

Since the password is the same anyway for all sites, I wrote this addon which
asks for the old password, the new password, and replaces one with another in
one go.

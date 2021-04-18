# Changelog

**./fox-custom/database-help.js**
* Rewrote 'checkUpdateInputEntered' to catch null and other non-JSON values.
	* If an object is entered, it is safe.
	* Otherwise, flag error.

---

**./databases/device.database.js - callCreateDevice**
* No longer reads and uses existing object ID.
* Only calls 'callUpdateDevice' with a null ID.

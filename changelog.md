# Changelog

**Test Status**
* G - Controller Files
	* Device entries are now added successfully.
	* Tests passed: 91 / 123

---

**./databases/device.database.js**
* Added missing parameters to 'addRetrievedEntry' call
	* Remote IO devices will be correctly retrieved.
* callUpdateDevice
	* Removed 'updateRes' parameter from callback.
	* 'updateErr' is now checked for both undefined and null.
	* Successful result now correctly returns ID string.

---

**./fox-devices/remote_io/remote-io-index.js**
* 'crudAddRemoteIoDevice' is now complete.

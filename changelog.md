# Changelog

**Test Status**
* G - Controller Files
	* 'Stored Device Class' testing is now complete.

---

**./fox-custom/validation-tasks.js**
* Required 'validator' package.
* Wrote new function 'readIpAddressValueProperty'
	* Reads and validates IP Address.

---

**./fox-devices/_classes/device-model.class.js**
* Changed 'ipAddress' property validation.
	* Calls 'readIpAddressProperty' instead of 'readStringProperty'
* Removed default value from 'macAddress' property validation.
* Validation is now complete.

# Changelog

**Test Status**
* G - Controller Files
	* Most 'Stored Device Class' tests pass successfully.
	* IP and MAC address formats need to be validated.
	* 'Connected Device Class' has not been started yet.

---

**./fox-custom**
* This folder contains script files created to help with FOX Controller emulation.

---

**./fox-custom/validation-tasks.js**
* New file. - Contains functions to help with object validation for classes.
* Currently supports:
	* Base object type.
	* String
	* Boolean
	* Number
	* String array item.
	* Correct IO type.

---

**./fox-devices/_classes/device-model.class.js**
* Added requirement for '../../fox-custom/validation-tasks'
* Changed class name from 'StoredDeviceObject' to 'StoredDevice'
* Implemented property validation for 'StoredDevice' class.
	* Only 'ipAddress' and 'macAddress' formats remain.
	* These require a 3rd-party library.

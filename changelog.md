# Changelog

**Test Status**
* G - Controller Files
	* All 'Stored Device Class' tests are successful.
		* 'StoredDevice' class emulation is complete for now.
	* Most 'Connected Device Class' tests are successful.
		* This is because most invalid tests change 'StoredDevice' properties.
		* Property changes are now correctly intercepted and validated.
		* 'Valid Model' test still fails as it has not been directly addressed.
		* 'Invalid Model' fails because it is handled differently compared to above.

---

**./fox-devices/_classes/device-model.class.js**
* Rewrote 'StoredDevice' class
	* Base object validation remains as-is
	* Property validation is reintroduced.
	* Constructor returns a proxy object (getUpdateObject)
* Wrote new function 'getUpdateObject'
	* Adds event monitoring to 'StoredDevice' class object.
	* Whenever a property value is set, 'handlePropertyUpdate' is called.
* Wrote new function 'handlePropertyUpdate'
	* Validates 'StoredDevice' property when changed.

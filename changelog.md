# Changelog

**Test Status**
* G - Controller Files
	* Remote IO Index device existence is tested successfully.
	* Tests passed: 97 / 123

---

**./fox-custom/rio-modify.js**
* Fixed bug in 'addNewDeviceEntry' where enabled devices will not be set as running.
	* Before: `newStoredDevice.isEnabled`
	* After: `newStoredDevice.object.isEnabled`
* updateExistingDeviceEntry
	* Added call to 'saveDeviceChanges' after 'checkCreationSuccessful'

---

**./fox-devices/remote_io/remote-io.index.js getRemoteIoStatus**
* 'statusRes.isRunning' starts as False.
* Added 'commsErrors' property to 'statusRes'
	* This is just a blank array.
	* It does not do anything.
* Declared new variables referring to the 'Running Device' array element.
	* deviceObject
	* elementType
* If the array element corresponds to an object, 'statusRes.isRunning' becomes True.
* Removed "Todo" comment.

---

**./fox-devices/remote_io/remote-io.index.js programCheckNodeExists**
* Renamed parameter to 'existTargetID'
* Declared variables:
	* 'statusObject' - Calls 'getRemoteIoStatus' to check whether the device exists.
	* 'existRes' - Result variable contains running status.
* This function is basically 'getRemoteIoStatus' but it returns True/False instead of an object.
* Removed "Todo" comment.

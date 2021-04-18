# Changelog

**Test Status**
* Wrote emulation for '/api/devices/:deviceType/:deviceId' endpoints.
* All tests pass successfully.

---

**./fox-custom/rio-modify.js**
* addNewDeviceEntry
	* Removed 'inpDeviceObj.id' assignment.
* updateExistingDeviceEntry
	* 'modifiedStoredDevice' now uses 'updatedDeviceObj' as input.

---

**./databases/device.database.js - callCreateDevice**
* Declared variables:
	* 'enteredID' - Stores input object ID string.
	* 'idType' - Stores the type of the 'enteredID' value.
* Restructured as two separate calls to 'callUpdateDevice'
	* If an ID string has been entered, use it.
	* Otherwise, generate a new one.

---

**./fox-api/device-params.js**
* Added requirement for:  ../fox-devices/remote_io/remote-io.index
* Removed 'readDeleteHeaderStatus' function.
* Wrote new main function 'retrieveDeviceObject'
	* Fulfils GET requests for specific Remote IO device.
	* Called publicly as 'retrieveDevice'
* Wrote new secondary function 'callRemoteIoRead'
	* Used by 'readDeleteHeaderStatus'
	* Calls Remote IO Index for device object.

---

**./routes/storage.js**
* `/status/`
	* Proper message is sent with 404 error.
* Emulated `/:deviceType/:deviceId` endpoints.
	* GET
	* PUT
	* DELETE

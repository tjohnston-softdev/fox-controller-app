# Changelog

**./databases/device.database.js**
* Wrote new function 'getEntryID'
	* Generates ID for new database entries.
	* When modifying an existing entry, the ID will be retained.
* callUpdateDevice
	* Declared new variable 'preparedID'
		* Assigned using 'getEntryID'
		* Used for 'updateInputObject.id'
	* Replaced 'updateTargetID' with 'preparedID' when calling 'put'

---

**./fox-devices/remote_io/remote-io.index.js crudAddRemoteIoDevice**
* Renamed:
	* 'newStoredDeviceObject' variable to 'newStoredDevice'
	* 'newDeviceObject' parameter to 'inpDeviceObject'
* Added functionality:
	* Create 'StoredDevice' object.
	* Attempt to add object to database.
* Not complete yet.

---

**./fox-devices/_classes/device-model.class.js handlePropertyUpdate**
* IF structure:
	* Commented out first call to 'checkStringProp'
	* This will be temporary.
	* Value will be used as-is without validation.

---

**./fox-custom/rio-modify.js - New functions**
* createStoredDeviceObject
	* Attempts to create a 'StoredDevice' object.
	* Uses a Try-Catch structure.
	* Does not throw an error in itself.
* checkStoredDeviceCreationSuccessful
	* Checks whether the 'StoredDevice' object was created successfully.
	* If not, an error will be thrown.

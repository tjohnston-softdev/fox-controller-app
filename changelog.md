# Changelog

**./fox-custom/rio-modify.js**
* Wrote new functions related to Remote IO database.
	* 'addNewDeviceEntry' - Adds a new device.
	* 'updateExistingDeviceEntry' - Modifies an existing device.
* The following functions can no longer be called publicly:
	* checkRioInputType
	* checkRioMissingID
	* setRioMakerProperty
	* createStoredDeviceObject
	* checkStoredDeviceCreationSuccessful

---

**./fox-devices/remote_io/remote-io.index.js**
* The main body of these functions has been moved to 'rioModify'
	* crudAddRemoteIoDevice
	* crudUpdateRemoteIoDevice
* Even though the function contents have been moved, the "Todo" comments remain unchanged.

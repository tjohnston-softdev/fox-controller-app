# Changelog

**./databases/device.database.js**
* callUpdateDevice
	* Moved `if (updateInputObject === undefined)` to its own function 'handleUpdateInputError'
	* Renamed 'targetID' parameter to 'updateTargetID'
* callReadDevice
	* Renamed 'targetID' parameter to 'readTargetID'
* Wrote new functions:
	* 'callDeleteDevice' - Coordinates deletion of Remote IO device from database.
	* 'getDeviceForDeletion' - Retrieves device object so it can be marked for deletion.
	* 'updateDeleteStatus' - Updates Remote IO delete status.
* Removed 'placeholder' function.

---

**./fox-custom/**
* New files:
	* 'rio-intl.js' - Functions for Remote IO Index initialization.
	* 'rio-modify.js' - Functions for adding or updating Remote IO devices via Database.

---

**./fox-devices/remote_io/remote-io.index.js**
* Added requirements for:
	* ../../fox-custom/rio-intl.js
	* ../../fox-custom/rio-modify.js
* Moved functions to 'rioIntl'
	* 'runInitializationLoop' as 'runDeviceInitializationLoop'
	* 'runCallbackLoop' as 'runInitializationCallbackLoop'
* Moved functions to 'rioModify'
	* 'handleRioInputType' as 'checkRioInputType', called publicly as 'checkInputType'
	* 'handleRioMissingID' as 'checkRioMissingID', called publicly as 'checkMissingID'

---

**./fox-devices/remote_io/remote-io.index.js crudAddRemoteIoDevice**
* Declared new variable 'newStoredDeviceObject'
	* Has not been assigned yet.
	* This will be a prepared 'StoredDevice'
* The 'maker' property is set.
	* Done by calling 'rioModify.setMaker'
	* If a string is not given, it will retrieve the 'maker' via the model name.
* Not done yet.

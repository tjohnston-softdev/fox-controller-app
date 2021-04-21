# Changelog

**Test Status - Offline**
* Offline Remote IO test errors have been fixed.
* All offline tests now pass successfully.
* The problem was trying to access the database using a 'series' control flow.
	* Refer to './databases/device.database.js'

---

**Test Status - Online**
* The Remote IO fixes also apply to online API tests.
* Total passed: 155 / 160

---

**./fox-custom/rio-modify.js**
* Moved the following functions to 'rio-entry-help.js'
	* 'checkInputType' as 'checkObjectInputType'
	* 'checkMissingID' as 'checkObjectMissingID'
* Rewrote 'setMaker' in 'rio-entry-help.js' as 'setInputMaker'
* Rewrote 'createStoredDevice' in 'rio-entry-help.js' as two separate functions:
	* 'createStoredDeviceObject' attempts to define the class object in a Try-Catch structure.
	* 'checkObjectCreationSuccessful' checks the result object in a callback structure.
* Rewrote the following functions in '../fox-rio-modify/rm-add-new.js'
	* addNewDeviceEntry
	* insertNewDeviceObject
* Moved the following functions to 'rio-device-status.js'
	* 'enableDevice' as 'enableDeviceEntry'
	* 'disableDevice' as 'disableDeviceEntry'
	* 'handleDeviceListUpdate' as 'insertListEntry'
* Rewrote the following functions in '../fox-rio-modify-rm-update-existing.js'
	* updateExistingDeviceEntry
	* saveDeviceChanges
* Rewrote in '../fox-rio-modify/rm-delete-existing.js'
	* deleteDeviceEntry

---

**./fox-custom/rio-entry-help.js**
* New file - Contains independent secondary functions for Remote IO modification tasks.
* Split from 'rio-modify.js'

---

**./fox-custom/rio-device-status.js**
* New file - Contains functions to enable and disable Remote IO entries.
* Split from 'rio-modify.js'

---

**./fox-rio-modify/**
* New folder - Contains scripts to modify Remote IO database
	* 'rm-add-new.js' - Adds new entry.
	* 'rm-update-existing.js' - Updates existing entry.
	* 'rm-delete-existing.js' - Deletes existing entry.

---

**./fox-devices/remote_io/remote-io.index.js**
* Changes to requirements:
	* Removed '../../fox-custom/rio-modify'
	* Added '../../fox-rio-modify/rm-add-new'
	* Added '../../fox-rio-modify/rm-update-existing'
	* Added '../../fox-rio-modify/rm-delete-existing'
* Updated functions to use correct calls:
	* crudAddRemoteIoDevice
	* crudUpdateRemoteIoDevice
	* crudDeleteRemoteIoDevice

---

**./fox-custom/database-help.js - checkUpdateInputEntered**
* Replaced 'preparedID' with 'prepID'

---

**./databases/device.database.js**
* Removed 'run-series' requirement.
* callUpdateDevice
	* Rewrote function to not use series control flow.
	* Split the 'put' call into its own function 'handlePut'

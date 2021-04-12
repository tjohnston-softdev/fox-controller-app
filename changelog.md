# Changelog

**./fox-custom/rio-modify.js**
* Added requirement for '../fox-devices/remote_io/remote-io.factories'
* Renamed functions:
	* 'checkRioInputType' to 'checkInputType'
	* 'checkRioMissingID' to 'checkMissingID'
	* 'setRioMakerProperty' to 'setMaker'
	* 'createStoredDeviceObject' to 'createStoredDevice'
	* 'checkStoredDeviceCreationSuccessful' to 'checkCreationSuccessful'
* Revised 'addNewDeviceEntry' calback IF structure.
	* If there is an add error, return it.
	* If the added device is enabled, call 'enableDevice'
	* Otherwise, return the ID safely.
* Wrote new functions:
	* 'enableDevice' - Retrieves updated database entry and adds to 'running devices' list.
	* 'handleDeviceListUpdate' - Updated 'running devices' list.

---

**./fox-devices/remote_io/remote-io.index.js**
* Removed "Todo" from 'crudAddRemoteIoDevice'

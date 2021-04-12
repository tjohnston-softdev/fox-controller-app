# Changelog

**./fox-custom/rio-modify.js deleteDeviceEntry**
* New function split from Remote IO Index.
* Deletes entries from Remote IO Database.
* Calls 'disableDevice' prior to deletion.
	* Removing it from the 'Running Devices' list.

---

**./fox-devices/remote_io/remote-io.index.js**
* crudDeleteRemoteIoDevice
	* Moved body to 'rioModify' as 'deleteDeviceEntry'
	* Removed "Todo"


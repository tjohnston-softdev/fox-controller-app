# Changelog

**./fox-custom/rio-modify.js updateExistingDeviceEntry**
* Swapped variable declarations:
	* modifiedStoredDevice
	* localID
* Calls database to retrieve existing device
	* If this is successful, call 'saveDeviceChanges'
	* Otherwise, return error.

---

**./fox-custom/rio-modify.js - New Functions**
* 'disableDevice' - Removes object by given ID from 'running device' list.
* 'saveDeviceChanges' - Saves modified entry to Remote IO database.

---

**./fox-devices/remote_io/remote-io.index.js**
* Removed "Todo" from 'crudUpdateRemoteIoDevice'


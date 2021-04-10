# Changelog

**Test Status**
* G - Controller Files
	* Emulated select existing Remote IO device.
	* Started writing emulation for adding Remote IO devices.
	* Tests passed: 49 / 123.

---

**./databases/device.database.js**
* addRetrievedEntry
	* Removed `console.log`
	* When an error is caught, 'parsedEntry' is set to null.
* Wrote CRUD functions:
	* callCreateDevice
	* callReadDevice
	* callUpdateDevice
* 'deleteDeviceEntity' has not been implemented yet.

---

**./fox-devices/remote_io/remote-io.index**
* Removed `if (listErr !== null)` from 'initializeRemoteIoFactory'
	* No messages will be displayed.
* Wrote new main functions:
	* 'crudGetRemoteIoDevice' - Retrieves existing device from database.
	* 'crudAddRemoteIoDevice' - This stub will add a new device to the database.
* Wrote new sub functions:
	* 'handleRioInputType' - Validates object input type when adding or modifying devices.
	* 'handleRioMissingID' - Validates ID string when modifying devices.

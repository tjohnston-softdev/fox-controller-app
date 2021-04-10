# Changelog

**Test Status**
* G - Controller Files
	* Emulated Remote IO initialization and reading from database.
	* Tests passed: 46 / 123.

---

**./databases/device.database.js**
* Wrote new function 'addRetrievedEntry'
	* When a database entry is retrieved, parse it to JSON and add to result set.
* Wrote new CRUD functions:
	* callListDevices
	* callListAllDevices

---

**./fox-devices/remote_io/remote-io.index**
* Declared global variables:
	* initializationCallbacks
	* initializationComplete
	* runningIoDevices
* Wrote new functions:
	* 'initializeRemoteIoFactory' - Initializes Remote IO devices.
	* 'whenInitializationComplete' - Saves initialization callback.
	* 'crudListRemoteIoDevices' - Retrieves Remote IO devices from database.
* Wrote new sub functions:
	* 'runInitializationLoop' - Creates and saves 'StoredDevice' objects from database.
	* 'runCallbackLoop' - Runs initialization callbacks upon completion.

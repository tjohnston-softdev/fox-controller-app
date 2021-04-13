# Changelog

**Test Status**
* G - Controller Files
	* Wrote stub for 'factoryReset' function. in 'service.main'
	* This will most likely be required for API testing.
	* All 'service.main' tests pass.

---

**./service.main.js**
* Added requirement for:
	* ./fox-devices/remote_io/remote-io.index
* Changed 'restartTime' to 1000ms.
* Removed redundant code in 'rebootController'
	* Calls 'restartProcess' directly.
* Declared global variable 'maxSize'
	* Corresponds to the maximum value that size retrieval functions can return.
	* 64 Megabytes
* Changed the following functions to use 'maxSize'
	* getDiskSpace
	* getDatabaseSize
	* getLogSize
* Wrote stub for 'factoryReset' function.
	* So far, this only retrieves a list of saved Remote IO devices.
	* Retrieving the IDs is required so that they can be deleted.

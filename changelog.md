# Changelog

**Test Status**
* G - Controller Files
	* All 'Connected Device Class' tests pass.
	* 'ConnectedDevice' class emulation is complete.

---

**./fox-devices/_classes/device.class.js**
* 'ConnectedDevice' constructor.
	* Renamed '_storedDevice' parameter to 'storeDeviceObj'
	* Moved instance type validation to its own function 'handleClassType'
	* 'storedDevice' property is now set after validation passes.
* New function 'handleModel'
	* Attempts to retrieve model object by name.
	* If no such model exists, an error will be thrown.

# Changelog

**Test Status**
* G - Controller Files
	* Wrote emulation for Remote IO settings.
	* While some tests do pass, the emulation still has bugs.
	* Passed: 99 / 123

---

**./fox-devices/remote_io/remote-io-factories.js**
* Declared new variable 'connectedDeviceObject'
	* Creates a 'ConnectedDevice' object from 'storedDeviceObject'
* Rewrote 'disableRemoteIo' for clarity.
* Wrote emulation for 'getRemoteIoDeviceProperties'
	* Not fully tested yet.

---

**./fox-devices/_classes/device.class.js defineConnectedDevice**
* Declared new variables:
	* modelDeviceObject (Function) - Assigned as part of constructor.
	* baseModel (Constructor) - Assigned by calling `deviceSettings.getModel`
* The 'handleModel' call now uses 'baseModel' as the argument.
* Wrote 'getRioProperties' emulation.

---

**./fox-devices/_classes/device.class.js handleModel**
* This function now only validates the result. It does not retrieve the model.
* Specific changes:
	* Removed 'mName' parameter.
	* 'retrievedEntry' is now a parameter.

---

**./fox-devices/remote_io/remote-io-index.js**
* Wrote emulation for 'programGetIoProperties'
* Not fully tested yet. There are still bugs.

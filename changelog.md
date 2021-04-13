# Changelog

**Test Status**
* G - Controller Files
	* Started writing emulation for Remote IO node registration.
	* While most of the tests do pass, it is still a work-in-progress.
	* Total: 110 / 123

---

**./fox-devices/_classes/device.class.js defineConnectedDevice**
* Emulated class method 'getIoContainer'
	* This retrieves the 'IoContainer' object for a given prefix.


---

**./fox-devices/remote_io/**
* Wrote emulation for the following functions:
	* remote-io.factories.js registerRemoteIoNodeCallback
	* remote-io.index.js programRegisterNode
* These are not fully tested yet.

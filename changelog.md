# Changelog

**Test Status**
* G - Controller Files
	* All 'Get IO Properties' tests pass.
	* Total passed: 103 / 123.

---

**./fox-devices/_classes/device.class.js getRioProperties**
* Declared 'currentKey' variable.
* IO container loop now uses 'currentKey' as the loop variable instead of 'currentContainer'
	* 'currentContainer' is assigned through 'currentKey'

---

**./fox-devices/remote_io/remote-io.index.js programGetIoProperties**
* No longer validates the device before calling properties.
	* Removed 'targetRunning' variable.
	* Removed IF structure.
	* Remaining variables are declared and assigned on the same line.
* Removed "Todo" comment.

---

**./fox-devices/remote_io/remote-io.factories.js**
* Removed "Todo" comment from 'getRemoteIoDeviceProperties'

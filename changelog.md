# Changelog

**Test Status**
* G - Controller Files
	* All tests pass.

---

**./fox-devices/_classes/device.class.js**
* Added 'mName' parameter to 'handleModel'
* 'ConnectedDevice' constructor
	* Added 'storeDeviceObj.model' to 'handleModel' call.

---

**./fox-devices/remote_io/remote-io.factories.js**
* Removed "Todo" comments.

---

**./fox-devices/remote_io/remote-io.index.js**
* programRegisterNode
	* Declared 'flaggedMessage' variable.
	* Removed 'registerRes' variable.
	* 'flaggedMessage' is set when returning "Module doesn't exist!" error.
* programSetDeviceOutput
	* Removed "Todo" comment.

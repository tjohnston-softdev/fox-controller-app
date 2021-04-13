# Changelog

**Test Status**
* G - Controller Files
	* All Remote IO tests pass except for invalid 'Set Device Output'
	* Passed: 121 / 123.

---

**./fox-devices/remote_io/remote-io.index.js programRegisterNode**
* For missing devices, the 'result' argument in the callback returns 'undefined' instead of null.
* Removed "Todo" comment.

---

**./fox-devices/remote_io/remote-io.factories.js registerRemoteIoNodeCallback**
* Declared new variable 'flaggedMessage'
	* Stores error message text.
	* Set when 'inputObject.ioSetId' fails.
	* Used as an argument for 'registerCallback'
* Removed "Todo" comment.

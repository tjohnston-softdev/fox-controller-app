# Changelog

**Test Status**
* G - Controller Files
	* Added missing function placeholders for Remote IO Index.
	* Tests passed: 59 / 123.

---

**./fox-devices/remote_io/remote-io.index**
* Wrote new function 'rioIndexPlaceholder'
	* This is unique in that it uses a callback.
* Added public function definitions for:
	* modRemoteIoDevice
	* delRemoteIoDevice
	* getRioDeviceStatus
	* listRiosForNode
	* isNodeExists
	* registerNode
	* setDeviceOutput
	* getIoProperties

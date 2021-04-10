# Changelog

**Test Status**
* G - Controller Files
	* Even writing the correct function stubs makes a signifiant difference in pass rates.
	* Most of the functionality has not been written yet.
	* Tests passed: 86 / 123.

---

**./fox-devices/remote_io/remote-io-index.js**
* Wrote stubs for missing main functions.
	* These are properly named functions with the correct parameters.
	* Not just generic placeholders.
	* Includes "Todo" comment.
	* Functions are:
		* crudUpdateRemoteIoDevice
		* crudDeleteRemoteIoDevice
		* getRemoteIoStatus
		* programListRemoteIoDevices
		* programCheckNodeExists
		* programRegisterNode
		* programSetDeviceOutput
		* programGetIoProperties
* Added "Todo" comment to 'crudAddRemoteIoDevice'
* Removed 'rioIndexPlaceholder' function.

# Changelog

**./fox-custom/rio-program.js**
* New file - Contains secondary functions for Remote IO Index programming.

---

**./fox-devices/remote_io/remote-io.index.js**
* Added requirement for:
	* ../../fox-custom/rio-program
* getRemoteIoStatus
	* Moved the element type checking script to 'rioProgram'
	* Removed the variables 'deviceObject' and 'elementType'
	* 'statusRes' is declared as a blank object with properties assigned separately.
* programCheckNodeExists
	* Removed 'statusObject' variable.
	* 'existRes' is assigned by calling 'rioProgram.checkDeviceRunning'
	* Parameter is renamed back to 'deviceTargetID'
* programListRemoteIoDevices
	* Emulated function successfully.

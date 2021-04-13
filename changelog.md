# Changelog

**./fox-custom/rio-program.js**
* Wrote new function 'getUnknownModuleErrorText'
	* Returns error text for unknown module when registering Remote IO.

---

**./fox-devices/remote_io/remote-io-index.js programRegisterNode**
* 'flaggedMessage' is now assigned by calling 'rioProgram.getUnknownModuleError'

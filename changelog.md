# Changelog

**./fox-custom/model-template.js - addIoConfigObject**
* 'newConfig' properties are defined individually and not inline.
* 'length' result property is now correctly set to 'lengthNum'

---

**./fox-devices/remote_io/remote-io.factories.js**
* 'disableRemoteIo' only returns true without any variable.

---

**./fox-devices/_classes/device.class.js - getRioProperties**
* Removed `getPropRes[rioSettings.ioTypes.control].push` call.
	* Arrays should only be modified within IF structure.

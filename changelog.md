# Changelog

**./fox-devices/remote_io/remote-io-factories.js**
* Removed 'factoryPlaceholder' function.
* createRemoteIoModule
	* Removed 'maker' and 'ipAddress' result properties.
	* Functions are now defined internally instead of using a placeholder.
	* Only 'disableRemoteIo' is complete so far. It does not require any real functionality.

---

**./fox-devices/_classes/device-model.class.js**
* New main functions:
	* 'defineDeviceModel' - Creates 'DeviceModel' object.
	* 'defineIoContainer' - Creates 'IoContainer' object.
* New secondary function 'setDeviceIoContainers'
	* Sets the 'ioContainers' property of the 'DeviceModel' class.
	* Uses 'IoContainer' objects.

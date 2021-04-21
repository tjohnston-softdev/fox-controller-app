# Changelog

**Test Status**
* /api/nodes/:maker/:deviceId
	* Moxa status bug fixed.
	* All tests pass.
* Front-End API testing complete.

---

**./fox-devices/_classes/device.class.js getRioProperties**
* Changed how the 'getPropRes' arrays are populated.
	* STATUS - Used by default.
	* CONTROL - Only for corresponding properties.
* Fixes an error in which the STATUS array is not correctly populated.

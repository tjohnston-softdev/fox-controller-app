# Changelog

**Test Status**
* Fixed 'Missing Property' error for 'Unknown Manufacturer' when testing the 'Create Device API'
	* POST /api/devices/:deviceType
* Total Passed: 156 / 160

---

**./fox-custom/rio-entry-help.js**
* Rewrote 'setInputMaker'
	* If the 'maker' property does not exist, set to null.

---

**./fox-rio-modify/rm-add-new.js**
* Moved 'setMaker' call
	* From: Start of 'insertNewDeviceObject'
	* To: End of 'addNewDeviceEntry'

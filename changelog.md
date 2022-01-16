# Changelog

**./fox-custom/folder-item.js - checkNameType**
* 'checkRes' is assigned using an evaluation instead of an IF structure.

---

**./fox-custom/fs-drive.js - writeUnixName**
* Simplified function code. String is written on one line.

---

**./fox-custom/rio-program.js**
* 'checkRes' is now assigned using an evaluation instead of an IF structure. (checkRioDeviceRunning)
* Re-wrote 'text' result property assignment for readability (saveFilteredDevice)

---

**./fox-custom/validation-tasks.js**
* Simplified result checking in 'checkBaseObjectType'
* Compressed string-writing code in functions:
	* writePropertyTypeError
	* writeUnsupportedValueError
* Re-wrote 'quoteText' for readability.
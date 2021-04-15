# Changelog

**Test Status**
* Emulated log size for '/api/admin/health' endpoint.
* Passed: 55-56 / 60
	* Noticed bug where the 'mem.swaptotal' test sometimes fails.

---

**./fox-api/log-size.js**
* New file - Defines FOX Controller log information.
	* Name, directory, and creation are hard-coded.
	* 'modified' uses the current timestamp.
	* Size is random (Up to 8KB)

---

**./service.main.js**
* Added './fox-api/log-size' requirement.
* Removed 'maxSize' global variable.

---

**./service.main.js getHealth**
* Declared new variables for class functions
	* envFunc
	* databaseFunc
	* logFunc
* Result properties are assigned using class functions
	* environment
	* databaseSize
	* logSize
* 'healthRes' is returned after async property assignments are complete.

---

**./service.main.js getEnvironment**
* Removed:
	* randTemp
	* randHumid
	* 'environmentRes' properties.
* Returns blank object.
* Added "Todo" comment.

---

**./service.main.js getDiskSpace**
* Returns placeholder value.

---

**./service.main.js getDatabaseSize**
* Removed 'randBytes' variable.
* Declared 'blankArr' - Placeholder.
* Returns blank array.
* Added "Todo" comment.

---

**./service.main.js getLogSize**
* Rewrote function to return correct information by calling 'logSize'

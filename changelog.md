# Changelog

**Test Status**
* The structure changes below caused errors with offline controller file tests.
* Total passed: 199 / 225

---

**./databases/device.database.js**
* New requirements:
	* run-series
	* ../settings
* Removed 'databaseRoot' global.
* Changed the following to use 'pathSettings' instead of 'databaseRoot'
	* Global call to 'createFolder'
	* 'dbFolderPath' assignment in 'loadDatabase'

---

**./databases/device.database.js - callUpdateDevice**
* Removed 'objectDefinition' variable.
* Declared 'jsonSyntaxObject' variable.
	* Used as a reference when calling 'databaseHelp'
* Changes to 'updateInputObject' have been split into 'databaseHelp'
* Removed `JSON.stringify` call.
* Restructured to call 'databaseHelp' and 'put' in sequence.
* Removed "TODO" comment.

---

**./fox-custom/database-help.js - checkUpdateInputEntered**
* Changed parameters:
	* Renamed 'errorCallback' to 'checkInpCallback'
	* Added 'prepID' and 'jsonSyntax'
* Removed 'objectEntered' variable.
* Restructured function to use callback properly:
	* If 'inpObj' is valid:
		* Set modified timestamp
		* Set ID
		* Convert entry JSON to definition syntax.
		* Return true.
	* Otherwise:
		* Return error.
* Removed "TODO" comment.

---

**./fox-custom/rio-modify.js - Global**
* Required 'run-series' module.

---

**./fox-custom/rio-modify.js - Secondary Functions**
* setMaker
	* Removed "TODO" comment.
	* This function does not use a callback.
* createStoredDevice
	* Added 'sdCreateCallback' parameter.
	* Renamed catch parameter to 'thrownErr'
	* Restructured function to use callback, even within try-catch.
* checkCreationSuccessful
	* Merged into 'createStoredDevice'
* checkInputType
	* Renamed 'errorCallback' parameter to 'typeCallback'
	* Removed 'correctType' variable.
	* If 'inpValue' is valid, return true using the callback.
	* Removed "TODO" comment.
* checkMissingID
	* Renamed 'errorCallback' parameter to 'missingCallback'
	* Rewrote body to use callback structure.
	* Returns ID string on successful result.
* insertNewDeviceObject
	* New function - Split from 'addNewDeviceEntry'

---

**./fox-custom/rio-modify.js - Primary Functions**
* addNewDeviceEntry
	* 'newStoredDevice' is now an object with 'contents' property.
	* Moved 'setMaker' call to 'insertNewDeviceObject'
	* Moved 'rioDatabase.createDeviceEntity' call to 'insertNewDeviceObject'
	* Restructured to call secondary functions in correct sequence.
	* Removed "TODO" comment.
* updateExistingDeviceEntry
	* 'modifiedStoredDevice' is now an object with 'contents' property.
	* Removed 'localID' variable.
	* Restructured to call secondary functions in correct sequence.
	* Removed "TODO" comment.

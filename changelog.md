# Changelog

**Test Status**
* Emulated '/api/storage/global/status' endpoint successfully.
* All storage API tests pass, but the download file endpoint should be emulated regardless.

---

**./routes/storage.js**
* Added requirement.
	* ../service.main
* /user-files/download/:fileName
	* Changed placeholder message to "Test File Contents"
	* This passes download file test.
* /global/status
	* Emulated successfully.

---

**./service.main.js**
* Rewrote 'getDiskSpace' to return a full file system object.

---

**./fox-api/system-info.js - getFileSystemArray**
* Split 'currentDriveObject' definition into its own function 'createFileSystemObject'
* Removed 'currentCapacity' and 'currentUsed' variables.

---

**./fox-api/system-info.js - New Functions**
* createFileSystemObject
	* Randomly generates a single file system object.
	* Used by 'getFileSystemArray' and 'getMainDiskObject'
* getMainDiskObject
	* Calls 'createFileSystemObject' with 1.

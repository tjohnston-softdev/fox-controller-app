# Changelog

**./fox-custom/os-platform.js**
* New file - Stores OS platform of the user's machine.
	* eg. Windows is "win32"
* Defines this in a single place that can be accessed by other files as needed.

---

**./fox-custom/fs-drive.js**
* Removed:
	* 'os' requirement.
	* 'platform' global variable.
* setFileSystemProperties
	* Added 'platform' parameter.

---

**./fox-api/system-info.js**
* Added requirement for '../fox-custom/os-platform'
* Added 'osPlatform' argument to 'fsDrive.setFileSystem' call

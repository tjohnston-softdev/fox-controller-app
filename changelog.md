# Changelog

**Test Status**
* Emulated file system for '/api/admin/health' endpoint.
* Passed: 38 / 60

---

**./fox-custom/fs-drive.js**
* New file - Used to write file system information for generated volumes.
* Writes either Windows or Unix themed information based on the user's operating system.
* Unlike the drive capacity, this information is not randomly generated.

---

**./fox-api/system-info.js**
* Added requirement for '../fox-custom/fs-drive'
* Wrote new function 'getFileSystemArray'
	* Used to generate random drives for system information.
	* Capacity up to 3TB

---

**./service.main.js getHealth**
* 'fsSize' property emulated.

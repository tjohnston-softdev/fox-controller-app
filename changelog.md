# Changelog

**Test Status**
* Emulated '/api/storage/user-files/download/' endpoint.
* All Storage API tests pass.

---

**./routes/storage.js**
* Added requirements:
	* path
	* ../fox-api/download-prep
* Wrote emulation for '/user-files/download/:fileName'

---

**./fox-api/download-prep.js**
* New file - Preparation functions for 'Download Files' endpoint.

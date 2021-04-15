# Changelog

**Test Status**
* Fixed 'mem.swaptotal' bug for '/api/admin/health' endpoint.

---

**./fox-api/system-info.js getMemoryObject**
* 'swapTotal' will now be set to half of 'memTotal' (Rounding down)
	* Other swap variables are set as normal.

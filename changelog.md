# Changelog

**Test Status**
* Emulated database size information for '/api/admin/health' endpoint.
* All tests pass successfully.
* Endpoint complete.

---

**./fox-api/database-info.js**
* New file - Used to retrieve information about stored databases.
* Unlike 'system-info.js', this uses real data instead of test data.

---

**./fox-custom/folder-item.js**
* New file - Used to read information about a file in a folder contents loop.

---

**./service.main.js**
* Added requirement for './fox-api/database-info'
* Rewrote 'getDatabaseSize' to retrieve correct information.

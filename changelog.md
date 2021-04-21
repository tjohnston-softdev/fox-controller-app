# Changelog

**Test Status**
* /api/admin/health
	* Fixed database size error.
	* Now, exactly two databases are returned as per tests.
* All API tests pass.

---

**./fox-custom/folder-item.js - handleStatObject**
* Moved 'prepEntry' property assignment to its own function 'defineItemObject'
	* Creates folder item object without any validation.
	* Timestamps are rounded to the nearest whole.
	* Called publicly as 'defineItem'
* Declared new variable 'dirStatus'
	* Stores whether the folder item is a directory.

---

**./fox-api/database-array.js**
* New file - Prepares database array for Controller health.

---

**./service.main.js**
* Added requirement for './fox-api/database-array'
* getDatabaseSize
	* Renamed 'getDbSizesErr' to 'dbFolderErr'
	* Renamed 'getDbSizesRes' to 'dbFolderRes'
	* Declared result variable 'dbSizeRes'
	* Modified callback outcome:
		* If reading the database folder is successful, call 'databaseArray' to prepare results.
		* Otherwise, return an empty array.

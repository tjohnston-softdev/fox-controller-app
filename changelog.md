# Changelog

**./fox-api/database-info.js - Renamed Functions**
* 'getDatabaseInformation' to 'getFolderContents'
	* Called publicly as 'getContents'
* 'readDatabaseFolder' to 'readTargetFolder'

---

**./fox-api/database-info.js - getFolderContents**
* Renamed parameters:
	* 'rootPathString' to 'folderPathString'
	* 'dbInfoCallback' to 'foldContsCallback'
* Renamed variables:
	* 'databaseFolderExists' to 'targetFolderExists'
	* 'databaseArrayObject' to 'entryArrayObject'

---

**./fox-api/database-info.js - readTargetFolder**
* Renamed parameters:
	* 'rootPathStr' to 'folderPathStr'
	* 'databaseArrayObj' to 'entryArrayObj'

---

**./fox-api/database-info.js - loopFolderContents**
* Renamed parameters:
	* 'rootPath' to 'folderPath'
	* 'databaseArray' to 'entryArray'

---

**./service.main.js getDatabaseSize**
* Changed 'databaseInfo.getDatabases' to 'databaseInfo.getContents'

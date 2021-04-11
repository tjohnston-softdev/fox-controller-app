# Changelog

**./fox-custom/**
* New files
	* 'create-folder.js' - Used to create folders.
	* 'database-help.js' - Contains secondary functions for database usage.

---

**./databases/device.database.js**
* Added requirements for:
	* ../fox-custom/create-folder
	* ../fox-custom/database-help
* Moved the 'createDatabaseFolder' function to 'createFolder'
* Moved the following functions to 'databaseHelp'
	* 'getEntryID' as 'generateEntryID'
	* 'handleUpdateInputError' as 'checkUpdateInputEntered'
	* 'addRetrievedEntry' can stay for now.

---

**./fox-devices/remote_io/remote-io-index.js**
* Added "Todo: Disable" to 'crudDeleteRemoteIoDevice'
* Added "Todo: Enable" to 'crudAddRemoteIoDevice'

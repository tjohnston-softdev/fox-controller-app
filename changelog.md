# Changelog

**./package.json**
* Installed packages:
	* fs-extra
	* run-series
	* async-each

---

**./service.main.js - New Requirements**
* [Installed packages]
* settings.js'

---

**./service.main.js factoryReset**
* Declared new variable 'callControllerRestart'
	* Local copy of 'restartProcess'
	* Called when all controller save data is deleted.
* Wrote secondary functions:
	* 'clearDatabase' - Removes all Remote IO device entries.
	* 'deleteSaveFiles' - Deletes folder containing FOX Controller saved data.
* After all devices are retrieved, 'clearDatabase' is called.
* Removed "Todo" comment.

---

**./databases/device.database.js**
* Wrote new function 'callDatabaseClose'
	* Closes the 'leveldb' instance safely.

---

**./fox-devices/remote_io/remote-io-index.js**
* Wrote new function 'closeRemoteIoDatabase'
	* Calls database close function.
	* Used to exit Remote IO database for factory reset.

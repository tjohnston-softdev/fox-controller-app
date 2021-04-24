# Changelog

**Commented Files**
* ./databases/
	* device.database.js
* ./fox-devices/
	* device.settings.js
	* _classes/
		* device.class.js
		* device-model.class.js
	* remote_io/
		* advantech.models.js
		* moxa.models.js
		* remote_io.settings.js
		* remote-io-factories.js
		* remote-io.index.js
		* sonoff.models.js
* node-red-settings.js
* service.main.js
* settings.js

---

**./fox-devices/remote_io/remote-io-factories.js**
* These variables are declared and assigned separately:
	* createRemoteIoModule
		* storedDeviceObject
		* connectedDeviceObject
	* registerRemoteIoNodeCallback
		* ioSet
		* parsedPrefix
		* parsedIndex
		* registerFunction

---

**./service.main.js - getHealth**
* These variables are declared and assigned separately:
	* envFunc
	* databaseFunc
	* logFunc

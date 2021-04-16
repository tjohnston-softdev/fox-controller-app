# Changelog

**Test Status**
* Properly emulated environmental sensor information for '/api/admin/health' endpoint.
* Tests passed: 59 / 60
	* Only database sizes remain.

---

**./fox-api/env-sensors.js**
* New file - Creates test data for environmental sensors.
* If the device OS is a dummy, it will only return placeholder information.
* Temperature and Humidity are randomly generated.

---

**./service.main.js**
* Added requirement for './fox-api/env-sensors'
* getEnvironment
	* 'environmentRes' is assigned by calling 'envSensors'
	* Removed "Todo" comment.
* getDiskSpace
	* Added "Todo" comment.

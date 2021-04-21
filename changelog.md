# Changelog

**Test Status**
* Fixed invalid tests for 'DELETE /api/devices/:deviceType/:deviceId'
* Now all Device API tests pass.
* Caught an error related to database count in the Health API.

---

**./routes/devices.js**
* DELETE /:deviceType/:deviceId
	* deleteResultObject
		* Properties are now defined inline.
		* Object is sent regardless of outcome.
	* Express-based error handling has been removed.

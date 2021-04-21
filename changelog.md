# Changelog

**Test Status**
* Wrote emulation for '/api/nodes/:maker/:deviceId' endpoint.
* Only one test fails. There is a bug related to Moxa status.
	* Tests passed: 151 / 152

---

**./routes/nodes.js**
* Added requirement for '../fox-api/device-params'
* Emulated '/:maker/:deviceId'

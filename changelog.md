# Changelog

**Test Status**
* Wrote emulation for '/api/admin/restart/:unit' endpoint.
* Tests pass successfully.
	* There is still a glitch with the offline check that causes an error.
	* However, this is on the testing end and not API emulation.

---

**./routes/admin.js**
* Required 'http-errors' module.
* Emulated '/restart/:unit'

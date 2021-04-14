# Changelog

**Test Status**
* '/api/admin/dhcp-clients' endpoint emulated and tested successfully.

---

**./fox-api**
* New folder - Contains functions for API emulation.
* As these files are not directly required by the unit tests, the actual structure does not matter as much.
* Contains one file 'dhcp-generator.js'
	* Generates random DHCP Client objects for Admin API.

---

**./fox-custom/random-values.js**
* Fixed wrong bracket for `deviceTypes.push`

---

**./routes/admin.js**
* Added requirement for '../fox-api/dhcp-generator'
* Wrote emulation for '/dhcp-clients' endpoint.

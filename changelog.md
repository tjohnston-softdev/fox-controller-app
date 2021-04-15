# Changelog

**Test Status**
* Emulated network interfaces for '/api/admin/health' endpoint.
* Passed: 44 / 60

---

**./fox-custom/fs-drive.js**
* Removed blank line at the start of 'setFileSystemProperties'.

---

**./fox-custom/net-interface.js**
* New file - Defines object structure for network interfaces.
* Stores hardcoded property values for internal loopback.

---

**./fox-custom/random-values.js**
* Wrote new function 'generateRandomIpSix'
	* Generates random IPv6 addresses.

---

**./fox-api/system-info.js**
* Added requirement for '../fox-custom/net-interface'
* Wrote new function 'getNetworkInterfaceArray'
	* Used to generate random network interfaces.

---

**./service.main.js getHealth**
* 'networkInterfaces' property emulated

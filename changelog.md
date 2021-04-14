# Changelog

**Test Status**
* Started writing emulation for the '/api/admin/health' endpoint.
* Tests Passed: 37 / 60.

---

**./service.main.js**
* Added requirements for:
	* os
	* ./fox-api/device-info
	* ./fox-api/system-info
* Started emulating 'getHealth' functionality.
	* Outstanding properties are blank objects.

---

**./routes/admin.js**
* Wrote emulation for '/health' endpoint.
	* While the endpoint code itself is complete, the emulation for the successful results is not complete yet.

---

**./fox-api/device-info.js**
* New file - Contains device info data.
	* In the original controller, this was read from a separate JSON file.
	* Now it is hard-coded into the emulator.

---

**./fox-api/system-info.js**
* New file - Generates random system info data.
* Currently covers:
	* Time
	* CPU Speed
	* RAM

---

**./fox-custom/random-values.js - New Functions**
* generateRandomGigahertz
	* CPU speed value.
	* Float between 0 and 5.1
	* Rounded to 2 decimal places.
* generateRandomCoreCount
	* Number of CPU cores.
	* Integer between 1 and 16
	* Odd numbers except for 1 will be rounded to even.
	* Assumes each CPU core has only one thread. Things get too complex otherwise.
* generateRandomVolume
	* Amount of bytes. Used for disk or RAM capacity.
	* Ranges from 1GB up to a given amount in gigabytes.
	* Odd gigabyte counts except for 1 will be rounded to even.
	* Final number returned in total number of bytes (1GB = 1000000000 bytes)

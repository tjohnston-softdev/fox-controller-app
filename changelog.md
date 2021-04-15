# Changelog

**./fox-custom/random-values.js**
* chooseRandomElement
	* Renamed 'charIndex' to 'eIndex'
	* Renamed 'hexRes' to 'elementRes'
	* Can now be called publicly as 'generateArrayElement'
* chooseRandomInteger
	* Renamed 'numRes' variable to 'intRes'
	* Can now be called publicly as 'generateInteger'
* chooseRandomFloat
	* New function
	* Randomly chooses a float value between a range.
	* Called publicly as 'generateFloat'
* generateRandomUptime
	* New function
	* Generates system total uptime.
	* This refers to the machine as a whole. Not just the Node JS process.
	* Uses the process uptime as a base.
	* Multiplication ranges from 1.05 to 50.00
	* Final value is rounded to the nearest whole + 3
* generateRandomGigahertz
	* Multiplication factor has been changed from 5.1 to 5.25
* generateRandomUsagePercent
	* New function
	* This generates a percentage value for volume sizes.
	* Uses a range of 0.05 to 0.95

---

**./fox-api/system-info.js getTimeObject**
* 'uptime' is now assigned by calling 'randomValues.generateUptime'
* 'timezoneName' now uses the full name for UTC.

---

**./fox-api/system-info.js getMemoryObject**
* 'buffcache' is now assigned with a random size up to 500MB.
* Variables are now assigned using 'generateUsagePercent'
	* memPercent
	* swapPercent

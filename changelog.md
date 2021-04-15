# Changelog

**./fox-custom/size-factors.js**
* New file - Stores file size unit amounts in bytes.
* Uses a base of 1000.
	* 1000 bytes = 1KB
* Stores values for:
	* Kilobytes
	* Megabytes
	* Gigabytes

---

**./fox-custom/random-values.js generateRandomVolume**
* Added 'unitSize' parameter.
	* This can correspond to any unit.
	* Not just Gigabytes.
* Renamed the 'gigaCount' variable to 'unitCount'
* 'memoryBytes' is now calculated by `unitCount * unitSize`

---

**./fox-api/system-info.js**
* Added requirement for '../fox-custom/size-factors'
* getMemoryObject
	* Updated 'generateVolume' calls to use gigabytes.
	* Future calls to this function will involve other units.

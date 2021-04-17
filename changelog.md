# Changelog

**./fox-custom/random-values.js - New Functions**
* generateRandomNodeID
	* Generates Node ID for alarm database.
	* Format: `[hex]{8}.[hex]{6}`
* generateRandomFlag
	* Generates 0 or 1.
	* Uses base random function.
	* Rounds to nearest whole.

---

**./fox-custom/timestamp-ranges.js**
* Changed "NOW" reference to "Date.now".

---

**./fox-api/alarm-database.js**
* New file.
	* Unlike Remote IO, this is not a database in the traditional sense.
	* It simply emulates the Alarm database for the relevant APIs using JSON objects.
	* Randomly generates 10 - 500 Alarm objects on runtime.
	* Alarm and availability objects have a 1:1 relationship.

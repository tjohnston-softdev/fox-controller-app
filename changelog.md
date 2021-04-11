# Changelog

**Test Status**
* G - Controller Files
	* Device settings tests pass normally.
	* Device class tests pass normally.
	* Index tests remain unchanged.

---

**./fox-devices/_classes/device-model.class.js handlePropertyUpdate**
* Revised IF structure for 'id' property:
	* If non-null, validate required string as normal.
	* Otherwise, set to null without error.

# Changelog

**Test Status**
* G - Controller Files
	* Started writing emulation for 'Connected Device Class' tests.
	* So far, only object type validation is successful.
	* Property type validation fails.

---

**./fox-devices/_classes/device-model.class.js**
* Added notes referring to class SET methods.

---

**./fox-devices/_classes/device.class.js**
* Added requirement for '../../fox-custom/validation-tasks'
* If the input object is not a 'StoredDevice', an error will be displayed.
* Declared new function 'handlePropertyValidation'
	* This will handle property validation.
	* So far, only 'id' is checked.

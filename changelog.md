# Changelog

**Test Status**
* G - Controller Files
	* Device classes are recognized okay.
	* Object base type validation passes.
	* Since property validation is disabled for now, the tests fail.

---

**./fox-devices/_classes/device-model.class.js**
* Commented out property validation from 'deviceType' onwards.
	* Only 'id' remains for now.

---

**./fox-devices/_classes/device.class.js**
* Commented out call to 'handlePropertyValidation'
* Removed `this.storedDevice` assignment.
* 'ConnectedDevice' class only returns a placeholder.
* Commented out call to `validationTasks.readStringProperty`

---

**./fox-custom/validation-tasks.js readStringValueProperty**
* Removed 'inputObj' parameter.
* 'propValue' is now a parameter.

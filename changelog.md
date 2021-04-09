# Changelog

**./fox-devices/_classes/device-model.class.js**
* Removed setter comment.
* Removed property input validation.
	* Only the base type is checked.
	* 'id' property is given a placeholder value.

---

**./fox-devices/_classes/device.class.js**
* Removed 'handlePropertyValidation' function.

---

**./fox-custom/validation-tasks.js - Renamed Functions**
* 'readStringValueProperty' to 'checkStringProperty'
* 'readBooleanValueProperty' to 'checkBooleanProperty'
* 'readNumberValueProperty' to 'checkNumberProperty'
* 'readDeviceTypeValueProperty' to 'checkDeviceTypeProperty'
* 'readReferenceStringValueProperty' to 'checkReferenceStringProperty'
* 'readIpAddressValueProperty' to 'checkIpAddressProperty'

---

**./fox-custom/validation-tasks.js - Function Changes**
* writePropertyTypeError
	* Added new parameter 'vAction'
	* Format: `...in %vClass% during %vAction%`
* checkStringProperty
	* Added new parameter 'actionDesc'.
* checkBooleanProperty, checkNumberProperty
	* Removed 'inputObj' parameter.
	* 'propValue' is now a parameter.
	* Added new parameter 'actionDesc'
* checkDeviceTypeProperty
	* Removed 'inputObj' parameter.
	* 'targetValue' is now a parameter.
* checkReferenceStringProperty
	* Removed 'propValue' parameter.
	* 'targetValue' is now a parameter.
* checkIpAddressProperty
	* Removed 'inputObj' parameter.
	* 'propValue' is now a parameter.


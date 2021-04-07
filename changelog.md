# Changelog

**Test Status**
* F - Controller Models
	* Advantech model testing is still successful after restructure.

---

**./fox-devices/remote_io/model-template.js**
* New file.
	* Contains functions that help with model definition.
	* This is so model object definitions can be shared across all manufacturers.
	* Eliminates redundant code.
* Property changes:
	* 'ioConfigs' starts empty. - Objects created using 'addIoConfigObject'
	* 'readAndWriteDeviceData' uses a placeholder function.
	* 'infoUrl' hard-coded to "/info"
	* 'parseDeviceInfo' uses a placeholder function.
	* 'maker' starts as null. - Set using 'addManufacturerString'

---

**./fox-devices/remote_io/advantech.models.js**
* Added requirement for './model-template'
* Removed 'placeholder' function.
	* Now exists in 'model-template.js'
* 'modelsArray' is now empty to start with.
* Created functions to define individual model objects through 'model-template.js'
	* defineFirstObject
	* defineSecondObject
* Changed the names of the model objects from:
	* "ADVANTECH-1" to "ADV-1"
	* "ADVANTECH-2" to "ADV-2"
* The 'maker' property is now written programmatically for all array objects by calling `modelTemplate.addManufacturer`

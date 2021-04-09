const deviceSettings = require("../device.settings");
const rioSettings = require("../remote_io/remote_io.settings");
const validationTasks = require("../../fox-custom/validation-tasks");


class StoredDevice
{
	constructor(inputDeviceObj)
	{
		validationTasks.checkBaseObject(inputDeviceObj, "device");
		this.id = "123";
		return this;
	}
}

module.exports =
{
	StoredDevice: StoredDevice
};
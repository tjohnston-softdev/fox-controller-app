const deviceSettings = require("../device.settings");
const rioSettings = require("../remote_io/remote_io.settings");
const validationTasks = require("../../fox-custom/validation-tasks");


class StoredDevice
{
	constructor(inputDeviceObj)
	{
		validationTasks.checkBaseObject(inputDeviceObj, "device");
		
		this.id = validationTasks.readStringProperty(inputDeviceObj, "id", null, this.constructor.name);
		this.deviceType = validationTasks.readDeviceTypeProperty(inputDeviceObj, "deviceType", deviceSettings.deviceType.remoteIo);
		this.maker = validationTasks.readReferenceStringProperty(inputDeviceObj, "maker", deviceSettings.listRioMakers);
		this.model = validationTasks.readReferenceStringProperty(inputDeviceObj, "model", deviceSettings.listRioModelTypes);
		this.name = validationTasks.readStringProperty(inputDeviceObj, "name", null, this.constructor.name);
		this.desc = validationTasks.readStringProperty(inputDeviceObj, "desc", "", this.constructor.name);
		this.ipAddress = validationTasks.readIpAddressProperty(inputDeviceObj, "ipAddress");
		this.username = validationTasks.readStringProperty(inputDeviceObj, "username", "", this.constructor.name);
		this.password = validationTasks.readStringProperty(inputDeviceObj, "password", "", this.constructor.name);
		this.isEnabled = validationTasks.readBooleanProperty(inputDeviceObj, "isEnabled", null, this.constructor.name);
		this.macAddress = validationTasks.readStringProperty(inputDeviceObj, "macAddress", null, this.constructor.name);
		this.isDeleted = validationTasks.readBooleanProperty(inputDeviceObj, "isDeleted", false, this.constructor.name);
		this['__modified'] = validationTasks.readNumberProperty(inputDeviceObj, "__modified", 0, this.constructor.name);
		
		return this;
	}
}


/*
	set id(value)
	{
		if (typeof value !== "string")
		{
			throw new Error("Meow");
		}
	}
*/


module.exports =
{
	StoredDevice: StoredDevice
};
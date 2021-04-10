const deviceSettings = require("../device.settings");
const rioSettings = require("../remote_io/remote_io.settings");
const validationTasks = require("../../fox-custom/validation-tasks");


class StoredDevice
{
	constructor(inputDeviceObj)
	{
		var conName = this.constructor.name;
		var validContext = "construction";
		var resultObject = null;
		
		validationTasks.checkBaseObject(inputDeviceObj, "device");
		this.id = validationTasks.checkStringProp("id", inputDeviceObj.id, null, conName, validContext);
		this.deviceType = validationTasks.checkDeviceTypeProp("deviceType", inputDeviceObj.deviceType, deviceSettings.deviceType.remoteIo);
		this.maker = validationTasks.checkReferenceStringProp("maker", inputDeviceObj.maker, deviceSettings.listRioMakers);
		this.model = validationTasks.checkReferenceStringProp("model", inputDeviceObj.model, deviceSettings.listRioModelTypes);
		this.name = validationTasks.checkStringProp("name", inputDeviceObj.name, null, conName, validContext);
		this.desc = validationTasks.checkStringProp("desc", inputDeviceObj.desc, "", conName, validContext);
		this.ipAddress = validationTasks.checkIpAddressProp("ipAddress", inputDeviceObj.ipAddress);
		this.username = validationTasks.checkStringProp("username", inputDeviceObj.username, "", conName, validContext);
		this.password = validationTasks.checkStringProp("password", inputDeviceObj.password, "", conName, validContext);
		this.isEnabled = validationTasks.checkBooleanProp("isEnabled", inputDeviceObj.isEnabled, null, conName, validContext);
		this.macAddress = validationTasks.checkStringProp("macAddress", inputDeviceObj.macAddress, null, conName, validContext);
		this.isDeleted = validationTasks.checkBooleanProp("isDeleted", inputDeviceObj.isDeleted, false, conName, validContext);
		this.__modified = validationTasks.checkNumberProp("__modified", inputDeviceObj.__modified, 0, conName, validContext);
		
		resultObject = new Proxy(this,
		{
			set: handlePropertyUpdate
		});
		
		return resultObject;
	}
}



function handlePropertyUpdate(pObject, updKey, updValue)
{
	if (updKey === "id" || updKey === "deviceType" || updKey === "name" || updKey === "ipAddress" || updKey === "macAddress")
	{
		pObject[updKey] = validationTasks.checkStringProp(updKey, updValue, null, "StoredDevice", "setting");
	}
	else if (updKey === "maker" || updKey === "model")
	{
		pObject[updKey] = validationTasks.checkStringProp(updKey, updValue, null, "StoredDevice", "setting");
	}
	else if (updKey === "isEnabled" || updKey === "isDeleted")
	{
		pObject[updKey] = validationTasks.checkBooleanProp(updKey, updValue, null, "StoredDevice", "setting");
	}
	else if (updKey === "__modified")
	{
		pObject[updKey] = validationTasks.checkNumberProp(updKey, updValue, 0, "StoredDevice", "setting");
	}
	else
	{
		pObject[updKey] = validationTasks.checkStringProp(updKey, updValue, "", "StoredDevice", "setting");
	}
	
	return true;
}

module.exports =
{
	StoredDevice: StoredDevice
};
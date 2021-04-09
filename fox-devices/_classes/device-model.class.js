const deviceSettings = require("../device.settings");
const rioSettings = require("../remote_io/remote_io.settings");
const validationTasks = require("../../fox-custom/validation-tasks");


class StoredDevice
{
	constructor(inputDeviceObj)
	{
		var conName = this.constructor.name;
		var validContext = "construction";
		
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
		
		return getUpdateObject(this);
	}
}


function getUpdateObject(cObject)
{
	var updateRes = new Proxy(cObject,
	{
		set: handlePropertyUpdate
	});
	
	return updateRes;
}



function handlePropertyUpdate(parentObject, updKey, updValue)
{
	if (updKey === "id" || updKey === "deviceType" || updKey === "name" || updKey === "ipAddress" || updKey === "macAddress")
	{
		parentObject[updKey] = validationTasks.checkStringProp(updKey, updValue, null, "StoredDevice", "setting");
	}
	else if (updKey === "maker" || updKey === "model")
	{
		parentObject[updKey] = validationTasks.checkStringProp(updKey, updValue, null, "StoredDevice", "setting");
	}
	else if (updKey === "isEnabled" || updKey === "isDeleted")
	{
		parentObject[updKey] = validationTasks.checkBooleanProp(updKey, updValue, null, "StoredDevice", "setting");
	}
	else if (updKey === "__modified")
	{
		parentObject[updKey] = validationTasks.checkNumberProp(updKey, updValue, 0, "StoredDevice", "setting");
	}
	else
	{
		parentObject[updKey] = validationTasks.checkStringProp(updKey, updValue, "", "StoredDevice", "setting");
	}
	
	return true;
}

module.exports =
{
	StoredDevice: StoredDevice
};
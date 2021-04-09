const modelClasses = require("./device-model.class");
const deviceSettings = require("../device.settings");
const rioSettings = require("../remote_io/remote_io.settings");
const validationTasks = require("../../fox-custom/validation-tasks");

function defineConnectedDevice(storedDeviceObject)
{
	
	class ConnectedDevice
	{
		constructor(storeDeviceObj)
		{
			handleClassType(storeDeviceObj);
			handleModel(storeDeviceObj.model);
			this.storedDevice = storeDeviceObj;
			return this;
		}
	};
	
	return new ConnectedDevice(storedDeviceObject);
}



function handleClassType(_storedDevice)
{
	var handleRes = false;
	
	if (_storedDevice instanceof modelClasses.StoredDevice)
	{
		handleRes = true;
	}
	else
	{
		throw new Error("_storedDevice must be instance of StoredDevice");
	}
}


function handleModel(mName)
{
	var retrievedEntry = deviceSettings.getModel(mName);
	var resType = typeof retrievedEntry;
	var handleRes = false;
	var flaggedMessage = "";
	
	if (retrievedEntry !== undefined && retrievedEntry !== null && resType === "object")
	{
		handleRes = true;
	}
	else
	{
		flaggedMessage = mName + " is not supported yet!";
		throw new Error(flaggedMessage);
	}
}



module.exports =
{
	ConnectedDevice: defineConnectedDevice
};
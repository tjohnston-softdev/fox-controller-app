const rioSettings = require("./remote_io.settings");
const deviceClass = require("../_classes/device.class");
const modelClass = require("../_classes/device-model.class");


function createRemoteIoModule(inputObject)
{
	var storedDeviceObject = new modelClass.StoredDevice(inputObject);
	var prepRes = {};
	
	prepRes.maker = storedDeviceObject.maker;
	prepRes.ipAddress = storedDeviceObject.ipAddress;
	prepRes.disableRio = factoryPlaceholder;
	prepRes.getRioDeviceProperties = factoryPlaceholder;
	prepRes.registerNodeCallback = factoryPlaceholder;
	prepRes.setOutputFromNode = factoryPlaceholder;
	prepRes.getCommsErrors = factoryPlaceholder;
	
	return prepRes;
}


function factoryPlaceholder()
{
	return true;
}


module.exports =
{
	RemoteIoModule: createRemoteIoModule
};
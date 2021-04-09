const rioSettings = require("./remote_io.settings");
const deviceClass = require("../_classes/device.class");
const modelClass = require("../_classes/device-model.class");


function createRemoteIoModule(inputObject)
{
	var storedDeviceObject = new modelClass.StoredDevice(inputObject);
	var prepRes = {};
	
	prepRes.maker = storedDeviceObject.maker;
	prepRes.ipAddress = storedDeviceObject.ipAddress;
	prepRes.disableRio = remoteIoPlaceholder;
	prepRes.getRioDeviceProperties = remoteIoPlaceholder;
	prepRes.registerNodeCallback = remoteIoPlaceholder;
	prepRes.setOutputFromNode = remoteIoPlaceholder;
	prepRes.getCommsErrors = remoteIoPlaceholder;
	
	return prepRes;
}


function remoteIoPlaceholder()
{
	return true;
}


module.exports =
{
	RemoteIoModule: createRemoteIoModule
};
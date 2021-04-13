const rioSettings = require("./remote_io.settings");
const deviceClass = require("../_classes/device.class");
const modelClass = require("../_classes/device-model.class");


function createRemoteIoModule(inputObject)
{
	var storedDeviceObject = new modelClass.StoredDevice(inputObject);
	var connectedDeviceObject = deviceClass.ConnectedDevice(storedDeviceObject);
	var prepRes = {};
	
	
	function disableRemoteIo()
	{
		var disabled = true;
		return disabled;
	}
	
	
	function getRemoteIoDeviceProperties()
	{
		var retrievedProperties = connectedDeviceObject.getRioProperties();
		return retrievedProperties;
	}
	
	function registerRemoteIoNodeCallback()
	{
		// Todo
		return true;
	}
	
	
	function setRemoteIoOutput()
	{
		// Todo
		return true;
	}
	
	
	function getCommunicationErrors()
	{
		// Todo
		return true;
	}
	
	
	prepRes.disableRio = disableRemoteIo;
	prepRes.getRioDeviceProperties = getRemoteIoDeviceProperties;
	prepRes.registerNodeCallback = registerRemoteIoNodeCallback;
	prepRes.setOutputFromNode = setRemoteIoOutput;
	prepRes.getCommsErrors = getCommunicationErrors;
	
	return prepRes;
}


module.exports =
{
	RemoteIoModule: createRemoteIoModule
};
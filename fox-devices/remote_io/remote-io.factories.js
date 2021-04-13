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
	
	function registerRemoteIoNodeCallback(inputType, inputObject, registerCallback)
	{
		var ioSet = inputObject.ioSetId;
		var parsedPrefix = rioSettings.parseIoPrefix(ioSet);
		var parsedIndex = rioSettings.parseIoIndex(ioSet);
		
		var retrievedIoSet = undefined;
		var flaggedMessage = "";
		
		var registerFunction = function(){};
		
		if (parsedPrefix !== null && parsedIndex !== null)
		{
			retrievedIoSet = connectedDeviceObject.getIoContainer(parsedPrefix);
		}
		else
		{
			flaggedMessage = "Wrong ioPrefix or ioIndex in nodeConfig.ioSetId = " + ioSet;
			registerCallback(flaggedMessage);
		}
		
		if (retrievedIoSet !== undefined)
		{
			registerFunction = function unregisterNode(){};
		}
		
		return registerFunction;
	}
	
	
	function setRemoteIoOutput()
	{
		return true;
	}
	
	
	function getCommunicationErrors()
	{
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
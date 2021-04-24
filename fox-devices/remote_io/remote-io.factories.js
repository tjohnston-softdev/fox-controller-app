/*
	Remote IO Factories
	Original FOX Controller file.
*/


const rioSettings = require("./remote_io.settings");
const deviceClass = require("../_classes/device.class");
const modelClass = require("../_classes/device-model.class");


// Main function.
function createRemoteIoModule(inputObject)
{
	var storedDeviceObject = null;
	var connectedDeviceObject = null;
	var prepRes = {};
	
	// Create class objects from input.
	storedDeviceObject = new modelClass.StoredDevice(inputObject);
	connectedDeviceObject = deviceClass.ConnectedDevice(storedDeviceObject);
	
	
	// Disable Remote IO.
	function disableRemoteIo()
	{
		return true;
	}
	
	
	// Get Remote IO Properties.
	function getRemoteIoDeviceProperties()
	{
		var retrievedProperties = connectedDeviceObject.getRioProperties();
		return retrievedProperties;
	}
	
	
	// Register Remote IO Callback.
	function registerRemoteIoNodeCallback(inputType, inputObject, registerCallback)
	{
		var ioSet = "";
		var parsedPrefix = "";
		var parsedIndex = -1;
		var retrievedIoSet = undefined;
		var flaggedMessage = "";
		var registerFunction = null;
		
		// Read and validate Remote IO string.
		ioSet = inputObject.ioSetId;
		parsedPrefix = rioSettings.parseIoPrefix(ioSet);
		parsedIndex = rioSettings.parseIoIndex(ioSet);
		
		
		// Base function.
		registerFunction = function(){};
		
		
		
		if (parsedPrefix !== null && parsedIndex !== null)
		{
			// Input valid - Retrieve IO container object.
			retrievedIoSet = connectedDeviceObject.getIoContainer(parsedPrefix);
		}
		else
		{
			// Input error.
			flaggedMessage = "Wrong ioPrefix or ioIndex in nodeConfig.ioSetId = " + ioSet;
			registerCallback(flaggedMessage);
		}
		
		
		if (retrievedIoSet !== undefined)
		{
			// Unregister function set.
			registerFunction = function unregisterNode(){};
		}
		
		return registerFunction;
	}
	
	
	// Set Remote IO Output.
	function setRemoteIoOutput()
	{
		return true;
	}
	
	
	// Get Communication Errors.
	function getCommunicationErrors()
	{
		return true;
	}
	
	
	// Set factory properties.
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
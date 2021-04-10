const deviceModelClass = require("../_classes/device-model.class");
const deviceSettings = require("../device.settings");
const rioFactories = require('./remote-io.factories');
const databaseLibrary = require("../../databases/device.database");
const remoteIoDatabase = databaseLibrary("remote-io.db");

var initializationCallbacks = [];
var initializationComplete = false;
var runningIoDevices = [];



function initializeRemoteIoFactory()
{
	remoteIoDatabase.listDevices(function (listErr, listDevices)
	{
		if (listErr !== null)
		{
			console.log(listErr.message);
		}
		
		runInitializationLoop(listDevices);
		initializationComplete = true;
		runCallbackLoop();
	});
}


function whenInitializationComplete(intlCompCallback)
{
	if (initializationComplete === true)
	{
		return intlCompCallback();
	}
	else
	{
		initializationCallbacks.push(intlCompCallback);
	}
}



function crudListRemoteIoDevices(crudCallback)
{
	remoteIoDatabase.listDevices(function (listErr, listDevices)
	{
		if (listErr !== null)
		{
			return crudCallback(listErr, undefined);
		}
		else
		{
			return crudCallback(null, listDevices);
		}
	});
}


function runInitializationLoop(deviceArray)
{
	var deviceIndex = 0;
	var currentDevice = {};
	var currentModule = null;
	
	for (deviceIndex = 0; deviceIndex < deviceArray.length; deviceIndex = deviceIndex + 1)
	{
		currentDevice = deviceArray[deviceIndex];
		currentModule = new deviceModelClass.StoredDevice(currentDevice);
		
		if (currentDevice.isEnabled === true && currentModule !== undefined)
		{
			runningIoDevices[currentDevice.id] = currentModule;
		}
	}
}


function runCallbackLoop()
{
	var callbackIndex = 0;
	var currentCallback = null;
	
	for (callbackIndex = 0; callbackIndex < initializationCallbacks.length; callbackIndex = callbackIndex + 1)
	{
		currentCallback = initializationCallbacks[callbackIndex];
		currentCallback();
	}
}




module.exports =
{
	initRemoteIoFactory: initializeRemoteIoFactory,
	whenInitCompleted: whenInitializationComplete,
	listRemoteIoDevices: crudListRemoteIoDevices
};
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


function crudGetRemoteIoDevice(deviceTargetID, crudCallback)
{
	remoteIoDatabase.readDeviceEntity(deviceTargetID, function (getDeviceErr, getDeviceRes)
	{
		if (getDeviceErr !== null)
		{
			return crudCallback(getDeviceErr, null);
		}
		else
		{
			return crudCallback(null, getDeviceRes);
		}
	});
}


function crudAddRemoteIoDevice(newDeviceObject, crudCallback)
{
	// Todo
	handleRioInputType(newDeviceObject, crudCallback);
	newDeviceObject.id = "Example";
	return crudCallback(null, true);
}


function crudUpdateRemoteIoDevice(updatedDeviceObject, crudCallback)
{
	// Todo
	return crudCallback(null, true);
}


function crudDeleteRemoteIoDevice(deviceTargetID, deletePermanent, crudCallback)
{
	// Todo
	return crudCallback(null, true);
}


function getRemoteIoStatus(deviceTargetID)
{
	// Todo
	return {};
}


function programListRemoteIoDevices(targetManufacturer, listCallback)
{
	// Todo
	return listCallback(null, []);
}


function programCheckNodeExists(deviceTargetID)
{
	// Todo
	return true;
}


function programRegisterNode(ioType, nodeConfig, registerCallback)
{
	// Todo
	return registerCallback(null, {});
}


function programSetDeviceOutput(deviceTargetID, ioPrefix, ioIndex, outputValue)
{
	// Todo
	return {};
}


function programGetIoProperties(deviceTargetID)
{
	// Todo
	return {};
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


function handleRioInputType(inpValue, errorCallback)
{
	var givenType = typeof inpValue;
	var correctType = false;
	var flaggedMessage = "";
	
	if (inpValue !== undefined && inpValue !== null && givenType === "object")
	{
		correctType = true;
	}
	else
	{
		flaggedMessage = "Must be an object: " + inpValue;
		return errorCallback(new Error(flaggedMessage), null);
	}
}


function handleRioMissingID(inpObject, errorCallback)
{
	if (typeof inpObject.id !== "string")
	{
		return errorCallback(new Error("ID property missing!"), null);
	}
}



module.exports =
{
	initRemoteIoFactory: initializeRemoteIoFactory,
	whenInitCompleted: whenInitializationComplete,
	listRemoteIoDevices: crudListRemoteIoDevices,
	addRemoteIoDevice: crudAddRemoteIoDevice,
	getRemoteIoDevice: crudGetRemoteIoDevice,
	modRemoteIoDevice: crudUpdateRemoteIoDevice,
	delRemoteIoDevice: crudDeleteRemoteIoDevice,
	getRioDeviceStatus: getRemoteIoStatus,
	listRiosForNode: programListRemoteIoDevices,
	isNodeExists: programCheckNodeExists,
	registerNode: programRegisterNode,
	setDeviceOutput: programSetDeviceOutput,
	getIoProperties: programGetIoProperties
};
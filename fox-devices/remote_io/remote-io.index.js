/*
	Remote IO Index
	Used to interact with Remote IO database.
	Original FOX Controller file.
*/


const deviceModelClass = require("../_classes/device-model.class");
const deviceSettings = require("../device.settings");
const rioFactories = require('./remote-io.factories');
const databaseLibrary = require("../../databases/device.database");
const rioIntl = require("../../fox-custom/rio-intl");
const rioAddNew = require("../../fox-rio-modify/rm-add-new");
const rioUpdateExisting = require("../../fox-rio-modify/rm-update-existing");
const rioDeleteExisting = require("../../fox-rio-modify/rm-delete-existing");
const rioProgram = require("../../fox-custom/rio-program");
const remoteIoDatabase = databaseLibrary("remote-io.db");

// Global variables.
var initializationCallbacks = [];
var initializationComplete = false;
var runningIoDevices = [];


// Initialize Remote IO.
function initializeRemoteIoFactory()
{
	// Retrieve existing devices.
	remoteIoDatabase.listDevices(function (listErr, listDevices)
	{
		// Initialize device objects.
		rioIntl.runInitializationLoop(listDevices, runningIoDevices);
		initializationComplete = true;
		rioIntl.runCallbackLoop(initializationCallbacks);
	});
}


// When initialization complete.
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


// List Remote IO Devices.
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


// Get Device.
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


// Add Device.
function crudAddRemoteIoDevice(inpDeviceObject, crudCallback)
{
	rioAddNew.addEntry(inpDeviceObject, remoteIoDatabase, runningIoDevices, crudCallback);
}


// Update device.
function crudUpdateRemoteIoDevice(updatedDeviceObject, crudCallback)
{
	rioUpdateExisting.updateEntry(updatedDeviceObject, remoteIoDatabase, runningIoDevices, crudCallback);
}


// Delete device.
function crudDeleteRemoteIoDevice(deviceTargetID, deletePermanent, crudCallback)
{
	rioDeleteExisting.deleteEntry(deviceTargetID, deletePermanent, remoteIoDatabase, runningIoDevices, crudCallback);
}


// Get Remote IO status from device ID.
function getRemoteIoStatus(deviceTargetID)
{
	var statusRes = {};
	
	statusRes["id"] = deviceTargetID;
	statusRes["isRunning"] = rioProgram.checkDeviceRunning(deviceTargetID, runningIoDevices);
	statusRes["commsErrors"] = [];
	
	return statusRes;
}


// Get devices by manufacturer.
function programListRemoteIoDevices(targetManufacturer, listCallback)
{
	var targetDevices = [];
	
	crudListRemoteIoDevices(function (programListErr, programListRes)
	{
		if (programListErr !== null)
		{
			return listCallback(programListErr, null);
		}
		else
		{
			targetDevices = rioProgram.filterDevicesByManufacturer(targetManufacturer, programListRes);
			return listCallback(null, targetDevices);
		}
	});
}


// Check device running.
function programCheckNodeExists(deviceTargetID)
{
	var existRes = rioProgram.checkDeviceRunning(deviceTargetID, runningIoDevices);
	return existRes;
}


// Register Remote IO device.
function programRegisterNode(ioType, nodeConfig, registerCallback)
{
	var targetExists = rioProgram.checkDeviceRunning(nodeConfig.deviceId, runningIoDevices);
	var targetObject = null;
	var flaggedMessage = "";
	
	if (targetExists === true)
	{
		// Device is running - Return register function.
		targetObject = runningIoDevices[nodeConfig.deviceId];
		return targetObject.registerNodeCallback(ioType, nodeConfig, registerCallback);
	}
	else
	{
		// Device is not running - Return error.
		flaggedMessage = rioProgram.getUnknownModuleError();
		return registerCallback(new Error(flaggedMessage), undefined);
	}
}


// Set Device Output
function programSetDeviceOutput(deviceTargetID, ioPrefix, ioIndex, outputValue)
{
	return undefined;
}


// Get Remote IO properties from device.
function programGetIoProperties(deviceTargetID)
{
	var targetObject = runningIoDevices[deviceTargetID];
	var progPropsRes = targetObject.getRioDeviceProperties();
	return progPropsRes;
}



// Close Remote IO database.
function closeRemoteIoDatabase(closeRioCallback)
{
	remoteIoDatabase.closeDatabase(closeRioCallback);
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
	getIoProperties: programGetIoProperties,
	closeRioDatabase: closeRemoteIoDatabase
};
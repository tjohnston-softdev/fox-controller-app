const deviceModelClass = require("../_classes/device-model.class");
const deviceSettings = require("../device.settings");
const rioFactories = require('./remote-io.factories');
const databaseLibrary = require("../../databases/device.database");
const rioIntl = require("../../fox-custom/rio-intl");
const rioModify = require("../../fox-custom/rio-modify");
const rioProgram = require("../../fox-custom/rio-program");
const remoteIoDatabase = databaseLibrary("remote-io.db");

var initializationCallbacks = [];
var initializationComplete = false;
var runningIoDevices = [];


function initializeRemoteIoFactory()
{
	remoteIoDatabase.listDevices(function (listErr, listDevices)
	{
		rioIntl.runInitializationLoop(listDevices, runningIoDevices);
		initializationComplete = true;
		rioIntl.runCallbackLoop(initializationCallbacks);
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


function crudAddRemoteIoDevice(inpDeviceObject, crudCallback)
{
	rioModify.addNewDevice(inpDeviceObject, remoteIoDatabase, runningIoDevices, crudCallback);
}


function crudUpdateRemoteIoDevice(updatedDeviceObject, crudCallback)
{
	rioModify.updateExistingDevice(updatedDeviceObject, remoteIoDatabase, runningIoDevices, crudCallback);
}


function crudDeleteRemoteIoDevice(deviceTargetID, deletePermanent, crudCallback)
{
	rioModify.deleteDevice(deviceTargetID, deletePermanent, remoteIoDatabase, runningIoDevices, crudCallback);
}


function getRemoteIoStatus(deviceTargetID)
{
	var statusRes = {};
	
	statusRes["id"] = deviceTargetID;
	statusRes["isRunning"] = rioProgram.checkDeviceRunning(deviceTargetID, runningIoDevices);
	statusRes["commsErrors"] = [];
	
	return statusRes;
}


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


function programCheckNodeExists(deviceTargetID)
{
	var existRes = rioProgram.checkDeviceRunning(deviceTargetID, runningIoDevices);
	return existRes;
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
	var targetRunning = rioProgram.checkDeviceRunning(deviceTargetID, runningIoDevices);
	var targetObject = null;
	var progPropsRes = {};
	
	if (targetRunning === true)
	{
		targetObject = runningIoDevices[deviceTargetID];
		progPropsRes = targetObject.getRioDeviceProperties();
	}
	
	return progPropsRes;
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
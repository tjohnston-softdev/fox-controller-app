const deviceModelClass = require("../_classes/device-model.class");
const deviceSettings = require("../device.settings");
const rioFactories = require('./remote-io.factories');
const databaseLibrary = require("../../databases/device.database");
const rioIntl = require("../../fox-custom/rio-intl");
const rioModify = require("../../fox-custom/rio-modify");
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
	var statusRes = {id: deviceTargetID, isRunning: false, commsErrors: []};
	var deviceObject = runningIoDevices[deviceTargetID];
	var elementType = typeof deviceObject;
	
	if (deviceObject !== undefined && deviceObject !== null && elementType === "object")
	{
		statusRes.isRunning = true;
	}
	
	return statusRes;
}


function programListRemoteIoDevices(targetManufacturer, listCallback)
{
	// Todo
	return listCallback(null, []);
}


function programCheckNodeExists(existTargetID)
{
	var statusObject = getRemoteIoStatus(existTargetID);
	var existRes = statusObject.isRunning;
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
	return {};
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
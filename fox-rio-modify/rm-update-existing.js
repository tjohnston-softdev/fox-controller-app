const series = require("run-series");
const rioEntryHelp = require("../fox-custom/rio-entry-help");
const rioDeviceStatus = require("../fox-custom/rio-device-status");


function updateExistingDeviceEntry(updatedDeviceObj, rioDatabase, runDeviceList, updateExistingCallback)
{
	series(
	[
		rioEntryHelp.checkInputType.bind(null, updatedDeviceObj),
		rioEntryHelp.checkMissingID.bind(null, updatedDeviceObj),
		rioDatabase.readDeviceEntity.bind(null, updatedDeviceObj.id)
	],
	function (existDeviceErr, existDeviceRes)
	{
		if (existDeviceErr !== null)
		{
			return updateExistingCallback(existDeviceErr, null);
		}
		else
		{
			handleUpdateCreation(updatedDeviceObj, rioDatabase, runDeviceList, updateExistingCallback);
		}
	});
}


function handleUpdateCreation(updatedDevice, rioDbaseObject, runDevices, entryCreationCallback)
{
	var modifiedStoredDevice = rioEntryHelp.createStoredDevice(updatedDevice);
	
	rioEntryHelp.checkCreationSuccessful(modifiedStoredDevice, function (eCreateErr, eCreateRes)
	{
		if (eCreateErr !== null)
		{
			return entryCreationCallback(eCreateErr, null);
		}
		else
		{
			saveDeviceChanges(updatedDevice.id, modifiedStoredDevice.modelObject, rioDbaseObject, runDevices, entryCreationCallback);
		}
	});
}


function saveDeviceChanges(newIdString, newDataObject, rioDbaseObj, runDevListObject, saveCallback)
{
	rioDbaseObj.updateDeviceEntity(newIdString, newDataObject, function (saveChangeErr, saveChangeRes)
	{
		if (saveChangeErr !== null)
		{
			return saveCallback(saveChangeErr, null);
		}
		else if (newDataObject.isEnabled === true)
		{
			rioDeviceStatus.disableDevice(newIdString, runDevListObject);
			rioDeviceStatus.enableDevice(newIdString, rioDbaseObj, runDevListObject, saveCallback);
		}
		else
		{
			rioDeviceStatus.disableDevice(newIdString, runDevListObject);
			return saveCallback(null, newIdString);
		}
	});
}




module.exports =
{
	updateEntry: updateExistingDeviceEntry
};
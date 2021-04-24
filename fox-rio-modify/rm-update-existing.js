// Script updates existing Remote IO device in database.

const series = require("run-series");
const rioEntryHelp = require("../fox-custom/rio-entry-help");
const rioDeviceStatus = require("../fox-custom/rio-device-status");



// Main function.
function updateExistingDeviceEntry(updatedDeviceObj, rioDatabase, runDeviceList, updateExistingCallback)
{
	// Validate input
	series(
	[
		rioEntryHelp.checkInputType.bind(null, updatedDeviceObj),
		rioEntryHelp.checkMissingID.bind(null, updatedDeviceObj),
		rioDatabase.readDeviceEntity.bind(null, updatedDeviceObj.id)
	],
	function (existDeviceErr, existDeviceRes)
	{
		// Validation complete.
		if (existDeviceErr !== null)
		{
			// Error.
			return updateExistingCallback(existDeviceErr, null);
		}
		else
		{
			// Successful.
			handleUpdateCreation(updatedDeviceObj, rioDatabase, runDeviceList, updateExistingCallback);
		}
	});
}





// Prepare update input.
function handleUpdateCreation(updatedDevice, rioDbaseObject, runDevices, entryCreationCallback)
{
	var modifiedStoredDevice = rioEntryHelp.createStoredDevice(updatedDevice);
	
	rioEntryHelp.checkCreationSuccessful(modifiedStoredDevice, function (eCreateErr, eCreateRes)
	{
		if (eCreateErr !== null)
		{
			// Error.
			return entryCreationCallback(eCreateErr, null);
		}
		else
		{
			// Successful.
			saveDeviceChanges(updatedDevice.id, modifiedStoredDevice.modelObject, rioDbaseObject, runDevices, entryCreationCallback);
		}
	});
}


// Save device changes.
function saveDeviceChanges(newIdString, newDataObject, rioDbaseObj, runDevListObject, saveCallback)
{
	// Call UPDATE.
	rioDbaseObj.updateDeviceEntity(newIdString, newDataObject, function (saveChangeErr, saveChangeRes)
	{
		if (saveChangeErr !== null)
		{
			// Update error.
			return saveCallback(saveChangeErr, null);
		}
		else if (newDataObject.isEnabled === true)
		{
			// Refresh device.
			rioDeviceStatus.disableDevice(newIdString, runDevListObject);
			rioDeviceStatus.enableDevice(newIdString, rioDbaseObj, runDevListObject, saveCallback);
		}
		else
		{
			// Disable device.
			rioDeviceStatus.disableDevice(newIdString, runDevListObject);
			return saveCallback(null, newIdString);
		}
	});
}




module.exports =
{
	updateEntry: updateExistingDeviceEntry
};
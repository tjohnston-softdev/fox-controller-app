// Script adds Remote IO device to database.


const rioEntryHelp = require("../fox-custom/rio-entry-help");
const rioDeviceStatus = require("../fox-custom/rio-device-status");


// Main function.
function addNewDeviceEntry(inpDeviceObj, rioDatabase, runDeviceList, addNewCallback)
{
	// Validate input.
	rioEntryHelp.checkInputType(inpDeviceObj, function (inpTypeErr, inpTypeRes)
	{
		if (inpTypeErr !== null)
		{
			// Input error.
			return addNewCallback(inpTypeErr, null);
		}
		else
		{
			// Prepare input.
			rioEntryHelp.setMaker(inpDeviceObj);
			handleDeviceEntryCreation(inpDeviceObj, rioDatabase, runDeviceList, addNewCallback);
		}
	});
}



// Prepare database entry input.
function handleDeviceEntryCreation(inpDevice, rioDbaseObject, runDevices, entryCreationCallback)
{
	var newStoredDevice = rioEntryHelp.createStoredDevice(inpDevice);
	
	rioEntryHelp.checkCreationSuccessful(newStoredDevice, function(eCreateErr, eCreateRes)
	{
		if (eCreateErr !== null)
		{
			// Error
			return entryCreationCallback(eCreateErr, null);
		}
		else
		{
			// Preperation successful.
			insertNewDeviceObject(inpDevice, newStoredDevice.modelObject, rioDbaseObject, runDevices, entryCreationCallback);
		}
	});
}


// Insert entry into database.
function insertNewDeviceObject(origInput, prepInput, rioDbaseObj, runDevListObject, insertNewCallback)
{	
	rioDbaseObj.createDeviceEntity(prepInput, function (insertEntryErr, insertEntryRes)
	{
		if (insertEntryErr !== null)
		{
			// Insert error.
			return insertNewCallback(insertEntryErr, null);
		}
		else if (prepInput.isEnabled === true)
		{
			// Enable new device.
			rioDeviceStatus.enableDevice(insertEntryRes, rioDbaseObj, runDevListObject, insertNewCallback);
		}
		else
		{
			// Success without enable.
			return insertNewCallback(null, insertEntryRes);
		}
	});
}



module.exports =
{
	addEntry: addNewDeviceEntry
};
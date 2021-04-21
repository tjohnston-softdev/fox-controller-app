const rioEntryHelp = require("../fox-custom/rio-entry-help");
const rioDeviceStatus = require("../fox-custom/rio-device-status");

function addNewDeviceEntry(inpDeviceObj, rioDatabase, runDeviceList, addNewCallback)
{
	rioEntryHelp.checkInputType(inpDeviceObj, function (inpTypeErr, inpTypeRes)
	{
		if (inpTypeErr !== null)
		{
			return addNewCallback(inpTypeErr, null);
		}
		else
		{
			handleDeviceEntryCreation(inpDeviceObj, rioDatabase, runDeviceList, addNewCallback);
		}
	});
}


function handleDeviceEntryCreation(inpDevice, rioDbaseObject, runDevices, entryCreationCallback)
{
	var newStoredDevice = rioEntryHelp.createStoredDevice(inpDevice);
	
	rioEntryHelp.checkCreationSuccessful(newStoredDevice, function(eCreateErr, eCreateRes)
	{
		if (eCreateErr !== null)
		{
			return entryCreationCallback(eCreateErr, null);
		}
		else
		{
			insertNewDeviceObject(inpDevice, newStoredDevice.modelObject, rioDbaseObject, runDevices, entryCreationCallback);
		}
	});
}


function insertNewDeviceObject(origInput, prepInput, rioDbaseObj, runDevListObject, insertNewCallback)
{
	rioEntryHelp.setMaker(origInput);
	
	rioDbaseObj.createDeviceEntity(prepInput, function (insertEntryErr, insertEntryRes)
	{
		if (insertEntryErr !== null)
		{
			return insertNewCallback(insertEntryErr, null);
		}
		else if (prepInput.isEnabled === true)
		{
			rioDeviceStatus.enableDevice(insertEntryRes, rioDbaseObj, runDevListObject, insertNewCallback);
		}
		else
		{
			return insertNewCallback(null, insertEntryRes);
		}
	});
}



module.exports =
{
	addEntry: addNewDeviceEntry
};
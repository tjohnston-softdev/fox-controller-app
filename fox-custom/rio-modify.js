const deviceModelClass = require("../fox-devices/_classes/device-model.class");
const deviceSettings = require("../fox-devices/device.settings");



function addNewDeviceEntry(inpDeviceObj, rioDatabase, runDeviceList, addNewCallback)
{
	var newStoredDevice = null;
	
	checkRioInputType(inpDeviceObj, addNewCallback);
	inpDeviceObj.id = "Example";
	setRioMakerProperty(inpDeviceObj);
	newStoredDevice = createStoredDeviceObject(inpDeviceObj);
	checkStoredDeviceCreationSuccessful(newStoredDevice, addNewCallback);
	
	rioDatabase.createDeviceEntity(newStoredDevice.object, function (addDeviceErr, addDeviceRes)
	{
		if (addDeviceErr !== null)
		{
			return addNewCallback(addDeviceErr, null);
		}
		else
		{
			return addNewCallback(null, addDeviceRes);
		}
	});
}



function updateExistingDeviceEntry(updatedDeviceObj, rioDatabase, runDeviceList, updateExistingCallback)
{
	var modifiedStoredDevice = null;
	var localID = null;
	
	checkRioInputType(inpDeviceObj, addNewCallback);
	checkRioMissingID(inpDeviceObj, addNewCallback);
	localID = inpDeviceObject.id;
	
	return updateExistingCallback(null, true);
}


function checkRioInputType(inpValue, errorCallback)
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


function checkRioMissingID(inpObject, errorCallback)
{
	if (typeof inpObject.id !== "string")
	{
		return errorCallback(new Error("ID property missing!"), null);
	}
}


function setRioMakerProperty(inpObject)
{
	if (typeof inpObject.maker !== "string")
	{
		inpObject.maker = deviceSettings.getDeviceMakerByModel(inpObject.model);
	}
}


function createStoredDeviceObject(deviceData)
{
	var createRes = {object: null, errorMessage: ""};
	
	try
	{
		createRes.object = new deviceModelClass.StoredDevice(deviceData);
	}
	catch(e)
	{
		createRes.errorMessage = e.message;
	}
	
	return createRes;
}


function checkStoredDeviceCreationSuccessful(sdCreate, errorCallback)
{
	var createSuccessful = false;
	
	if (sdCreate.object !== null)
	{
		createSuccessful = true;
	}
	else
	{
		return errorCallback(new Error(sdCreate.errorMessage), null);
	}
}



module.exports =
{
	addNewDevice: addNewDeviceEntry,
	updateExistingDevice: updateExistingDeviceEntry
};
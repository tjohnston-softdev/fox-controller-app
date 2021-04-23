// Functions for validating entry when creating Remote IO database entries.

const deviceModelClass = require("../fox-devices/_classes/device-model.class");
const deviceSettings = require("../fox-devices/device.settings");


// Validate input type.
function checkObjectInputType(inpValue, typeCallback)
{
	var givenType = typeof inpValue;
	var flaggedMessage = "";
	
	if (inpValue !== undefined && inpValue !== null && givenType === "object")
	{
		return typeCallback(null, true);
	}
	else
	{
		flaggedMessage = "Must be an object: " + inpValue;
		return typeCallback(new Error(flaggedMessage), null);
	}
}


// Validate ID property.
function checkObjectMissingID(inpObject, missingCallback)
{
	var idType = typeof inpObject.id;
	
	if (idType === "string")
	{
		return missingCallback(null, inpObject.id);
	}
	else
	{
		return missingCallback(new Error("ID property missing!"), null);
	}
}


// Set 'maker' property.
function setInputMaker(inpObject)
{
	if (inpObject.maker === undefined)
	{
		inpObject.maker = null;
	}
}


// Create 'StoredDevice' class object in Try-Catch
function createStoredDeviceObject(deviceData)
{
	var createRes = {modelObject: null, errorText: ""};
	
	try
	{
		// Attempt to create.
		createRes.modelObject = new deviceModelClass.StoredDevice(deviceData);
	}
	catch(thrownErr)
	{
		// Save error message.
		createRes.errorText = thrownErr.message;
	}
	
	return createRes;
}


// Validate 'StoredDevice' creation result.
function checkObjectCreationSuccessful(createResultObject, sdCreateCallback)
{
	if (createResultObject.modelObject !== null)
	{
		// Successful.
		return sdCreateCallback(null, true);
	}
	else
	{
		// Use flagged error.
		return sdCreateCallback(new Error(createResultObject.errorText), null);
	}
}



module.exports =
{
	checkInputType: checkObjectInputType,
	checkMissingID: checkObjectMissingID,
	setMaker: setInputMaker,
	createStoredDevice: createStoredDeviceObject,
	checkCreationSuccessful: checkObjectCreationSuccessful
};
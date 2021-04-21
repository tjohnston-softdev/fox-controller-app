const deviceModelClass = require("../fox-devices/_classes/device-model.class");
const deviceSettings = require("../fox-devices/device.settings");


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



function setInputMaker(inpObject)
{
	var makerType = typeof inpObject.maker;
	
	if (makerType !== "string")
	{
		inpObject.maker = deviceSettings.getDeviceMakerByModel(inpObject.model);
	}
}


function createStoredDeviceObject(deviceData)
{
	var createRes = {modelObject: null, errorText: ""};
	
	try
	{
		createRes.modelObject = new deviceModelClass.StoredDevice(deviceData);
	}
	catch(thrownErr)
	{
		createRes.errorText = thrownErr.message;
	}
	
	return createRes;
}


function checkObjectCreationSuccessful(createResultObject, sdCreateCallback)
{
	if (createResultObject.modelObject !== null)
	{
		return sdCreateCallback(null, true);
	}
	else
	{
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
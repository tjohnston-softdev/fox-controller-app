const deviceModelClass = require("../fox-devices/_classes/device-model.class");
const deviceSettings = require("../fox-devices/device.settings");


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



module.exports =
{
	checkInputType: checkRioInputType,
	checkMissingID: checkRioMissingID,
	setMaker: setRioMakerProperty
};
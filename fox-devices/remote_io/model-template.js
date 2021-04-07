function createModelObject(modelString, comString, pollCountNum, pollIntervalNum)
{
	var createRes = {};
	
	createRes["modelType"] = modelString;
	createRes["commsType"] = comString;
	createRes["ioConfigs"] = [];
	createRes["totalPolls"] = pollCountNum;
	createRes["pollingInterval"] = pollIntervalNum;
	createRes["readAndWriteDeviceData"] = placeholder;
	createRes["infoUrl"] = "/info";
	createRes["parseDeviceInfo"] = placeholder;
	createRes["maker"] = null;
	
	return createRes;
}


function addIoConfigObject(typeString, prefixString, lengthNum, configArr)
{
	var newConfig = {"ioType": typeString, "ioPrefix": prefixString, "length": 4};
	configArr.push(newConfig);
}


function addManufacturerString(nameString, modelArr)
{
	var objectIndex = 0;
	var currentObject = {};
	
	for (objectIndex = 0; objectIndex < modelArr.length; objectIndex = objectIndex + 1)
	{
		currentObject = modelArr[objectIndex];
		currentObject.maker = nameString;
	}
}


function placeholder()
{
	return true;
}




module.exports =
{
	createModel: createModelObject,
	addConfig: addIoConfigObject,
	addManufacturer: addManufacturerString
};
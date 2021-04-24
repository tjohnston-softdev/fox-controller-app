/*
	Device Settings
	Original FOX Controller file.
*/



// Load model definition files.
const advantechModels = require("./remote_io/advantech.models");
const moxaModels = require("./remote_io/moxa.models");
const sonoffModels = require("./remote_io/sonoff.models");


// Read model details.
const allKnownModels = advantechModels.concat(moxaModels, sonoffModels);
const manufacturersList = allKnownModels.map(getManufacturer);
const modelTypesList = allKnownModels.map(getModelType);

// Device types.
const deviceTypesObject = {remoteIo: "Remote IO", motorDrive: "Motor Drive"};
const deviceTypesList = Object.values(deviceTypesObject);

// Communication types.
const communicationTypesObject = {modbus: "modbus", http: "http"};

// Binary signal.
const binarySignalObject = {OFF: "OFF", ON: "ON"};



// Converts flag number to binary signal.
function convertValueToBinarySignal(subjectVal)
{
	var convRes = binarySignalObject.OFF;
	
	if (subjectVal > 0)
	{
		convRes = binarySignalObject.ON;
	}
	
	return convRes;
}


// Scales decimal value.
function scaleEnteredDecimalValue(decVal, errorVal, minOutput, maxOutput, minInput, maxInput)
{
	var validDecimal = Number.isFinite(decVal);
	
	var pMinInput = null;
	var pMaxInput = null;
	var pMinOutput = null;
	var pMaxOutput = null;
	
	var divisionOutcome = null;
	var scaleRes = null;
	
	if (validDecimal === true)
	{
		// Prepare arguments.
		pMinInput = prepareRangeArgument(minInput, 0);
		pMaxInput = prepareRangeArgument(maxInput, 65535);
		pMinOutput = prepareRangeArgument(minOutput, 0);
		pMaxOutput = prepareRangeArgument(maxOutput, 10);
		
		
		// Calculate scaled value.
		divisionOutcome = (decVal - pMinInput) * (pMaxOutput - pMinOutput) / (pMaxInput - pMinInput) + pMinOutput;
		scaleRes = Math.round(divisionOutcome * 1000) / 1000;
	}
	else
	{
		// Invalid number value.
		scaleRes = prepareRangeArgument(errorVal, 0);
	}
	
	return scaleRes;
}


// Validate binary signal string.
function checkValidBinarySignal(signalEntry)
{
	var givenType = typeof signalEntry;
	var prepSignal = "";
	var checkRes = false;
	
	if (givenType === "string" && signalEntry.length > 0)
	{
		// Case-insensitive.
		prepSignal = signalEntry.toUpperCase();
	}
	
	if (prepSignal === binarySignalObject.ON || prepSignal === binarySignalObject.OFF)
	{
		// Valid
		checkRes = true;
	}
	
	return checkRes;
}


// Get model by given name.
function getModelByType(tgtName)
{
	var loopIndex = 0;
	var currentObject = {};
	var getRes = null;
	
	
	// Loop all known devices until target found.
	while (loopIndex >= 0 && loopIndex < allKnownModels.length && getRes === null)
	{
		// Read current model.
		currentObject = allKnownModels[loopIndex];
		
		if (currentObject.modelType === tgtName)
		{
			// Target found.
			getRes = currentObject;
		}
		
		loopIndex = loopIndex + 1;
	}
	
	return getRes;
}


// Get manufacturer by model name.
function getManufacturerByModel(tgtName)
{
	var loopIndex = 0;
	var currentObject = {};
	var getRes = null;
	
	// Loop all known devices until target found.
	while (loopIndex >= 0 && loopIndex < allKnownModels.length && getRes === null)
	{
		// Read current model.
		currentObject = allKnownModels[loopIndex];
		
		if (currentObject.modelType === tgtName)
		{
			// Target found.
			getRes = currentObject.maker;
		}
		
		loopIndex = loopIndex + 1;
	}
	
	return getRes;
}


// Prepares range argument for decimal scaling.
function prepareRangeArgument(rangeArg, defaultValue)
{
	var correctType = Number.isFinite(rangeArg);
	var prepRes = defaultValue;
	
	if (correctType === true)
	{
		// Valid input.
		prepRes = rangeArg;
	}
	
	return prepRes;
}



// Get manufacturer from model object.
function getManufacturer(modelObj)
{
	return modelObj.maker;
}


// Get name from model object.
function getModelType(modelObj)
{
	return modelObj.modelType;
}




module.exports =
{
	deviceType: deviceTypesObject,
	deviceTypes: deviceTypesList,
	communicationType: communicationTypesObject,
	binSignal: binarySignalObject,
	convertToBinSignal: convertValueToBinarySignal,
	scaleDecimalValue: scaleEnteredDecimalValue,
	isValidBinarySignal: checkValidBinarySignal,
	getModel: getModelByType,
	getDeviceMakerByModel: getManufacturerByModel,
	listRioMakers: manufacturersList,
	listRioModelTypes: modelTypesList
};
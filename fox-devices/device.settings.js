const advantechModels = require("./remote_io/advantech.models");
const moxaModels = require("./remote_io/moxa.models");
const sonoffModels = require("./remote_io/sonoff.models");

const allKnownModels = advantechModels.concat(moxaModels, sonoffModels);
const manufacturersList = allKnownModels.map(getManufacturer);
const modelTypesList = allKnownModels.map(getModelType);

const deviceTypesObject = {remoteIo: "Remote IO", motorDrive: "Motor Drive"};
const deviceTypesList = Object.values(deviceTypesObject);
const communicationTypesObject = {modbus: "modbus", http: "http"};
const binarySignalObject = {OFF: "OFF", ON: "ON"};


function convertValueToBinarySignal(subjectVal)
{
	var convRes = binarySignalObject.OFF;
	
	if (subjectVal > 0)
	{
		convRes = binarySignalObject.ON;
	}
	
	return convRes;
}


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
		pMinInput = prepareRangeArgument(minInput, 0);
		pMaxInput = prepareRangeArgument(maxInput, 65535);
		pMinOutput = prepareRangeArgument(minOutput, 0);
		pMaxOutput = prepareRangeArgument(maxOutput, 10);
		
		divisionOutcome = (decVal - pMinInput) * (pMaxOutput - pMinOutput) / (pMaxInput - pMinInput) + pMinOutput;
		scaleRes = Math.round(divisionOutcome * 1000) / 1000;
	}
	else
	{
		scaleRes = prepareRangeArgument(errorVal, 0);
	}
	
	return scaleRes;
}


function checkValidBinarySignal(signalEntry)
{
	var givenType = typeof signalEntry;
	var prepSignal = "";
	var checkRes = false;
	
	if (givenType === "string" && signalEntry.length > 0)
	{
		prepSignal = signalEntry.toUpperCase();
	}
	
	if (prepSignal === binarySignalObject.ON || prepSignal === binarySignalObject.OFF)
	{
		checkRes = true;
	}
	
	return checkRes;
}


function getModelByType(tgtName)
{
	var loopIndex = 0;
	var currentObject = {};
	var getRes = null;
	
	while (loopIndex >= 0 && loopIndex < allKnownModels.length && getRes === null)
	{
		currentObject = allKnownModels[loopIndex];
		
		if (currentObject.modelType === tgtName)
		{
			getRes = currentObject;
		}
		
		loopIndex = loopIndex + 1;
	}
	
	return getRes;
}


function getManufacturerByModel(tgtName)
{
	var loopIndex = 0;
	var currentObject = {};
	var getRes = null;
	
	while (loopIndex >= 0 && loopIndex < allKnownModels.length && getRes === null)
	{
		currentObject = allKnownModels[loopIndex];
		
		if (currentObject.modelType === tgtName)
		{
			getRes = currentObject.maker;
		}
		
		loopIndex = loopIndex + 1;
	}
	
	return getRes;
}


function prepareRangeArgument(rangeArg, defaultValue)
{
	var correctType = Number.isFinite(rangeArg);
	var prepRes = defaultValue;
	
	if (correctType === true)
	{
		prepRes = rangeArg;
	}
	
	return prepRes;
}



function getManufacturer(modelObj)
{
	return modelObj.maker;
}


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
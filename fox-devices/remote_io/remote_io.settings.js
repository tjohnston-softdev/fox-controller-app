/*
	Remote IO Settings
	Original FOX Controller file.
*/


// Prefixes
const ioPrefixesObj =
{
	DI: "DI",
	AI: "AI",
	RTD: "RTD",
	DO: "DO",
	AO: "AO",
	RO: "RO"
};


// Signal types by prefix.
const binarySignalsArr = [ioPrefixesObj.DI, ioPrefixesObj.DO, ioPrefixesObj.RO];
const decimalSignalsArr = [ioPrefixesObj.AI, ioPrefixesObj.RTD, ioPrefixesObj.RO];


// IO types
const ioTypesObj = {status: "STATUS", control: "CONTROL"};


// Names
const ioNamesObj =
{
	[ioPrefixesObj.DI]: "Digital Input",
	[ioPrefixesObj.AI]: "Analogue Input",
	[ioPrefixesObj.RTD]: "Temperature Sensor (RTD)",
	[ioPrefixesObj.DO]: "Digital Output",
	[ioPrefixesObj.AO]: "Analogue Output",
	[ioPrefixesObj.RO]: "Relay Output"
};


// Signal types by flag
const signalTypesObj = {binary: 0, decimal: 1};


// Binary signal status
const binSignalObj = {OFF: "OFF", ON: "ON"};



// Get signal type by prefix.
function getSignalTypeValue(prefixStr)
{
	var binaryFlag = binarySignalsArr.indexOf(prefixStr);
	var signalRes = -1;
	
	if (binaryFlag >= 0 && binaryFlag < binarySignalsArr.length)
	{
		signalRes = signalTypesObj.binary;
	}
	else
	{
		signalRes = signalTypesObj.decimal;
	}
	
	return signalRes;
}


// Get prefix from IO string
function parseIoPrefixString(ioSetId)
{
	var splitArr = ioSetId.split("-");
	var prefixPart = splitArr[0];
	var parseRes = null;
	
	if (ioPrefixesObj[prefixPart] !== undefined)
	{
		parseRes = prefixPart;
	}
	
	return parseRes;
}


// Get index number from IO string
function parseIoIndexValue(ioSetId)
{
	var splitArr = ioSetId.split("-");
	var numberPart = splitArr[1];
	var castValue = parseInt(numberPart);
	var correctType = Number.isInteger(castValue);
	
	var parseRes = null;
	
	if (correctType === true)
	{
		parseRes = castValue;
	}
	
	return parseRes;
}




module.exports =
{
	ioPrefixes: ioPrefixesObj,
	binarySignals: binarySignalsArr,
	decimalSignals: decimalSignalsArr,
	ioTypes: ioTypesObj,
	ioNames: ioNamesObj,
	signalType: signalTypesObj,
	binSignal: binSignalObj,
	getSignalType: getSignalTypeValue,
	parseIoPrefix: parseIoPrefixString,
	parseIoIndex: parseIoIndexValue
};
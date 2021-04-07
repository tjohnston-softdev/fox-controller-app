const ioPrefixesObj =
{
	DI: "DI",
	AI: "AI",
	RTD: "RTD",
	DO: "DO",
	AO: "AO",
	RO: "RO"
};


const binarySignalsArr = [ioPrefixesObj.DI, ioPrefixesObj.DO, ioPrefixesObj.RO];
const decimalSignalsArr = [ioPrefixesObj.AI, ioPrefixesObj.RTD, ioPrefixesObj.RO];

const ioTypesObj = {status: "STATUS", control: "CONTROL"};

const ioNamesObj =
{
	[ioPrefixesObj.DI]: "Digital Input",
	[ioPrefixesObj.AI]: "Analogue Input",
	[ioPrefixesObj.RTD]: "Temperature Sensor (RTD)",
	[ioPrefixesObj.DO]: "Digital Output",
	[ioPrefixesObj.AO]: "Analogue Output",
	[ioPrefixesObj.RO]: "Relay Output"
};

const signalTypesObj = {binary: 0, decimal: 1};
const binSignalObj = {OFF: "OFF", ON: "ON"};


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


function parseIoPrefixString(ioSetID)
{
	var prefixPart = extractIoSetPart(ioSetID, 0);
	var parseRes = null;
	
	if (ioPrefixesObj[prefixPart] !== undefined)
	{
		parseRes = prefixPart;
	}
	
	return parseRes;
}


function parseIoIndexValue(ioSetID)
{
	var numberPart = extractIoSetPart(ioSetID, 1);
	var castValue = parseInt(numberPart);
	var correctType = Number.isInteger(castValue);
	
	var parseRes = null;
	
	if (correctType === true)
	{
		parseRes = castValue;
	}
	
	return parseRes;
}


function extractIoSetPart(fullString, partIndex)
{
	var argType = typeof fullString;
	var splitArr = [];
	var splitMade = false;
	var partRes = "";
	
	if (argType === "string")
	{
		splitArr = fullString.split("-");
		splitMade = Array.isArray(splitArr);
	}
	
	if (splitMade === true && splitArr.length > partIndex)
	{
		partRes = splitArr[partIndex];
	}
	
	return partRes;
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
// Functions to read request parameters for Alarm API.

const maxRows = 1000;


// Reads target Node ID.
function readNodeIdPart(parameterString)
{
	var givenType = typeof parameterString;
	var readRes = null;
	
	if (parameterString === "all")
	{
		// Get all nodes.
		readRes = null;
	}
	else if (givenType === "string" && parameterString.length > 0)
	{
		// Use target nodes.
		readRes = parameterString.split(",");
	}
	else
	{
		// Default.
		readRes = null;
	}
	
	return readRes;
}


// Reads number parameter for timestamp.
function readNumberPart(parameterString, defaultValue)
{
	var castObject = castNumberString(parameterString);
	var readRes = defaultValue;
	
	if (castObject.successful === true)
	{
		readRes = castObject.value;
	}
	
	return readRes;
}


// Reads query row limit.
function readLimitPart(parameterString, defaultValue)
{
	var castObject = castNumberString(parameterString);
	var readRes = NaN;
	
	if (castObject.successful === true && castObject.value > 0 && castObject.value <= maxRows)
	{
		// Use row limit.
		readRes = castObject.value;
	}
	else if (castObject.successful === true && castObject.value > maxRows)
	{
		// Maximum.
		readRes = maxRows;
	}
	else
	{
		// Default
		readRes = defaultValue;
	}
	
	return readRes;
}


// Swaps timestamp range limits if they are out of order.
function swapTimestampLimitValues(inputObj)
{
	var swapTemp = null;
	
	if (inputObj.timeLower > inputObj.timeUpper || inputObj.timeUpper < inputObj.timeLower)
	{
		// Swap required.
		swapTemp = inputObj.timeLower;
		inputObj.timeLower = inputObj.timeUpper;
		inputObj.timeUpper = swapTemp;
	}
}


// Converts parameter string to whole number.
function castNumberString(nString)
{
	var givenType = typeof nString;
	var numberCast = NaN;
	var castRes = {value: NaN, successful: false};
	
	if (givenType === "string" && nString.length > 0)
	{
		numberCast = Number.parseInt(nString);
		castRes.value = numberCast;
		castRes.successful = Number.isInteger(numberCast);
	}
	
	return castRes;
}




module.exports =
{
	readNodeID: readNodeIdPart,
	readNumber: readNumberPart,
	readLimit: readLimitPart,
	swapTimestamps: swapTimestampLimitValues
};
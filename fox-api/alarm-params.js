const maxRows = 1000;

function readNodeIdPart(parameterString)
{
	var givenType = typeof parameterString;
	var readRes = null;
	
	if (parameterString === "all")
	{
		readRes = null;
	}
	else if (givenType === "string" && parameterString.length > 0)
	{
		readRes = parameterString.split(",");
	}
	else
	{
		readRes = null;
	}
	
	return readRes;
}


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


function readLimitPart(parameterString, defaultValue)
{
	var castObject = castNumberString(parameterString);
	var readRes = NaN;
	
	if (castObject.successful === true && castObject.value > 0 && castObject.value <= maxRows)
	{
		readRes = castObject.value;
	}
	else if (castObject.successful === true && castObject.value > maxRows)
	{
		readRes = maxRows;
	}
	else
	{
		readRes = defaultValue;
	}
	
	return readRes;
}


function swapTimestampLimitValues(inputObj)
{
	var swapTemp = null;
	
	if (inputObj.timeLower > inputObj.timeUpper || inputObj.timeUpper < inputObj.timeLower)
	{
		swapTemp = inputObj.timeLower;
		inputObj.timeLower = inputObj.timeUpper;
		inputObj.timeUpper = swapTemp;
	}
}


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
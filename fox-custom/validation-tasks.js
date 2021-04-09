const validator = require("validator");

function checkBaseObjectType(inputObj, inputDesc)
{
	var givenType = typeof inputObj;
	var correctType = false;
	var flaggedMessage = "";
	
	if (inputObj !== undefined && inputObj !== null && givenType === "object")
	{
		correctType = true;
	}
	else
	{
		flaggedMessage = inputDesc + " must be an object";
		throw new Error(flaggedMessage);
	}
}



function checkStringProperty(propName, propValue, defaultValue, className, actionDesc)
{
	var defaultType = typeof defaultValue;
	var givenType = typeof propValue;
	var flaggedMessage = "";
	var readRes = "";
	
	if (givenType === "string")
	{
		readRes = propValue;
	}
	else if (defaultType === "string")
	{
		readRes = defaultValue;
	}
	else
	{
		flaggedMessage = writePropertyTypeError(propName, "string", propValue, className, actionDesc);
		throw new Error(flaggedMessage);
	}
	
	return readRes;
}


function checkBooleanProperty(propName, propValue, defaultValue, className, actionDesc)
{
	var flaggedMessage = "";
	var readRes = null;
	
	if (propValue === true || propValue === false)
	{
		readRes = propValue;
	}
	else if (defaultValue === true || defaultValue === false)
	{
		readRes = defaultValue;
	}
	else
	{
		flaggedMessage = writePropertyTypeError(propName, "boolean", propValue, className, actionDesc);
		throw new Error(flaggedMessage);
	}
	
	return readRes;
}


function checkNumberProperty(propName, propValue, defaultValue, className, actionDesc)
{
	var defaultNumberGiven = Number.isFinite(defaultValue);
	var correctType = Number.isFinite(propValue);
	var readRes = NaN;
	
	if (correctType === true)
	{
		readRes = propValue;
	}
	else if (defaultNumberGiven === true)
	{
		readRes = defaultValue;
	}
	else
	{
		flaggedMessage = writePropertyTypeError(propName, "number", propValue, className, actionDesc);
		throw new Error(flaggedMessage);
	}
	
	return readRes;
}


function checkDeviceTypeProperty(propName, targetValue, remoteIoValue)
{
	var flaggedMessage = "";
	var readRes = "";
	
	if (targetValue === remoteIoValue)
	{
		readRes = targetValue;
	}
	else
	{
		flaggedMessage = writeUnsupportedValueError(propName, targetValue);
		throw new Error(flaggedMessage);
	}
	
	return readRes;
}


function checkReferenceStringProperty(propName, targetValue, stringArr)
{
	var manufacturerExists = stringArr.includes(targetValue);
	var flaggedMessage = "";
	var readRes = "";
	
	if (manufacturerExists === true)
	{
		readRes = targetValue;
	}
	else
	{
		flaggedMessage = writeUnsupportedValueError(propName, targetValue);
		throw new Error(flaggedMessage);
	}
	
	return readRes;
}



function checkIpAddressProperty(propName, propValue)
{
	var givenType = typeof propValue;
	var correctFormat = false;
	
	var flaggedMessage = "";
	var readRes = "";
	
	if (givenType === "string")
	{
		correctFormat = validator.isIP(propValue);
	}
	
	if (correctFormat === true)
	{
		readRes = propValue;
	}
	else
	{
		flaggedMessage = propName + " must be an IP address!";
		throw new Error(flaggedMessage);
	}
	
	return readRes;
}


function writePropertyTypeError(vProp, vType, vEntry, vClass, vAction)
{
	var writeRes = "";
	
	writeRes += "Invalid type! ";
	writeRes += vProp;
	writeRes += " must be ";
	writeRes += quoteText(vType);
	writeRes += " when got value ";
	writeRes += vEntry;
	writeRes += " in ";
	writeRes += vClass;
	writeRes += " during ";
	writeRes += vAction;
	
	return writeRes;
}


function writeUnsupportedValueError(vProp, vUnknown)
{
	var writeRes = "";
	
	writeRes += ".";
	writeRes += vProp;
	writeRes += " = ";
	writeRes += vUnknown;
	writeRes += " is not supported!";
	return writeRes;
}



function quoteText(txt)
{
	var quoted = "'" + txt + "'";
	return quoted;
}




module.exports =
{
	checkBaseObject: checkBaseObjectType,
	checkStringProp: checkStringProperty,
	checkBooleanProp: checkBooleanProperty,
	checkNumberProp: checkNumberProperty,
	checkDeviceTypeProp: checkDeviceTypeProperty,
	checkReferenceStringProp: checkReferenceStringProperty,
	checkIpAddressProp: checkIpAddressProperty
};
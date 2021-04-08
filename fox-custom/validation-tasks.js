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



function readStringValueProperty(inputObj, propName, defaultValue, className)
{
	var defaultType = typeof defaultValue;
	var propValue = inputObj[propName];
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
		flaggedMessage = writePropertyTypeError(propName, "string", propValue, className);
		throw new Error(flaggedMessage);
	}
	
	return readRes;
}


function readBooleanValueProperty(inputObj, propName, defaultValue, className)
{
	var propValue = inputObj[propName];
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
		flaggedMessage = writePropertyTypeError(propName, "boolean", propValue, className);
		throw new Error(flaggedMessage);
	}
	
	return readRes;
}


function readNumberValueProperty(inputObj, propName, defaultValue, className)
{
	var defaultNumberGiven = Number.isFinite(defaultValue);
	var propValue = inputObj[propName];
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
		flaggedMessage = writePropertyTypeError(propName, "number", propValue, className);
		throw new Error(flaggedMessage);
	}
	
	return readRes;
}


function readDeviceTypeValueProperty(inputObj, propName, remoteIoValue)
{
	var targetValue = inputObj[propName];
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


function readReferenceStringValueProperty(inputObj, propName, stringArr)
{
	var targetValue = inputObj[propName];
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


function writePropertyTypeError(vProp, vType, vEntry, vClass)
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
	writeRes += " during construction";
	
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
	readStringProperty: readStringValueProperty,
	readBooleanProperty: readBooleanValueProperty,
	readNumberProperty: readNumberValueProperty,
	readDeviceTypeProperty: readDeviceTypeValueProperty,
	readReferenceStringProperty: readReferenceStringValueProperty
};
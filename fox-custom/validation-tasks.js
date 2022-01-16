// Functions for input validation.

const ipRegex = require("ip-regex");
const ipOpts = {exact: true, includeBoundaries: true};

// Object type.
function checkBaseObjectType(inputObj, inputDesc)
{
	var givenType = typeof inputObj;
	var correctType = (inputObj !== undefined && inputObj !== null && givenType === "object");
	var flaggedMessage = "";
	
	if (correctType !== true)
	{
		flaggedMessage = inputDesc + " must be an object";
		throw new Error(flaggedMessage);
	}
}



// String property.
function checkStringProperty(propName, propValue, defaultValue, className, actionDesc)
{
	var defaultType = typeof defaultValue;
	var givenType = typeof propValue;
	var flaggedMessage = "";
	var readRes = "";
	
	if (givenType === "string")
	{
		// Use string.
		readRes = propValue;
	}
	else if (defaultType === "string")
	{
		// Use default.
		readRes = defaultValue;
	}
	else
	{
		// Type error.
		flaggedMessage = writePropertyTypeError(propName, "string", propValue, className, actionDesc);
		throw new Error(flaggedMessage);
	}
	
	return readRes;
}


// True or False property.
function checkBooleanProperty(propName, propValue, defaultValue, className, actionDesc)
{
	var flaggedMessage = "";
	var readRes = null;
	
	if (propValue === true || propValue === false)
	{
		// Use value.
		readRes = propValue;
	}
	else if (defaultValue === true || defaultValue === false)
	{
		// Use default.
		readRes = defaultValue;
	}
	else
	{
		// Type error.
		flaggedMessage = writePropertyTypeError(propName, "boolean", propValue, className, actionDesc);
		throw new Error(flaggedMessage);
	}
	
	return readRes;
}


// Number property.
function checkNumberProperty(propName, propValue, defaultValue, className, actionDesc)
{
	var defaultNumberGiven = Number.isFinite(defaultValue);
	var correctType = Number.isFinite(propValue);
	var readRes = NaN;
	
	if (correctType === true)
	{
		// Use number.
		readRes = propValue;
	}
	else if (defaultNumberGiven === true)
	{
		// Use default.
		readRes = defaultValue;
	}
	else
	{
		// Type error.
		flaggedMessage = writePropertyTypeError(propName, "number", propValue, className, actionDesc);
		throw new Error(flaggedMessage);
	}
	
	return readRes;
}


// Device Type value.
function checkDeviceTypeProperty(propName, targetValue, remoteIoValue)
{
	var flaggedMessage = "";
	var readRes = "";
	
	if (targetValue === remoteIoValue)
	{
		// Valid.
		readRes = targetValue;
	}
	else
	{
		// Unsupported.
		flaggedMessage = writeUnsupportedValueError(propName, targetValue);
		throw new Error(flaggedMessage);
	}
	
	return readRes;
}


// String array match.
function checkReferenceStringProperty(propName, targetValue, stringArr)
{
	var stringExists = stringArr.includes(targetValue);
	var flaggedMessage = "";
	var readRes = "";
	
	if (stringExists === true)
	{
		// Valid.
		readRes = targetValue;
	}
	else
	{
		// Does not exist.
		flaggedMessage = writeUnsupportedValueError(propName, targetValue);
		throw new Error(flaggedMessage);
	}
	
	return readRes;
}


// IP Address property.
function checkIpAddressProperty(propName, propValue)
{
	var givenType = typeof propValue;
	var correctFormat = false;
	
	var flaggedMessage = "";
	var readRes = "";
	
	if (givenType === "string")
	{
		// Check string format.
		correctFormat = ipRegex(ipOpts).test(propValue);
	}
	
	if (correctFormat === true)
	{
		// Valid.
		readRes = propValue;
	}
	else
	{
		// Incorrect format.
		flaggedMessage = propName + " must be an IP address!";
		throw new Error(flaggedMessage);
	}
	
	return readRes;
}


// Writes property type error text.
function writePropertyTypeError(vProp, vType, vEntry, vClass, vAction)
{
	var writeRes = "";
	
	writeRes += ["Invalid type! ", vProp, " must be "].join("");
	writeRes += quoteText(vType);
	writeRes += [" when got value ", vEntry, " in ", vClass, " during ", vAction].join("");
	
	return writeRes;
}


// Writes unsupported value error text.
function writeUnsupportedValueError(vProp, vUnknown)
{
	var writeRes = [".", vProp, " = ", vUnknown, " is not supported!"].join("");
	return writeRes;
}



// Adds quote to error.
function quoteText(txt)
{
	var quoted = ["'", txt, "'"].join("");
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
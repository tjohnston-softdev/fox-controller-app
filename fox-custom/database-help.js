// Secondary functions for creating Remote IO database entries.


// Use or generate entry ID.
function generateEntryID(existingValue, hashObj)
{
	var existType = typeof existingValue;
	var randomSeed = null;
	var resultID = null;
	
	if (existType === "string" && existingValue.length > 0)
	{
		// ID exists.
		resultID = existingValue;
	}
	else
	{
		// Generate new random ID.
		randomSeed = Date.now();
		resultID = hashObj.encode(randomSeed);
	}
	
	return resultID;
}


// Validates update entry input object.
function checkUpdateInputEntered(inpObj, prepID, jsonSyntax, checkInpCallback)
{
	var entryType = typeof inpObj;
	
	if (inpObj !== undefined && inpObj !== null && entryType === "object")
	{
		// Correct object type - Prepare input.
		inpObj["__modified"] = Date.now();
		inpObj["id"] = prepID;
		jsonSyntax.definition = JSON.stringify(inpObj);
		return checkInpCallback(null, true);
	}
	else
	{
		// Error.
		return checkInpCallback(new Error("Missing entity"), null);
	}
}




module.exports =
{
	generateID: generateEntryID,
	checkUpdateInput: checkUpdateInputEntered
};
function generateEntryID(existingValue, hashObj)
{
	var existType = typeof existingValue;
	var randomSeed = null;
	var resultID = null;
	
	if (existType === "string" && existingValue.length > 0)
	{
		resultID = existingValue;
	}
	else
	{
		randomSeed = Date.now();
		resultID = hashObj.encode(randomSeed);
	}
	
	return resultID;
}


function checkUpdateInputEntered(inpObj, prepID, jsonSyntax, checkInpCallback)
{
	var entryType = typeof inpObj;
	
	if (inpObj !== undefined && inpObj !== null && entryType === "object")
	{
		inpObj["__modified"] = Date.now();
		inpObj["id"] = preparedID;
		jsonSyntax.definition = JSON.stringify(inpObj);
		return checkInpCallback(null, true);
	}
	else
	{
		return checkInpCallback(new Error("Missing entity"), null);
	}
}




module.exports =
{
	generateID: generateEntryID,
	checkUpdateInput: checkUpdateInputEntered
};
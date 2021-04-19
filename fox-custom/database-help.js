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


function checkUpdateInputEntered(inpObj, errorCallback)
{
	// TODO: Callback Restructure
	var entryType = typeof inpObj;
	var objectEntered = false;
	
	if (inpObj !== undefined && inpObj !== null && entryType === "object")
	{
		objectEntered = true;
	}
	else
	{
		return errorCallback(new Error("Missing entity"), null);
	}
}




module.exports =
{
	generateID: generateEntryID,
	checkUpdateInput: checkUpdateInputEntered
};
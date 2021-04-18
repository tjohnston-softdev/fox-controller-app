function readPagePart(parameterString)
{
	var givenType = typeof parameterString;
	var readRes = null;
	
	if (givenType === "string" && parameterString.length > 0)
	{
		readRes = parameterString;
	}
	
	return readRes;
}


function readDeleteHeaderStatus(headerObj)
{
	var givenValue = headerObj["delete-permanently"];
	var readRes = false;
	
	if (givenValue === "true")
	{
		readRes = true;
	}
	
	return readRes;
}



module.exports =
{
	readPage: readPagePart,
	readDeleteHeader: readDeleteHeaderStatus
};
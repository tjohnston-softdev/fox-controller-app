const fs = require("fs");


function readFileNameParameter(fnPara)
{
	var givenType = typeof fnPara;
	var readRes = "";
	
	if (givenType === "string" && fnPara.length > 0)
	{
		readRes = fnPara;
	}
	
	return readRes;
}



function checkDownloadFileExists(dlPath, existCallback)
{
	var checkRes = false;
	var flaggedMessage = "";
	
	fs.stat(dlPath, function (statErr, statRes)
	{
		if (statErr !== null && statErr.code === "ENOENT")
		{
			flaggedMessage = writeMissingFileError(dlPath);
			return existCallback(new Error(flaggedMessage), null);
		}
		else if (statErr !== null)
		{
			flaggedMessage = statErr.message;
			return existCallback(new Error(flaggedMessage), null);
		}
		else
		{
			checkRes = statRes.isFile();
			return existCallback(null, checkRes);
		}
	});
}



function writeMissingFileError(pth)
{
	var writeRes = "";
	
	writeRes += "'";
	writeRes += pth;
	writeRes += "' does not exist.";
	
	return writeRes;
}



module.exports =
{
	readFileName: readFileNameParameter,
	checkDownloadExists: checkDownloadFileExists
};
// Secondary functions for '/api/storage/user-files/download/:fileName' endpoint.

const fs = require("fs");


// Reads file name parameter string.
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



// Checks if the target file exists in storage.
function checkDownloadFileExists(dlPath, existCallback)
{
	var checkRes = false;
	var flaggedMessage = "";
	
	
	// Read entry on target path.
	fs.stat(dlPath, function (statErr, statRes)
	{
		if (statErr !== null && statErr.code === "ENOENT")
		{
			// Does not exist.
			flaggedMessage = writeMissingFileError(dlPath);
			return existCallback(new Error(flaggedMessage), null);
		}
		else if (statErr !== null)
		{
			// Error.
			flaggedMessage = statErr.message;
			return existCallback(new Error(flaggedMessage), null);
		}
		else
		{
			// Exists - Return file status.
			checkRes = statRes.isFile();
			return existCallback(null, checkRes);
		}
	});
}



// Writes missing file error text.
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
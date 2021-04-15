const os = require("os");
const platform = os.platform();
const driveLetters = "ABCDEF";

function initializeDriveObject()
{
	var intlRes = {};
	
	intlRes["fs"] = "";
	intlRes["type"] = "";
	intlRes["size"] = -1;
	intlRes["used"] = -1;
	intlRes["use"] = -1;
	intlRes["mount"] = "";
	
	return intlRes;
}


function setFileSystemProperties(driveNumber, driveObj)
{
	
	if (platform === "win32")
	{
		driveObj.type = "NTFS";
		handleWindows(driveNumber, driveObj);
	}
	else
	{
		driveObj.type = "ext4";
		driveObj.fs = writeUnixName(driveNumber);
		driveObj.mount = "/";
	}
}


function handleWindows(letterNum, winObj)
{
	var chosenLetter = driveLetters.charAt(letterNum - 1);
	var windowsDrive = chosenLetter + ":";
	
	winObj.fs = windowsDrive;
	winObj.mount = windowsDrive;
}


function writeUnixName(driveNum)
{
	var writeRes = "";
	
	writeRes += "/"
	writeRes += platform;
	writeRes += "/drive";
	writeRes += driveNum;
	
	return writeRes;
}




module.exports =
{
	initializeObject: initializeDriveObject,
	setFileSystem: setFileSystemProperties
};
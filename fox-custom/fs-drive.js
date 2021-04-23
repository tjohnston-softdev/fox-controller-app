// File System Volume objects.

const driveLetters = "ABCDEF";

// Define object.
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


// Set property values based on OS.
function setFileSystemProperties(driveNumber, driveObj, platform)
{
	if (platform === "win32")
	{
		// Windows.
		driveObj.type = "NTFS";
		handleWindows(driveNumber, driveObj);
	}
	else
	{
		// UNIX.
		driveObj.type = "ext4";
		driveObj.fs = writeUnixName(driveNumber);
		driveObj.mount = "/";
	}
}


// Sets Windows drive letter.
function handleWindows(letterNum, winObj)
{
	var chosenLetter = driveLetters.charAt(letterNum - 1);
	var windowsDrive = chosenLetter + ":";
	
	winObj.fs = windowsDrive;
	winObj.mount = windowsDrive;
}


// Writes name for UNIX volumes.
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
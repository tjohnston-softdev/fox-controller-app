// Prepares database object array for Admin Health API.

const folderItem = require("../fox-custom/folder-item");
const timestampRanges = require("../fox-custom/timestamp-ranges");


// Main function.
function prepareDatabaseArray(dbFolderContents)
{
	var arrayRes = [];
	addRemoteIoDatabase(dbFolderContents, arrayRes);
	setAlarmDatabase(arrayRes);
	
	return arrayRes;
}


// Reads Remote IO information. from database folder contents.
function addRemoteIoDatabase(dbConts, dbArr)
{
	var entryIndex = 0;
	var currentEntry = {};
	var entryFound = false;
	
	// Loop content entries until end reached or target found.
	while (entryIndex >= 0 && entryIndex < dbConts.length && entryFound !== true)
	{
		currentEntry = dbConts[entryIndex];
		
		if (currentEntry.name === "remote-io.db")
		{
			// Remote IO found.
			dbArr.push(currentEntry);
			entryFound = true;
		}
		
		entryIndex = entryIndex + 1;
	}
}


// Emulate Alarm database information.
function setAlarmDatabase(dbArr)
{
	var alarmCreate = timestampRanges.alarm.min;
	var alarmModify = Date.now();
	
	var preparedObject = folderItem.defineItem("alarms_history.sqlite3", 8192, false, alarmModify, alarmCreate);
	dbArr.push(preparedObject);
}




module.exports =
{
	prepareArray: prepareDatabaseArray
};
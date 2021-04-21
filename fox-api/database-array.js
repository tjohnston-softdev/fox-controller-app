const folderItem = require("../fox-custom/folder-item");
const timestampRanges = require("../fox-custom/timestamp-ranges");


function prepareDatabaseArray(dbFolderContents)
{
	var arrayRes = [];
	addRemoteIoDatabase(dbFolderContents, arrayRes);
	setAlarmDatabase(arrayRes);
	
	return arrayRes;
}


function addRemoteIoDatabase(dbConts, dbArr)
{
	var entryIndex = 0;
	var currentEntry = {};
	var entryFound = false;
	
	while (entryIndex >= 0 && entryIndex < dbConts.length && entryFound !== true)
	{
		currentEntry = dbConts[entryIndex];
		
		if (currentEntry.name === "remote-io.db")
		{
			dbArr.push(currentEntry);
			entryFound = true;
		}
		
		entryIndex = entryIndex + 1;
	}
}


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
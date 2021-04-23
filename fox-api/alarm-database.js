/*
	* Alarm object database.
	* Consists of JSON object arrays.
	* Generated on runtime.
	* Alarms and availability have 1:1 relationship
*/

const timestamps = require("../fox-custom/timestamp-ranges");
const randomValues = require("../fox-custom/random-values");
const alarmList = [];
const available = [];
generateAlarmData();



// Generate database contents. 
function generateAlarmData()
{
	var loopNumber = 1;
	var entryCount = randomValues.generateInteger(10, 500);
	
	var currentNodeObject = {};
	var currentAvailabilityObject = {};
	var currentColourFlag = -1;
	
	for (loopNumber = 1; loopNumber <= entryCount; loopNumber = loopNumber + 1)
	{
		// Generate current object pair.
		currentNodeObject = defineNode(loopNumber);
		currentAvailabilityObject = defineAvailability(currentNodeObject);
		currentColourFlag = randomValues.generateInteger(1, 30);
		setAlarmStatus(currentAvailabilityObject, currentColourFlag);
		
		// Add to database.
		alarmList.push(currentNodeObject);
		available.push(currentAvailabilityObject);
	}
}



// Define alarm node object.
function defineNode(num)
{
	var defineRes = {};
	
	defineRes["ts"] = randomValues.generateTime(timestamps.alarm);
	defineRes["nodeId"] = randomValues.generateNodeID();
	defineRes["state"] = randomValues.generateFlag();
	defineRes["name"] = "Alarm Node Object " + num;
	
	return defineRes;
}


// Define alarm availability object.
function defineAvailability(baseNode)
{
	var defineRes = {};
	
	defineRes["id"] = baseNode.nodeId;
	defineRes["name"] = baseNode.name;
	defineRes["okText"] = "OK";
	defineRes["alarmText"] = "";
	defineRes["alarmColor"] = "";
	
	return defineRes;
}



// Set alarm status based on random flag.
function setAlarmStatus(avObject, colFlag)
{
	if (colFlag >= 1 && colFlag <= 10)
	{
		// Safe
		avObject.alarmText = "SAFE";
		avObject.alarmColor = "green";
	}
	else if (colFlag >= 11 && colFlag <= 20)
	{
		// Warning
		avObject.alarmText = "WARNING";
		avObject.alarmColor = "orange";
	}
	else
	{
		// Faulted
		avObject.alarmText = "FAULTED";
		avObject.alarmColor = "red";
	}
}



// Query alarm objects based on Node ID, timestamp range, limit.
function getPopulatedAlarmObjects(inputParams)
{
	var loopIndex = 0;
	var currentAlarm = {};
	var currentTimeMatch = false;
	var currentNodeMatch = false;
	
	var queryRes = [];
	
	while (loopIndex >= 0 && loopIndex < alarmList.length && queryRes.length < inputParams.limit)
	{
		// Read current alarm and check match.
		currentAlarm = alarmList[loopIndex];
		currentTimeMatch = checkTimeMatch(currentAlarm.ts, inputParams);
		currentNodeMatch = checkNodeMatch(currentAlarm.id, inputParams);
		
		if (currentTimeMatch === true && currentNodeMatch === true)
		{
			// Match found.
			queryRes.push(currentAlarm);
		}
		
		loopIndex = loopIndex + 1;
	}
	
	return queryRes;
}


// Retrieve availability objects.
function getPopulatedAvailabilityObjects()
{
	return available;
}


// Empty alarm query.
function getAlarmObjects()
{
	return [];
}


// Empty availability.
function getAvailabilityObjects()
{
	return [];
}


// Checks whether alarm timestamp falls within the target range.
function checkTimeMatch(tsVal, inpParas)
{
	var checkRes = false;
	
	if (tsVal >= inpParas.timeLower && tsVal <= inpParas.timeUpper)
	{
		checkRes = true;
	}
	
	return checkRes;
}


// Checks whether Node ID matches target.
function checkNodeMatch(idVal, inpParas)
{
	var arrayPassed = Array.isArray(inpParas.nodeID);
	var checkRes = true;
	
	if (arrayPassed === true && inpParas.nodeID.length > 0)
	{
		checkRes = inpParas.nodeID.includes(idVal);
	}
	
	return checkRes;
}




module.exports =
{
	getPopulatedAlarms: getPopulatedAlarmObjects,
	getPopulatedAvailable: getPopulatedAvailabilityObjects,
	getAlarms: getAlarmObjects,
	getAvailable: getAvailabilityObjects
};
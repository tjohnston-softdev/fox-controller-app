const timestamps = require("../fox-custom/timestamp-ranges");
const randomValues = require("../fox-custom/random-values");
const alarmList = [];
const available = [];
generateAlarmData();



function generateAlarmData()
{
	var loopNumber = 1;
	var entryCount = randomValues.generateInteger(10, 500);
	
	var currentNodeObject = {};
	var currentAvailabilityObject = {};
	var currentColourFlag = -1;
	
	for (loopNumber = 1; loopNumber <= entryCount; loopNumber = loopNumber + 1)
	{
		currentNodeObject = defineNode(loopNumber);
		currentAvailabilityObject = defineAvailability(currentNodeObject);
		currentColourFlag = randomValues.generateInteger(1, 30);
		setAlarmStatus(currentAvailabilityObject, currentColourFlag);
		
		alarmList.push(currentNodeObject);
		available.push(currentAvailabilityObject);
	}
}



function defineNode(num)
{
	var defineRes = {};
	
	defineRes["ts"] = randomValues.generateTime(timestamps.alarm);
	defineRes["nodeId"] = randomValues.generateNodeID();
	defineRes["state"] = randomValues.generateFlag();
	defineRes["name"] = "Alarm Node Object " + num;
	
	return defineRes;
}


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



function setAlarmStatus(avObject, colFlag)
{
	if (colFlag >= 1 && colFlag <= 10)
	{
		avObject.alarmText = "SAFE";
		avObject.alarmColor = "green";
	}
	else if (colFlag >= 11 && colFlag <= 20)
	{
		avObject.alarmText = "WARNING";
		avObject.alarmColor = "orange";
	}
	else
	{
		avObject.alarmText = "FAULTED";
		avObject.alarmColor = "red";
	}
}



function getAlarmObjects(inputParams)
{
	var loopIndex = 0;
	var currentAlarm = {};
	var currentTimeMatch = false;
	var currentNodeMatch = false;
	
	var queryRes = [];
	
	while (loopIndex >= 0 && loopIndex < alarmList.length && queryRes.length < inputParams.limit)
	{
		currentAlarm = alarmList[loopIndex];
		currentTimeMatch = checkTimeMatch(currentAlarm.ts, inputParams);
		currentNodeMatch = checkNodeMatch(currentAlarm.id, inputParams);
		
		if (currentTimeMatch === true && currentNodeMatch === true)
		{
			//queryRes.push(currentAlarm);
		}
		
		loopIndex = loopIndex + 1;
	}
	
	return queryRes;
}


function getAvailabilityObjects()
{
	return [];
}



function checkTimeMatch(tsVal, inpParas)
{
	var checkRes = false;
	
	if (tsVal >= inpParas.timeLower && tsVal <= inpParas.timeUpper)
	{
		checkRes = true;
	}
	
	return checkRes;
}


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
	getAlarms: getAlarmObjects,
	getAvailable: getAvailabilityObjects
};
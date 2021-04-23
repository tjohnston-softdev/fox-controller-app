// Defines timestamp limit objects.


// Main function.
function createTimestamps()
{
	var currentTime = Date.now();
	var thirtyDaysAgo = getAlarmOffset(currentTime);
	var createRes = {};
	
	createRes["dhcpExpire"] = defineTimestampRange(3408220800000, 32503680000000);			// 2078-01-01 to 3000-01-01
	createRes["alarm"] = defineTimestampRange(thirtyDaysAgo, currentTime);					// Within ~30 days of Date.now()
	
	return createRes;
}


// Range object.
function defineTimestampRange(lowerNum, upperNum)
{
	var defineRes = {};
	
	defineRes["min"] = lowerNum;
	defineRes["max"] = upperNum;
	
	return defineRes;
}


// Calculate offset for alarm lower limit.
function getAlarmOffset(curTime)
{
	var msPerMin = 1000 * 60;
	var msPerDay = msPerMin * 1440;
	var msTotal = msPerDay * 30;
	var offsetRes = curTime - msTotal;
	
	return offsetRes;
}



module.exports = createTimestamps();
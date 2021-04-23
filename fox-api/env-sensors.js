// Generates environmental sensor information for Admin Health API.

const osPlatform = require("../fox-custom/os-platform");
const randomValues = require("../fox-custom/random-values");


// Main function.
function getSensorInformation()
{
	var sensorRes = initializeEnvironmentObject();
	
	if (osPlatform.dummy === true)
	{
		// Use fake data.
		sensorRes.temperature = -1;
		sensorRes.humidity = -1;
		sensorRes.isDummy = true;
	}
	else
	{
		// Generate random data.
		sensorRes.temperature = randomValues.generateFloat(0.01, 120.00);
		sensorRes.humidity = randomValues.generateFloat(0.01, 100.00);
		sensorRes.isDummy = false;
	}
	
	return sensorRes;
}


// Define result object.
function initializeEnvironmentObject()
{
	var intlRes = {};
	
	intlRes["temperature"] = null;
	intlRes["humidity"] = null;
	intlRes["isDummy"] = null;
	
	return intlRes;
}



module.exports =
{
	getInfo: getSensorInformation
}
const timestamps = require("../fox-custom/timestamp-ranges");
const randomValues = require("../fox-custom/random-values");

function generateClientObjects(genCount)
{
	var currentClient = {};
	var currentMAC = "";
	var dhcpResult = [];
	
	while (dhcpResult.length < genCount)
	{
		currentClient = {};
		currentMAC = randomValues.generateMacAddress();
		
		currentClient["leaseExpiry"] = randomValues.generateTime(timestamps.dhcpExpire);
		currentClient["mac"] = currentMAC;
		currentClient["ipAddress"] = randomValues.generateIpAddress();
		currentClient["host"] = randomValues.generateHost();
		currentClient["shortMac"] = currentMAC.substr(-5, 5);
		
		dhcpResult.push(currentClient);
	}
	
	
	return dhcpResult;
}



module.exports =
{
	generateClients: generateClientObjects
};
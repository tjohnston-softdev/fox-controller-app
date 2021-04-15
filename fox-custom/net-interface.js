function initializeNetworkObject()
{
	var intlRes = {};
	
	intlRes["iface"] = "";
	intlRes["ip4"] = "";
	intlRes["ip6"] = "";
	intlRes["mac"] = "";
	intlRes["internal"] = false;
	
	return intlRes;
}


function setInternalValues(netObj)
{
	netObj.iface = "lo0";
	netObj.ip4 = "127.0.0.1";
	netObj.ip6 = "::1";
	netObj.mac = "00:00:00:00:00:00";
	netObj.internal = true;
}



module.exports =
{
	initializeObject: initializeNetworkObject,
	setInternal: setInternalValues
};
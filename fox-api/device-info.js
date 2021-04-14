function getInfoObject()
{
	var infoRes = {};
	
	infoRes["WARNING"] = "DO NOT MODIFY THIS FILE!";
	infoRes["name"] = "FOX Controller";
	infoRes["serialNumber"] = "$_SERIAL";
	infoRes["hardware"] = "HRDWR3";
	infoRes["wifiPass"] = "************"
	
	return infoRes;
}



module.exports =
{
	getObject: getInfoObject
};
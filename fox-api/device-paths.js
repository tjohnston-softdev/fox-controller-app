function defineURLs()
{
	var defineRes = {};
	
	defineRes["deviceStatus"] = '/status/:deviceType/:deviceId';
	defineRes["defaults"] = '/defaults';
	defineRes["deviceType"] = '/:deviceType';
	defineRes["deviceQuery"] = '/:deviceType/:deviceId';
	
	return defineRes;
}


module.exports = defineURLs();
const os = require("os");

function readPlatform()
{
	var dummyPlatforms = ["win32", "mac", "darwin"];
	var localName = os.platform();
	var platformObject = {};
	
	platformObject["name"] = localName;
	platformObject["dummy"] = dummyPlatforms.includes(localName);
	
	return platformObject;
}

module.exports = readPlatform();
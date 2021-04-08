const deviceSettings = require("../device.settings");
const rioSettings = require("../remote_io/remote_io.settings");


class StoredDeviceObject
{
	constructor(inputDeviceObj)
	{
		this.id = 1;
		this.name = "Test";
		return this;
	}
}




module.exports =
{
	StoredDevice: StoredDeviceObject
};
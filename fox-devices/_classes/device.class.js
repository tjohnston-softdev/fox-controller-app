const modelClasses = require("./device-model.class");
const deviceSettings = require("../device.settings");
const rioSettings = require("../remote_io/remote_io.settings");

function defineConnectedDevice(storedDeviceObject)
{
	class ConnectedDevice
	{
		constructor(storedDeviceObj)
		{
			this.name = "Name";
			this.value = "Value";
			return this;
		}
	};
	
	return new ConnectedDevice(storedDeviceObject);
}



module.exports =
{
	ConnectedDevice: defineConnectedDevice
};
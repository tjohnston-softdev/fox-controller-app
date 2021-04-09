const modelClasses = require("./device-model.class");
const deviceSettings = require("../device.settings");
const rioSettings = require("../remote_io/remote_io.settings");
const validationTasks = require("../../fox-custom/validation-tasks");

function defineConnectedDevice(storedDeviceObject)
{
	
	class ConnectedDevice
	{
		constructor(_storedDevice)
		{
			
			if (_storedDevice instanceof modelClasses.StoredDevice)
			{
				//handlePropertyValidation(_storedDevice, this.constructor.name);	
				this.sample = "X";
			}
			else
			{
				throw new Error("_storedDevice must be instance of StoredDevice");
			}
			
			return this;
		}
	};
	
	return new ConnectedDevice(storedDeviceObject);
}



function handlePropertyValidation(sDevice, constructName)
{
	//validationTasks.readStringProperty(sDevice, "id", null, constructName);
}



module.exports =
{
	ConnectedDevice: defineConnectedDevice
};
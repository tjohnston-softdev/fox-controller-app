const modelClasses = require("./device-model.class");
const deviceSettings = require("../device.settings");
const rioSettings = require("../remote_io/remote_io.settings");
const validationTasks = require("../../fox-custom/validation-tasks");

function defineConnectedDevice(storedDeviceObject)
{
	var modelDeviceObject = null;
	
	class ConnectedDevice
	{
		constructor(storeDeviceObj)
		{
			var baseModel = null;
			
			handleClassType(storeDeviceObj);
			baseModel = deviceSettings.getModel(storeDeviceObj.model);
			handleModel(baseModel);
			this.storedDevice = storeDeviceObj;
			
			modelDeviceObject = modelClasses.DeviceModel(baseModel, storeDeviceObj.ipAddress);
			return this;
		}
		
		
		getRioProperties()
		{
			var currentKey = "";
			var currentContainer = {};
			var currentType = "";
			var currentPrefix = "";
			
			var currentNumber = 0;
			var currentName = "";
			var currentProperty = {};
			
			var getPropRes = {};
			
			getPropRes["name"] = this.storedDevice.name;
			getPropRes[rioSettings.ioTypes.status] = [];
			getPropRes[rioSettings.ioTypes.control] = [];
			
			for (currentKey in modelDeviceObject.ioContainers)
			{
				currentContainer = modelDeviceObject.ioContainers[currentKey];
				currentType = currentContainer.ioType;
				currentPrefix = currentContainer.ioPrefix;
				
				currentNumber = 0;
				currentName = "";
				currentProperty = {};
				
				while (currentNumber >= 0 && currentNumber < currentContainer.length)
				{
					currentName = rioSettings.ioNames[currentPrefix];
					currentProperty = {};
					currentProperty["value"] = currentPrefix + '-' + currentNumber;
					currentProperty["text"] = currentName + " " + currentNumber;
					
					getPropRes[rioSettings.ioTypes.control].push(currentProperty);
					
					if (currentType === rioSettings.ioTypes.control)
					{
						getPropRes[rioSettings.ioTypes.status].push(currentProperty);
					}
					
					currentNumber = currentNumber + 1;
				}
			}
			
			return getPropRes;
		}
		
	};
	
	return new ConnectedDevice(storedDeviceObject);
}



function handleClassType(_storedDevice)
{
	var handleRes = false;
	
	if (_storedDevice instanceof modelClasses.StoredDevice)
	{
		handleRes = true;
	}
	else
	{
		throw new Error("_storedDevice must be instance of StoredDevice");
	}
}


function handleModel(retrievedEntry)
{
	var resType = typeof retrievedEntry;
	var handleRes = false;
	var flaggedMessage = "";
	
	if (retrievedEntry !== undefined && retrievedEntry !== null && resType === "object")
	{
		handleRes = true;
	}
	else
	{
		flaggedMessage = mName + " is not supported yet!";
		throw new Error(flaggedMessage);
	}
}



module.exports =
{
	ConnectedDevice: defineConnectedDevice
};
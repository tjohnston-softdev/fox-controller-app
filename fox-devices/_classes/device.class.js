/*
	Contains definition for 'ConnectedDevice' class.
	Original FOX Controller file.
*/

const modelClasses = require("./device-model.class");
const deviceSettings = require("../device.settings");
const rioSettings = require("../remote_io/remote_io.settings");
const validationTasks = require("../../fox-custom/validation-tasks");


// Main function.
function defineConnectedDevice(storedDeviceObject)
{
	var modelDeviceObject = null;
	
	class ConnectedDevice
	{
		// Uses 'StoredDevice' object as input.
		constructor(storeDeviceObj)
		{
			var baseModel = null;
			
			// Validate object input.
			handleClassType(storeDeviceObj);
			baseModel = deviceSettings.getModel(storeDeviceObj.model);
			handleModel(baseModel, storeDeviceObj.model);
			this.storedDevice = storeDeviceObj;
			
			// Convert model definition to 'DeviceModel' object.
			modelDeviceObject = modelClasses.DeviceModel(baseModel, storeDeviceObj.ipAddress);
			
			
			// Complete.
			return this;
		}
		
		
		// Retrieve IO object by prefix.
		getIoContainer(contPrefix)
		{
			var containerRes = modelDeviceObject.ioContainers[contPrefix];
			return containerRes;
		}
		
		
		// Remote IO properties.
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
			
			// Initialize results.
			getPropRes["name"] = this.storedDevice.name;
			getPropRes[rioSettings.ioTypes.status] = [];
			getPropRes[rioSettings.ioTypes.control] = [];
			
			
			// Loop IO container objects.
			for (currentKey in modelDeviceObject.ioContainers)
			{
				// Read current container.
				currentContainer = modelDeviceObject.ioContainers[currentKey];
				currentType = currentContainer.ioType;
				currentPrefix = currentContainer.ioPrefix;
				
				currentNumber = 0;
				currentName = "";
				currentProperty = {};
				
				// Loop container ports.
				while (currentNumber >= 0 && currentNumber < currentContainer.length)
				{
					// Retrieve name by prefix.
					currentName = rioSettings.ioNames[currentPrefix];
					
					// Set Remote IO property.
					currentProperty = {};
					currentProperty["value"] = currentPrefix + '-' + currentNumber;
					currentProperty["text"] = currentName + " " + currentNumber;
					
					
					if (currentType === rioSettings.ioTypes.control)
					{
						// Control - Both
						getPropRes[rioSettings.ioTypes.control].push(currentProperty);
						getPropRes[rioSettings.ioTypes.status].push(currentProperty);
					}
					else if (currentType === rioSettings.ioTypes.status)
					{
						// Status - Only.
						getPropRes[rioSettings.ioTypes.status].push(currentProperty);
					}
					
					currentNumber = currentNumber + 1;
				}
			}
			
			return getPropRes;
		}
		
	};
	
	// Complete.
	return new ConnectedDevice(storedDeviceObject);
}



// Validates 'ConnectedDevice' input object class.
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


// Validates model type for 'ConnectedDevice' input object.
function handleModel(retrievedEntry, mName)
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
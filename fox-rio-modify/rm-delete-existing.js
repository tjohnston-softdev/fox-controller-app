// Script deletes existing Remote IO device from database.


const rioDeviceStatus = require("../fox-custom/rio-device-status");


function deleteDeviceEntry(inpDeleteID, inpPerm, rioDatabase, runDeviceList, dropCallback)
{
	rioDeviceStatus.disableDevice(inpDeleteID, runDeviceList);
	
	rioDatabase.deleteDeviceEntity(inpDeleteID, inpPerm, function (deleteDeviceErr)
	{
		if (deleteDeviceErr !== null)
		{
			// Error.
			return dropCallback(deleteDeviceErr, null);
		}
		else
		{
			// Successful.
			return dropCallback(null, true);
		}
	});
}



module.exports =
{
	deleteEntry: deleteDeviceEntry
};
# Changelog

**./fox-api/alarm-database.js**
* Renamed 'getAlarmObjects' to 'getPopulatedAlarmObjects'
	* Called publicly as 'getPopulatedAlarms'
	* Uncommented `queryRes.push`
	* Returns array of alarm objects that match input parameters.
* Wrote new function 'getPopulatedAvailabilityObjects'
	* GET function for 'available' global.
	* Returns array of alarm availability objects.
	* Called publicly as 'getPopulatedAvailable'
* Rewrote 'getAlarmObjects' to only return an empty array.

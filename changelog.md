# Changelog

**Test Status**
* Successfully emulated Alarm API endpoints.
	* /api/alarm/list/:nodeId
	* /api/alarm/available

---

**./routes/alarm.js**
* Added requirement for '../fox-api/alarm-database'
* Added `module.exports = router`
* list
	* Removed extra slash from path.
	* Declared 'resultArray' variable.
	* 'resultArray' is assigned by calling 'alarmDatabase.getAlarms'
	* Endpoint sends 'resultArray' as output.
	* Removed "Todo" comment.
* available
	* Declared 'resultArray' variable.
	* 'resultArray' is assigned by calling 'alarmDatabase.getAvailable'
	* Removed "Todo" comment.

---

**./fox-api/alarm-database.js**
* Changed 'id' property to 'nodeId' (defineNode)
* Changed 'baseNode.id' to 'baseNode.nodeId' (defineAvailability)
* Commented out `queryRes.push` (getAlarmObjects)
* 'getAvailabilityObjects' now returns an empty array.

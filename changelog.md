# Changelog

**Test Status**
* Device API endpoints
	* Most invalid cases pass since error format has been corrected.
	* Total Passed: 142 / 160

---

**./package.json**
* Installed modules:
	* http-errors
	* body-parser

---

**./routes/devices.js**
* Required newly installed modules.
* Modified router to use 'bodyParser'
* Modified the following endpoints to use 'httpErrors'
	* /status/:deviceType/:deviceId
		* GET
	* /:deviceType
		* GET
		* POST
	* /:deviceType/:deviceId
		* GET
		* PUT
		* DELETE

---

**./routes/storage.js**
* Required newly installed modules.
* Modified router to use 'bodyParser'
* Modified the following endpoints to use 'httpErrors'
	* /user-files/list
	* /user-files/download/:fileName

---

**./fox-api/error-html.js**
* New file - Writes error page HTML.
* Based on 'pug' rendering used by original Controller.

---

**./server.js**
* Required './fox-api/error-html'
* Wrote error handler.

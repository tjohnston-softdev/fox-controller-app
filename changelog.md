# Changelog

**Test Status**
* '/api/admin/defaults' endpoint is tested successfully.
* The other admin endpoints are requested successfully but the results have not been emulated yet.

---

**./server.js**
* Added requirement for './routes/admin'
* Defined route:
	* `app.use('/api/admin', adminRouter);`

---

**./routes/users.js**
* This is a demo file from the express generator.
* Changed bracket structure for root.
* Added '/sub' request to test routing.

---

**./routes/index.js**
* Demo file from express generator sends home page.
* Changed bracket structure
* Defined the page title into a separate object variable 'params'

---

**./routes/admin.js**
* New file - Defines 'Admin' API routes.
	* Placeholder
	* DHCP Clients (Todo)
	* Defaults (Complete)
	* Logs (Todo)

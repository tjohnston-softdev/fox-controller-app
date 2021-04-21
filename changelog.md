# Changelog

**Test Status**
* Wrote emulation for '/api/nodes/:maker' endpoint.
* All of the tests for that endpoint pass successfully.
* 'Individual Node' tests still fail because that endpoint has not been emulated yet.
* Because the tests are carried out dynamically, this caused more errors than it fixed overall.
* Total passed: 122 / 152

---

**./routes/nodes.js**
* Emulated '/:maker'

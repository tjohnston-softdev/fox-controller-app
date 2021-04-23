/*
	* Creates new folder on file system.
	* Non-existing folders will be created on the path.
*/

const fs = require("fs");


function createNewFolder(targetPath)
{
	var folderOpts = {recursive: true};
	var folderExists = fs.existsSync(targetPath);
	
	if (folderExists !== true)
	{
		fs.mkdirSync(targetPath, folderOpts);
	}
}


module.exports = createNewFolder;
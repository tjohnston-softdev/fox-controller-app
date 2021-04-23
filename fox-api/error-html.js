// This file writes HTML code for API error messages.


// Main function.
function writeErrorHtmlText(errMsg, httpStatus)
{
	var prepStatus = prepareStatusInput(httpStatus);
	var writeRes = "";
	
	writeRes += "<!DOCTYPE html>\n";
	writeRes += "<html>\n";
	writeRes += "\t<head>\n";
	writeRes += "\t\t<title>FOX Controller Error</title\n";
	writeRes += "\t</head>\n";
	writeRes += "\t<body>\n";
	writeRes += addErrorMessage(errMsg);
	writeRes += addStatus(prepStatus);
	writeRes += "\t</body>\n";
	writeRes += "</html>";
	
	return writeRes;
}


// Read status code number.
function prepareStatusInput(statNum)
{
	var correctType = Number.isInteger(statNum);
	var prepRes = 500;
	
	if (correctType === true && statNum >= 400 && statNum < 600)
	{
		prepRes = statNum;
	}
	
	return prepRes;
}


// Write message element.
function addErrorMessage(msg)
{
	var messagePart = "\t\t<h1>" + msg + "</h1>\n";
	return messagePart;
}


// Write status element.
function addStatus(sNum)
{
	var statusPart = "\t\t<h2>" + sNum + "</h2>\n";
	return statusPart;
}



module.exports =
{
	writeHTML: writeErrorHtmlText
};
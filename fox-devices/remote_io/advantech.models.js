const settings = require("./remote_io.settings");

const modelsArray =
[
	{
		modelType: "ADVANTECH-1",
		commsType: "modbus",
		ioConfigs:
		[
			{ioType: settings.ioTypes.status, ioPrefix: settings.ioPrefixes.DI, length: 4},
			{ioType: settings.ioTypes.control, ioPrefix: settings.ioPrefixes.RO, length: 4},
		],
		totalPolls: 3,
		pollingInterval: 180,
		readAndWriteDeviceData: placeholder,
		infoUrl: '/info',
		parseDeviceInfo: placeholder,
		maker: "Advantech"
	},
	{
		modelType: "ADVANTECH-2",
		commsType: "modbus",
		ioConfigs:
		[
			{ioType: settings.ioTypes.status, ioPrefix: settings.ioPrefixes.AI, length: 4},
			{ioType: settings.ioTypes.status, ioPrefix: settings.ioPrefixes.DI, length: 4},
			{ioType: settings.ioTypes.control, ioPrefix: settings.ioPrefixes.DO, length: 2},
		],
		totalPolls: 4,
		pollingInterval: 100,
		readAndWriteDeviceData: placeholder,
		infoUrl: '/info',
		parseDeviceInfo: placeholder,
		maker: "Advantech"
	}
];


function placeholder()
{
	return true;
}



module.exports = modelsArray;
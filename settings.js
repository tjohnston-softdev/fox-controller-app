const productionEnvironment = (process.env.NODE_ENV === 'production');


module.exports =
{
	isProd: productionEnvironment,
	isDev: !productionEnvironment,
	userStoragePath: "../user-storage",
	dbsPath: "../fox-dbs",
	logsPath: "../logs",
	logFile: "fox-controller.log",
	flowsPath: "../fox-flows"
};
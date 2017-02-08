import express from 'express';
import TraceKit from './bower_components/tracekit';
import winston from 'winston';

const app = express()

app.get('/', function(req, res){
	res.send('Hello There!')
})


const onError = function(){
	return new Error("dang")
}

const onTRError = function(){
	try {
		throw new Error("jeepers")
	} catch (e) {
		TraceKit.report(e);
	}	
}

winston.emitErrs = true;

const logger = new (winston.Logger)({
	transports: [
		new winston.transports.File({
	    level: 'info',
	    filename: './logs/all-logs.log',
	    handleExceptions: true,
	    json: true,
	    maxsize: 5242880, //5MB
	    maxFiles: 5,
	    colorize: false
    }),
		new winston.transports.Console({
			level: 'debug',
			handleExceptions: true,
			json: false,
			colorize: true
		})
	],
	exitOnError: false
})

TraceKit.report.subscribe(onTRError);
TraceKit.report.subscribe(onError);

TraceKit.report.subscribe(logger.debug(onError()));
TraceKit.report.subscribe(logger.info(onError()));

onError()
// onTRError()

// logger.debug(onError())

// setInterval(onTRError, 10000)


const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
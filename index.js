import express from 'express';
import TraceKit from './bower_components/tracekit';
import winston from 'winston';

const app = express()

app.get('/', function(req, res){
	res.send('Hello There!')
})

const onError = function(err){
	new Error("oh jeeze ${err}")
	console.log("this error");
}

onError("blah")

TraceKit.report.subscribe(onError());

const logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({
			level: 'debug',
			handleExceptions: true,
			json: true,
			colorize: true
		})
	],
	exitOnError: false
})


const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
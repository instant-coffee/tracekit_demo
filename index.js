import express from 'express';
import TraceKit from './bower_components/tracekit';
import winston from 'winston';

const app = express()

app.get('/', function(req, res){
	res.send('Hello There!')
})

function onError(window){
	console.log("something", window);
}

TraceKit.report.subscribe(onError());



const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
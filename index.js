import express from 'express';

const app = express()

app.get('/', function(req, res){
	res.send('Hello There!')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
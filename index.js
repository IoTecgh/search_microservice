const express = require('express')
const app = new express()
const bodyParser=require("body-parser");
const populate=require('./server/populateES')
const con=require('./server/connection')
const search=require('./server/search')



app.use(bodyParser.json());
populate.test()


app.post('/populatedata',function(req,res){
  
populate.readAndInsertData(req.body.index,req.body.type,req.body.data)
})


app.get('/search/:index/:type/:term', async function(req,res){
  var index=req.params.index
  var type=req.params.type
  var term=req.params.term
  var resp= await search.formatresult(index,type,term)
  res.json(resp)
  
})


const port = process.env.PORT || 4000

app.listen(port, err => {
  if (err) console.error(err)
  console.log('App Listening on Port 4000')
})
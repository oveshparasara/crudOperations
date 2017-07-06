const express = require('express');
const bodyParser= require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
res.redirect('/')
})
})


const MongoClient = require('mongodb').MongoClient
var db

MongoClient.connect('mongodb://<node_crud>:<node_crud>@ds151242.mlab.com:51242/node_crud', (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(3000, () => {
    console.log('listening on 3000')
})
})
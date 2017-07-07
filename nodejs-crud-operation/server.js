const express = require('express');
const bodyParser= require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended: true}))


app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
res.redirect('/')
})
})
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    console.log(result);
    res.render('index.ejs', {quotes: result})
})
})

app.put('/quotes', (req, res) => {
    db.collection('quotes')
    .findOneAndUpdate({name: 'ovesh'}, {
        $set: {
            name: req.body.name,
            quote: req.body.quote
        }
    }, {
        sort: {_id: -1},
        upsert: true
    }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
})
})



const MongoClient = require('mongodb').MongoClient
var db

MongoClient.connect('mongodb://node_crud:node_crud@ds151242.mlab.com:51242/node_crud', (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(3000, () => {
    console.log('listening on 3000')
})
})
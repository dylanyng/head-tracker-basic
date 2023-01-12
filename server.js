require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const PORT = 2121;
const helper = require('./helper');
const { extendedSessionStorage } = require('helper-js');
let existingData;

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'episodes';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/',(request, response)=>{
    db.collection('logs').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { 
            info: data, 
            helper: helper });
        existingData = data;
    })
    .catch(error => console.error(error));
})

app.post('/logEntry', (request, response) => {
    db.collection('logs').insertOne({
        attackType: request.body.attackType,
        entryNotes: request.body.entryNotes,
        entryDate: request.body.entryDate,
        med: null,
        medNotes: null
    })
    .then(result => {
        console.log('Entry Added');
        response.redirect('/');
    })
    .catch(error => console.error(error))
})

app.delete('/deleteEntry', (request, response) => {
    db.collection('logs').deleteOne({entryDate: request.body.entryDateS})
    .then(result => {
        console.log('Entry deleted');
        response.json('Entry deleted');
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
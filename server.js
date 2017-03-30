'use strict';
//const moment = require('moment');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.Promise = global.Promise;

mongoose.connect('myTester:xyz123@mongodb11302-eemelih.jelastic.metropolia.fi:27017/test').then(()=> {
    console.log("Connection successful");
    app.listen(3000);
    //app.use(express.static('public'));
}, err => {
    console.log("Connection to db failed: "+err);
});

app.get('/', (req, res)=> {
    res.send("hello world.");
});

const Schema = mongoose.Schema;


const genderEnum = {
    MALE : "male",
    FEMALE : "female"
};


const catSchema = new Schema({
    name:  String,
    age: Number,
    gender:   String,
    color: String,
    weight: Number
});
const Cat = mongoose.model('Cat', catSchema);

Cat.create({name: "Doge", age: 10, gender: "male", color: "white", weight: 11}).then(post => {
    //console.log(post.id);
    console.log("Name of the created cat: "+post.name);
});

Cat.create({name: "Dogi", age: 11, gender: "male", color: "white", weight: 11}).then(post => {
    //console.log(post.id);
    console.log("Name of the created cat: "+post.name);
});


Cat.find().exec().then((cats) => {
    console.log(`Got ${cats.length} cats`);
});

Cat
    .where('age').gt(10)
    .where('weight').gt(10)
    .where({"gender": "male"})
    .exec().then((oldCats)=> {
    console.log("The old fat cats are: "+oldCats);
});
/*
Cat.find(
    {"gender": "male"},
    {"age": {"$gt":10}},
    {"weight": {"$gt": 10}}).then((theCats)=> {
        console.log("the old fat male cats: "+theCats);
});
*/

/*
 app.get('/', (req, res) => {
 res.send("time is: "+moment().format('MMMM Do YYYY, h:mm:ss a'));
 });
 */


//app.listen(3000);

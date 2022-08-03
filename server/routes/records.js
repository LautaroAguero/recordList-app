const express = require('express');

const recordRoutes = express.Router();

const dbo = require('../db/conn');

const ObjectId = require("mongodb").ObjectId;

recordRoutes.route('/record').get((req, res)=>{
    let db_connect = dbo.getDb("employees");
    db_connect
        .collection("records")
        .find({})
        .toArray((err, result)=>{
            if (err) throw err;
            res.json(result);
        });
});    

recordRoutes.route('/record/:id').get((req, res)=> {
    let db_connect = dbo.getDb();
    let myquery = {_id: ObjectId(req.params.id)};
    db_connect
        .collection("records")
        .findOne(myquery,(err, result) => {
            if (err) throw err;
            res.json(result);
        })
});

recordRoutes.route('/record/add').post((req, res)=> {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
    };
    db_connect.collection('records').insertOne(myobj,(err, result) =>{
        if (err) throw err;
        res.json(result);
    });
});

recordRoutes.route('/update/:id').post((req, res)=> {
    let db_connect = dbo.getDb();
    let myquery = {_id: ObjectId(req.params.id)};
    let newValues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        },
    };
    db_connect
        .collection("records")
        .updateOne(myquery,newValues,(err, result) =>{
            if (err) throw err;
            console.log("1 doc updated");
            res.json(result);
        });
});

recordRoutes.route('/:id').delete((req, res)=> {
    let db_connect = dbo.getDb();
    let myquery = {_id: ObjectId(req.params.id)};
    db_connect.collection('records').deleteOne(myquery,(err, obj) => {
        if (err) throw err;
        console.log("Deleted record");
        res.json(obj); 
    }); 
});

module.exports = recordRoutes;